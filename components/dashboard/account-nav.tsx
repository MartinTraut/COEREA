"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

/**
 * The teal account bar that sits directly under the site header once a host is
 * signed in. Gold pills carry the unread counts, as in the dashboard frame.
 *
 * Five of the seven entries used to point at `/dashboard` with no anchor, so
 * the bar looked like navigation between areas and moved nothing. Entries that
 * have a destination now scroll to it; the ones whose area does not exist yet
 * are rendered as plain text rather than as links that lie.
 */
/*
  The counts are gone from „Buchungsanfragen" and „Meine Nachrichten".

  Both areas are greyed out as „folgt", and both carried a gold badge saying
  one request and three unread messages were waiting. A badge is a summons: it
  claims something specific is there for you, and here it claimed it for a
  section that does not exist and cannot be opened. Announcing three messages
  nobody can read is worse than the missing feature itself.
*/
const ITEMS: {
  label: string
  href?: string
}[] = [
  { label: "Mein Konto", href: "/dashboard" },
  { label: "Meine CoArea", href: "/dashboard#inserierte-flaechen" },
  { label: "Meine Unterlagen" },
  { label: "Buchungsanfragen" },
  { label: "Upload Bereich" },
  { label: "Meine Nachrichten" },
  { label: "Fläche inserieren", href: "/host-werden" },
]

export function AccountNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Mein Konto" className="bg-teal text-white">
      <div className="container-page flex items-center gap-x-8 gap-y-3 overflow-x-auto py-4 text-[17px] font-medium [scrollbar-width:none] lg:justify-between [&::-webkit-scrollbar]:hidden">
        {ITEMS.map((item) => {
          if (!item.href) {
            return (
              <span
                key={item.label}
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-white/60"
              >
                {item.label}
                {/* Said „folgt" only in a title attribute, which a touch device
                    never shows. */}
                <span className="caps-xs rounded-[var(--radius-pill)] bg-white/15 px-2 py-0.5 text-white/80">
                  folgt
                </span>
              </span>
            )
          }

          const current = item.href === pathname

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={current ? "page" : undefined}
              className={cn(
                "inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap transition-opacity hover:opacity-80",
                current && "underline underline-offset-8",
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
