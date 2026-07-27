import { Quote, Star } from "lucide-react"

import type { Listing } from "@/lib/listings"
import { LISTINGS, otherListingsByHost } from "@/lib/listings"
import { Reveal } from "@/components/brand/reveal"
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
          {/*
            The section used to open with a heading and a one-line rating in
            8pt grey at the far right — the single hardest fact here, set as
            the quietest thing on the row. It is now a block: the figure at
            display size, the stars it stands for, and the count underneath.
            Somebody scanning the page reads the score without reading a word.
          */}
          <Reveal className="flex flex-wrap items-end justify-between gap-x-6 gap-y-5">
            <div>
              <span className="eyebrow">Bewertungen</span>
              <h2 className="h-plain mt-4">Das sagen unsere User</h2>
            </div>
            <div className="flex items-center gap-4 rounded-[var(--radius)] bg-cream px-5 py-3.5">
              <span className="text-[2rem] leading-none font-bold text-teal tabular-nums">
                {listing.rating.toFixed(1).replace(".", ",")}
              </span>
              <span>
                <span
                  className="stars-pop flex gap-0.5"
                  aria-label={`${listing.rating.toFixed(1).replace(".", ",")} von 5 Sternen`}
                >
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-gold text-gold" aria-hidden />
                  ))}
                </span>
                <span className="mt-1.5 block text-xs text-ink">
                  aus {listing.reviews} Bewertungen
                </span>
              </span>
            </div>
          </Reveal>

          {/*
            One reveal around the pair, not one per card: two cards at the same
            height read as a single row, and staggering them makes the row
            arrive crooked.

            The cards themselves were pull-quotes — a gold quote mark, a
            headline, the text, and the person hidden in a footer under a rule.
            A review is read the other way round: who said it, how they rated
            it, then what they said. So the person comes first, with initials
            standing in for a photo we do not have, and the score sits on the
            same line instead of at the bottom of the card.
          */}
          <Reveal delay={110} className="mt-[clamp(1.75rem,2.4vw,2.5rem)] grid gap-6 md:grid-cols-2">
            {USER_REVIEWS.map((r) => (
              <figure
                key={r.name}
                className="surface surface-hover group flex flex-col overflow-hidden p-[clamp(1.5rem,2vw,2.25rem)]"
              >
                {/*
                  Oversized quote glyph as a watermark rather than an icon in
                  the flow: it gives the card a diagonal to sit against, and
                  because it is behind the text it cannot push anything around.
                  Gold at 14% — visible as a shape, never as a mark to read.
                */}
                <Quote
                  aria-hidden
                  strokeWidth={1.25}
                  className="pointer-events-none absolute -right-7 -bottom-8 h-28 w-28 rotate-6 fill-gold/[0.12] text-transparent transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />

                <div className="relative flex items-center gap-3.5">
                  <span
                    aria-hidden
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal-50 text-sm font-semibold text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white"
                  >
                    {r.name
                      .split(" ")
                      .map((p) => p.charAt(0))
                      .join("")}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[1.0625rem] leading-tight font-semibold text-ink-900">
                      {r.name}
                    </span>
                    <span className="caps mt-1 block text-teal">{r.role}</span>
                  </span>
                  <span
                    className="stars-pop ms-auto flex shrink-0 gap-0.5"
                    aria-label="5 von 5 Sternen"
                  >
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-gold text-gold" aria-hidden />
                    ))}
                  </span>
                </div>

                <figcaption className="relative mt-6 text-[clamp(1.0625rem,0.5vw+0.85rem,1.1875rem)]/[1.35] font-semibold text-balance text-ink-900">
                  {r.title}
                </figcaption>
                <blockquote className="relative mt-3 flex-1 text-[0.9375rem]/[1.7] text-ink">
                  {r.body}
                </blockquote>
              </figure>
            ))}
          </Reveal>
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
