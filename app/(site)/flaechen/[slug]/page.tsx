import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MapPin, Ruler, Map as MapIcon, CalendarRange, Tag } from "lucide-react"

import { SITE } from "@/lib/site"
import { cityLabel, LISTINGS, listingBySlug } from "@/lib/listings"
import { categoryBySlug } from "@/lib/categories"
import { BOOKING_FAQ } from "@/lib/faq"
import { SERVICE_FEE_RATE } from "@/lib/pricing"
import { breadcrumbNode, faqNode, listingNode, webPageNode } from "@/lib/schema"
import { JsonLd } from "@/components/seo/json-ld"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { SaveButton } from "@/components/listings/save-button"
import { ShareButton } from "@/components/listings/share-button"
import { TabHeading } from "@/components/brand/tab-heading"
import { CategoryStrip } from "@/components/brand/category-strip"
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
  // Unknown slug: this request will render the 404, so label it as one.
  if (!listing) {
    return {
      title: "Seite nicht gefunden",
      robots: { index: false, follow: true },
    }
  }
  return {
    title: listing.title,
    description: listing.excerpt,
    alternates: { canonical: `/flaechen/${listing.slug}` },
    openGraph: {
      title: listing.title,
      description: listing.excerpt,
      images: [{ url: listing.image }],
    },
  }
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
  /*
    The gallery cluster is filled from other areas until there is real
    multi-photo data per listing. It used to take the first four listings
    outright, so a pasture in Bonn showed four gardens — restricting it to the
    same category (host's own areas first) keeps the cluster plausible, and
    fewer than four simply renders fewer tiles.
  */
  const moreImages = LISTINGS.filter(
    (l) => l.slug !== listing.slug && l.category === listing.category,
  )
    .sort(
      (a, b) =>
        Number(b.host.name === listing.host.name) -
        Number(a.host.name === listing.host.name),
    )
    .map((l) => l.image)
    .slice(0, 4)

  const url = `${SITE.url}/flaechen/${listing.slug}`

  /*
    One trail, used twice: rendered as the visible breadcrumb below and handed
    to `breadcrumbNode` for the JSON-LD. Previously only the schema existed.
  */
  const trail = [
    { name: "Flächen entdecken", path: "/flaechen" },
    ...(cat ? [{ name: cat.label, path: `/flaechen/kategorie/${cat.slug}` }] : []),
    { name: listing.title, path: `/flaechen/${listing.slug}` },
  ]

  return (
    <div className="pb-6">
      {/*
        Product + Offer for the area itself, the trail back to its category, and
        the booking FAQ — which is marked up here because DetailSections renders
        exactly these questions further down the page.
      */}
      <JsonLd
        graph={[
          webPageNode({
            url,
            name: listing.title,
            description: listing.excerpt,
            hasBreadcrumb: true,
          }),
          breadcrumbNode(trail, url),
          listingNode(listing, cat?.label ?? ""),
          faqNode(BOOKING_FAQ, url),
        ]}
      />
      <div className="container-page pt-8 md:pt-12">
        <Breadcrumbs trail={trail} />

        {/* Category heading + diamond navigation */}
        <span className="eyebrow mt-6">Fläche in {cityLabel(listing)}</span>
        <TabHeading as="span" className="mt-4 h-section">
          {cat?.label}
        </TabHeading>

        <div className="mt-8">
          <CategoryStrip
            active={listing.category}
            hrefFor={(slug) => `/flaechen/kategorie/${slug}`}
          />
        </div>

        {/* Gallery */}
        <div className="mt-10">
          <ListingGallery
            category={listing.category}
            tone={listing.tone}
            size={listing.size}
            image={listing.image}
            alt={listing.title}
            more={moreImages}
          />
        </div>

        {/* Title + meta */}
        <div className="mt-[clamp(2rem,3vw,3.5rem)] grid gap-[clamp(2rem,3vw,3.5rem)] lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h1 className="max-w-2xl text-[clamp(1.5rem,1.9vw+0.7rem,2.75rem)]/[1.15] font-semibold text-ink-900">
              {listing.title}
            </h1>
            {/*
              This was first-person speech assembled from data and attributed to
              a named host: „Hallo zusammen! Ich bin Roland und vermiete 85,5 m²
              innerstädtische private Gärten in Korschenbroich." Nobody wrote
              that sentence, and slotting a plural category label after a single
              measurement made it ungrammatical on every listing. Third person,
              stating only what the data actually says.
            */}
            <p className="mt-6 max-w-2xl text-[clamp(1rem,0.35vw+0.85rem,1.125rem)]/[1.7] text-ink">
              {/* The line break in the source put a space in front of the comma,
                  visible on every listing: „in Köln an , Kategorie". */}
              {listing.host.name} bietet hier {listing.size} in {cityLabel(listing)}{" "}
              an, Kategorie {cat?.label ?? "Fläche"}. {listing.excerpt}
            </p>
          </div>

          {/*
            The facts panel. It was a loose column of small paragraphs with the
            price stranded at the bottom — the one number a visitor is looking
            for. It is now a raised card that leads with the price and lists the
            rest as labelled rows.
          */}
          <aside className="surface h-fit p-[clamp(1.25rem,1.6vw,1.75rem)] shadow-[var(--shadow-md)]">
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[3px] [background:var(--grad-teal-bright)]"
            />
            <div className="flex items-start justify-between gap-3">
              <span className="text-[clamp(1.5rem,1.2vw+1rem,2.125rem)] leading-none font-bold text-ink-900">
                {listing.price.amount}
                <span className="mt-1.5 block text-xs font-medium text-muted-foreground">
                  {/* Named rather than alluded to: „zzgl. Servicegebühr" tells
                      the visitor there is a surcharge without telling him how
                      much, which is the one thing he wants to know. */}
                  pro {listing.price.unit}
                  {" · zzgl. "}
                  {Math.round(SERVICE_FEE_RATE * 100)} % Servicegebühr &amp; MwSt.
                </span>
              </span>
              <div className="flex shrink-0 gap-1">
                {/*
                  This was a decorative glyph with no handler. ShareButton is the
                  real control the cards already use — Web Share where available,
                  clipboard otherwise.
                */}
                <ShareButton slug={listing.slug} title={listing.title} />
                <SaveButton slug={listing.slug} defaultSaved={listing.saved} />
              </div>
            </div>

            <dl className="mt-6 grid gap-0 border-t border-border">
              <Fact icon={Ruler} label="Größe" value={listing.size} />
              <Fact icon={MapPin} label="Ort" value={cityLabel(listing)} />
              <Fact icon={CalendarRange} label="Zeitraum" value={period} />
              <Fact icon={Tag} label="Typische Nutzung" value={cat?.usage ?? "keine Angabe"} />
            </dl>

            {/*
              No map provider is wired up, so this is a note rather than a
              button. A control that looks live and does nothing is worse than
              an honest label — same rule as the footer's social marks.
            */}
            <p
              title="Interaktive Karte folgt"
              className="mt-5 inline-flex items-center gap-2 bg-cream px-3 py-2 text-xs text-muted-foreground"
            >
              <MapIcon className="h-3.5 w-3.5 text-teal/60" />
              Kartenansicht folgt
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

/* One labelled row in the facts panel. */
function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border py-3 last:border-b-0">
      <dt className="inline-flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4 shrink-0 text-teal" strokeWidth={1.75} />
        {label}
      </dt>
      <dd className="text-right text-sm font-medium text-ink-900">{value}</dd>
    </div>
  )
}
