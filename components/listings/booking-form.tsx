"use client"

import Link from "next/link"
import { useId, useMemo, useState } from "react"
import { useRouter } from "next/navigation"

import type { Listing } from "@/lib/listings"
import {
  eur,
  formatGermanDate,
  isPriceUnit,
  parseAmount,
  parseIsoDate,
  quote,
  SERVICE_FEE_RATE,
  unitsBetween,
  VAT_RATE,
} from "@/lib/pricing"

/**
 * The booking summary and the request itself.
 *
 * Previously the "send" action was a plain link to the confirmation page: the
 * two starred fields had no `name`, no `required` and no handler, so anyone
 * could land on "your request has been sent" without typing anything — and the
 * page opposite claimed a message had gone out to the host. Now the fields are
 * validated, and the confirmation is only reachable with a request in hand.
 *
 * There is no backend yet, so the request is recorded in sessionStorage and the
 * confirmation reads it back. That is honest for a prototype: nothing claims to
 * have been transmitted, but the whole flow can be clicked through.
 */
export const BOOKING_KEY = "coarea:booking"

export type BookingRecord = {
  slug: string
  title: string
  name: string
  email: string
  period: string
  users: string
  usage: string
  total: string
}

export function BookingForm({
  listing,
  von,
  bis,
  users,
  usage,
}: {
  listing: Listing
  von?: string
  bis?: string
  users: string
  usage: string
}) {
  const router = useRouter()
  const nameId = useId()
  const mailId = useId()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [touched, setTouched] = useState(false)

  const fromDate = von ? parseIsoDate(von) : null
  const toDate = bis ? parseIsoDate(bis) : null
  const unit = isPriceUnit(listing.price.unit) ? listing.price.unit : null

  /* „auf Anfrage" is a property of the LISTING, not of what the visitor has
     filled in — see the note at the price block below. */
  const priceOnRequest = !unit || parseAmount(listing.price.amount) === null

  const current = useMemo(() => {
    if (!unit || !fromDate || !toDate || toDate < fromDate) return null
    return quote(listing, unitsBetween(fromDate, toDate, unit))
  }, [listing, unit, fromDate, toDate])

  /*
    No invented period.

    The fallback used to print the listing's whole availability window — „Deine
    Buchung: 01.01. bis 31.12." — for anyone who opened this URL without the
    parameters: from a shared link, from the browser history, or after the
    dates were dropped as unusable. A whole year nobody had chosen, shown as a
    booking and written into the stored record. When there is no period, the
    summary says so and the request cannot be sent.
  */
  const hasPeriod = Boolean(fromDate && toDate)
  const period = hasPeriod
    ? `${formatGermanDate(fromDate!)} bis ${formatGermanDate(toDate!)}`
    : "noch nicht gewählt"

  const nameError = touched && name.trim().length < 2
  const emailError = touched && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (!hasPeriod) return
    if (name.trim().length < 2) return
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return

    const record: BookingRecord = {
      slug: listing.slug,
      title: listing.title,
      name: name.trim(),
      email: email.trim(),
      period,
      users,
      usage,
      total: current ? eur(current.total) : "auf Anfrage",
    }
    try {
      window.sessionStorage.setItem(BOOKING_KEY, JSON.stringify(record))
    } catch {
      // Storage blocked — the confirmation falls back to its generic state.
    }
    router.push(`/flaechen/${listing.slug}/erfolgreich`)
  }

  /*
    „Gebuchte CoArea" and „Gebuchter Zeitraum" said the booking had happened,
    on the screen whose own copy promises that a request is free and binds
    nobody. And only the intended use could be corrected here, while the period
    and the party size — the two a visitor actually wants to change at this
    point — had no way back.
  */
  const summary = [
    { label: "Fläche", value: listing.title },
    { label: "Gewählter Zeitraum", value: period, change: true },
    { label: "Personen", value: users, change: true },
    { label: "Art der Flächennutzung", value: usage, change: true },
  ]

  return (
    <form onSubmit={submit} noValidate>
      {/* login / register */}
      <div className="mt-8 border border-border bg-card px-6 py-7 sm:px-8">
        <p className="text-sm text-ink">
          <Link href="/anmelden" className="font-semibold text-teal hover:underline">
            Melde Dich an
          </Link>
          , um mit Deinen gespeicherten Daten zu buchen, oder{" "}
          <Link href="/anmelden" className="font-semibold text-teal hover:underline">
            registriere Dich
          </Link>
          , um Teil der CoArea-Community zu werden!
        </p>

        <div className="mt-6 grid max-w-xl gap-4">
          <Field
            id={nameId}
            label="Vor- & Nachname*"
            error={nameError ? "Bitte gib Deinen Vor- und Nachnamen an." : undefined}
          >
            <input
              id={nameId}
              name="name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={nameError || undefined}
              aria-describedby={nameError ? `${nameId}-err` : undefined}
              className={inputCls(nameError)}
            />
          </Field>

          <Field
            id={mailId}
            label="E-Mail-Adresse*"
            error={emailError ? "Bitte gib eine gültige E-Mail-Adresse an." : undefined}
          >
            <input
              id={mailId}
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={emailError || undefined}
              aria-describedby={emailError ? `${mailId}-err` : undefined}
              className={inputCls(emailError)}
            />
          </Field>
        </div>
      </div>

      {/* summary */}
      <div className="mt-8 border border-border bg-card px-6 py-8 sm:px-10">
        <h2 className="text-xl font-semibold text-teal">Zusammenfassung</h2>

        <dl className="mt-6 grid gap-4">
          {summary.map((row) => (
            <div key={row.label} className="grid gap-1 sm:grid-cols-[16rem_1fr] sm:gap-6">
              <dt className="text-sm text-ink">{row.label}</dt>
              <dd className="text-sm font-medium text-ink">
                {row.value}
                {row.change ? (
                  <>
                    <br />
                    <Link
                      href={`/flaechen/${listing.slug}#verfuegbarkeit`}
                      className="text-xs text-ink underline underline-offset-2 hover:text-teal"
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
          {current ? (
            <>
              <PriceRow
                label={`${eur(current.unitPrice)} × ${current.unitsLabel}`}
                value={eur(current.net)}
              />
              <PriceRow
                label={`Servicegebühr (${Math.round(SERVICE_FEE_RATE * 100)} %)`}
                value={eur(current.serviceFee)}
              />
              <PriceRow
                label={`Umsatzsteuer (${Math.round(VAT_RATE * 100)} %)`}
                value={eur(current.vat)}
              />
            </>
          ) : (
            /*
              Two different reasons landed on one sentence, and for one of them
              it was false. `current` is null both when the area has no numeric
              price AND when no period was carried over — so a 499 €/Monat area
              opened without query parameters announced „Für diese Fläche wird
              der Preis individuell abgestimmt", which contradicts its own
              listing. Only the first case is a price statement; the second is a
              missing input, and the alert below already says so.
            */
            <p className="text-sm text-ink">
              {priceOnRequest ? (
                "Für diese Fläche wird der Preis individuell abgestimmt. Den Betrag stimmst Du direkt mit dem Host ab."
              ) : (
                <>
                  Sobald ein Zeitraum feststeht, rechnen wir den Betrag hier aus.{" "}
                  <Link
                    href={`/flaechen/${listing.slug}#verfuegbarkeit`}
                    className="text-teal underline underline-offset-2"
                  >
                    Zeitraum wählen
                  </Link>
                  .
                </>
              )}
            </p>
          )}
        </div>

        {!hasPeriod ? (
          <p role="alert" className="field-error mt-6 text-sm">
            Für diese Anfrage fehlt der Zeitraum.{" "}
            <Link
              href={`/flaechen/${listing.slug}#verfuegbarkeit`}
              className="underline underline-offset-2"
            >
              Wähle ihn auf der Fläche aus
            </Link>
            , dann kannst Du die Anfrage absenden.
          </p>
        ) : null}

        <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="grid gap-1 sm:grid-cols-[16rem_auto] sm:items-center sm:gap-6">
            <span className="text-sm text-ink">Gesamtbetrag</span>
            {/* Was `text-lg` — a fixed 18px, the smallest price on the entire
                site, on the one screen whose whole purpose is to produce this
                number. Every card in the grid quoted a larger figure than the
                total the visitor was about to commit to. */}
            <span className="price-lead text-ink">
              {current ? eur(current.total) : "auf Anfrage"}
            </span>
          </div>
          {/*
            The one action this whole screen exists for was set as the
            secondary button, while „Melde Dich an" and „registriere Dich" sat
            above it in full teal — the most prominent thing on the page led
            away from the goal.
          */}
          <button
            type="submit"
            className="btn btn-teal sheen min-h-12 px-7 text-sm"
          >
            Buchungsanfrage senden
          </button>
        </div>

        <p className="mt-4 text-xs text-ink">
          Prototyp: Deine Anfrage wird noch nicht an den Host übermittelt. Der
          Bezahlvorgang erfolgt später nach dessen Bestätigung.
        </p>
      </div>
    </form>
  )
}

const inputCls = (invalid: boolean) =>
  [
    "w-full border bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors",
    "focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/30",
    invalid ? "border-teal" : "border-border",
  ].join(" ")

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-1.5 sm:grid-cols-[12rem_1fr] sm:items-start sm:gap-4">
      <label htmlFor={id} className="text-sm text-ink sm:pt-2.5">
        {label}
      </label>
      <div className="grid gap-1">
        {children}
        {error ? (
          <p id={`${id}-err`} role="alert" className="field-error text-xs">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  )
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[16rem_1fr] sm:gap-6">
      <span className="text-sm text-ink">{label}</span>
      <span className="text-sm font-medium text-ink">{value}</span>
    </div>
  )
}
