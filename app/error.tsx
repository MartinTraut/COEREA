"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, RotateCcw } from "lucide-react"

import { TabHeading } from "@/components/brand/tab-heading"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

/*
  The error boundary the app did not have.

  `not-found.tsx` is carefully designed and picks the visitor back up; a thrown
  exception, meanwhile, landed on Next's default error page — white, unstyled,
  no header, no footer, no way back into the listings. Every failure that is not
  a 404 was the worst-looking screen on the site.

  Same shape as the 404: name what happened in one line, offer the one action
  that usually fixes it, and hand over the two routes people came for. `reset`
  re-renders the failed segment without a full reload, so a transient failure
  costs nothing.
*/
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // No error service is wired up yet; the console is what we have.
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container-page py-16 md:py-24">
          <span className="eyebrow">Da ist etwas schiefgelaufen</span>
          <TabHeading as="h1" className="mt-5 text-[clamp(1.6rem,3vw+0.5rem,2.5rem)]">
            Diese Seite konnte nicht geladen werden
          </TabHeading>
          <p className="mt-6 max-w-xl text-[clamp(1rem,0.5vw+0.85rem,1.125rem)]/[1.65] text-ink">
            Der Fehler liegt bei uns, nicht bei Dir. Versuch es noch einmal;
            bleibt es dabei, schreib uns kurz, was Du vorhattest.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="btn btn-teal min-h-12 px-7 text-[0.9375rem]"
            >
              <RotateCcw className="h-4 w-4" /> nochmal versuchen
            </button>
            <Link
              href="/flaechen"
              className="btn btn-outline group min-h-12 px-7 text-[0.9375rem]"
            >
              Flächen entdecken
              <span className="arrow-nudge inline-flex">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <Link
              href="/kontakt"
              className="btn min-h-12 px-7 text-[0.9375rem] text-teal hover:underline"
            >
              Problem melden
            </Link>
          </div>

          {/* The digest is the only handle we would have if somebody reports
              this, so it is shown rather than swallowed.

              It was set in `.caps-xs` — 9px, uppercase, wide-tracked. That class
              is for decorative micro-labels, and this is the opposite: a code
              the reader has to transcribe into a mail or read out on a call. It
              now sits at 13px in normal case, with the code itself in tabular
              figures so no two characters collapse into each other. */}
          {error.digest ? (
            <p className="mt-10 text-[0.8125rem] text-ink">
              Fehlerkennung:{" "}
              <span className="font-semibold tabular-nums">{error.digest}</span>
            </p>
          ) : null}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
