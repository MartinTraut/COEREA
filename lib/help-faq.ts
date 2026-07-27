import type { FaqItem } from "@/lib/faq"

/**
 * The help centre, grouped by the situation somebody is in when they open it.
 *
 * The page used to show six cards that named a topic — „Zahlung: Preise,
 * Abwicklung und Rechnungen verstehen" — and answered none of them. Six
 * promises of help, six dead ends, and underneath it the booking FAQ, which
 * only covers one of the six. This is the actual content: every topic tile now
 * leads to a group of real questions, and the tiles are honest because the
 * answers exist.
 *
 * Same discipline as `BOOKING_FAQ` and `HOME_FAQ`. Questions phrased the way
 * somebody would type them, answers opening with the direct answer before the
 * detail, and no claim that the product cannot back: there is no payment
 * through the platform, no chat and no map view, so where those come up the
 * answer says they are being built rather than pretending they are here.
 *
 * These are published as FAQPage markup on /hilfe, which is the second reason
 * nothing here may be invented.
 */
export type HelpGroup = {
  /** Anchor target, also the tile's href. */
  id: string
  title: string
  /** One plain sentence under the tile — what this group is good for. */
  lead: string
  items: readonly FaqItem[]
}

export const HELP_GROUPS: readonly HelpGroup[] = [
  {
    id: "finden",
    title: "Fläche finden",
    lead: "Suchen, filtern und erkennen, ob eine Fläche zu Deinem Vorhaben passt.",
    items: [
      {
        q: "Wie finde ich eine passende Fläche in meiner Nähe?",
        a: "Über „Flächen entdecken“ in der Hauptnavigation. Dort suchst Du nach Ort, Zeitraum und Kategorie und siehst alle passenden Flächen als Karten mit Preis, Größe, Ort und Bewertung. Der Schwerpunkt liegt heute in Nordrhein-Westfalen und im Rheinland, unter anderem in Köln, Düsseldorf, Bonn, Aachen, Essen, Dortmund, Wuppertal, Solingen, Neuss und Mönchengladbach. Eine Kartenansicht ist in Vorbereitung; bis dahin führt die Ortssuche zum Ziel.",
      },
      {
        q: "Was bedeuten die acht Symbole und die Schraffur daneben?",
        a: "Die acht Symbole stehen für die acht Flächenkategorien, die Schraffur sagt Dir, wem der Grund gehört. Ein umschlossenes, schraffiertes Symbol steht für privaten Grund: innerstädtische Gärten, Agrar- und Forstflächen, private Sport- und Freizeitflächen, gewerbliche Flächen und private Plätze. Ein offenes Symbol steht für öffentlichen Grund: kommunale Sport- und Freizeitflächen, öffentliche Plätze und öffentliche Grünanlagen. So siehst Du vor dem Klick, worauf Du Dich einlässt.",
      },
      {
        q: "Woher weiß ich, ob eine Fläche für mein Vorhaben überhaupt geeignet ist?",
        a: "Aus dem Inserat: Der Host beschreibt dort, was auf seiner Fläche erlaubt ist, wie groß sie ist, wie viele Personen sie gleichzeitig nutzen dürfen und was an Ausstattung und Zufahrt vorhanden ist. Steht etwas nicht dabei, frag ihn vor der Anfrage. Das ist ausdrücklich erwünscht und für beide Seiten der schnellste Weg, sich Enttäuschungen zu ersparen.",
      },
      {
        q: "Kann ich mir Flächen merken und später wiederfinden?",
        a: "Ja, über das Herz-Symbol auf jeder Fläche. Gemerkte Flächen sammelt CoArea für Dich, damit Du sie später vergleichen kannst, ohne erneut zu suchen. Die Merkliste liegt in diesem Prototyp in Deinem Browser, ist also an das Gerät gebunden, an dem Du gerade sitzt.",
      },
    ],
  },
  {
    id: "buchen",
    title: "Anfragen & buchen",
    lead: "Was beim Absenden passiert, ab wann es verbindlich ist und wie Du stornierst.",
    items: [
      {
        q: "Wie läuft eine Buchung auf CoArea ab und wann ist sie verbindlich?",
        a: "Du wählst Deinen Zeitraum aus und schickst eine Buchungsanfrage an den Host. Verbindlich wird die Buchung erst, wenn der Host sie bestätigt. Bis dahin entstehen Dir keine Kosten. Nach der Bestätigung erhältst Du die Buchungsdetails und die Kontaktdaten des Hosts und klärst alles Weitere, etwa die Schlüssel- oder Zugangsübergabe, direkt mit ihm per E-Mail oder Telefon.",
      },
      {
        q: "Was passiert direkt nach dem Absenden meiner Anfrage?",
        a: "Deine Anfrage geht an den Host, und Du bekommst eine Bestätigung, dass sie angekommen ist. Der Host sieht Zeitraum und Fläche und entscheidet über genau diese eine Anfrage. Er kann sie annehmen oder ablehnen, und er kann Dich vorher ansprechen, wenn er etwas wissen möchte. Solange er nicht zugesagt hat, bist Du zu nichts verpflichtet.",
      },
      {
        q: "Kann ich eine Buchung wieder stornieren und was kostet mich das?",
        a: "Solange der Host Deine Anfrage noch nicht bestätigt hat, kostet ein Rückzieher nichts. Verbindlich wird die Buchung erst mit seiner Bestätigung. Danach vereinbarst Du eine Storno direkt mit dem Host; einheitliche Fristen und Gebühren gibt es bei CoArea derzeit nicht. Melde Dich in dem Fall so früh wie möglich, damit er die Fläche neu vergeben kann.",
      },
      {
        q: "Kann ich eine Fläche auch langfristig über mehrere Monate mieten?",
        a: "Ja, langfristige Nutzung ist ausdrücklich vorgesehen. Wähle dafür einfach einen entsprechend langen Zeitraum aus. Viele Flächen, etwa Gartenparzellen oder Agrarflächen, sind ohnehin saisonal oder auf Monatsbasis ausgeschrieben. Für längere Laufzeiten oder individuelle Konditionen sprich den Host direkt an.",
      },
    ],
  },
  {
    id: "bezahlen",
    title: "Preise & Bezahlung",
    lead: "Worauf sich der Preis bezieht, wann gezahlt wird und wie die Abwicklung heute läuft.",
    items: [
      {
        q: "Wann und wie bezahle ich die gemietete Fläche?",
        a: "Bezahlt wird erst, nachdem der Host Deine Anfrage bestätigt hat. Bis dahin entstehen Dir keine Kosten. Die Abwicklung vereinbarst Du derzeit direkt mit dem Host; eine Zahlung über die Plattform ist in Vorbereitung. Der angezeigte Preis bezieht sich immer auf die Einheit, die am Inserat steht: je nach Fläche pro Stunde, Tag, Woche oder Monat.",
      },
      {
        q: "Welche Zahlungsarten akzeptiert CoArea?",
        a: "Aktuell legt das der Host fest. Zahlungsarten wie Überweisung oder Barzahlung vereinbarst Du nach seiner Bestätigung direkt mit ihm. Eine integrierte Bezahlung über CoArea wird gerade aufgebaut; welche Methoden dann zur Verfügung stehen, steht vor dem Abschluss transparent im Buchungsschritt. Frag im Zweifel vorher nach, damit es beim Nutzungsbeginn keine Überraschung gibt.",
      },
      {
        q: "Worauf bezieht sich der Preis, den ich an der Fläche sehe?",
        a: "Auf die Einheit, die direkt neben dem Betrag steht. „220 € pro Tag“ heißt: der Host rechnet tageweise ab. Je nach Fläche ist das eine Stunde, ein Tag, eine Woche oder ein Monat, und der Host legt diese Einheit selbst fest. Im Buchungsfenster siehst Du vor dem Absenden, was Dein gewählter Zeitraum insgesamt ergibt.",
      },
    ],
  },
  {
    id: "inserieren",
    title: "Eigene Fläche anbieten",
    lead: "Was das Inserat kostet, wie viel Kontrolle Du behältst und wie Du startest.",
    items: [
      {
        q: "Was kostet es, meine eigene Fläche auf CoArea anzubieten?",
        a: "Das Einstellen einer Fläche ist für Hosts kostenlos, und Du bestimmst den Preis selbst. Du legst fest, ob pro Stunde, Tag, Woche oder Monat abgerechnet wird, für welchen Zeitraum die Fläche überhaupt freigegeben ist und welche Regeln für die Nutzung gelten. Jede Anfrage entscheidest Du einzeln. Es gibt keine automatische Buchung über Deinen Kopf hinweg.",
      },
      {
        q: "Ich besitze eine ungenutzte Fläche: Wie biete ich sie an?",
        a: "Über „Host werden“ legst Du Deine Fläche kostenlos an und bestimmst Preis, Zeitraum und Nutzungsregeln. Passend sind alle acht CoArea-Kategorien: private Gärten, Agrar- und Forstflächen, öffentliche und private Sport- und Freizeitflächen, gewerbliche Flächen sowie innerstädtische Plätze und Grünanlagen. Danach erreichen Dich Anfragen, und Du entscheidest bei jeder einzeln, ob Du sie annimmst.",
      },
      {
        q: "Wie stelle ich sicher, dass meine Fläche verantwortungsvoll genutzt wird?",
        a: "Du behältst die Kontrolle über jede einzelne Buchung. Du beschreibst in Deinem Inserat, was auf der Fläche erlaubt ist und was nicht, begrenzt die Zahl der Personen, gibst nur die Zeiträume frei, die Dir passen, und nimmst jede Anfrage einzeln an oder lehnst sie ab. Vor der Zusage kannst Du direkt mit der anfragenden Person sprechen; CoArea vermittelt, wenn es später Klärungsbedarf gibt.",
      },
    ],
  },
  {
    id: "sicherheit",
    title: "Sicherheit & Klärung",
    lead: "Schäden, Konflikte und wie Du den Host erreichst, wenn etwas ist.",
    items: [
      {
        q: "Was passiert, wenn an der Fläche oder am Mobiliar etwas beschädigt wird?",
        a: "Schäden klärst Du direkt mit dem Host, und CoArea unterstützt bei der Kommunikation und Vermittlung. Melde einen Schaden möglichst sofort beim Host und dokumentiere ihn mit Fotos. Das macht die Klärung für beide Seiten einfach. Für die eigentliche Nutzung gilt: behandle die Fläche so, wie Du sie vorgefunden hast.",
      },
      {
        q: "Wie erreiche ich den Host, wenn vor Ort etwas nicht stimmt?",
        a: "Nach der Bestätigung hast Du seine Kontaktdaten, also E-Mail und Telefon, und meldest Dich direkt bei ihm. Das ist bei einem kurzfristigen Problem der schnellste Weg. Kommt Ihr nicht weiter, wende Dich an unser Team; wir vermitteln zwischen beiden Seiten. Eine Chatfunktion innerhalb von CoArea ist in Vorbereitung.",
      },
      {
        q: "Wie viele Personen dürfen die Fläche gleichzeitig mit mir nutzen?",
        a: "Das legt der Host in der Flächenbeschreibung fest, und diese Zahl findest Du im Feld „User“ am Inserat. Gemeinschaftliche Nutzung ist bei CoArea ausdrücklich erwünscht; der Name kommt von „Common“ und „Area“. Wenn Du mit einer größeren Gruppe planst als angegeben, frag den Host vorher direkt.",
      },
    ],
  },
  {
    id: "konto",
    title: "Konto & Merkliste",
    lead: "Wann Du ein Konto brauchst und wo Du Deine Flächen und Anfragen findest.",
    items: [
      {
        q: "Brauche ich ein Konto, um auf CoArea zu suchen?",
        a: "Nein. Suchen, filtern und alle Flächen im Detail ansehen kannst Du ohne Konto. Ein Konto brauchst Du erst, wenn Du eine Anfrage stellst oder selbst eine Fläche anbietest, weil der Host dann wissen muss, mit wem er es zu tun hat.",
      },
      {
        q: "Wie melde ich mich an, und was sehe ich danach?",
        a: "Über „anmelden“ oben rechts. Danach findest Du unter „Mein Konto“ Deine inserierten Flächen, Deine Anfragen und Deine Bewertungen an einer Stelle. Diese Vorabversion von CoArea arbeitet noch ohne echte Konten: Die Anmeldung führt Dich in einen Demo-Zugang, damit Du die Host-Ansicht ansehen kannst, ohne Dich wirklich registrieren zu müssen.",
      },
    ],
  },
] as const

/** Every question on the help page, flat — for the FAQPage markup. */
export const HELP_FAQ: readonly FaqItem[] = HELP_GROUPS.flatMap((g) => g.items)
