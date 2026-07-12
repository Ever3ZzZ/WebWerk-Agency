"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Check,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Sprout,
  Settings,
  Zap,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";

// Static variants defined outside the component to prevent Next.js build-time macro errors
const slideUpVariants = {
  initial: { y: "100%" },
  hover: { y: 0 }
};

const pricingVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: (i) => ({ 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", duration: 1.4, bounce: 0.3, delay: i * 0.12 }
  }),
  hover: { 
    y: -12, 
    scale: 1.015,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

const portfolioVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: (i) => ({ 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", duration: 1.2, bounce: 0.3, delay: i * 0.1 }
  }),
  hover: { 
    y: -12, 
    scale: 1.015,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

const fillDuration = 0.8; // Время анимации заливки

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const audiences = [
  "Restaurants & Cafés",
  "Hotels & Pensionen",
  "Handwerksbetriebe",
  "Ärzte & Praxen",
  "Dienstleister",
  "Lokale Unternehmen",
];

const benefits = [
  "Modernes Design, das Vertrauen aufbaut",
  "Schnelle Ladezeiten auf Smartphone und Desktop",
  "SEO-freundlicher Aufbau für lokale Suchanfragen",
  "Faire Einmalzahlung ohne langfristige Verpflichtung",
  "Persönlicher Ansprechpartner aus der Region",
  "Optionaler Wartungsservice, wenn Sie ihn wirklich wollen",
];

const pricing = [
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
  },
];

const portfolio = [
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

const process = [
  "Kostenloses Erstgespräch",
  "Planung Ihrer Webseite",
  "Design & Entwicklung",
  "Veröffentlichung",
  "Auf Wunsch Betreuung und Wartung",
];

const faqs = [
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

function SectionIntro({ eyebrow, title, children, delay = 0 }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
    >
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-copper">
        {eyebrow}
      </p>
      <h2 className="text-4xl font-semibold leading-tight text-ink md:text-6xl">
        {title}
      </h2>
      {children && (
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-ink/70">
          {children}
        </p>
      )}
    </motion.div>
  );
}

function Button({ children, href, variant = "primary", className = "", hasSeaFill = false, ...props }) {
  const [isHovered, setIsHovered] = useState(false);
  const isPrimary = variant === "primary";
  const baseStyles = "group relative overflow-hidden focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-bold transition-colors duration-300";

  const variantStyles = variant === "primary" 
    ? "bg-ink text-white shadow-soft" 
    : "bg-white/70 text-ink border border-ink/10";

  return (
    <motion.a
      href={href}
      initial={false} // Prevent initial animation on load for the parent
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {hasSeaFill && (
        <motion.div
          className="absolute inset-0 bg-copper -z-10"
          initial={{ y: "100%" }}
          animate={isHovered ? { y: 0 } : { y: "100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}
      <motion.span 
        initial={{ color: isPrimary ? "#FFFFFF" : "#111111" }}
        animate={isHovered
          ? { color: "#FFFFFF" }
          : { color: isPrimary ? "#FFFFFF" : "#111111" }
        }
        transition={{ duration: 0.3 }}
        className="relative z-10 flex items-center gap-2"
      >
        {children}
      </motion.span>
    </motion.a>
  );
}

export default function Home() {
  const [heroDomino, setHeroDomino] = useState(false);
  const [benefitsDomino, setBenefitsDomino] = useState(false);
  const [processRace, setProcessRace] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // Логика задержки исчезновения преимуществ (3 секунды)
  useEffect(() => {
    let timer;
    if (!benefitsDomino) {
      // Мы не сбрасываем сразу, сброс идет через анимацию Framer Motion или можно добавить задержку здесь
    }
    return () => clearTimeout(timer);
  }, [benefitsDomino]);

  const heroItems = [
    { text: "Keine langfristigen Verträge", delay: 0 },
    { text: "Keine versteckten Kosten", delay: 0.15 },
    { text: "Optionale Wartung", delay: 0.3 }
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-paper text-ink">
      <div className="grain" />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-ink/10 bg-paper/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#" className="focus-ring flex items-center gap-3 rounded-full">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
              W
            </span>
            <span className="text-base font-semibold tracking-normal">
              Webwerk Franken
            </span>
          </a>
          <div className="hidden items-center gap-10 text-lg font-medium text-ink/60 lg:flex">
            <a className="group relative py-2 transition hover:text-ink" href="#leistungen">
              Leistungen
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-copper transition-all duration-500 group-hover:w-full" />
            </a>
            <a className="group relative py-2 transition hover:text-ink" href="#preise">
              Preise
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-copper transition-all duration-500 group-hover:w-full" />
            </a>
            <a className="group relative py-2 transition hover:text-ink" href="#portfolio">
              Portfolio
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-copper transition-all duration-500 group-hover:w-full" />
            </a>
            <a className="group relative py-2 transition hover:text-ink" href="#faq">
              FAQ
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-copper transition-all duration-500 group-hover:w-full" />
            </a>
          </div>
          <Button href="#kontakt" hasSeaFill={true} className="h-11 !px-6 bg-copper text-white border-none">
            Anfrage
            <ArrowRight size={16} />
          </Button>
        </nav>
      </header>

      <section className="relative flex min-h-[92vh] items-center pt-28">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-paper to-transparent" />
          <div className="mx-auto h-full max-w-7xl px-5 sm:px-8">
            <div className="absolute right-[-8rem] top-28 hidden h-[42rem] w-[46rem] rounded-[2rem] border border-ink/10 bg-white/40 shadow-soft backdrop-blur-sm lg:block">
              <div className="m-5 h-[calc(100%-2.5rem)] rounded-[1.5rem] bg-[#EFEBE2] p-6">
                <div className="mb-5 flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#D28B73]" />
                  <span className="h-3 w-3 rounded-full bg-[#DDBE7C]" />
                  <span className="h-3 w-3 rounded-full bg-[#7B8C6D]" />
                </div>
                <div className="grid h-[32rem] grid-cols-6 gap-4">
                  <div className="col-span-4 rounded-3xl bg-white p-8 shadow-line">
                    <div className="mb-20 h-6 w-44 rounded-full bg-ink/10" />
                    <div className="mb-5 h-12 w-72 rounded-full bg-ink" />
                    <div className="mb-3 h-4 w-80 rounded-full bg-ink/20" />
                    <div className="h-4 w-64 rounded-full bg-ink/10" />
                    <div className="mt-16 h-12 w-36 rounded-full bg-copper" />
                  </div>
                  <div className="col-span-2 grid gap-4">
                    <div className="rounded-3xl bg-[#DDE5D6] p-5">
                      <BadgeCheck className="mb-14 text-moss" size={28} />
                      <div className="h-4 w-24 rounded-full bg-ink/20" />
                    </div>
                    <div className="rounded-3xl bg-[#F2DDC9] p-5">
                      <ShieldCheck className="mb-14 text-copper" size={28} />
                      <div className="h-4 w-24 rounded-full bg-ink/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-20 sm:px-8"
        >
          <motion.div variants={fadeUp} transition={{ duration: 1.2 }} className="max-w-4xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-ink/5 bg-white/40 px-5 py-2.5 text-sm font-semibold text-ink/70 backdrop-blur-md shadow-sm">
              <Sparkles size={16} className="text-copper" />
              Bad Kissingen, Franken und deutschlandweit
            </div>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-normal text-ink sm:text-7xl lg:text-8xl">
              Webseiten, die Ihnen gehören.
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-ink/70 md:text-2xl md:leading-10">
              Moderne Webseiten für Unternehmen in Bad Kissingen und ganz
              Deutschland. Einmal bezahlen, professionell auftreten und frei
              entscheiden, ob Sie später Unterstützung brauchen.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="#kontakt" hasSeaFill={true}>
                Kostenlose Beratung
                <ArrowRight size={18} />
              </Button>
              <Button href="#preise" variant="secondary" hasSeaFill={true}>
                Preise ansehen
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {heroItems.map((item, i) => (
              <motion.div 
                key={item.text} 
                variants={{
                  initial: {},
                  hover: {}
                }}
                onMouseEnter={() => i === 0 && setHeroDomino(true)}
                animate={heroDomino ? "hover" : "initial"}
                className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-white/60 px-6 py-5 text-base font-bold text-ink/75 shadow-line backdrop-blur transition-all duration-700 hover:-translate-y-1 hover:shadow-soft"
              >
                <motion.div 
                  className="absolute inset-0 -z-10 bg-copper"
                  initial="initial"
                  variants={slideUpVariants}
                  transition={{ duration: fillDuration, delay: item.delay, ease: [0.22, 1, 0.36, 1] }}
                />
                <span className={`relative z-10 transition-colors duration-500 ${heroDomino ? 'text-white' : 'group-hover:text-white'}`}>
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section id="problem" className="section-rule relative z-10 px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow="Das Problem" title="Viele Unternehmen zahlen jeden Monat für eine Webseite, die ihnen kaum noch hilft.">
            100 EUR, 150 EUR oder mehr pro Monat, nur damit die Seite online
            bleibt. Oft kommen veraltetes Design, schlechte mobile Darstellung
            und langsame Ladezeiten dazu.
          </SectionIntro>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-4 md:grid-cols-4"
          >
          {["Veraltetes Design", "Schwach auf Smartphones", "Langsame Ladezeiten", "Hohe laufende Kosten"].map((item) => (
              <motion.div
                variants={fadeUp}
                key={item}
                className="group relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white/50 p-8 shadow-line backdrop-blur-sm transition-all duration-700 hover:-translate-y-2 hover:shadow-soft"
              >
                <motion.div 
                  className="absolute inset-0 -z-10 bg-copper"
                  initial="initial"
                  variants={slideUpVariants}
                  transition={{ duration: fillDuration, ease: [0.22, 1, 0.36, 1] }}
                />
                <p className="relative z-10 text-lg font-bold text-ink/80 transition-colors duration-500 group-hover:text-white">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="leistungen" className="section-rule relative z-10 px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow="Unsere Alternative" title="Eine faire Webseite, die verkauft und Vertrauen schafft.">
            Wir entwickeln schnelle, mobil optimierte Webseiten für lokale
            Unternehmen, die klar informieren, professionell wirken und Anfragen
            einfacher machen.
          </SectionIntro>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="rounded-[2.5rem] border border-copper/10 bg-gradient-to-b from-white to-porcelain/30 p-10 shadow-soft md:p-14"
            >
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-copper">
                Geeignet für
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {audiences.map((item) => (
                  <span key={item} className="rounded-full border border-ink/5 bg-white px-5 py-2.5 text-sm font-bold text-ink/60 shadow-sm transition-all hover:border-copper/30 hover:text-copper">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-14 border-t border-ink/5 pt-10">
                <p className="text-2xl font-semibold leading-tight text-ink/80 md:text-3xl">
                  Standort Bad Kissingen. Aktiv in Schweinfurt, Würzburg,
                  Fulda und deutschlandweit.
                </p>
              </div>
            </motion.div>
            
            <div 
              onMouseEnter={() => setBenefitsDomino(true)}
              onMouseLeave={() => setBenefitsDomino(false)}
              className="grid gap-6 sm:grid-cols-2"
            >
              {benefits.map((item, i) => (
                <motion.div
                  variants={fadeUp}
                  key={item}
                  initial="hidden"
                  whileInView="show"
                  animate={benefitsDomino ? "hover" : "show"}
                  viewport={{ once: true }}
                  className="group relative flex min-h-[7.5rem] items-start gap-4 overflow-hidden rounded-[2rem] border border-ink/10 bg-white/50 p-8 shadow-line backdrop-blur-sm hover:-translate-y-2 hover:shadow-soft"
                >
                  <motion.div 
                    className="absolute inset-0 -z-10 bg-copper"
                    initial={{ y: "100%" }}
                    animate={benefitsDomino ? { y: 0 } : { y: "100%" }}
                    transition={{ 
                      duration: fillDuration * 1.5, 
                      delay: benefitsDomino ? i * 0.15 : (benefits.length - i) * 0.1 + 2.5, 
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                  />
                  <motion.div 
                    animate={{ 
                      backgroundColor: benefitsDomino ? "rgba(255,255,255,0.2)" : "rgba(163,90,58,0.1)",
                      color: benefitsDomino ? "#FFFFFF" : "#A35A3A"
                    }}
                    transition={{ duration: 0.4, delay: benefitsDomino ? i * 0.15 : 2.8 }}
                    className="relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                  >
                    <Check size={14} strokeWidth={3} />
                  </motion.div>
                  <motion.p 
                    animate={{ color: benefitsDomino ? "#FFFFFF" : "#111111" }}
                    transition={{ duration: 0.4, delay: benefitsDomino ? i * 0.15 : 2.8 }}
                    className="relative z-10 text-lg font-semibold leading-tight"
                  >
                    {item}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="preise" className="section-rule relative z-10 px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow="Pakete" title="Klare Preise ohne Pflicht-Abo.">
            Sie bezahlen einmalig für Ihre Webseite und entscheiden selbst, ob
            Sie später technische Betreuung möchten.
          </SectionIntro>
          <motion.div 
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 lg:grid-cols-3 lg:items-stretch"
          >
            {pricing.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial="hidden"
                whileInView="show"
                custom={i}
                viewport={{ once: true, amount: 0.2 }}
                variants={pricingVariants}
                className={`flex flex-col rounded-[2.5rem] border p-8 shadow-line md:p-10 ${
                  plan.featured
                    ? "border-copper/40 bg-white ring-1 ring-copper/5 shadow-soft"
                    : "border-ink/10 bg-white/50 backdrop-blur-sm hover:bg-white hover:border-copper/40"
                }`}
              >
                <div className="mb-8 flex items-center justify-between">
                  {plan.name === "Starter Website" && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-moss/10 text-moss">
                      <Sprout size={24} />
                    </div>
                  )}
                  {plan.featured && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-copper/10 text-copper">
                      <Zap size={24} />
                    </div>
                  )}
                  {plan.name === "Wartung & Sicherheit" && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink/10 text-ink">
                      <Settings size={24} />
                    </div>
                  )}
                </div>

                {plan.featured && (
                  <p className="mb-4 self-start rounded-full bg-copper px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                    Beliebt
                  </p>
                )}
                <h3 className="text-sm font-bold uppercase tracking-widest text-ink/40">{plan.name}</h3>
                <p className="mt-4 text-4xl font-bold tracking-tight text-ink">{plan.price}</p>
                <p className="mt-6 min-h-[4.5rem] text-base leading-relaxed text-ink/70">
                  {plan.description}
                </p>
                <ul className="mt-8 mb-10 flex-1 space-y-4 border-t border-ink/5 pt-8">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-medium text-ink/80">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-copper/10 text-copper">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button 
                  href="#kontakt" 
                  variant={plan.featured ? "primary" : "secondary"}
                  hasSeaFill={true}
                  className="w-full"
                >
                  Anfrage senden
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="portfolio" className="section-rule relative z-10 px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow="Referenzen" title="Webseiten für echte lokale Kaufentscheidungen.">
            Ausgewählte Projekte für Gastronomie, Handwerk, Hotellerie und
            medizinische Dienstleistungen.
          </SectionIntro>
          <div className="grid gap-12 lg:grid-cols-2">
            {portfolio.map((project, i) => (
              <motion.a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                initial="hidden"
                whileInView="show"
                custom={i}
                viewport={{ once: true, amount: 0.2 }}
                variants={portfolioVariants}
                className="group relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-line hover:shadow-soft"
              >
                <div className="relative aspect-[1.58] overflow-hidden bg-porcelain">
                  <Image
                    src={project.image}
                    alt={`Webdesign Projekt ${project.title}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-7">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-copper">
                      {project.type}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-ink/50">
                      {project.location}
                      <ExternalLink size={15} />
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold">{project.title}</h3>
                  <p className="mt-4 leading-7 text-ink/70">{project.result}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section id="prozess" className="section-rule relative z-10 px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow="Ablauf" title="Ein klarer Prozess statt Agentur-Nebel.">
            Vom ersten Gespräch bis zur Veröffentlichung wissen Sie, was als
            Nächstes passiert und welche Entscheidung ansteht.
          </SectionIntro>
          <motion.div 
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
            onViewportEnter={() => {
               // Запуск анимации "гонки" через 5 секунд после попадания карточек в экран
               setTimeout(() => setProcessRace(true), 5000);
            }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {process.map((step, index) => (
              <motion.div
                key={step}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                className={`group relative flex flex-col overflow-hidden rounded-[2rem] border border-ink/10 bg-white/50 p-8 shadow-line backdrop-blur-sm transition-all duration-700 ${index === 0 ? 'ring-2 ring-copper/20' : ''} ${index === 4 ? 'ring-2 ring-moss/20' : ''}`}
              >
                <motion.div 
                  className="absolute inset-0 -z-10 bg-copper"
                  initial={{ y: "100%" }}
                  animate={processRace ? { y: 0 } : { y: "100%" }}
                  transition={{ duration: 1.2, delay: index * 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="relative z-10 mb-8 flex items-center justify-between">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold transition-colors duration-500 ${processRace ? 'bg-white text-copper' : 'bg-ink text-white'}`}>
                    {index + 1}
                  </span>
                  {index === 0 && <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${processRace ? 'text-white/60' : 'text-copper/60'}`}>Start</span>}
                  {index === 4 && <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${processRace ? 'text-white/60' : 'text-moss/60'}`}>Ziel</span>}
                </div>
                <p className={`relative z-10 text-lg font-semibold leading-tight transition-colors duration-500 ${processRace ? 'text-white' : 'text-ink/80'}`}>
                  {step}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="faq" className="section-rule relative z-10 px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-5xl">
          <SectionIntro eyebrow="FAQ" title="Kurze Antworten auf die wichtigsten Fragen." />
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className={`overflow-hidden rounded-2xl border transition-all duration-500 ${activeFaq === i ? 'border-copper/30 bg-white shadow-soft' : 'border-ink/10 bg-white/70 shadow-line'}`}
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-6 text-left text-xl font-semibold outline-none"
                >
                  {faq.q}
                  <motion.div
                    animate={{ rotate: activeFaq === i ? 45 : 0 }}
                    className="text-copper text-2xl"
                  >
                    +
                  </motion.div>
                </button>
                <motion.div 
                  animate={{ height: activeFaq === i ? "auto" : 0, opacity: activeFaq === i ? 1 : 0 }}
                  className="px-6 pb-6"
                >
                  <p className="max-w-3xl leading-8 text-ink/70 border-t border-ink/5 pt-5">{faq.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt" className="section-rule relative z-10 px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-copper">
              Kostenlose Beratung
            </p>
            <h2 className="text-4xl font-semibold leading-tight md:text-6xl">
              Möchten Sie Ihre Webseite modernisieren oder monatliche Kosten reduzieren?
            </h2>
            <p className="mt-6 text-lg leading-8 text-ink/70">
              Kontaktieren Sie uns unverbindlich. Wir zeigen Ihnen, welche
              Möglichkeiten es für Ihr Unternehmen gibt.
            </p>
            <div className="mt-10 space-y-4 text-base font-medium text-ink/75">
              <p className="flex items-center gap-3">
                <MapPin size={20} className="text-copper" />
                Bad Kissingen, Franken
              </p>
              <p className="flex items-center gap-3">
                <Mail size={20} className="text-copper" />
                hallo@webwerk-franken.de
              </p>
              <p className="flex items-center gap-3">
                <Phone size={20} className="text-copper" />
                +49 971 000000
              </p>
            </div>
          </motion.div>

          <motion.form
            action="mailto:hallo@webwerk-franken.de"
            method="post"
            encType="text/plain"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-[1.5rem] border border-ink/10 bg-white p-6 shadow-soft md:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold text-ink/70">
                Name
                <input name="name" className="focus-ring h-12 w-full rounded-xl border border-ink/10 bg-paper px-4 text-base text-ink" placeholder="Max Mustermann" />
              </label>
              <label className="space-y-2 text-sm font-semibold text-ink/70">
                Unternehmen
                <input name="unternehmen" className="focus-ring h-12 w-full rounded-xl border border-ink/10 bg-paper px-4 text-base text-ink" placeholder="Muster GmbH" />
              </label>
              <label className="space-y-2 text-sm font-semibold text-ink/70">
                E-Mail
                <input name="email" type="email" className="focus-ring h-12 w-full rounded-xl border border-ink/10 bg-paper px-4 text-base text-ink" placeholder="name@unternehmen.de" />
              </label>
              <label className="space-y-2 text-sm font-semibold text-ink/70">
                Branche
                <select name="branche" className="focus-ring h-12 w-full rounded-xl border border-ink/10 bg-paper px-4 text-base text-ink">
                  <option>Restaurant / Café</option>
                  <option>Hotel / Pension</option>
                  <option>Handwerk</option>
                  <option>Arztpraxis</option>
                  <option>Dienstleistung</option>
                  <option>Sonstiges</option>
                </select>
              </label>
              <label className="space-y-2 text-sm font-semibold text-ink/70 sm:col-span-2">
                Worum geht es?
                <textarea name="nachricht" className="focus-ring min-h-36 w-full resize-none rounded-xl border border-ink/10 bg-paper px-4 py-3 text-base text-ink" placeholder="Ich möchte meine bestehende Webseite modernisieren..." />
              </label>
            </div>
            <button
              type="submit"
              className="focus-ring mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-copper px-6 text-sm font-semibold text-white transition hover:bg-ink sm:w-auto"
            >
              Anfrage senden
              <CalendarCheck size={18} />
            </button>
          </motion.form>
        </div>
      </section>
    </main>
  );
}
