"use client"

import { useMemo, useState } from "react"
import { Search, ChevronDown, ListFilter, Map, LayoutGrid, ChevronLeft, ChevronRight } from "lucide-react"

import { CATEGORIES } from "@/lib/categories"
import { LISTINGS } from "@/lib/listings"
import { cn } from "@/lib/utils"
import { TabHeading } from "@/components/brand/tab-heading"
import { CategoryDiamond } from "@/components/brand/category-diamond"
import { ListingCard } from "@/components/listings/listing-card"

export function Discover() {
  const [active, setActive] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [mapView, setMapView] = useState(false)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return LISTINGS.filter((l) => {
      const okCat = !active || l.category === active
      const okQ =
        !q ||
        l.title.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q)
      return okCat && okQ
    })
  }, [active, query])

  return (
    <section className="container-page py-8 md:py-12">
      <TabHeading as="h1" className="text-[clamp(1.6rem,3vw+0.5rem,2.5rem)]">
        Flächen entdecken
      </TabHeading>

      {/* 8 diamond categories — scrollable on mobile, evenly spread on desktop */}
      <div className="mt-8 -mx-5 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max justify-between gap-3 pb-1 md:min-w-0">
          {CATEGORIES.map((c) => (
            <CategoryDiamond
              key={c.slug}
              icon={c.icon}
              label={c.label}
              active={active === c.slug}
              onClick={() => setActive((cur) => (cur === c.slug ? null : c.slug))}
            />
          ))}
        </div>
      </div>

      {/* Toolbar: Filter · Suche ................ Karte anzeigen */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-teal"
        >
          <ListFilter className="h-4 w-4 text-teal" />
          Filter
          <ChevronDown className="h-4 w-4 text-ink/50" />
        </button>

        <div className="relative sm:w-64">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Suche"
            className="w-full border border-border bg-card py-2.5 pr-4 pl-9 text-sm text-ink outline-none focus:border-teal"
          />
        </div>

        <button
          type="button"
          onClick={() => setMapView((v) => !v)}
          className="inline-flex items-center justify-center gap-2 border border-border bg-card px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-teal sm:ml-auto"
        >
          {mapView ? (
            <>
              <LayoutGrid className="h-4 w-4 text-teal" /> Liste anzeigen
            </>
          ) : (
            <>
              <Map className="h-4 w-4 text-teal" /> Karte anzeigen
            </>
          )}
        </button>
      </div>

      {mapView ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="grid gap-6 sm:grid-cols-2">
            {results.map((l) => (
              <ListingCard key={l.slug} listing={l} />
            ))}
          </div>
          <div className="hatch-soft relative min-h-[420px] overflow-hidden border border-border bg-cream lg:sticky lg:top-24 lg:h-[calc(100svh-8rem)]">
            <span className="absolute top-4 left-4 bg-white/90 px-3 py-1.5 text-xs font-medium text-ink">
              Entdecke CoArea in Deiner Nähe
            </span>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((l) => (
            <ListingCard key={l.slug} listing={l} />
          ))}
        </div>
      )}

      {results.length === 0 ? (
        <p className="mt-10 text-center text-sm text-ink/60">
          Keine Flächen für diese Auswahl. Passe Filter oder Suche an.
        </p>
      ) : (
        <Pagination />
      )}
    </section>
  )
}

/* Visual pagination — mirrors the Figma footer of the listing grid. */
function Pagination() {
  const pages = [1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <nav
      className="mt-12 flex items-center justify-center gap-3 text-sm"
      aria-label="Seiten"
    >
      <button
        type="button"
        aria-label="Vorherige Seite"
        className="grid h-10 w-10 place-items-center text-teal transition-colors hover:bg-teal/10"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          aria-current={p === 1 ? "page" : undefined}
          className={cn(
            "grid h-10 w-10 place-items-center transition-colors",
            p === 1
              ? "font-semibold text-ink"
              : "text-ink/60 hover:text-teal",
          )}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        aria-label="Nächste Seite"
        className="grid h-10 w-10 place-items-center rounded-full bg-teal text-white transition-colors hover:bg-teal-600"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}
