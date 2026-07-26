import { Quote, Star } from "lucide-react"

import { Reveal } from "@/components/brand/reveal"

const TESTIMONIALS = [
  {
    quote:
      "Dankbar für engagierten Mieter — brachte ungenutzte Fläche zum Blühen. Der engagierte Mieter hat meine ungenutzte Forstfläche in eine blühende Oase verwandelt: fachkundig und respektvoll bewirtschaftet. Absolut empfehlenswert!",
    role: "Host",
    name: "Martin S.",
  },
  {
    quote:
      "Mein persönliches Stück Paradies. Ich bin begeistert von meinem angemieteten Garten — ein wahr gewordener Traum mit Pflanzen, Bäumen und einer grünen Rückzugsmöglichkeit mitten in der Stadt.",
    role: "User",
    name: "Lisa-Marie B.",
  },
]

/*
  Quotes on the quiet cream band. Two white cards on cream separate far better
  than two outlined boxes on white did — the surface itself now does the work a
  border was being asked to do.
*/
export function Testimonials() {
  return (
    <section className="mesh relative isolate overflow-hidden bg-cream">
      <div className="relative container-page py-[clamp(2.75rem,3.6vw,4.25rem)]">
        {/*
          Both quotes sit side by side, so the two carousel arrows that used to
          flank this heading had nothing to page through and have been dropped.
        */}
        <Reveal>
          <span className="eyebrow">Stimmen aus der Community</span>
          <h2 className="h-plain mt-4">
            Das sagen unsere Hosts &amp; User
          </h2>
        </Reveal>

        <div className="mt-[clamp(2rem,3vw,3.5rem)] grid gap-[clamp(1.25rem,2vw,2rem)] md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100} className="h-full">
              <figure className="surface surface-hover flex h-full flex-col p-[clamp(1.5rem,2.2vw,2.5rem)]">
                {/* Teal top edge — the accent that says which brand is speaking. */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] [background:var(--grad-teal-bright)]"
                />
                <Quote className="h-9 w-9 text-teal/20" strokeWidth={1.5} aria-hidden />
                <blockquote className="mt-4 flex-1 text-[clamp(0.9375rem,0.35vw+0.8rem,1.0625rem)]/[1.7] text-ink">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-7 flex items-center justify-between gap-4 border-t border-teal/15 pt-5">
                  <span>
                    <span className="block text-[11px] font-semibold tracking-[0.12em] text-teal uppercase">
                      {t.role}
                    </span>
                    <span className="text-[1.0625rem] font-semibold text-ink-900">
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
        </div>
      </div>
    </section>
  )
}
