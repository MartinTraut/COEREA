import { Layers, Leaf, TrendingUp, HeartHandshake } from "lucide-react"

import { Reveal } from "@/components/brand/reveal"
import { TabHeading } from "@/components/brand/tab-heading"

const BENEFITS = [
  {
    icon: Layers,
    title: "Nutzung des gesamten Flächenpotenzials",
    text: "Ungenutzte Flächen werden sichtbar, buchbar und sinnvoll ausgelastet.",
  },
  {
    icon: Leaf,
    title: "Nachhaltige Einflussnahme auf unsere Natur",
    text: "Teilen statt versiegeln — wir bewahren Böden und wertvolle Lebensräume.",
  },
  {
    icon: TrendingUp,
    title: "Steigerung der Lebensqualität in unseren Städten",
    text: "Neue grüne Orte der Begegnung und Erholung, mitten im urbanen Raum.",
  },
  {
    icon: HeartHandshake,
    title: "Mehr soziale Interaktion und Zusammenhalt",
    text: "Menschen verbinden sich, teilen Ressourcen und wachsen als Gemeinschaft.",
  },
]

/*
  The one full-bleed teal band on the homepage — so it has to carry weight. It
  was a flat #008A84 fill with four centred icon stacks, which at full width
  looked like a coloured div. Now: a graded fill lit from the top-left, two soft
  blooms, 4% grain, and a Schraffur edge along the top so the band announces
  itself with the brand's own diagonal.

  The four items are left-aligned and numbered. Centred text in four narrow
  columns gives four ragged edges and no shared baseline to read along; a number
  plus a rule gives the eye somewhere to start.
*/
export function Benefits() {
  return (
    <section className="mesh mesh-dark grain relative isolate overflow-hidden [background:var(--grad-teal-deep)] text-white">
      <span aria-hidden className="hatch-white absolute inset-0 opacity-20" />

      <div className="relative container-page py-[clamp(4rem,7vw,8.5rem)]">
        <Reveal>
          <span className="eyebrow text-white/80 before:bg-white/60">
            Warum CoArea
          </span>
          {/*
            This is the band that has to carry the page, so its heading is the
            largest thing on the homepage after the H1 — the framed motif at
            `h-section` size was the same 40px as five unframed section titles
            and read as just another row.
          */}
          <TabHeading
            variant="white"
            className="mt-5 text-[clamp(1.85rem,2.9vw+0.55rem,3.5rem)]"
          >
            Deine Vorteile mit CoArea
          </TabHeading>
        </Reveal>

        <div className="mt-[clamp(2.5rem,4vw,4.5rem)] grid gap-x-[clamp(1.5rem,2.5vw,3rem)] gap-y-[clamp(2rem,3vw,3.5rem)] sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <Reveal
              key={b.title}
              delay={i * 90}
              className="group relative flex flex-col gap-4 border-t border-white/25 pt-6 transition-colors duration-300 hover:border-white/70"
            >
              <div className="flex items-center justify-between">
                {/* Icon in a hatched square — the motif applied at component scale. */}
                <span className="hatch-white relative grid h-12 w-12 place-items-center bg-white/10 transition-transform duration-300 ease-out group-hover:-translate-y-1">
                  <b.icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                </span>
                {/*
                  The counter used to be 24px against a 17px title — the
                  decoration outweighed the brand's actual argument. It is now
                  the smallest element in the item, which is what a counter is.
                */}
                <span className="text-base leading-none font-bold text-white/20 transition-colors duration-300 group-hover:text-white/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-[clamp(1.0625rem,0.55vw+0.85rem,1.375rem)]/[1.3] font-semibold text-balance">
                {b.title}
              </h3>
              <p className="text-[0.9375rem]/[1.65] text-white/80">{b.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
