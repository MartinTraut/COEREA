import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  BadgeEuro,
  CalendarCheck,
  Handshake,
  Recycle,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react"

import { SITE } from "@/lib/site"
import { HELP_GROUPS } from "@/lib/help-faq"
import { SERVICE_FEE_RATE } from "@/lib/pricing"
import { breadcrumbNode, faqNode, webPageNode } from "@/lib/schema"
import { JsonLd } from "@/components/seo/json-ld"
import { TabHeading } from "@/components/brand/tab-heading"
import { Reveal } from "@/components/brand/reveal"
import { FaqAccordion } from "@/components/listings/faq-accordion"

export const metadata: Metadata = {
  title: "Host werden",
  description:
    "Biete Deine ungenutzte Fläche auf CoArea an: kostenlos einstellen, Preis und Regeln selbst bestimmen, jede Anfrage einzeln entscheiden. Schwerpunkt NRW und Rheinland.",
  alternates: { canonical: "/host-werden" },
}

const url = `${SITE.url}/host-werden`
const FEE = Math.round(SERVICE_FEE_RATE * 100)

const HOST_BENEFITS = [
  {
    icon: TrendingUp,
    title: "Einnahmen aus Leerstand",
    text: "Eine Fläche, die ohnehin daliegt, trägt sich selbst. Den Preis bestimmst Du.",
  },
  {
    icon: ShieldCheck,
    title: "Du entscheidest jede Anfrage",
    text: "Keine automatische Buchung. Du siehst Zeitraum und Vorhaben und sagst zu oder ab.",
  },
  {
    icon: Recycle,
    title: "Fläche statt Neubau",
    text: "Was mitgenutzt wird, muss nicht neu erschlossen und versiegelt werden.",
  },
  {
    icon: Users,
    title: "Nachbarschaft statt Zaun",
    text: "Vereine, Initiativen und Familien aus der Umgebung, nicht anonyme Kundschaft.",
  },
]

/*
  Three steps that describe what actually happens.

  They used to promise things the product does not do: „In wenigen Schritten
  inseriert. Den Rest übernehmen wir." — there is no rest that anybody takes
  over — and „erhalte Deine Einnahmen", which implies a payout that does not
  exist. Each step now says who does what, and where CoArea is not yet in the
  loop, it says so.
*/
const STEPS = [
  {
    icon: Sparkles,
    n: "1",
    title: "Fläche beschreiben",
    text: "Ort, Größe, Fotos, Preis und die Regeln, die Dir wichtig sind: was erlaubt ist, wie viele Personen kommen dürfen, in welchen Zeiträumen die Fläche frei ist.",
  },
  {
    icon: CalendarCheck,
    n: "2",
    title: "Anfragen prüfen",
    text: "Interessenten schicken eine unverbindliche Anfrage mit Zeitraum und Vorhaben. Du kannst vorher Fragen stellen und entscheidest über jede Anfrage einzeln.",
  },
  {
    icon: Handshake,
    n: "3",
    title: "Zusagen und übergeben",
    text: "Mit Deiner Bestätigung wird die Buchung verbindlich. Zugang, Übergabe und Zahlung stimmst Du direkt mit Deinem Gast ab; eine Abwicklung über CoArea ist in Vorbereitung.",
  },
]

/* The costs, straight from what the booking actually calculates. */
const COSTS = [
  {
    label: "Inserat einstellen",
    value: "kostenlos",
    note: "Keine Grundgebühr, keine Laufzeit, keine Mindestdauer.",
  },
  {
    label: "Deine Provision",
    value: "0 %",
    note: "Von Deinem Preis geht nichts ab. Unser Anteil steckt im Mietpreis, den wir daraus errechnen.",
  },
  {
    label: "Auszahlung",
    value: "direkt",
    note: "Du rechnest derzeit unmittelbar mit Deinem Gast ab. Eine Zahlung über die Plattform wird gerade aufgebaut.",
  },
]

const hostFaq = HELP_GROUPS.find((g) => g.id === "inserieren")?.items ?? []

export default function HostWerdenPage() {
  return (
    <div>
      <JsonLd
        graph={[
          webPageNode({
            url,
            name: "Host werden",
            description: metadata.description as string,
            hasBreadcrumb: true,
          }),
          breadcrumbNode([{ name: "Host werden", path: "/host-werden" }], url),
          faqNode(hostFaq, url),
        ]}
      />

      {/* Hero */}
      <section className="mesh mesh-dark grain relative isolate overflow-hidden [background:var(--grad-teal-deep)] text-white">
        <div className="hatch-white pointer-events-none absolute inset-0 opacity-15" aria-hidden />
        <div className="relative container-page py-16 md:py-24">
          <TabHeading as="h1" variant="white" className="text-[clamp(1.8rem,3.5vw+0.5rem,3rem)]">
            Deine Fläche kann mehr!
          </TabHeading>
          <p className="mt-6 max-w-xl text-[clamp(1.0625rem,0.6vw+0.9rem,1.25rem)]/[1.6] text-white/90">
            Ein Hinterhof, eine Wiese, ein Stück Brache: Was bei Dir ungenutzt
            liegt, brauchen andere in Deiner Nähe dringend. Du bestimmst Preis,
            Zeitraum und Regeln, und Du entscheidest über jede Anfrage selbst.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            {/*
              This said „Fläche inserieren" and led to the login, from there into
              a demo dashboard, and from there back here — a circle. There is no
              listing form yet, and this was the only missing area on the whole
              site that did not admit it. It now says what really happens next.
            */}
            <Link
              href="/kontakt?thema=flaeche-anbieten"
              className="btn min-h-12 bg-white px-7 py-3.5 text-[0.9375rem] text-teal shadow-[var(--shadow-md)] hover:-translate-y-0.5"
            >
              Fläche anmelden
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="max-w-sm text-[0.875rem]/[1.5] text-white/75">
              Das Formular zum Selbstanlegen kommt noch. Bis dahin nehmen wir
              Deine Fläche persönlich auf, meist innerhalb eines Tages.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container-page py-16 md:py-20">
        <Reveal>
          <span className="eyebrow">Warum überhaupt</span>
          <h2 className="h-plain mt-4">Deine Vorteile als Host</h2>
        </Reveal>
        <Reveal delay={90} className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {HOST_BENEFITS.map((b) => (
            <div key={b.title} className="group flex flex-col gap-3">
              <span className="icon-plate icon-plate-hover">
                <b.icon strokeWidth={1.5} />
              </span>
              <h3 className="text-[clamp(1.0625rem,0.5vw+0.9rem,1.1875rem)]/[1.3] font-semibold text-ink-900">
                {b.title}
              </h3>
              <p className="text-[0.9375rem]/[1.6] text-ink">{b.text}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Steps */}
      <section className="hatch-soft bg-cream py-16 md:py-20">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow">Der Ablauf</span>
            <h2 className="h-plain mt-4">Von der Fläche zur ersten Buchung</h2>
          </Reveal>
          <Reveal delay={90} className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="surface surface-on-cream surface-hover group flex flex-col p-[clamp(1.5rem,2.2vw,2.25rem)]"
              >
                <div className="flex items-center gap-3">
                  <span className="icon-plate icon-plate-solid icon-plate-hover">
                    <s.icon strokeWidth={1.5} />
                  </span>
                  <span className="caps text-teal">Schritt {s.n}</span>
                </div>
                <h3 className="mt-5 text-[clamp(1.0625rem,0.55vw+0.9rem,1.25rem)]/[1.3] font-semibold text-ink-900">
                  {s.title}
                </h3>
                <p className="mt-3 text-[0.9375rem]/[1.65] text-ink">{s.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/*
        Costs.

        A landowner decides about money on this page and found not one word
        about it — no commission, no fee, no payout — while the platform does
        charge a service fee at booking. Everything here is what the booking
        summary actually calculates.
      */}
      <section className="container-page py-16 md:py-20">
        <Reveal>
          <span className="eyebrow">Kosten</span>
          <h2 className="h-plain mt-4">Was kostet Dich das?</h2>
          <p className="mt-4 max-w-2xl text-[clamp(1rem,0.4vw+0.9rem,1.0625rem)]/[1.65] text-ink">
            Kurz: nichts. Weder für das Inserat noch für eine Buchung. Die mietende
            Person, nicht Du.
          </p>
        </Reveal>
        <Reveal delay={90} className="mt-10 grid gap-5 md:grid-cols-3">
          {COSTS.map((c) => (
            <div key={c.label} className="surface flex flex-col p-[clamp(1.5rem,2.2vw,2.25rem)]">
              <span className="caps text-teal">{c.label}</span>
              <span className="mt-3 text-[clamp(1.75rem,1.6vw+1.1rem,2.5rem)] leading-none font-bold text-ink-900 tabular-nums">
                {c.value}
              </span>
              <p className="mt-4 text-[0.9375rem]/[1.6] text-ink">{c.note}</p>
            </div>
          ))}
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-8 flex items-start gap-3 text-[0.9375rem]/[1.6] text-ink">
            <BadgeEuro aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-teal" strokeWidth={1.5} />
            <span>
              Beispiel: Du möchtest 220 € pro Tag verdienen. Ausgeschrieben wird
              die Fläche für 244 € pro Tag — darin sind unsere {FEE} % und die
              Umsatzsteuer darauf schon enthalten. Bei Dir kommen die vollen
              220 € pro Tag an.
            </span>
          </p>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="container-page pb-20">
        <Reveal>
          <span className="eyebrow">Häufige Fragen</span>
          <h2 className="h-plain mt-4">Was Eigentümer uns am häufigsten fragen</h2>
        </Reveal>
        <Reveal delay={90} className="mt-8 max-w-3xl">
          <FaqAccordion items={hostFaq} columns={1} />
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-8 text-[0.9375rem]/[1.6] text-ink">
            Mehr Antworten stehen im{" "}
            <Link href="/hilfe#inserieren" className="font-semibold text-teal hover:underline">
              Hilfe-Bereich
            </Link>
            . Oder Du{" "}
            <Link href="/kontakt" className="font-semibold text-teal hover:underline">
              fragst uns direkt
            </Link>
            .
          </p>
        </Reveal>
      </section>
    </div>
  )
}
