/**
 * Editorial content for the category landing pages ("Flächen entdecken" with a
 * category selected). Four of the eight categories have a dedicated Figma frame;
 * the others fall back to the plain filtered discover view.
 *
 * The body copy is taken verbatim from the CoArea brochure (Daniela Götz, SoSe 2023),
 * which is the source the Figma frames themselves were set from. In the exports the
 * scenario text runs underneath the following section band and gets visually cut off
 * — an artefact of the Adobe-XD import. The full passage is kept here.
 */
export type CategoryPage = {
  /** Matches Category.slug in lib/categories.ts */
  slug: string
  /** Line directly under the framed category heading. */
  subline: string
  intro: string[]
  introImage: string
  story: {
    heading: string
    paragraphs: string[]
    image: string
    quote?: { text: string; author: string }
  }
}

export const CATEGORY_PAGES: CategoryPage[] = [
  {
    slug: "private-gaerten",
    subline: "Auch andere Eigentümer haben schöne Gärten zum Teilen.",
    intro: [
      "Egal ob privater Garten eines Einfamilienhauses, ungenutzte Grünfläche einer Eigentumsgemeinschaft oder der Hinterhofgarten einer großen Wohngesellschaft: Überall im Land wird diesen kostbaren Flächen nicht ausreichend Beachtung geschenkt. Das Potenzial einer gemeinschaftlichen Nutzung wird dank CoArea nicht weiter vernachlässigt.",
    ],
    introImage: "/images/kategorie-private-gaerten-intro.jpg",
    story: {
      heading: "Urbanes Leben und seine Probleme",
      image: "/images/kategorie-private-gaerten-story-2.jpg",
      quote: {
        text: "Wir können mitten in der Stadt gärtnern und unsere Kinder sind begeistert.",
        author: "Familie Müller",
      },
      paragraphs: [
        "Bei Familie Schmitz ist nun auch die jüngste Tochter ausgezogen und somit steht den Eltern die gesamte Doppelhaushälfte und der dazugehörige Garten zur Verfügung. Im Zimmer des schon länger ausgezogenen Sohnes befindet sich mittlerweile ein kleiner Fitness- und Wellnessbereich in dem sich Hanteln und ein Yogaschrein die Hand geben. Frau Schmitz kann hier zur inneren Ruhe finden und Herr Schmitz kann seinen Freunden erzählen, dass er bald anfangen wird, die überfälligen Kilos abzutrainieren. Im Zimmer der nun im Ausland studierenden Tochter soll bald eine Heimkinoanlage die Abendgestaltung von Familie Schmitz bereichern.",
        "Einzig der große Garten findet aktuell nicht mehr die Zuwendung, die er früher erhalten hat. Als die Kinder klein waren, wurde jede freie Minute mit der Erkundung der Pflanzenwelt und der Suche nach Abenteuern im Gebüsch genutzt. Später wurden im Sommer die Wochenenden faulenzend auf der Wiese verbracht und regelmäßig Grillabende mit befreundeten Eltern und Kindern durchlebt.",
        "Heute ist die Gartenarbeit überwältigend für die alternden Familienoberhäupter und das Planschbecken wurde schon seit Jahren nicht mehr aus dem Schuppen geholt. Ein Umzug kommt nicht in Frage doch gerade vor dem Hintergrund der Nachhaltigkeit stört sich Familie Schmitz an der ungenutzten Fläche im Garten.",
        "Gleichzeitig ist bei Familie Müller das nun dritte Kind auf dem Weg. Mutter und Vater sind berufstätig, aber genießen die Zeit mit ihrer bald noch größeren Familie sehr. Sie leben in einer Altbauwohnung in der Innenstadt. Es gibt genug Räume für die zukünftig fünfköpfige Familie zum leben, nur der zur Straße hin gelegene Balkon kommt an seine Grenzen, wenn es darum geht, Freizeit zu genießen.",
        "Die Familie wünscht sich gerne öfters eine eigene Grünfläche zum spielen, toben, erholen und entspannen, und das ohne auf die eigene Privatsphäre verzichten zu müssen. So wie im nahliegenden und überfüllten Stadtpark. Sie möchten ungerne ihre jetzige Wohnung deswegen verlassen.",
        "Nachdem Familie Schmitz ihre große Gartenfläche bei CoArea inseriert hat, entdeckt Familie Müller das Angebot und bucht diesen Garten für eine kurze Zeit. Als die beiden Familien sich bei der Übergabe des Gartens kennenlernten, verstanden sie sich auf Anhieb und es entwickelte sich eine Freundschaft zwischen ihnen.",
        "Da Familie Müller den Garten sehr genoss und sich darin wohl fühlte, buchten sie diesen immer öfter bei Familie Schmitz. Diese waren sehr glücklich darüber, dass ihr Garten nun wieder genutzt wurde und sie durch die Teilhabe an CoArea weitere Freundschaften knüpfen konnten. Familie Müller konnte nun endlich ihren Wunsch nach einer eigenen Grünfläche erfüllen, ohne ihre geliebte Altbauwohnung in der Innenstadt aufgeben zu müssen. Die beiden Familien teilten den Garten und verbrachten gemeinsam schöne Stunden, während Familie Schmitz nun wieder die Pflege des Gartens genießen konnte, ohne sich dabei überfordert zu fühlen.",
        "Durch CoArea konnten beide Familien ihre Bedürfnisse erfüllen und gleichzeitig neue Freundschaften schließen. Dies ist ein Beispiel dafür, wie CoArea dazu beitragen kann, Menschen miteinander zu verbinden und nachhaltiges Handeln zu fördern.",
      ],
    },
  },
  {
    slug: "agrar-forst",
    subline: "Eine ungenutzte Agrarfläche mit vielen Möglichkeiten",
    intro: [
      "Ganz gleich, ob es sich um ungenutzte Agrarflächen in ländlichen Gebieten, brachliegende Felder oder landwirtschaftliche Flächen in Besitz von Bauernhöfen handelt: Überall im Land bleibt das Potenzial dieser wertvollen Areale oft ungenutzt. Doch mit CoArea können wir diese Flächen in vollem Umfang nutzen und gemeinschaftlich davon profitieren. Eine innovative Lösung, um die Nutzung von Agrarflächen neu zu gestalten und die landwirtschaftliche Produktion zu optimieren.",
    ],
    introImage: "/images/kategorie-agrar-forst-intro.jpg",
    story: {
      heading: "Agrarflächen für alle",
      image: "/images/kategorie-agrar-forst-story.jpg",
      quote: {
        text: "Durch CoArea konnten wir uns den Traum von einem eigenen kleinen Bauernhof verwirklichen!",
        author: "Burhan Ay",
      },
      paragraphs: [
        "Ein Beispiel einer umweltfreundlichen Lösung für die Nutzung einer ungenutzten Agrarfläche zeigt Herr Burhan Ay mit seiner Partnerin anhand eines außergewöhnlich schönen Szenarios.",
        "Herr Burhan Ay und seine Lebenspartnerin Sandra Frey lieben die Natur. Am liebsten verbringt das Paar ihren Urlaub in der idyllischen Heimat bei Burhans Großeltern. Insbesondere hatte es ihnen die Tierzucht angetan, doch bisher hatten sie nicht die Möglichkeit, ihren Traum von einem eigenen Bauernhof in ihrer Nähe zu verwirklichen. Eines Tages stieß Burhan auf die Website von CoArea.",
        "Zu seiner Freude fand er eine große ungenutzte Agrarfläche in seiner Nähe, die er sofort buchte. CoArea bot ihm nicht nur die Möglichkeit, die Parzelle nach seinen Wünschen zu gestalten, sondern auch Zugang zu Sonderwünschen wie elektrischen Drähten, Wasserschalen und Werkzeugen an. Als er den Host dieser Fläche, Herrn Roland Schick, kennenlernte, erfuhr er, dass dieser kurz vor seiner Rente stand und den größten Teil seiner Agrarflächen einfach nicht mehr nutzte.",
        "Roland hatte beschlossen, mit Hilfe von CoArea rund 2 Hektar seines Besitzes in verschieden große Parzellen zu unterteilen, umzäunen und auszubauen, um sie an Interessenten wie Burhan und Sandra zu vermieten. Nach einigen Gesprächen einigten sich Burhan und Roland auf eine langfristige Miete.",
        "Schon bald nach der Buchung besorgte sich Burhan Schafe, die er gemeinsam mit Sandra in ihrer neuen CoArea behütete und aufzog. Die beiden waren begeistert davon, dass sie endlich ihren Traum von einem eigenen Bauernhof verwirklichen konnten und ihre Zeit in der Natur verbringen konnten. Durch die Plattform CoArea fanden sie nicht nur eine passende Fläche, sondern auch einen freundlichen und hilfsbereiten Vermieter und zahlreiche weitere Möglichkeiten, um ihre Fläche optimal zu nutzen. Es war ein wahr gewordener Traum für Burhan und Sandra, und sie waren dankbar für die Unterstützung, die sie durch CoArea erhalten haben.",
      ],
    },
  },
  {
    slug: "oeffentlicher-sport",
    subline: "Unterstützung für Deine Leidenschaft",
    intro: [
      "Von öffentlichen Parks und Freizeitflächen bis hin zu privaten Sportanlagen und den Spielfeldern von Vereinen: Überall schlummert ein ungenutztes Potenzial. Außerhalb des geregelten Betriebes und insbesondere zu Ferienzeiten sind diese Flächen oft nicht ausgelastet.",
      "Ein gigantisches Potenzial für Nutzer und Betreiber dieser Flächen, welches einfach nicht abgerufen wird. Mit unserer innovativen Plattform wird die gemeinschaftliche Nutzung von Sportflächen für Veranstaltungen, Events und vieles mehr zur Realität.",
    ],
    introImage: "/images/kategorie-oeffentlicher-sport-intro.jpg",
    story: {
      heading: "Sport und Gemeinschaft gehören zusammen",
      image: "/images/kategorie-oeffentlicher-sport-story.jpg",
      paragraphs: [
        "Maik, Raphael, Elyas und Fatih sind vier beste Freunde, die nicht nur eine gemeinsame Leidenschaft für Fußball teilen, sondern auch für ihre Gemeinschaft einstehen. Sie setzen sich für Chancengleichheit ein und kämpfen gegen Kriminalität in ihrer Gegend.",
        "Um den Kindern in ihrer Gemeinschaft zu helfen, beschließen sie, ein Charity-Event zu veranstalten, bei dem sie ein Fußballturnier und Catering anbieten, das von den Müttern der Jungs zubereitet wird. Die Einnahmen sollen für vernachlässigte Kinder in der Nachbarschaft gespendet werden.",
        "Die Jungs wenden sich an die kommunalen Sporthallen in ihrer Stadt, um eine Veranstaltung zu organisieren, aber sie erhalten nur Absagen oder werden von Behörden aufgehalten, die nicht helfen können. Schließlich entdecken sie auf der Plattform CoArea eine Möglichkeit, einen Kunstrasenplatz plus vier zusätzliche Tore für das Fußballturnier zu mieten. Der örtliche Sportverein, Sportring 09, bietet den Jungs die Möglichkeit, die Fläche für ihre Veranstaltung zu nutzen.",
        "CoArea unterstützt die Jungs auch bei der Ausstattung des Events mit speziellen Wünschen wie Leibchen und Fußbällen. Die Veranstaltung ist ein großer Erfolg und die Jungs können den Erlös für vernachlässigte Kinder in ihrer Gegend spenden. Nach diesem Erfolg beschließen sie, häufiger solche Events zu veranstalten und dabei auf CoArea als Unterstützung zurückzugreifen. Die Jungs beweisen, dass sie nicht nur gute Fußballspieler, sondern auch echte Vorbilder und Helfer in ihrer Gemeinschaft sind.",
      ],
    },
  },
  {
    slug: "gewerbe",
    subline: "CoArea: Eine Erfolgsgeschichte des Zusammenkommens und Teilens",
    intro: [
      "Gewerbeimmobilien zeichnen unser Stadtbild im ganz besonderen Maße aus. Sie nehmen insbesondere den Raum ein, der für die praktische Umsetzung ihrer Tätigkeiten benötigt wird. Dabei spielt es keine Rolle, ob Bürogebäude, kleine mittelständische Handwerksbetriebe oder Einzelhändler — bei jedem Gewerbe steckt großes Flächenpotenzial, welches insbesondere außerhalb der Betriebszeiten ertragsbringend mit der Gemeinschaft geteilt werden kann. Das nachfolgende Szenario beschäftigt sich dabei mit einer besonders charmanten Möglichkeit der Teilhabe.",
    ],
    introImage: "/images/kategorie-gewerbe-intro.jpg",
    story: {
      heading: "CoArea — eine zentrale Plattform für nachhaltige Flächennutzung",
      image: "/images/kategorie-gewerbe-story.jpg",
      paragraphs: [
        "In einem kleinen Quartier leben die Eltern von Maja, Alina, Julia, Christian, Paul und Melanie. Sie kannten sich gut untereinander und ihre Kinder haben gerade die Geschwister-Scholl-Grundschule abgeschlossen. Mit dem Schulabschluss kam auch die Frage auf, was mit den alten Schulsachen wie Schulranzen, Schulbüchern und weiteren Gegenständen geschehen sollte. Die Elterngemeinschaft beschloss, diese Gegenstände gemeinsam zu verkaufen und die Einnahmen wohltätigen Zwecken zukommen zu lassen.",
        "Um den Flohmarkt zu organisieren, begaben sich die Eltern auf die Suche nach einer passenden Fläche. Sie stießen auf die Webseite von CoArea, einer Plattform, die Räume und Flächen für verschiedene Anlässe vermittelt. Dort fanden sie die gewerbliche Fläche von Schreiner Hans Schüller, der eine eigene Schreinerei in der Nähe der Geschwister-Scholl-Grundschule besaß. Diese Fläche wurde wochentags für den Einfahrtsverkehr zu seiner Schreinerei genutzt. Doch an Sonn- und Feiertagen war sie verfügbar und Hans war gerne bereit, sie für kleinere Veranstaltungen wie den Flohmarkt zu vermieten.",
        "Die Eltern kontaktierten Hans und erklärten ihm ihr Vorhaben. Er zeigte sich sehr zuvorkommend und unterstützte die Eltern tatkräftig. Die perfekte Lage der Fläche in der Stadt und die Unterstützung von Hans machten den Flohmarkt zu einem riesigen Erfolg. Viele Menschen aus der Umgebung besuchten den Markt und fanden Freude an den angebotenen Schulutensilien, Spielsachen und Kleidungsstücken. Die Eltern konnten eine beträchtliche Summe an Einnahmen für wohltätige Zwecke sammeln und anschließend spenden.",
        "Das Szenario verdeutlicht den Mehrwert, den CoArea für beide Parteien bot. Die Eltern der Kinder konnten dank der Plattform schnell und verbindlich eine passende Fläche für ihren Flohmarkt finden. Hans Schüller wiederum konnte durch die Bereitstellung seiner Fläche zusätzliche Einnahmen generieren. Die Zusammenarbeit zwischen den Eltern und Hans ermöglichte nicht nur den Erfolg des Flohmarkts, sondern auch die Unterstützung wohltätiger Zwecke.",
        "Dank CoArea konnten sowohl die Eltern der Kinder als auch Hans Schüller bestmöglich voneinander profitieren. Die Eltern fanden schnell eine geeignete Fläche für ihren Flohmarkt und konnten erfolgreich Spenden für wohltätige Zwecke sammeln. Hans Schüller konnte durch die Vermietung seiner Fläche zusätzliche Einnahmen generieren und zeigte sich zugleich hilfsbereit und unterstützend.",
        "Diese Erfolgsgeschichte zeigt, wie eine Plattform wie CoArea das Zusammenkommen und Teilen fördern kann, um positive Auswirkungen sowohl für die Gemeinschaft als auch für die Einzelpersonen zu erzielen.",
      ],
    },
  },
]

export const categoryPageBySlug = (slug: string) =>
  CATEGORY_PAGES.find((p) => p.slug === slug)
