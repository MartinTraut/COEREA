"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"

import type { Listing } from "@/lib/listings"
import { categoryBySlug, USAGE_OPTIONS } from "@/lib/categories"
import {
  eur,
  isPriceUnit,
  listingRange,
  parseIsoDate,
  quote,
  toIso,
  unitsBetween,
} from "@/lib/pricing"

/*
  „Verfügbarkeit" — the availability form on the detail screen.

  This was a static picture: two disabled pseudo-selects, an input nobody read,
  and a "total" that was simply the unit price. It now works end to end without
  a backend — pick a range, pick a use, see the real total, and carry all of it
  into the booking summary as query parameters.
*/
const fieldCls =
  "w-full border border-input bg-white px-3.5 py-3 text-sm text-ink-900 outline-none transition-colors hover:border-teal/50 focus-visible:border-teal focus-visible:outline-none"

export function BookingWidget({ listing }: { listing: Listing }) {
  const router = useRouter()
  const range = listingRange(listing)
  const unit = isPriceUnit(listing.price.unit) ? listing.price.unit : null

  const [from, setFrom] = useState(range ? toIso(range.from) : "")
  const [to, setTo] = useState(range ? toIso(range.from) : "")
  const [users, setUsers] = useState("2")
  const [usage, setUsage] = useState(
    categoryBySlug(listing.category)?.usage ?? USAGE_OPTIONS[0]!,
  )
  const [touched, setTouched] = useState(false)

  const fromDate = parseIsoDate(from)
  const toDate = parseIsoDate(to)
  const rangeInvalid = Boolean(fromDate && toDate && toDate < fromDate)

  const current = useMemo(() => {
    if (!unit || !fromDate || !toDate || rangeInvalid) return null
    return quote(listing, unitsBetween(fromDate, toDate, unit))
  }, [listing, unit, fromDate, toDate, rangeInvalid])

  const min = range ? toIso(range.from) : undefined
  const max = range ? toIso(range.to) : undefined

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (!fromDate || !toDate || rangeInvalid) return
    const params = new URLSearchParams({ von: from, bis: to, users, nutzung: usage })
    router.push(`/flaechen/${listing.slug}/buchen?${params}`)
  }

  return (
    <section
      id="verfuegbarkeit"
      className="container-page mt-[clamp(2.5rem,4vw,4.5rem)] scroll-mt-28"
    >
      <span className="eyebrow">Buchung anfragen</span>
      <h2 className="h-plain mt-4">Verfügbarkeit</h2>

      <form
        onSubmit={submit}
        noValidate
        className="surface mt-7 px-6 py-7 shadow-[var(--shadow-md)] sm:px-8"
      >
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] [background:var(--grad-teal-bright)]"
        />
        <div className="grid gap-6">
          <Row label="In welchem Zeitraum möchtest Du buchen?">
            <div className="grid grid-cols-2 gap-3">
              <label className="grid gap-1">
                <span className="text-xs text-ink">von</span>
                <input
                  type="date"
                  value={from}
                  min={min}
                  max={max}
                  onChange={(e) => {
                    setFrom(e.target.value)
                    // Keep the end from lagging behind a newly picked start.
                    if (to && e.target.value > to) setTo(e.target.value)
                  }}
                  className={fieldCls}
                />
              </label>
              <label className="grid gap-1">
                <span className="text-xs text-ink">bis</span>
                <input
                  type="date"
                  value={to}
                  min={from || min}
                  max={max}
                  onChange={(e) => setTo(e.target.value)}
                  className={fieldCls}
                />
              </label>
            </div>
          </Row>

          <Row label="Für wie viele Personen?">
            <input
              type="number"
              min={1}
              max={99}
              value={users}
              onChange={(e) => setUsers(e.target.value)}
              className={fieldCls}
              aria-label="Anzahl der User"
            />
          </Row>

          <Row label="Wofür benötigst Du diese Fläche?">
            <select
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
              className={fieldCls}
              aria-label="Art der Flächennutzung"
            >
              {USAGE_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Row>

          {touched && (!fromDate || !toDate || rangeInvalid) ? (
            <p role="alert" className="field-error text-sm">
              {rangeInvalid
                ? "Das Enddatum liegt vor dem Startdatum."
                : "Bitte wähle einen Zeitraum aus."}
            </p>
          ) : null}

          {/*
            The total is the outcome of the whole form, so it gets its own
            surface at the foot of the card rather than sitting as one more line
            of body copy.
          */}
          <div className="-mx-6 -mb-7 mt-2 flex flex-col gap-4 bg-cream px-6 py-6 sm:-mx-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                Gesamtbetrag
              </span>
              <p className="mt-1 text-[clamp(1.375rem,1vw+0.9rem,1.875rem)] leading-none font-bold text-ink-900">
                {current ? eur(current.total) : "auf Anfrage"}
              </p>
              {current ? (
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {current.unitsLabel} · inkl. Servicegebühr &amp; MwSt.
                </p>
              ) : null}
            </div>
            {/*
              The button said „Verfügbarkeit prüfen" and checked nothing: it
              navigates straight to /buchen, whose heading is „Buchungsanfrage
              abschließen". Somebody who thinks he is looking something up ends
              up one step from sending a request. It now says where it goes.
            */}
            <button type="submit" className="btn btn-teal sheen min-h-12 px-7 text-sm">
              weiter zur Anfrage
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[1fr_20rem] sm:items-center">
      <span className="text-sm font-medium text-ink-900">{label}</span>
      {children}
    </div>
  )
}
