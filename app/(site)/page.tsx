import { SITE } from "@/lib/site"
import { CATEGORIES } from "@/lib/categories"
import { serviceCatalogNode, webPageNode } from "@/lib/schema"
import { JsonLd } from "@/components/seo/json-ld"
import { Hero } from "@/components/home/hero"
import { NewListings, PopularListings } from "@/components/home/listing-sections"
import { Benefits } from "@/components/home/benefits"
import { Testimonials } from "@/components/home/testimonials"
import { Newsletter } from "@/components/home/newsletter"
import { News } from "@/components/home/news"
import { GetInTouch } from "@/components/home/get-in-touch"

export default function HomePage() {
  return (
    <>
      {/*
        Organization + WebSite come from the layout; the homepage adds what is
        unique to it — the page node and the catalogue of area categories.
      */}
      <JsonLd
        graph={[
          webPageNode({
            url: `${SITE.url}/`,
            name: `${SITE.name} — ${SITE.claim}`,
            description: SITE.description,
          }),
          serviceCatalogNode(CATEGORIES),
        ]}
      />
      <Hero />
      <NewListings />
      <PopularListings />
      <Benefits />
      <Testimonials />
      <Newsletter />
      <News />
      <GetInTouch />
    </>
  )
}
