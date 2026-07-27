import { Euro, Layers } from "lucide-react"

import {
  EARNINGS_BY_MONTH,
  EARNINGS_TOTAL,
  eur,
  QUARTER_MONTHS,
  QUARTER_SERIES,
  STATS,
} from "@/lib/dashboard"
import { Reveal } from "@/components/brand/reveal"

/*
  „Dein Dashboard": the two key figures and the two charts beneath them.

  The old layout had four blocks of four different kinds floating on white: an
  icon beside an underlined number, a bare underlined euro amount, and two
  unframed SVGs whose grey axes and blue series belonged to no part of this
  brand. Nothing enclosed anything, so the eye had no way to tell which heading
  belonged to which picture, and the underline under both figures read as a
  link. It is now four cards on one grid: two figures, two charts, same
  surface, same corner, same rhythm.
*/
export function DashboardCharts() {
  return (
    <section className="container-page py-14 lg:py-20">
      <Reveal>
        <span className="eyebrow">Überblick</span>
        <h2 className="h-plain mt-4">Dein Dashboard</h2>
        {/*
          The figures below are presented as this host's own. They are not —
          there are no bookings behind them. The login screen says the prototype
          has no real accounts; the page behind it has to say the same, or the
          honesty stops at the door.
        */}
        <p className="mt-4 max-w-2xl text-[0.9375rem]/[1.6] text-ink">
          Beispieldaten aus der Konzeptphase. Sobald echte Buchungen laufen,
          stehen hier Deine eigenen Zahlen.
        </p>
      </Reveal>

      <Reveal delay={90} className="mt-[clamp(2rem,3vw,3rem)] grid gap-5 sm:grid-cols-2">
        <Figure
          icon={Layers}
          label="aktuell inserierte Flächen"
          value={String(STATS.listed)}
          note="alle sind derzeit für Anfragen sichtbar"
        />
        <Figure
          icon={Euro}
          label={`Einnahmen seit ${STATS.earningsSince}`}
          value={STATS.earnings}
          note={`aus ${EARNINGS_BY_MONTH.filter((m) => m.euros > 0).length} Monaten mit Buchungen`}
        />
      </Reveal>

      <Reveal delay={160} className="mt-5 grid gap-5 lg:grid-cols-2">
        <article className="surface p-[clamp(1.25rem,2vw,2rem)]">
          <h3 className="text-[clamp(1rem,0.5vw+0.85rem,1.1875rem)] font-semibold text-ink-900">
            Deine Zahlen aus dem letzten Quartal
          </h3>
          {/*
            The series were labelled inside the SVG, at the right-hand end of
            each line, which cost 120 of 620 units of drawing width and stacked
            two labels on top of each other wherever two lines ended close
            together. As a legend it stays readable, it uses the brand's
            diamond, and the chart gets its width back.
          */}
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {QUARTER_SERIES.map((s) => (
              <li key={s.label} className="flex items-center gap-2 text-[0.8125rem] text-ink">
                <span
                  aria-hidden
                  className="h-2.5 w-2.5 rotate-45"
                  style={{ background: s.color }}
                />
                {s.label}
              </li>
            ))}
          </ul>
          <QuarterChart />
        </article>

        <article className="surface p-[clamp(1.25rem,2vw,2rem)]">
          <h3 className="text-[clamp(1rem,0.5vw+0.85rem,1.1875rem)] font-semibold text-ink-900">
            Deine diesjährigen Einnahmen
          </h3>
          <p className="mt-2 text-[0.8125rem] text-ink">
            Monatlich in Euro. Fahr über einen Balken für den genauen Betrag.
          </p>
          <EarningsChart />
        </article>
      </Reveal>
    </section>
  )
}

/** One key figure: plate, number at display size, label above, context below. */
function Figure({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: typeof Layers
  label: string
  value: string
  note: string
}) {
  return (
    <article className="surface surface-hover group flex items-center gap-[clamp(1rem,1.8vw,1.75rem)] p-[clamp(1.25rem,2vw,2rem)]">
      <span className="icon-plate icon-plate-lg icon-plate-hover">
        <Icon strokeWidth={1.5} />
      </span>
      <span className="min-w-0">
        <span className="caps block text-teal">{label}</span>
        {/*
          Both figures used to sit on a 2px bottom border, which on a page full
          of teal links is the one decoration a number must not carry.
        */}
        <span className="mt-2 block text-[clamp(1.75rem,1.8vw+1.1rem,2.75rem)] leading-none font-bold text-ink-900 tabular-nums">
          {value}
        </span>
        <span className="mt-2 block text-[0.8125rem] text-ink">{note}</span>
      </span>
    </article>
  )
}

/* --- charts: plain inline SVG, no charting dependency --- */

const W = 620
const H = 330
const PAD = { left: 54, right: 18, top: 18, bottom: 42 }
const Y_TICKS = [0, 100, 200, 300]
const Y_MAX = 320

const px = (i: number) => {
  const inner = W - PAD.left - PAD.right
  return PAD.left + inner * [0, 0.3, 0.65, 1][i]!
}
const py = (v: number) => {
  const inner = H - PAD.top - PAD.bottom
  return PAD.top + inner * (1 - v / Y_MAX)
}

function QuarterChart() {
  const baseline = py(0)
  return (
    <figure className="mt-5">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Angeschaut, gespeichert, geteilt und Buchungen von April bis Juni"
      >
        <defs>
          <linearGradient id="coarea-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#008a84" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#008a84" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/*
          Horizontal rules instead of a boxed pair of 2px axes. A value is read
          against the scale, not against the frame, and the frame was the
          darkest thing in the picture.
        */}
        {Y_TICKS.map((t) => (
          <g key={t}>
            <line
              x1={PAD.left}
              y1={py(t)}
              x2={W - PAD.right}
              y2={py(t)}
              stroke={t === 0 ? "#dcdedd" : "#ededed"}
              strokeWidth="1"
            />
            <text x={PAD.left - 12} y={py(t) + 6} textAnchor="end" fill="#707070" fontSize="17">
              {t}
            </text>
          </g>
        ))}

        {QUARTER_MONTHS.map((m, i) => (
          <text
            key={m}
            x={px(i + 1)}
            y={baseline + 28}
            textAnchor="middle"
            fill="#707070"
            fontSize="17"
          >
            {m}
          </text>
        ))}

        {QUARTER_SERIES.map((s) => {
          const points = s.points.map((v, i) => `${px(i)},${py(v)}`).join(" ")
          const lead = s.label === "Buchungen"
          return (
            <g key={s.label}>
              {/*
                The one line the host is actually here for gets a filled area
                and a heavier stroke. Four lines of identical weight ask the
                reader to work out which one matters; the picture should say it.
              */}
              {lead ? (
                <polygon
                  fill="url(#coarea-area)"
                  points={`${points} ${px(3)},${baseline} ${px(0)},${baseline}`}
                />
              ) : null}
              <polyline
                fill="none"
                stroke={s.color}
                strokeWidth={lead ? 3.5 : 2.5}
                strokeLinejoin="round"
                strokeLinecap="round"
                points={points}
              />
              {s.points.map((v, i) =>
                i === 0 ? null : (
                  <circle
                    key={i}
                    cx={px(i)}
                    cy={py(v)}
                    r={lead ? 5 : 4}
                    fill="#fff"
                    stroke={s.color}
                    strokeWidth="2.5"
                  />
                ),
              )}
            </g>
          )
        })}
      </svg>
    </figure>
  )
}

/*
  Earnings per month. The bars used to be bare fractions of the track height
  with no axis, so the picture could not be reconciled with the euro figure
  printed above it. They now carry a rounded euro scale, and each bar exposes
  its own amount to assistive tech and on hover.
*/
function EarningsChart() {
  /* Wide enough for „400 €" at 17px: at 54 the label ran off the left edge of
     the viewBox and rendered as „00 €". */
  const AXIS = 86
  const top = 18
  const trackH = 250
  const span = 620 - AXIS - 8
  const slot = span / EARNINGS_BY_MONTH.length
  const bw = Math.min(26, slot * 0.55)

  // Round the top of the scale up to a clean step so the ticks read well.
  const peak = Math.max(...EARNINGS_BY_MONTH.map((m) => m.euros), 1)
  const step = 100
  const scaleMax = Math.ceil(peak / step) * step
  const ticks = Array.from({ length: scaleMax / step + 1 }, (_, i) => i * step)

  return (
    <figure className="mt-5">
      <svg
        viewBox="0 0 620 330"
        className="h-auto w-full"
        role="img"
        aria-label={`Einnahmen je Monat, insgesamt ${eur(EARNINGS_TOTAL)} seit ${STATS.earningsSince}`}
      >
        <defs>
          <linearGradient id="coarea-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00a49c" />
            <stop offset="100%" stopColor="#00655f" />
          </linearGradient>
        </defs>

        {ticks.map((t) => {
          const y = top + trackH - (trackH * t) / scaleMax
          return (
            <g key={t}>
              <line
                x1={AXIS}
                y1={y}
                x2={620}
                y2={y}
                stroke={t === 0 ? "#dcdedd" : "#ededed"}
                strokeWidth="1"
              />
              <text x={AXIS - 12} y={y + 6} textAnchor="end" fill="#707070" fontSize="17">
                {t === 0 ? "0 €" : `${t} €`}
              </text>
            </g>
          )
        })}

        {EARNINGS_BY_MONTH.map((m, i) => {
          const x = AXIS + slot * i + (slot - bw) / 2
          const h = (trackH * m.euros) / scaleMax
          return (
            <g key={`${m.month}-${i}`}>
              {/* The empty track shows the months still to come as part of the
                  year rather than as bars that failed to draw. */}
              <rect x={x} y={top} width={bw} height={trackH} fill="#f6f6f6" />
              {h > 0 ? (
                <rect
                  x={x}
                  y={top + trackH - h}
                  width={bw}
                  height={h}
                  fill="url(#coarea-bar)"
                  className="transition-opacity duration-200 hover:opacity-80"
                >
                  <title>{`${m.month}: ${eur(m.euros)}`}</title>
                </rect>
              ) : null}
              <text
                x={x + bw / 2}
                y={top + trackH + 30}
                textAnchor="middle"
                fill="#707070"
                fontSize="18"
              >
                {m.month}
              </text>
            </g>
          )
        })}
      </svg>
    </figure>
  )
}
