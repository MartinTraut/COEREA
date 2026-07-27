import { Quote, Star } from "lucide-react"

import type { Listing } from "@/lib/listings"
import { LISTINGS, otherListingsByHost } from "@/lib/listings"
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

/** Which of the four blocks a screen wants. */
export type DetailSection = "host" | "more" | "reviews" | "faq"

/*
  The recurring lower half of every booking screen (detail, summary, success):
  the host band, the host's other listings, user reviews and the booking FAQ.
  Kept in one place so all three screens stay in sync.

  All three screens used to render all four blocks, so walking from an area
  through the booking summary to the confirmation showed the same host band,
  the same four cards, the same two reviews and the same ten-question accordion
  three times over — and on `/buchen` that pushed the one thing the visitor came
  to do far up the page. Each screen now asks for the blocks that help at that
  step: everything on the detail page, the FAQ where doubts actually arise, and
  "what next" after the request is sent.
*/
export function DetailSections({
  listing,
  only,
}: {
  listing: Listing
  only?: readonly DetailSection[]
}) {
  const show = (s: DetailSection) => !only || only.includes(s)
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
      {show("host") && (
        <section className="mt-14">
          <HostCard host={listing.host} />
        </section>
      )}

      <div className="container-page">
        {/* Other listings from host */}
        {show("more") && (
          <section className="mt-14">
            <h2 className="h-plain">Weitere inserierte Flächen vom Host</h2>
            <div className="mt-8 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((l) => (
                <ListingCard key={l.slug} listing={l} />
              ))}
            </div>
          </section>
        )}

        {/* User reviews */}
        {show("reviews") && (
        <section className="mt-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="h-plain">Das sagen unsere User</h2>
            {/*
              Both reviews are rendered directly below and there is no reviews
              page to page through, so the "alle Bewertungen" button and the two
              arrows were controls with nothing behind them. The rating summary
              says more in the same space.
            */}
            <p className="text-sm text-ink">
              <span className="font-semibold text-teal">
                {listing.rating.toFixed(1).replace(".", ",")} / 5
              </span>{" "}
              aus {listing.reviews} Bewertungen
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {USER_REVIEWS.map((r) => (
              <figure
                key={r.name}
                className="surface surface-hover flex flex-col p-[clamp(1.5rem,2vw,2.25rem)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] [background:var(--grad-teal-bright)]"
                />
                <Quote className="h-8 w-8 fill-gold text-gold" strokeWidth={1.5} aria-hidden />
                <figcaption className="mt-4 text-[1.0625rem] font-semibold text-ink-900">
                  {r.title}
                </figcaption>
                <blockquote className="mt-3 flex-1 text-[0.9375rem]/[1.7] text-ink">
                  {r.body}
                </blockquote>
                <div className="mt-7 flex items-center justify-between border-t border-teal/15 pt-5">
                  <span>
                    <span className="block text-[11px] font-semibold tracking-[0.12em] text-teal uppercase">
                      {r.role}
                    </span>
                    <span className="text-[1.0625rem] font-semibold text-ink-900">
                      {r.name}
                    </span>
                  </span>
                  <span className="flex gap-0.5" aria-label="5 von 5 Sternen">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-gold text-gold" aria-hidden />
                    ))}
                  </span>
                </div>
              </figure>
            ))}
          </div>
        </section>
        )}

        {/* Booking FAQ */}
        {show("faq") && (
          <section className="mt-16 mb-4">
            <h2 className="h-plain">FAQ zu Deiner Buchung</h2>
            <div className="mt-8">
              <FaqAccordion />
            </div>
          </section>
        )}
      </div>
    </>
  )
}
