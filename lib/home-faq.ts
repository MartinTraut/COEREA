import type { FaqItem } from "@/lib/faq"

/**
 * The homepage FAQ.
 *
 * Deliberately a different set from `BOOKING_FAQ`: that one answers "I am on a
 * listing and about to book", this one answers "I just landed here and do not
 * know what CoArea is". Same discipline though — each question is phrased the
 * way somebody would actually type it, and each answer opens with the direct
 * answer in its first sentence before the detail follows. That front-loading is
 * what makes an answer usable as a featured snippet or as the source an AI
 * assistant quotes.
 *
 * Every claim below has to hold against what the product does today, because
 * these questions are also published as FAQPage structured data (`faqNode`) —
 * so anything asserted here is asserted to Google and to anyone answering on
 * our behalf. Where something is planned rather than built (payment through the
 * platform, the map view, the magazine), the answer says so instead of
 * promising it.
 */
export const HOME_FAQ: readonly FaqItem[] = [
  {
    q: "Was genau ist CoArea und wie funktioniert die Plattform?",
    a: "CoArea ist ein Marktplatz, auf dem ungenutzte Freiflächen für eine bestimmte Zeit an Menschen vermietet werden, die sie sinnvoll nutzen wollen. Der Name setzt sich aus „Common“ und „Area“ zusammen. Eigentümer stellen ihre Fläche als Host kostenlos ein und legen Preis, Zeitraum und Nutzungsregeln selbst fest; Nutzerinnen und Nutzer suchen nach Ort, Zeitraum und Kategorie und schicken eine unverbindliche Anfrage. Verbindlich wird eine Buchung erst, wenn der Host sie bestätigt.",
  },
  {
    q: "Für wen lohnt sich CoArea, wer mietet hier Flächen und wer bietet sie an?",
    a: "CoArea richtet sich an zwei Seiten: an alle, die Fläche brauchen, und an alle, die Fläche übrig haben. Auf der Nutzerseite sind das etwa Urban-Gardening-Gruppen, Sportvereine, Veranstalter, Nachbarschaftsinitiativen, Landwirte und Gewerbetreibende mit Bedarf an Stell- oder Lagerfläche. Auf der Hostseite sind es private Eigentümer mit ungenutztem Garten oder Hinterhof, Landwirte und Forstbesitzer, Unternehmen mit brachliegenden Gewerbeflächen sowie Kommunen mit öffentlichen Plätzen und Grünanlagen.",
  },
  {
    q: "Was kostet es, meine eigene Fläche auf CoArea anzubieten?",
    a: "Das Einstellen einer Fläche ist für Hosts kostenlos, und Du bestimmst den Preis selbst. Du legst fest, ob pro Stunde, Tag, Woche oder Monat abgerechnet wird, für welchen Zeitraum die Fläche überhaupt freigegeben ist und welche Regeln für die Nutzung gelten. Jede Anfrage entscheidest Du einzeln. Es gibt keine automatische Buchung über Deinen Kopf hinweg.",
  },
  {
    q: "Welche Arten von Freiflächen kann ich über CoArea mieten?",
    a: "CoArea unterscheidet acht Flächenkategorien, und sie decken privaten wie öffentlichen Grund ab. Privat sind innerstädtische Gärten, Agrar- und Forstflächen, private Sport- und Freizeitflächen, gewerbliche Flächen sowie innerstädtische private Plätze. Öffentlich sind kommunale Sport- und Freizeitflächen, innerstädtische öffentliche Plätze und öffentliche Grünanlagen. An jedem Kategorie-Symbol siehst Du an der Schraffur sofort, ob es sich um privaten oder öffentlichen Grund handelt.",
  },
  {
    q: "In welchen Städten und Regionen finde ich derzeit Flächen auf CoArea?",
    a: "Der Schwerpunkt liegt heute in Nordrhein-Westfalen und im Rheinland, unter anderem in Köln, Düsseldorf, Bonn, Aachen, Essen, Dortmund, Wuppertal, Solingen, Neuss und Mönchengladbach. CoArea selbst sitzt in Köln. Über die Suche auf „Flächen entdecken“ siehst Du direkt, welche Flächen in Deinem Umkreis und in Deinem Zeitraum frei sind.",
  },
  {
    q: "Ist meine Anfrage sofort verbindlich und wann muss ich bezahlen?",
    a: "Nein. Eine Anfrage kostet nichts und bindet Dich zu nichts. Verbindlich wird die Buchung erst in dem Moment, in dem der Host sie bestätigt; erst danach wird auch bezahlt. Die Abwicklung vereinbarst Du derzeit direkt mit dem Host, eine integrierte Bezahlung über CoArea befindet sich im Aufbau. Nach der Bestätigung bekommst Du die Buchungsdetails und die Kontaktdaten des Hosts, um Zugang und Übergabe zu klären.",
  },
  {
    q: "Wie stelle ich als Eigentümer sicher, dass meine Fläche verantwortungsvoll genutzt wird?",
    a: "Du behältst die Kontrolle über jede einzelne Buchung. Du beschreibst in Deinem Inserat, was auf der Fläche erlaubt ist und was nicht, begrenzt die Zahl der Personen, gibst nur die Zeiträume frei, die Dir passen, und nimmst jede Anfrage einzeln an oder lehnst sie ab. Vor der Zusage kannst Du direkt mit der anfragenden Person sprechen; CoArea vermittelt, wenn es später Klärungsbedarf gibt.",
  },
  {
    q: "Was macht das Teilen von Flächen nachhaltiger als eine klassische Vermietung?",
    a: "Weil dabei keine neue Fläche gebraucht wird: Es wird genutzt, was ohnehin schon da ist. Jeder Garten, jeder Hinterhof und jede Brache, die zeitweise mitgenutzt wird, ersetzt eine Fläche, die sonst neu erschlossen und versiegelt würde. Dazu kommt der soziale Effekt: geteilte Flächen bringen Nachbarschaften, Vereine und Initiativen zusammen, statt Grundstücke weiter voneinander abzugrenzen.",
  },
] as const
