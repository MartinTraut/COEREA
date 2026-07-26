import type { Metadata } from "next"
import Link from "next/link"
import { TrendingUp, Recycle, Users, Sparkles, ArrowRight } from "lucide-react"

import { TabHeading } from "@/components/brand/tab-heading"

export const metadata: Metadata = {
  title: "Host werden",
  description:
    "Verwandle Deine ungenutzte Fläche in Einnahmen und einen Beitrag zur Nachhaltigkeit. Werde Host bei CoArea und teile Deine Fläche mit der Community.",
}

const HOST_BENEFITS = [
  { icon: TrendingUp, title: "Einnahmen generieren", text: "Verdiene mit Flächen, die sonst ungenutzt bleiben." },
  { icon: Recycle, title: "Leerstand sinnvoll nutzen", text: "Gib Deiner Fläche einen Zweck — nachhaltig und effizient." },
  { icon: Users, title: "Teil einer Bewegung", text: "Verbinde Menschen und stärke die Gemeinschaft vor Ort." },
  { icon: Sparkles, title: "Einfach & unkompliziert", text: "In wenigen Schritten inseriert — den Rest übernehmen wir." },
]

const STEPS = [
  { n: "1", title: "Fläche inserieren", text: "Beschreibe Deine Fläche, lade Fotos hoch und lege Deinen Preis fest." },
  { n: "2", title: "Anfragen erhalten", text: "Interessenten senden Dir Buchungsanfragen — Du entscheidest." },
  { n: "3", title: "Teilen & verdienen", text: "Bestätige die Buchung, teile Deine Fläche und erhalte Deine Einnahmen." },
]

export default function HostWerdenPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-teal text-white">
        <div className="hatch-white pointer-events-none absolute inset-0 opacity-15" aria-hidden />
        <div className="container-page relative py-16 md:py-24">
          <TabHeading as="h1" variant="white" className="text-[clamp(1.8rem,3.5vw+0.5rem,3rem)]">
            Deine Fläche kann mehr!
          </TabHeading>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">
            Du hast eine leerstehende Fläche und weißt nicht, was Du mit ihr anfangen
            sollst? Dann lade sie noch heute bei CoArea hoch und teile sie mit der
            Community — nachhaltig, einfach und mit echtem Mehrwert.
          </p>
          <Link
            href="/anmelden"
            className="mt-8 btn min-h-11 bg-white px-6 py-3.5 text-sm text-teal shadow-[var(--shadow-sm)] hover:-translate-y-0.5"
          >
            Fläche inserieren
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="container-page py-16 md:py-20">
        <h2 className="h-plain">Deine Vorteile als Host</h2>
        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {HOST_BENEFITS.map((b) => (
            <div key={b.title} className="flex flex-col gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-teal">
                <b.icon className="h-5 w-5" />
              </span>
              <h3 className="text-base font-semibold text-ink">{b.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="container-page pb-20">
        <h2 className="h-plain">So funktioniert&apos;s</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-xl border border-border bg-card p-7">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-teal text-lg font-bold text-white">
                {s.n}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
