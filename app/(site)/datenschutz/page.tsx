import type { Metadata } from "next"

import { SITE } from "@/lib/site"
import { LegalShell, Todo } from "@/components/layout/legal-shell"

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten bei CoArea gemäß DSGVO.",
  robots: { index: false, follow: true },
}

export default function DatenschutzPage() {
  const { contact, legalName } = SITE
  return (
    <LegalShell
      title="Datenschutzerklärung"
      intro="Der Schutz Deiner personenbezogenen Daten ist uns wichtig. Nachfolgend informieren wir Dich über die Verarbeitung Deiner Daten bei der Nutzung von CoArea gemäß der Datenschutz-Grundverordnung (DSGVO)."
      updated="Juli 2026"
    >
      <p>
        <strong>Hinweis:</strong> Diese Datenschutzerklärung ist ein sorgfältig
        strukturierter Rahmen. Vor dem Livegang muss sie durch die konkret
        eingesetzten Dienste (Hosting, Analyse, Zahlungsdienstleister) ergänzt und{" "}
        <Todo>anwaltlich geprüft werden</Todo>.
      </p>

      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        <strong>{legalName}</strong>, {contact.street}, {contact.zip} {contact.city}
        <br />
        E-Mail: <a href={`mailto:${contact.email}`}>{contact.email}</a> · Telefon:{" "}
        <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
      </p>

      <h2>2. Datenschutzbeauftragter</h2>
      <p>
        <Todo>
          Kontaktdaten des Datenschutzbeauftragten ergänzen, sofern gesetzlich
          erforderlich (Art. 37 DSGVO)
        </Todo>
      </p>

      <h2>3. Deine Rechte</h2>
      <p>Dir stehen gegenüber uns folgende Rechte hinsichtlich Deiner personenbezogenen Daten zu:</p>
      <ul>
        <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
        <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
        <li>Recht auf Löschung (Art. 17 DSGVO)</li>
        <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruchsrecht gegen die Verarbeitung (Art. 21 DSGVO)</li>
        <li>Recht auf Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
      </ul>
      <p>
        Zudem hast Du das Recht, Dich bei einer Datenschutz-Aufsichtsbehörde über
        die Verarbeitung Deiner personenbezogenen Daten zu beschweren.
      </p>

      <h2>4. Erhebung von Daten beim Besuch der Website</h2>
      <p>
        Bei der informatorischen Nutzung der Website erheben wir nur die Daten, die
        Dein Browser an unseren Server übermittelt (Server-Logfiles): IP-Adresse,
        Datum und Uhrzeit der Anfrage, aufgerufene Seite, Referrer-URL sowie Browser-
        und Betriebssystem-Informationen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
        DSGVO (berechtigtes Interesse an einem sicheren, stabilen Betrieb).
      </p>
      <p>
        <strong>Hosting:</strong> <Todo>Hosting-Anbieter und Auftragsverarbeitungsvertrag benennen</Todo>
      </p>

      <h2>5. Kontaktaufnahme</h2>
      <p>
        Wenn Du uns per Formular oder E-Mail kontaktierst, verarbeiten wir Deine
        Angaben zur Bearbeitung der Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
        bzw. lit. f DSGVO. Die Daten werden gelöscht, sobald sie für die Erreichung
        des Zwecks nicht mehr erforderlich sind.
      </p>

      <h2>6. Nutzerkonto, Buchungen &amp; Vermittlung</h2>
      <p>
        Zur Registrierung, Verwaltung von Flächen-Inseraten und Abwicklung von
        Buchungsanfragen verarbeiten wir die von Dir angegebenen Bestands- und
        Nutzungsdaten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertrag bzw.
        vorvertragliche Maßnahmen).
      </p>

      <h2>7. Zahlungsabwicklung</h2>
      <p>
        <Todo>
          Eingesetzten Zahlungsdienstleister (z. B. Stripe) samt Datenverarbeitung
          und Rechtsgrundlage ergänzen
        </Todo>
      </p>

      <h2>8. Cookies &amp; Reichweitenmessung</h2>
      <p>
        Details zu eingesetzten Cookies und Deinen Wahlmöglichkeiten findest Du in
        unserer <a href="/cookies">Cookie-Richtlinie</a>. Nicht technisch notwendige
        Cookies setzen wir nur auf Grundlage Deiner Einwilligung (Art. 6 Abs. 1 lit. a
        DSGVO, § 25 Abs. 1 TDDDG).
      </p>

      <h2>9. Speicherdauer</h2>
      <p>
        Wir verarbeiten Deine Daten nur so lange, wie es für die genannten Zwecke
        erforderlich ist oder gesetzliche Aufbewahrungsfristen dies vorsehen.
      </p>
    </LegalShell>
  )
}
