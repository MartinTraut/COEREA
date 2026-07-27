"use client"

/*
  The last line of defence: this catches failures in the root layout itself, so
  it has to bring its own <html> and <body> and cannot use anything from the
  layout — no header, no footer, no fonts, no globals.css guarantees. Styling is
  therefore inline and deliberately minimal; the brand colours are hard-coded
  because the token file may be exactly what failed to load.
*/
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="de">
      <body
        style={{
          margin: 0,
          minHeight: "100svh",
          display: "grid",
          placeItems: "center",
          padding: "2rem",
          background: "#f6f6f6",
          color: "#3d4442",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <main>
          <p style={{ color: "#008a84", fontWeight: 600, letterSpacing: "0.1em" }}>COAREA</p>
          <h1 style={{ margin: "1rem 0 0", fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}>
            Die Seite konnte nicht geladen werden
          </h1>
          <p style={{ margin: "1rem auto 0", maxWidth: "34rem", lineHeight: 1.6 }}>
            Bitte lade die Seite neu. Bleibt der Fehler bestehen, erreichst Du uns
            unter info@coarea.de.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2rem",
              padding: "0.85rem 1.75rem",
              border: 0,
              borderRadius: "0.5rem",
              background: "#008a84",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            neu laden
          </button>
          {error.digest ? (
            <p style={{ marginTop: "2rem", fontSize: "0.75rem", opacity: 0.7 }}>
              Fehlerkennung: {error.digest}
            </p>
          ) : null}
        </main>
      </body>
    </html>
  )
}
