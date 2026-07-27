"use client"

import { useId, useRef, useState } from "react"
import { Plus } from "lucide-react"

import { BOOKING_FAQ } from "@/lib/faq"
import type { FaqItem } from "@/lib/faq"
import { cn } from "@/lib/utils"

/*
  FAQ accordion. Questions and answers live in lib/faq.ts and lib/home-faq.ts so
  the same source feeds both this accordion and the FAQPage markup on the page —
  Google only honours FAQ markup whose content is visible, so the two must never
  drift apart. Which set is shown is passed in; the booking set is the default
  because the listing detail page is where this started.

  The panels stay in the DOM and are hidden by collapsing their height rather
  than being unmounted, so the answers are findable with the browser's in-page
  search and are picked up by crawlers that do not click.
*/
export function FaqAccordion({
  items = BOOKING_FAQ,
  columns = 2,
}: {
  items?: readonly FaqItem[]
  /**
   * Two columns pack a long list into less height, but every grid row is as
   * tall as its tallest cell — so an opened answer leaves a hole beside it. Use
   * one column wherever the answers are long enough for that hole to be
   * conspicuous.
   */
  columns?: 1 | 2
}) {
  const [open, setOpen] = useState<number | null>(0)
  const uid = useId()
  const buttons = useRef<(HTMLButtonElement | null)[]>([])

  /*
    Keyboard support per the ARIA accordion pattern. Tab reaches the accordion
    and then moves past it; the arrow keys walk the questions. Without this a
    twelve-question list costs twelve tab presses to step through, and the roving
    behaviour is what tells a screen-reader user these headers are one group
    rather than twelve unrelated buttons.
  */
  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const last = items.length - 1
    const to =
      e.key === "ArrowDown" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowUp" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null
    if (to === null) return
    e.preventDefault()
    buttons.current[to]?.focus()
  }

  return (
    <div className={cn("grid gap-3", columns === 2 && "md:grid-cols-2")}>
      {items.map((item, i) => {
        const isOpen = open === i
        const panelId = `${uid}-panel-${i}`
        const buttonId = `${uid}-button-${i}`
        return (
          <div
            key={item.q}
            className={cn(
              "surface h-fit transition-colors",
              /* An open panel keeps a teal left edge, so which question you are
                 reading stays obvious in a two-column list. */
              isOpen ? "border-l-[3px] border-l-teal" : "hover:border-teal/40",
            )}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                ref={(el) => {
                  buttons.current[i] = el
                }}
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px]/[1.45] font-medium transition-colors",
                  isOpen ? "text-teal" : "text-ink-900 hover:text-teal",
                )}
              >
                {item.q}
                {/*
                  A plus that becomes a minus, not a chevron that flips.

                  A rotating chevron says "there is more below"; a plus/minus
                  says "this opens and closes", which is what an accordion
                  actually does. It also rotates through 45° rather than 180°,
                  so the movement reads as a state change instead of as a
                  somersault. The bar is drawn as a pseudo-free span pair so
                  only transform animates.
                */}
                <span
                  aria-hidden
                  className={cn(
                    "relative grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors duration-300",
                    isOpen ? "bg-teal text-white" : "bg-teal-50 text-teal",
                  )}
                >
                  <Plus
                    className={cn(
                      "h-4 w-4 transition-transform duration-[380ms]",
                      "[transition-timing-function:var(--ease-out-expo)]",
                      isOpen && "rotate-45",
                    )}
                    strokeWidth={2}
                  />
                </span>
              </button>
            </h3>
            {/*
              The panel used to be toggled with the `hidden` attribute: the icon
              took 300ms to turn while the answer appeared in zero, which is the
              single thing that made this component feel unfinished.

              Animating height needs a pixel value, and the answers have none
              until they are laid out. `grid-template-rows: 0fr → 1fr` gets there
              without measuring anything in JS — the row resolves to the child's
              natural height at both ends and the browser interpolates between
              them. The inner element needs `min-height: 0` or a grid child
              refuses to shrink below its content.

              `inert` does the job the `hidden` attribute used to do for
              assistive tech. A collapsed panel is only clipped, not removed, so
              without this a screen reader would read all eight answers straight
              through as if the accordion were open — worse than the unanimated
              version it replaces. Crawlers still see the markup, which is the
              reason the panels stay mounted at all.
            */}
            <div
              className="grid transition-[grid-template-rows] duration-[380ms] [grid-template-rows:0fr] [transition-timing-function:var(--ease-out-expo)] data-[open=true]:[grid-template-rows:1fr] motion-reduce:transition-none"
              data-open={isOpen}
              inert={!isOpen}
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="px-5 pb-5 text-[15px]/[1.7] text-ink"
                >
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
