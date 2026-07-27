import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { LISTINGS, listingBySlug } from "@/lib/listings"
import { categoryBySlug, USAGE_OPTIONS } from "@/lib/categories"
import { listingRange, maxIso, parseIsoDate, toIso, todayIso } from "@/lib/pricing"
import { TabHeading } from "@/components/brand/tab-heading"
import { BookingForm } from "@/components/listings/booking-form"
import { DetailSections } from "@/components/listings/detail-sections"

export function generateStaticParams() {
  return LISTINGS.map((l) => ({ slug: l.slug }))
}

export const metadata: Metadata = {
  title: "Buchungsanfrage abschließen",
  robots: { index: false },
}

/**
 * The booking summary. Period, party size and intended use arrive as query
 * parameters from the availability widget on the detail page, so the numbers
 * shown here are the ones the visitor actually chose rather than a fixed
 * example — everything interactive lives in `BookingForm`.
 */
export default async function BuchenPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { slug } = await params
  const listing = listingBySlug(slug)
  if (!listing) notFound()

  const q = await searchParams
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)

  /*
    `users` and `nutzung` used to go straight from the URL into the visible
    booking summary and into the stored BookingRecord, so
    `?users=<anything>&nutzung=<anything>` displayed attacker-chosen text under
    the heading "Deine Buchung". They are validated against what they are
    allowed to be: a party size of 1–99, and one of the usage options the widget
    actually offers.
  */
  const usersRaw = Number.parseInt(one(q.users) ?? "", 10)
  const users = String(
    Number.isFinite(usersRaw) ? Math.min(99, Math.max(1, usersRaw)) : 2,
  )

  const usageRaw = one(q.nutzung)
  const usage =
    usageRaw && USAGE_OPTIONS.includes(usageRaw)
      ? usageRaw
      : (categoryBySlug(listing.category)?.usage ?? "auf Anfrage")

  /*
    The two dates were the only parameters left unchecked, and they are the ones
    that decide the amount. `?von=2020-01-01&bis=2030-01-01` on a 499 €/Monat
    area produced „121 Monate" and a total of 78.317,60 € under the heading
    „Deine Buchung", and that figure went into the stored booking record as
    well. Reversing them printed „31.12. bis 01.01.", switched the total to „auf
    Anfrage" without a word of explanation, and still allowed the request to be
    sent.

    Both are now parsed, ordered, and clamped to what the host actually offers:
    never before today, never outside the listing's window. A range that cannot
    be salvaged is dropped rather than repaired into something the visitor did
    not choose — `BookingForm` then says the period is missing instead of
    inventing one.
  */
  const range = listingRange(listing)
  const clamp = (value: string | undefined): string | undefined => {
    const date = value ? parseIsoDate(value) : null
    if (!date) return undefined
    let iso = maxIso(toIso(date), todayIso())
    if (range) {
      iso = maxIso(iso, toIso(range.from))
      if (iso > toIso(range.to)) return undefined
    }
    return iso
  }
  let von = clamp(one(q.von))
  let bis = clamp(one(q.bis))
  // Reversed on purpose or by accident: read it as the range they meant.
  if (von && bis && bis < von) [von, bis] = [bis, von]

  return (
    <div className="pb-6">
      <div className="container-page pt-8 md:pt-12">
        <TabHeading as="h1" className="text-[clamp(1.4rem,2.5vw+0.5rem,2.1rem)]">
          Buchungsanfrage abschließen
        </TabHeading>

        <BookingForm
          listing={listing}
          von={von}
          bis={bis}
          users={users}
          usage={usage}
        />
      </div>

      {/*
        Only the FAQ here: this screen exists to get the request sent, and the
        host band, the four other-area cards and the reviews all sat between the
        summary and that goal — while repeating what the visitor just scrolled
        past on the detail page. The booking questions are the one block that
        earns its place at the moment of committing.
      */}
      <DetailSections listing={listing} only={["faq"]} />
    </div>
  )
}
