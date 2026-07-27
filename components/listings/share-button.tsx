"use client"

import { useState } from "react"
import { Check, Share2 } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Share an area.
 *
 * Uses the native share sheet where the browser offers one (every mobile
 * browser worth counting), and falls back to copying the link with a brief
 * confirmation. Previously this was a static glyph.
 */
export function ShareButton({
  slug,
  title,
  className,
}: {
  slug: string
  title: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  async function share() {
    const url = `${window.location.origin}/flaechen/${slug}`
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch (err) {
        /*
          Cancelling the native share sheet rejects with AbortError. That was
          caught here and fell through to the clipboard branch, so dismissing
          the sheet silently copied the link and reported „Link kopiert" — a
          confirmation for something the visitor had just declined. Only a real
          failure falls through now.
        */
        if ((err as DOMException | undefined)?.name === "AbortError") return
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // No clipboard permission; nothing useful left to try.
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      aria-label={copied ? "Link kopiert" : `„${title}" teilen`}
      className={cn(
        "grid min-h-11 min-w-11 place-items-center rounded-[var(--radius-control)] text-teal transition-colors hover:text-teal-600",
        className,
      )}
    >
      {copied ? (
        <Check className="h-6 w-6" aria-hidden />
      ) : (
        <Share2 className="h-6 w-6" aria-hidden />
      )}
    </button>
  )
}
