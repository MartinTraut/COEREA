import { MessageSquare } from "lucide-react"

import type { Host } from "@/lib/listings"
import { TabHeading } from "@/components/brand/tab-heading"

/*
  „Host dieser CoArea" — diagonal schraffur band with a flat white card inside:
  avatar + name/age · a 3-row stat box (Bewertungen / Sternebewertung / Host seit)
  · a get-in-touch column with the message CTA. Matches the Figma booking screens.
*/
export function HostCard({ host }: { host: Host }) {
  const initials = host.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)

  const stats = [
    { label: "Bewertungen", value: String(host.reviews) },
    {
      label: "Sternebewertung",
      value: `${host.ratingAvg.toFixed(1).replace(".", ",")} / 5`,
    },
    { label: "Host seit", value: host.since },
  ]

  return (
    <div className="hatch relative overflow-hidden py-8 md:py-12">
      <div className="container-page">
        <TabHeading className="bg-cream text-[clamp(1.15rem,1.6vw+0.5rem,1.6rem)]">
          Host dieser CoArea
        </TabHeading>

        <div className="mt-6 grid items-center gap-8 border border-border bg-card px-6 py-8 sm:px-8 md:grid-cols-[auto_1fr_auto] md:gap-12">
          {/* avatar + identity */}
          <div className="flex flex-col items-center text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-teal text-xl font-semibold text-white">
              {initials}
            </span>
            <p className="mt-3 font-semibold text-ink">{host.name}</p>
            <p className="text-sm text-ink/60">{host.age} Jahre alt</p>
          </div>

          {/* stat box */}
          <div className="mx-auto w-full max-w-sm border border-border">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={i > 0 ? "border-t border-border" : undefined}
              >
                <div className="px-4 py-3 text-center">
                  <p className="text-sm font-medium text-teal">{s.label}</p>
                  <p className="text-sm text-ink">{s.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* get in touch */}
          <div className="text-center md:text-left">
            <p className="mx-auto max-w-[16rem] text-sm text-ink/80 md:mx-0">
              Setze Dich mit Deinem Host in Verbindung!
            </p>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-2 bg-teal px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
            >
              <MessageSquare className="h-4 w-4" />
              Nachricht an Host
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
