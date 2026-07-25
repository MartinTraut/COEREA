"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { SITE } from "@/lib/site"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/brand/logo"
import { SlashMark } from "@/components/brand/slash-mark"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-cream/90 backdrop-blur supports-[backdrop-filter]:bg-cream/75">
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {SITE.nav.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium text-ink/80 transition-colors hover:text-teal",
                  active && "text-teal",
                )}
              >
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/anmelden"
            className="border-2 border-teal px-4 py-2 text-sm font-semibold text-teal transition-colors hover:bg-teal hover:text-white"
          >
            anmelden
          </Link>
          <span className="text-sm font-medium text-muted-foreground">DE</span>
        </nav>

        {/* Mobile: „///" toggle */}
        <button
          type="button"
          className="-mr-2 p-2 text-teal md:hidden"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <SlashMark className={cn("h-6 transition-transform", open && "-scale-x-100")} />
        </button>
      </div>

      {/* Mobile full-screen teal overlay */}
      {open ? (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-teal text-white md:hidden">
          <nav className="flex flex-1 flex-col items-center justify-center gap-7 px-6">
            {SITE.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-2xl font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/anmelden"
              onClick={() => setOpen(false)}
              className="mt-2 border-2 border-white px-8 py-3 text-lg font-semibold transition-colors hover:bg-white hover:text-teal"
            >
              anmelden
            </Link>
            <span className="mt-2 text-sm text-white/70">DE</span>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
