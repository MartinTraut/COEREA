import { cn } from "@/lib/utils"

/*
  Faint architectural site-plan pattern used behind the hero (and other calm
  bands) — mirrors the cadastral / building-footprint linework in the Figma
  design. Pure inline SVG, no assets, tiled seamlessly. Decorative only.
*/
export function BlueprintBg({
  className,
  /** "white" draws solid white footprints — the treatment used on grey bands. */
  tone = "ink",
}: {
  className?: string
  tone?: "ink" | "white"
}) {
  const id = `coarea-plan-${tone}`
  const paint =
    tone === "white"
      ? { fill: "#ffffff", stroke: "#ffffff", strokeOpacity: 1 }
      : { fill: "none", stroke: "#29292a", strokeOpacity: 0.06 }

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={id}
            width="320"
            height="320"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-8)"
          >
            <g {...paint} strokeWidth="1.5">
              {/* plot / building footprints */}
              <rect x="18" y="24" width="86" height="58" />
              <rect x="34" y="40" width="54" height="26" />
              <rect x="150" y="12" width="120" height="70" />
              <rect x="176" y="30" width="70" height="36" />
              <rect x="30" y="140" width="150" height="96" />
              <rect x="58" y="164" width="96" height="50" />
              <rect x="210" y="150" width="86" height="120" />
              <rect x="228" y="176" width="52" height="70" />
              <rect x="96" y="256" width="120" height="52" />
              {/* survey lines */}
              <line x1="0" y1="112" x2="320" y2="112" />
              <line x1="192" y1="0" x2="192" y2="320" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  )
}
