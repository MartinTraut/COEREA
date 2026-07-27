import type { Metadata } from "next"

import { LegalShell, Todo } from "@/components/layout/legal-shell"

export const metadata: Metadata = {
  title: "Cookie-Richtlinie (EU)",
  description: "Informationen zu Cookies und Deinen Einstellungsmöglichkeiten bei CoArea.",
  robots: { index: false, follow: true },
}

export default function CookiesPage() {
  return (
    <LegalShell
      title="Cookie-Richtlinie (EU)"
      intro="Diese Richtlinie erklärt, was Cookies sind, welche wir einsetzen und wie Du Deine Einwilligung jederzeit anpassen kannst."
      updated="Juli 2026"
    >
      <h2>Was sind Cookies?</h2>
      <p>
        Cookies sind kleine Textdateien, die beim Besuch einer Website auf Deinem
        Endgerät gespeichert werden. Sie ermöglichen es, Dein Gerät wiederzuerkennen
        und bestimmte Funktionen bereitzustellen.
      </p>

      <h2>Technisch notwendige Cookies</h2>
      <p>
        Diese Cookies sind für den Betrieb der Website erforderlich, etwa um Deine
        Anmeldung oder Deine Cookie-Auswahl zu speichern. Sie werden auf Grundlage
        von § 25 Abs. 2 TDDDG ohne gesonderte Einwilligung gesetzt.
      </p>

      <h2>Optionale Cookies (Statistik &amp; Marketing)</h2>
      <p>
        Cookies zur Reichweitenmessung oder für Marketing setzen wir ausschließlich
        mit Deiner Einwilligung (§ 25 Abs. 1 TDDDG, Art. 6 Abs. 1 lit. a DSGVO).
      </p>
      <p>
        <Todo>
          Konkret eingesetzte Cookies tabellarisch auflisten (Name, Anbieter, Zweck,
          Speicherdauer), sobald Analyse-/Marketing-Tools feststehen
        </Todo>
      </p>

      <h2>Deine Einwilligung verwalten</h2>
      <p>
        Aktuell setzt diese Website <strong>keine</strong> Analyse- oder
        Marketing-Cookies. Schriften werden lokal von unserem eigenen Server
        ausgeliefert, es werden keine Inhalte von Drittanbietern nachgeladen, und
        es findet keine Reichweitenmessung statt. Eine Einwilligung ist deshalb
        derzeit nicht erforderlich, und aus demselben Grund gibt es bewusst kein
        Cookie-Banner.
      </p>
      <p>
        Technisch notwendige Angaben, etwa Deine gemerkten Flächen, speichern wir
        ausschließlich lokal in Deinem Browser (localStorage). Sie verlassen Dein
        Gerät nicht und lassen sich über die Einstellungen Deines Browsers jederzeit
        löschen.
      </p>
      <p>
        <Todo>
          Sobald Analyse- oder Marketing-Tools eingeführt werden: Consent-Management-
          Tool einbinden, Widerrufs-Button im Footer ergänzen und hier verlinken
        </Todo>
      </p>

      <h2>Weitere Informationen</h2>
      <p>
        Ausführliche Informationen zur Verarbeitung Deiner Daten findest Du in unserer{" "}
        <a href="/datenschutz">Datenschutzerklärung</a>.
      </p>
    </LegalShell>
  )
}
