/**
 * Booking FAQ shown on every listing detail page.
 *
 * Written interview-style: each question is phrased the way a user would
 * actually type or ask it, and each answer opens with the direct answer in the
 * first sentence before adding the detail. That front-loading is what makes an
 * answer usable as a featured snippet or as a source for an AI answer.
 *
 * Every statement here has to be backed by what the product actually does — the
 * booking flow, the host confirmation step and the category system — because
 * these questions are also published as FAQPage structured data (see
 * `faqNode` in lib/schema.ts), so anything claimed here is claimed to Google
 * and to any AI answering on our behalf.
 *
 * The header used to assert exactly that while the answers below broke it: they
 * promised credit card, SEPA and PayPal payment and a "Bezahlschritt", per-area
 * cancellation terms "transparent im Inserat", a chat function (four times) and
 * a "Kartenansicht". None of those exist — the prototype has no payment, no
 * chat and no map, and `discover.tsx` and `account-nav.tsx` say so on the page
 * itself. Those answers now describe the actual flow, and where something is
 * merely planned they say that it is planned.
 */
export type FaqItem = { q: string; a: string }

export const BOOKING_FAQ: readonly FaqItem[] = [
  {
    q: "Wie läuft eine Buchung auf CoArea ab und wann ist sie verbindlich?",
    a: "Du wählst Deinen Zeitraum aus und schickst eine Buchungsanfrage an den Host — verbindlich wird die Buchung erst, wenn der Host sie bestätigt. Bis dahin entstehen Dir keine Kosten. Nach der Bestätigung erhältst Du die Buchungsdetails und die Kontaktdaten des Hosts und klärst alles Weitere — etwa die Schlüssel- oder Zugangsübergabe — direkt mit ihm per E-Mail oder Telefon.",
  },
  {
    q: "Wann und wie bezahle ich die gemietete Fläche?",
    a: "Bezahlt wird erst, nachdem der Host Deine Anfrage bestätigt hat — bis dahin entstehen Dir keine Kosten. Die Abwicklung vereinbarst Du derzeit direkt mit dem Host; eine Zahlung über die Plattform ist in Vorbereitung. Der angezeigte Preis bezieht sich immer auf die Einheit, die am Inserat steht — je nach Fläche pro Stunde, Tag, Woche oder Monat.",
  },
  {
    q: "Welche Zahlungsarten akzeptiert CoArea?",
    a: "Aktuell legt das der Host fest — Zahlungsarten wie Überweisung oder Barzahlung vereinbarst Du nach seiner Bestätigung direkt mit ihm. Eine integrierte Bezahlung über CoArea wird gerade aufgebaut; welche Methoden dann zur Verfügung stehen, steht vor dem Abschluss transparent im Buchungsschritt. Frag im Zweifel vorher nach, damit es beim Nutzungsbeginn keine Überraschung gibt.",
  },
  {
    q: "Kann ich eine Buchung wieder stornieren und was kostet mich das?",
    a: "Solange der Host Deine Anfrage noch nicht bestätigt hat, kostet ein Rückzieher nichts — verbindlich wird die Buchung erst mit seiner Bestätigung. Danach vereinbarst Du eine Storno direkt mit dem Host; einheitliche Fristen und Gebühren gibt es bei CoArea derzeit nicht. Melde Dich in dem Fall so früh wie möglich, damit er die Fläche neu vergeben kann.",
  },
  {
    q: "Wie viele Personen dürfen die Fläche gleichzeitig mit mir nutzen?",
    a: "Das legt der Host in der Flächenbeschreibung fest, und diese Zahl findest Du im Feld „User“ am Inserat. Gemeinschaftliche Nutzung ist bei CoArea ausdrücklich erwünscht — der Name kommt von „Common“ und „Area“. Wenn Du mit einer größeren Gruppe planst als angegeben, frag den Host vorher direkt.",
  },
  {
    q: "Gibt es Parkmöglichkeiten an der Fläche?",
    a: "Ob und wie viele Parkplätze vorhanden sind, steht in der jeweiligen Flächenbeschreibung — das unterscheidet sich von Fläche zu Fläche stark. Bei innerstädtischen Gärten und Plätzen ist meist öffentlicher Parkraum in der Nähe, bei Agrar- und Forstflächen gibt es häufig eine eigene Zufahrt. Steht dazu nichts im Inserat, frag den Host direkt.",
  },
  {
    q: "Was passiert, wenn an der Fläche oder am Mobiliar etwas beschädigt wird?",
    a: "Schäden klärst Du direkt mit dem Host, und CoArea unterstützt bei der Kommunikation und Vermittlung. Melde einen Schaden möglichst sofort beim Host und dokumentiere ihn mit Fotos — das macht die Klärung für beide Seiten einfach. Für die eigentliche Nutzung gilt: behandle die Fläche so, wie Du sie vorgefunden hast.",
  },
  {
    q: "Kann ich eine Fläche auch langfristig über mehrere Monate mieten?",
    a: "Ja, langfristige Nutzung ist ausdrücklich vorgesehen. Wähle dafür einfach einen entsprechend langen Zeitraum aus — viele Flächen, etwa Gartenparzellen oder Agrarflächen, sind ohnehin saisonal oder auf Monatsbasis ausgeschrieben. Für längere Laufzeiten oder individuelle Konditionen sprich den Host direkt an.",
  },
  {
    q: "In welchen Städten und Regionen finde ich Flächen auf CoArea?",
    a: "Der Schwerpunkt liegt derzeit in Nordrhein-Westfalen und im Rheinland — unter anderem in Köln, Düsseldorf, Bonn, Aachen, Essen, Dortmund, Wuppertal, Solingen, Neuss und Mönchengladbach. CoArea selbst sitzt in Köln. Über die Suche und die Standortübersicht auf „Flächen entdecken“ siehst Du direkt, welche Flächen in Deinem Umkreis frei sind.",
  },
  {
    q: "Ich besitze selbst eine ungenutzte Fläche — wie biete ich sie auf CoArea an?",
    a: "Du legst Deine Fläche als Host kostenlos an und bestimmst selbst Preis, Zeitraum und Nutzungsregeln. Passend sind alle acht CoArea-Kategorien: private Gärten, Agrar- und Forstflächen, öffentliche und private Sport- und Freizeitflächen, gewerbliche Flächen sowie innerstädtische Plätze und Grünanlagen. Du entscheidest bei jeder Anfrage einzeln, ob Du sie annimmst.",
  },
] as const
