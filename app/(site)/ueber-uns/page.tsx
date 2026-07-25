import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { TabHeading } from "@/components/brand/tab-heading"
import { Benefits } from "@/components/home/benefits"
import { Testimonials } from "@/components/home/testimonials"
import { Newsletter } from "@/components/home/newsletter"

export const metadata: Metadata = {
  title: "Über Uns",
  description:
    "CoArea — die Revolution der Flächennutzung. Unsere Mission, unsere Vision und die Menschen dahinter.",
}

/* Photo frame using the design's own photography. */
function Photo({
  src,
  alt = "",
  className,
  sizes,
}: {
  src: string
  alt?: string
  className?: string
  sizes?: string
}) {
  return (
    <div className={cn("relative overflow-hidden border border-border", className)}>
      <Image src={src} alt={alt} fill sizes={sizes ?? "(max-width: 1024px) 100vw, 50vw"} className="object-cover" />
    </div>
  )
}

const FOUNDERS = [
  {
    role: "Digital Architect",
    name: "Leonard Thomas",
    credential: "Master of Science - MS, Architektur",
    image: "/images/founder-leonard.jpg",
  },
  {
    role: "Projektentwickler",
    name: "Rudolf Traut",
    credential: "Master of Science - MS, Architektur",
    image: "/images/founder-rudolf.jpg",
  },
]

export default function UeberUnsPage() {
  return (
    <>
      <div className="container-page py-10 md:py-16">
        <TabHeading as="h1" className="text-[clamp(1.6rem,3vw+0.5rem,2.5rem)]">
          Über Uns
        </TabHeading>

        {/* Intro */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <h2 className="text-xl font-semibold text-teal">
              CoArea — die Revolution der Flächennutzung
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-ink/85">
              CoArea ist eine Plattform, die es Menschen ermöglicht, ihre ungenutzten
              Flächen wie beispielsweise Gärten, Parkplätze oder Veranstaltungsräume mit
              anderen Menschen zu teilen. Dieses Konzept der gemeinsamen Nutzung ist
              nachhaltig, da es dazu beiträgt, die begrenzten Ressourcen unserer Umwelt
              besser zu nutzen. Statt dass jeder einzelne seine eigenen Flächen besitzt
              und nutzt, können durch den Teilhabe-Gedanken auf CoArea Ressourcen und
              Flächen effizienter und sinnvoller genutzt werden.
            </p>
          </div>
          <Photo
            src="/images/ueberuns-hero.jpg"
            alt="Gemeinsames Fest auf einer CoArea-Fläche"
            className="aspect-[16/10]"
          />
        </div>

        {/* Founders */}
        <section className="mt-16">
          <TabHeading className="text-[clamp(1.4rem,2vw+0.5rem,2rem)]">
            Die Gründer von CoArea
          </TabHeading>
          <div className="mx-auto mt-8 grid max-w-2xl gap-8 sm:grid-cols-2">
            {FOUNDERS.map((f) => (
              <div key={f.name}>
                <Photo
                  src={f.image}
                  alt={f.name}
                  sizes="(max-width: 640px) 100vw, 300px"
                  className="aspect-square"
                />
                <p className="mt-3 text-sm font-medium text-teal">{f.role}</p>
                <p className="font-semibold text-ink">{f.name}</p>
                <p className="text-sm text-ink/70">{f.credential}</p>
              </div>
            ))}
          </div>

          <blockquote className="mx-auto mt-10 max-w-2xl border border-teal px-6 py-5 text-center text-[clamp(1.1rem,1.6vw+0.5rem,1.5rem)] leading-snug font-semibold text-teal text-balance">
            „Kreativ, smart und innovativ — Mit CoArea erschaffen wir unbeachtete
            Flächenpotenziale
            neu.&quot;
          </blockquote>
        </section>

        {/* Mission */}
        <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <TabHeading className="text-[clamp(1.4rem,2vw+0.5rem,2rem)]">
              Unsere Mission
            </TabHeading>
            <div className="mt-6 space-y-4 leading-relaxed text-ink/85">
              <p>
                Bei CoArea ist unsere Mission klar: Wir wollen eine Plattform schaffen,
                auf der Gemeinschaften, Organisationen und Einzelpersonen zusammenkommen,
                um Freiflächen optimal zu nutzen, zu teilen und zu gestalten. Dabei
                streben wir eine Win-Win-Situation an, die sowohl den Nutzern als auch
                den Anbietern der Flächen Vorteile bringt.
              </p>
              <p>
                Unsere Mission besteht darin, eine Community aufzubauen, die sich für
                gemeinsame Werte und Ziele engagiert. Gemeinsam mit unserer vielfältigen
                Gemeinschaft streben wir danach, die Art und Weise zu revolutionieren, wie
                wir Freiflächen nutzen und teilen. Wir laden jeden herzlich ein, Teil
                dieser Bewegung zu werden und gemeinsam eine nachhaltigere und
                lebenswertere Zukunft zu gestalten.
              </p>
            </div>
          </div>
          <Photo
            src="/images/ueberuns-mission.jpg"
            alt="Belebter Stadtraum mit Grünflächen"
            className="aspect-[4/3]"
          />
        </section>

        {/* Vision */}
        <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Photo
            src="/images/ueberuns-vision.jpg"
            alt="Luftaufnahme einer gewachsenen Gemeinde"
            className="aspect-[4/3] lg:order-1"
          />
          <div className="lg:order-2">
            <TabHeading className="text-[clamp(1.4rem,2vw+0.5rem,2rem)]">
              Unsere Vision
            </TabHeading>
            <p className="mt-6 leading-relaxed text-ink/85">
              Unsere Vision bietet eine Welt, in der Freiflächen optimal genutzt und
              geschützt werden, um nachhaltige und blühende Gemeinschaften zu schaffen.
              Wir glauben daran, dass gemeinsame Ressourcen die Grundlage für eine
              nachhaltige Zukunft sind. Durch die kooperative Nutzung von Freiflächen
              können wir nicht nur effizienter mit begrenzten Ressourcen umgehen, sondern
              auch die soziale Interaktion und den Zusammenhalt in Gemeinschaften stärken.
            </p>
          </div>
        </section>
      </div>

      {/* Deine Vorteile mit CoArea */}
      <Benefits />

      {/* Das sagen unsere Hosts & User */}
      <Testimonials />

      {/* CTA band */}
      <section className="bg-teal text-white">
        <div className="container-page py-14 md:py-16">
          <p className="max-w-3xl text-[clamp(1.3rem,2vw+0.5rem,2rem)] leading-snug font-semibold text-balance">
            Du hast eine leerstehende Fläche und weißt nicht was Du mit ihr anfangen
            sollst? Dann lade noch heute deine CoArea hoch und teile sie mit der
            Community!
          </p>
          <Link
            href="/host-werden"
            className="mt-7 inline-flex items-center bg-white px-6 py-3 text-sm font-semibold text-teal transition-colors hover:bg-white/90"
          >
            Fläche inserieren
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </>
  )
}
