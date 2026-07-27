"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  ArrowRight,
  CalendarDays,
  CircleCheck,
  MapPin,
  Search,
  Tag,
  UserCheck,
} from "lucide-react"

import { Reveal } from "@/components/brand/reveal"
import { TabHeading } from "@/components/brand/tab-heading"

/*
  Homepage hero.

  The layout intent from the design is kept — headline left, welcome copy and
  the two primary actions right, the search bar spanning the full column
  underneath — but the surface is built up rather than flat:

    · the site-plan drawing is masked so it dissolves downward instead of being
      cut off by the section edge,
    · two soft teal blooms (.mesh) and a 4% grain sit over it, which is what
      turns #F6F6F6 from grey into a lit surface,
    · the search bar is a raised card with a clipped corner, the one shape move
      in the system, and it responds as a whole when any field is focused.

  Fluid sizes stay in `Xvw + Yrem` form so they scale continuously and survive
  zoom; nothing here is a breakpoint step.
*/
export function Hero() {
  const router = useRouter()
  const [ort, setOrt] = useState("")
  const [datum, setDatum] = useState("")

  /*
    Both fields carry their value over to /flaechen, which reads `suche` into its
    search box and `ab` into its availability filter.

    There used to be a third field, „Anzahl der User". It was sent as `?users=`
    and nothing ever read it: areas carry no capacity in the data, so no filter
    could act on it and the result set was identical whatever was typed. An
    input whose value is discarded is the same dead control as a link to `#`, so
    it is gone until there is a capacity to filter on — the party size is asked
    for again in the booking widget, where it does reach the request.
  */
  function search(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (ort.trim()) params.set("suche", ort.trim())
    if (datum) params.set("ab", datum)
    const qs = params.toString()
    router.push(qs ? `/flaechen?${qs}` : "/flaechen")
  }

  return (
    <section className="mesh grain relative isolate overflow-hidden bg-cream">
      {/*
        Site plan, reconstructed at the frame's own 1920x894. Masked to fade out
        over the lower third so the drawing reads as a substrate the content
        sits on, rather than as a photo that stops at a hard edge.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 select-none bg-[url(/images/hero-map.png)] bg-cover bg-top bg-no-repeat [mask-image:linear-gradient(to_bottom,black_0%,black_42%,transparent_88%)]"
      />
      {/* Closing gradient into white, so the band hands over to the next
          section instead of stopping at a ruled edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-white"
      />

      <div className="relative container-page pt-[clamp(3rem,7vw+0.5rem,9.5rem)] pb-[clamp(3.5rem,8vw+0.5rem,11rem)]">
        <div className="grid items-start gap-y-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-x-[clamp(2rem,4vw,5rem)] lg:gap-y-0">
          <div>
            <Reveal>
              <span className="eyebrow">Marktplatz für ungenutzte Freiflächen</span>
            </Reveal>

            {/*
              One accent line carries the brand gradient. Everything else in the
              frame stays flat teal — a gradient on all of it would read as an
              effect rather than as emphasis.
            */}
            <Reveal delay={70} className="mt-5 block">
              {/*
                Two lines, each unbroken — "Gemeinsam nutzen," / "nachhaltig
                erleben.", as in the frame. The `<br />` was already here, but at
                the old maximum of 4.75rem the first line was wider than its own
                column, so it wrapped again and the headline came out one word
                per line inside a frame four lines tall. `whitespace-nowrap`
                makes the intended break the only break, and the size is capped
                at what the column can actually hold.
              */}
              {/*
                The no-wrap was unconditional, and below ~340px the second line
                plus the frame's padding is wider than the column it sits in.
                The section clips, so on a 320px phone the headline — the whole
                claim of the site — was cut off at the right edge rather than
                wrapping. Held from `sm` up, where the column can carry it.
              */}
              <TabHeading
                as="h1"
                className="text-[clamp(1.6rem,2.55vw+0.5rem,3.375rem)]/[1.12]"
              >
                <span className="sm:whitespace-nowrap">Gemeinsam nutzen,</span>
                <br />
                <span className="text-gradient sm:whitespace-nowrap">
                  nachhaltig erleben.
                </span>
              </TabHeading>
            </Reveal>
          </div>

          {/* Welcome copy + primary CTAs */}
          <Reveal delay={140} className="lg:pt-[clamp(0.5rem,1.6vw,2.25rem)]">
            <p className="max-w-[42ch] text-[clamp(1rem,0.62vw+0.62rem,1.3125rem)]/[1.55] text-ink">
              Willkommen in der Welt von CoArea, wo gemeinsames Handeln und
              Freiflächen auf innovative Weise verschmelzen. Unser Name
              „CoArea&quot; leitet sich von den Begriffen „Common&quot; und
              „Area&quot; ab, und genau das ist unser Ziel: Gemeinschaften
              zusammenbringen, um Freiflächen optimal zu nutzen.
            </p>
            <div className="mt-[clamp(1.5rem,1.8vw,2.25rem)] flex flex-wrap gap-[clamp(0.75rem,1.1vw,1.25rem)]">
              <Link
                href="/host-werden"
                className="btn btn-teal sheen group h-[clamp(2.875rem,2.9vw,3.5rem)] px-[clamp(1.4rem,2vw,2.4rem)] text-[clamp(0.9375rem,0.42vw+0.6rem,1.125rem)]"
              >
                Host werden
                <span className="arrow-nudge inline-flex">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link
                href="/ueber-uns"
                className="btn btn-outline h-[clamp(2.875rem,2.9vw,3.5rem)] px-[clamp(1.4rem,2vw,2.4rem)] text-[clamp(0.9375rem,0.42vw+0.6rem,1.125rem)]"
              >
                Über Uns
              </Link>
            </div>
          </Reveal>
        </div>

        {/*
          Search bar. Raised off the band as a white card with a clipped
          top-right corner. Because clip-path also clips box-shadow, the
          elevation is applied as a drop-shadow filter on a wrapper instead —
          the two cannot live on the same element.
        */}
        <Reveal
          variant="scale"
          delay={220}
          className="mt-[clamp(2.5rem,4.5vw,5.5rem)] [filter:drop-shadow(0_26px_50px_rgba(0,101,95,0.16))]"
        >
          <form
            onSubmit={search}
            className="notch notch-lg bg-white ring-1 ring-transparent transition-[box-shadow] duration-300 focus-within:ring-teal/30"
          >
            <div className="flex flex-col gap-5 p-[clamp(1.25rem,2vw,2rem)] sm:flex-row sm:items-end sm:gap-0 sm:p-[clamp(1rem,1.5vw,1.75rem)]">
              <Field
                icon={MapPin}
                label="Wo möchtest Du eine CoArea mieten?"
                placeholder="Land, Stadt, PLZ…"
                value={ort}
                onChange={setOrt}
                className="sm:flex-[1.4_1_0%]"
              />
              <Divider />
              <Field
                icon={CalendarDays}
                label="Zeitraum"
                placeholder="Wähle ein Datum"
                type="date"
                value={datum}
                onChange={setDatum}
                className="sm:flex-[1_1_0%]"
              />
              <button
                type="submit"
                className="btn btn-teal sheen group h-[clamp(3rem,3.2vw,3.875rem)] w-full shrink-0 px-[clamp(1.25rem,1.8vw,2.25rem)] text-[clamp(0.9375rem,0.42vw+0.6rem,1.125rem)] sm:ml-[clamp(1rem,1.6vw,2rem)] sm:w-auto"
              >
                <Search className="h-4 w-4" />
                Flächen entdecken
              </button>
            </div>
          </form>
        </Reveal>

        {/*
          The three things a first-time visitor is actually unsure about, said
          immediately under the control that would commit them to something.

          All three are statements about how the product works, not marketing
          claims — the enquiry really is free and non-binding, the host really
          does confirm every booking one by one, and listing really is free. A
          row of invented figures ("1.200 Flächen", "4,9 Sterne") would sit here
          more comfortably and would be a lie.
        */}
        <Reveal
          delay={300}
          className="mt-[clamp(1.25rem,2vw,2rem)] flex flex-wrap items-center gap-x-[clamp(1.25rem,2.4vw,2.75rem)] gap-y-3"
        >
          <Promise icon={CircleCheck} text="Anfragen ist kostenlos und unverbindlich" />
          <Promise icon={UserCheck} text="Jede Buchung bestätigt der Host persönlich" />
          <Promise icon={Tag} text="Eigene Fläche inserieren: gratis" />
        </Reveal>
      </div>
    </section>
  )
}

/* One line of the reassurance row under the search bar. */
function Promise({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  text: string
}) {
  return (
    <span className="flex items-center gap-2 text-[clamp(0.75rem,0.22vw+0.7rem,0.8125rem)] font-semibold tracking-[0.04em] text-ink">
      <Icon className="h-4 w-4 shrink-0 text-teal" strokeWidth={2} />
      {text}
    </span>
  )
}

/* Hairline between fields — visible on the wide bar only, never when stacked. */
function Divider() {
  return (
    <span
      aria-hidden
      className="mx-[clamp(0.75rem,1.4vw,1.75rem)] hidden h-9 w-px shrink-0 self-center bg-border sm:block"
    />
  )
}

/*
  One search field. The icon and prompt sit on one line above the input, and the
  icon warms to teal while the field has focus — enough feedback to see which
  field is live without drawing a box around it.
*/
function Field({
  icon: Icon,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  className,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  label: string
  placeholder: string
  type?: "text" | "date" | "number"
  value: string
  onChange: (value: string) => void
  className?: string
}) {
  return (
    <label className={`group/f flex min-w-0 flex-col gap-1.5 ${className ?? ""}`}>
      <span className="flex items-center gap-2 text-[clamp(0.8125rem,0.28vw+0.7rem,0.9375rem)] font-semibold text-ink-900">
        <Icon
          className="h-4 w-4 shrink-0 text-ink transition-colors duration-200 group-focus-within/f:text-teal"
          strokeWidth={1.75}
        />
        <span className="truncate">{label}</span>
      </span>
      {/*
        Montserrat sets wider than the Gotham of the frame, so the placeholders
        need a gutter or „Wähle ein Datum" runs into the next field's text.
      */}
      <input
        type={type}
        min={type === "number" ? 1 : undefined}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full truncate bg-transparent pr-3 text-[clamp(0.9375rem,0.4vw+0.65rem,1.125rem)] text-ink-900 outline-none placeholder:text-ink/70 focus-visible:outline-none"
      />
    </label>
  )
}
