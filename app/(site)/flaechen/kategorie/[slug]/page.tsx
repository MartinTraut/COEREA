import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { SITE } from "@/lib/site"
import { CATEGORIES, categoryBySlug } from "@/lib/categories"
import { categoryPageBySlug } from "@/lib/category-pages"
import { LISTINGS } from "@/lib/listings"
import { breadcrumbNode, itemListNode, webPageNode } from "@/lib/schema"
import { JsonLd } from "@/components/seo/json-ld"
import { Discover } from "@/components/listings/discover"
import { Benefits } from "@/components/home/benefits"
import { Testimonials } from "@/components/home/testimonials"

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }))
}

function describe(slug: string) {
  const cat = categoryBySlug(slug)
  const page = categoryPageBySlug(slug)
  return (
    page?.subline ??
    `${cat?.label} auf CoArea entdecken, vergleichen und direkt buchen.`
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cat = categoryBySlug(slug)
  // Unknown slug: this request will render the 404, so label it as one.
  if (!cat) {
    return {
      title: "Seite nicht gefunden",
      robots: { index: false, follow: true },
    }
  }

  /*
    An empty category has nothing to offer a search result yet and shares its
    H1 with /flaechen, so it is kept out of the index until it holds listings —
    it stays followable so its outgoing links are still discovered.
  */
  const populated = LISTINGS.some((l) => l.category === slug)

  return {
    title: cat.label,
    description: describe(slug),
    alternates: { canonical: `/flaechen/kategorie/${slug}` },
    ...(populated ? {} : { robots: { index: false, follow: true } }),
  }
}

export default async function KategoriePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cat = categoryBySlug(slug)
  if (!cat) notFound()

  const url = `${SITE.url}/flaechen/kategorie/${slug}`
  const inCategory = LISTINGS.filter((l) => l.category === slug)

  return (
    <>
      <JsonLd
        graph={[
          webPageNode({
            url,
            name: cat.label,
            description: describe(slug),
            hasBreadcrumb: true,
          }),
          breadcrumbNode(
            [
              { name: "Flächen entdecken", path: "/flaechen" },
              { name: cat.label, path: `/flaechen/kategorie/${slug}` },
            ],
            url,
          ),
          itemListNode(inCategory, url, cat.label),
        ]}
      />
      {/* The editorial content is resolved here, on the server, and handed to
          the client island — see the note on `page` in Discover. */}
      <Discover category={slug} page={categoryPageBySlug(slug)} />
      <Benefits />
      <Testimonials />
    </>
  )
}
