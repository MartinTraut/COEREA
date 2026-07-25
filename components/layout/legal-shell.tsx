import type { ReactNode } from "react"

import { TabHeading } from "@/components/brand/tab-heading"

/**
 * Shared shell for text-heavy pages (legal notices, policies).
 * Provides the CoArea heading motif and a calm, readable prose column.
 */
export function LegalShell({
  title,
  intro,
  updated,
  children,
}: {
  title: string
  intro?: string
  updated?: string
  children: ReactNode
}) {
  return (
    <div className="container-page py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <TabHeading as="h1" className="text-[clamp(1.6rem,3vw+0.5rem,2.5rem)]">
          {title}
        </TabHeading>

        {intro ? (
          <p className="mt-6 text-lg leading-relaxed text-ink/80">{intro}</p>
        ) : null}

        {updated ? (
          <p className="mt-3 text-xs text-muted-foreground">
            Zuletzt aktualisiert: {updated}
          </p>
        ) : null}

        <div
          className="mt-10 text-[0.95rem] leading-relaxed text-ink/85 [&_a]:font-medium [&_a]:text-teal [&_a:hover]:underline [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:font-semibold [&_h3]:text-ink [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:list-disc [&_strong]:font-semibold [&_strong]:text-ink"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

/** Highlighted placeholder for facts that still need to be supplied. */
export function Todo({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded bg-[#e6b84f]/25 px-1.5 py-0.5 text-ink not-italic">
      TODO: {children}
    </mark>
  )
}
