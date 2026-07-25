import type { Metadata } from "next"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

import { SITE } from "@/lib/site"
import { TabHeading } from "@/components/brand/tab-heading"
import { ContactForm } from "@/components/contact/contact-form"

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktiere CoArea — per E-Mail, Telefon oder über unser Kontaktformular. Wir beraten Dich gern zur optimalen Nutzung Deiner Flächen.",
}

export default function KontaktPage() {
  const { contact } = SITE
  return (
    <div className="container-page py-12 md:py-16">
      <TabHeading as="h1" className="text-[clamp(1.6rem,3vw+0.5rem,2.5rem)]">
        Kontakt
      </TabHeading>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div>
          <p className="max-w-md text-lg leading-relaxed text-ink/80">
            Du hast Fragen zu einer Fläche, möchtest Host werden oder brauchst
            Beratung? Wir sind für Dich da.
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-teal">
                <Mail className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs font-medium text-muted-foreground">
                  E-Mail
                </span>
                <a href={`mailto:${contact.email}`} className="font-medium text-ink hover:text-teal">
                  {contact.email}
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-teal">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs font-medium text-muted-foreground">
                  Telefon
                </span>
                <a href={`tel:${contact.phoneHref}`} className="font-medium text-ink hover:text-teal">
                  {contact.phone}
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-teal">
                <MapPin className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs font-medium text-muted-foreground">
                  Adresse
                </span>
                <span className="font-medium text-ink">
                  {contact.street}, {contact.zip} {contact.city}
                </span>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-teal">
                <Clock className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs font-medium text-muted-foreground">
                  Öffnungszeiten
                </span>
                <span className="font-medium text-ink">{contact.hours}</span>
              </span>
            </li>
          </ul>
        </div>

        <ContactForm />
      </div>
    </div>
  )
}
