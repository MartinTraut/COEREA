import type { Metadata } from "next"
import Link from "next/link"
import Image, { type StaticImageData } from "next/image"
import { ArrowRight } from "lucide-react"

/*
  Imported rather than referenced by path, so the build knows each file's real
  width and height — see the note on <Photo>.
*/
import heroPhoto from "@/public/images/ueberuns-hero-3.jpg"
import missionPhoto from "@/public/images/ueberuns-mission.jpg"
import visionPhoto from "@/public/images/ueberuns-vision.jpg"

import { cn } from "@/lib/utils"
import { SERVICE_FEE_RATE } from "@/lib/pricing"
import { TabHeading } from "@/components/brand/tab-heading"
import { Benefits } from "@/components/home/benefits"
import { Testimonials } from "@/components/home/testimonials"
import { Newsletter } from "@/components/home/newsletter"

export const metadata: Metadata = {
  alternates: { canonical: "/ueber-uns" },
  title: "Über uns",
  description:
    "CoArea: die Revolution der Flächennutzung. Unsere Mission, unsere Vision und die Menschen dahinter.",
}

/*
  Photo frame using the design's own photography.

  Two modes, and the difference is who decides the proportion.

  Passing an imported image lets the FRAME follow the FILE: Next reads the real
  width and height at build time, the frame takes exactly that ratio, and
  nothing is cropped or letterboxed — whatever the file happens to be. The three
  landscape photos here run between 1,65:1 and 2:1, so a single fixed frame
  could only fit one of them; the other two were being cut (the Mission photo
  lost a quarter of its height to a 4:3 box).

  Passing a path plus an aspect class is the opposite deal: the frame is fixed
  and the photo is cropped to fill it. That is right where the shape matters
  more than the photo — the two founder portraits, which have to be the same
  square next to each other.
*/
function Photo({
  src,
  alt = "",
  className,
  sizes,
}: {
  src: string | StaticImageData
  alt?: string
  className?: string
  sizes?: string
}) {
  const intrinsic = typeof src !== "string"
  return (
    <div
      className={cn(
        "media-zoom relative overflow-hidden rounded-[var(--radius)] border border-border",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        {...(intrinsic ? {} : { fill: true })}
        sizes={sizes ?? "(max-width: 1024px) 100vw, 50vw"}
        className={intrinsic ? "h-auto w-full" : "object-cover"}
      />
    </div>
  )
}

/*
  The same three figures the Kosten block on /host-werden states, kept in sync
  through SERVICE_FEE_RATE rather than typed out a second time. Nothing here is
  a promise the prototype cannot keep: the fee is what `lib/pricing` adds, and
  the payout line says plainly that no platform payment exists yet.
*/
const HOST_FACTS = [
  {
    label: "Inserat einstellen",
    value: "kostenlos",
    note: "Keine Grundgebühr, keine Laufzeit, keine Mindestdauer.",
  },
  {
    label: "Servicegebühr",
    value: `${Math.round(SERVICE_FEE_RATE * 100)} %`,
    note: "Trägt die mietende Person zusätzlich. Dein Preis kommt ungeschmälert bei Dir an.",
  },
  {
    label: "Du entscheidest",
    value: "jede Anfrage",
    note: "Zeitraum, Preis und Regeln legst Du selbst fest.",
  },
]

const FOUNDERS = [
  {
    role: "Digital Architect",
    name: "Leonard Thomas",
    credential: "Master of Science — M.Sc., Architektur",
    image: "/images/founder-leonard.jpg",
  },
  {
    role: "Projektentwickler",
    name: "Rudolf Traut",
    credential: "Master of Science — M.Sc., Architektur",
    image: "/images/founder-rudolf.jpg",
  },
]

export default function UeberUnsPage() {
  return (
    <>
      <div className="container-page py-10 md:py-16">
        <TabHeading as="h1" className="text-[clamp(1.6rem,3vw+0.5rem,2.5rem)]">
          Über uns
        </TabHeading>

        {/*
          Intro.

          The text column used to be the wider of the two (1,15fr against 1fr).
          That made sense while the photo was a tall 16:10 block; at its real
          2:1 it is only half as high as the paragraph beside it, and a wide
          column of body copy next to a small picture is what reads as
          unbalanced. The ratio is now inverted: the photo leads, the text runs
          at a proper reading measure instead of filling whatever is left.
        */}
        <div className="mt-8 grid gap-[clamp(2rem,3.5vw,4rem)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
          <div>
            <h2 className="text-xl font-semibold text-teal">
              CoArea: die Revolution der Flächennutzung
            </h2>
            <p className="mt-4 max-w-[46ch] leading-relaxed text-ink">
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
            src={heroPhoto}
            alt="Gemeinsames Fest auf einer CoArea-Fläche"
          />
        </div>

        {/* Founders */}
        <section className="mt-16">
          <h2 className="h-plain">Die Gründer von CoArea</h2>
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
                <p className="text-sm text-ink">{f.credential}</p>
              </div>
            ))}
          </div>

          <blockquote className="mx-auto mt-10 max-w-2xl rounded-[var(--radius)] border border-teal/60 bg-teal/[0.04] px-8 py-7 text-center text-[clamp(1.1rem,1.6vw+0.5rem,1.5rem)] leading-snug font-semibold text-teal text-balance">
            „Kreativ, smart und innovativ: Mit CoArea erschaffen wir unbeachtete
            Flächenpotenziale
            neu.“
          </blockquote>
        </section>

        {/* Mission */}
        <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <h2 className="h-plain">Unsere Mission</h2>
            <div className="mt-6 max-w-[60ch] space-y-4 text-[0.9375rem]/[1.7] text-ink">
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
          <Photo src={missionPhoto} alt="Belebter Stadtraum mit Grünflächen" />
        </section>

        {/* Vision */}
        <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Photo
            src={visionPhoto}
            alt="Luftaufnahme einer gewachsenen Gemeinde"
            className="lg:order-1"
          />
          <div className="lg:order-2">
            <h2 className="h-plain">Unsere Vision</h2>
            <p className="mt-6 max-w-[60ch] text-[0.9375rem]/[1.7] text-ink">
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

      {/*
        CTA band.

        Two things were wrong with it. The Schraffur ran across the full band at
        20% — together with the newsletter strip and the footer that made three
        hatched teal blocks stacked on top of each other, and the drawing stopped
        reading as a motif and started reading as noise (client, 2026-07-28:
        „zu viele Linien, im Footer ist gut"). It survives here as a top edge
        that dissolves, which is enough to tie the band to the footer; the
        footer keeps the full-strength version.

        And the claim sat alone in the left half of a 1520px column, so half the
        band was empty teal. The three facts that decide whether anybody clicks
        „Fläche inserieren" — what it costs, who pays the fee, who decides — now
        occupy the other half. They are the same numbers the booking calculates,
        not new promises.
      */}
      <section className="mesh mesh-dark grain relative isolate overflow-hidden [background:var(--grad-teal-deep)] text-white">
        <span
          aria-hidden
          className="hatch-white absolute inset-x-0 top-0 h-48 opacity-25 [mask-image:linear-gradient(to_bottom,black_0,transparent_100%)]"
        />
        <div className="relative container-page grid gap-[clamp(2rem,3.5vw,4rem)] py-[clamp(3rem,5vw,5.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
          <div>
            <p className="max-w-[26ch] text-[clamp(1.3rem,2vw+0.5rem,2rem)] leading-snug font-semibold text-balance">
              Du hast eine leerstehende Fläche und weißt nicht, was Du mit ihr
              anfangen sollst? Dann teile sie mit der Community.
            </p>
            <Link
              href="/host-werden"
              className="btn group mt-8 bg-white px-7 py-3.5 text-[15px] text-teal shadow-[var(--shadow-md)] hover:-translate-y-0.5"
            >
              Fläche inserieren
              <span className="arrow-nudge inline-flex">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          <ul className="grid gap-px overflow-hidden rounded-[var(--radius)] bg-white/20 ring-1 ring-white/20">
            {HOST_FACTS.map((f) => (
              <li
                key={f.label}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1 bg-teal-900/40 px-5 py-4 backdrop-blur-[2px]"
              >
                <span className="text-[0.9375rem] font-semibold text-white">{f.label}</span>
                <span className="ml-auto text-[0.9375rem] font-bold text-white tabular-nums">
                  {f.value}
                </span>
                <span className="w-full text-[13px]/[1.5] text-white/75">{f.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </>
  )
}
