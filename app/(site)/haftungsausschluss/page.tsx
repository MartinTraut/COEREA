import type { Metadata } from "next"

import { LegalShell } from "@/components/layout/legal-shell"

export const metadata: Metadata = {
  title: "Haftungsausschluss",
  description: "Haftung für Inhalte und Links sowie Urheberrechtshinweise für CoArea.",
  robots: { index: false, follow: true },
}

export default function HaftungsausschlussPage() {
  return (
    <LegalShell title="Haftungsausschluss" updated="Juli 2026">
      <h2>Haftung für Inhalte</h2>
      <p>
        Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die
        Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch
        keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG
        für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
        verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch
        nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
        überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
        Tätigkeit hinweisen.
      </p>

      <h2>Haftung für von Nutzenden eingestellte Inhalte</h2>
      <p>
        CoArea ist eine Vermittlungsplattform. Flächen-Inserate, Beschreibungen,
        Fotos und Preisangaben werden von den jeweiligen Hosts eigenverantwortlich
        eingestellt. Für die Richtigkeit dieser Angaben sowie das Zustandekommen und
        die Erfüllung von Nutzungsverträgen zwischen Hosts und Nutzenden übernehmen
        wir keine Haftung.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält gegebenenfalls Links zu externen Websites Dritter, auf
        deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten
        ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
        unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
        Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
        Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors
        bzw. Erstellers.
      </p>
    </LegalShell>
  )
}
