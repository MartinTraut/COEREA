import Link from "next/link"
import { ArrowRight, MapPin, Clock } from "lucide-react"

import { LISTINGS, listingBySlug } from "@/lib/listings"
import type { Listing } from "@/lib/listings"
import { categoryBySlug } from "@/lib/categories"
import { cityLabel } from "@/lib/listings"
import { AreaChip } from "@/components/brand/area-chip"
import { Reveal } from "@/components/brand/reveal"
import { ListingCard } from "@/components/listings/listing-card"
import { ListingImage } from "@/components/brand/listing-image"
import { SaveButton } from "@/components/listings/save-button"
import { ShareButton } from "@/components/listings/share-button"

/*
  Section header. An eyebrow above the heading gives the block a hierarchy
  instead of starting cold on a framed title, and the fading rule underneath
  ties the header to the grid below it without drawing a hard box.
*/
function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-[clamp(1.75rem,2.6vw,3rem)]">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="h-plain mt-4">{title}</h2>
        </div>
        <Link
          href="/flaechen"
          className="btn btn-outline group h-11 px-5 text-sm max-sm:mt-5 max-sm:w-full"
        >
          Flächen entdecken
          <span className="arrow-nudge inline-flex">
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
      <hr className="rule-fade mt-[clamp(1.25rem,1.8vw,2rem)]" />
    </div>
  )
}

/* The single prominent feature card of the „Neu inserierte Flächen" section. */
function FeatureCard({ listing }: { listing: Listing }) {
  const cat = categoryBySlug(listing.category)
  const date =
    listing.dateText ?? (listing.from ? `${listing.from} bis ${listing.to}` : undefined)
  return (
    <article className="surface group grid overflow-hidden md:grid-cols-[1.15fr_1fr]">
      <Link
        href={`/flaechen/${listing.slug}`}
        aria-label={listing.title}
        className="media-zoom relative block overflow-hidden"
      >
        <ListingImage
          category={listing.category}
          tone={listing.tone}
          image={listing.image}
          alt={listing.title}
          sizes="(max-width: 768px) 100vw, 55vw"
          /* Was `priority`. This card sits below the hero AND below the whole
             category band, so preloading it only took bandwidth away from the
             first screen. */
          className="aspect-[16/10] h-full md:aspect-auto md:min-h-[26rem]"
        />
        <span className="absolute top-4 left-4 z-10 rounded-[var(--radius-control)] bg-teal/95 px-3 py-1.5 text-xs font-semibold tracking-[0.08em] text-white uppercase backdrop-blur-sm">
          {listing.badge ?? "Neu"}
        </span>
        {listing.size ? (
          <AreaChip value={listing.size} className="absolute right-4 bottom-4 z-10" />
        ) : null}
      </Link>

      {/*
        The copy side sits on the quiet cream so the two halves read as a
        deliberate pairing rather than as a photo taped onto a white box.

        The seam used to be a 12px strip of `.hatch-soft` — whose lines repeat
        every 12px, so the strip showed exactly one diagonal. That is not a
        Schraffur, it is a stray stroke, and it was one of four places the motif
        was being spent on decoration. A gradient rule states the seam without
        borrowing a mark that means something else.
      */}
      <div className="relative flex flex-col justify-center gap-4 bg-cream p-[clamp(1.5rem,2.6vw,3rem)]">
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 hidden w-[3px] [background:var(--grad-teal)] md:block"
        />

        <div className="flex items-start justify-between gap-4">
          <span className="eyebrow">{cat?.label}</span>
          {/*
            These were two decorative glyphs: the heart did not respond, so an
            area saved on the discover page showed up unsaved here. Both are
            real controls now, sharing the same wishlist store as the cards.
          */}
          <div className="-mt-1 flex gap-1">
            <ShareButton slug={listing.slug} title={listing.title} />
            <SaveButton slug={listing.slug} defaultSaved={listing.saved} />
          </div>
        </div>

        <h3 className="text-[clamp(1.25rem,1.5vw+0.5rem,2rem)]/[1.2] font-semibold text-ink-900">
          <Link
            href={`/flaechen/${listing.slug}`}
            className="transition-colors duration-200 hover:text-teal"
          >
            {listing.title}
          </Link>
        </h3>

        {/* Meta as chips — reads as data, not as another line of prose. */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 bg-white px-2.5 py-1.5 text-xs font-medium text-ink">
            <MapPin className="h-3.5 w-3.5 text-teal" /> {cityLabel(listing)}
          </span>
          {date ? (
            <span className="inline-flex items-center gap-1.5 bg-white px-2.5 py-1.5 text-xs font-medium text-ink">
              <Clock className="h-3.5 w-3.5 text-teal" /> {date}
            </span>
          ) : null}
        </div>

        <p className="max-w-md text-[0.9375rem] leading-relaxed text-ink">
          {listing.excerpt}
        </p>

        <div className="mt-2 flex flex-wrap items-end justify-between gap-4 border-t border-teal/15 pt-5">
          <Link
            href={`/flaechen/${listing.slug}`}
            className="btn btn-teal h-12 px-6 text-sm"
          >
            mehr erfahren
            <span className="arrow-nudge inline-flex">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
          <span className="text-right text-[clamp(1.25rem,1vw+0.7rem,1.75rem)] leading-none font-bold text-ink-900">
            {listing.price.amount}
            <span className="mt-1 block text-xs font-medium text-ink">
              pro {listing.price.unit}
            </span>
          </span>
        </div>
      </div>
    </article>
  )
}

/* Explicit ordering that mirrors the Figma home rows. */
const bySlug = (slugs: string[]) =>
  slugs.map((s) => listingBySlug(s)).filter((l): l is Listing => Boolean(l))

export function NewListings() {
  const feature = listingBySlug("parzelle-ackerflaeche-bornheim") ?? LISTINGS[0]
  return (
    <section className="container-page py-[clamp(2.75rem,3.6vw,4.25rem)]">
      <Reveal>
        <SectionHead eyebrow="Frisch dabei" title="Neu inserierte Flächen" />
      </Reveal>
      {/* The feature card wipes open rather than fading — it is one large block,
          and a fade at that size looks like a slow image load. */}
      <Reveal variant="clip" delay={80}>
        <FeatureCard listing={feature} />
      </Reveal>
    </section>
  )
}

export function PopularListings() {
  const items = bySlug([
    "forstflaeche-frechen",
    "gartenparzelle-singen",
    "hinterhof-schreiner-koeln",
    "volleyballfeld-koeln",
  ])
  return (
    <section className="container-page pb-[clamp(2rem,3vw,3.5rem)]">
      <Reveal>
        <SectionHead eyebrow="Von der Community gewählt" title="Derzeit beliebt" />
      </Reveal>
      {/* Cards fade in one after another rather than as one block. */}
      <div className="grid gap-[clamp(1rem,1.6vw,1.75rem)] sm:grid-cols-2 lg:grid-cols-4">
        {items.map((l, i) => (
          <Reveal key={l.slug} delay={i * 70} className="h-full">
            <ListingCard listing={l} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
