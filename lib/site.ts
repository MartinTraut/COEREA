/**
 * Central site configuration for CoArea.
 * Company facts verified from the bachelor-thesis brand documents.
 */
/*
  One source of truth for the phone number. The display form used to be
  "+49 02131-…" — a country code followed by the national trunk "0", which is
  not a dialable number — and the tel: form was maintained as a second literal
  that had drifted by a digit, so every phone link called the wrong line.
  The dial form is derived here, so the two can no longer disagree.
*/
const PHONE = "+49 2131 430 04 400"
const PHONE_HREF = PHONE.replace(/[^\d+]/g, "")

export const SITE = {
  name: "CoArea",
  legalName: "CoArea GmbH",
  claim: "Gemeinsam nutzen, nachhaltig erleben.",
  url: "https://www.coarea.de",
  description:
    "Die Plattform für die gemeinschaftliche Nutzung ungenutzter Freiflächen.",
  contact: {
    email: "info@coarea.de",
    phone: PHONE,
    phoneHref: PHONE_HREF,
    street: "Baacher Str. 46",
    zip: "50999",
    city: "Köln",
    country: "Deutschland",
    hours: "Mo bis Fr 09:00 bis 18:00 Uhr & nach Terminvereinbarung",
  },
  /*
    The header navigation, and the menu overlay — both read this list.

    „Hilfe" sits in front of „Kontakt" on purpose. It answers the same questions
    the contact form receives, only immediately and without a reply to wait for,
    and /kontakt itself opens by saying so („Viele Fragen sind hier schon
    beantwortet. Das geht schneller als eine Mail."). Reaching a person stays
    the last stop rather than the only signposted one; the page used to be
    linked from the footer alone.
  */
  nav: [
    { label: "Flächen entdecken", href: "/flaechen" },
    { label: "Host werden", href: "/host-werden" },
    { label: "Über uns", href: "/ueber-uns" },
    { label: "Hilfe", href: "/hilfe" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  footer: {
    rechtliches: {
      title: "Rechtliches",
      links: [
        { label: "Impressum", href: "/impressum" },
        { label: "Datenschutzerklärung", href: "/datenschutz" },
        { label: "Haftungsausschluss", href: "/haftungsausschluss" },
        { label: "Cookie-Richtlinie (EU)", href: "/cookies" },
      ],
    },
    coarea: {
      title: "CoArea",
      links: [
        { label: "Über uns", href: "/ueber-uns" },
        { label: "Jobs", href: "/jobs" },
        { label: "Presse", href: "/presse" },
        { label: "Businesspartner werden", href: "/businesspartner" },
      ],
    },
    kunden: {
      title: "Für Kund*innen",
      links: [
        { label: "Flächen entdecken", href: "/flaechen" },
        { label: "Host werden", href: "/host-werden" },
        { label: "Hilfe", href: "/hilfe" },
      ],
    },
  },
  social: [
    { label: "LinkedIn", href: "#", icon: "linkedin" as const },
    { label: "Facebook", href: "#", icon: "facebook" as const },
    { label: "Instagram", href: "#", icon: "instagram" as const },
    { label: "Xing", href: "#", icon: "xing" as const },
  ],
} as const
