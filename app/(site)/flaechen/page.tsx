import type { Metadata } from "next"

import { SITE } from "@/lib/site"
import { LISTINGS } from "@/lib/listings"
import { itemListNode, webPageNode } from "@/lib/schema"
import { JsonLd } from "@/components/seo/json-ld"
import { Discover } from "@/components/listings/discover"

const URL = `${SITE.url}/flaechen`
const DESCRIPTION =
  "Entdecke ungenutzte Flächen in Deiner Nähe: Gärten, Agrar- und Sportflächen, Gewerbe und mehr. Filtern, suchen und auf der Karte finden."

export const metadata: Metadata = {
  title: "Flächen entdecken",
  description: DESCRIPTION,
  alternates: { canonical: "/flaechen" },
}

/*
  `searchParams` is read here rather than with `useSearchParams` inside the
  client component, so the listing grid is rendered on the server instead of
  appearing all at once on hydration. This route is therefore rendered per
  request — correct, since its content depends on the query string. The category
  routes below it stay static.
*/
export default async function FlaechenPage({
  searchParams,
}: {
  searchParams: Promise<{ suche?: string | string[]; ab?: string | string[] }>
}) {
  const { suche, ab } = await searchParams
  const initialQuery = (Array.isArray(suche) ? suche[0] : suche) ?? ""
  /*
    `ab` reaches a date input and the availability filter, so only a plain ISO
    day is accepted — anything else is dropped rather than handed on.
  */
  const abRaw = (Array.isArray(ab) ? ab[0] : ab) ?? ""
  const initialDate = /^\d{4}-\d{2}-\d{2}$/.test(abRaw) ? abRaw : ""

  return (
    <>
      <JsonLd
        graph={[
          webPageNode({
            url: URL,
            name: "Flächen entdecken",
            description: DESCRIPTION,
          }),
          /*
            No BreadcrumbList here. The trail was a single step to this very
            page, which tells a crawler nothing and has no visible counterpart —
            the category and detail pages, where the trail is real, render it
            from the same array they pass to `breadcrumbNode`.
          */
          itemListNode(LISTINGS, URL, "Alle Flächen auf CoArea"),
        ]}
      />
      <Discover initialQuery={initialQuery} initialDate={initialDate} />
    </>
  )
}
