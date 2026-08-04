import Link from "next/link"
import { MapPin, Star, Clock, ArrowUpRight } from "lucide-react"

import type { Listing } from "@/lib/listings"
import { categoryBySlug } from "@/lib/categories"
import { cityLabel } from "@/lib/listings"
import { formatUnitPrice } from "@/lib/pricing"
import { AreaChip } from "@/components/brand/area-chip"
import { ListingImage } from "@/components/brand/listing-image"
import { SaveButton } from "@/components/listings/save-button"

/*
  The listing card.

  Reworked from a stack of centred rows into a proper composition: the photo
  carries the utilities that belong to it (badge, wishlist, price) under a
  scrim, and the body is left to do one job — say what the area is and where.
  The old version pushed the price down to a fifth row with 44px of dead space
  above it, which at four columns made every card feel like a form.

  Everything that moves on hover is a transform, a border colour or a shadow.
  Nothing here can trigger a reflow, which matters because twelve of these sit
  in the discover grid at once.
*/
export function ListingCard({
  listing,
  priority = false,
}: {
  listing: Listing
  /** Set on the first card of a grid: that photo is the page's LCP element. */
  priority?: boolean
}) {
  const cat = categoryBySlug(listing.category)
  const date =
    listing.dateText ??
    (listing.from ? `${listing.from} bis ${listing.to}` : undefined)

  return (
    <article className="surface surface-hover group flex h-full flex-col overflow-hidden">
      <div className="media-zoom relative overflow-hidden">
        {/* Not a tab stop: the title below links to the same place, and two
            stops on one destination is a stop too many in a grid of twelve. */}
        <Link
          href={`/flaechen/${listing.slug}`}
          tabIndex={-1}
          aria-hidden
          className="block"
        >
          <ListingImage
            category={listing.category}
            tone={listing.tone}
            image={listing.image}
            alt={listing.title}
            priority={priority}
            className="aspect-[4/3]"
          />
        </Link>

        {/*
          Scrim. The price and size sit on the photograph, so they need a
          guaranteed dark base underneath — a light sky in one image and a dark
          hedge in the next would otherwise decide whether the text is legible.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
        />

        {listing.badge ? (
          <span className="absolute top-3 left-3 rounded-[var(--radius-control)] bg-teal/95 px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] text-white uppercase backdrop-blur-sm">
            {listing.badge}
          </span>
        ) : null}

        {/*
          The wishlist belongs with the photo, not in the middle of the copy.
          It gets a white chip because the heart's unsaved grey and its saved
          teal both have to stay legible over an arbitrary photograph.
        */}
        <div className="absolute top-2 right-2 rounded-full bg-white/92 p-1.5 backdrop-blur-sm">
          <SaveButton
            slug={listing.slug}
            defaultSaved={listing.saved}
            iconClassName="h-5 w-5"
          />
        </div>

        {/*
          Price and size, the two numbers the grid is scanned for. Both were set
          smaller than the city line below them — the price at 16px, the size at
          11px, which is under the floor for anything laid over a photograph.
          They now carry the weight their job deserves.
        */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
          <span className="price text-white drop-shadow-[0_1px_5px_rgba(0,0,0,0.55)]">
            {/*
              This used to be `.replace(/\s€$/, "€")`, which printed „179€" on
              every card on the site. In German the currency symbol keeps its
              space after the amount (DIN 5008), and the data now carries a
              narrow no-break space so the pair can never be split across a line
              break — a regex on `\s` would have eaten exactly that.
            */}
            {formatUnitPrice(listing)}
            <span className="ml-1 text-[0.62em] font-medium text-white/85">
              / {listing.price.unit}
            </span>
          </span>
          {listing.size ? <AreaChip value={listing.size} scale="sm" /> : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-[clamp(1rem,1.4vw,1.5rem)]">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[clamp(0.75rem,0.2vw+0.7rem,0.875rem)] font-semibold tracking-wide text-teal">
            {cat?.label}
          </span>
          <span
            className="flex items-center gap-0.5"
            aria-label={`${listing.rating} von 5 Sternen`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={
                  i < Math.round(listing.rating)
                    ? "h-3.5 w-3.5 fill-gold text-gold"
                    : "h-3.5 w-3.5 fill-ink/15 text-ink/15"
                }
                aria-hidden
              />
            ))}
          </span>
        </div>

        <h3 className="text-[clamp(0.9375rem,0.35vw+0.8rem,1.125rem)]/[1.35] font-semibold text-ink-900">
          <Link
            href={`/flaechen/${listing.slug}`}
            className="transition-colors duration-200 group-hover:text-teal"
          >
            {listing.title}
          </Link>
        </h3>

        {/* Meta pinned to the bottom so cards in a row align on it. */}
        <div className="mt-auto flex flex-col gap-1.5 pt-2 text-[clamp(0.8125rem,0.2vw+0.75rem,0.9375rem)] text-ink">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-teal" strokeWidth={1.75} />
            {cityLabel(listing)}
          </span>
          {date ? (
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-teal" strokeWidth={1.75} />
              {date}
            </span>
          ) : null}
        </div>

      </div>

      {/*
        Affordance rather than a second control: the arrow appears over the photo
        on hover to say the whole card leads somewhere. It is positioned, not in
        flow — an in-flow label reserved a line of empty space under every card
        even while hidden, which left the grid looking bottom-heavy. aria-hidden
        because the title link is the real target; a second link to the same
        place would only add a tab stop.
      */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 grid h-9 w-9 translate-y-full place-items-center rounded-[var(--radius-control)] bg-teal text-white transition-transform duration-300 ease-out group-hover:translate-y-0"
      >
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </article>
  )
}
