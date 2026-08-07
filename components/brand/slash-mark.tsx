import { cn } from "@/lib/utils"

/*
  „///" — the CoArea signature mark that sits top-right in the mobile app header
  (and as a recurring accent). Three forward slashes at the same angle as the
  Schraffur hatch. currentColor so it inherits teal / white per context.
*/
export function SlashMark({
  className,
  title,
}: {
  className?: string
  title?: string
}) {
  return (
    <svg
      viewBox="0 0 34 24"
      className={cn("h-5 w-auto", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      /*
        Butt caps, not round. Designer's instruction, 2026-08-07: „Würde den
        Menü Icon nur eckig machen und nicht mit abgerundeter Kontur."

        It is the same rule as the corners — and here it is also the more
        faithful mark: the Schraffur these three strokes quote is drawn by a
        plotter, and a plotted line ends flat. A rounded cap turned the brand's
        own hatch into three lozenges.
      */
      strokeLinecap="butt"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <line x1="6" y1="20" x2="14" y2="4" />
      <line x1="15" y1="20" x2="23" y2="4" />
      <line x1="24" y1="20" x2="32" y2="4" />
    </svg>
  )
}
