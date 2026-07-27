"use client"

import { Heart } from "lucide-react"

import { useSavedListings } from "@/hooks/use-saved-listings"
import { cn } from "@/lib/utils"

/**
 * The "Merken" heart on a listing.
 *
 * `defaultSaved` carries the pre-marked state from the design data so the
 * server-rendered markup matches the frames; once the hook has read
 * localStorage, the user's own choice takes over.
 */
export function SaveButton({
  slug,
  defaultSaved = false,
  className,
  iconClassName,
}: {
  slug: string
  defaultSaved?: boolean
  className?: string
  iconClassName?: string
}) {
  const { isSaved, setSaved } = useSavedListings()
  const active = isSaved(slug, defaultSaved)

  return (
    <button
      type="button"
      onClick={() => setSaved(slug, !active)}
      aria-label={active ? "Aus Merkliste entfernen" : "Zur Merkliste hinzufügen"}
      aria-pressed={active}
      className={cn(
        "grid min-h-11 min-w-11 place-items-center rounded-[var(--radius-control)] transition-colors hover:text-teal",
        /* Unsaved was `text-ink/20`: #707070 at 20% over the white chip it sits
           on is about 1.15:1, so the only secondary control on a listing card
           was invisible until hovered. WCAG 1.4.11 asks 3:1 of a control. */
        active ? "text-teal" : "text-ink-900/55",
        className,
      )}
    >
      {/*
        The heart overshoots slightly on the way in and settles — the one place
        on the site where a spring is warranted, because it is the only control
        whose whole purpose is the moment of feedback.
      */}
      <Heart
        className={cn(
          "h-6 w-6 fill-current transition-transform duration-300 ease-[var(--ease-spring)] active:scale-90",
          active && "scale-110",
          iconClassName,
        )}
        aria-hidden
      />
    </button>
  )
}
