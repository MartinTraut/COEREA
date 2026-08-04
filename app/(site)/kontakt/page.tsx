import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react"

import { SITE } from "@/lib/site"
import { Reveal } from "@/components/brand/reveal"
import { TabHeading } from "@/components/brand/tab-heading"
import { ContactForm } from "@/components/contact/contact-form"

export const metadata: Metadata = {
  alternates: { canonical: "/kontakt" },
  title: "Kontakt",
  description:
    "Kontaktiere CoArea per E-Mail, Telefon oder über unser Kontaktformular. Wir beraten Dich gern zur optimalen Nutzung Deiner Flächen.",
}

/*
  The three ways to reach us, as their own cards rather than as a bullet list.
  Two of them act on click (write, call); the third is an address, so it stays
  plain text instead of pretending to be a link to a map we do not embed.

  The address is split into two lines. As one string it was the longest value of
  the three by a wide margin, so it wrapped at an arbitrary point — „Baacher
  Str. 46, 50999" / „Köln" at one width, mid-street-name at another — and the
  card it sat in was the only one whose value block was two lines tall. A postal
  address has a line break of its own; using it makes the wrap deliberate and
  the same at every width.
*/
const CHANNELS = [
  {
    icon: Mail,
    label: "E-Mail",
    lines: [SITE.contact.email],
    href: `mailto:${SITE.contact.email}`,
    note: "Antwort in der Regel am selben Werktag.",
  },
  {
    icon: Phone,
    label: "Telefon",
    lines: [SITE.contact.phone],
    href: `tel:${SITE.contact.phoneHref}`,
    note: SITE.contact.hours,
  },
  {
    icon: MapPin,
    label: "Adresse",
    lines: [SITE.contact.street, `${SITE.contact.zip} ${SITE.contact.city}`],
    href: null,
    note: "Besuche bitte nach Terminvereinbarung.",
  },
] as const

/* Where most questions actually belong — answered faster than by mail. */
const ROUTES = [
  {
    href: "/host-werden",
    title: "Du hast eine Fläche",
    text: "Wie das Inserieren läuft, was Du verdienen kannst und wer entscheidet.",
  },
  {
    href: "/hilfe",
    title: "Fragen zur Buchung",
    /* „Versicherung" stood here and wird im Hilfe-Bereich nirgends beantwortet:
       ein Verweis auf eine Antwort, die es nicht gibt. Die drei genannten
       Themen sind dort tatsächlich beantwortet. */
    text: "Ablauf, Kosten und Storno: im Hilfe-Bereich Schritt für Schritt beantwortet.",
  },
  {
    href: "/businesspartner",
    title: "Kooperation & Presse",
    text: "Für Unternehmen, Kommunen und Medienanfragen gibt es eigene Wege.",
  },
] as const

export default function KontaktPage() {
  return (
    <div>
      {/*
        Opening band. The page used to start with a heading, one paragraph and a
        four-item list stacked in the top-left corner of an otherwise empty
        white page — measured, the content filled about a fifth of the first
        screen. It now opens on the brand's own lit surface, with the three
        channels as the first thing to reach for.
      */}
      <section className="mesh grain relative isolate overflow-hidden border-b border-border/60 bg-cream">
        <div className="relative container-page py-[clamp(2.75rem,4.5vw+0.5rem,6rem)]">
          <Reveal>
            <span className="eyebrow">Kontakt</span>
            <TabHeading as="h1" className="mt-4 text-[clamp(1.7rem,2.4vw+0.6rem,3.25rem)]/[1.1]">
              Kontakt
            </TabHeading>
            <p className="mt-6 max-w-[52ch] text-[clamp(1.0625rem,0.6vw+0.85rem,1.375rem)]/[1.45] text-ink-900">
              Du hast Fragen zu einer Fläche, möchtest Host werden oder brauchst
              Beratung? Schreib uns, ruf an oder nutze das Formular. Wir sind
              für Dich da.
            </p>
          </Reveal>

          {/*
            The three channels, composed vertically rather than as icon-beside-
            text rows.

            The row used to be three interchangeable boxes: the same pale square
            on the left, the same three lines of steadily shrinking grey on the
            right, no brand colour anywhere and no edge — plain `.surface` on the
            cream band draws #e4e4e4 on #f0edeb, which at 1,1 : 1 is not a
            boundary. Three findings drove the rebuild:

            · The value is what somebody came for — the address, the number to
              dial. It was set at 17px, a hair above the note under it, so the
              card had no focal point and all three read as one grey mass.
            · The notes are one, two and one line long, so the cards ended on
              three different baselines. The note now sits on `mt-auto` above a
              hairline: whatever the value block does, every card closes on the
              same line.
            · Nothing distinguished the address — the only card that does not
              act on click — from the two that do. The corner arrow appears on
              those two alone, so the difference is stated instead of merely
              being there.

            The 3px lit edge and `.icon-plate` are both devices this site already
            uses (the price card on a listing, every icon on the homepage); this
            row was simply not using them.
          */}
          {/*
            Three cards in a two-column grid leave a hole, and this row sat in
            one from 640px to 1024px — two cards, then a lone card beside an
            empty half. The third spans the full width for exactly that range
            instead; an address is the one of the three that reads fine wide.
            Above 768px all three fit abreast, so the special case ends there.
          */}
          <div className="mt-[clamp(2rem,3vw,3rem)] grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {CHANNELS.map((c, i) => {
              const body = (
                <>
                  {/*
                    Led horizontally, not on the shared 135° ramp.

                    `--grad-teal-bright` is built for a surface with some height
                    to it. Run across a 3px × ~590px edge, a 135° ramp completes
                    inside the first handful of pixels and the remaining 99 % of
                    the bar is its dark end — on screen it read as a black rule,
                    not as the brand colour. Kept to the lit half of the scale
                    for the same reason: --teal-700 at this size reads as ink.
                  */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px] [background:linear-gradient(90deg,var(--teal-500),var(--teal))]"
                  />
                  <span className="flex items-start justify-between gap-3">
                    <span className="icon-plate icon-plate-hover">
                      <c.icon strokeWidth={1.75} />
                    </span>
                    {c.href ? (
                      <span className="arrow-nudge mt-1 text-teal/70 transition-colors group-hover:text-teal">
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    ) : null}
                  </span>

                  <span className="mt-5 block text-[11px] font-semibold tracking-[0.14em] text-teal uppercase">
                    {c.label}
                  </span>
                  <span className="mt-1.5 block text-[clamp(1.0625rem,0.42vw+0.9rem,1.25rem)]/[1.35] font-semibold break-words text-ink-900 transition-colors group-hover:text-teal">
                    {c.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>

                  <span className="mt-auto block border-t border-border/70 pt-4 text-[13px]/[1.55] text-ink">
                    {c.note}
                  </span>
                </>
              )

              const shell =
                "surface surface-on-cream group flex h-full flex-col p-[clamp(1.25rem,1.5vw,1.625rem)] pt-[clamp(1.375rem,1.6vw,1.75rem)]"

              return (
                <Reveal
                  key={c.label}
                  delay={i * 70}
                  className={`h-full${c.href ? "" : " sm:col-span-2 md:col-span-1"}`}
                >
                  {c.href ? (
                    <a href={c.href} className={`${shell} surface-hover`}>
                      {body}
                    </a>
                  ) : (
                    <div className={shell}>{body}</div>
                  )}
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/*
        Form band. The Schraffur motif from the host block: the hatch runs as a
        soft ground and a flat white card sits on it — that contrast is what
        makes the form read as the thing to fill in rather than as one more
        outlined box on a white page. Soft variant, not full strength: at 100%
        the lines compete with the field labels sitting on top of them.
      */}
      <section className="hatch-soft relative overflow-hidden bg-cream">
        <div className="relative container-page py-[clamp(2.5rem,4vw+0.5rem,5.5rem)]">
          <div className="grid gap-[clamp(2rem,3.5vw,4rem)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-start">
            <Reveal>
              <h2 className="h-plain">Wobei können wir helfen?</h2>
              <p className="mt-4 max-w-[42ch] text-[clamp(1rem,0.42vw+0.85rem,1.125rem)]/[1.6] text-ink">
                Viele Fragen sind hier schon beantwortet. Das geht schneller als
                eine Mail. Wenn nichts passt, schreib uns direkt.
              </p>

              <ul className="mt-7 space-y-3">
                {ROUTES.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className="surface surface-hover group flex items-start gap-4 p-4"
                    >
                      <span className="min-w-0">
                        <span className="block font-semibold text-ink-900 transition-colors group-hover:text-teal">
                          {r.title}
                        </span>
                        <span className="mt-1 block text-[14px] leading-relaxed text-ink">
                          {r.text}
                        </span>
                      </span>
                      <span className="arrow-nudge mt-1 ml-auto text-teal">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mt-7 flex items-start gap-2.5 text-[14px] text-ink">
                <Clock aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-teal" strokeWidth={1.75} />
                {SITE.contact.hours}
              </p>
            </Reveal>

            {/*
              Raised off the hatch. `clip-path` would clip a box-shadow, so the
              elevation is a drop-shadow filter on the wrapper and the notch
              lives on the card itself.
            */}
            <Reveal
              variant="scale"
              delay={90}
              className="[filter:drop-shadow(0_22px_44px_rgba(0,101,95,0.16))]"
            >
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
