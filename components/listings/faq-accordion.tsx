"use client"

import { useId, useState } from "react"
import { ChevronDown } from "lucide-react"

import { BOOKING_FAQ } from "@/lib/faq"
import type { FaqItem } from "@/lib/faq"
import { cn } from "@/lib/utils"

/*
  FAQ accordion. Questions and answers live in lib/faq.ts and lib/home-faq.ts so
  the same source feeds both this accordion and the FAQPage markup on the page —
  Google only honours FAQ markup whose content is visible, so the two must never
  drift apart. Which set is shown is passed in; the booking set is the default
  because the listing detail page is where this started.

  The panels stay in the DOM and are hidden with `hidden` rather than being
  unmounted, so the answers are findable with the browser's in-page search and
  are picked up by crawlers that do not click.
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
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-[15px] font-medium transition-colors",
                  isOpen ? "text-teal" : "text-ink-900 hover:text-teal",
                )}
              >
                {item.q}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-teal transition-transform duration-300 ease-out",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-5 text-[15px]/[1.7] text-ink"
            >
              {item.a}
            </div>
          </div>
        )
      })}
    </div>
  )
}
