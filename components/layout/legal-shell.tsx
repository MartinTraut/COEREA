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
    <div>
      {/*
        Legal pages opened cold: a framed heading and then grey body text on
        bare white, with no band and no separation between the title block and
        twenty numbered clauses. The head sits on the brand's lit surface now,
        the same as every other page's opening, and the prose column follows on
        white — the one place on the site where the text really should be as
        plain and as legible as possible.
      */}
      <section className="mesh grain relative isolate overflow-hidden border-b border-border/60 bg-cream">
        <div className="relative container-page py-[clamp(2.25rem,3.5vw+0.5rem,4.5rem)]">
          <div className="mx-auto max-w-3xl">
            <span className="eyebrow">Rechtliches</span>
            <TabHeading
              as="h1"
              className="mt-4 text-[clamp(1.6rem,2.2vw+0.6rem,2.75rem)]/[1.1]"
            >
              {title}
            </TabHeading>

            {intro ? (
              <p className="mt-6 max-w-[60ch] text-[clamp(1rem,0.45vw+0.85rem,1.1875rem)]/[1.55] text-ink-900">
                {intro}
              </p>
            ) : null}

            {updated ? (
              <p className="mt-3 text-xs text-muted-foreground">
                Zuletzt aktualisiert: {updated}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <div className="container-page py-[clamp(2.5rem,4vw,4.5rem)]">
        <div
          className="mx-auto max-w-3xl text-[0.975rem] leading-relaxed text-ink [&_a]:font-medium [&_a]:text-teal [&_a:hover]:underline [&_h2]:mt-11 [&_h2]:mb-3 [&_h2]:text-[1.0625rem] [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-ink-900 [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:font-semibold [&_h3]:text-ink-900 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:list-disc [&_strong]:font-semibold [&_strong]:text-ink-900"
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
