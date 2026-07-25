import Link from "next/link"

import { SITE } from "@/lib/site"
import { Logo } from "@/components/brand/logo"
import { SocialIcon } from "@/components/brand/social-icons"

function Column({
  title,
  links,
}: {
  title: string
  links: readonly { label: string; href: string }[]
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-white/70">{title}</h3>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-white/85 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteFooter() {
  const { contact, footer, social } = SITE
  return (
    <footer className="mt-24 bg-teal text-white">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + contact */}
          <div>
            <Logo variant="white" href={null} className="text-3xl" />
            <p className="mt-4 max-w-xs text-sm text-white/85">{SITE.claim}</p>

            <div className="mt-8 flex items-center gap-3">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/30 text-white/90 transition-colors hover:border-white hover:bg-white hover:text-teal"
                >
                  <SocialIcon name={s.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <Column title={footer.rechtliches.title} links={footer.rechtliches.links} />
          <Column title={footer.coarea.title} links={footer.coarea.links} />
          <Column title={footer.kunden.title} links={footer.kunden.links} />
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/20 pt-6 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {SITE.legalName} · Alle Rechte vorbehalten.
          </span>
          <span>{contact.hours}</span>
        </div>
      </div>
    </footer>
  )
}
