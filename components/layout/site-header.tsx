"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { ArrowLeft, LogOut } from "lucide-react"

import { SITE } from "@/lib/site"
import { initials, signOut, useDemoSession } from "@/lib/demo-session"
import { cn } from "@/lib/utils"
import { setOutsideInert } from "@/lib/inert"
import { lockScroll } from "@/lib/scroll-lock"
import { Logo } from "@/components/brand/logo"
import { SlashMark } from "@/components/brand/slash-mark"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const onHome = pathname === "/"
  /* `null` during SSR and on the first paint — see useDemoSession. Both states
     occupy the same slot in the bar, so the swap does not move anything. */
  const user = useDemoSession()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  /*
    The overlay used to leave the page behind it fully tabbable and readable to
    screen readers, with no way to dismiss it from the keyboard. Escape closes
    it, focus moves into it and back to the toggle on close, and the rest of the
    document is marked inert while it is up.
  */
  useEffect(() => {
    if (!open) return

    const unlock = lockScroll()
    /*
      This marked only `#main` inert, but `<main>` is not the whole page — the
      footer is its sibling, so an open menu still let you tab into eleven footer
      links hidden behind the panel. `setOutsideInert` disables everything except
      the panel's own ancestor chain, and hands back the undo.
    */
    /*
      Inert from the HEADER, not from the panel.

      The panel and the bar that holds the „///" toggle are siblings inside
      `<header>`, so disabling everything outside the panel disabled the bar
      too — and an inert subtree ignores pointer events. The one control
      labelled „Menü schließen" was dead for exactly as long as the menu was
      open, and on a phone there is no Escape key: the only way out of the
      navigation was to follow a link or reload the page.
    */
    const restore = setOutsideInert(headerRef.current)

    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)

    /*
      The panel is `md:hidden`, but `open` was not: opening the menu on a phone
      and then rotating it, or dragging a desktop window past 768px, hid the
      panel while leaving the page locked and inert behind it. Nothing was
      visible to explain why the site had stopped scrolling and stopped
      responding to clicks — the only way out was a reload. Crossing the
      breakpoint now closes the menu, which is also what the visitor means by
      it: the full navigation is back in the bar.
    */
    const wide = window.matchMedia("(min-width: 768px)")
    const onWide = () => {
      if (wide.matches) setOpen(false)
    }
    wide.addEventListener("change", onWide)

    return () => {
      document.removeEventListener("keydown", onKey)
      wide.removeEventListener("change", onWide)
      unlock()
      restore()
    }
  }, [open])

  // Return focus to the control that opened the menu, not to the document.
  const close = () => {
    setOpen(false)
    toggleRef.current?.focus()
  }

  /*
    The bar's height is now CONSTANT, and that is the whole fix for the header
    juddering on the way back to the top.

    A `sticky` element still occupies space in normal flow. The previous version
    swapped between a tall and a short bar at a scroll threshold, so crossing it
    changed the document's layout: everything below moved by ~60px, the browser
    corrected the scroll offset to keep the content anchored, that correction
    pushed the offset back across the threshold, and the bar flipped again. A
    feedback loop between layout and scroll position — visible as the header
    rebuilding itself over and over, worst near the top where the momentum of a
    flick keeps re-crossing the line.

    So nothing about the geometry reacts to scroll any more. What remains is a
    shadow and a border tint, which are paint-only and cannot move anything.
    The threshold keeps a hysteresis band regardless (on above 12px, off below
    4px) so a single pixel of trackpad drift near the boundary can't chatter.
  */
  useEffect(() => {
    let raf = 0
    const read = () => {
      raf = 0
      // Read from the latest state, not from a captured value, so the band works.
      setScrolled((was) => (was ? window.scrollY > 4 : window.scrollY > 12))
    }
    const onScroll = () => {
      // Coalesce a burst of scroll events into one state update per frame.
      if (!raf) raf = requestAnimationFrame(read)
    }
    read()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    /*
      Opaque white, no backdrop-filter. Blurring a full-width strip forced the
      region behind the header to be re-rasterised on every scrolled frame — the
      single most expensive thing here — and the brand is flat and sharp anyway,
      so frosted glass was never part of it.
    */
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 bg-white transition-shadow duration-300",
        scrolled ? "shadow-[0_10px_30px_-24px_rgba(0,101,95,0.55)]" : "shadow-none",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-[clamp(4.5rem,4.8vw,5.75rem)]">
        {/*
          The wordmark has always linked to `/`, but nothing about it said so:
          no hit area, no hover surface, and a 3% scale that nobody notices. A
          logo that is a link only in the markup is a link nobody uses.

          So it is drawn as a control. Off the homepage it carries a back arrow
          and a hover plate — the arrow occupies its space permanently rather
          than sliding in, because an affordance that only appears once you are
          already hovering has not told anybody anything. On the homepage the
          arrow is gone and `aria-current` marks it as where you already are;
          pointing "back" at the page under your feet would be a lie.
        */}
        <Link
          href="/"
          aria-label={
            onHome ? "CoArea, Startseite" : "CoArea, zurück zur Startseite"
          }
          aria-current={onHome ? "page" : undefined}
          title={onHome ? undefined : "Zurück zur Startseite"}
          className={cn(
            "group -ml-2 flex shrink-0 items-center gap-1.5 rounded-[var(--radius-control)] px-2 py-1.5 transition-colors duration-300",
            !onHome && "hover:bg-teal-50",
          )}
        >
          {!onHome ? (
            <ArrowLeft
              aria-hidden
              className="h-[1.125rem] w-[1.125rem] shrink-0 text-teal/45 transition-all duration-300 ease-out group-hover:-translate-x-0.5 group-hover:text-teal motion-reduce:group-hover:translate-x-0"
              strokeWidth={2}
            />
          ) : null}
          {/* href={null} — the wrapping Link is the anchor; nesting two would be invalid. */}
          <Logo
            href={null}
            className="h-[clamp(2.1rem,2.55vw,3rem)] origin-left transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-[clamp(1rem,2.9vw,3.5rem)] md:flex">
          {SITE.nav.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                /*
                  The underline grows from the left on hover instead of simply
                  appearing — it reads as one continuous movement with the
                  colour change, and costs a transform rather than a reflow.
                */
                className={cn(
                  "group relative text-[clamp(0.8125rem,0.604vw+0.4rem,1.125rem)] font-medium whitespace-nowrap transition-colors hover:text-teal",
                  active ? "text-teal" : "text-ink",
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-0.5 w-full origin-left bg-teal transition-transform duration-300 ease-out",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            )
          })}
          {/*
            Signed out: one filled action. Outlined gave it the weight of a
            secondary control while still drawing the eye, and a hollow button
            at this size showed its ring more clearly than its label.

            Signed in: who you are, where your account is, and the way out.
            A demo session that cannot be ended is a trap — every visitor who
            clicks through the dashboard has to be able to get back to the
            signed-out site without clearing their storage by hand.
          */}
          {user ? (
            <span className="flex items-center gap-2">
              <Link
                href="/dashboard"
                aria-label={`Mein Konto, angemeldet als ${user.name}`}
                className="group flex items-center gap-2.5 rounded-[var(--radius-control)] py-1 pr-3 pl-1 transition-colors duration-300 hover:bg-teal-50"
              >
                <span
                  aria-hidden
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-teal text-[0.8125rem] font-semibold text-white"
                >
                  {initials(user.name)}
                </span>
                <span className="max-w-[9rem] truncate text-[clamp(0.8125rem,0.604vw+0.4rem,1rem)] font-medium text-ink-900">
                  {user.name}
                </span>
              </Link>
              <button
                type="button"
                onClick={signOut}
                title="Abmelden"
                aria-label="Abmelden"
                className="grid h-9 w-9 place-items-center rounded-[var(--radius-control)] text-ink/55 transition-colors duration-300 hover:bg-teal-50 hover:text-teal"
              >
                <LogOut className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.75} />
              </button>
            </span>
          ) : (
            <Link
              href="/anmelden"
              className="btn btn-teal sheen px-[clamp(1rem,1.5vw,1.75rem)] py-[clamp(0.5rem,0.75vw,0.85rem)] text-[clamp(0.8125rem,0.604vw+0.4rem,1.0625rem)]"
            >
              anmelden
            </Link>
          )}
          <span className="text-[clamp(0.8125rem,0.604vw+0.4rem,1.0625rem)] font-medium text-muted-foreground">
            DE
          </span>
        </nav>

        {/* Mobile: „///" toggle */}
        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 p-2 text-teal md:hidden"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => (open ? close() : setOpen(true))}
        >
          <SlashMark className={cn("h-6 transition-transform duration-300", open && "-scale-x-100")} />
        </button>
      </div>

      {/*
        The bottom rule doubles as the reading-progress indicator. The teal bar
        is scaled by a scroll-driven CSS animation (see .scroll-progress) — no
        listener, no state, no per-frame work on the main thread.
      */}
      <div aria-hidden className="relative h-[3px] w-full overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 transition-colors duration-300",
            scrolled ? "bg-teal/15" : "bg-[#e6e6e6]",
          )}
        />
        <div className="scroll-progress absolute inset-0 [background:var(--grad-teal-bright)]" />
      </div>

      {/* Mobile full-screen teal overlay */}
      {open ? (
        <div
          id="mobile-menu"
          ref={panelRef}
          /* top-16 matches the mobile bar, which no longer changes height. */
          className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-teal text-white motion-safe:animate-[coarea-fade-up_240ms_ease-out] md:hidden"
        >
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
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-[var(--radius-control)] bg-white px-8 py-3 text-lg font-semibold text-teal shadow-[0_10px_30px_-14px_rgba(0,0,0,0.5)]"
                >
                  Mein Konto
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    signOut()
                    setOpen(false)
                  }}
                  className="inline-flex items-center gap-2 text-base text-white/80 underline underline-offset-4"
                >
                  <LogOut className="h-4 w-4" strokeWidth={1.75} />
                  Abmelden, {user.name}
                </button>
              </>
            ) : (
              <Link
                href="/anmelden"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-[var(--radius-control)] bg-white px-8 py-3 text-lg font-semibold text-teal shadow-[0_10px_30px_-14px_rgba(0,0,0,0.5)] transition-colors hover:bg-cream"
              >
                anmelden
              </Link>
            )}
            <span className="mt-2 text-sm text-white/70">DE</span>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
