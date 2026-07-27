import { MessageSquare } from "lucide-react"

import { hostStats, type Host } from "@/lib/listings"

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

  /* Summed from this host's own areas rather than typed out — see hostStats. */
  const { reviews, ratingAvg } = hostStats(host.name)
  const stats = [
    { label: "Bewertungen", value: String(reviews) },
    {
      label: "Sternebewertung",
      value: `${ratingAvg.toFixed(1).replace(".", ",")} / 5`,
    },
    { label: "Host seit", value: host.since },
  ]

  return (
    /*
      The Schraffur used to run at full strength across this whole band, which
      made everything sitting on it — including the framed heading — fight for
      legibility. It is now the soft variant over cream: still unmistakably the
      motif, no longer the loudest thing on the page.
    */
    <div className="hatch-soft relative overflow-hidden bg-cream py-[clamp(2.5rem,3.5vw,4rem)]">
      <div className="container-page">
        <h2 className="h-plain">Host dieser CoArea</h2>

        <div className="surface mt-7 grid items-center gap-8 px-6 py-8 shadow-[var(--shadow-md)] sm:px-8 lg:grid-cols-[auto_1fr_auto] md:gap-12">
          {/* avatar + identity */}
          <div className="flex flex-col items-center text-center">
            <span className="grid h-[clamp(4.5rem,5vw,5.5rem)] w-[clamp(4.5rem,5vw,5.5rem)] place-items-center rounded-full text-xl font-semibold text-white [background:var(--grad-teal)] shadow-[var(--shadow-md)]">
              {initials}
            </span>
            <p className="mt-4 font-semibold text-ink-900">{host.name}</p>
            <p className="text-sm text-muted-foreground">{host.age} Jahre alt</p>
          </div>

          {/* stat box */}
          <div className="mx-auto grid w-full max-w-md grid-cols-3 divide-x divide-border border border-border">
            {stats.map((s) => (
              <div key={s.label} className="px-3 py-4 text-center">
                <p className="text-[10px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                  {s.label}
                </p>
                <p className="mt-1.5 text-[1.0625rem] font-bold text-teal">{s.value}</p>
              </div>
            ))}
          </div>

          {/* get in touch */}
          <div className="text-center md:text-left">
            <p className="mx-auto max-w-[16rem] text-sm text-ink md:mx-0">
              Setze Dich mit Deinem Host in Verbindung!
            </p>
            {/*
              There is no chat yet, and a button that does nothing next to the
              words "get in touch" is the worst place to have one. Mail is the
              channel that genuinely works today.
            */}
            <a
              href={`mailto:info@coarea.de?subject=${encodeURIComponent(
                `Anfrage an Host ${host.name}`,
              )}`}
              className="btn btn-teal sheen mt-5 min-h-11 px-5 text-sm"
            >
              <MessageSquare className="h-4 w-4" />
              Nachricht an Host
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
