import type { Metadata } from "next"
import { Mail, Download, FileText } from "lucide-react"

import { SITE } from "@/lib/site"
import { TabHeading } from "@/components/brand/tab-heading"
import { Todo } from "@/components/layout/legal-shell"

export const metadata: Metadata = {
  title: "Presse",
  description:
    "Pressekontakt, Fakten und Materialien zu CoArea — der Plattform für gemeinschaftliche Flächennutzung.",
}

const FACTS = [
  { label: "Gegründet", value: <Todo>Gründungsjahr ergänzen</Todo> },
  { label: "Sitz", value: `${SITE.contact.city}, ${SITE.contact.country}` },
  { label: "Kategorie", value: "Marktplatz für ungenutzte Freiflächen" },
  { label: "Mission", value: "Teilen statt neu versiegeln" },
]

export default function PressePage() {
  const { contact } = SITE
  return (
    <div className="container-page py-12 md:py-16">
      <TabHeading as="h1" className="text-[clamp(1.6rem,3vw+0.5rem,2.5rem)]">
        Presse
      </TabHeading>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
        Du berichtest über nachhaltige Flächennutzung, Sharing Economy oder
        StartUps aus Köln? Hier findest Du Fakten, Zitate und Materialien rund um
        CoArea. Für Interviews und O-Töne sind wir gern für Dich da.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        {/* Fakten */}
        <div>
          <TabHeading as="h2" className="text-xl">
            CoArea in Kürze
          </TabHeading>
          <dl className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
            {FACTS.map((f) => (
              <div key={f.label} className="flex gap-6 px-6 py-4">
                <dt className="w-28 shrink-0 text-sm font-medium text-muted-foreground">
                  {f.label}
                </dt>
                <dd className="text-sm text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>

          <TabHeading as="h2" className="mt-12 text-xl">
            Pressematerial
          </TabHeading>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-card p-5 text-sm text-muted-foreground">
              <FileText className="h-5 w-5 shrink-0 text-teal" />
              <span>
                Logo-Paket &amp; Marken­richtlinien
                <br />
                <Todo>Download-Datei bereitstellen</Todo>
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-card p-5 text-sm text-muted-foreground">
              <Download className="h-5 w-5 shrink-0 text-teal" />
              <span>
                Bildmaterial &amp; Screenshots
                <br />
                <Todo>Download-Datei bereitstellen</Todo>
              </span>
            </div>
          </div>
        </div>

        {/* Pressekontakt */}
        <aside className="rounded-xl bg-teal p-7 text-white">
          <h2 className="text-lg font-semibold">Pressekontakt</h2>
          <p className="mt-2 text-sm text-white/85">
            Wir antworten in der Regel innerhalb eines Werktags.
          </p>
          <a
            href={`mailto:${contact.email}?subject=Presseanfrage`}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-teal transition-transform hover:-translate-y-0.5"
          >
            <Mail className="h-4 w-4" /> {contact.email}
          </a>
          <p className="mt-6 text-sm text-white/85">
            {SITE.legalName}
            <br />
            {contact.street}
            <br />
            {contact.zip} {contact.city}
          </p>
        </aside>
      </div>
    </div>
  )
}
