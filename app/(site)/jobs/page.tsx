import type { Metadata } from "next"
import Link from "next/link"
import { Heart, Sprout, Users, Rocket, ArrowRight, MapPin } from "lucide-react"

import { SITE } from "@/lib/site"
import { TabHeading } from "@/components/brand/tab-heading"

export const metadata: Metadata = {
  title: "Jobs",
  description:
    "Werde Teil von CoArea und gestalte die Zukunft der Flächennutzung mit. Offene Stellen und Initiativbewerbung.",
}

const VALUES = [
  { icon: Sprout, title: "Sinn", text: "Wir machen ungenutzte Flächen produktiv — jeder Tag zahlt auf mehr Nachhaltigkeit ein." },
  { icon: Users, title: "Gemeinschaft", text: "Flache Hierarchien, echtes Miteinander und Vertrauen statt Mikromanagement." },
  { icon: Rocket, title: "Gestaltung", text: "Frühe Phase, viel Verantwortung — Du prägst Produkt und Marke aktiv mit." },
  { icon: Heart, title: "Balance", text: "Flexibles Arbeiten, faire Bedingungen und Raum für Deine Entwicklung." },
]

// Offene Stellen werden gepflegt, sobald konkrete Vakanzen feststehen (TODO).
const OPENINGS: { title: string; type: string; location: string }[] = []

export default function JobsPage() {
  const { contact } = SITE
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-teal text-white">
        <div className="hatch-white pointer-events-none absolute inset-0 opacity-15" aria-hidden />
        <div className="container-page relative py-16 md:py-24">
          <TabHeading as="h1" variant="white" className="text-[clamp(1.8rem,3.5vw+0.5rem,3rem)]">
            Arbeite an etwas, das bleibt
          </TabHeading>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">
            Wir bauen die Plattform, die ungenutzte Flächen in gemeinsam genutzten
            Lebensraum verwandelt. Dafür suchen wir Menschen, die mitdenken,
            mitgestalten und etwas bewegen wollen.
          </p>
        </div>
      </section>

      {/* Werte */}
      <section className="container-page py-16 md:py-20">
        <h2 className="h-plain">Warum CoArea</h2>
        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.title} className="flex flex-col gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-teal">
                <v.icon className="h-5 w-5" />
              </span>
              <h3 className="text-base font-semibold text-ink">{v.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Offene Stellen */}
      <section className="container-page pb-20">
        <h2 className="h-plain">Offene Stellen</h2>

        {OPENINGS.length > 0 ? (
          <ul className="mt-8 space-y-4">
            {OPENINGS.map((job) => (
              <li
                key={job.title}
                className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-ink">{job.title}</h3>
                  <p className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{job.type}</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {job.location}
                    </span>
                  </p>
                </div>
                <Link
                  href={`mailto:${contact.email}?subject=Bewerbung: ${job.title}`}
                  className="btn btn-teal sheen px-5 py-2.5 text-sm"
                >
                  Jetzt bewerben <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-xl border border-dashed border-border bg-card p-8 text-center">
            <p className="text-ink">
              Aktuell sind keine Stellen ausgeschrieben — aber wir wachsen. Überzeuge
              uns mit einer Initiativbewerbung.
            </p>
          </div>
        )}

        {/* Initiativbewerbung */}
        <div className="mt-8 flex flex-col items-start gap-4 rounded-xl bg-teal p-8 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold">Keine passende Stelle dabei?</h3>
            <p className="mt-1 text-sm text-white/85">
              Schreib uns, wie Du CoArea voranbringen willst.
            </p>
          </div>
          <Link
            href={`mailto:${contact.email}?subject=Initiativbewerbung`}
            className="btn min-h-11 bg-white px-6 py-3 text-sm text-teal shadow-[var(--shadow-sm)] hover:-translate-y-0.5"
          >
            Initiativ bewerben <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
