import { cn } from "@/lib/utils"

/*
  Signature CoArea motif: the heading sits inside a thin, sharp-cornered
  rectangular frame in the brand teal. Verified against the Figma exports — a
  plain rectangle (no stepped-tab ticks), right angles, teal border + teal text.
  Variant white for use over teal fills / photos.
*/
export function TabHeading({
  children,
  as: Tag = "h2",
  variant = "teal",
  className,
}: {
  children: React.ReactNode
  as?: "h1" | "h2" | "h3" | "span"
  /** teal/white draw the outline; solid is the filled white box used on teal bands. */
  variant?: "teal" | "white" | "solid"
  className?: string
}) {
  /*
    The teal frame is drawn with a gradient rather than a flat rule: the same
    light that falls on every teal fill runs along the outline, so the motif
    reads as lit instead of printed. `border-image` needs a border-style and a
    slice of 1 to paint a gradient across all four edges.
  */
  const skin = {
    teal: "border-solid border-teal text-teal [border-image:var(--grad-teal-bright)_1]",
    white: "border-white text-white",
    solid: "border-white bg-white text-teal shadow-[var(--shadow-md)]",
  }[variant]

  return (
    <Tag
      className={cn(
        /*
          Frame geometry read off the frames: 5px rule, ~20px of air left and
          right of the text, ~10px above and below. Both the hero headline and
          the section headings measure the same, so the padding is anchored to
          the viewport rather than the font size.
        */
        /*
          Line height is written as an arbitrary property, not `leading-[1.15]`.
          tailwind-merge treats leading-* as part of the font-size conflict
          group, so a `text-…` class from the call site silently dropped it and
          the frame grew by a line-height's worth on every wrapped heading.
        */
        "inline-block max-w-full border-[length:clamp(3px,0.26vw,5px)] px-[clamp(0.625rem,1.04vw,1.25rem)] py-[clamp(0.4rem,0.52vw,0.625rem)] font-semibold tracking-tight [line-height:1.15]",
        skin,
        className,
      )}
    >
      {children}
    </Tag>
  )
}
