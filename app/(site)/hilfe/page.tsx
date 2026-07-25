import type { Metadata } from "next"
import Link from "next/link"
import { Search, CalendarCheck, Home, CreditCard, ShieldCheck, MessageCircle, Mail, Phone } from "lucide-react"

import { SITE } from "@/lib/site"
import { TabHeading } from "@/components/brand/tab-heading"
import { FaqAccordion } from "@/components/listings/faq-accordion"

export const metadata: Metadata = {
  title: "Hilfe",
  description:
    "Antworten auf häufige Fragen rund um Buchung, Inserieren, Zahlung und Sicherheit bei CoArea.",
}

const TOPICS = [
  { icon: Search, title: "Flächen finden", text: "Suchen, filtern und die passende Fläche entdecken." },
  { icon: CalendarCheck, title: "Buchen", text: "Anfrage stellen, bestätigen und Nutzung abstimmen." },
  { icon: Home, title: "Inserieren", text: "Eigene Fläche einstellen und verwalten." },
  { icon: CreditCard, title: "Zahlung", text: "Preise, Abwicklung und Rechnungen verstehen." },
  { icon: ShieldCheck, title: "Sicherheit", text: "Verifizierung, Vertrauen und Konfliktlösung." },
  { icon: MessageCircle, title: "Konto", text: "Profil, Einstellungen und Benachrichtigungen." },
]

export default function HilfePage() {
  const { contact } = SITE
  return (
    <div className="container-page py-12 md:py-16">
      <TabHeading as="h1" className="text-[clamp(1.6rem,3vw+0.5rem,2.5rem)]">
        Wie können wir helfen?
      </TabHeading>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
        Hier findest Du Antworten auf die häufigsten Fragen. Ist Deine Frage nicht
        dabei? Unser Team ist persönlich für Dich da.
      </p>

      {/* Themen */}
      <section className="mt-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t) => (
            <div
              key={t.title}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-6"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-teal">
                <t.icon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-base font-semibold text-ink">{t.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-16">
        <TabHeading as="h2" className="text-[clamp(1.4rem,2vw+0.5rem,2rem)]">
          Häufige Fragen
        </TabHeading>
        <div className="mt-8 max-w-3xl">
          <FaqAccordion />
        </div>
      </section>

      {/* Kontakt */}
      <section className="mt-16">
        <div className="flex flex-col gap-6 rounded-2xl bg-teal p-8 text-white md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <TabHeading variant="white" className="text-[clamp(1.3rem,2vw+0.5rem,1.85rem)]">
              Noch Fragen?
            </TabHeading>
            <p className="mt-4 max-w-md text-white/90">
              Schreib oder ruf uns an — wir helfen Dir schnell und persönlich weiter.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-teal transition-transform hover:-translate-y-0.5"
            >
              <Mail className="h-4 w-4" /> E-Mail
            </a>
            <a
              href={`tel:${contact.phoneHref}`}
              className="inline-flex items-center gap-2 rounded-md border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-teal"
            >
              <Phone className="h-4 w-4" /> Anrufen
            </a>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-md border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-teal"
            >
              Kontaktformular
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
