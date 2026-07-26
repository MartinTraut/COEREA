import type { Metadata } from "next"
import Link from "next/link"
import { Building2, Handshake, LineChart, ShieldCheck, ArrowRight } from "lucide-react"

import { SITE } from "@/lib/site"
import { TabHeading } from "@/components/brand/tab-heading"

export const metadata: Metadata = {
  title: "Businesspartner werden",
  description:
    "Kommunen, Unternehmen und Organisationen: Bringt eure Flächen auf CoArea und macht Leerstand produktiv.",
}

const PARTNERS = [
  { icon: Building2, title: "Kommunen & Städte", text: "Öffentliche Plätze, Sportanlagen und Grünflächen effizienter auslasten." },
  { icon: LineChart, title: "Unternehmen", text: "Ungenutzte Gewerbe-, Lager- und Parkflächen zu einer Einnahmequelle machen." },
  { icon: Handshake, title: "Vereine & Organisationen", text: "Flächen teilen, Gemeinschaft stärken und neue Zielgruppen erreichen." },
]

const REASONS = [
  { icon: LineChart, title: "Zusätzliche Erlöse", text: "Monetarisiere Flächen, die heute brachliegen — planbar und transparent." },
  { icon: ShieldCheck, title: "Sicher & geprüft", text: "Verifizierte Nutzer, klare Konditionen und abgesicherte Abwicklung." },
  { icon: Handshake, title: "Persönliche Betreuung", text: "Ein fester Ansprechpartner begleitet euch beim Onboarding und darüber hinaus." },
]

export default function BusinesspartnerPage() {
  const { contact } = SITE
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-teal text-white">
        <div className="hatch-white pointer-events-none absolute inset-0 opacity-15" aria-hidden />
        <div className="container-page relative py-16 md:py-24">
          <TabHeading as="h1" variant="white" className="text-[clamp(1.8rem,3.5vw+0.5rem,3rem)]">
            Aus Leerstand wird Mehrwert
          </TabHeading>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">
            Als Businesspartner bringt ihr eure Flächen auf CoArea — und macht sie
            für die Gemeinschaft nutzbar. Nachhaltig, planbar und mit persönlicher
            Betreuung.
          </p>
          <Link
            href="#kontakt"
            className="mt-8 btn min-h-11 bg-white px-6 py-3.5 text-sm text-teal shadow-[var(--shadow-sm)] hover:-translate-y-0.5"
          >
            Partner werden <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Für wen */}
      <section className="container-page py-16 md:py-20">
        <h2 className="h-plain">Für wen ist das gedacht?</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PARTNERS.map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-card p-7">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-teal">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Warum */}
      <section className="border-y border-border bg-card/60">
        <div className="container-page py-16 md:py-20">
          <h2 className="h-plain">Eure Vorteile</h2>
          <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {REASONS.map((r) => (
              <div key={r.title} className="flex flex-col gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-teal text-white">
                  <r.icon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold text-ink">{r.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" className="container-page py-16 md:py-20">
        <div className="flex flex-col items-start gap-6 rounded-2xl bg-teal p-8 text-white md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-lg">
            <TabHeading variant="white" className="text-[clamp(1.3rem,2vw+0.5rem,1.85rem)]">
              Lass uns sprechen
            </TabHeading>
            <p className="mt-4 text-white/90">
              Erzähl uns von euren Flächen — wir melden uns mit einem passenden
              Vorschlag. Unser Vertriebsteam berät euch unverbindlich.
            </p>
          </div>
          <a
            href={`mailto:${contact.email}?subject=Businesspartner werden`}
            className="btn min-h-11 bg-white px-6 py-3.5 text-sm text-teal shadow-[var(--shadow-sm)] hover:-translate-y-0.5"
          >
            {contact.email} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  )
}
