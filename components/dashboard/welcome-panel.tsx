import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { TabHeading } from "@/components/brand/tab-heading"
import { BlueprintBg } from "@/components/brand/blueprint-bg"
import { HostGreeting } from "@/components/dashboard/host-greeting"
import { HOST_PROFILE, QUICK_LINKS } from "@/lib/dashboard"

/** Greeting band: profile card, three key figures and the quick-access list. */
export function WelcomePanel() {
  return (
    <section className="relative isolate overflow-hidden bg-cream py-14 lg:py-20">
      <BlueprintBg tone="white" className="-z-10" />

      <div className="container-page">
        <TabHeading
          as="h1"
          className="max-w-[700px] bg-white text-[clamp(1.8rem,2.4vw+0.8rem,3.25rem)]/[1.15]"
        >
          Willkommen zurück, <HostGreeting fallback={HOST_PROFILE.name} />!
        </TabHeading>

        {/*
          Both columns are `items-stretch` and each is one surface rather than a
          stack of floating boxes. The right column used to be four separately
          shadowed panels with their own gaps, so it ended at a different height
          than the card beside it and the whole band read as unaligned.
        */}
        <div className="mt-[clamp(2rem,3vw,3.25rem)] grid items-stretch gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
          {/* profile + key figures */}
          <div className="surface grid gap-[clamp(1.5rem,2.4vw,2.5rem)] p-[clamp(1.5rem,2.4vw,2.5rem)] sm:grid-cols-[auto_1fr] sm:items-center">
            <div className="flex flex-col items-center text-center">
              {/*
                The portrait carries a teal ring instead of floating free on
                white. 200px was larger than the host's own name is ever set,
                which made the profile column read as the subject of the page
                rather than as the person it belongs to.
              */}
              <Image
                src={HOST_PROFILE.image}
                alt={HOST_PROFILE.name}
                width={160}
                height={160}
                className="h-[clamp(7rem,9vw,10rem)] w-[clamp(7rem,9vw,10rem)] rounded-full object-cover ring-4 ring-teal/15"
              />
              <p className="mt-5 text-[clamp(1.0625rem,0.5vw+0.9rem,1.25rem)] leading-tight font-semibold text-ink-900">
                {HOST_PROFILE.name}
              </p>
              <p className="caps mt-1.5 text-teal">{HOST_PROFILE.age} Jahre</p>
              {/* Was a link to /dashboard, i.e. to this very page. There is no
                  profile editor yet, so it says so rather than pretending. */}
              <p className="mt-4 text-[0.8125rem] text-ink/70">Profil bearbeiten folgt</p>
            </div>

            {/*
              The figure now dominates its own tile. Label and value used to be
              19px and 17px, so „Sternebewertung" was set larger than the 4,8
              it exists to introduce — the tile said its own name louder than
              its content.
            */}
            <dl className="grid gap-3 sm:grid-cols-1">
              {[
                { term: "Bewertungen", value: String(HOST_PROFILE.reviews), suffix: null },
                { term: "Sternebewertung", value: HOST_PROFILE.ratingAvg, suffix: "/ 5" },
                { term: "Host seit", value: HOST_PROFILE.since, suffix: null },
              ].map((row) => (
                <div
                  key={row.term}
                  className="rounded-[var(--radius)] bg-teal-50 px-[clamp(1rem,1.6vw,1.5rem)] py-[clamp(0.85rem,1.3vw,1.15rem)]"
                >
                  <dt className="caps text-teal">{row.term}</dt>
                  <dd className="mt-1.5 text-[clamp(1.25rem,1vw+0.9rem,1.75rem)] leading-none font-bold text-ink-900 tabular-nums">
                    {row.value}
                    {row.suffix ? (
                      <span className="ml-1.5 text-[0.55em] font-semibold text-ink">
                        {row.suffix}
                      </span>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* quick access */}
          {/*
            These areas have no page behind them yet. Rather than four tiles
            that look clickable and reload the dashboard, the ones without a
            target are plain rows — and they now say „folgt" in place of a
            count. A gold badge announcing three unread messages, on a section
            greyed out as unavailable, promised something twice over that does
            not exist.
          */}
          <ul className="surface flex flex-col divide-y divide-border">
            {QUICK_LINKS.map((link) => {
              const body = (
                <>
                  <span className="flex-1 text-[clamp(1rem,0.45vw+0.85rem,1.125rem)] font-medium">
                    {link.label}
                  </span>
                  {link.href ? (
                    <>
                      {link.count ? (
                        <span className="grid h-7 min-w-7 shrink-0 place-items-center rounded-full bg-gold px-2 text-[0.8125rem] font-bold text-ink-900">
                          {link.count}
                        </span>
                      ) : null}
                      <ChevronRight
                        aria-hidden
                        className="h-5 w-5 shrink-0 text-teal transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  ) : (
                    <span className="caps-xs shrink-0 rounded-[var(--radius-pill)] bg-cream px-2.5 py-1 text-ink">
                      folgt
                    </span>
                  )}
                </>
              )
              const row =
                "flex flex-1 items-center gap-4 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(1rem,1.7vw,1.4rem)]"
              return (
                <li key={link.label} className="flex flex-1">
                  {link.href ? (
                    <Link
                      href={link.href}
                      className={`${row} group text-teal transition-colors duration-300 hover:bg-teal-50`}
                    >
                      {body}
                    </Link>
                  ) : (
                    <p className={`${row} text-ink`}>{body}</p>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
