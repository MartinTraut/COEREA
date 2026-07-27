"use client"

import Link from "next/link"
import { useId, useMemo, useState } from "react"
import Image from "next/image"
import { Search, ChevronDown, ListFilter, Map, LayoutGrid, ChevronLeft, ChevronRight, ArrowRight, X } from "lucide-react"

import { CATEGORIES, categoryBySlug } from "@/lib/categories"
import { categoryPageBySlug } from "@/lib/category-pages"
import { LISTINGS, availableOn, formatIsoDay } from "@/lib/listings"
import { parseAmount } from "@/lib/pricing"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/brand/reveal"
import { TabHeading } from "@/components/brand/tab-heading"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { CategoryStrip } from "@/components/brand/category-strip"
import { ListingCard } from "@/components/listings/listing-card"

/** Cards per page: two rows of three in a category, three rows of four overall. */
const PER_PAGE_CATEGORY = 6
const PER_PAGE_ALL = 12

/**
 * "Flächen entdecken". Without `category` this is the overview frame — a
 * four-column grid of every listing. With `category` it is the category frame:
 * the same header, an editorial intro, a three-column grid limited to that
 * category, and the scenario story below.
 */
/** Cities and billing units that actually occur, for the filter panel. */
const CITIES = Array.from(new Set(LISTINGS.map((l) => l.city))).sort((a, b) =>
  a.localeCompare(b, "de"),
)
const UNITS = ["Stunde", "Tag", "Woche", "Monat"]

type Sort = "empfohlen" | "preis-auf" | "preis-ab" | "bewertung"

/*
  This used to call `useSearchParams`, which opts the whole subtree into
  client-side rendering and therefore had to sit behind a Suspense boundary with
  an empty fallback. The comment claimed the fallback stopped the page jumping;
  measured, it did the opposite — a layout-shift score of 0.42 on /flaechen,
  because the entire page (grid, filters, footer) appeared at once on hydration.
  Worse, the listing grid was absent from the served HTML altogether: the main
  page of a marketplace had nothing in it for a crawler to read.

  The only thing the hook provided was the initial value of the search box, so
  that now arrives as a prop from the page, which reads it on the server. The
  grid is server-rendered again and `?suche=` still prefills.
*/
export function Discover({
  category,
  /** From `?suche=` — handed over by the hero search and the SearchAction. */
  initialQuery = "",
  /** From `?ab=` — the day the hero's date field asked for (ISO, yyyy-mm-dd). */
  initialDate = "",
}: {
  category?: string
  initialQuery?: string
  initialDate?: string
}) {
  const filterId = useId()
  const searchId = useId()

  const [query, setQuery] = useState(initialQuery)
  const [mapView, setMapView] = useState(false)
  const [pageNo, setPageNo] = useState(1)

  const [filtersOpen, setFiltersOpen] = useState(false)
  const [fCategory, setFCategory] = useState("")
  const [fCity, setFCity] = useState("")
  const [fUnit, setFUnit] = useState("")
  const [fDate, setFDate] = useState(initialDate)
  const [sort, setSort] = useState<Sort>("empfohlen")

  const cat = category ? categoryBySlug(category) : undefined
  const page = category ? categoryPageBySlug(category) : undefined

  /*
    The scenario narrative is split at the first paragraph: that one is set as
    the lead beside the heading, the remainder flows in two columns underneath.
  */
  const [lead, ...rest] = page?.story.paragraphs ?? []

  const activeFilters = [fCategory, fCity, fUnit, fDate].filter(Boolean).length

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    const found = LISTINGS.filter((l) => {
      // A category page pins the category; the panel's own filter is additive.
      const okCat = (!category || l.category === category) && (!fCategory || l.category === fCategory)
      const okCity = !fCity || l.city === fCity
      const okUnit = !fUnit || l.price.unit === fUnit
      const okDate = !fDate || availableOn(l, fDate)
      const okQ =
        !q || l.title.toLowerCase().includes(q) || l.city.toLowerCase().includes(q)
      return okCat && okCity && okUnit && okDate && okQ
    })

    /*
      Prices are per differing units, so sorting compares them normalised to a
      day — otherwise "3000 € / Monat" would outrank "220 € / Tag".
      Areas without a numeric price sort last either way.
      */
    const perDay = (amount: string, unit: string) => {
      const value = parseAmount(amount)
      if (value === null) return Number.POSITIVE_INFINITY
      const days = unit === "Stunde" ? 1 / 8 : unit === "Woche" ? 7 : unit === "Monat" ? 30 : 1
      return value / days
    }

    const sorted = [...found]
    if (sort === "preis-auf") sorted.sort((a, b) => perDay(a.price.amount, a.price.unit) - perDay(b.price.amount, b.price.unit))
    if (sort === "preis-ab") sorted.sort((a, b) => perDay(b.price.amount, b.price.unit) - perDay(a.price.amount, a.price.unit))
    if (sort === "bewertung") sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
    return sorted
  }, [category, query, fCategory, fCity, fUnit, fDate, sort])

  function resetFilters() {
    setFCategory("")
    setFCity("")
    setFUnit("")
    setFDate("")
    setSort("empfohlen")
    setPageNo(1)
  }

  const perPage = category ? PER_PAGE_CATEGORY : PER_PAGE_ALL
  const pageCount = Math.max(1, Math.ceil(matches.length / perPage))
  // A narrowed search can leave the current page out of range.
  const current = Math.min(pageNo, pageCount)
  const results = matches.slice((current - 1) * perPage, current * perPage)

  /*
    Four of the eight categories have no listings yet. Telling those visitors to
    "adjust the filter" would be a lie — there is nothing to filter — so they get
    their own state that says so and offers the two real ways forward.
  */
  const emptyCategory =
    Boolean(category) && matches.length === 0 && !query.trim() && activeFilters === 0
  const related = useMemo(
    () => (emptyCategory ? LISTINGS.slice(0, category ? 3 : 4) : []),
    [emptyCategory, category],
  )

  return (
    <div className="overflow-x-clip">
      <section className="container-page py-8 md:py-12">
        {/*
          Only on a category page: on /flaechen itself the trail would be a
          single step to the page you are already on.
        */}
        {cat && (
          <div className="mb-6">
            <Breadcrumbs
              trail={[
                { name: "Flächen entdecken", path: "/flaechen" },
                { name: cat.label, path: `/flaechen/kategorie/${cat.slug}` },
              ]}
            />
          </div>
        )}

        {/*
          A category page used to carry the same H1 as /flaechen and then repeat
          its own name as an H2 in the intro — two pages claiming one title.
          The H1 now names the category, and the intro heading below is gone.
        */}
        <span className="eyebrow">
          {cat ? "Kategorie" : "Alle verfügbaren Flächen"}
        </span>
        <TabHeading
          as="h1"
          className="mt-4 text-[clamp(1.7rem,2.4vw+0.6rem,3.25rem)]/[1.1]"
        >
          {cat?.label ?? "Flächen entdecken"}
        </TabHeading>
        {/*
          The result count used to exist only for screen readers. It is the one
          number a visitor on this page actually wants, so it is on the page —
          and it updates live as the filters narrow the list.
        */}
        <p
          aria-live="polite"
          className="mt-5 text-[clamp(1rem,0.5vw+0.8rem,1.1875rem)] text-ink"
        >
          <span className="text-[1.5em] leading-none font-bold text-teal">
            {matches.length}
          </span>{" "}
          {matches.length === 1 ? "Fläche" : "Flächen"} verfügbar
          {fCity ? ` in ${fCity}` : ""}
        </p>

        {/* 8 diamond categories — scrollable until lg, evenly spread on desktop */}
        <div className="mt-8">
          <CategoryStrip active={category} />
        </div>

        {/*
          Toolbar.

          It used to be three separately outlined boxes sitting inside a fourth —
          four competing rectangles for what is one instrument, and the whole
          thing sat flat on the page at the same elevation as the cards below it.

          Now it is a single raised bar with a clipped top-right corner (the
          system's one shape move, same as the hero search): the fields have no
          outlines of their own, they are separated by hairlines, and the bar as
          a whole answers to focus with a teal ring and a deeper shadow. Because
          `clip-path` also clips `box-shadow`, the elevation is a drop-shadow
          filter on the wrapper — the two cannot share an element.
        */}
        <div className="mt-8 [filter:drop-shadow(0_14px_30px_rgba(0,101,95,0.10))]">
          <div className="notch flex flex-col gap-2 border border-border bg-white p-2 transition-[border-color] duration-300 focus-within:border-teal/40 sm:flex-row sm:items-stretch sm:gap-0">
            <button
              type="button"
              aria-expanded={filtersOpen}
              aria-controls={filterId}
              onClick={() => setFiltersOpen((v) => !v)}
              className={cn(
                "group/f inline-flex min-h-12 shrink-0 items-center gap-2 px-4 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-teal/40 focus-visible:outline-none",
                filtersOpen || activeFilters
                  ? "bg-teal-50 text-teal"
                  : "text-ink-900 hover:bg-teal-50/60 hover:text-teal",
              )}
            >
              <ListFilter className="h-4 w-4 text-teal" strokeWidth={1.9} />
              Filter
              {activeFilters ? (
                <span className="grid h-5 min-w-5 place-items-center rounded-[var(--radius-control)] bg-teal px-1 text-xs font-semibold text-white">
                  {activeFilters}
                </span>
              ) : null}
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-ink/45 transition-transform duration-200",
                  filtersOpen && "rotate-180",
                )}
              />
            </button>

            <span aria-hidden className="hidden w-px shrink-0 self-stretch bg-border sm:block" />

            {/*
              The search field carries the free space — it is the control people
              actually use here. No border of its own: the bar is the border.
            */}
            <div className="group/s relative min-w-0 sm:flex-1">
              <label htmlFor={searchId} className="sr-only">
                Flächen durchsuchen
              </label>
              <Search
                className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink/40 transition-colors duration-200 group-focus-within/s:text-teal"
                strokeWidth={1.9}
              />
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  // A new search starts at page one.
                  setPageNo(1)
                }}
                placeholder="Ort, Stadt oder Fläche suchen…"
                className="h-full min-h-12 w-full bg-transparent py-2.5 pr-4 pl-11 text-[15px] text-ink-900 outline-none placeholder:text-ink/55 focus-visible:outline-none"
              />
              {/* Underline that grows from the left while the field has focus —
                  feedback without adding a box to the bar. */}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-teal transition-transform duration-300 ease-out group-focus-within/s:scale-x-100"
              />
            </div>

            <span aria-hidden className="hidden w-px shrink-0 self-stretch bg-border sm:block" />

            {/*
              A real segmented control instead of one button that renamed itself.
              Both states are visible at once, so it is legible which view you
              are in and what the alternative is — and „Standorte" is named for
              what it delivers: the interactive map does not exist yet, the
              places the results lie in do.
            */}
            <div
              role="group"
              aria-label="Ansicht"
              className="relative flex shrink-0 items-center gap-1 p-1 sm:ml-1"
            >
              <ViewTab
                active={!mapView}
                onClick={() => setMapView(false)}
                icon={LayoutGrid}
                label="Raster"
              />
              <ViewTab
                active={mapView}
                onClick={() => setMapView(true)}
                icon={Map}
                label="Standorte"
              />
            </div>
          </div>
        </div>

        {/*
          The filter panel. The button used to carry a chevron and open nothing,
          which on the one page built for finding things is the most expensive
          kind of dead control. These four narrow the same list the search box
          does, so the two compose.
        */}
        <div
          id={filterId}
          hidden={!filtersOpen}
          className="surface mt-3 border-t-[3px] border-t-teal px-5 py-5 shadow-[var(--shadow-sm)]"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {!category ? (
              <FilterSelect
                label="Kategorie"
                value={fCategory}
                onChange={(v) => {
                  setFCategory(v)
                  setPageNo(1)
                }}
                options={[
                  { value: "", label: "Alle Kategorien" },
                  ...CATEGORIES.map((c) => ({ value: c.slug, label: c.short })),
                ]}
              />
            ) : null}
            <FilterSelect
              label="Ort"
              value={fCity}
              onChange={(v) => {
                setFCity(v)
                setPageNo(1)
              }}
              options={[
                { value: "", label: "Alle Orte" },
                ...CITIES.map((c) => ({ value: c, label: c })),
              ]}
            />
            <FilterSelect
              label="Abrechnung"
              value={fUnit}
              onChange={(v) => {
                setFUnit(v)
                setPageNo(1)
              }}
              options={[
                { value: "", label: "Alle Zeiträume" },
                ...UNITS.map((u) => ({ value: u, label: `pro ${u}` })),
              ]}
            />
            {/*
              Availability by day. This is the field the hero's „Zeitraum" feeds:
              the value used to arrive as `?ab=` and be dropped on the floor, so
              the panel now owns it and the list actually narrows.
            */}
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                Verfügbar am
              </span>
              <input
                type="date"
                value={fDate}
                onChange={(e) => {
                  setFDate(e.target.value)
                  setPageNo(1)
                }}
                className="h-11 w-full border border-border bg-white px-3 text-sm text-ink-900 transition-colors duration-200 focus:border-teal focus:outline-none"
              />
            </label>
            <FilterSelect
              label="Sortierung"
              value={sort}
              onChange={(v) => setSort(v as Sort)}
              options={[
                { value: "empfohlen", label: "Empfohlen" },
                { value: "preis-auf", label: "Preis aufsteigend" },
                { value: "preis-ab", label: "Preis absteigend" },
                { value: "bewertung", label: "Beste Bewertung" },
              ]}
            />
          </div>

          {activeFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 inline-flex min-h-9 items-center gap-1.5 text-sm text-ink underline-offset-4 transition-colors hover:text-teal hover:underline"
            >
              <X className="h-4 w-4" />
              Filter zurücksetzen
            </button>
          ) : null}
        </div>

        {/*
          Active filters as removable chips. Without them the only evidence of a
          narrowed list is a badge on a collapsed panel — you have to reopen the
          panel to find out why you are seeing three of twenty-four areas. Each
          chip clears exactly its own filter.
        */}
        {activeFilters ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {fCategory ? (
              <FilterChip
                label={categoryBySlug(fCategory)?.short ?? fCategory}
                onClear={() => {
                  setFCategory("")
                  setPageNo(1)
                }}
              />
            ) : null}
            {fCity ? (
              <FilterChip
                label={fCity}
                onClear={() => {
                  setFCity("")
                  setPageNo(1)
                }}
              />
            ) : null}
            {fUnit ? (
              <FilterChip
                label={`pro ${fUnit}`}
                onClear={() => {
                  setFUnit("")
                  setPageNo(1)
                }}
              />
            ) : null}
            {fDate ? (
              <FilterChip
                label={`verfügbar am ${formatIsoDay(fDate)}`}
                onClear={() => {
                  setFDate("")
                  setPageNo(1)
                }}
              />
            ) : null}
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-semibold text-ink underline-offset-4 transition-colors hover:text-teal hover:underline"
            >
              alle zurücksetzen
            </button>
          </div>
        ) : null}

        {/* Editorial intro — text left, photo bleeding to the right viewport edge */}
        {page && cat && !mapView ? (
          <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-2 lg:items-start lg:gap-x-[clamp(2rem,3vw,3.5rem)]">
            <Reveal className="lg:pt-[clamp(0.5rem,1.5vw,2rem)]">
              <span className="eyebrow">Worum es geht</span>
              {/*
                The subline is the lead, so it carries the headline grey and a
                size of its own; the paragraphs behind it step down. Before,
                lead and body were both 21px grey and the block read as one
                undifferentiated wall.
              */}
              <p className="mt-4 max-w-[34ch] text-[clamp(1.125rem,0.7vw+0.85rem,1.5rem)]/[1.35] font-semibold text-ink-900">
                {page.subline}
              </p>
              <div className="mt-6 max-w-[58ch] space-y-4 text-[clamp(1rem,0.42vw+0.85rem,1.1875rem)]/[1.6] text-ink">
                {page.intro.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </Reveal>
            {/*
              The photo used to bleed to the right viewport edge via
              `lg:mr-[calc(50%-50vw)]`. That formula only lands on the edge when
              the column is exactly half the container: `50%` resolves against
              the column, and the grid's gap makes each column narrower than
              half, so the bleed undershot — at 1024px the photo stopped about
              250px short and the whole block read as shifted out of place. It is
              contained in its column now, with the clipped corner and the
              elevation the story photo has, so both blocks are built the same
              way and neither depends on width arithmetic.
            */}
            <Reveal
              variant="scale"
              delay={90}
              className="relative aspect-[952/664] [filter:drop-shadow(0_20px_40px_rgba(0,101,95,0.14))]"
            >
              <Image
                src={page.introImage}
                alt={cat.label}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="notch object-cover"
                priority
              />
            </Reveal>
          </div>
        ) : null}

        {mapView ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <div className="grid gap-6 sm:grid-cols-2">
              {results.map((l) => (
                <ListingCard key={l.slug} listing={l} />
              ))}
            </div>
            {/*
              No map provider is wired up yet. Rather than an empty hatched box
              that reads as a broken tile layer, this names the cities in the
              current result set — useful on its own — and says plainly that the
              map itself is still to come.
            */}
            <div className="hatch-soft relative min-h-[420px] overflow-hidden border border-border bg-cream lg:sticky lg:top-24 lg:h-[calc(100svh-8rem)]">
              <div className="absolute inset-0 grid place-items-center rounded-[var(--radius-control)] p-8">
                <div className="max-w-sm bg-white/95 px-6 py-6 text-center">
                  <p className="text-[17px] font-semibold text-teal">
                    Entdecke CoArea in Deiner Nähe
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink">
                    Die interaktive Karte folgt. Aktuell liegen die{" "}
                    {matches.length} gefundenen Flächen in:
                  </p>
                  <p className="mt-3 text-sm font-medium text-ink">
                    {Array.from(new Set(matches.map((l) => l.city))).join(" · ") || "keine Angabe"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /*
            Figma gutters: 16px in the three-column category grid (496px cards),
            ~26px in the four-column overview grid (360px cards).
          */
          <div
            className={cn(
              "mt-14 grid gap-y-[34px] sm:grid-cols-2 lg:mt-20",
              category
                ? "gap-x-7 lg:grid-cols-3"
                : "gap-x-[26px] lg:grid-cols-3 xl:grid-cols-4",
            )}
          >
            {/*
              Stagger capped at six steps — beyond that the last card of a
              twelve-item page would sit blank for most of a second. `h-full`
              because the wrapper is the grid item now, so it has to stretch or
              the cards in a row stop lining up along the bottom.
            */}
            {results.map((l, i) => (
              <Reveal key={l.slug} delay={Math.min(i, 5) * 60} className="h-full">
                <ListingCard listing={l} />
              </Reveal>
            ))}
          </div>
        )}

        {emptyCategory ? (
          <EmptyCategory label={cat?.label ?? ""} related={related} />
        ) : results.length === 0 ? (
          <div className="surface mt-14 px-6 py-12 text-center">
            <p className="text-[clamp(1.0625rem,0.5vw+0.85rem,1.25rem)] font-semibold text-ink-900">
              {query.trim()
                ? `Keine Fläche passt zu „${query.trim()}“.`
                : "Keine Fläche passt zu diesen Filtern."}
            </p>
            <p className="mx-auto mt-3 max-w-md text-[15px] text-ink">
              Versuch es mit einem anderen Ort oder einem allgemeineren Begriff.
              oder setz alles zurück, um wieder alle Flächen zu sehen.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("")
                resetFilters()
              }}
              className="btn btn-outline mt-7 min-h-11 px-6"
            >
              Suche &amp; Filter zurücksetzen
            </button>
          </div>
        ) : pageCount > 1 ? (
          <Pagination page={current} pageCount={pageCount} onChange={setPageNo} />
        ) : null}

      </section>

      {/*
        Scenario story — the brochure narrative behind the category.

        Three things were wrong with the earlier version, all of them structural
        rather than cosmetic:

        · it carried a framed TabHeading, so the page showed the brand's
          signature frame twice (once for the H1, once here). The frame is
          rationed to the page identity and to headings on colour.
        · six long paragraphs ran down one half-width column while the other
          column ended after the photo and the pull quote — roughly 700px of
          empty white beside the tail of the text. The remainder now flows in
          two columns across the full measure, so the block ends level.
        · it sat in the same white container as the card grid, so a narrative
          passage and a list of products shared one surface. It is its own band
          now: cream, lit by .mesh, opened by a rule — the page changes register
          when it changes subject.
      */}
      {page && cat && !mapView ? (
        <section className="mesh grain relative isolate overflow-hidden border-t border-border/60 bg-cream">
          <div className="relative container-page py-[clamp(3rem,5vw+0.5rem,6.5rem)]">
            <div className="grid gap-y-10 lg:grid-cols-2 lg:items-start lg:gap-x-[clamp(2rem,4vw,5rem)]">
              <Reveal>
                <span className="eyebrow">Aus der Praxis</span>
                <h2 className="h-plain mt-4 lg:max-w-[20ch]">{page.story.heading}</h2>
                {/*
                  The opening paragraph is the lead — larger and in the headline
                  grey, so the reader is given a way in. The rest is body text.
                */}
                {lead ? (
                  <p className="mt-6 max-w-[46ch] text-[clamp(1.0625rem,0.6vw+0.85rem,1.375rem)]/[1.45] text-ink-900">
                    {lead}
                  </p>
                ) : null}
              </Reveal>

              <Reveal variant="scale" delay={90}>
                <div className="relative aspect-[952/664] [filter:drop-shadow(0_22px_44px_rgba(0,101,95,0.14))]">
                  <Image
                    src={page.story.image}
                    alt={page.story.heading}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="notch object-cover"
                  />
                </div>
                {/*
                  Pull quote: a teal bar and a tinted ground rather than a full
                  outline, so it reads as a voice lifted out of the text and not
                  as another card in the layout.
                */}
                {page.story.quote ? (
                  <figure className="mt-7 border-l-[3px] border-teal bg-white/70 py-4 pr-5 pl-[clamp(1rem,1.5vw,1.5rem)]">
                    <blockquote className="text-[clamp(1.125rem,1.15vw+0.6rem,1.75rem)]/[1.25] font-semibold text-teal">
                      {`„${page.story.quote.text}“`}
                    </blockquote>
                    <figcaption className="mt-3 text-[0.9375rem] text-ink">
                      {page.story.quote.author}
                    </figcaption>
                  </figure>
                ) : null}
              </Reveal>
            </div>

            {/*
              The remainder of the narrative, flowing in two columns on wide
              screens. `break-inside-avoid` keeps a paragraph from being split
              across the column break, which is what makes multi-column text
              hard to follow.
            */}
            {rest.length ? (
              <Reveal
                delay={140}
                className="mt-[clamp(2rem,3vw,3.5rem)] gap-x-[clamp(2rem,4vw,5rem)] text-[clamp(1rem,0.42vw+0.85rem,1.125rem)]/[1.62] text-ink lg:columns-2 [&>p]:mb-5 [&>p]:break-inside-avoid [&>p:last-child]:mb-0"
              >
                {rest.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </Reveal>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  )
}

/*
  One half of the view switch. The active half is filled with the brand gradient
  and carries a teal glow; the idle half is a quiet label. Both are always
  visible, so the control shows the choice rather than only the next step.
*/
function ViewTab({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  label: string
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-10 items-center gap-2 px-3.5 text-[13px] font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-teal/40 focus-visible:outline-none",
        active
          ? "[background:var(--grad-teal)] text-white shadow-[var(--shadow-sm)]"
          : "text-ink hover:bg-teal-50 hover:text-teal",
      )}
    >
      <Icon className="h-4 w-4" strokeWidth={1.9} />
      {label}
    </button>
  )
}

/* An active filter, with its own remove control. */
function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-teal/30 bg-teal-50 py-1.5 pr-1.5 pl-3 text-xs font-semibold text-teal">
      {label}
      <button
        type="button"
        onClick={onClear}
        aria-label={`Filter „${label}“ entfernen`}
        className="grid h-8 w-8 place-items-center rounded-[var(--radius-control)] transition-colors hover:bg-teal hover:text-white"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  )
}

/* One labelled select in the filter panel. */
function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[11px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-11 w-full border border-input bg-white px-3 text-sm text-ink-900 outline-none transition-colors hover:border-teal/50 focus-visible:border-teal focus-visible:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}

/*
  A category with nothing in it yet. Rather than a dead end this names the
  situation, points owners at the host flow — an empty category is exactly where
  a supply-side signup is most valuable — and keeps demand-side visitors moving
  with a handful of areas from elsewhere on the platform.
*/
function EmptyCategory({
  label,
  related,
}: {
  label: string
  related: typeof LISTINGS
}) {
  return (
    <div className="mt-14">
      <div className="hatch-soft surface bg-cream px-6 py-10 text-center md:px-12 md:py-14">
        <p className="text-[clamp(1.125rem,0.6vw+0.9rem,1.5rem)] font-semibold text-ink-900">
          In dieser Kategorie ist gerade keine Fläche frei.
        </p>
        <p className="mx-auto mt-4 max-w-[38rem] text-[15px] leading-relaxed text-ink md:text-[17px]">
          {label} sind auf CoArea noch neu. Hier entstehen die ersten Inserate
          gerade. Wenn Du selbst eine solche Fläche besitzt, ist jetzt der beste
          Zeitpunkt, sie einzustellen.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/host-werden" className="btn btn-teal sheen min-h-12 px-7">
            Fläche anbieten
          </Link>
          <Link href="/flaechen" className="btn btn-outline group min-h-12 px-7">
            Alle Flächen ansehen
            <span className="arrow-nudge inline-flex">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>

      <h2 className="mt-14 text-[clamp(1.125rem,0.6vw+0.9rem,1.375rem)] font-semibold text-ink">
        Diese Flächen könnten Dich auch interessieren
      </h2>
      <div className="mt-7 grid gap-x-7 gap-y-[34px] sm:grid-cols-2 lg:grid-cols-3">
        {related.map((l) => (
          <ListingCard key={l.slug} listing={l} />
        ))}
      </div>
    </div>
  )
}

/* Pagination for the listing grid, following the Figma footer. */
function Pagination({
  page,
  pageCount,
  onChange,
}: {
  page: number
  pageCount: number
  onChange: (p: number) => void
}) {
  const go = (p: number) => {
    onChange(Math.min(Math.max(p, 1), pageCount))
    // Jumping to page 4 while parked at the bottom of page 3 is disorienting.
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <nav
      className="mt-12 flex flex-wrap items-center justify-center gap-2 text-sm"
      aria-label="Seiten"
    >
      <button
        type="button"
        aria-label="Vorherige Seite"
        disabled={page === 1}
        onClick={() => go(page - 1)}
        className="grid h-11 w-11 place-items-center rounded-[var(--radius-control)] border border-input text-teal transition-colors hover:border-teal hover:bg-teal-50 disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          aria-current={p === page ? "page" : undefined}
          aria-label={`Seite ${p}`}
          onClick={() => go(p)}
          className={cn(
            "grid h-11 w-11 place-items-center rounded-[var(--radius-control)] border transition-colors",
            p === page
              ? "border-teal bg-teal font-semibold text-white"
              : "border-transparent text-ink hover:border-teal/40 hover:text-teal",
          )}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        aria-label="Nächste Seite"
        disabled={page === pageCount}
        onClick={() => go(page + 1)}
        className="grid h-11 w-11 place-items-center rounded-[var(--radius-control)] border border-input text-teal transition-colors hover:border-teal hover:bg-teal-50 disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}
