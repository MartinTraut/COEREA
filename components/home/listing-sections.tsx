import Link from "next/link"
import { ArrowRight, MapPin, Clock, Share2, Heart } from "lucide-react"

import { LISTINGS, listingBySlug } from "@/lib/listings"
import type { Listing } from "@/lib/listings"
import { categoryBySlug } from "@/lib/categories"
import { TabHeading } from "@/components/brand/tab-heading"
import { ListingCard } from "@/components/listings/listing-card"
import { ListingImage } from "@/components/brand/listing-image"

function SectionHead({ title }: { title: string }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <TabHeading className="text-[clamp(1.4rem,2vw+0.5rem,2rem)]">
        {title}
      </TabHeading>
      <Link
        href="/flaechen"
        className="hidden shrink-0 items-center gap-1.5 bg-teal px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-600 sm:inline-flex"
      >
        Flächen entdecken
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}

/* The single prominent feature card of the „Neu inserierte Flächen" section. */
function FeatureCard({ listing }: { listing: Listing }) {
  const cat = categoryBySlug(listing.category)
  const date =
    listing.dateText ?? (listing.from ? `${listing.from} bis ${listing.to}` : undefined)
  return (
    <article className="grid overflow-hidden border border-border bg-card md:grid-cols-2">
      <Link
        href={`/flaechen/${listing.slug}`}
        aria-label={listing.title}
        className="relative block"
      >
        <ListingImage
          category={listing.category}
          tone={listing.tone}
          image={listing.image}
          alt={listing.title}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          className="aspect-[16/10] h-full md:aspect-auto md:min-h-[22rem]"
        />
        <span className="absolute top-3 left-3 z-10 bg-teal px-2.5 py-1 text-xs font-semibold tracking-wide text-white uppercase">
          {listing.badge ?? "Neu"}
        </span>
        <span className="absolute right-3 bottom-3 z-10 border border-teal bg-white px-2 py-0.5 text-xs font-semibold text-teal">
          {listing.size}
        </span>
      </Link>

      <div className="flex flex-col justify-center gap-3 p-7 lg:p-10">
        <div className="flex items-start justify-between">
          <span className="text-sm font-bold tracking-wide text-teal uppercase">
            {listing.badge ?? "Neu"}
          </span>
          <div className="-mt-1 flex gap-1">
            <span aria-hidden className="grid h-9 w-9 place-items-center text-teal">
              <Share2 className="h-4 w-4" />
            </span>
            <span aria-hidden className="grid h-9 w-9 place-items-center text-ink/40">
              <Heart className="h-4 w-4" />
            </span>
          </div>
        </div>

        <span className="text-sm font-semibold text-teal">{cat?.label}</span>
        <h3 className="text-[clamp(1.15rem,1.4vw+0.5rem,1.6rem)] leading-tight font-semibold text-ink">
          <Link href={`/flaechen/${listing.slug}`} className="hover:underline">
            {listing.title}
          </Link>
        </h3>

        <div className="flex flex-col gap-1.5 text-sm text-ink/70">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-teal" /> {listing.city}
          </span>
          {date ? (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-teal" /> {date}
            </span>
          ) : null}
        </div>

        <p className="max-w-md text-sm leading-relaxed text-ink/70">{listing.excerpt}</p>

        <div className="mt-3 flex items-end justify-between gap-4">
          <Link
            href={`/flaechen/${listing.slug}`}
            className="inline-flex items-center gap-1.5 bg-teal px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
          >
            mehr erfahren <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="text-right text-lg font-bold text-ink">
            {listing.price.amount}
            <span className="block text-sm font-normal text-ink/60">/ {listing.price.unit}</span>
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
    <section className="container-page py-16 md:py-20">
      <SectionHead title="Neu inserierte Flächen" />
      <FeatureCard listing={feature} />
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
    <section className="container-page pb-4">
      <SectionHead title="Derzeitig beliebt" />
      <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((l) => (
          <ListingCard key={l.slug} listing={l} />
        ))}
      </div>
    </section>
  )
}
