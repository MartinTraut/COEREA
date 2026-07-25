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
  variant?: "teal" | "white"
  className?: string
}) {
  const border = variant === "teal" ? "border-teal" : "border-white"
  const text = variant === "teal" ? "text-teal" : "text-white"

  return (
    <Tag
      className={cn(
        "inline-block max-w-full border px-4 py-2.5 leading-tight font-semibold tracking-tight text-balance",
        border,
        text,
        className,
      )}
    >
      {children}
    </Tag>
  )
}
