import { Mail, Phone, MapPin } from "lucide-react"

import { SITE } from "@/lib/site"
import { TabHeading } from "@/components/brand/tab-heading"
import { ContactForm } from "@/components/contact/contact-form"

export function GetInTouch() {
  const { contact } = SITE
  return (
    <section className="container-page py-16 md:py-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div>
          <TabHeading className="text-[clamp(1.4rem,2vw+0.5rem,2rem)]">
            Get in Touch
          </TabHeading>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/80">
            Erfahrene Beratung für die optimale Nutzung Deiner Flächen.
          </p>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            Du brauchst Hilfe beim Anbieten Deiner Fläche oder möchtest als Host
            mehr aus Deinen Möglichkeiten herausholen? Lass Dich von unserem
            Host-Support beraten.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="flex flex-col gap-1 border border-border bg-card p-4 transition-colors hover:border-teal"
              >
                <Mail className="h-5 w-5 text-teal" />
                <span className="text-xs font-medium text-muted-foreground">E-Mail</span>
                <span className="text-sm font-medium text-ink">{contact.email}</span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${contact.phoneHref}`}
                className="flex flex-col gap-1 border border-border bg-card p-4 transition-colors hover:border-teal"
              >
                <Phone className="h-5 w-5 text-teal" />
                <span className="text-xs font-medium text-muted-foreground">Telefon</span>
                <span className="text-sm font-medium text-ink">{contact.phone}</span>
              </a>
            </li>
            <li className="flex flex-col gap-1 border border-border bg-card p-4">
              <MapPin className="h-5 w-5 text-teal" />
              <span className="text-xs font-medium text-muted-foreground">Adresse</span>
              <span className="text-sm font-medium text-ink">
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
