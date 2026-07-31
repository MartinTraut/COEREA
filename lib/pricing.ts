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

/**
 * How long a booked day is for an area priced by the hour.
 *
 * There is no time picker, so a day booked on an hourly area has to stand for
 * some number of hours. This was written down three times and disagreed with
 * itself: `DAYS_PER_UNIT.Stunde = 1/24` said a day is 24 hours, `unitsBetween`
 * multiplied by 8, and `discover.tsx` divided by 8 again in its own copy. Two
 * of the three numbers were wrong, and the table entry was dead code that only
 * looked authoritative. One constant, exported, used everywhere.
 */
export const HOURS_PER_BOOKING_DAY = 8

/**
 * A day rate for an area priced in another unit, so that areas priced per hour,
 * day, week and month can be sorted against each other.
 */
export function pricePerDay(amount: string, unit: string): number {
  const value = parseAmount(amount)
  if (value === null) return Number.POSITIVE_INFINITY
  const days =
    unit === "Stunde" ? 1 / HOURS_PER_BOOKING_DAY : unit === "Woche" ? 7 : unit === "Monat" ? 30 : 1
  return value / days
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

/** Today as an ISO day — the floor for every date field on the site. */
export const todayIso = () => toIso(new Date())

/** The later of two ISO days; both are `yyyy-mm-dd`, so a string compare does. */
export const maxIso = (a: string, b: string) => (a > b ? a : b)

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

  if (unit === "Stunde") return days * HOURS_PER_BOOKING_DAY
  if (unit === "Tag") return days

  /*
    Weeks and months are counted as calendar spans, not as `days / 30`.

    `Math.ceil(days / 30)` charged a full calendar month as two: March has 31
    days, so 01.03. to 31.03. came out as 2 — „499 € × 2 Monate", 1.294,51 €
    for a month that costs 647,25 €. A whole year came out as 13 months. It is
    the most common booking there is, and it was the one the maths got worst.

    Months are the difference in months plus one, minus one if the end day of
    the month has not been reached — so 01.03.–31.03. is one, 01.03.–01.04. is
    two. Weeks count started weeks: seven days is one week, eight days is two.
  */
  if (unit === "Monat") {
    const months =
      (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth())
    return Math.max(1, months + (to.getDate() >= from.getDate() ? 1 : 0))
  }
  // Started weeks: seven days is one, eight is two.
  return Math.max(1, Math.ceil(days / 7))
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

  /*
    Rounded to whole cents HERE, not on the way to the screen.

    The three lines and the total used to be carried at full float precision and
    rounded individually by `eur()` at the moment of printing. So the summary
    showed three rounded figures and a total that was the sum of the UNROUNDED
    ones, and in 110 of 10.000 price/duration combinations across the site's own
    data the column did not add up: „3.050,00 + 274,50 + 631,66" printed under a
    total of „3.956,15", one cent short of its own sum. A visitor who checks the
    arithmetic on an invoice-looking block finds an error, and there is no
    explaining it away as a display artefact — a money figure that cannot be
    reproduced from the figures above it is simply wrong.

    Cents are the unit money actually comes in, so each line is rounded to a cent
    and the total is the sum of the lines. That the fee and the tax are each
    rounded before the tax is applied to the fee is the standard German
    treatment: VAT is charged on the invoiced net plus the invoiced fee, not on
    unrounded intermediates.
  */
  const cents = (value: number) => Math.round(value * 100) / 100

  const net = cents(unitPrice * count)
  const serviceFee = cents(net * SERVICE_FEE_RATE)
  const vat = cents((net + serviceFee) * VAT_RATE)

  return {
    unit,
    unitPrice,
    units: count,
    unitsLabel: `${count} ${count === 1 ? unit : PLURAL[unit]}`,
    net,
    serviceFee,
    vat,
    total: cents(net + serviceFee + vat),
  }
}

/** The listing's own availability window, if it states a clean one. */
export function listingRange(listing: Listing): { from: Date; to: Date } | null {
  if (!listing.from || !listing.to) return null
  const from = parseGermanDate(listing.from)
  const to = parseGermanDate(listing.to)
  return from && to ? { from, to } : null
}

