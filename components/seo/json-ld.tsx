import { SITE } from "@/lib/site"

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.legalName,
        alternateName: SITE.name,
        url: SITE.url,
        slogan: SITE.claim,
        email: SITE.contact.email,
        telephone: SITE.contact.phoneHref,
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.contact.street,
          postalCode: SITE.contact.zip,
          addressLocality: SITE.contact.city,
          addressCountry: "DE",
        },
      }}
    />
  )
}

export function WebsiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        inLanguage: "de-DE",
        publisher: { "@id": `${SITE.url}/#organization` },
      }}
    />
  )
}
