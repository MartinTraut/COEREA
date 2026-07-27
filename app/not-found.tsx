import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"

import { CATEGORIES } from "@/lib/categories"
import { TabHeading } from "@/components/brand/tab-heading"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

/*
  Global 404. It lives at the app root rather than inside the (site) group,
  because only a root not-found.tsx catches URLs that match no route at all —
  so it brings its own header and footer.

  A dead end is a bounce, so the page does the same job the hero does: name the
  problem in one line, then hand over the two routes people actually came for —
  browsing all areas, or jumping straight into a category.
*/
export const metadata = {
  title: "Seite nicht gefunden",
  description:
    "Diese Seite gibt es nicht (mehr). Entdecke stattdessen freie Flächen auf CoArea.",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container-page py-16 md:py-24">
          <p className="text-[clamp(3rem,6vw+1rem,7rem)] leading-none font-semibold text-teal/15 select-none">
            404
          </p>

          <TabHeading
            as="h1"
            className="mt-4 text-[clamp(1.5rem,2vw+0.6rem,2.75rem)]/[1.15]"
          >
            Diese Fläche ist nicht belegt.
          </TabHeading>

          <p className="mt-7 max-w-[46rem] text-[clamp(1rem,0.6vw+0.7rem,1.3125rem)] leading-[1.5] text-ink">
            Die Seite, die Du aufgerufen hast, existiert nicht oder wurde
            verschoben. Vielleicht hat sich ein Tippfehler in die Adresse
            geschlichen, oder das Inserat wurde inzwischen vermietet.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/flaechen"
              className="btn btn-teal sheen h-[3.25rem] px-7"
            >
              <Search className="h-4 w-4" />
              Flächen entdecken
            </Link>
            <Link
              href="/"
              className="btn btn-outline h-[3.25rem] px-7"
            >
              Zur Startseite
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-14 border-t border-border pt-9">
            <h2 className="text-[clamp(1rem,0.5vw+0.8rem,1.25rem)] font-semibold text-ink">
              Oder direkt in eine Kategorie
            </h2>
            <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-3">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/flaechen/kategorie/${c.slug}`}
                    className="inline-flex min-h-11 items-center border border-border px-4 text-[15px] text-ink transition-colors hover:border-teal hover:text-teal"
                  >
                    {c.short}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
