import type { Metadata } from "next"

import { SITE } from "@/lib/site"
import { LegalShell, Todo } from "@/components/layout/legal-shell"

export const metadata: Metadata = {
  alternates: { canonical: "/impressum" },
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung der CoArea GmbH gemäß § 5 DDG.",
  robots: { index: false, follow: true },
}

export default function ImpressumPage() {
  const { contact, legalName } = SITE
  return (
    <LegalShell title="Impressum" intro="Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz).">
      <h2>Anbieter</h2>
      <p>
        <strong>{legalName}</strong>
        <br />
        {contact.street}
        <br />
        {contact.zip} {contact.city}
        <br />
        {contact.country}
      </p>

      <h2>Vertreten durch</h2>
      <p>
        Geschäftsführung: René Volker, Barbara Funke
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
        <br />
        E-Mail: <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </p>

      <h2>Registereintrag</h2>
      <p>
        {/* Stand als Tatsachenbehauptung da, waehrend Gericht und Nummer offen
            sind: halb behauptet ist schlechter als offen markiert. */}
        <Todo>Bestehen des Handelsregistereintrags pruefen und bestaetigen</Todo>
        <br />
        Registergericht: <Todo>Amtsgericht ergänzen</Todo>
        <br />
        Registernummer: <Todo>HRB-Nummer ergänzen</Todo>
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
        <br />
        <Todo>USt-IdNr. ergänzen</Todo>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        <Todo>Name und Anschrift der verantwortlichen Person ergänzen</Todo>
        <br />
        {contact.street}, {contact.zip} {contact.city}
      </p>

      <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
        einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftungs- und Urheberrechtshinweise</h2>
      <p>
        Hinweise zur Haftung für Inhalte, Links und zum Urheberrecht finden Sie in
        unserem <a href="/haftungsausschluss">Haftungsausschluss</a>. Informationen
        zum Umgang mit Ihren Daten enthält unsere{" "}
        <a href="/datenschutz">Datenschutzerklärung</a>.
      </p>
    </LegalShell>
  )
}
