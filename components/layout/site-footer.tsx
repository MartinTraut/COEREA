import Link from "next/link"

import { SITE } from "@/lib/site"
import { Logo } from "@/components/brand/logo"
import { SocialIcon } from "@/components/brand/social-icons"

/*
  One link column. The heading is a plain white label, as in the design — not a
  small-caps eyebrow: three uppercase micro-labels over three short lists made
  the bottom of the page busier than the page above it.
*/
function Column({
  title,
  links,
  children,
}: {
  title: string
  links: readonly { label: string; href: string }[]
  /** Rendered under the list — the social marks sit below the last column. */
  children?: React.ReactNode
}) {
  return (
    <div>
      <h3 className="text-[0.9375rem] font-medium text-white">{title}</h3>
      <ul className="mt-5 space-y-1.5">
        {links.map((l) => (
          <li key={l.href}>
            {/*
              The link's own underline grows in on hover instead of the browser's
              — same movement language as the header nav, and it costs a
              transform rather than a repaint of the text box.
            */}
            <Link
              href={l.href}
              className="group relative inline-block text-[0.9375rem] text-white/85 transition-colors hover:text-white"
            >
              {l.label}
              <span
                aria-hidden
                className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white/70 transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </Link>
          </li>
        ))}
      </ul>
      {children}
    </div>
  )
}

export function SiteFooter() {
  const { footer, social } = SITE
  return (
    /*
      Deep end of the teal scale, lit from the top-left, with the Schraffur
      running along the top edge — the same treatment as the benefits band, so
      the page opens and closes on the brand's own surface.

      No top margin: it used to carry `mt-[clamp(4rem,6vw,7rem)]`, which on
      every page inserted a bare white band (86px at 1440) between the last
      section and the footer. A footer is the page's bottom edge, so it butts
      straight against whatever precedes it.

      ── Layout, on the client's instruction (2026-07-26) ────────────────────
      Back to the design's own composition: the mark and a single copyright line
      on the left, the three link lists on the right, the social marks tucked
      under the last list. Everything the earlier version added to fill the
      brand column — claim, contact block, a ruled bottom bar with the opening
      hours — is gone; it made the footer a second contact page. Reaching us is
      what /kontakt and the header link are for.
    */
    <footer className="mesh mesh-dark grain relative isolate overflow-hidden [background:var(--grad-teal-deep)] text-white">
      <span aria-hidden className="hatch-white absolute inset-0 opacity-20" />

      <div className="relative container-page py-[clamp(3rem,4.5vw,5.5rem)]">
        <div className="grid gap-x-[clamp(2rem,3.5vw,4rem)] gap-y-12 sm:grid-cols-2 lg:grid-cols-[minmax(12rem,1fr)_repeat(3,minmax(0,0.9fr))]">
          {/*
            Brand. Vertically centred against the lists rather than sitting at
            their top edge — in the design the mark sits at the height of the
            links, not of the headings.
          */}
          <div className="sm:col-span-2 lg:col-span-1 lg:self-center">
            <Logo variant="white" href={null} className="h-[clamp(2.5rem,2.6vw,3.25rem)]" />
            <p className="mt-4 text-xs text-white/70">
              Copyright © {new Date().getFullYear()} by CoArea
            </p>
          </div>

          <Column title={footer.rechtliches.title} links={footer.rechtliches.links} />
          <Column title={footer.coarea.title} links={footer.coarea.links} />
          <Column title={footer.kunden.title} links={footer.kunden.links}>
            {/*
              The four profiles do not exist yet. Until there are real URLs they
              are marks, not links — no border, no hover, nothing that invites a
              click that would go nowhere.
            */}
            <ul className="mt-7 flex items-center gap-4">
              {social.map((s) => (
                <li key={s.label} title={`${s.label} — Profil folgt`} className="text-white/85">
                  <SocialIcon name={s.icon} className="h-[1.375rem] w-[1.375rem]" />
                  <span className="sr-only">{s.label} (Profil folgt)</span>
                </li>
              ))}
            </ul>
          </Column>
        </div>
      </div>
    </footer>
  )
}
