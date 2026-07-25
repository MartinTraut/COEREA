import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MapPin, Share2, Heart, Ruler, Map as MapIcon } from "lucide-react"

import { LISTINGS, listingBySlug } from "@/lib/listings"
import { CATEGORIES, categoryBySlug } from "@/lib/categories"
import { TabHeading } from "@/components/brand/tab-heading"
import { CategoryDiamond } from "@/components/brand/category-diamond"
import { ListingGallery } from "@/components/listings/listing-gallery"
import { BookingWidget } from "@/components/listings/booking-widget"
import { DetailSections } from "@/components/listings/detail-sections"

export function generateStaticParams() {
  return LISTINGS.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const listing = listingBySlug(slug)
  if (!listing) return {}
  return { title: listing.title, description: listing.excerpt }
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const listing = listingBySlug(slug)
  if (!listing) notFound()

  const cat = categoryBySlug(listing.category)
  const period = listing.dateText ?? (listing.from ? `${listing.from} bis ${listing.to}` : "auf Anfrage")
  // Round out the gallery cluster with photos from other listings.
  const moreImages = LISTINGS.filter((l) => l.slug !== listing.slug)
    .map((l) => l.image)
    .slice(0, 4)

  return (
    <div className="pb-6">
      <div className="container-page pt-8 md:pt-12">
        {/* Category heading + diamond navigation */}
        <TabHeading as="span" className="text-[clamp(1.5rem,3vw+0.5rem,2.5rem)]">
          {cat?.label}
        </TabHeading>

        <div className="mt-8 -mx-5 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max justify-between gap-3 pb-1 md:min-w-0">
            {CATEGORIES.map((c) => (
              <CategoryDiamond
                key={c.slug}
                icon={c.icon}
                label={c.label}
                href="/flaechen"
                active={c.slug === listing.category}
              />
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-10">
          <ListingGallery
            category={listing.category}
            tone={listing.tone}
            size={listing.size}
            image={listing.image}
            more={moreImages}
          />
        </div>

        {/* Title + meta */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          <div>
            <h1 className="max-w-xl text-[clamp(1.35rem,2vw+0.5rem,2rem)] leading-tight font-semibold text-ink">
              {listing.title}
            </h1>
            <p className="mt-5 max-w-xl leading-relaxed text-ink/80">
              Hallo zusammen! Ich bin {listing.host.name.split(" ")[0]} und vermiete{" "}
              {listing.size} {cat?.label.toLowerCase()} in {listing.city}. {listing.excerpt}{" "}
              Wenn Ihr Fragen habt, meldet euch gerne. Ich freue mich auf eine
              gemeinschaftliche und nachhaltige Nutzung.
            </p>
          </div>

          {/* meta panel */}
          <aside className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 border border-teal px-3 py-1.5 text-sm font-medium text-teal">
                <Ruler className="h-4 w-4" /> {listing.size} Größe
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Teilen"
                  className="grid h-10 w-10 place-items-center border border-border text-teal transition-colors hover:border-teal"
                >
                  <Share2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Merken"
                  className="grid h-10 w-10 place-items-center border border-border text-teal transition-colors hover:border-teal"
                >
                  <Heart className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 text-sm text-ink">
                <MapPin className="h-4 w-4 text-teal" />
                <span className="underline underline-offset-2">{listing.city}</span>
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-sm text-ink transition-colors hover:border-teal"
              >
                <MapIcon className="h-4 w-4 text-teal" /> auf Karte anzeigen
              </button>
            </div>

            <p className="text-sm text-ink/80">
              <span className="font-medium text-ink">Zeitraum:</span> {period}
            </p>

            <p className="text-sm text-ink/80">
              User buchen diese Fläche oft für{" "}
              <span className="text-teal">{cat?.usage}</span>
            </p>

            <p className="mt-1 text-right text-lg font-bold text-ink">
              {listing.price.amount}
              <span className="font-normal text-ink/60"> / {listing.price.unit}</span>
            </p>
          </aside>
        </div>
      </div>

      {/* Verfügbarkeit */}
      <BookingWidget listing={listing} />

      {/* Host band + other listings + reviews + FAQ */}
      <DetailSections listing={listing} />
    </div>
  )
}
