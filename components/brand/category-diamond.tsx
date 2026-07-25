import Link from "next/link"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/*
  Signature CoArea category marker: a teal diamond (rotated square) frame with
  the category icon sitting upright inside it, and the full category name below.
  Verified against the Figma "Flächen entdecken" exports. Active state fills the
  diamond teal with a white icon; label turns teal + semibold.

  Renders as a <Link> when `href` is given (category navigation), otherwise as a
  <button> for in-page filtering.
*/
export function CategoryDiamond({
  icon: Icon,
  label,
  active = false,
  href,
  onClick,
  className,
}: {
  icon: LucideIcon
  label: string
  active?: boolean
  href?: string
  onClick?: () => void
  className?: string
}) {
  const inner = (
    <>
      <span
        className={cn(
          "grid h-12 w-12 rotate-45 place-items-center border-2 transition-colors duration-200",
          active
            ? "border-teal bg-teal text-white"
            : "border-teal/80 bg-teal/[0.06] text-teal group-hover:bg-teal/15",
        )}
      >
        <Icon className="h-5 w-5 -rotate-45" strokeWidth={1.5} aria-hidden />
      </span>
      <span
        className={cn(
          "text-[11.5px] leading-tight tracking-tight text-balance",
          active ? "font-semibold text-teal" : "text-ink/70 group-hover:text-ink",
        )}
      >
        {label}
      </span>
    </>
  )

  const shared = cn(
    "group flex w-[84px] shrink-0 flex-col items-center gap-2 text-center outline-none",
    "focus-visible:[&>span:first-child]:ring-2 focus-visible:[&>span:first-child]:ring-teal/40",
    className,
  )

  if (href) {
    return (
      <Link href={href} aria-current={active ? "page" : undefined} className={shared}>
        {inner}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={shared}>
      {inner}
    </button>
  )
}
