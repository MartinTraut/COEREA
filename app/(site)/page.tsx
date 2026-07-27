import { SITE } from "@/lib/site"
import { CATEGORIES } from "@/lib/categories"
import { HOME_FAQ } from "@/lib/home-faq"
import { faqNode, serviceCatalogNode, webPageNode } from "@/lib/schema"
import { JsonLd } from "@/components/seo/json-ld"
import { Hero } from "@/components/home/hero"
import { Categories } from "@/components/home/categories"
import { NewListings, PopularListings } from "@/components/home/listing-sections"
import { HowItWorks } from "@/components/home/how-it-works"
import { Benefits } from "@/components/home/benefits"
import { Testimonials } from "@/components/home/testimonials"
import { Faq } from "@/components/home/faq"
import { Newsletter } from "@/components/home/newsletter"
import { News } from "@/components/home/news"
import { GetInTouch } from "@/components/home/get-in-touch"

/*
  Homepage.

  The order is an argument, read top to bottom:

    Hero          — what this is, and the one control that starts everything
    Categories    — what kind of ground we actually deal in
    New / Popular — proof that there is something here
    HowItWorks    — the mechanism, from both sides of the transaction
    Benefits      — why it is worth doing at all
    Testimonials  — that somebody has already done it
    FAQ           — the objections, answered before they are raised
    News          — that the subject is alive beyond this platform
    Newsletter    — the low-commitment ask
    GetInTouch    — the high-commitment ask, and the hand-off to the footer

  Categories, HowItWorks and the FAQ are the three additions that close the gaps:
  the page previously never named the eight kinds of area, never explained how a
  booking works, and never answered a question. The FAQ also carries the page's
  GEO weight — front-loaded answers to questions people genuinely type.
*/
export default function HomePage() {
  return (
    <>
      {/*
        Organization + WebSite come from the layout; the homepage adds what is
        unique to it — the page node, the catalogue of area categories, and the
        FAQ. The FAQPage is emitted only because the identical questions and
        answers are rendered on this page by <Faq />; both read HOME_FAQ, so
        markup and visible text cannot drift apart.
      */}
      <JsonLd
        graph={[
          webPageNode({
            url: `${SITE.url}/`,
            name: `${SITE.name}: ${SITE.claim}`,
            description: SITE.description,
          }),
          serviceCatalogNode(CATEGORIES),
          faqNode(HOME_FAQ, `${SITE.url}/`),
        ]}
      />
      <Hero />
      <Categories />
      <NewListings />
      <PopularListings />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <Faq />
      <News />
      <Newsletter />
      <GetInTouch />
    </>
  )
}
