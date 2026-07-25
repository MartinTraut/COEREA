import Link from "next/link"
import { ChevronDown } from "lucide-react"

import { TabHeading } from "@/components/brand/tab-heading"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-cream">
      {/* Site-plan map background — extracted from the CoArea Figma hero,
          shown at native width so the building footprints match the design. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 select-none"
        style={{
          backgroundImage: "url(/images/hero-map.jpg)",
          backgroundSize: "100% auto",
          backgroundRepeat: "repeat-y",
          backgroundPosition: "center top",
        }}
      />

      <div className="container-page relative py-12 md:py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-x-14">
          {/* Headline */}
          <TabHeading
            as="h1"
            className="self-start text-[clamp(1.9rem,4vw+0.5rem,3.25rem)] lg:col-start-1 lg:row-start-1"
          >
            Gemeinsam nutzen,
            <br />
            nachhaltig erleben.
          </TabHeading>

          {/* Welcome + primary CTAs */}
          <div className="lg:col-start-2 lg:row-start-1">
            <p className="max-w-xl leading-relaxed text-ink/80">
              Willkommen in der Welt von CoArea, wo gemeinsames Handeln und
              Freiflächen auf innovative Weise verschmelzen. Unser Name „CoArea&quot;
              leitet sich von den Begriffen „Common&quot; und „Area&quot; ab, und genau das
              ist unser Ziel: Gemeinschaften zusammenbringen, um Freiflächen
              optimal zu nutzen.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/host-werden"
                className="bg-teal px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
              >
                Host werden
              </Link>
              <Link
                href="/ueber-uns"
                className="bg-teal px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
              >
                Über Uns
              </Link>
            </div>
          </div>

          {/* Search widget — flat, sharp, no field icons */}
          <div className="border border-border bg-card lg:col-span-2 lg:row-start-2">
            <div className="flex flex-col divide-y divide-border sm:flex-row sm:divide-x sm:divide-y-0">
              <label className="flex min-w-0 flex-[2] flex-col gap-0.5 px-5 py-4">
                <span className="text-sm font-semibold text-ink">
                  Wo möchtest Du eine CoArea mieten?
                </span>
                <input
                  type="text"
                  placeholder="Land, Stadt, PLZ..."
                  className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted-foreground"
                />
              </label>

              <label className="flex min-w-0 flex-1 flex-col gap-0.5 px-5 py-4">
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-ink">
                  Zeitraum <ChevronDown className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  placeholder="Wähle ein Datum"
                  className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted-foreground"
                />
              </label>

              <label className="flex min-w-0 flex-1 flex-col gap-0.5 px-5 py-4">
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-ink">
                  User <ChevronDown className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  placeholder="Anzahl der User"
                  className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted-foreground"
                />
              </label>

              <Link
                href="/flaechen"
                className="flex items-center justify-center bg-teal px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
              >
                Flächen entdecken
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
