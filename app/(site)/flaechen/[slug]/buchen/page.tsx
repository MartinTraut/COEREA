import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { LISTINGS, listingBySlug } from "@/lib/listings"
import { categoryBySlug } from "@/lib/categories"
import { TabHeading } from "@/components/brand/tab-heading"
import { DetailSections } from "@/components/listings/detail-sections"

export function generateStaticParams() {
  return LISTINGS.map((l) => ({ slug: l.slug }))
}

export const metadata: Metadata = {
  title: "Buchungsanfrage abschließen",
  robots: { index: false },
}

export default async function BuchenPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const listing = listingBySlug(slug)
  if (!listing) notFound()

  const period = listing.from ? `${listing.from} bis ${listing.to}` : listing.dateText ?? "auf Anfrage"

  const summary = [
    { label: "Gebuchte CoArea", value: listing.title },
    { label: "Gebuchter Zeitraum", value: period },
    { label: "Anzahl der User", value: "2" },
    {
      label: "Art der Flächennutzung",
      value: categoryBySlug(listing.category)?.usage ?? "auf Anfrage",
      change: true,
    },
  ]

  return (
    <div className="pb-6">
      <div className="container-page pt-8 md:pt-12">
        <TabHeading as="h1" className="text-[clamp(1.4rem,2.5vw+0.5rem,2.1rem)]">
          Buchungsanfrage abschließen
        </TabHeading>

        {/* login / register */}
        <div className="mt-8 border border-border bg-card px-6 py-7 sm:px-8">
          <p className="text-sm text-ink/80">
            <Link href="/anmelden" className="font-semibold text-teal hover:underline">
              Melde Dich an
            </Link>
            , um mit Deinen gespeicherten Daten zu buchen, oder{" "}
            <Link href="/anmelden" className="font-semibold text-teal hover:underline">
              registriere Dich
            </Link>
            , um Teil der CoArea Community zu werden!
          </p>

          <div className="mt-6 grid max-w-xl gap-4">
            <label className="grid gap-1.5 sm:grid-cols-[12rem_1fr] sm:items-center sm:gap-4">
              <span className="text-sm text-ink">Vor- &amp; Nachname*</span>
              <input
                type="text"
                className="border border-border bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/40"
              />
            </label>
            <label className="grid gap-1.5 sm:grid-cols-[12rem_1fr] sm:items-center sm:gap-4">
              <span className="text-sm text-ink">E-Mail Adresse*</span>
              <input
                type="email"
                className="border border-border bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/40"
              />
            </label>
          </div>
        </div>

        {/* summary */}
        <div className="mt-8 border border-border bg-card px-6 py-8 sm:px-10">
          <h2 className="text-xl font-semibold text-teal">Zusammenfassung</h2>

          <dl className="mt-6 grid gap-4">
            {summary.map((row) => (
              <div key={row.label} className="grid gap-1 sm:grid-cols-[16rem_1fr] sm:gap-6">
                <dt className="text-sm text-ink/70">{row.label}</dt>
                <dd className="text-sm font-medium text-ink">
                  {row.value}
                  {row.change ? (
                    <>
                      <br />
                      <Link
                        href={`/flaechen/${listing.slug}`}
                        className="text-xs text-ink/60 underline underline-offset-2 hover:text-teal"
                      >
                        ändern
                      </Link>
                    </>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 grid gap-3 border-t border-border pt-6">
            <PriceRow label="x 14 Tage" value={listing.price.amount} />
            <PriceRow label="Servicegebühr" value="00,00 €" />
            <PriceRow label="Umsatzsteuer" value="19 %" />
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="grid gap-1 sm:grid-cols-[16rem_auto] sm:items-center sm:gap-6">
              <span className="text-sm text-ink/70">Gesamtbetrag</span>
              <span className="text-base font-bold text-ink">{listing.price.amount}</span>
            </div>
            <Link
              href={`/flaechen/${listing.slug}/erfolgreich`}
              className="inline-flex items-center justify-center border-2 border-teal px-6 py-2.5 text-sm font-semibold text-teal transition-colors hover:bg-teal hover:text-white"
            >
              Buchungsanfrage senden
            </Link>
          </div>

          <p className="mt-4 text-xs text-ink/60">
            Der Bezahlvorgang erfolgt nach der Buchungsbestätigung des Hosts.
          </p>
        </div>
      </div>

      <DetailSections listing={listing} />
    </div>
  )
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[16rem_1fr] sm:gap-6">
      <span className="text-sm text-ink underline underline-offset-2">{label}</span>
      <span className="text-sm font-medium text-ink">{value}</span>
    </div>
  )
}
