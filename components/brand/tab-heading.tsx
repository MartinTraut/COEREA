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
    The frame used to be drawn with `border-image` so the brand gradient ran
    along the outline. That had to go when the motif got a corner: a gradient
    border and a border-radius are mutually exclusive in CSS — border-image
    ignores the radius and paints square corners regardless.

    The light comes from a faint wash inside the frame instead, which does the
    same job of stopping the box reading as a printed wire, and works on all
    three skins.
  */
  const skin = {
    teal: "border-teal/70 bg-teal/[0.04] text-teal",
    white: "border-white/70 bg-white/[0.08] text-white",
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
        /*
          Thinner rule and a corner, matching `.h-plain` — see the note there.
          At the old 5px the frame outweighed its own headline, which is most of
          what made the motif read as hard.
        */
        "inline-block max-w-full rounded-[calc(var(--radius)*0.85)] border-[length:clamp(2px,0.17vw,3px)] border-solid px-[clamp(0.75rem,1.15vw,1.375rem)] py-[clamp(0.45rem,0.6vw,0.75rem)] font-semibold tracking-[-0.024em] [line-height:1.18]",
        skin,
        className,
      )}
    >
      {children}
    </Tag>
  )
}
