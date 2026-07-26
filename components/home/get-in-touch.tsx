import { Mail, Phone, MapPin } from "lucide-react"

import { SITE } from "@/lib/site"
import { ContactForm } from "@/components/contact/contact-form"

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
        <div>
          <span className="eyebrow">Host-Support</span>
          <h2 className="h-plain mt-4">Get in Touch</h2>
          <p className="mt-7 max-w-md text-[clamp(1.0625rem,0.5vw+0.8rem,1.375rem)]/[1.5] font-medium text-ink-900">
            Erfahrene Beratung für die optimale Nutzung Deiner Flächen.
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Du brauchst Hilfe beim Anbieten Deiner Fläche oder möchtest als Host
            mehr aus Deinen Möglichkeiten herausholen? Lass Dich von unserem
            Host-Support beraten.
          </p>

          {/*
            Three contact tiles. The two that lead somewhere (mail, phone) are
            links and lift on hover; the address is not a link, so it is a plain
            tile — an identical-looking box that does nothing on click is worse
            than an obviously static one.
          */}
          <ul className="mt-9 grid gap-3 sm:grid-cols-3">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="surface surface-hover group flex h-full flex-col gap-2 p-4"
              >
                <span className="grid h-9 w-9 place-items-center bg-teal-50 text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                  <Mail className="h-4 w-4" />
                </span>
                <span className="text-[11px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                  E-Mail
                </span>
                <span className="text-sm font-medium break-words text-ink-900">
                  {contact.email}
                </span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${contact.phoneHref}`}
                className="surface surface-hover group flex h-full flex-col gap-2 p-4"
              >
                <span className="grid h-9 w-9 place-items-center bg-teal-50 text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                  <Phone className="h-4 w-4" />
                </span>
                <span className="text-[11px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                  Telefon
                </span>
                <span className="text-sm font-medium text-ink-900">{contact.phone}</span>
              </a>
            </li>
            <li className="surface flex flex-col gap-2 p-4">
              <span className="grid h-9 w-9 place-items-center bg-teal-50 text-teal">
                <MapPin className="h-4 w-4" />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                Adresse
              </span>
              <span className="text-sm font-medium text-ink-900">
                {contact.street}, {contact.zip} {contact.city}
              </span>
            </li>
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}
