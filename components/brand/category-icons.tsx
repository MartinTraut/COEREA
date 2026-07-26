/*
  The eight CoArea category icons — redrawn from scratch (2026-07-26).

  ── Why they were redrawn ─────────────────────────────────────────────────────
  The previous set were the brand's original Illustrator exports. They had two
  problems that no amount of styling could fix:

  · the marks did not distinguish the categories they had to distinguish.
    „Öffentl. Sport- & Freizeitflächen" and „Private Sport- & Freizeitflächen"
    were both a football; the two Plätze categories were both a building. The one
    thing a visitor needs to tell apart was the one thing the drawings shared.
  · they were drawn at eight different scales and densities, in viewBoxes from
    50.9 to 55.6 units, some as outlines and some as filled silhouettes with
    white knockouts. In a row of eight the wheat read as a hairline and the
    market stall as a solid block. The knockouts also meant every icon had to
    know the colour of the surface behind it.

  The originals are not lost: they are in git history and in the Drive folder
  (`Icons/*.svg`).

  ── How this set is built ─────────────────────────────────────────────────────
  · one 48×48 grid, content inside 4…44, so all eight have the same optical size
  · one stroke weight (2 units) and one joint style (square caps, mitred joins),
    which is what makes the row read as a set — the brand is sharp-cornered, so
    nothing is rounded
  · pure line work, no fills, no knockouts: the diamond plate gives every icon a
    clean core to sit on, so an icon never has to paint out its own background
  · `currentColor` throughout — teal on the light plate, white on the filled one

  ── The semantic system ───────────────────────────────────────────────────────
  Private ground is drawn ENCLOSED — a boundary runs around it (fence, courtyard
  wall, mesh). Public ground is drawn OPEN — no perimeter, entered from any side.
  So the distinction sits in the mark itself, not only in the hatched plate and
  the written „privat"/„öffentlich" marker beside it. Three signals, one meaning.
*/
type IconProps = { className?: string }

/* Shared root: one grid, one weight, one joint style for all eight. */
function Frame({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden
      focusable="false"
    >
      {children}
    </svg>
  )
}

/**
 * Innerstädtische private Gärten — a garden plot inside a picket fence.
 * Enclosed: the fence runs the whole way round.
 */
export function PrivateGaertenIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      {/* fence, all the way round */}
      <path d="M4 13h40v31H4z" />
      <path d="M14 13v7M24 13v7M34 13v7" />
      {/*
        Three planted rows rather than one flower. A single blossom on a stalk
        read as a magnifying glass at 40px; three cups on stems read as a bed.
      */}
      <path d="M14 43V31M10 31l4-6 4 6M24 43V29M20 29l4-6 4 6M34 43V31M30 31l4-6 4 6" />
    </Frame>
  )
}

/**
 * Agrar- & Forstflächen — worked land and woodland: ears of wheat beside a
 * conifer, on open ground. Private ownership, but no urban boundary to draw.
 */
export function AgrarForstIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M3 43h42" />
      {/* one ear of wheat, three tiers — a second stalk only added noise */}
      <path d="M13 43V13M13 17l-6-4M13 17l6-4M13 25l-6-4M13 25l6-4M13 33l-6-4M13 33l6-4" />
      {/* conifer */}
      <path d="M33 43v-6" />
      <path d="M33 11l-9 16h18zM33 22l-11 15h22z" />
    </Frame>
  )
}

/**
 * Öffentl. Sport- & Freizeitflächen — a full pitch seen from above: halfway
 * line, centre circle, two goal areas. Open: no perimeter fence.
 */
export function OeffentlicherSportIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M3 9h42v30H3z" />
      <path d="M24 9v30" />
      <circle cx="24" cy="24" r="6" />
      <path d="M3 16h7v16H3zM38 16h7v16h-7z" />
    </Frame>
  )
}

/**
 * Private Sport- & Freizeitflächen — a court behind a mesh fence: net down the
 * middle, service line across. Enclosed: the dashed perimeter is the fence, and
 * at icon scale its dash reads as the brand's own Schraffur.
 */
export function PrivaterSportIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      {/* mesh fence */}
      <path d="M3 5h42v38H3z" strokeDasharray="3 3.5" />
      {/* court */}
      <path d="M10 13h28v22H10z" />
      {/* net + service line */}
      <path d="M24 10v28M10 24h28" />
    </Frame>
  )
}

/** Gewerbliche Flächen — a hall with a roller door and stacked goods beside it. */
export function GewerbeIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M4 12h40v31H4z" />
      {/* roller door */}
      <path d="M18 43V24h12v19" />
      <path d="M18 30h12M18 36h12" />
      {/* goods */}
      <path d="M8 32h7v11H8z" />
      <path d="M33 32h7v11h-7z" />
    </Frame>
  )
}

/**
 * Innerstädtische private Plätze — a courtyard between two buildings, closed off
 * at the back. Enclosed on three sides: this is the Hinterhof.
 */
export function PrivatePlaetzeIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      {/* left building */}
      <path d="M3 8h13v35H3z" />
      <path d="M8 15h4M8 25h4" />
      {/* right building */}
      <path d="M32 13h13v30H32z" />
      <path d="M37 20h4M37 30h4" />
      {/* rear wall closing the yard */}
      <path d="M16 18h16" />
      {/* paving */}
      <path d="M20 30h8M20 38h8" />
    </Frame>
  )
}

/**
 * Innerstädtische öffentl. Plätze — a public square: fountain in the middle, two
 * lamps. Open: nothing encloses it, it is entered from any side.
 */
export function OeffentlichePlaetzeIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M3 43h42" />
      {/* fountain: straight basin, jet, two splashes — a trapezoid basin with a
          spout read as a crown at small size */}
      <path d="M12 33h24v10H12z" />
      <path d="M12 38h24" />
      <path d="M24 33V20M24 21l-6 6M24 21l6 6" />
      {/* lamps */}
      <path d="M6 43V19M3 15h6v4H3zM42 43V19M39 15h6v4h-6z" />
    </Frame>
  )
}

/** Innerstädtische öffentl. Grünanlagen — a park: a tree, a bench, open ground. */
export function GruenanlagenIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M3 43h42" />
      {/* tree */}
      <circle cx="14" cy="18" r="10" />
      <path d="M14 43V28" />
      {/* bench */}
      <path d="M27 26h17M27 33h17M30 26v7M41 26v7M30 33v9M41 33v9" />
    </Frame>
  )
}

/** Lookup by category slug, for anywhere that has the slug but not the object. */
export const CATEGORY_ICONS: Record<string, (p: IconProps) => React.JSX.Element> = {
  "agrar-forst": AgrarForstIcon,
  gewerbe: GewerbeIcon,
  gruenanlagen: GruenanlagenIcon,
  "oeffentliche-plaetze": OeffentlichePlaetzeIcon,
  "private-gaerten": PrivateGaertenIcon,
  "private-plaetze": PrivatePlaetzeIcon,
  "oeffentlicher-sport": OeffentlicherSportIcon,
  "privater-sport": PrivaterSportIcon,
}
