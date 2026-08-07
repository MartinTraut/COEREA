"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

import type { Listing } from "@/lib/listings"
import { formatUnitPrice } from "@/lib/pricing"

/**
 * The booking action, kept within reach on a phone.
 *
 * The detail page is some seven screens tall at 390px: gallery, facts, the
 * availability widget, the host, four other areas, two reviews, the FAQ. Once
 * the widget has scrolled past — which is most of the page — there was no way
 * to act on the area being read about except to scroll back and find it again.
 * The price went with it, so the number and the button were both gone at exactly
 * the point where somebody has read enough to decide.
 *
 * Phones only: from `lg` up the facts panel is a sticky column that already
 * keeps both on screen.
 */
export function MobileBookingBar({ listing }: { listing: Listing }) {
  /*
    Two conditions, and the bar needs both.

    `scrolled` keeps it out of the way of the gallery and the headline — landing
    on the page with a fixed bar already covering the bottom eighth reads as an
    ad, not as an aid. `atWidget` hides it again while the availability widget is
    actually on screen, where it would sit directly over the fields it points at.
  */
  const [scrolled, setScrolled] = useState(false)
  const [atWidget, setAtWidget] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 420)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    const target = document.getElementById("verfuegbarkeit")
    const io = target
      ? new IntersectionObserver(([e]) => setAtWidget(e.isIntersecting), {
          /* Ignore a sliver: the widget counting as "on screen" while one pixel
             of its top edge shows would blink the bar on and off mid-scroll. */
          threshold: 0.15,
        })
      : null
    if (target && io) io.observe(target)

    return () => {
      window.removeEventListener("scroll", onScroll)
      io?.disconnect()
    }
  }, [])

  const show = scrolled && !atWidget

  return (
    <>
      {/* Keeps the footer clear of the bar once the page is scrolled to its end. */}
      <div aria-hidden className="h-[4.5rem] lg:hidden" />

      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white/95 backdrop-blur-sm transition-[transform,opacity] duration-300 ease-out lg:hidden ${
          show
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0"
        }`}
        /* Home-indicator gap on iPhones; zero everywhere else. */
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="container-page flex items-center justify-between gap-4 py-3">
          <span className="min-w-0">
            <span className="price block truncate text-ink-900">
              {formatUnitPrice(listing)}
            </span>
            <span className="mt-0.5 block truncate text-[0.6875rem] text-muted-foreground">
              pro {listing.price.unit} · Endpreis
            </span>
          </span>
          {/*
            An anchor, not a scroll handler: it works before the JavaScript has
            run, it respects the visitor's reduced-motion setting through the
            document's own scroll-behaviour, and it moves the keyboard focus to
            the widget rather than only the viewport.
          */}
          <a
            href="#verfuegbarkeit"
            className="btn btn-teal group h-12 shrink-0 px-5 text-sm"
          >
            Verfügbarkeit
            <span className="arrow-nudge inline-flex">
              <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </>
  )
}
