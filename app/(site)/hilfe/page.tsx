import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  CalendarCheck,
  CreditCard,
  Home,
  Mail,
  Phone,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react"

import { SITE } from "@/lib/site"
import { HELP_FAQ, HELP_GROUPS } from "@/lib/help-faq"
import { breadcrumbNode, faqNode, webPageNode } from "@/lib/schema"
import { JsonLd } from "@/components/seo/json-ld"
import { TabHeading } from "@/components/brand/tab-heading"
import { Reveal } from "@/components/brand/reveal"
import { FaqAccordion } from "@/components/listings/faq-accordion"

export const metadata: Metadata = {
  title: "Hilfe",
  description:
    "Antworten auf die häufigsten Fragen zu CoArea: Fläche finden, anfragen und buchen, Preise und Bezahlung, eigene Fläche anbieten, Sicherheit und Konto.",
}

const url = `${SITE.url}/hilfe`

/*
  An icon per topic group. Kept here rather than in lib/help-faq.ts so the
  content file stays free of anything that only matters for rendering.
*/
const ICONS: Record<string, typeof Search> = {
  finden: Search,
  buchen: CalendarCheck,
  bezahlen: CreditCard,
  inserieren: Home,
  sicherheit: ShieldCheck,
  konto: UserRound,
}

/*
  The help centre.

  It used to be six tiles that named a topic and answered none of it —
  „Zahlung: Preise, Abwicklung und Rechnungen verstehen" over a card that did
  not even respond to a click — followed by the booking FAQ, which covers one
  of those six. Three of the promises (invoices, verification, notification
  settings) describe things the product does not have at all.

  Every tile now leads to a group of real questions further down the page, and
  the questions are the ones somebody would actually type. Because the answers
  are visible, the page can carry FAQPage markup; because they are honest about
  what is only in preparation, it may.
*/
export default function HilfePage() {
  const { contact } = SITE
  return (
    <>
      <JsonLd
        graph={[
          webPageNode({
            url,
            name: "Hilfe und häufige Fragen",
            description: metadata.description as string,
          }),
          breadcrumbNode([{ name: "Hilfe", path: "/hilfe" }], url),
          faqNode(HELP_FAQ, url),
        ]}
      />

      <div className="container-page py-12 md:py-16">
        <Reveal>
          <TabHeading as="h1" className="text-[clamp(1.6rem,3vw+0.5rem,2.5rem)]">
            Wie können wir helfen?
          </TabHeading>
          <p className="mt-6 max-w-2xl text-[clamp(1rem,0.5vw+0.85rem,1.1875rem)]/[1.65] text-ink">
            Such Dir das Thema aus, um das es geht. Jede Frage darunter ist so
            beantwortet, wie es heute wirklich läuft: Was noch im Aufbau ist,
            steht als solches da. Kommst Du nicht weiter, sind wir persönlich
            für Dich da.
          </p>
        </Reveal>

        {/* Topics — anchors into the groups below */}
        <Reveal
          delay={90}
          className="mt-[clamp(2.5rem,4vw,4rem)] grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {HELP_GROUPS.map((g) => {
            const Icon = ICONS[g.id] ?? Search
            return (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="surface surface-hover group flex items-start gap-4 p-[clamp(1.25rem,1.8vw,1.75rem)]"
              >
                <span className="icon-plate icon-plate-hover">
                  <Icon strokeWidth={1.5} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 text-[1.0625rem] leading-tight font-semibold text-ink-900 transition-colors duration-300 group-hover:text-teal">
                    {g.title}
                    <ArrowRight
                      aria-hidden
                      className="h-4 w-4 shrink-0 text-teal transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                  <span className="mt-1.5 block text-[0.9375rem]/[1.55] text-ink">
                    {g.lead}
                  </span>
                  <span className="caps-xs mt-3 block text-teal">
                    {g.items.length} Fragen
                  </span>
                </span>
              </a>
            )
          })}
        </Reveal>

        {/* One block per topic */}
        {/*
          Title beside the questions, not above them.

          Stacked, each group was a framed heading over a 3xl column, which on a
          desktop left the right half of the screen empty for the whole length
          of the page and repeated the same frame six times down the left edge.
          Beside them the heading stays in view while its answers are read —
          which is what a help centre is for — and the page uses its width.
        */}
        {HELP_GROUPS.map((g) => (
          <section
            key={g.id}
            id={g.id}
            className="mt-[clamp(3rem,5vw,4.5rem)] grid scroll-mt-32 gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,17rem)_1fr]"
          >
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <h2 className="text-[clamp(1.3rem,1vw+1rem,1.75rem)]/[1.2] font-semibold text-ink-900">
                {g.title}
              </h2>
              <span aria-hidden className="mt-4 block h-[3px] w-12 bg-teal" />
              <p className="mt-4 text-[0.9375rem]/[1.6] text-ink">{g.lead}</p>
            </Reveal>
            <Reveal delay={80}>
              {/*
                One column: these answers run to four and five lines, and in two
                columns an opened panel leaves a hole the height of itself beside
                the question next to it.
              */}
              <FaqAccordion items={g.items} columns={1} />
            </Reveal>
          </section>
        ))}

        {/* Kontakt */}
        <Reveal delay={60} className="mt-[clamp(3.5rem,6vw,6rem)]">
          <div className="mesh mesh-dark grain relative isolate flex flex-col gap-8 overflow-hidden rounded-[var(--radius-lg)] [background:var(--grad-teal-deep)] p-8 text-white md:flex-row md:items-center md:justify-between md:p-12">
            <span aria-hidden className="hatch-white absolute inset-0 opacity-15" />
            <div className="relative">
              <TabHeading variant="white" className="text-[clamp(1.3rem,2vw+0.5rem,1.85rem)]">
                Deine Frage steht nicht dabei?
              </TabHeading>
              <p className="mt-5 max-w-md text-[1.0625rem]/[1.6] text-white/90">
                Dann schreib oder ruf uns an. Wir sind zu zweit und antworten
                selbst, meist noch am selben Tag.
              </p>
            </div>
            <div className="relative flex flex-wrap gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="btn min-h-12 bg-white px-6 py-3.5 text-[0.9375rem] text-teal shadow-[var(--shadow-sm)] hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" /> E-Mail
              </a>
              <a
                href={`tel:${contact.phoneHref}`}
                className="btn min-h-12 border-2 border-white/50 px-6 py-3.5 text-[0.9375rem] text-white transition-colors hover:bg-white hover:text-teal"
              >
                <Phone className="h-4 w-4" /> Anrufen
              </a>
              <Link
                href="/kontakt"
                className="btn min-h-12 border-2 border-white/50 px-6 py-3.5 text-[0.9375rem] text-white transition-colors hover:bg-white hover:text-teal"
              >
                Kontaktformular
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  )
}
