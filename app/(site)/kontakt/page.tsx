import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react"

import { SITE } from "@/lib/site"
import { Reveal } from "@/components/brand/reveal"
import { TabHeading } from "@/components/brand/tab-heading"
import { ContactForm } from "@/components/contact/contact-form"

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktiere CoArea per E-Mail, Telefon oder über unser Kontaktformular. Wir beraten Dich gern zur optimalen Nutzung Deiner Flächen.",
}

/*
  The three ways to reach us, as their own cards rather than as a bullet list.
  Two of them act on click (write, call); the third is an address, so it stays
  plain text instead of pretending to be a link to a map we do not embed.
*/
const CHANNELS = [
  {
    icon: Mail,
    label: "E-Mail",
    value: SITE.contact.email,
    href: `mailto:${SITE.contact.email}`,
    note: "Antwort in der Regel am selben Werktag.",
  },
  {
    icon: Phone,
    label: "Telefon",
    value: SITE.contact.phone,
    href: `tel:${SITE.contact.phoneHref}`,
    note: SITE.contact.hours,
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: `${SITE.contact.street}, ${SITE.contact.zip} ${SITE.contact.city}`,
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

          <div className="mt-[clamp(2rem,3vw,3rem)] grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CHANNELS.map((c, i) => {
              const body = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center bg-teal-50 text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                    <c.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-semibold tracking-[0.14em] text-ink/60 uppercase">
                      {c.label}
                    </span>
                    <span className="mt-1 block text-[clamp(0.9375rem,0.35vw+0.8rem,1.0625rem)] font-semibold break-words text-ink-900 transition-colors group-hover:text-teal">
                      {c.value}
                    </span>
                    <span className="mt-2 block text-[13px] leading-relaxed text-ink">
                      {c.note}
                    </span>
                  </span>
                </>
              )

              return (
                <Reveal key={c.label} delay={i * 70} className="h-full">
                  {c.href ? (
                    <a
                      href={c.href}
                      className="surface surface-hover group flex h-full items-start gap-4 p-5"
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="surface group flex h-full items-start gap-4 p-5">
                      {body}
                    </div>
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
