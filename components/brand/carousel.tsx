"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * A horizontally scrollable row with working arrows.
 *
 * The dashboard and detail screens drew these arrows next to plain grids, so
 * they were focusable controls that scrolled nothing. This is a real scroll-snap
 * track: the arrows page by one visible width, they disable at the ends, and
 * the whole row stays swipeable and keyboard-scrollable on its own. When the
 * content already fits, the arrows take themselves out rather than sitting
 * there permanently disabled.
 */
export function Carousel({
  header,
  action,
  children,
  className,
  itemClassName,
  trackClassName,
  label,
}: {
  /** Heading block rendered to the left of the arrows. */
  header?: React.ReactNode
  /**
   * The section's own control, rendered in the right-hand cluster next to the
   * arrows. It used to be passed inside `header`, which left it pinned to the
   * heading on the far left with the arrows floating alone on the far right —
   * two control groups on one row with the whole width torn open between them.
   * Everything that acts on this section now sits together.
   */
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
  /** Applied to each child wrapper — set the card width per breakpoint here. */
  itemClassName?: string
  /** Overrides on the scroll track itself, e.g. the gap above it. */
  trackClassName?: string
  /** Names the scrollable region for assistive tech. */
  label?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState({ overflows: false, atStart: true, atEnd: false })

  const measure = useCallback(() => {
    const el = ref.current
    if (!el) return
    const overflows = el.scrollWidth - el.clientWidth > 4
    setState({
      overflows,
      atStart: el.scrollLeft <= 4,
      atEnd: el.scrollLeft >= el.scrollWidth - el.clientWidth - 4,
    })
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    measure()
    el.addEventListener("scroll", measure, { passive: true })
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => {
      el.removeEventListener("scroll", measure)
      ro.disconnect()
    }
  }, [measure])

  const page = (dir: 1 | -1) => {
    const el = ref.current
    if (!el) return
    /*
      An explicit `behavior: "smooth"` beats the `scroll-behavior: auto` that
      the reduced-motion block sets in CSS, so the preference has to be read
      here as well — otherwise the one animation a motion-sensitive user cannot
      escape is the one they are pressing a button to trigger.
    */
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    // Leave a sliver of the outgoing card visible so the move reads as a page.
    el.scrollBy({ left: dir * (el.clientWidth * 0.9), behavior: still ? "auto" : "smooth" })
  }

  const items = Array.isArray(children) ? children : [children]

  return (
    <div className={className}>
      {header || action || state.overflows ? (
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          {header}
          {/* `ms-auto` so the cluster stays on the right once the row wraps —
              `justify-between` only aligns items that share a line. */}
          <span className="ms-auto flex items-center gap-3">
            {action}
            {state.overflows ? (
              <span className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Zurück"
                  disabled={state.atStart}
                  onClick={() => page(-1)}
                  className="nav-arrow"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Weiter"
                  disabled={state.atEnd}
                  onClick={() => page(1)}
                  className="nav-arrow"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </span>
            ) : null}
          </span>
        </div>
      ) : null}

      {/*
        Negative margin + matching padding lets the track bleed to the viewport
        edge on small screens while its cards stay aligned with the page column.
      */}
      {/*
        `tabIndex` on the track, deliberately. A scrollable region that cannot
        be focused can only be scrolled with a pointer — and where the cards
        hold no links of their own (the testimonials do not), that leaves
        keyboard users with no way to reach the content past the first screen.
        With a tabindex the browser gives arrow-key scrolling for free, which is
        why this is a scrollable region and not an `aria-roledescription`
        carousel: it is not rotating, and announcing it as one would promise
        controls that do not exist.
      */}
      <div
        ref={ref}
        tabIndex={0}
        role="group"
        aria-label={label}
        className={cn(
          /*
            The padding is not spacing, it is headroom for the shadow.

            A box with `overflow-x: auto` clips the *other* axis too — the spec
            gives no way to scroll horizontally and overflow vertically. So the
            track was cutting the hover shadow of every card it holds: the cards
            lift 6px into a --shadow-lg that reaches some 40px below them, and
            with 8px of padding the bottom two thirds of that shadow ended in a
            dead straight line across the card. Same on the sides at `lg`, where
            the padding was zero. It read as a rendering fault, and the animation
            got the blame for it.

            Bottom and side room now match the shadow, and the negative bottom
            margin gives most of it back to the layout so the carousel does not
            suddenly carry 56px of air under it. What is left over falls into
            the section's own bottom padding.
          */
          "-mx-5 -mb-10 mt-12 flex snap-x snap-mandatory gap-[26px] overflow-x-auto scroll-smooth px-5 pt-2 pb-14 [scrollbar-width:none] lg:-mx-6 lg:px-6 [&::-webkit-scrollbar]:hidden",
          trackClassName,
        )}
      >
        {items.map((child, i) => (
          <div
            key={i}
            className={cn("shrink-0 snap-start", itemClassName ?? "w-[78%] sm:w-[46%] lg:w-[23.5%]")}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
