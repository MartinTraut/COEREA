"use client"

import { useEffect, useId, useMemo, useState } from "react"
import { useRouter } from "next/navigation"

import type { Listing } from "@/lib/listings"
import { categoryBySlug, USAGE_OPTIONS } from "@/lib/categories"
import {
  eur,
  formatGermanDate,
  isPriceUnit,
  listingRange,
  maxIso,
  parseIsoDate,
  quote,
  toIso,
  todayIso,
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

/* ISO day → „01.02.2026". The picker speaks ISO, the visitor does not. */
const de = (iso: string | undefined) => {
  const date = iso ? parseIsoDate(iso) : null
  return date ? formatGermanDate(date) : ""
}

export function BookingWidget({ listing }: { listing: Listing }) {
  const router = useRouter()
  const fieldId = useId()
  const range = listingRange(listing)
  const unit = isPriceUnit(listing.price.unit) ? listing.price.unit : null

  /*
    Prefilled with the first day that is actually bookable, not with the first
    day of the host's window — that one can lie in the past.

    „Today" cannot be read while rendering. These pages are prerendered through
    `generateStaticParams`, so `todayIso()` in the render body is the BUILD date:
    it is baked into the delivered HTML as both the prefill and the `min`, and it
    stays there until the next deploy. Two consequences, both real — the client
    renders a different value than the server sent (hydration mismatch), and a
    visitor arriving weeks later is offered a floor that has long since passed,
    so the picker accepts a date in the past and the widget prices it.

    So the first render uses only listing data, which is build-stable, and the
    clock is read once on the client. `today` is empty until then.
  */
  const windowFrom = range ? toIso(range.from) : ""
  const [today, setToday] = useState("")
  useEffect(() => {
    setToday(todayIso())
  }, [])

  const start = today ? maxIso(windowFrom, today) : windowFrom
  const [from, setFrom] = useState(windowFrom)
  const [to, setTo] = useState(windowFrom)

  /* Once the real date is known, lift a prefill that the build left in the past. */
  useEffect(() => {
    if (!today) return
    const floor = maxIso(windowFrom, today)
    setFrom((f) => (f && f >= floor ? f : floor))
    setTo((t) => (t && t >= floor ? t : floor))
  }, [today, windowFrom])
  const [users, setUsers] = useState("2")
  const [usage, setUsage] = useState(
    categoryBySlug(listing.category)?.usage ?? USAGE_OPTIONS[0]!,
  )
  const [touched, setTouched] = useState(false)

  const fromDate = parseIsoDate(from)
  const toDate = parseIsoDate(to)
  const rangeInvalid = Boolean(fromDate && toDate && toDate < fromDate)

  /*
    The window starts at the later of „when the host opens the area" and
    „today". Without the second half, an area whose season began in February
    would offer February as a selectable start in July — a booking in the past,
    accepted by the picker and priced by the summary.
  */
  const min = start
  const max = range ? toIso(range.to) : undefined

  /*
    `min` and `max` are only hints to the date picker, and the form carries
    `noValidate`, so a typed date outside the window sailed through: the widget
    priced „15.01.2027" on an area open until 31.10., showed a total across
    several months, and the summary page — which does check — then answered „Für
    diese Anfrage fehlt der Zeitraum". The visitor saw a price, pressed on, and
    arrived at a page saying they had chosen nothing. The two screens have to
    agree on what a valid range is, so the check happens here too.

    An area whose season is over is a separate case: with `range.to` in the past
    the field gets `min` later than `max` and there is no date left to pick.
    Saying so is better than a picker that silently refuses every choice.
  */
  const seasonOver = Boolean(max && today && max < today)
  const outsideWindow = Boolean(
    !seasonOver && ((min && from < min) || (max && to > max)),
  )
  const blocked = rangeInvalid || outsideWindow || seasonOver

  /* No total for a range the form would refuse to send. Carrying a figure to a
     page that then denies the range exists is the confusion this whole check
     is here to end. */
  const current = useMemo(() => {
    if (!unit || !fromDate || !toDate || blocked) return null
    return quote(listing, unitsBetween(fromDate, toDate, unit))
  }, [listing, unit, fromDate, toDate, blocked])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (!fromDate || !toDate || blocked) return
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

          {/*
            The `aria-label` that used to sit on these two fields said something
            different from the question printed beside them — „Anzahl der User"
            against „Für wie viele Personen?". A control whose spoken name does
            not contain its visible label breaks voice control: the user says
            what he reads, and nothing happens (WCAG 2.5.3). The visible
            question is the label now, tied by id.
          */}
          <Row label="Für wie viele Personen?" htmlFor={`${fieldId}-users`}>
            <input
              id={`${fieldId}-users`}
              type="number"
              min={1}
              max={99}
              value={users}
              onChange={(e) => setUsers(e.target.value)}
              className={fieldCls}
            />
          </Row>

          <Row label="Wofür benötigst Du diese Fläche?" htmlFor={`${fieldId}-usage`}>
            <select
              id={`${fieldId}-usage`}
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
              className={fieldCls}
            >
              {USAGE_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Row>

          {/* The season being over is not the visitor's mistake, so it is stated
              whether or not they have tried to submit. */}
          {seasonOver ? (
            <p role="status" className="field-error text-sm">
              Diese Fläche ist für die aktuelle Saison nicht mehr buchbar.
            </p>
          ) : touched && (!fromDate || !toDate || blocked) ? (
            <p role="alert" className="field-error text-sm">
              {rangeInvalid
                ? "Das Enddatum liegt vor dem Startdatum."
                : outsideWindow
                  ? `Bitte wähle einen Zeitraum zwischen ${de(min)} und ${de(max)}.`
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
              <p className="price-lead mt-1 text-ink-900">
                {current ? eur(current.total) : "auf Anfrage"}
              </p>
              {current ? (
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {/* `{value} · text` drops the space in front of the middle
                      dot: React emits a comment node between the expression and
                      the literal, and the leading whitespace of the literal goes
                      with it. It rendered as „1 Tag· inkl.". */}
                  {current.unitsLabel}
                  {" · "}
                  Endpreis, keine weiteren Kosten
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

function Row({
  label,
  htmlFor,
  children,
}: {
  label: string
  /** When the row holds a single control, the question becomes its label. */
  htmlFor?: string
  children: React.ReactNode
}) {
  const Tag = htmlFor ? "label" : "span"
  return (
    <div className="grid gap-2 sm:grid-cols-[1fr_20rem] sm:items-center">
      <Tag htmlFor={htmlFor} className="text-sm font-medium text-ink-900">
        {label}
      </Tag>
      {children}
    </div>
  )
}
