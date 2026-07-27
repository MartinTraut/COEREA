import Link from "next/link"
import { ArrowRight, CalendarCheck, ClipboardList, Handshake, KeyRound, MapPinned, SlidersHorizontal } from "lucide-react"

import { Reveal } from "@/components/brand/reveal"

/*
  „So funktioniert CoArea".

  The page argued why sharing land is a good idea (Benefits) and showed what is
  on offer (the listing rows), but never once explained the mechanism — and the
  mechanism is the single most asked-about thing on a two-sided marketplace,
  because both sides arrive suspicious: the renter wonders what they are
  committing to, the owner wonders who is about to walk onto their property.

  So it is written as two paths, not one funnel. A merged „1-2-3" would have to
  describe both roles at once and end up describing neither; side by side, each
  visitor can read their own column and ignore the other.

  Every step here is a step the prototype actually performs — search and filter,
  an enquiry that is not binding, a host who confirms, then direct contact. What
  the platform does not yet do (take the payment, run a chat) is not implied by
  any of the six lines.
*/
const PATHS = [
  {
    role: "Für Nutzer*innen",
    title: "Du suchst eine Fläche",
    steps: [
      {
        icon: MapPinned,
        title: "Suchen und filtern",
        text: "Ort, Zeitraum und Kategorie eingeben — Du siehst sofort, welche Flächen in Deinem Umkreis frei sind.",
      },
      {
        icon: CalendarCheck,
        title: "Unverbindlich anfragen",
        text: "Zeitraum wählen und Anfrage an den Host schicken. Die Anfrage kostet nichts und bindet Dich zu nichts.",
      },
      {
        icon: KeyRound,
        title: "Bestätigung und Nutzung",
        text: "Sobald der Host bestätigt, bekommst Du die Buchungsdetails und seine Kontaktdaten für Zugang und Übergabe.",
      },
    ],
    cta: { label: "Flächen entdecken", href: "/flaechen" },
  },
  {
    role: "Für Hosts",
    title: "Du hast eine Fläche",
    steps: [
      {
        icon: ClipboardList,
        title: "Fläche kostenlos anlegen",
        text: "Kategorie, Fotos, Lage und Beschreibung — vom innerstädtischen Hinterhof bis zur Forstfläche.",
      },
      {
        icon: SlidersHorizontal,
        title: "Preis und Regeln bestimmen",
        text: "Du legst fest, ob pro Stunde, Tag, Woche oder Monat abgerechnet wird, wann die Fläche frei ist und was auf ihr erlaubt ist.",
      },
      {
        icon: Handshake,
        title: "Anfragen einzeln prüfen",
        text: "Jede Anfrage nimmst Du an oder lehnst sie ab. Nichts wird über Deinen Kopf hinweg gebucht.",
      },
    ],
    cta: { label: "Host werden", href: "/host-werden" },
  },
] as const

export function HowItWorks() {
  return (
    <section className="mesh grain relative isolate overflow-hidden bg-cream">
      {/* Schraffur through the whole band, as everywhere else on the site. */}
      <span aria-hidden className="hatch-soft absolute inset-0 opacity-60" />

      <div className="relative container-page py-[clamp(3rem,5vw,6rem)]">
        <Reveal className="max-w-[52rem] block">
          <span className="eyebrow">In drei Schritten</span>
          <h2 className="h-plain mt-4">So funktioniert CoArea</h2>
          <p className="mt-6 text-[clamp(1rem,0.5vw+0.78rem,1.1875rem)]/[1.65] text-ink">
            Zwei Wege, ein Prinzip: Fläche, die schon da ist, wird für eine
            bestimmte Zeit geteilt. Wer welchen Weg geht, entscheidet nur, auf
            welcher Seite der Anfrage Du stehst.
          </p>
        </Reveal>

        {/*
          One card, split in two — not two cards. The paths belong to the same
          transaction seen from either end, and a hairline says that far better
          than a gap does.

          `filter: drop-shadow` rather than `box-shadow`, because clip-path also
          clips the shadow off a notched surface.
        */}
        {/*
          The reveal has to stay on the outside: `.reveal-clip` animates a
          clip-path of its own, and a second clip-path from `.notch` on the same
          element would simply replace it — and would cut the drop-shadow off
          besides.
        */}
        <Reveal delay={120} className="mt-[clamp(2.25rem,3.4vw,3.5rem)] block">
          <div className="notch notch-lg grid bg-white [filter:drop-shadow(0_26px_50px_rgba(0,101,95,0.14))] lg:grid-cols-2">
            {PATHS.map((path, p) => (
              <div
                key={path.title}
                className={
                  /* The seam: a rule between the two halves, horizontal when
                     stacked, vertical once they sit side by side. */
                  p === 1
                    ? "border-t border-border p-[clamp(1.5rem,2.6vw,3rem)] lg:border-t-0 lg:border-l"
                    : "p-[clamp(1.5rem,2.6vw,3rem)]"
                }
              >
                <span className="eyebrow">{path.role}</span>
                <h3 className="mt-4 text-[clamp(1.25rem,1vw+0.8rem,1.75rem)]/[1.2] font-semibold text-ink-900">
                  {path.title}
                </h3>

                <ol className="mt-[clamp(1.5rem,2.2vw,2.25rem)] space-y-0">
                  {path.steps.map((step, i) => (
                    <li
                      key={step.title}
                      className="group relative flex gap-[clamp(1rem,1.4vw,1.5rem)] pb-[clamp(1.5rem,2vw,2rem)] last:pb-0"
                    >
                      {/*
                        The connector. It runs from one step marker to the next
                        and stops at the last one, so the column reads as a
                        sequence rather than as three unrelated rows.
                      */}
                      {i < path.steps.length - 1 ? (
                        <span
                          aria-hidden
                          className="absolute top-[clamp(2.75rem,3.4vw,3.25rem)] bottom-[0.4rem] left-[clamp(1.34rem,1.7vw,1.62rem)] w-px bg-gradient-to-b from-teal/35 to-teal/5"
                        />
                      ) : null}

                      <span className="relative grid h-[clamp(2.75rem,3.4vw,3.25rem)] w-[clamp(2.75rem,3.4vw,3.25rem)] shrink-0 place-items-center bg-teal-50 text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                        <step.icon
                          className="h-[1.375rem] w-[1.375rem]"
                          strokeWidth={1.75}
                        />
                        {/* Step number, tucked into the corner of the plate —
                            small, because the icon is the thing being read. */}
                        <span className="absolute -top-1.5 -right-1.5 grid h-[1.125rem] w-[1.125rem] place-items-center bg-teal text-[0.625rem] leading-none font-bold text-white transition-colors duration-300 group-hover:bg-ink-900">
                          {i + 1}
                        </span>
                      </span>

                      <span className="min-w-0 pt-0.5">
                        <span className="block text-[clamp(1rem,0.4vw+0.85rem,1.125rem)]/[1.35] font-semibold text-ink-900">
                          {step.title}
                        </span>
                        <span className="mt-2 block text-[0.9375rem]/[1.65] text-ink">
                          {step.text}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>

                <Link
                  href={path.cta.href}
                  className={`btn group mt-[clamp(1.75rem,2.4vw,2.5rem)] h-12 px-6 text-sm ${
                    p === 0 ? "btn-teal sheen" : "btn-outline"
                  }`}
                >
                  {path.cta.label}
                  <span className="arrow-nudge inline-flex">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
