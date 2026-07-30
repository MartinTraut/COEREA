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
    text: "Teilen statt versiegeln: Wir bewahren Böden und wertvolle Lebensräume.",
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
      {/*
        The Schraffur used to run across this entire band at 20% and it was the
        reason the four benefits disappeared into it.

        Three things were competing at once: the hatch drew white lines at an
        effective 10% white, the icon plates sat on 12% white — a two-point
        difference, so they had no edge — and the only structure separating the
        four items was a 1px rule at 25% white, which was *fainter than the
        stripes crossing it*. The band's own texture outweighed its content.

        The hatch now marks the top edge and dissolves, so it still announces
        the band with the brand's diagonal without laying a field of lines
        behind every word of the argument.
      */}
      <span
        aria-hidden
        className="hatch-white absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black_0,black_11%,transparent_34%)]"
      />

      <div className="relative container-page py-[clamp(4rem,7vw,8.5rem)]">
        <Reveal>
          <span className="eyebrow eyebrow-invert">Warum CoArea</span>
          {/*
            This is the band that has to carry the page, so its heading is the
            largest thing on the homepage after the H1 — the framed motif at
            `h-section` size was the same 40px as five unframed section titles
            and read as just another row.

            „after the H1" was the intent and not what the code did: at 56px it
            was 2px LARGER than the homepage H1 (hero.tsx, 54px), so the strongest
            type on the page belonged to a section rather than to the page. The
            intent survives — 48px still clears every other section heading
            (37.6px) by a wide margin — it just no longer outranks the headline
            it is supposed to sit under.

            Both ends of the clamp matter, and the first attempt only fixed the
            top: at a 1.7rem floor the band was 27.2px on a phone against an H1
            floor of 25.6px, so the very fault being repaired survived at the one
            width where most people would meet it. The floor sits at 1.5rem — over
            the 1.45rem of a section heading, under the 1.6rem of the H1 — and
            the gap holds at every width in between, because the H1 gains 2.55vw
            against this heading's 2.2vw.
          */}
          <TabHeading
            variant="white"
            className="mt-5 text-[clamp(1.5rem,2.2vw+0.6rem,3rem)]"
          >
            Deine Vorteile mit CoArea
          </TabHeading>
        </Reveal>

        <div className="mt-[clamp(2.5rem,4vw,4.5rem)] grid gap-x-[clamp(1.5rem,2.5vw,3rem)] gap-y-[clamp(2rem,3vw,3.5rem)] sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <Reveal
              key={b.title}
              delay={i * 90}
              className="group relative flex flex-col gap-4 pt-6 before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-white/45 before:transition-colors before:duration-300 hover:before:bg-white"
            >
              <div className="flex items-center justify-between">
                {/*
                  Shared plate, inverted for the teal ground. With the hatch off
                  the body of the band, the 18% white fill is a closed surface
                  the glyph can stand on instead of a transparency two points
                  away from the stripes behind it.
                */}
                <span className="icon-plate icon-plate-invert icon-plate-hover">
                  <b.icon strokeWidth={1.5} />
                </span>
                {/*
                  The counter used to be 24px against a 17px title — the
                  decoration outweighed the brand's actual argument. It is now
                  the smallest element in the item, which is what a counter is.
                */}
                <span className="text-base leading-none font-bold text-white/30 transition-colors duration-300 group-hover:text-white/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-[clamp(1.0625rem,0.55vw+0.85rem,1.375rem)]/[1.3] font-semibold text-balance">
                {b.title}
              </h3>
              <p className="text-[0.9375rem]/[1.65] text-white/85">{b.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
