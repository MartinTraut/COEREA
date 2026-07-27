"use client"

import { Quote, Star } from "lucide-react"

import { Carousel } from "@/components/brand/carousel"
import { Reveal } from "@/components/brand/reveal"

/*
  Verbatim from the design frames.

  These had been condensed into two short blurbs. The originals are a headline
  plus a full paragraph each, and the shortened versions dropped most of what
  made them read as somebody's actual words — the forestry detail, the "auch für
  mich ohne grünen Daumen". A testimonial that sounds written by the brand is
  worth nothing, so the client's own text is restored in full, with the headline
  it is written to sit under.
*/
const TESTIMONIALS = [
  {
    title: "Dankbar für engagierten Mieter, der die Fläche zum Blühen brachte",
    quote:
      "Der engagierte Mieter hat meine ungenutzte Forstfläche in eine blühende Oase verwandelt. Fachkundig und respektvoll bewirtschaftet er das Land, und der Wald gedeiht prächtig. Die Zusammenarbeit war vorbildlich, und ich bin dankbar, dass die Fläche nun sinnvoll genutzt wird. Empfehle den Mieter wärmstens für seine Leidenschaft und sein Engagement.",
    role: "Host",
    name: "Martin S.",
  },
  {
    title: "Mein persönliches Stück Paradies",
    quote:
      "Ich bin begeistert von meinem angemieteten Garten, einem wahr gewordenen Traum mit einer Vielzahl von Pflanzen, Bäumen und Blumen. Ein grüner Rückzugsort, perfekt zum Anbauen von Gemüse und Kräutern und zur Entspannung in meiner grünen Oase. Absolut empfehlenswert, auch für mich ohne grünen Daumen!",
    role: "User",
    name: "Lisa-Marie B.",
  },
] as const

/*
  Quotes on the quiet cream band.

  Built on the shared Carousel rather than as a static grid, which is what makes
  the arrows honest: it is a real scroll-snap track, so on a phone the quotes
  swipe natively — momentum, rubber-banding, no drag handler — and the arrows
  page by a viewport width. When the track has nothing left to scroll, which is
  the case on a desktop where both quotes already fit, the Carousel removes the
  arrows instead of leaving two permanently disabled controls sitting there.
  Arrows that cannot go anywhere are the same dead control as a link to `#`.
*/
export function Testimonials() {
  return (
    <section className="mesh relative isolate overflow-hidden bg-cream">
      <div className="relative container-page py-[clamp(2.75rem,3.6vw,4.25rem)]">
        <Carousel
          label="Stimmen aus der Community"
          trackClassName="mt-[clamp(2rem,3vw,3.5rem)] items-stretch"
          itemClassName="w-[86%] sm:w-[62%] lg:w-[calc(50%-13px)]"
          header={
            <Reveal>
              <span className="eyebrow">Stimmen aus der Community</span>
              <h2 className="h-plain mt-4">Das sagen unsere Hosts &amp; User</h2>
            </Reveal>
          }
        >
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100} className="h-full">
              <figure className="surface surface-on-cream surface-hover flex h-full flex-col p-[clamp(1.5rem,2.2vw,2.5rem)]">
                {/*
                  The teal accent used to be a 3px bar pinned across the top of
                  the card. Inside a 16px radius with overflow hidden, a straight
                  bar gets cut to nothing at both ends and runs out into the
                  border — it read as a rendering fault rather than as an accent.
                  The quote mark carries the brand instead; it is the one glyph
                  in the card that is allowed to be decorative.
                */}
                <Quote
                  className="h-10 w-10 shrink-0 text-teal/25"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <h3 className="mt-5 text-[clamp(1.0625rem,0.55vw+0.85rem,1.3125rem)]/[1.3] font-semibold text-balance text-ink-900">
                  {t.title}
                </h3>
                <blockquote className="mt-4 flex-1 text-[0.9375rem]/[1.75] text-ink">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-7 flex items-center justify-between gap-4 border-t border-teal/15 pt-5">
                  <span>
                    <span className="caps block text-teal">{t.role}</span>
                    <span className="mt-0.5 block text-[1.0625rem] font-semibold text-ink-900">
                      {t.name}
                    </span>
                  </span>
                  <span className="flex gap-0.5" aria-label="5 von 5 Sternen">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-gold text-gold" aria-hidden />
                    ))}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </Carousel>
      </div>
    </section>
  )
}
