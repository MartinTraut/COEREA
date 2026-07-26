import type { MetadataRoute } from "next"

import { SITE } from "@/lib/site"

/*
  Crawling rules. Everything public is open; the booking funnel and the
  account area are closed off — they hold no rankable content and would only
  spend crawl budget and surface half-finished flows in search results.
*/
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/anmelden", "/dashboard", "/flaechen/*/buchen", "/flaechen/*/erfolgreich"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
