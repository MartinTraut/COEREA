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
const ITEMS: {
  label: string
  href?: string
  count?: number
}[] = [
  { label: "Mein Konto", href: "/dashboard" },
  { label: "Meine CoArea", href: "/dashboard#inserierte-flaechen" },
  { label: "Meine Unterlagen" },
  { label: "Buchungsanfragen", count: 1 },
  { label: "Upload Bereich" },
  { label: "Meine Nachrichten", count: 3 },
  { label: "Fläche inserieren", href: "/host-werden" },
]

export function AccountNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Mein Konto" className="bg-teal text-white">
      <div className="container-page flex items-center gap-x-8 gap-y-3 overflow-x-auto py-4 text-[17px] font-medium [scrollbar-width:none] lg:justify-between [&::-webkit-scrollbar]:hidden">
        {ITEMS.map((item) => {
          const badge = item.count ? (
            <span className="grid h-7 w-7 place-items-center rounded-full bg-gold text-sm font-semibold text-ink">
              +{item.count}
            </span>
          ) : null

          if (!item.href) {
            return (
              <span
                key={item.label}
                title="Dieser Bereich folgt"
                className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap text-white/60"
              >
                {item.label}
                {badge}
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
              {badge}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
