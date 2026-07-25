import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { TabHeading } from "@/components/brand/tab-heading"

const NEWS = [
  {
    tag: "News",
    title: "Urban Gardening boomt — unsere Tipps und Tricks für einen grünen Daumen",
    cta: "Artikel lesen",
    image: "/images/news-urban-gardening.jpg",
  },
  {
    tag: "Instagram",
    title:
      "Kaarst: Fußball-Verein Weißenberger 04 startet Charity-Event für Kinder in Not",
    cta: "zum Posting",
    image: "/images/news-fussball.jpg",
  },
  {
    tag: "LinkedIn",
    title: "Urbanisierung der Stadt — wo setzen wir an?",
    cta: "zum Posting",
    image: "/images/news-urbanisierung.jpg",
  },
]

export function News() {
  return (
    <section className="container-page py-16 md:py-20">
      <TabHeading className="text-[clamp(1.4rem,2vw+0.5rem,2rem)]">
        Aktuelle News
      </TabHeading>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {NEWS.map((n) => (
          <article
            key={n.title}
            className="flex flex-col overflow-hidden border border-border bg-card"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={n.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-xs font-semibold tracking-wide text-teal uppercase">
                {n.tag}
              </span>
              <h3 className="flex-1 text-[0.95rem] leading-snug font-semibold text-ink">
                {n.title}
              </h3>
              <a
                href="#"
                className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:gap-2.5"
              >
                {n.cta}
                <ArrowRight className="h-4 w-4 transition-all" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
