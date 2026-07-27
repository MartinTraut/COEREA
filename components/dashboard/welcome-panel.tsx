import Image from "next/image"
import Link from "next/link"

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

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
          {/* profile + key figures */}
          <div className="grid gap-8 bg-white p-8 sm:grid-cols-[200px_1fr] sm:items-center lg:p-10">
            <div className="flex flex-col items-center text-center">
              <Image
                src={HOST_PROFILE.image}
                alt={HOST_PROFILE.name}
                width={200}
                height={200}
                className="h-[200px] w-[200px] rounded-full object-cover"
              />
              <p className="mt-5 text-[19px] leading-snug text-ink">
                {HOST_PROFILE.name}
                <br />
                {HOST_PROFILE.age} Jahre alt
              </p>
              {/* Was a link to /dashboard, i.e. to this very page. There is no
                  profile editor yet, so it says so rather than pretending. */}
              <p
                title="Profil bearbeiten folgt"
                className="mt-5 text-[19px] text-ink/70"
              >
                bearbeiten folgt
              </p>
            </div>

            <dl className="flex flex-col gap-5">
              {[
                { term: "Bewertungen", value: String(HOST_PROFILE.reviews) },
                { term: "Sternebewertung", value: `${HOST_PROFILE.ratingAvg} / 5` },
                { term: "Du bist Host seit", value: HOST_PROFILE.since },
              ].map((row) => (
                <div
                  key={row.term}
                  className="rounded-[var(--radius)] border-2 border-teal/70 bg-teal/[0.04] px-6 py-5 text-center"
                >
                  <dt className="text-[19px] text-teal">{row.term}</dt>
                  <dd className="mt-1.5 text-[17px] text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* quick access */}
          <ul className="flex flex-col gap-5">
            {/*
              These areas have no page behind them yet. Rather than four tiles
              that look clickable and reload the dashboard, the ones without a
              target are plain panels — the count badge still tells the host what
              is waiting.
            */}
            {QUICK_LINKS.map((link) => {
              const body = (
                <>
                  {link.count ? (
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold text-sm font-semibold text-ink">
                      +{link.count}
                    </span>
                  ) : null}
                  {link.label}
                </>
              )
              const surface =
                "flex items-center gap-4 bg-white px-7 py-6 text-[19px] shadow-[0_2px_10px_-6px_rgba(41,41,42,0.35)]"
              return (
                <li key={link.label}>
                  {link.href ? (
                    <Link
                      href={link.href}
                      className={`${surface} text-teal transition-shadow hover:shadow-[0_10px_28px_-16px_rgba(41,41,42,0.5)]`}
                    >
                      {body}
                    </Link>
                  ) : (
                    <p title="Dieser Bereich folgt" className={`${surface} text-ink`}>
                      {body}
                    </p>
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
