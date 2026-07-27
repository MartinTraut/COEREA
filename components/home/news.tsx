import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Reveal } from "@/components/brand/reveal"

/*
  The three teasers from the design. There are no articles or posts behind them
  yet, and the CTAs used to be href="#" — a link that jumps to the top of the
  page reads as broken. Each now points at the page that genuinely covers the
  subject, and the section says openly that the magazine is still to come.
*/
const NEWS = [
  {
    tag: "News",
    title: "Urban Gardening boomt — unsere Tipps und Tricks für einen grünen Daumen",
    cta: "Flächen ansehen",
    href: "/flaechen/kategorie/private-gaerten",
    image: "/images/news-urban-gardening.jpg",
  },
  {
    tag: "Community",
    title:
      "Kaarst: Fußball-Verein Weißenberger 04 startet Charity-Event für Kinder in Not",
    cta: "Sportflächen ansehen",
    href: "/flaechen/kategorie/oeffentlicher-sport",
    image: "/images/news-fussball.jpg",
  },
  {
    tag: "Standpunkt",
    title: "Urbanisierung der Stadt — wo setzen wir an?",
    cta: "Unsere Mission",
    href: "/ueber-uns",
    image: "/images/news-urbanisierung.jpg",
  },
]

export function News() {
  return (
    <section className="container-page py-[clamp(2.75rem,3.6vw,4.25rem)]">
      <Reveal>
        <span className="eyebrow">Aus dem Magazin</span>
        <h2 className="h-plain mt-4">Aktuelle News</h2>
        <hr className="rule-fade mt-[clamp(1.25rem,1.8vw,2rem)]" />
      </Reveal>

      <div className="mt-[clamp(1.75rem,2.6vw,3rem)] grid gap-[clamp(1.25rem,1.8vw,2rem)] md:grid-cols-3">
        {NEWS.map((n, i) => (
          <Reveal key={n.title} delay={i * 80} className="h-full">
            <article className="surface surface-hover group flex h-full flex-col overflow-hidden">
              <Link
                href={n.href}
                tabIndex={-1}
                aria-hidden
                className="media-zoom relative block aspect-[16/10] overflow-hidden"
              >
                <Image
                  src={n.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                {/* The tag sits on the image, flush into the corner. */}
                <span className="absolute top-3 left-3 rounded-[var(--radius-control)] bg-teal/95 px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] text-white uppercase backdrop-blur-sm">
                  {n.tag}
                </span>
              </Link>
              <div className="flex flex-1 flex-col gap-4 p-[clamp(1.125rem,1.4vw,1.5rem)]">
                <h3 className="flex-1 text-[clamp(0.9375rem,0.35vw+0.8rem,1.125rem)]/[1.4] font-semibold text-ink-900 transition-colors duration-200 group-hover:text-teal">
                  {n.title}
                </h3>
                <Link
                  href={n.href}
                  className="arrow-nudge inline-flex w-fit items-center gap-2 border-t border-teal/20 pt-4 text-sm font-semibold text-teal"
                >
                  {n.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-sm text-ink">
        Das CoArea-Magazin mit eigenen Beiträgen startet in Kürze.
      </p>
    </section>
  )
}
