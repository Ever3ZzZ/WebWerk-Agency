import {
  BadgeCheck,
  Check,
  ShieldCheck,
} from "lucide-react";

export const audiences = [
  "Restaurants & Cafés",
  "Hotels & Pensionen",
  "Handwerksbetriebe",
  "Ärzte & Praxen",
  "Dienstleister",
  "Lokale Unternehmen",
];

export const benefits = [
  {
    title: "Modernes Design, das Vertrauen aufbaut",
    image: undefined,
    overlay: 0.42,
  },
  {
    title: "Schnelle Ladezeiten auf Smartphone und Desktop",
    image: undefined,
    overlay: 0.42,
  },
  {
    title: "SEO-freundlicher Aufbau für lokale Suchanfragen",
    image: undefined,
    overlay: 0.42,
  },
  {
    title: "Faire Einmalzahlung ohne langfristige Verpflichtung",
    image: undefined,
    overlay: 0.42,
  },
  {
    title: "Persönlicher Ansprechpartner aus der Region",
    image: undefined,
    overlay: 0.42,
  },
  {
    title: "Optionaler Wartungsservice, wenn Sie ihn wirklich wollen",
    image: undefined,
    overlay: 0.42,
  },
];

export const pricing = [
  {
    name: "Starter Website",
    price: "ab 590 EUR",
    description:
      "Ideal für Restaurants, Cafés, kleine Betriebe und lokale Dienstleister, die online professionell auftreten möchten.",
    items: [
      "Moderne Landing Page",
      "Mobil optimiert",
      "Kontaktformular",
      "Google Maps Integration",
      "Schnelle Ladezeiten",
    ],
    image: "/portfolio/onePic.jpg",
    overlay: 0.7,
  },
  {
    name: "Business Website",
    price: "ab 990 EUR",
    description:
      "Für Unternehmen mit mehreren Leistungen, mehr Struktur und einem umfangreicheren Angebot.",
    items: [
      "Bis zu 5 Unterseiten",
      "Erweiterte Struktur",
      "SEO-freundlicher Aufbau",
      "Individuelle Inhalte",
      "Erweiterte Kontaktmöglichkeiten",
    ],
    featured: true,
    image: "/portfolio/second.png",
    overlay: 0.76,
  },
  {
    name: "Wartung & Sicherheit",
    price: "29 EUR / Monat",
    description:
      "Optional für Unternehmen, die technische Betreuung wünschen. Ohne Bindung und ohne Pflicht.",
    items: [
      "Technische Überwachung",
      "Sicherheitsupdates",
      "Unterstützung bei Problemen",
      "Schnelle Hilfe im Notfall",
      "Jederzeit kündbar",
    ],
    image: "/portfolio/Safe.jpg",
    overlay: 0.6,
  },
];

export const portfolio = [
  {
    title: "Golden Horn Café & Bistro",
    type: "Café & Bistro",
    location: "Bad Kissingen",
    image: "/portfolio/golden-horn.png",
    href: "https://golden-horn-tau.vercel.app/",
    result: "Warme Markenwirkung, klare Speisekarten-Struktur und einfache Reservierungsanfrage.",
  },
  {
    title: "BauProService Rhön",
    type: "Handwerk & Bau",
    location: "Rhön",
    image: "/portfolio/bauproservice.png",
    href: "https://www.bauproservice-rhoen.de/",
    result: "Vertrauensstarker Auftritt für Sanierung, Innenausbau und regionale Bauleistungen.",
  },
  {
    title: "NeoDeutsch Online Schule",
    type: "Online Schule",
    location: "Ukraine / Deutschland",
    image: "/portfolio/neodeutsch.png",
    href: "https://www.neodeutsch.online/",
    result: "Modernes Lernplattform mit schneller Anmeldung und lokalen Kursangeboten.",
  },
  {
    title: "Serentity Massage",
    type: "Massage Studio",
    location: "Nederlande",
    image: "/portfolio/Massage.png",
    href: "https://chip-horse-67963957.figma.site/",
    result: "Professionelle Massageangebote mit modernem Design und intuitiver Buchung.",
  },
];

export const processSteps = [
  { title: "Kostenloses Erstgespräch", image: undefined, overlay: 0.42 },
  { title: "Planung Ihrer Webseite", image: undefined, overlay: 0.42 },
  { title: "Design & Entwicklung", image: undefined, overlay: 0.42 },
  { title: "Veröffentlichung", image: undefined, overlay: 0.42 },
  { title: "Auf Wunsch Betreuung und Wartung", image: undefined, overlay: 0.42 },
];

export const faqs = [
  {
    q: "Gehört mir die Webseite wirklich?",
    a: "Ja. Nach der Fertigstellung können Sie die Webseite komplett kaufen. Sie sind nicht gezwungen, dauerhaft monatliche Agenturgebühren zu zahlen.",
  },
  {
    q: "Kann ich trotzdem Wartung buchen?",
    a: "Ja. Wartung ist optional. Sie können sie nutzen, wenn Sie technische Sicherheit und schnelle Hilfe möchten, aber sie ist keine Voraussetzung.",
  },
  {
    q: "Arbeiten Sie nur in Bad Kissingen?",
    a: "Nein. Wir arbeiten lokal in Bad Kissingen, Schweinfurt, Würzburg und Fulda, betreuen aber auch Unternehmen in ganz Deutschland.",
  },
  {
    q: "Ist die Webseite für Smartphones optimiert?",
    a: "Ja. Jede Webseite wird mobil optimiert, schnell aufgebaut und so strukturiert, dass Kunden auf dem Smartphone schnell Kontakt aufnehmen können.",
  },
];
