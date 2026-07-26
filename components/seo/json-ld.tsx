import { organizationNode, websiteNode } from "@/lib/schema"

/**
 * Emits one `application/ld+json` script holding a connected `@graph`.
 *
 * `JSON.stringify` is safe here because every value comes from our own typed
 * data — but `<` is still escaped so a stray character in a listing title can
 * never close the script tag early.
 */
export function JsonLd({ graph }: { graph: Array<Record<string, unknown>> }) {
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph })
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json.replace(/</g, "\\u003c") }}
    />
  )
}

/**
 * The two nodes every page shares. Rendered once in the site layout; page-level
 * graphs reference them by `@id` instead of repeating them.
 */
export function SiteJsonLd() {
  return <JsonLd graph={[organizationNode(), websiteNode()]} />
}
