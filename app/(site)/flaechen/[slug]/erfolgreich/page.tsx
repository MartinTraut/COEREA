import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MessageSquare } from "lucide-react"

import { LISTINGS, listingBySlug } from "@/lib/listings"
import { TabHeading } from "@/components/brand/tab-heading"
import { DetailSections } from "@/components/listings/detail-sections"

export function generateStaticParams() {
  return LISTINGS.map((l) => ({ slug: l.slug }))
}

export const metadata: Metadata = {
  title: "Buchungsanfrage abgeschlossen",
  robots: { index: false },
}

export default async function ErfolgreichPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const listing = listingBySlug(slug)
  if (!listing) notFound()

  return (
    <div className="pb-6">
      <div className="container-page pt-8 md:pt-12">
        <TabHeading as="h1" className="text-[clamp(1.4rem,2.5vw+0.5rem,2.1rem)]">
          Buchungsanfrage abgeschlossen
        </TabHeading>

        <div className="mt-8 border border-border bg-card px-6 py-9 sm:px-10">
          <h2 className="text-2xl font-semibold text-teal">
            Deine Buchungsanfrage war erfolgreich!
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink/80">
            Wir haben Deine Buchungsanfrage an Deinen Host verschickt.{" "}
            {listing.host.name} wird sich umgehend bei Dir melden. Hast Du Fragen an
            Deinen Host? Dann nutze gerne unsere Chat-Funktion!
          </p>
          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 bg-teal px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
          >
            <MessageSquare className="h-4 w-4" />
            Nachricht an Host
          </button>
        </div>
      </div>

      <DetailSections listing={listing} />
    </div>
  )
}
