import type { MetadataRoute } from "next"

import { SITE } from "@/lib/site"
import { CATEGORIES } from "@/lib/categories"
import { LISTINGS } from "@/lib/listings"

/*
  Sitemap. Priorities express what we actually want ranked: the marketplace
  entry points first, the individual listings next, the legal pages last.

  The booking funnel (/flaechen/[slug]/buchen and /erfolgreich) and the
  logged-in views (/anmelden, /dashboard) are deliberately absent — they are
  transactional steps with nothing to rank, and are excluded in robots.ts too.
*/
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: Array<[string, number, MetadataRoute.Sitemap[number]["changeFrequency"]]> = [
    ["", 1, "daily"],
    ["/flaechen", 0.9, "daily"],
    ["/host-werden", 0.8, "monthly"],
    ["/ueber-uns", 0.7, "monthly"],
    ["/businesspartner", 0.6, "monthly"],
    ["/kontakt", 0.6, "yearly"],
    ["/hilfe", 0.5, "monthly"],
    ["/jobs", 0.4, "monthly"],
    ["/presse", 0.4, "monthly"],
    ["/impressum", 0.2, "yearly"],
    ["/datenschutz", 0.2, "yearly"],
    ["/cookies", 0.2, "yearly"],
    ["/haftungsausschluss", 0.2, "yearly"],
  ]

  return [
    ...staticPages.map(([path, priority, changeFrequency]) => ({
      url: `${SITE.url}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    /*
      Only categories that actually hold listings. Four of the eight are still
      empty; submitting them at priority 0.8 would ask Google to rank four pages
      whose only content is the category strip and an empty state.
    */
    ...CATEGORIES.filter((c) => LISTINGS.some((l) => l.category === c.slug)).map((c) => ({
      url: `${SITE.url}/flaechen/kategorie/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...LISTINGS.map((l) => ({
      url: `${SITE.url}/flaechen/${l.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ]
}
