import { SITE } from "@/lib/site"
import type { Listing } from "@/lib/listings"
import { parseAmount } from "@/lib/pricing"

/**
 * Schema.org node builders.
 *
 * Everything is emitted as one connected `@graph` per page and wired together
 * by `@id`, so the Organization and WebSite declared in the site layout are
 * referenced — not repeated — by the page-level nodes.
 *
 * Only facts that are actually visible on the page get marked up. There is no
 * review data behind the star ratings yet, so no `AggregateRating` is emitted:
 * a rating in the markup that no user can verify on the page is exactly the
 * kind of thing that earns a structured-data penalty.
 */

export const ORG_ID = `${SITE.url}/#organization`
export const SITE_ID = `${SITE.url}/#website`

type Node = Record<string, unknown>

/** UN/CEFACT codes for the four rental periods used in the listing data. */
const UNIT_CODE: Record<string, string> = {
  Stunde: "HUR",
  Tag: "DAY",
  Woche: "WEE",
  Monat: "MON",
}

/**
 * "2,50 €" → 2.5 · "1600 €" → 1600 · "auf Anfrage" → undefined
 *
 * This duplicated `parseAmount` from lib/pricing and got the one case that
 * matters wrong: for "auf Anfrage" the strip left an empty string, `Number("")`
 * is 0, and `Number.isFinite(0)` is true — so the Offer schema published
 * `price: 0` as a fact about an area whose price is on request. It now delegates
 * to the single implementation that already handles that.
 */
export function parsePrice(amount: string): number | undefined {
  return parseAmount(amount) ?? undefined
}

/** "85,5 m²" → { value: 85.5, unitCode: "MTK" } · "1,2 ha" → { 1.2, HAR } */
export function parseArea(size: string): { value: number; unitCode: string } | undefined {
  const m = size.match(/^([\d.,]+)\s*(m²|ha)$/)
  if (!m) return undefined
  const value = Number(m[1].replace(/\./g, "").replace(",", "."))
  if (!Number.isFinite(value)) return undefined
  return { value, unitCode: m[2] === "ha" ? "HAR" : "MTK" }
}

export function organizationNode(): Node {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    slogan: SITE.claim,
    description: SITE.description,
    email: SITE.contact.email,
    telephone: SITE.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.contact.street,
      postalCode: SITE.contact.zip,
      addressLocality: SITE.contact.city,
      addressCountry: "DE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SITE.contact.email,
      telephone: SITE.contact.phone,
      availableLanguage: ["de"],
      areaServed: "DE",
    },
  }
}

export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    inLanguage: "de-DE",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/flaechen?suche={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

/** Trail excluding the site root, which is prepended automatically. */
export function breadcrumbNode(
  trail: Array<{ name: string; path: string }>,
  pageUrl: string,
): Node {
  const items = [{ name: "Startseite", path: "/" }, ...trail]
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  }
}

export function webPageNode({
  url,
  name,
  description,
  hasBreadcrumb = false,
}: {
  url: string
  name: string
  description: string
  hasBreadcrumb?: boolean
}): Node {
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "de-DE",
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    ...(hasBreadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  }
}

/** A single rentable area, as a Product with a per-period rental Offer. */
export function listingNode(listing: Listing, categoryLabel: string): Node {
  const url = `${SITE.url}/flaechen/${listing.slug}`
  const price = parsePrice(listing.price.amount)
  const area = parseArea(listing.size)

  return {
    "@type": "Product",
    "@id": `${url}#product`,
    name: listing.title,
    description: listing.excerpt,
    url,
    image: `${SITE.url}${listing.image}`,
    category: categoryLabel,
    ...(area
      ? {
          additionalProperty: {
            "@type": "PropertyValue",
            name: "Fläche",
            value: area.value,
            unitCode: area.unitCode,
          },
        }
      : {}),
    offers: {
      "@type": "Offer",
      url,
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
      ...(price !== undefined
        ? {
            price,
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price,
              priceCurrency: "EUR",
              unitCode: UNIT_CODE[listing.price.unit] ?? "MON",
              referenceQuantity: {
                "@type": "QuantitativeValue",
                value: 1,
                unitCode: UNIT_CODE[listing.price.unit] ?? "MON",
              },
            },
          }
        : {}),
      areaServed: { "@type": "Place", name: listing.city },
      seller: { "@id": ORG_ID },
    },
  }
}

/** The grid of listings on a discover or category page. */
export function itemListNode(listings: Listing[], pageUrl: string, name: string): Node {
  return {
    "@type": "ItemList",
    "@id": `${pageUrl}#itemlist`,
    name,
    numberOfItems: listings.length,
    itemListElement: listings.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.url}/flaechen/${l.slug}`,
      name: l.title,
    })),
  }
}

/**
 * FAQPage — only ever emitted on pages where the same questions and answers
 * are visible to the user, which Google requires.
 */
export function faqNode(items: ReadonlyArray<{ q: string; a: string }>, pageUrl: string): Node {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    inLanguage: "de-DE",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }
}

/** What CoArea offers, as a catalogue of services per area category. */
export function serviceCatalogNode(
  categories: ReadonlyArray<{ slug: string; label: string; usage: string }>,
): Node {
  return {
    "@type": "Service",
    "@id": `${SITE.url}/#service`,
    serviceType: "Vermittlung ungenutzter Freiflächen",
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Deutschland" },
    description:
      "CoArea vermittelt ungenutzte Freiflächen zwischen Eigentümern und Menschen, die sie gemeinschaftlich nutzen möchten.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Flächenkategorien",
      itemListElement: categories.map((c) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: c.label,
          description: `Freiflächen für ${c.usage}.`,
          url: `${SITE.url}/flaechen/kategorie/${c.slug}`,
        },
      })),
    },
  }
}
