import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteJsonLd } from "@/components/seo/json-ld"

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col">
      {/* Organization + WebSite — every page-level graph points back at these. */}
      <SiteJsonLd />
      {/*
        Skip link (WCAG 2.4.1). `#main` already existed for the mobile menu, but
        nothing let a keyboard reach it: every page began with the logo, four nav
        items and the sign-in button, and /flaechen added eight category
        diamonds on top of that before any content. Off-screen until focused.
      */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:bg-white focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-teal focus:shadow-[var(--shadow-md)] focus:outline-2 focus:outline-offset-2 focus:outline-teal"
      >
        Zum Inhalt springen
      </a>
      <SiteHeader />
      {/* id is what the mobile menu marks inert while the overlay is open. */}
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
