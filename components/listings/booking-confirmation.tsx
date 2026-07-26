"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { MessageSquare } from "lucide-react"

import { SITE } from "@/lib/site"
import type { Listing } from "@/lib/listings"
import { BOOKING_KEY, type BookingRecord } from "@/components/listings/booking-form"

/**
 * The confirmation panel.
 *
 * It used to state flatly that the request had been sent to the host — on a
 * page reachable by URL, from a form that submitted nothing. It now reads back
 * the request the booking form recorded and reflects it; arriving without one
 * says so and points back into the flow instead of confirming a booking that
 * never happened.
 */
export function BookingConfirmation({ listing }: { listing: Listing }) {
  const [state, setState] = useState<{ record: BookingRecord | null } | null>(null)

  /*
    The read is deferred to its own task rather than run in the effect body: the
    server cannot know what is in sessionStorage, so the first paint has to be
    the neutral placeholder either way, and setting state synchronously here
    would cascade a second render inside the same commit.
  */
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        const raw = window.sessionStorage.getItem(BOOKING_KEY)
        const parsed = raw ? (JSON.parse(raw) as BookingRecord) : null
        setState({ record: parsed && parsed.slug === listing.slug ? parsed : null })
      } catch {
        setState({ record: null })
      }
    }, 0)
    return () => clearTimeout(id)
  }, [listing.slug])

  // First paint matches the server output; the panel resolves right after.
  if (state === null) {
    return <div className="mt-8 h-64 border border-border bg-card" aria-hidden />
  }

  if (!state.record) {
    return (
      <div className="mt-8 border border-border bg-card px-6 py-9 sm:px-10">
        <h2 className="text-2xl font-semibold text-teal">
          Hier liegt noch keine Anfrage vor
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink">
          Für „{listing.title}“ ist in dieser Sitzung keine Buchungsanfrage
          hinterlegt. Wähle einen Zeitraum aus und schließe die Anfrage ab —
          danach findest Du die Bestätigung hier.
        </p>
        <Link
          href={`/flaechen/${listing.slug}#verfuegbarkeit`}
          className="btn btn-teal sheen mt-6 min-h-11 px-6 text-sm"
        >
          Zur Verfügbarkeit
        </Link>
      </div>
    )
  }

  const { record } = state

  return (
    <div className="mt-8 border border-border bg-card px-6 py-9 sm:px-10">
      <h2 className="text-2xl font-semibold text-teal">
        Deine Buchungsanfrage ist abgeschlossen!
      </h2>
      <p className="mt-4 max-w-2xl leading-relaxed text-ink">
        Danke, {record.name.split(" ")[0]} — Deine Anfrage für „{record.title}“ ist
        vorbereitet. Sobald CoArea live ist, geht sie an {listing.host.name}, und
        die Bestätigung erreicht Dich unter {record.email}.
      </p>

      <dl className="mt-7 grid max-w-xl gap-3 border-t border-border pt-6">
        <Row label="Zeitraum" value={record.period} />
        <Row label="Anzahl der User" value={record.users} />
        <Row label="Art der Nutzung" value={record.usage} />
        <Row label="Gesamtbetrag" value={record.total} strong />
      </dl>

      <div className="mt-8 flex flex-wrap gap-4">
        {/*
          This built the recipient out of the host's name, inventing an address
          nobody owns — `roland.schick@coarea.de` — and for "Hans Schüller" it
          produced `hans.schüller@coarea.de`, which is not even a valid mailbox.
          Mail goes to the address that actually exists; the host and the area
          are named in the subject so support can route it.
        */}
        <a
          href={`mailto:${SITE.contact.email}?subject=${encodeURIComponent(
            `Frage zu „${record.title}" (Host: ${listing.host.name})`,
          )}`}
          className="btn btn-teal sheen min-h-11 px-5 text-sm"
        >
          <MessageSquare className="h-4 w-4" />
          Nachricht an Host
        </a>
        <Link
          href="/flaechen"
          className="btn btn-outline min-h-11 px-5 text-sm"
        >
          Weitere Flächen entdecken
        </Link>
      </div>

      <p className="mt-6 text-xs text-ink">
        Prototyp: Die Anfrage ist lokal in dieser Sitzung gespeichert und wurde
        noch nicht versendet.
      </p>
    </div>
  )
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[12rem_1fr] sm:gap-6">
      <dt className="text-sm text-ink">{label}</dt>
      <dd className={strong ? "text-sm font-bold text-ink" : "text-sm font-medium text-ink"}>
        {value}
      </dd>
    </div>
  )
}
