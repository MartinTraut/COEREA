"use client"

import { useSyncExternalStore } from "react"

/**
 * The prototype's stand-in for an account.
 *
 * There is no backend, so nothing here authenticates anybody — it remembers
 * who said they were signed in, in `localStorage`, and lets the rest of the
 * site react to that. That is the difference between a login screen that
 * merely navigates to the dashboard and one that actually signs you in: the
 * header changes, the dashboard greets you by your own name, and there is a
 * way back out.
 *
 * Deliberately not a cookie and deliberately not read on the server: every
 * page here is statically prerendered, and a session that influenced the HTML
 * would have to give that up. Client-side is also the honest place for it —
 * this is a demo flag, not a credential, and it must never look like one.
 */
export type DemoUser = {
  name: string
  email: string
  /** Which side of the marketplace the demo account plays. */
  role: "host" | "user"
}

const KEY = "coarea.demo-session"
const EVENT = "coarea:demo-session"

/** The stock demo identity — the host the dashboard's data already belongs to. */
export const DEMO_HOST: DemoUser = {
  name: "Roland Schick",
  email: "roland.schick@example.de",
  role: "host",
}

/*
  `useSyncExternalStore` compares snapshots by identity, so parsing the JSON on
  every read would hand it a new object each time and spin. The parsed value is
  cached and only replaced when the stored string actually changes.
*/
let cachedRaw: string | null = null
let cachedUser: DemoUser | null = null

function read(): DemoUser | null {
  if (typeof window === "undefined") return null
  let raw: string | null = null
  try {
    raw = window.localStorage.getItem(KEY)
  } catch {
    // Private mode or blocked storage: behave as signed out rather than throw.
    return null
  }
  if (raw === cachedRaw) return cachedUser
  cachedRaw = raw
  cachedUser = null
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Partial<DemoUser>
      if (parsed && typeof parsed.name === "string" && typeof parsed.email === "string") {
        cachedUser = {
          name: parsed.name,
          email: parsed.email,
          role: parsed.role === "user" ? "user" : "host",
        }
      }
    } catch {
      cachedUser = null
    }
  }
  return cachedUser
}

function announce() {
  window.dispatchEvent(new Event(EVENT))
}

export function signIn(user: DemoUser) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(user))
  } catch {
    /* Storage unavailable — the navigation still happens, the header just
       cannot remember it. Failing the sign-in over that would be worse. */
  }
  announce()
}

export function signOut() {
  try {
    window.localStorage.removeItem(KEY)
  } catch {
    /* see signIn */
  }
  announce()
}

/** Derives a display name from an address when none was given. */
export function nameFromEmail(email: string) {
  const local = email.split("@")[0] ?? ""
  return (
    local
      .split(/[._-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ") || "Gast"
  )
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return "?"
  const first = parts[0]!.charAt(0)
  const last = parts.length > 1 ? parts[parts.length - 1]!.charAt(0) : ""
  return (first + last).toUpperCase()
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange)
  // `storage` fires in the *other* tabs, so signing out here signs out there.
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener(EVENT, onChange)
    window.removeEventListener("storage", onChange)
  }
}

/**
 * The signed-in demo user, or `null`.
 *
 * The server snapshot is always `null` — the prerendered HTML cannot know, and
 * claiming otherwise would mismatch on hydration. Consumers therefore render
 * the signed-out state first and swap on mount, which is one frame and no
 * layout shift as long as both states occupy the same slot.
 */
export function useDemoSession(): DemoUser | null {
  return useSyncExternalStore(subscribe, read, () => null)
}
