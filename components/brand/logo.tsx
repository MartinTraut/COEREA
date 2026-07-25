import Link from "next/link"
import { cn } from "@/lib/utils"

/*
  CoArea wordmark — "co area" stacked, rounded geometric.
  Phase-1 typographic rendering (Montserrat). Replace with the licensed
  custom logo SVG when available. Keep the stacked co / area lockup.
*/
export function Logo({
  variant = "teal",
  className,
  href = "/",
}: {
  variant?: "teal" | "white"
  className?: string
  href?: string | null
}) {
  const mark = (
    <span
      aria-label="CoArea"
      className={cn(
        "inline-flex flex-col font-sans font-medium lowercase leading-[0.78] tracking-tight select-none",
        variant === "teal" ? "text-teal" : "text-white",
        "text-2xl",
        className,
      )}
    >
      <span>co</span>
      <span className="tracking-[0.02em]">area</span>
    </span>
  )

  if (href === null) return mark
  return (
    <Link href={href} className="inline-block">
      {mark}
    </Link>
  )
}
