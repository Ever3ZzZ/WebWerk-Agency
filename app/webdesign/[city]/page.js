import { cities } from "../cities";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const city = cities[params.city];

  if (!city) return {};

  return {
    title: `Webdesign ${city.name} | Professionelle Webseiten für Unternehmen`,
    description: `Professionelles Webdesign in ${city.name}. Moderne Webseiten für Unternehmen, Handwerksbetriebe und Selbstständige. Faire Festpreise ohne langfristige Verträge.`,

    alternates: {
      canonical: `https://www.webwerkfranken.de/webdesign/${params.city}`,
    },

    openGraph: {
      title: `Webdesign ${city.name} | WebWerk Franken`,
      description: `Professionelle Webseiten für Unternehmen in ${city.name}.`,
      url: `https://www.webwerkfranken.de/webdesign/${params.city}`,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function CityPage({ params }) {
  const city = cities[params.city];

  if (!city) {
    notFound();
  }

  const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",

  name: "WebWerk Franken",

  url: "https://www.webwerkfranken.de",

  areaServed: city.name,

  image: "https://www.webwerkfranken.de/og-image.jpg",

  description: `Professionelles Webdesign für Unternehmen in ${city.name}.`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",

  

  mainEntity: [
    {
      "@type": "Question",

      name: `Was kostet eine Webseite in ${city.name}?`,

      acceptedAnswer: {
        "@type": "Answer",

        text: "Die Kosten hängen vom Umfang des Projekts ab. Wir bieten transparente Festpreise ohne monatliche Verträge.",
      },

      
    },

    

    {
      "@type": "Question",

      name: "Wie lange dauert die Erstellung?",

      acceptedAnswer: {
        "@type": "Answer",

        text: "Die meisten Webseiten werden innerhalb weniger Wochen fertiggestellt.",
      },
    },

    {
      "@type": "Question",

      name: "Ist SEO enthalten?",

      acceptedAnswer: {
        "@type": "Answer",

        text: "Ja. Alle Webseiten werden technisch für Google optimiert.",
      },
    },
  ],
};

  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
        <Script
  id="local-business-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(jsonLd),
  }}
/>

<Script
  id="faq-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(faqSchema),
  }}
/>
      <section>
        <h1 className="text-5xl font-bold mb-8">
          Professionelles Webdesign in {city.name}
        </h1>

        <p className="text-xl leading-8">
          WebWerk Franken entwickelt moderne Webseiten für Unternehmen,
          Selbstständige und Handwerksbetriebe in {city.name}. Wir erstellen
          schnelle, professionelle und für Google optimierte Webseiten ohne
          langfristige Verträge.
        </p>
      </section>

      <section className="mt-20">
        <h2 className="text-3xl font-bold mb-6">
          Moderne Webseiten für Unternehmen in {city.name}
        </h2>

        <p className="leading-8 mb-6">
          Eine professionelle Webseite ist heute für viele Unternehmen der
          wichtigste digitale Kontaktpunkt. Kunden informieren sich online,
          vergleichen Angebote und entscheiden innerhalb weniger Sekunden, ob
          ein Unternehmen vertrauenswürdig wirkt.
        </p>

        <p className="leading-8">
          WebWerk Franken unterstützt Unternehmen in {city.name} bei der
          Erstellung moderner Webseiten mit Fokus auf Geschwindigkeit,
          Benutzerfreundlichkeit und Suchmaschinenoptimierung.
        </p>
      </section>

      <section className="mt-20">
        <h2 className="text-3xl font-bold mb-8">
          Unsere Leistungen
        </h2>

        <ul className="space-y-4">
          <li>✓ Individuelles Webdesign</li>
          <li>✓ Responsive Webseiten für alle Geräte</li>
          <li>✓ SEO-Optimierung</li>
          <li>✓ Wartung und Support</li>
          <li>✓ Optimierung für Google</li>
          <li>✓ Schnelle Ladezeiten</li>
        </ul>
      </section>

      <section className="mt-20">
        <h2 className="text-3xl font-bold mb-8">
          Für wen wir Webseiten erstellen
        </h2>

        <ul className="space-y-4">
          <li>Handwerksbetriebe</li>
          <li>Dienstleister</li>
          <li>Restaurants</li>
          <li>Kleine Unternehmen</li>
          <li>Selbstständige</li>
          <li>Lokale Betriebe</li>
        </ul>
      </section>

      <section className="mt-20">
        <h2 className="text-3xl font-bold mb-8">
          Warum WebWerk Franken?
        </h2>

        <ul className="space-y-4">
          <li>Faire Einmalzahlung</li>
          <li>Keine langfristigen Verträge</li>
          <li>Persönliche Betreuung</li>
          <li>Schnelle Umsetzung</li>
          <li>Moderne Technologien</li>
        </ul>
      </section>

      <section className="mt-20">
        <h2 className="text-3xl font-bold mb-6">
          Häufige Fragen
        </h2>

        <h3 className="text-2xl font-semibold mb-3">
  Was kostet eine Webseite in {city.name}?
</h3>

        <p className="mb-8">
          Die Kosten hängen vom Umfang des Projekts ab. Wir bieten transparente
          Festpreise ohne monatliche Verträge.
        </p>

        <h3 className="text-2xl font-semibold mb-3">
          Wie lange dauert die Erstellung?
        </h3>

        <p className="mb-8">
          Die meisten Webseiten werden innerhalb weniger Wochen fertiggestellt.
        </p>

        <h3 className="text-2xl font-semibold mb-3">
          Ist SEO enthalten?
        </h3>

        <p>
          Ja. Alle Webseiten werden technisch für Google optimiert.
        </p>
      </section>
    </main>
  );
}