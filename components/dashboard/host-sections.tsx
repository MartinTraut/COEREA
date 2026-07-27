import Image from "next/image"
import Link from "next/link"
import { Mail, MessageSquare, Phone, Quote, Star } from "lucide-react"

import { HOST_REVIEWS, HOST_SUPPORT, LISTED_AREA_SLUGS } from "@/lib/dashboard"
import { listingBySlug } from "@/lib/listings"
import { Carousel } from "@/components/brand/carousel"
import { Reveal } from "@/components/brand/reveal"
import { TabHeading } from "@/components/brand/tab-heading"
import { ListingCard } from "@/components/listings/listing-card"

/** Section header with a teal action button. The arrows come from `Carousel`. */
function SectionHead({
  title,
  action,
  href,
}: {
  title: string
  /** Omitted where there is no page to send the visitor to yet. */
  action?: string
  href?: string
}) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <h2 className="h-plain">{title}</h2>
      {action && href ? (
        <Link
          href={href}
          className="btn btn-teal sheen px-8 py-4 text-[17px]"
        >
          {action}
        </Link>
      ) : null}
    </div>
  )
}

export function PotenzialBand() {
  return (
    <section className="grid lg:grid-cols-2">
      <div className="mesh mesh-dark relative isolate flex flex-col justify-center overflow-hidden [background:var(--grad-teal-deep)] px-6 py-16 sm:px-12 lg:py-20 lg:pr-16 lg:pl-[max(1.25rem,calc((100vw-1520px)/2))]">
        <TabHeading variant="solid" className="text-[clamp(1.5rem,1.7vw+0.6rem,2.4rem)]/[1.15]">
          Deine Fläche kann mehr!
        </TabHeading>
        <p className="mt-8 max-w-[520px] text-[clamp(1.4rem,1.3vw+0.6rem,2rem)]/[1.25] font-semibold text-white">
          Steigere den Wert Deiner CoArea mit einem Potenzial-Check.
        </p>
        <Link
          href="/kontakt"
          className="btn mt-9 w-fit bg-white px-7 py-3.5 text-[17px] text-teal shadow-[var(--shadow-md)] hover:-translate-y-0.5"
        >
          jetzt beraten lassen
        </Link>
      </div>
      <div className="relative min-h-[280px] lg:min-h-[536px]">
        <Image
          src="/images/dashboard-potenzial-luftbild.jpg"
          alt="Luftbild eines Quartiers mit ungenutzten Flächen"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </section>
  )
}

export function ListedAreas() {
  const items = LISTED_AREA_SLUGS.map((s) => listingBySlug(s)).filter(
    (l): l is NonNullable<typeof l> => Boolean(l),
  )

  return (
    <section id="inserierte-flaechen" className="container-page py-14 lg:py-20">
      <Carousel
        header={
          <SectionHead
            title="Deine inserierten Flächen"
            action="alle anzeigen"
            href="/flaechen"
          />
        }
      >
        {items.map((l) => (
          <ListingCard key={l.slug} listing={l} />
        ))}
      </Carousel>
    </section>
  )
}

export function ContactPerson() {
  /*
    "Chat Nachricht" pointed at /dashboard — this page. There is no chat, so it
    has no href and renders as a static row; mail and phone are real and stay
    links. `href` is optional for exactly that reason.
  */
  const rows: {
    icon: typeof Mail
    label: string
    value?: string
    href?: string
  }[] = [
    { icon: MessageSquare, label: "Chat Nachricht (folgt)" },
    { icon: Mail, label: "E-Mail", value: HOST_SUPPORT.email, href: `mailto:${HOST_SUPPORT.email}` },
    { icon: Phone, label: "Telefon", value: HOST_SUPPORT.phone, href: `tel:${HOST_SUPPORT.phoneHref}` },
  ]

  return (
    <section className="hatch-soft bg-cream py-14 lg:py-20">
      <div className="container-page">
        <h2 className="h-plain">Deine Ansprechperson</h2>

        <div className="surface mt-10 grid items-center gap-10 p-8 shadow-[var(--shadow-md)] lg:grid-cols-[260px_1fr_1fr] lg:p-12">
          <div className="flex flex-col items-center text-center">
            <Image
              src={HOST_SUPPORT.image}
              alt={HOST_SUPPORT.name}
              width={200}
              height={200}
              className="h-[200px] w-[200px] rounded-full object-cover"
            />
            <p className="mt-5 text-[19px] text-ink">{HOST_SUPPORT.name}</p>
            <p className="mt-1 text-[17px] font-semibold text-teal">
              {HOST_SUPPORT.role}
            </p>
          </div>

          <ul className="flex flex-col gap-5">
            {rows.map(({ icon: Icon, label, value, href }) => {
              const body = (
                <>
                  <Icon
                    className="h-8 w-8 shrink-0 text-teal transition-colors group-hover:text-white"
                    strokeWidth={1.5}
                  />
                  <span className="flex-1 text-center">
                    <span className="block text-[19px] font-medium text-teal transition-colors group-hover:text-white">
                      {label}
                    </span>
                    {value ? (
                      <span className="mt-1 block text-[17px] text-ink transition-colors group-hover:text-white/90">
                        {value}
                      </span>
                    ) : null}
                  </span>
                </>
              )
              return (
                <li key={label}>
                  {href ? (
                    <Link
                      href={href}
                      className="group flex items-center gap-6 rounded-[var(--radius)] border-2 border-teal/70 px-6 py-4 transition-colors duration-300 hover:bg-teal hover:text-white"
                    >
                      {body}
                    </Link>
                  ) : (
                    <p
                      title="Chat folgt"
                      className="flex items-center gap-6 rounded-[var(--radius)] border-2 border-teal/40 px-6 py-4"
                    >
                      {body}
                    </p>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="text-center">
            <p className="text-[19px] leading-snug text-ink">
              Biete Deinen Usern mehr mit
              <br />
              Hilfe unserer Service Leistungen!
            </p>
            <Link
              href="/kontakt"
              className="btn btn-teal sheen mt-7 px-8 py-4 text-[17px]"
            >
              mehr erfahren
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function InsertCta() {
  return (
    <section className="mesh mesh-dark grain relative isolate overflow-hidden [background:var(--grad-teal-deep)] py-16 lg:py-24">
      <span aria-hidden className="hatch-white absolute inset-0 opacity-20" />
      <div className="relative container-page">
        <p className="max-w-[820px] text-[clamp(1.5rem,1.7vw+0.6rem,2.4rem)]/[1.25] font-semibold text-white">
          Du hast eine leerstehende Fläche und weißt nicht was Du mit ihr anfangen
          sollst? Dann lade noch heute deine CoArea hoch und teile sie mit der
          Community!
        </p>
        <Link
          href="/host-werden"
          className="btn mt-9 bg-white px-7 py-3.5 text-[17px] text-teal shadow-[var(--shadow-md)] hover:-translate-y-0.5"
        >
          Fläche inserieren
        </Link>
      </div>
    </section>
  )
}

export function HostReviews() {
  return (
    <section className="bg-cream py-14 lg:py-20">
      <div className="container-page">
        {/* Both reviews are shown right below, so there is nowhere for an
            "alle anzeigen" action to lead until there are more of them. */}
        <SectionHead title="Deine Bewertungen" />

        <Reveal delay={90} className="mt-14 grid gap-10 lg:grid-cols-2">
          {HOST_REVIEWS.map((r) => (
            /*
              Same card as the reviews on a listing page — who wrote it and how
              they rated it first, the text after, and the quote glyph as a
              gold watermark in the corner rather than as two bars sitting on
              top of the headline.
            */
            <figure
              key={r.title}
              className="surface surface-on-cream surface-hover group flex flex-col overflow-hidden p-8 lg:p-10"
            >
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
                  {r.author
                    .split(" ")
                    .map((p) => p.charAt(0))
                    .join("")}
                </span>
                <span className="min-w-0">
                  <span className="block text-[1.0625rem] leading-tight font-semibold text-ink-900">
                    {r.author}
                  </span>
                  <span className="caps mt-1 block text-teal">{r.role}</span>
                </span>
                <span className="stars-pop ms-auto flex shrink-0 gap-0.5" aria-label="5 von 5 Sternen">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-gold text-gold" aria-hidden />
                  ))}
                </span>
              </div>

              <figcaption className="relative mt-6 text-[clamp(1.0625rem,0.5vw+0.85rem,1.25rem)]/[1.35] font-semibold text-balance text-ink-900">
                {r.title}
              </figcaption>
              <blockquote className="relative mt-3 text-[clamp(0.9375rem,0.4vw+0.8rem,1.0625rem)]/[1.7] text-ink">
                {r.body}
              </blockquote>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
