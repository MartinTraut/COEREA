import Link from "next/link"
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react"

import { SITE } from "@/lib/site"
import { ContactForm } from "@/components/contact/contact-form"
import { Reveal } from "@/components/brand/reveal"

export function GetInTouch() {
  const { contact } = SITE
  return (
    <section className="mesh relative isolate overflow-hidden bg-cream">
      {/*
        The site plan returns for the closing section, mirrored: in the hero it
        is anchored to the top and dissolves downward, here it is anchored to the
        bottom and dissolves upward, so the page opens and closes on the same
        substrate and hands over to the footer instead of stopping on flat cream.
        A different crop of the same drawing (bg-bottom) keeps it from reading as
        the hero image pasted twice.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 select-none bg-[url(/images/hero-map.png)] bg-cover bg-bottom bg-no-repeat opacity-70 [mask-image:linear-gradient(to_top,black_0%,black_34%,transparent_86%)]"
      />
      <div className="relative container-page grid gap-[clamp(2.5rem,4vw,4.5rem)] py-[clamp(2.75rem,3.6vw,4.25rem)] lg:grid-cols-2 lg:items-start">
        {/* Closing section, and it was the only one on the page that arrived
            without a reveal — the motion systematics broke exactly at the end. */}
        <Reveal>
          <span className="eyebrow">Host-Support</span>
          <h2 className="h-plain mt-4">Get in Touch</h2>
          {/*
            Original wording from the design, restored. The paraphrase that was
            here read more tightly but it was not the client's copy, and this
            section exists in the source frames — where copy exists, it wins.
          */}
          <p className="mt-7 max-w-md text-[clamp(1.0625rem,0.5vw+0.8rem,1.375rem)]/[1.5] font-medium text-ink-900">
            Erfahrene Beratung für optimale Nutzung unserer Flächen.
          </p>
          <p className="mt-4 max-w-md text-[0.9375rem]/[1.7] text-muted-foreground">
            Brauchst Du Hilfe beim Anbieten Deiner Fläche oder möchtest Du als
            Host gerne mehr über Deine vielfältigen Möglichkeiten erfahren?
            Lasse Dich von unserem hilfsbereiten Host-Support beraten.
          </p>

          <Link
            href="/kontakt"
            className="btn btn-teal sheen group mt-7 h-12 px-6 text-sm"
          >
            jetzt beraten lassen
            <span className="arrow-nudge inline-flex">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          {/*
            Three contact tiles. The two that lead somewhere (mail, phone) are
            links and lift on hover; the address is not a link, so it is a plain
            tile — an identical-looking box that does nothing on click is worse
            than an obviously static one.
          */}
          {/*
            These tiles were white cards outlined in --border on the cream band:
            #ededed against #f6f6f6 is 1.04:1, and the fill itself is 1.05:1. So
            neither the edge nor the surface separated from the ground and the
            tiles read as three loose stacks of text floating on the section.
            That is what "sodass es ein bisschen ersichtlicher wird" is pointing
            at, and it is a contrast problem, not a decoration problem.

            `.surface-on-cream` gives them a teal-tinted edge and a resting
            shadow. The two that lead somewhere additionally carry a teal spine
            on the left; the address does not, because a tile that looks
            identical and does nothing on click is worse than an obviously
            static one.
          */}
          <ul className="mt-9 grid gap-3 sm:grid-cols-3">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="surface surface-on-cream surface-hover group flex h-full flex-col gap-2.5 border-l-[3px] border-l-teal p-4"
              >
                <span className="icon-plate icon-plate-sm icon-plate-hover">
                  <Mail strokeWidth={1.5} />
                </span>
                <span className="caps text-muted-foreground">E-Mail</span>
                <span className="text-sm font-medium break-words text-ink-900">
                  {contact.email}
                </span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${contact.phoneHref}`}
                className="surface surface-on-cream surface-hover group flex h-full flex-col gap-2.5 border-l-[3px] border-l-teal p-4"
              >
                <span className="icon-plate icon-plate-sm icon-plate-hover">
                  <Phone strokeWidth={1.5} />
                </span>
                <span className="caps text-muted-foreground">Telefon</span>
                <span className="text-sm font-medium text-ink-900">{contact.phone}</span>
              </a>
            </li>
            <li className="surface surface-on-cream flex flex-col gap-2.5 p-4">
              <span className="icon-plate icon-plate-sm">
                <MapPin strokeWidth={1.5} />
              </span>
              <span className="caps text-muted-foreground">Adresse</span>
              <span className="text-sm font-medium text-ink-900">
                {contact.street}, {contact.zip} {contact.city}
              </span>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={100}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
