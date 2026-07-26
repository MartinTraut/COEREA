import { Layers } from "lucide-react"

import {
  EARNINGS_BY_MONTH,
  EARNINGS_TOTAL,
  eur,
  QUARTER_MONTHS,
  QUARTER_SERIES,
  STATS,
} from "@/lib/dashboard"

/** "Dein Dashboard": the two key figures and the two charts beneath them. */
export function DashboardCharts() {
  return (
    <section className="container-page py-14 lg:py-20">
      <h2 className="h-plain">
        Dein Dashboard
      </h2>

      <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-8">
        <div>
          <h3 className="text-[19px] font-semibold text-teal">
            aktuell inserierte Flächen
          </h3>
          <p className="mt-8 flex items-center justify-center gap-4 text-teal">
            <Layers className="h-11 w-11 fill-current" strokeWidth={1.25} aria-hidden />
            <span className="border-b-2 border-teal text-[40px] leading-none">
              {STATS.listed}
            </span>
          </p>

          <h3 className="mt-14 text-[19px] font-semibold text-teal">
            Deine Zahlen aus dem letzten Quartal im Überblick:
          </h3>
          <QuarterChart />
        </div>

        <div>
          <h3 className="text-[19px] font-semibold text-teal">
            Deine Einnahmen seit {STATS.earningsSince}
          </h3>
          {/*
            This used to be `STATS.earnings.split(" ")[0]` followed by a literal
            „€", which rendered as „1.876,00 € €": Intl's de-DE currency format
            separates the amount from the symbol with a NON-BREAKING space, so
            splitting on a plain space never matched and returned the whole
            string. The formatted value already carries its symbol — print it.
          */}
          <p className="mt-8 text-center text-[clamp(2rem,1.2vw+1.4rem,2.75rem)] leading-none font-bold text-teal">
            <span className="border-b-2 border-teal">{STATS.earnings}</span>
          </p>

          <h3 className="mt-14 text-[19px] font-semibold text-teal">
            Deine diesjährigen Einnahmen im Überblick:
          </h3>
          <EarningsChart />
        </div>
      </div>
    </section>
  )
}

/* --- charts: plain inline SVG, no charting dependency --- */

const W = 620
const H = 360
const PAD = { left: 62, right: 120, top: 16, bottom: 44 }
const Y_TICKS = [50, 100, 150, 200, 250, 300]
const Y_MAX = 320

const px = (i: number) => {
  const inner = W - PAD.left - PAD.right
  return PAD.left + (inner * [0, 0.28, 0.63, 1][i]!) / 1
}
const py = (v: number) => {
  const inner = H - PAD.top - PAD.bottom
  return PAD.top + inner * (1 - v / Y_MAX)
}

function QuarterChart() {
  return (
    <figure className="mt-8">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Angeschaut, gespeichert, geteilt und Buchungen von April bis Juni"
      >
        {/* axes */}
        <line
          x1={PAD.left}
          y1={PAD.top}
          x2={PAD.left}
          y2={H - PAD.bottom}
          stroke="#707070"
          strokeWidth="2"
        />
        <line
          x1={PAD.left}
          y1={H - PAD.bottom}
          x2={W - PAD.right + 40}
          y2={H - PAD.bottom}
          stroke="#707070"
          strokeWidth="2"
        />

        {Y_TICKS.map((t) => (
          <text
            key={t}
            x={PAD.left - 14}
            y={py(t) + 7}
            textAnchor="end"
            fill="#707070"
            fontSize="20"
          >
            {t}
          </text>
        ))}

        {QUARTER_MONTHS.map((m, i) => (
          <text
            key={m}
            x={px(i + 1)}
            y={H - PAD.bottom + 28}
            textAnchor="middle"
            fill="#707070"
            fontSize="18"
          >
            {m}
          </text>
        ))}

        {QUARTER_SERIES.map((s) => (
          <g key={s.label}>
            <polyline
              fill="none"
              stroke={s.color}
              strokeWidth="3"
              strokeLinejoin="round"
              points={s.points.map((v, i) => `${px(i)},${py(v)}`).join(" ")}
            />
            <text
              x={W - PAD.right + 10}
              y={py(s.points[3]!) + 6}
              fill="#707070"
              fontSize="18"
            >
              {s.label}
            </text>
          </g>
        ))}
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
  const AXIS = 62
  const top = 16
  const trackH = 280
  const bw = 14
  const span = 620 - AXIS
  const gap = (span - EARNINGS_BY_MONTH.length * bw) / EARNINGS_BY_MONTH.length

  // Round the top of the scale up to a clean step so the ticks read well.
  const peak = Math.max(...EARNINGS_BY_MONTH.map((m) => m.euros), 1)
  const step = 100
  const scaleMax = Math.ceil(peak / step) * step
  const ticks = Array.from({ length: scaleMax / step + 1 }, (_, i) => i * step)

  return (
    <figure className="mt-8">
      <svg
        viewBox="0 0 620 360"
        className="h-auto w-full"
        role="img"
        aria-label={`Einnahmen je Monat, insgesamt ${eur(EARNINGS_TOTAL)} seit ${STATS.earningsSince}`}
      >
        {ticks.map((t) => {
          const y = top + trackH - (trackH * t) / scaleMax
          return (
            <g key={t}>
              <line x1={AXIS} y1={y} x2={620} y2={y} stroke="#ededed" strokeWidth="1" />
              <text x={AXIS - 10} y={y + 6} textAnchor="end" fill="#707070" fontSize="17">
                {t === 0 ? "0 €" : `${t} €`}
              </text>
            </g>
          )
        })}

        {EARNINGS_BY_MONTH.map((m, i) => {
          const x = AXIS + gap / 2 + i * (bw + gap)
          const h = (trackH * m.euros) / scaleMax
          return (
            <g key={`${m.month}-${i}`}>
              <rect x={x} y={top} width={bw} height={trackH} fill="#f6f6f6" />
              {h > 0 ? (
                <rect x={x} y={top + trackH - h} width={bw} height={h} fill="#008a84">
                  <title>{`${m.month}: ${eur(m.euros)}`}</title>
                </rect>
              ) : null}
              <text
                x={x + bw / 2}
                y={top + trackH + 34}
                textAnchor="middle"
                fill="#707070"
                fontSize="20"
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
