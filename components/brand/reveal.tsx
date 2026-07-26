"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

/**
 * Reveals its children as they scroll into view.
 *
 * The visual state lives in CSS (`.reveal` in globals.css) so that a visitor
 * who has asked for reduced motion simply sees the finished state — this
 * component only flips the flag. It observes once and disconnects: a section
 * that has appeared stays put rather than re-animating on every pass, which is
 * what makes repeated scrolling feel restless.
 */
export function Reveal({
  children,
  delay = 0,
  variant = "fade",
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode
  /** Stagger within a group, in milliseconds. Keep under ~240ms. */
  delay?: number
  /**
   * fade  — lifts and fades in. The default; the only one to use for a grid.
   * clip  — wipes open from the top, as if being drawn. For single blocks.
   * scale — settles from very slightly small. Hero-level elements only.
   */
  variant?: "fade" | "clip" | "scale"
  className?: string
  as?: "div" | "section" | "li" | "article"
}) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || shown) return

    // Without IntersectionObserver, show everything rather than nothing.
    if (typeof IntersectionObserver === "undefined") {
      const t = setTimeout(() => setShown(true), 0)
      return () => clearTimeout(t)
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      /*
        Positive bottom margin: the observer fires while the element is still
        below the fold, so it has finished settling by the time it is actually
        looked at. A negative margin (the earlier value) fired only once the
        element was already 8% inside the viewport, which on a quick scroll
        meant visibly late pop-in — the thing that reads as stutter.
      */
      { rootMargin: "0px 0px 15% 0px", threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [shown])

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-shown={shown}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={cn(
        { fade: "reveal", clip: "reveal-clip", scale: "reveal-scale" }[variant],
        className,
      )}
    >
      {children}
    </Tag>
  )
}
