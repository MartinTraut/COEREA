import { Quote, ChevronLeft, ChevronRight } from "lucide-react"

import type { Listing } from "@/lib/listings"
import { LISTINGS, otherListingsByHost } from "@/lib/listings"
import { TabHeading } from "@/components/brand/tab-heading"
import { ListingCard } from "@/components/listings/listing-card"
import { HostCard } from "@/components/listings/host-card"
import { FaqAccordion } from "@/components/listings/faq-accordion"

const USER_REVIEWS = [
  {
    title: "Buchung ging super schnell",
    body: "Alles super. Buchung ging schnell und der Austausch mit dem Host war auch unkompliziert. Ich wollte mir mehr Wissen aneignen, wie man Lamas züchtet und richtig hält, ohne dafür ein Vermögen ausgeben zu müssen. Mein Host hat mir dabei geholfen und CoArea hat mich unterstützt, dass ich für meine Lamas Wassertränke organisiere und die Fläche anständig umzäunt ist. Gerne wieder!",
    role: "User",
    name: "Dennis P",
  },
  {
    title: "Mein persönliches Stück Paradies",
    body: "Ich bin begeistert von meinem angemieteten Garten, einem wahr gewordenen Traum mit einer Vielzahl von Pflanzen, Bäumen und Blumen. Ein grüner Rückzugsort, perfekt zum Anbauen von Gemüse und Kräutern und zur Entspannung in meiner grünen Oase. Absolut empfehlenswert, auch für mich ohne grünen Daumen!",
    role: "User",
    name: "Lisa-Marie B",
  },
]

/*
  The recurring lower half of every booking screen (detail, summary, success):
  the host band, the host's other listings, user reviews and the booking FAQ.
  Kept in one place so all three screens stay in sync.
*/
export function DetailSections({ listing }: { listing: Listing }) {
  // The host's own other listings; if the host has few, top up with other
  // areas so the row never looks broken — but the host's come first.
  const own = otherListingsByHost(listing.host.name, listing.slug)
  const fill = LISTINGS.filter(
    (l) => l.slug !== listing.slug && l.host.name !== listing.host.name,
  )
  const others = [...own, ...fill].slice(0, 4)

  return (
    <>
      {/* Host band (full-bleed schraffur) */}
      <section className="mt-14">
        <HostCard host={listing.host} />
      </section>

      <div className="container-page">
        {/* Other listings from host */}
        <section className="mt-14">
          <TabHeading className="text-[clamp(1.25rem,2vw+0.5rem,1.75rem)]">
            Weitere inserierte Flächen vom Host
          </TabHeading>
          <div className="mt-8 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((l) => (
              <ListingCard key={l.slug} listing={l} />
            ))}
          </div>
        </section>

        {/* User reviews */}
        <section className="mt-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <TabHeading className="text-[clamp(1.25rem,2vw+0.5rem,1.75rem)]">
              Das sagen unsere User
            </TabHeading>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="bg-teal px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
              >
                Alle Bewertungen
              </button>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Vorherige"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border text-teal transition-colors hover:bg-teal/10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Nächste"
                  className="grid h-10 w-10 place-items-center rounded-full bg-teal text-white transition-colors hover:bg-teal-600"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {USER_REVIEWS.map((r) => (
              <figure key={r.name} className="flex flex-col border border-border bg-card p-7">
                <Quote className="h-7 w-7 text-teal/30" aria-hidden />
                <figcaption className="mt-3 font-semibold text-teal">{r.title}</figcaption>
                <blockquote className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-ink/80">
                  {r.body}
                </blockquote>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <span>
                    <span className="block text-xs font-medium text-teal">{r.role}</span>
                    <span className="font-semibold text-ink">{r.name}</span>
                  </span>
                  <span className="flex gap-0.5 text-[#e6b84f]" aria-label="5 von 5 Sternen">
                    {"★★★★★"}
                  </span>
                </div>
              </figure>
            ))}
          </div>
        </section>

        {/* Booking FAQ */}
        <section className="mt-16 mb-4">
          <TabHeading className="text-[clamp(1.25rem,2vw+0.5rem,1.75rem)]">
            FAQ zu Deiner Buchung
          </TabHeading>
          <div className="mt-8">
            <FaqAccordion />
          </div>
        </section>
      </div>
    </>
  )
}
