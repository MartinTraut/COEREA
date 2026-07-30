import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { LISTINGS, listingBySlug } from "@/lib/listings"
import { TabHeading } from "@/components/brand/tab-heading"
import { BookingConfirmation } from "@/components/listings/booking-confirmation"
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
        {/* Same size as /buchen and the listing page — see the note there. */}
        <TabHeading as="h1" className="text-[clamp(1.6rem,2.2vw+0.7rem,2.75rem)]">
          Buchungsanfrage abgeschlossen
        </TabHeading>

        <BookingConfirmation listing={listing} />
      </div>

      {/*
        The request is sent, so the useful question is "what now": who the host
        is and what else they offer. The booking FAQ and the reviews would only
        repeat the two screens the visitor just came through.
      */}
      <DetailSections listing={listing} only={["host", "more"]} />
    </div>
  )
}
