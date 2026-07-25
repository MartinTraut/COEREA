import Link from "next/link"
import { ChevronDown } from "lucide-react"

import type { Listing } from "@/lib/listings"
import { categoryBySlug } from "@/lib/categories"
import { TabHeading } from "@/components/brand/tab-heading"

/*
  „Verfügbarkeit" — the flat availability form from the Figma detail screen.
  Label on the left, field on the right; the „Verfügbarkeit prüfen" action
  carries the user to the booking-request summary. Sharp, calm, no card shadow.
*/
export function BookingWidget({ listing }: { listing: Listing }) {
  const period = listing.from ? `${listing.from} bis ${listing.to}` : "Zeitraum wählen"
  const usage = categoryBySlug(listing.category)?.usage ?? "Nutzung wählen"

  return (
    <section id="verfuegbarkeit" className="container-page mt-14">
      <TabHeading className="text-[clamp(1.25rem,2vw+0.5rem,1.75rem)]">
        Verfügbarkeit
      </TabHeading>

      <div className="mt-6 border border-border bg-card px-6 py-7 sm:px-8">
        <div className="grid gap-6">
          <Row label="In welchem Zeitraum möchtest Du buchen?">
            <SelectField defaultText={period} />
          </Row>

          <Row label="Für wieviele User?">
            <input
              type="text"
              inputMode="numeric"
              placeholder="Anzahl der User angeben"
              className="w-full border border-border bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-teal"
            />
          </Row>

          <Row label="Für was benötigst Du diese Fläche?">
            <SelectField defaultText={usage} />
          </Row>

          {/* total + submit */}
          <div className="mt-2 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-10">
              <span className="text-sm text-ink/70">Gesamtbetrag</span>
              <span className="text-base font-semibold text-ink">
                {listing.price.amount}
              </span>
            </div>
            <Link
              href={`/flaechen/${listing.slug}/buchen`}
              className="inline-flex items-center justify-center border-2 border-teal px-6 py-2.5 text-sm font-semibold text-teal transition-colors hover:bg-teal hover:text-white"
            >
              Verfügbarkeit prüfen
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[1fr_20rem] sm:items-center">
      <span className="text-sm text-ink">{label}</span>
      {children}
    </div>
  )
}

function SelectField({ defaultText }: { defaultText: string }) {
  return (
    <span
      title="Auswahl folgt in Kürze"
      aria-disabled
      className="flex w-full cursor-not-allowed items-center justify-between border border-border bg-white px-3.5 py-2.5 text-sm text-ink/70"
    >
      {defaultText}
      <ChevronDown className="h-4 w-4 text-ink/40" />
    </span>
  )
}
