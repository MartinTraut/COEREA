import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Reveal } from "@/components/brand/reveal"
import { CategoryStrip } from "@/components/brand/category-strip"

/*
  The eight categories, on the homepage.

  They lived only on „Flächen entdecken" and on the detail view, which meant the
  homepage — the page most people arrive on — never once showed what kind of
  ground CoArea actually deals in, and offered no route into the eight category
  pages at all. That is a gap in the user's first question („was ist das?") and
  in the internal linking at the same time.

  It sits directly under the hero because it is the second thing a visitor
  wants after the search bar: if you do not know your town's inventory yet, you
  browse by kind rather than by place.

  The legend is not decoration. The Schraffur behind a diamond is the one signal
  that separates „Öffentl. Sport- & Freizeitflächen" from „Private Sport- &
  Freizeitflächen" — both are drawn with a ball — and a texture nobody has
  explained is a texture nobody reads. Named once here, it works everywhere else
  on the site.
*/
export function Categories() {
  return (
    <section className="container-page py-[clamp(2.75rem,3.6vw,4.25rem)]">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <div>
            <span className="eyebrow">Acht Flächenkategorien</span>
            <h2 className="h-plain mt-4">Welche Fläche brauchst Du?</h2>
          </div>

          {/* Legend for the plate — hatched means private ground, flat means public. */}
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Legend hatched label="privater Grund" />
            <Legend label="öffentlicher Grund" />
          </ul>
        </div>
        <hr className="rule-fade mt-[clamp(1.25rem,1.8vw,2rem)]" />
      </Reveal>

      <Reveal delay={90} className="mt-[clamp(1.75rem,2.6vw,3rem)] block">
        <CategoryStrip />
      </Reveal>

      <Reveal delay={160} className="mt-[clamp(1.5rem,2.2vw,2.5rem)] flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link href="/flaechen" className="btn btn-teal sheen group h-12 px-6 text-sm">
          Alle Flächen ansehen
          <span className="arrow-nudge inline-flex">
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
        <p className="max-w-[46ch] text-sm/[1.7] text-ink">
          Du weißt noch nicht, in welche Kategorie Deine Fläche gehört? Wir
          ordnen sie beim Anlegen gemeinsam ein.
        </p>
      </Reveal>
    </section>
  )
}

function Legend({ hatched = false, label }: { hatched?: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2 text-[0.6875rem] font-semibold tracking-[0.1em] text-ink uppercase">
      <span
        aria-hidden
        className={`h-3 w-3 shrink-0 [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)] ${
          hatched ? "hatch-fine" : "bg-teal/70"
        }`}
      />
      {label}
    </li>
  )
}
