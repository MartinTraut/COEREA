import type { Metadata } from "next"

import { LegalShell, Todo } from "@/components/layout/legal-shell"

export const metadata: Metadata = {
  alternates: { canonical: "/cookies" },
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
        Technisch notwendige Cookies wären für den Betrieb erforderlich, etwa um
        eine Anmeldung zu speichern; sie dürften nach § 25 Abs. 2 TDDDG ohne
        gesonderte Einwilligung gesetzt werden.{" "}
        <strong>Derzeit setzt CoArea keine Cookies.</strong> Anmeldung und
        Merkliste dieses Prototyps liegen ausschließlich im lokalen Speicher
        Deines Browsers, siehe unten.
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
      <h2>Was im Browser gespeichert wird</h2>
      <p>
        Statt Cookies nutzt CoArea den lokalen Speicher Deines Browsers. Diese
        Angaben verlassen Dein Gerät nicht, werden nicht an uns übertragen und
        lassen sich über die Einstellungen Deines Browsers jederzeit löschen:
      </p>
      <ul>
        <li>
          <strong>coarea:saved-listings</strong> — die Flächen, die Du Dir
          gemerkt hast. Bleibt bis zum Löschen.
        </li>
        <li>
          <strong>coarea:newsletter</strong> — eine vorgemerkte
          E-Mail-Adresse, falls Du das Newsletter-Feld benutzt hast. Bleibt bis
          zum Löschen.
        </li>
        <li>
          <strong>coarea.demo-session</strong> — Name und E-Mail-Adresse aus der
          Demo-Anmeldung. Ohne „Angemeldet bleiben" endet der Eintrag mit dem
          Schließen des Tabs.
        </li>
        <li>
          <strong>coarea:booking</strong> — die zuletzt im Prototyp ausgefüllte
          Buchungsanfrage, damit die Bestätigungsseite sie anzeigen kann. Endet
          mit dem Schließen des Tabs.
        </li>
      </ul>
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
