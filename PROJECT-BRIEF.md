# CoArea — Projekt-Brief

> Quelle der Wahrheit: Bachelorarbeits-Broschüre von Daniela Götz (SoSe 2023,
> Kommunikationsdesign) + Figma-Design (aus Adobe XD importiert) + WhatsApp-Abstimmung.
> Dieses Dokument fasst Mission, Konzept, Marke und Bauplan zusammen. Fakten sind
> aus der Broschüre verifiziert; offene Punkte sind als `TODO` markiert.

## 1. Was ist CoArea?

CoArea ist eine **Plattform (zweiseitiger Marktplatz) für die gemeinschaftliche
Nutzung ungenutzter Freiflächen** — quasi „Airbnb für Flächen". Flächen-Eigentümer
bieten ungenutzte Flächen an und verdienen daran; Nutzer finden, buchen und nutzen
diese Flächen.

- **Name:** „Co" (Common) + „Area" → **CoArea**
- **Claim:** *„Gemeinsam nutzen, nachhaltig erleben."*
- **Kernnutzen:** Win-Win — Eigentümer generieren Einnahmen aus Leerstand,
  Nutzer bekommen Zugang zu Fläche, die Gesellschaft spart Flächenverbrauch.

## 2. Mission & „Warum" (der Kern der Story)

Der emotionale und rationale Aufhänger ist **Nachhaltigkeit durch Flächen-Sharing**:

- In Deutschland werden **täglich ~55 Hektar** Land neu als Siedlungs-, Nutz- und
  Verkehrsfläche ausgewiesen (≈ 78 Fußballfelder / Tag).
- Ziel der Bundesregierung: **< 30 ha/Tag bis 2030**, langfristig **Netto-Null**.
- Flächenverbrauch zerstört Böden, treibt Zersiedelung, senkt Lebensqualität.
- **Lösung von CoArea:** bestehende Flächen effizienter teilen statt neu versiegeln
  → ökologischer, wirtschaftlicher **und** sozialer Nutzen (mehr Begegnung,
  neue Freundschaften, Community).
- Leitidee: **„Commons"** — gemeinschaftliches Eigentum & geteilte Verantwortung.

Diese Mission ist der rote Faden der ganzen Website, nicht nur ein Nebensatz.

## 3. Zielgruppen (zwei Seiten)

| Seite | Wer | Motivation | Primär-CTA |
|---|---|---|---|
| **Nutzer / Suchende** | Familien, Vereine, Hobby-Gärtner, Sportgruppen, Landwirte, Gewerbe | Fläche finden & buchen | „Fläche finden" |
| **Anbieter / Gastgeber** | Grundstücks-, Garten-, Agrar-, Gewerbeflächen-Eigentümer | Leerstand monetarisieren + nachhaltig beitragen | „Fläche anbieten" |

## 4. Die 4 Flächen-Kategorien (zentrale IA-Bausteine)

Jede Kategorie hat ein eigenes Outline-Icon und ein reales Nutzer-Szenario:

1. **Innerstädtische private Gärten / Grünanlagen** — Icon: Blume/Klee
   *Szenario:* Familie Schmitz teilt großen Garten, Familie Müller bucht ihn.
   Zitat: *„Wir können mitten in der Stadt gärtnern und unsere Kinder sind begeistert." – Familie Müller*
2. **Öffentliche Sport- & Freizeitflächen** — Icon: Fußball
   *Szenario:* 4 Freunde mieten Kunstrasenplatz (Sportring 09) für Charity-Fußballturnier.
3. **Agrar- & Forstflächen** — Icon: Sonne + Ähren
   *Szenario:* Burhan Ay & Sandra Frey mieten 2 ha von Roland Schick für ihren Bauernhof-Traum.
   Zitat: *„Durch CoArea konnten wir uns den Traum von einem eigenen kleinen Bauernhof verwirklichen!" – Burhan Ay*
4. **Gewerbliche Flächen** — Icon: Lagerhalle/Gewerbe
   *Szenario:* Eltern-Community mietet Fläche von Schreiner Hans Schüller für einen Flohmarkt.

## 5. Marke & Design-System (FINAL — aus BA-Präsentation verifiziert)

**Farben (exakt aus Farbkonzept-Seite gesampelt):**
- Primär-Teal: **`#2D8D80`** (`rgb(45,141,128)`) — Marke, Flächen, CTAs, Headline-Rahmen
- Text/Dunkelgrau: **`#29292A`** — Fließtext & Überschriften
- Hintergrund Creme: **`#F0EDEB`** — warmer Off-White-Grund
- Weiß: **`#FFFFFF`**
- Grautöne als Kontrast/Sekundär. „Grün als Primärfarbe, Weiß und Grautöne als
  Kontrast, dunkles Grau für Fließtext" (Zitat Konzept). Bewusst reduzierte Palette.

**Typografie (Zitat Präsentation):**
- **Gotham Light** (Fließtext/Light) + **Gotham Medium** (Headlines/Betonung)
- Gotham ist eine **lizenzpflichtige** Schrift (Hoefler&Co). Web-Optionen:
  (a) Gotham Webfont lizenzieren, (b) **Montserrat** als kostenloser, sehr naher
  geometrischer Ersatz (Default fürs Erste). → Entscheidung nötig.
- Logo ist ein **eigenes Wordmark** „co area" (custom, rundes Geometric, gestapelt,
  markantes gespiegeltes „r") — separat vom Fließtext-Font.
- Fluid Type via `clamp()` (Vorgabe globaler Standard).

**Visuelle Sprache / Motive (verifiziert):**
- **Diagonale Schraffur** (parallele Teal-Linien) — abgeleitet aus Stadt-/Bauplänen
  („Verbindung zu urbanem/baulichem Kontext"); als Textur auf Bändern/Flächen/Postern.
- **Headline-Rahmen** — Outline-„Tab"-Box (Rechteck mit versetzter/gekerbter Ecke) um
  Überschriften; teal-auf-weiß und weiß-auf-Foto. **Signature-Element der Marke.**
- **Icon-Set** (teal, outline + filled): Blume (private Gärten), Sonne+Ähren (Agrar/
  Forst), Lagerhalle & Marktstand (Gewerbe), Fußball outline/filled (öffentl./private
  Sport), Baum+Bank, Gebäude (öffentl. Plätze/Grünanlagen).
- **Bildsprache:** echte, warme Lifestyle-Fotografie (Urban Gardening, Schafe/Hof,
  Kinder-Sport, Rooftop-Garten) — oft mit Claim + `www.coarea.de` im weißen Rahmen.

**Positionierung (Präsentation S.14):** coarea = **modern · individuell · praktisch ·
zugänglich** (Konkurrenz = klassisch/standardisiert/aufwendig/technisch). Marke soll
zugänglich & persönlich wirken, **nicht** technisch-korporativ.

**Wettbewerb (Benchmark):** Airbnb (Marktplatz-UX), meine ernte (Garten mieten),
JLL (Gewerbeflächen), ebay Kleinanzeigen/Kleinanzeigen (Flächen-Inserate).

**Tonalität:** warm, gemeinschaftlich, optimistisch, glaubwürdig; Nachhaltigkeit
ohne Öko-Kitsch; „Bewegung, der man beitritt".

## 6. Verifizierte Fakten (Impressum/Kontakt)

- **Firma:** CoArea GmbH
- **Adresse:** Baacher Str. 46, 50999 Köln, Deutschland
- **Tel:** 02131 / 43004400
- **E-Mail:** info@coarea.de
- **Web:** www.coarea.de
- **Social:** Facebook, Instagram, LinkedIn, Xing

## 7. Tech-Stack (bereits gescaffoldet)

Next.js 16 (App Router), React 19, TypeScript, Tailwind 4, shadcn/ui, base-ui,
next-themes. Motion: Framer Motion + lokale Libraries (react-bits/magicui/animata).

## 8. Fünf UX-Kernfragen (müssen auf der Startseite beantwortet sein)

1. **Was?** Plattform zum Teilen ungenutzter Flächen.
2. **Für wen?** Flächen-Suchende & Flächen-Anbieter (4 Kategorien).
3. **Warum besser?** Nachhaltig (Flächenverbrauch senken) + Einnahmen + Community.
4. **Warum vertrauen?** Echte Nutzer-Szenarien & Testimonials, GmbH, klare Mission.
5. **Nächster Schritt?** „Fläche finden" / „Fläche anbieten".

## 9. Produkt-Typ (WICHTIG — aus Design-Video verifiziert)

CoArea ist **kein reines Marketing-Website-Projekt**, sondern eine **mobile-first
Marktplatz-Web-App** („Airbnb für Flächen") mit öffentlichem Teil *und* eingeloggtem
App-Bereich (Host-/User-Dashboard). Das Design im Video ist durchgehend Mobile.

## 10. Screen-Inventar (aus Design-Video verifiziert)

**Öffentlich / Marketing**
1. **Home** — Hero + Such-Widget („Wo möchtest Du eine CoArea mieten?" / Zeitraum /
   User), Intro, „Neu inserierte Flächen" (Card-Carousel), „Deine Vorteile mit CoArea"
   (4 Benefit-Icons), „Das sagen unsere Host & User" (Testimonials + Sterne),
   Newsletter-Anmeldung, „Aktuelle News", Footer
2. **Flächen entdecken** (Suche) — 4 Kategorie-Tabs, Filter + Suche, „Karte anzeigen"-
   Toggle, Listing-Cards
3. **Kartenansicht** — Map mit Pins, „Entdecke CoArea in Deiner Nähe", Such-Form
4. **Über Uns** — Mission, Vision, „Die Gründer von CoArea" (Team: u.a. Rudolf Traut –
   Projektentwickler, Leonard Thomas – Digital Architect), Zitate
5. **Kontakt** — Öffnungszeiten, E-Mail, Telefon, Adresse, Social
6. **Host werden** — CTA-Seite für Flächen-Anbieter

**Buchungs-Flow**
7. **Listing-Detail** — Galerie, Kategorie, Titel, Zeitraum, Ort, Preis, Beschreibung,
   „Host dieser CoArea" (Profil: Name, Alter, Bewertungen, Sterne 4.8/5, Host seit),
   Host-Nachricht, „Verfügbarkeit"-Widget (Zeitraum / Anzahl User / Nutzungszweck /
   Gesamtbetrag / „Verfügbarkeit prüfen"), „Weitere Flächen vom Host", Reviews,
   „FAQ zu deiner Buchung" (Accordion)
8. **Buchungsanfrage abschließen** — Login/Register-Prompt, Zusammenfassung, Host-Card,
   Gesamtbetrag, „Buchungsanfrage senden"
9. **Buchungsanfrage abgeschlossen** — Erfolgsscreen + „Nachricht an Host" (Chat)

**Auth**
10. **Anmelden / Registrieren** — E-Mail, Passwort, „weiter", „Jetzt registrieren"
11. **Menü-Overlay** (Hamburger) — Navigation + inline Login

**Eingeloggter App-Bereich (Host/User)**
12. **Willkommen zurück, [Name]!** — Profilkarte
13. **Dein Dashboard** — „Deine aktuell inserierten CoArea" (Anzahl), „Deine Einnahmen"
    (Betrag + Balkendiagramm Jahresverlauf)
14. **Bottom-Tab-Bar** (App-Nav): Home / Flächen / Inserieren (+) / Chat / Profil
15. **Deine Fläche kann mehr!** — Potenzial-Check-CTA, „Fläche inserieren"
16. **Deine Ansprechperson** (Host-Support: Florian Hessing) — Chat/E-Mail/Telefon
17. **Deine Bewertungen** — Reviews
18. **Konto-Overlay** — Mein Konto, Meine CoArea, Meine Unterlagen, Buchungsanfragen,
    Upload-Bereich, Nachrichten, Fläche inserieren, Bestellungen, Buchungsübersicht,
    Hilfe, Host-Support, Abmelden

## 11. Design-Details (aus Video verifiziert)

- Durchgehend **grün-weiß**: Teal-Petrol + Frischgrün; große grüne Vollflächen-Sektionen
- **Card-basierte Listings** (Foto, Kategorie-Label, Titel, Datum, Ort, Preis, Herz/Save, Teilen)
- **Outline-„Tab"-Headlines** (Rechteck mit Kerbe) durchgängig
- **Diagonale Schraffur** als Sektions-Trenner/Textur
- Logo „co area" oben links, **Hamburger „///"** oben rechts
- App-Bereich mit **Bottom-Tab-Bar** + Sterne-Ratings, Chat, Diagramm

## 12. Empfohlene Bau-Phasen

- **Phase 1 — Frontend/Marketing (jetzt baubar, design-treu):** Home, Flächen entdecken
  (UI + Filter + Karte), Listing-Detail, Über Uns, Kontakt, Host-werden — responsiv,
  mit Mock-Daten. Bringt das Design „zum Leben".
- **Phase 2 — App-Funktionalität:** Auth/Registrierung, echte Buchungsanfragen,
  Host-Dashboard, Nachrichten/Chat, Bewertungen → braucht Backend (DB/Auth/API).
- **Phase 3 — Betrieb:** Zahlungen, echte Kartendaten, Uploads, Support-Flows.

## 13. Quellen-Status & offene Punkte

**Quellen (vollständig ausgewertet):**
- ✅ BA-Broschüre (Konzept, Szenarien, Marke)
- ✅ BA-Präsentation (Design-System, Positionierung, **Desktop + Mobile Layouts**)
- ✅ Design-Video (alle App-Screens, Interaktion)
- ➖ Figma/Adobe XD **nicht mehr nötig** — Quellen oben decken alles ab.

**Filter-Kategorien der Plattform (Discover, 8 statt der 4 Makro-Themen):**
Innerstädtische private Gärten · Agrar- & Forstflächen · Öffentl. Sport- &
Freizeitflächen · Private Sport- & Freizeitflächen · Gewerbliche Flächen ·
Innerstädtische private Plätze · Innerstädtische öffentl. Plätze · Innerstädtische
öffentl. Grünanlagen.

**Verifizierte Firmen-/Team-Daten (aus Briefbogen/Visitenkarte):**
CoArea GmbH · Baacher Str. 46, 50999 Köln · T 02131/43004400 · info@coarea.de ·
www.coarea.de · Mo–Fr 09:00–18:00 & nach Termin · Geschäftsführung René Volker &
Barbara Funke · Sales: Paul Westermann / Susanne Lemden · Bank: Volksbank.

**Offene Entscheidungen:**
- ⚠️ **Font:** Gotham lizenzieren **oder** Montserrat als Free-Ersatz (Default). → Go?
- ⚠️ **Scope Phase 1:** Frontend design-treu mit Mock-Daten (empfohlen) vs. direkt Backend.
- `TODO` reale Bilder/Assets & Rechte klären — sonst hochwertige Platzhalter.
