import Link from "next/link"
import type { CategoryIcon } from "@/lib/categories"

import { cn } from "@/lib/utils"

/*
  A category entry in the "Flächen entdecken" strip.

  ── Why this no longer follows the frame ──────────────────────────────────────
  In the Figma frames only the three *private* categories sit on a Schraffur
  diamond; the other five float free. Rebuilt literally, that is what the row
  looked like: eight items of which three had a plate behind them and five did
  not, in no order a visitor can read — it looks like three icons failed to load
  their background, not like a distinction. And because the plate is not the
  selected state either, the row had no way to show which category you are in
  beyond a slightly bolder label.

  So the plate is now the same for all eight and carries the *state* instead:

    idle    — cream ground, hairline teal edge, Schraffur at 30%
    hover   — white ground, teal edge, Schraffur up, plate lifts 2px
    active  — teal gradient ground, white icon, teal glow

  The diamond is drawn as two stacked clipped layers (edge, then an inset
  ground) because `clip-path` cannot carry a border. It is clipped rather than
  rotated: rotating the element would rotate its hatch with it, and the
  Schraffur has to keep running in the brand direction. `clip-path` also clips
  `box-shadow`, so the elevation is a drop-shadow filter on the wrapper.

  The icons paint their knockouts with `--icon-knockout`, which is set to
  whatever the plate's ground is, so the cut-outs stay invisible in both states.
*/
const PLATE = "h-[clamp(3.75rem,5.4vw,6.5rem)] w-[clamp(3.75rem,5.4vw,6.5rem)]"
const ICON = "h-[clamp(1.75rem,2.5vw,3rem)] w-[clamp(1.75rem,2.5vw,3rem)]"
/* vw + rem, never vw alone: a pure-vw font size halves under 200% browser zoom
   instead of growing, which defeats the zoom entirely. Lands on 17px at 1920. */
const LABEL = "text-[clamp(0.75rem,0.45vw+0.52rem,1.0625rem)]/[1.118]"
/* Montserrat sets ~8% wider than the frame's Gotham, so the column gets a
   little more room than the measured 130px or the longest label wraps to a
   third line. */
const COLUMN = "w-[clamp(5.25rem,7.6vw,9.25rem)]"

export function CategoryDiamond({
  icon: Icon,
  label,
  hatchedPlate = false,
  active = false,
  href,
  onClick,
  className,
}: {
  icon: CategoryIcon
  label: string
  /**
   * Kept for the data in lib/categories.ts, which records which categories the
   * frame put on a plate. All eight are plated now (see the note above), so it
   * no longer changes what is drawn.
   */
  hatchedPlate?: boolean
  active?: boolean
  href?: string
  onClick?: () => void
  className?: string
}) {
  const DIAMOND = "[clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]"

  const inner = (
    <>
      <span
        className={cn(
          "relative grid place-items-center transition-[transform,filter] duration-300 ease-out group-hover:-translate-y-0.5",
          active
            ? "[filter:drop-shadow(0_10px_18px_rgba(0,101,95,0.30))]"
            : "group-hover:[filter:drop-shadow(0_10px_16px_rgba(0,101,95,0.16))]",
          PLATE,
        )}
      >
        {/* Edge */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 transition-colors duration-300",
            DIAMOND,
            active ? "bg-teal-900/25" : "bg-teal/30 group-hover:bg-teal/60",
          )}
        />
        {/* Ground — inset by the hairline, so the edge shows as an outline. */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-[1.5px] transition-colors duration-300",
            DIAMOND,
            /*
              The idle ground stays cream on hover as well. It has to: the icons
              paint their knockouts with this exact colour, and swapping the
              ground under them would leave the cut-outs showing as pale patches
              for the length of the transition.
            */
            active ? "[background:var(--grad-teal)]" : "bg-cream",
          )}
        />
        {/* Schraffur — the brand texture, quiet until hovered, off when active. */}
        <span
          aria-hidden
          className={cn(
            "hatch-fine absolute inset-[1.5px] transition-opacity duration-300",
            DIAMOND,
            active ? "opacity-0" : "opacity-30 group-hover:opacity-70",
          )}
        />
        {/*
          The icons knock parts of themselves out so the Schraffur does not show
          through; `--icon-knockout` is set to whichever ground is behind them.
        */}
        <Icon
          className={cn(
            "relative transition-transform duration-300 ease-out group-hover:scale-[1.06]",
            active
              ? "text-white [--icon-knockout:var(--teal-500)]"
              : "text-teal [--icon-knockout:var(--cream)]",
            ICON,
          )}
        />
      </span>
      {/*
        The label used to carry `-mt-[clamp(0.25rem,0.833vw,1rem)]`, tucking it
        up to 16px into the plate's lower vertex because the Figma frame showed
        that overlap. On screen it put "Innerstädtische private Gärten" straight
        across the Schraffur's diagonals — unreadable, and it looked like a
        rendering fault rather than a composition. Pixel-fidelity to the frame is
        no longer the goal, so the label now clears the plate.
      */}
      <span
        className={cn(
          "mt-[clamp(0.375rem,0.6vw,0.75rem)] tracking-tight text-balance transition-colors",
          LABEL,
          active ? "font-semibold text-teal" : "text-ink group-hover:text-teal",
        )}
      >
        {label}
      </span>
    </>
  )

  const shared = cn(
    "group flex shrink-0 flex-col items-center text-center outline-none",
    COLUMN,
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
