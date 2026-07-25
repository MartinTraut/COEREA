import { Hero } from "@/components/home/hero"
import { NewListings, PopularListings } from "@/components/home/listing-sections"
import { Benefits } from "@/components/home/benefits"
import { Testimonials } from "@/components/home/testimonials"
import { Newsletter } from "@/components/home/newsletter"
import { News } from "@/components/home/news"
import { GetInTouch } from "@/components/home/get-in-touch"
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/json-ld"

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <WebsiteJsonLd />
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
