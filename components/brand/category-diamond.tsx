import Link from "next/link"
import type { CategoryAccess, CategoryIcon } from "@/lib/categories"

import { cn } from "@/lib/utils"

/*
  A category entry in the "Flächen entdecken" strip.

  ── What the plate is for ─────────────────────────────────────────────────────
  In the original design the Schraffur diamond sat behind the *private*
  categories only. That is not decoration — it is the one thing the icons cannot
  say: „Öffentl. Sport- & Freizeitflächen" and „Private Sport- &
  Freizeitflächen" are both a football, and the two Plätze categories are nearly
  the same mark as well. Whether the ground is private or public is the
  distinction a visitor needs, and the hatch carried it.

  Plating all eight (an earlier attempt at making the row look consistent) threw
  that away: with everything hatched, nothing was marked. So the plate is back to
  meaning one thing, and it now covers all eight rather than three:

    privat      — the Schraffur ring, as in the design
    öffentlich  — a flat teal-50 ring, no texture
    active      — filled with the brand gradient, white icon, teal glow

  Idle, the plate is a ring: an inner white diamond gives the line icon a clean
  core, which is what lets the icons be pure line work with no knockouts of their
  own (the brand's originals had to paint white into themselves to survive the
  hatch).

  Two signals, not one: below the label each entry also carries a small written
  access marker („privat" / „öffentlich") with a matching swatch, because a
  texture alone is not something a first-time visitor can decode, and because
  colour or fill on its own would fail WCAG 1.4.1.

  There is no outline around the diamond. The stacked edge/ground pair an earlier
  version drew read as a box around the icon and flattened the difference between
  the two states — the hatch and the flat fill have to be the loudest thing here.

  The diamond is clipped rather than rotated: rotating the element would rotate
  its hatch with it, and the Schraffur has to keep running in the brand
  direction. `clip-path` also clips `box-shadow`, so elevation is a drop-shadow
  filter on the wrapper.

*/
const PLATE = "h-[clamp(3.75rem,5.4vw,6.5rem)] w-[clamp(3.75rem,5.4vw,6.5rem)]"
/*
  The icon has to fit the square inscribed in the inner diamond, not the diamond
  itself: at inset 13% the core measures ~74% of the plate across its diagonals,
  which leaves ~52% for a square. 46% keeps a margin so no corner of the drawing
  crosses back onto the Schraffur.
*/
const ICON = "h-[46%] w-[46%]"
/* vw + rem, never vw alone: a pure-vw font size halves under 200% browser zoom
   instead of growing, which defeats the zoom entirely. Lands on 17px at 1920. */
const LABEL = "text-[clamp(0.75rem,0.45vw+0.52rem,1.0625rem)]/[1.118]"
/* Montserrat sets ~8% wider than the frame's Gotham, so the column gets a
   little more room than the measured 130px or the longest label wraps to a
   third line. */
const COLUMN = "w-[clamp(5.25rem,7.6vw,9.25rem)]"
const DIAMOND = "[clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]"

export function CategoryDiamond({
  icon: Icon,
  label,
  access,
  active = false,
  href,
  onClick,
  className,
}: {
  icon: CategoryIcon
  label: string
  /** Private or public ground — decides how the plate is drawn. */
  access: CategoryAccess
  active?: boolean
  href?: string
  onClick?: () => void
  className?: string
}) {
  const privat = access === "privat"

  const inner = (
    <>
      <span
        className={cn(
          "relative grid place-items-center transition-[transform,filter] duration-300 ease-out group-hover:-translate-y-0.5",
          active
            ? "[filter:drop-shadow(0_10px_18px_rgba(0,101,95,0.28))]"
            : "group-hover:[filter:drop-shadow(0_9px_16px_rgba(0,101,95,0.14))]",
          PLATE,
        )}
      >
        {/* Active fill. Sits under both idle treatments and fades in. */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 transition-opacity duration-300 [background:var(--grad-teal)]",
            DIAMOND,
            active ? "opacity-100" : "opacity-0",
          )}
        />

        {/*
          Idle ground, drawn as a ring: the outer diamond carries the access
          signal, the inner one gives the line drawing a clean core to sit on.
          Without the core, a 2-unit stroke icon on the Schraffur is line-on-line
          and unreadable — which is exactly why the brand's original icons had to
          paint white knockouts into themselves. The plate does that job now, so
          the icons stay independent of what is behind them.
        */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            DIAMOND,
            privat ? "hatch-fine" : "bg-teal-50",
            active ? "opacity-0" : "opacity-100",
          )}
        />
        <span
          aria-hidden
          className={cn(
            "absolute inset-[13%] bg-white transition-opacity duration-300",
            DIAMOND,
            active ? "opacity-0" : "opacity-100",
          )}
        />

        <Icon
          className={cn(
            "relative transition-transform duration-300 ease-out group-hover:scale-[1.06]",
            active ? "text-white" : "text-teal",
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
          /*
            Three lines of room whatever the label needs. The longest one
            („Innerstädtische öffentl. Grünanlagen") wraps to three while most
            wrap to two, and without a floor the access markers underneath sat
            at three different heights across the row.
          */
          "mt-[clamp(0.375rem,0.55vw,0.6875rem)] min-h-[3.354em] tracking-tight text-balance transition-colors",
          LABEL,
          active ? "font-semibold text-teal" : "text-ink group-hover:text-teal",
        )}
      >
        {label}
      </span>

      {/*
        Access marker. Small enough to read as metadata rather than as a second
        label, and it names the thing the plate is showing — hatched swatch for
        private ground, solid for public.
      */}
      <span
        className={cn(
          "mt-1.5 flex items-center gap-1 text-[0.5625rem] font-semibold tracking-[0.12em] uppercase transition-colors",
          active ? "text-teal" : "text-ink/55 group-hover:text-teal/80",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "h-[0.4375rem] w-[0.4375rem] shrink-0",
            privat ? "hatch-fine" : "bg-teal/70",
          )}
        />
        {privat ? "privat" : "öffentlich"}
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
