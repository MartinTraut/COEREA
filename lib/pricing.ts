/**
 * Booking maths for the prototype.
 *
 * There is no backend and no payment provider, but the numbers on screen still
 * have to be right: the booking summary used to print a hard-coded "x 14 Tage"
 * under every area — including ones priced per month — and then show the bare
 * unit price as the total. Everything here is pure and derived from the listing
 * data so the widget, the summary and the confirmation can never disagree.
 */
import type { Listing } from "@/lib/listings"

/** Service fee CoArea charges on top of the host's price, as a fraction. */
export const SERVICE_FEE_RATE = 0.09
/** German standard VAT. */
export const VAT_RATE = 0.19

export type PriceUnit = "Stunde" | "Tag" | "Woche" | "Monat"

const PLURAL: Record<PriceUnit, string> = {
  Stunde: "Stunden",
  Tag: "Tage",
  Woche: "Wochen",
  Monat: "Monate",
}

/** How many days one billing unit covers — used to turn a range into units. */
const DAYS_PER_UNIT: Record<PriceUnit, number> = {
  Stunde: 1 / 24,
  Tag: 1,
  Woche: 7,
  Monat: 30,
}

export const isPriceUnit = (value: string): value is PriceUnit =>
  value === "Stunde" || value === "Tag" || value === "Woche" || value === "Monat"

/** "2,50 €" → 2.5 · "1600 €" → 1600. Returns null if there is no number in it. */
export function parseAmount(amount: string): number | null {
  const match = amount.replace(/\s/g, "").match(/-?[\d.]*,?\d+/)
  if (!match) return null
  const value = Number(match[0].replace(/\./g, "").replace(",", "."))
  return Number.isFinite(value) ? value : null
}

/** "01.01.2023" → Date. Returns null for anything that is not a clean d.m.y. */
export function parseGermanDate(value: string): Date | null {
  const m = value.trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
  if (!m) return null
  const [, d, mo, y] = m
  const date = new Date(Number(y), Number(mo) - 1, Number(d))
  return Number.isNaN(date.getTime()) ? null : date
}

/** ISO "2023-01-01" (what <input type="date"> gives us) → Date. */
export function parseIsoDate(value: string): Date | null {
  const m = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!m) return null
  const date = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
  return Number.isNaN(date.getTime()) ? null : date
}

export const toIso = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`

export const formatGermanDate = (date: Date) =>
  date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })

export const eur = (value: number) =>
  value.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

/**
 * Billing units covered by a date range, always at least one.
 *
 * A range is inclusive of both ends — 01.04. to 01.04. is one day, not zero.
 * Hourly areas are billed as a full day's worth of hours per day booked, which
 * is the only sane reading without a time picker.
 */
export function unitsBetween(from: Date, to: Date, unit: PriceUnit): number {
  /*
    Counted as calendar days, not as elapsed milliseconds.

    `parseIsoDate` builds local midnights, and the night the clocks go forward
    is 23 hours long — so `Math.floor(elapsed / 86_400_000)` dropped a day for
    every range spanning the last Sunday in March. 25.03. to 26.03. came out as
    one day instead of two and undercharged by a full unit, identically on the
    widget, the summary and the stored booking. Stripping the time of day and
    subtracting in UTC has no such night.
  */
  const day = (d: Date) => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
  const days = (day(to) - day(from)) / 86_400_000 + 1
  if (days <= 0) return 0
  if (unit === "Stunde") return days * 8
  return Math.max(1, Math.ceil(days / DAYS_PER_UNIT[unit]))
}

export type Quote = {
  unit: PriceUnit
  unitPrice: number
  units: number
  /** e.g. "14 Tage" — ready to print next to the line total. */
  unitsLabel: string
  net: number
  serviceFee: number
  vat: number
  total: number
}

/**
 * Full price breakdown, or null when the listing has no numeric price — those
 * areas are genuinely "auf Anfrage" and must not be given an invented total.
 */
export function quote(listing: Listing, units: number): Quote | null {
  const unitPrice = parseAmount(listing.price.amount)
  if (unitPrice === null || !isPriceUnit(listing.price.unit)) return null

  const count = Math.max(1, Math.round(units))
  const unit = listing.price.unit
  const net = unitPrice * count
  const serviceFee = net * SERVICE_FEE_RATE
  const vat = (net + serviceFee) * VAT_RATE

  return {
    unit,
    unitPrice,
    units: count,
    unitsLabel: `${count} ${count === 1 ? unit : PLURAL[unit]}`,
    net,
    serviceFee,
    vat,
    total: net + serviceFee + vat,
  }
}

/** The listing's own availability window, if it states a clean one. */
export function listingRange(listing: Listing): { from: Date; to: Date } | null {
  if (!listing.from || !listing.to) return null
  const from = parseGermanDate(listing.from)
  const to = parseGermanDate(listing.to)
  return from && to ? { from, to } : null
}

