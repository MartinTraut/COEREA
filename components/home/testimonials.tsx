import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { TabHeading } from "@/components/brand/tab-heading"

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

export function Testimonials() {
  return (
    <section className="container-page py-16 md:py-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <TabHeading className="text-[clamp(1.4rem,2vw+0.5rem,2rem)]">
          Das sagen unsere Hosts &amp; User
        </TabHeading>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Vorherige Bewertung"
            className="grid h-10 w-10 place-items-center rounded-full border border-border text-teal transition-colors hover:bg-teal/10"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Nächste Bewertung"
            className="grid h-10 w-10 place-items-center rounded-full bg-teal text-white transition-colors hover:bg-teal-600"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col border border-border bg-card p-7"
          >
            <Quote className="h-8 w-8 text-teal/30" />
            <blockquote className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink/85">
              {t.quote}
            </blockquote>
            <figcaption className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <span>
                <span className="block text-xs font-medium text-teal">
                  {t.role}
                </span>
                <span className="font-semibold text-ink">{t.name}</span>
              </span>
              <span className="flex gap-0.5" aria-label="5 von 5 Sternen">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#e6b84f] text-[#e6b84f]" />
                ))}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
