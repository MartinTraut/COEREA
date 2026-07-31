"use client"

import { useCallback, useEffect, useRef, useState } from "react"

/**
 * A horizontal scroller that fades out at whichever edge still has content
 * beyond it.
 *
 * The category strip showed four and a half of its eight diamonds on a phone
 * and stopped at the viewport edge with a clean cut: the scrollbar is hidden by
 * design, so nothing said the other three and a half were there. Four of eight
 * categories were effectively invisible.
 *
 * Two reasons this earns its JavaScript rather than being a static gradient:
 *
 *  · A permanent fade is its own lie — it would keep promising more content
 *    after the visitor has already reached the end. The flags track which edges
 *    actually have something past them.
 *  · The fade is a `mask-image`, not a coloured overlay. This component is used
 *    on three pages with three different grounds, so a gradient fading to a
 *    fixed colour would be wrong on two of them and would have to be kept in
 *    sync by hand. Masking fades the content itself to transparent, which is
 *    right on any background and needs to be told nothing.
 *
 * Only the scroller is a client component; whatever is scrolled stays on the
 * server, which is what lets `CategoryStrip` keep taking a `hrefFor` function.
 */
export function EdgeFadeScroller({
  className,
  fade = "2.5rem",
  children,
}: {
  className?: string
  /** Width of each fade. */
  fade?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [edges, setEdges] = useState({ start: false, end: false })

  const measure = useCallback(() => {
    const el = ref.current
    if (!el) return
    /* 2px of slack: sub-pixel layout means scrollLeft rarely reaches the exact
       maximum, so a strict comparison would leave the end fade on for good. */
    const max = el.scrollWidth - el.clientWidth
    setEdges({ start: el.scrollLeft > 2, end: el.scrollLeft < max - 2 })
  }, [])

  useEffect(() => {
    measure()
    /* Resize matters as much as scroll: callers release the scroller at a
       breakpoint, and rotating a tablet is exactly the case where both fades
       have to switch off. */
    const el = ref.current
    window.addEventListener("resize", measure)
    el?.addEventListener("scroll", measure, { passive: true })
    return () => {
      window.removeEventListener("resize", measure)
      el?.removeEventListener("scroll", measure)
    }
  }, [measure])

  /*
    Both edges are declared whenever either is in play and collapse to `0px`
    individually, so scrolling from one end to the other animates rather than
    switching. No mask at all once neither edge has anything beyond it — above
    the caller's breakpoint the scroller is released to `overflow: visible`, and
    a mask would clip whatever the content does on hover.
  */
  const masked = edges.start || edges.end
  const maskImage = masked
    ? `linear-gradient(to right, transparent 0, black ${
        edges.start ? fade : "0px"
      }, black calc(100% - ${edges.end ? fade : "0px"}), transparent 100%)`
    : undefined

  return (
    <div
      ref={ref}
      style={{ maskImage, WebkitMaskImage: maskImage }}
      className={className}
    >
      {children}
    </div>
  )
}
