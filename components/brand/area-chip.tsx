import { Scan } from "lucide-react"

import { cn } from "@/lib/utils"

/*
  The area marker that sits on a listing photograph.

  It existed in four places in four sizes — 11px on the card, 12px on the
  feature card, a bordered 20px plate in the gallery — and in two of them it was
  a pale pill at the smallest type on the page, laid over an arbitrary
  photograph. The size of a plot is one of the three facts somebody scans a
  listing for, so it is now a real chip: solid white, its own shadow so it
  detaches from whatever is behind it, and a bracket glyph that says "extent"
  before the number is read at all.

  One component so the three sizes stay a scale rather than three decisions.
*/
export function AreaChip({
  value,
  scale = "md",
  className,
}: {
  /** Preformatted, e.g. „960 m²". */
  value: string
  scale?: "sm" | "md" | "lg"
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-control)] bg-white font-semibold text-teal tabular-nums shadow-[var(--shadow-md)] ring-1 ring-teal/20",
        scale === "lg"
          ? "gap-2 px-3.5 py-2 text-[clamp(0.9375rem,0.5vw+0.8rem,1.1875rem)]"
          : scale === "sm"
            ? "gap-1.5 px-2.5 py-1 text-[0.8125rem]"
            : "gap-1.5 px-3 py-1.5 text-[0.9375rem]",
        className,
      )}
    >
      <Scan
        aria-hidden
        strokeWidth={2.25}
        className={scale === "sm" ? "h-3.5 w-3.5 shrink-0" : "h-4 w-4 shrink-0"}
      />
      {/* The unit alone does not say what is being measured. */}
      <span className="sr-only">Fläche: </span>
      {value}
    </span>
  )
}
