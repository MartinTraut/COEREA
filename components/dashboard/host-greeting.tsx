"use client"

import { useDemoSession } from "@/lib/demo-session"

/**
 * The name in the dashboard greeting.
 *
 * Split out as its own client component so the panel around it stays static:
 * only these two words depend on who is signed in. Before hydration, and for
 * anybody who reached the dashboard without signing in, it falls back to the
 * host the demo data belongs to — the page has to make sense either way.
 */
export function HostGreeting({ fallback }: { fallback: string }) {
  const user = useDemoSession()
  return <>{user?.name ?? fallback}</>
}
