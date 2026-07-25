import Link from "next/link"
import { MapPin, Heart, Star, Clock } from "lucide-react"

import type { Listing } from "@/lib/listings"
import { categoryBySlug } from "@/lib/categories"
import { ListingImage } from "@/components/brand/listing-image"

export function ListingCard({ listing }: { listing: Listing }) {
  const cat = categoryBySlug(listing.category)
  const date =
    listing.dateText ??
    (listing.from ? `${listing.from} bis ${listing.to}` : undefined)

  return (
    <article className="group flex flex-col border border-border bg-card transition-shadow duration-300 hover:shadow-[0_16px_44px_-22px_rgba(41,41,42,0.4)]">
      <div className="relative">
        <Link href={`/flaechen/${listing.slug}`} aria-label={listing.title}>
          <ListingImage
            category={listing.category}
            tone={listing.tone}
            size={listing.size}
            image={listing.image}
            alt={listing.title}
            className="aspect-[4/3]"
          />
        </Link>
        {listing.badge ? (
          <span className="absolute top-2 left-2 bg-teal px-2 py-0.5 text-[11px] font-semibold tracking-wide text-white uppercase">
            {listing.badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 px-3 py-3">
        {/* stars + wishlist */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-0.5" aria-label={`${listing.rating} von 5 Sternen`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={
                  i < Math.round(listing.rating)
                    ? "h-3.5 w-3.5 fill-[#e6b84f] text-[#e6b84f]"
                    : "h-3.5 w-3.5 fill-ink/15 text-ink/15"
                }
                aria-hidden
              />
            ))}
          </span>
          <button
            type="button"
            aria-label="Merken"
            className="-m-2 p-2 text-ink/40 transition-colors hover:text-teal"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>

        <span className="text-xs font-semibold text-teal">{cat?.label}</span>

        <h3 className="text-[0.9rem] leading-snug font-semibold text-ink">
          <Link href={`/flaechen/${listing.slug}`} className="hover:underline">
            {listing.title}
          </Link>
        </h3>

        <div className="mt-1 flex flex-col gap-1 text-[13px] text-ink/70">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-teal" />
            {listing.city}
          </span>
          {date ? (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 shrink-0 text-teal" />
              {date}
            </span>
          ) : null}
        </div>

        <p className="mt-2 text-right text-[0.95rem] font-bold text-ink">
          {listing.price.amount}
          <span className="font-normal text-ink/60"> / {listing.price.unit}</span>
        </p>
      </div>
    </article>
  )
}
