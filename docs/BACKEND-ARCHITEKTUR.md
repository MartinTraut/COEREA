# CoArea — Backend-Architektur für den Live-Gang

> Stand 2026-08-04. Planungsdokument, noch nichts davon ist gebaut. Der Prototyp
> läuft weiterhin ohne Backend (siehe `PROJECT-BRIEF.md`, Phase 1).
> Das zugehörige Preismodell steht in `lib/pricing.ts` und ist unten unter
> „Geld" zusammengefasst.

## Kurzfassung

Kein Zoo aus Datenbanken. **Eine PostgreSQL** plus drei Nebensysteme, die keine
Datenbank im klassischen Sinn sind:

```
Supabase Pro       Postgres + PostGIS + Auth + Storage + Realtime
Stripe Connect     Zahlungen, KYC der Hosts, Auszahlungen
Upstash Redis      Webhook-Idempotenz, Rate-Limiting, Job-Queue
Resend / Postmark  Transaktionsmails
```

Darüber Drizzle als ORM — passt zu Next.js Server Components und lässt die
`EXCLUDE`-Constraint unten als Raw-SQL-Migration zu.

## 1. PostgreSQL — das Kernsystem

Relational, nicht dokumentenbasiert: zweiseitiger Marktplatz mit Geld,
Verfügbarkeiten und Verträgen. Genau der Fall, in dem Transaktionen und
Constraints vor echten Schäden bewahren.

| Bereich | Tabellen |
|---|---|
| Identität | `users`, `host_profiles`, `kyc_status` |
| Angebot | `listings`, `listing_images`, `categories`, `listing_categories` |
| Verfügbarkeit | `availability_windows`, `blocked_dates` |
| Buchung | `booking_requests`, `bookings`, `booking_status_events` |
| Geld | `payments`, `payouts`, `invoices`, `refunds`, `ledger_entries`, `fee_policies` |
| Sozial | `reviews`, `message_threads`, `messages`, `saved_listings` |
| Betrieb | `documents`, `newsletter_subscribers`, `support_tickets` |

### Doppelbuchungen — Constraint, nicht Anwendungslogik

Zwei parallele Anfragen für denselben Zeitraum sind kein theoretisches Problem.
Postgres löst das nativ:

```sql
CREATE EXTENSION btree_gist;
ALTER TABLE bookings ADD CONSTRAINT no_overlap
  EXCLUDE USING gist (
    listing_id WITH =,
    daterange(starts_on, ends_on, '[]') WITH &&
  ) WHERE (status IN ('confirmed', 'pending'));
```

Einer der stärksten Gründe für Postgres statt einer Dokumenten-DB.

### Geo-Suche

PostGIS reicht. „Flächen in Deiner Nähe" und die Kartenansicht mit Pins sind
`ST_DWithin` auf einem GiST-Index. Weder Elasticsearch noch Algolia nötig — das
wird erst ab etwa 100.000 Inseraten oder echter Relevanz-Sortierung ein Thema.

**Fehlt im Prototyp:** `lib/listings.ts` hat keine Koordinaten. Ohne die gibt es
keine Kartenansicht (Screen 3 im Brief).

## 2. Objektspeicher

Fotos, Host-Avatare und der Upload-Bereich „Meine Unterlagen" gehören nie in die
Datenbank. Supabase Storage oder Cloudflare R2 (kein Egress-Entgelt, bei einer
bildlastigen Marktplatz-Seite spürbar). In Postgres steht nur der Pfad.

„Meine Unterlagen" enthält vermutlich Pacht- und Eigentumsnachweise — privater
Bucket mit signierten URLs, nicht public.

## 3. Redis

Upstash, serverless, passt zu Vercel. Drei Aufgaben:

- **Webhook-Idempotenz.** Stripe liefert Webhooks *mindestens* einmal, also auch
  doppelt. Ohne Dedupe-Key landen Zahlungen doppelt im Ledger.
- **Rate-Limiting** für Login, Kontaktformular, Newsletter.
- **Job-Queue** für Rechnungs-PDF, Mailversand, Payout. Alternativ `pgmq` oder
  `graphile-worker` in Postgres selbst — spart einen Dienst.

## 4. Geld — Stripe Connect

CoArea ist ein **Marktplatz**: Geld vom Nutzer, abzüglich Anteil an den Host.
Regulatorisch etwas anderes als ein Shop. **Connect Express** ist hier Standard —
Stripe übernimmt Onboarding, Identitätsprüfung (KYC/GwG) und Auszahlung.

### Preismodell (bereits im Frontend umgesetzt)

Der Host trägt ein, was er ausgezahlt bekommen will. Aufgeschlagen werden 9 %
plus 19 % USt darauf; das Ergebnis ist der Preis, der überall steht.

```
host_payout        220,00 €
platform_fee_net    19,80 €    ← 9 %
platform_fee_vat     3,76 €    ← 19 % auf die Vermittlungsleistung
────────────────────────────
angezeigt          243,56 €  →  aufgerundet  244,00 €
```

Die USt wird **auf**geschlagen, nicht aus der Provision herausgerechnet — sonst
bleiben von 9 % nur 7,56 %.

Rechtskonstruktion: **Vermittlung**. Verworfen wurden Weitervermietung (CoArea
haftet für fremde Grundstücke, Vorsteuerproblem bei privaten Hosts) und
Host-Provision nach Booking.com-Art (widerspricht „0 % für Hosts").

### Flow

Passt auf die bestehenden Screens 8 und 9:

1. Anfrage → PaymentIntent mit `capture_method: manual` → nur autorisiert
2. Host lehnt ab oder Frist läuft ab → Autorisierung verfällt, niemand zahlt
3. Host bestätigt → Capture
4. Nutzungszeitraum → Transfer an den Host, `application_fee_amount` bleibt hier

Als **Destination Charge**: ein PaymentIntent, Stripe splittet.

Zahlarten für Deutschland: Karte, **SEPA-Lastschrift**, PayPal, Klarna. SEPA ist
bei größeren Beträgen (Agrarfläche für 1.600 €/Monat) wichtiger als Karte.

Stripe ist die Wahrheit über Geldflüsse; die Datenbank hält eine Spiegelung
(`stripe_payment_intent_id`, `stripe_account_id`, `stripe_transfer_id`). Beträge
nie ohne dahinterliegendes Stripe-Event verändern.

### Beträge

`BIGINT` in Cent, nie Float. Pro Buchung werden **alle vier** Beträge eingefroren,
plus die angewandten Sätze — ändert sich die Gebühr 2027, dürfen alte Rechnungen
sich nicht rückwirkend ändern.

```sql
CREATE TABLE bookings (
  ...
  host_payout_cents        BIGINT NOT NULL,
  platform_fee_net_cents   BIGINT NOT NULL,
  platform_fee_vat_cents   BIGINT NOT NULL,
  total_charged_cents      BIGINT NOT NULL,
  fee_rate_applied         NUMERIC(5,4) NOT NULL,
  vat_rate_applied         NUMERIC(5,4) NOT NULL,
  CHECK (total_charged_cents
         = host_payout_cents + platform_fee_net_cents + platform_fee_vat_cents)
);
```

In `listings` heißt die Spalte `host_payout_amount_cents`, **nicht** `price`. Der
Anzeigepreis wird abgeleitet, nie gespeichert.

`fee_policies` (gültig ab Datum, pro Kategorie überschreibbar) statt einer
Konstante im Code — dann ist ein späterer Wechsel auf Host-Provision eine
Konfigurationsänderung, keine Migration.

### Wirtschaftlichkeit

Stripe nimmt etwa 1,5 % + 0,25 €:

| Buchung (Host-Netto) | Gebühr netto | Stripe | bleibt |
|---|---|---|---|
| 499 € (Monat) | 44,91 € | −8,54 € | 36,37 € |
| 100 € (Woche) | 9,00 € | −2,04 € | 6,96 € |
| 20 € (8 h × 2,50 €) | 1,80 € | −0,58 € | 1,22 € |

Bei den Stunden-Flächen arbeitet die Plattform faktisch umsonst. **Mindestgebühr
nötig** (Größenordnung 3,50 €), die ebenso unsichtbar im Anzeigepreis verschwindet.

## 5. Nicht nötig — jetzt

- Analytics-/Warehouse-DB. Das Einnahmen-Balkendiagramm ist ein
  `GROUP BY date_trunc('month', ...)` auf `payouts`.
- Elasticsearch/Algolia. Postgres FTS plus PostGIS reicht lange.
- Eigene Chat-Datenbank. Supabase Realtime auf `messages` deckt Screen 9 und das
  Nachrichten-Center ab.
- MongoDB. Es gibt keine schemalose Domäne in diesem Modell.

## 6. Recht — was aufs Datenmodell durchschlägt

- **GoBD:** Rechnungen zehn Jahre unveränderbar. Also eingefrorenes PDF im
  Objektspeicher, nicht bei jedem Aufruf neu aus Live-Daten gerendert.
- **DSGVO-Löschung kollidiert damit.** Ein Nutzer darf gelöscht werden, seine
  Rechnungen nicht. `users` anonymisieren, Rechnungen mit historischem
  Namens-Snapshot behalten. Muss von Anfang an im Schema stehen.
- **Umsatzsteuer:** Die 19 % gelten sicher auf die Vermittlungsleistung. Ob auf
  die *Miete* USt anfällt, hängt am Host (privat vs. Unternehmer) und an der
  Fläche — Grundstücksvermietung ist nach § 4 Nr. 12 UStG grundsätzlich
  steuerfrei, Sportplätze mit Betriebsvorrichtungen oft nicht. Feld
  `host_tax_status` vorsehen.
- **Preisangabenverordnung:** Der angezeigte Preis muss der Gesamtpreis sein, ab
  der ersten Preisangabe. Deshalb steckt die Provision im Preis und wird nicht
  am Ende addiert.

## Offene Punkte

- [ ] Steuerberater zur USt-Behandlung der Miete (§ 4 Nr. 12 UStG) — **vor dem Live-Gang**
- [ ] Mindestgebühr festlegen und in `lib/pricing.ts` einbauen
- [ ] Koordinaten für alle Inserate, sonst keine Kartenansicht
- [ ] Der Host-Preis liegt heute noch im RSC-Payload der Detailseite (Listing-Objekt
      geht komplett an die Client-Komponenten). Unsichtbar, aber im Seitenquelltext
      lesbar. Löst sich, wenn der Server nur noch den Anzeigepreis ausliefert.
