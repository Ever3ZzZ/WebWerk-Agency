import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://www.webwerkfranken.de"),

  title: {
    default: "WebWerk Franken",
    template: "%s | WebWerk Franken",
  },

  description:
    "Professionelle Webseiten für Unternehmen in Bad Kissingen, Schweinfurt und ganz Franken. Faire Einmalzahlung ohne langfristige Verträge.",

  alternates: {
    canonical: "https://www.webwerkfranken.de",
  },

  icons: {
  icon: "/favicon.ico",
  shortcut: "/favicon.ico",
  apple: "/icon.png",
},

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Webdesign für Unternehmen in Franken | WebWerk Franken",
    description:
      "Professionelle Webseiten für Unternehmen in Bad Kissingen, Schweinfurt und ganz Franken. Faire Einmalzahlung ohne langfristige Verträge.",
    url: "https://www.webwerkfranken.de",
    siteName: "WebWerk Franken",
    locale: "de_DE",
    type: "website",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WebWerk Franken - Professionelles Webdesign",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "WebWerk Franken",
    description:
      "Professionelle Webseiten für Unternehmen in Franken.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.webwerkfranken.de/#organization",
    name: "WebWerk Franken",
    url: "https://www.webwerkfranken.de",
    description:
      "Professionelles Webdesign für Unternehmen in Franken.",
    image: "https://www.webwerkfranken.de/og-image.jpg",

    areaServed: {
      "@type": "Place",
      name: "Franken",
    },
  };

  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>

      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}