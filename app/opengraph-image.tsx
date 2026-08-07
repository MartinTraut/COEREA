import { ImageResponse } from "next/og"

/*
  The share image the site did not have.

  Every link to CoArea — in a message, on LinkedIn, in a Slack channel — came up
  as a grey box with a line of text, because no route declared an `og:image`. As
  a file at the app root, Next attaches this to every page that does not set its
  own, so one file covers eighteen routes; the listing pages keep using their
  own photograph.

  Drawn rather than uploaded so it cannot drift from the brand: the teal
  gradient and the claim, nothing else. The Schraffur was tried twice — as a
  repeating gradient and as rotated bars — and Satori, which renders this file,
  drew neither. Rather than leave code that claims a motif nobody sees, the
  image carries only what it can actually print.
*/
export const alt = "CoArea: Gemeinsam nutzen, nachhaltig erleben."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#00655f",
          color: "#fff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: 8,
              textTransform: "uppercase",
            }}
          >
            CoArea
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
            Gemeinsam nutzen, nachhaltig erleben.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, opacity: 0.85, maxWidth: 820 }}>
            Ungenutzte Freiflächen mieten und anbieten. Schwerpunkt Nordrhein-Westfalen
            und Rheinland.
          </div>
        </div>
      </div>
    ),
    size,
  )
}
