"use client"

import { useCallback, useSyncExternalStore } from "react"

import { DEFAULT_SAVED_SLUGS } from "@/lib/listings"

const KEY = "coarea:saved-listings"
const EVENT = "coarea:saved-changed"

/*
  `useSyncExternalStore` needs a stable snapshot: returning a freshly parsed
  array on every call would compare unequal each render and loop forever. So the
  parsed value is cached and only recomputed when the raw string changes.
*/
let cachedRaw: string | null | undefined
let cachedValue: string[] | null = null

function parse(raw: string | null): string[] | null {
  if (raw === null) return null
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : []
  } catch {
    return []
  }
}

function getSnapshot(): string[] | null {
  let raw: string | null = null
  try {
    raw = window.localStorage.getItem(KEY)
  } catch {
    // Storage blocked (private mode, quota) — behave like a first visit.
    return null
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw
    cachedValue = parse(raw)
  }
  return cachedValue
}

/** No storage on the server, and none during hydration — see the hook doc. */
function getServerSnapshot(): string[] | null {
  return null
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange)
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener(EVENT, onChange)
    window.removeEventListener("storage", onChange)
  }
}

/**
 * Client-side wishlist ("Merken"), persisted in localStorage.
 *
 * There is no account system yet, so this is deliberately device-local. It is
 * still worth wiring up: a heart that visibly does nothing is worse than none.
 *
 * The snapshot is `null` until the visitor has saved anything at all. That is
 * what lets a card fall back to the pre-marked state from the design data on a
 * first visit, and switch to the visitor's own list from the first click on —
 * it also keeps the hydration markup identical to what the server rendered.
 */
export function useSavedListings() {
  const saved = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const isSaved = useCallback(
    (slug: string, fallback = false) => (saved === null ? fallback : saved.includes(slug)),
    [saved],
  )

  const setSaved = useCallback((slug: string, next: boolean) => {
    /*
      On the very first save the stored list does not exist yet, and the hearts
      on screen are the design's pre-marked ones. Starting from an empty array
      would silently unmark all of them the moment the visitor marks anything,
      so the design defaults are seeded in as the baseline.
    */
    const base = getSnapshot() ?? DEFAULT_SAVED_SLUGS
    const updated = next
      ? Array.from(new Set([...base, slug]))
      : base.filter((s) => s !== slug)
    try {
      window.localStorage.setItem(KEY, JSON.stringify(updated))
    } catch {
      // Nothing we can do without storage; skip the notify so the UI stays honest.
      return
    }
    window.dispatchEvent(new Event(EVENT))
  }, [])

  return { saved, isSaved, setSaved }
}
