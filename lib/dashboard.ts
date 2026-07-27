/**
 * Host dashboard data, read off the "Dashboard Host Desktop" Figma frame.
 * Static for Phase 1 — there is no backend yet.
 */
import { LISTINGS, otherListingsByHost } from "@/lib/listings"

/*
  The dashboard host is one of the hosts in the listing data, not a second
  record. It used to be typed out again here with a diverging rating format,
  which meant the profile and that host's own listings could drift apart.
*/
const HOST_NAME = "Roland Schick"
/*
  This was `LISTINGS.find(...)!.host` — a non-null assertion on `find` at module
  scope. Renaming or removing that host in the listing data would have thrown a
  bare `TypeError: Cannot read properties of undefined` at import time, during
  the build, with nothing in the message pointing here. Failing on purpose costs
  one line and names the actual problem.
*/
const hostListing = LISTINGS.find((l) => l.host.name === HOST_NAME)
if (!hostListing) {
  throw new Error(
    `Dashboard-Host „${HOST_NAME}" ist in LISTINGS nicht vorhanden; lib/dashboard.ts liest sein Profil von dort.`,
  )
}
const host = hostListing.host

export const HOST_PROFILE = {
  ...host,
  ratingAvg: host.ratingAvg.toLocaleString("de-DE"),
  image: "/images/host-roland-schick.jpg",
}

/*
  All four of these pointed at "/dashboard" — the page they are rendered on.
  A link that reloads the current page is the same dead control as href="#",
  just harder to spot. None of these areas exists yet, so `href` is optional and
  they render as plain labels, the way ACCOUNT_NAV already handles it.
*/
export const QUICK_LINKS: { label: string; href?: string; count?: number }[] = [
  { label: "Chat Nachrichten", count: 3 },
  { label: "Buchungsanfragen", count: 1 },
  { label: "Buchungsübersicht" },
  { label: "Deine Bestellungen" },
]

/*
  The host's own areas. This used to be a hand-written slug list that had four
  entries while the headline claimed five — and three of the four belonged to
  other hosts. Deriving it means the count and the cards can no longer disagree.
*/
export const LISTED_AREA_SLUGS = otherListingsByHost(HOST_NAME, "").map((l) => l.slug)

/*
  Quarter overview — four vertices (axis, April, Mai, Juni) per series.

  „geteilt" used to be #3083c1, a blue that appears nowhere else on the site:
  four lines in one picture, three of them brand and one of them from a stock
  chart palette. It is now the light end of the teal scale, so the whole figure
  is teal, gold and grey, and the one line that matters most — Buchungen — is
  the only full-strength teal in it.
*/
export const QUARTER_SERIES = [
  { label: "angeschaut", color: "#a8adab", points: [190, 225, 252, 275] },
  { label: "gespeichert", color: "#feca24", points: [110, 190, 240, 228] },
  { label: "geteilt", color: "#7fc3bd", points: [72, 63, 173, 173] },
  { label: "Buchungen", color: "#008a84", points: [52, 53, 62, 123] },
]

export const QUARTER_MONTHS = ["April", "Mai", "Juni"]

/*
  Earnings per month in euros. These were bare fractions of the bar height
  before — unlabelled, unscaled and impossible to reconcile with the headline
  figure. Real amounts let the chart carry a euro axis, and the headline total
  is summed from them rather than typed out a second time.
*/
export const EARNINGS_BY_MONTH: { month: string; euros: number }[] = [
  { month: "J", euros: 92 },
  { month: "F", euros: 128 },
  { month: "M", euros: 215 },
  { month: "A", euros: 284 },
  { month: "M", euros: 361 },
  { month: "J", euros: 398 },
  { month: "J", euros: 398 },
  { month: "A", euros: 0 },
  { month: "S", euros: 0 },
  { month: "O", euros: 0 },
  { month: "N", euros: 0 },
  { month: "D", euros: 0 },
]

export const EARNINGS_TOTAL = EARNINGS_BY_MONTH.reduce((sum, m) => sum + m.euros, 0)

export const eur = (value: number) =>
  value.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })

export const STATS = {
  listed: LISTED_AREA_SLUGS.length,
  earningsSince: "01.01.2023",
  earnings: eur(EARNINGS_TOTAL),
}

export const HOST_SUPPORT = {
  name: "Florian Hessing",
  role: "Host Support",
  image: "/images/support-florian-hessing.jpg",
  email: "f.hessing@coarea.de",
  /* Same correction as SITE.contact: "+49 0…" is not a dialable number. */
  phone: "+49 2131 430 04 441",
  phoneHref: "+49213143004441",
}

export const HOST_REVIEWS = [
  {
    title: "Buchung ging super schnell",
    body: "Alles super. Buchung ging schnell und der Austausch mit dem Host war auch unkompliziert. Ich wollte mir mehr Wissen aneignen, wie man Lamas züchtet und richtig haltet, ohne dafür ein Vermögen ausgeben zu müssen. Mein Host hat mir dabei geholfen und CoArea hat mich unterstützt, dass ich für meine Lamas Wassertränke organisiere und die Fläche anständig umzäunt ist. Gerne wieder!",
    role: "User",
    author: "Dennis P",
  },
  {
    title: "Mein persönliches Stück Paradies",
    body: "Ich bin begeistert von meinem angemieteten Garten, einem wahr gewordenen Traum mit einer Vielzahl von Pflanzen, Bäumen und Blumen. Ein grüner Rückzugsort, perfekt zum Anbauen von Gemüse und Kräutern und zur Entspannung in meiner grünen Oase. Absolut empfehlenswert, auch für mich ohne grünen Daumen!",
    role: "User",
    author: "Lisa-Marie B",
  },
]
