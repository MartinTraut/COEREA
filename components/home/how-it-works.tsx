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
        text: "Ort, Zeitraum und Kategorie eingeben. Du siehst sofort, welche Flächen in Deinem Umkreis frei sind.",
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
        text: "Kategorie, Fotos, Lage und Beschreibung: vom innerstädtischen Hinterhof bis zur Forstfläche.",
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
    <section className="grain relative isolate overflow-hidden bg-cream">
      {/*
        The Schraffur used to fill this whole band at 60%, and the band directly
        below it is the teal one that was also fully hatched — two hatched
        fields back to back with nothing between them.

        Worse, it meant nothing here. The hatch carries a specific meaning on
        this site: it marks *private ground*, which is the one thing the eight
        category icons cannot say, and the strip above introduces it with a
        visible legend. Used as wallpaper on a third of the page it can no
        longer mark anything — the legend is left pointing at a pattern that is
        simply everywhere.

        So it is gone from here. The band is `grain bg-cream` — flat cream,
        grained only so it cannot posterise; it never needed a texture on top
        of that.
      */}

      <div className="relative container-page py-[clamp(3rem,5vw,6rem)]">
        <Reveal className="max-w-[52rem] block">
          <span className="eyebrow">Zwei Wege, drei Schritte</span>
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

          `.notch` gives it a deeper corner than an ordinary card, which is how
          the one important surface per section is marked since the diagonal cut
          was dropped.
        */}
        <Reveal delay={120} className="mt-[clamp(2.25rem,3.4vw,3.5rem)] block">
          <div className="notch notch-lg grid overflow-hidden bg-white [filter:drop-shadow(0_26px_50px_rgba(0,101,95,0.14))] lg:grid-cols-2">
            {PATHS.map((path, p) => (
              <div
                key={path.title}
                className={
                  /*
                    The two halves used to be identical white columns separated
                    by a hairline, so which side you were reading was carried by
                    a 12px eyebrow and nothing else — at a glance the card read
                    as one six-step list.

                    The host half now sits on a teal wash and carries filled
                    plates; the renter half stays white with light plates. Same
                    structure, two clearly different surfaces, and the wash also
                    tells you where the seam runs without the hairline having to
                    do that work alone.
                  */
                  p === 1
                    ? "relative bg-teal-50 p-[clamp(1.5rem,2.6vw,3rem)]"
                    : "p-[clamp(1.5rem,2.6vw,3rem)]"
                }
              >
                {/* The seam: horizontal while stacked, vertical side by side. */}
                {p === 1 ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px bg-teal/20 lg:inset-y-0 lg:right-auto lg:left-0 lg:h-auto lg:w-px"
                  />
                ) : null}
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
                          className="absolute top-[3.5rem] bottom-[0.4rem] left-[1.5rem] w-px bg-teal/25"
                        />
                      ) : null}

                      {/*
                        Shared plate. It used to be fluid (44→52px) while the
                        icon inside it stayed fixed at 22px, so the icon-to-plate
                        ratio slid from 50% on a phone to 42% on a desktop — the
                        same component looking differently proportioned
                        depending on the window. Fixed plate, fixed icon.

                        The step number used to be a round badge notched into
                        the plate's corner, where a circle overlapped a 12px
                        rounded corner across about six pixels and cut into its
                        arc. Two radii fighting over the same corner is a large
                        part of what read as "komisch". The number belongs with
                        the step title anyway — that is what it numbers.
                      */}
                      <span
                        className={`icon-plate icon-plate-hover${p === 1 ? " icon-plate-solid" : ""}`}
                      >
                        <step.icon strokeWidth={1.5} />
                      </span>

                      <span className="min-w-0 pt-0.5">
                        <span className="flex items-baseline gap-2.5 text-[clamp(1rem,0.4vw+0.85rem,1.125rem)]/[1.35] font-semibold text-ink-900">
                          <span
                            aria-hidden
                            className="shrink-0 text-[0.8125rem] font-bold text-teal/55 tabular-nums"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
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
                    p === 0 ? "btn-teal" : "btn-outline"
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
