"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Check,
  Code2,
  ExternalLink,
  FileSearch,
  Gauge,
  Handshake,
  Laptop,
  Lightbulb,
  LockKeyhole,
  Mail,
  Menu,
  MapPin,
  MessageSquareText,
  MousePointerClick,
  Phone,
  Rocket,
  Search,
  ServerCog,
  Settings,
  ShieldCheck,
  Sparkles,
  Sprout,
  TimerReset,
  UserRound,
  Wallet,
  Workflow,
  Zap,
  Wrench,
  X,
} from "lucide-react";
import Image from "next/image";
import { sendContactRequest } from "./actions";

// Static variants defined outside the component to prevent Next.js build-time macro errors
const slideUpVariants = {
  initial: { y: "100%" },
  hover: { y: 0 }
};

const fillEase = [0.22, 1, 0.36, 1];
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
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
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
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
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
  { text: "Modernes Design, das Vertrauen aufbaut", icon: BadgeCheck },
  { text: "Schnelle Ladezeiten auf Smartphone und Desktop", icon: Gauge },
  { text: "SEO-freundlicher Aufbau für lokale Suchanfragen", icon: Search },
  { text: "Persönlicher Ansprechpartner aus der Region", icon: UserRound },
];

const heroCards = [
  { text: "Keine langfristigen Verträge", icon: LockKeyhole },
  { text: "Keine versteckten Kosten", icon: FileSearch },
  { text: "Optionale Wartung", icon: ServerCog },
];

const problemCards = [
  {
    text: "Veraltetes Design",
    sub: "Wirkt unseri\u00f6s und schreckt neue Kunden ab",
    icon: TimerReset,
  },
  {
    text: "Schwach auf Smartphones",
    sub: "Dabei kommen die meisten Besucher mobil",
    icon: Laptop,
  },
  {
    text: "Langsame Ladezeiten",
    sub: "Besucher springen ab, Google straft ab",
    icon: Gauge,
  },
  {
    text: "Hohe laufende Kosten",
    sub: "Monat f\u00fcr Monat zahlen, ohne Gegenwert",
    icon: Wallet,
  },
];

const navItems = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Preise", href: "#preise" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Ablauf", href: "#prozess" },
  { label: "FAQ", href: "#faq" },
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
    type: "Café & Bistro (Starter Website)",
    location: "Bad Kissingen",
    image: "/portfolio/golden-horn.png",
    href: "https://golden-horn-tau.vercel.app/",
    result: "Warme Markenwirkung, klare Speisekarten-Struktur und einfache Reservierungsanfrage.",
  },
  {
    title: "BauProService Rhön",
    type: "Handwerk & Bau (Starter Website)",
    location: "Rhön",
    image: "/portfolio/bauproservice.png",
    href: "https://www.bauproservice-rhoen.de/",
    result: "Vertrauensstarker Auftritt für Sanierung, Innenausbau und regionale Bauleistungen.",
  },
  {
    title: "Serenity Massage",
    type: "Massage Studio (Business Website)",
    location: "Niederlande",
    image: "/portfolio/Massage.png",
    href: "https://chip-horse-67963957.figma.site/",
    result: "Professionelle Massageangebote mit modernem Design und intuitiver Buchung.",
  },
  {
    title: "Elektoria",
    type: "Elektriker-Fachbetrieb (Starter Website)",
    location: "Niederlande",
    image: "/portfolio/Elektoria.png",
    href: "https://www.elektoria.nl/",
    result: "Elektriker in Veenendaal für Sicherungskästen, Ladestationen, Beleuchtung und Altbausanierung",
  },
];

const processSteps = [
  { label: "Kostenloses Erstgespräch", meta: "Start", icon: MessageSquareText },
  { label: "Planung Ihrer Webseite", meta: "Strategie", icon: Lightbulb },
  { label: "Design & Entwicklung", meta: "Umsetzung", icon: Code2 },
  { label: "Veröffentlichung", meta: "Launch", icon: Rocket },
  { label: "Auf Wunsch Betreuung und Wartung", meta: "Ziel", icon: ShieldCheck },
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
  const baseStyles = "group relative isolate overflow-hidden focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-bold transition-colors duration-300";

  const variantStyles = variant === "primary" 
    ? "bg-ink text-white shadow-soft" 
    : "bg-white/80 text-ink border border-ink/10 shadow-line";

  return (
    <motion.a
      href={href}
      initial={false}
      whileHover={{ y: -3, scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {hasSeaFill && (
        <motion.div
          className="absolute inset-0 -z-10 bg-copper"
          initial={{ y: "100%" }}
          animate={isHovered ? { y: 0 } : { y: "100%" }}
          transition={{ duration: 0.45, ease: fillEase }}
        />
      )}
      <motion.span
        className="pointer-events-none absolute inset-y-0 -left-10 z-0 w-8 rotate-12 bg-white/35 blur-sm"
        animate={isHovered ? { x: 220, opacity: [0, 1, 0] } : { x: -40, opacity: 0 }}
        transition={{ duration: 0.75, ease: fillEase }}
      />
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

function SeaFillCard({
  children,
  icon: Icon = Sparkles,
  index = 0,
  className = "",
  iconClassName = "",
  fillClassName = "bg-copper",
  delayStep = 0.14,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.35, ease: fillEase }}
      className={`group relative isolate overflow-hidden rounded-[2rem] border border-ink/10 bg-white/55 p-7 shadow-line backdrop-blur-sm ${className}`}
    >
      <motion.div
        className={`absolute inset-0 -z-10 ${fillClassName}`}
        initial={{ y: "108%" }}
        animate={inView ? { y: 0 } : { y: "108%" }}
        transition={{ duration: 1.05, delay: index * delayStep, ease: fillEase }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 opacity-0"
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: index * delayStep + 0.3 }}
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.18), transparent 32%, rgba(255,255,255,0.08) 62%, transparent)",
        }}
      />
      <div className="relative z-10 flex items-start gap-4">
        <motion.div
          animate={{
            backgroundColor: inView ? "rgba(255,255,255,0.18)" : "rgba(163,90,58,0.1)",
            color: inView ? "#FFFFFF" : "#A35A3A",
          }}
          transition={{ duration: 0.4, delay: index * delayStep + 0.25 }}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${iconClassName}`}
        >
          <Icon size={21} strokeWidth={2.4} />
        </motion.div>
        <motion.div
          animate={{ color: inView ? "#FFFFFF" : "#111111" }}
          transition={{ duration: 0.4, delay: index * delayStep + 0.35 }}
          className="min-w-0"
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const processRef = useRef(null);
  const processRace = useInView(processRef, {
    once: true,
    margin: "-18% 0px -18% 0px",
  });
  const [activeFaq, setActiveFaq] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMenuHint, setShowMenuHint] = useState(false);

  useEffect(() => {
    let showTimer;
    let hideTimer;
    try {
      if (!window.localStorage.getItem("ww-menu-hint-seen")) {
        showTimer = setTimeout(() => setShowMenuHint(true), 1200);
        hideTimer = setTimeout(() => {
          setShowMenuHint(false);
          window.localStorage.setItem("ww-menu-hint-seen", "1");
        }, 6200);
      }
    } catch (e) {
      // localStorage unavailable (private mode) - skip hint persistence
    }
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const dismissMenuHint = () => {
    setShowMenuHint(false);
    try {
      window.localStorage.setItem("ww-menu-hint-seen", "1");
    } catch (e) {}
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-paper text-ink">
      <div className="grain" />

      <header className="fixed left-0 right-0 top-0 z-50 bg-transparent px-4 pt-4 lg:border-b lg:border-ink/10 lg:bg-paper/80 lg:px-0 lg:pt-0 lg:backdrop-blur-xl">
        <nav className="mx-auto flex h-14 max-w-7xl items-center justify-end lg:h-20 lg:justify-between lg:px-8">
          <a href="#" className="focus-ring hidden items-center gap-3 rounded-full lg:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
              W
            </span>
            <span className="text-base font-semibold tracking-normal">
              Webwerk Franken
            </span>
          </a>
          <div className="hidden items-center gap-10 text-lg font-medium text-ink/60 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} className="group relative py-2 transition hover:text-ink" href={item.href}>
                {item.label}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-copper transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </div>
          <Button href="#kontakt" hasSeaFill={true} className="hidden h-11 !px-6 bg-copper text-white border-none lg:inline-flex">
            Anfrage
            <ArrowRight size={16} />
          </Button>
          <motion.button
            type="button"
            aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={mobileMenuOpen}
            onClick={() => { dismissMenuHint(); setMobileMenuOpen((open) => !open); }}
            whileTap={{ scale: 0.94 }}
            className="focus-ring relative z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-ink/10 bg-white/88 text-ink shadow-soft backdrop-blur-xl lg:hidden"
          >
            {showMenuHint && !mobileMenuOpen && (
              <>
                <span className="pointer-events-none absolute -inset-1 animate-ping rounded-full border-2 border-copper/70" />
                <span className="pointer-events-none absolute -inset-0.5 rounded-full ring-2 ring-copper/60" />
                <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white shadow-soft">
                  Alle Leistungen im Menü
                </span>
              </>
            )}
            <motion.span
              animate={{ rotate: mobileMenuOpen ? 180 : 0, scale: mobileMenuOpen ? 0.92 : 1 }}
              transition={{ duration: 0.24, ease: fillEase }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={23} />}
            </motion.span>
          </motion.button>
        </nav>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-paper/96 px-4 pb-5 pt-20 backdrop-blur-2xl lg:hidden"
          >
            <motion.div
              initial={{ y: -18, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.32, ease: fillEase }}
              className="mx-auto flex h-full max-w-md flex-col rounded-[2rem] border border-ink/10 bg-white/78 p-5 shadow-soft"
            >
              <div className="mb-6 flex items-center justify-between border-b border-ink/10 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-copper">Webwerk Franken</p>
                  <p className="mt-1 text-sm font-medium text-ink/58">Webseiten, die Ihnen gehören.</p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
                  W
                </span>
              </div>
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.26, delay: index * 0.045, ease: fillEase }}
                    className="group flex min-h-16 items-center justify-between rounded-2xl border border-ink/8 bg-paper/70 px-5 text-xl font-semibold text-ink transition hover:border-copper/25 hover:bg-white"
                  >
                    {item.label}
                    <ArrowRight size={18} className="text-copper transition-transform group-hover:translate-x-1" />
                  </motion.a>
                ))}
              </div>
              <div className="mt-auto space-y-3 pt-6">
                <a
                  href="#kontakt"
                  onClick={() => setMobileMenuOpen(false)}
                  className="focus-ring flex h-14 items-center justify-center gap-2 rounded-full bg-copper px-5 text-base font-bold text-white shadow-soft"
                >
                  Kostenlose Anfrage
                  <ArrowRight size={18} />
                </a>
                <a
                  href="tel:+4915212817629"
                  className="focus-ring flex h-12 items-center justify-center gap-2 rounded-full border border-ink/10 bg-white text-sm font-bold text-ink"
                >
                  <Phone size={17} className="text-copper" />
                  Direkt anrufen
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </header>

      <section className="relative flex items-start pt-24 lg:min-h-[92vh] lg:items-center lg:pt-28">
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
          className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-2 sm:px-8 lg:pt-20"
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

          <div className="mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            {heroCards.map((item, i) => (
              <SeaFillCard
                key={item.text}
                icon={item.icon}
                index={i}
                className="rounded-2xl px-6 py-5 text-base font-bold"
              >
                <p className="leading-tight">{item.text}</p>
              </SeaFillCard>
            ))}
          </div>
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
            {problemCards.map((item) => (
              <motion.div
                key={item.text}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group relative min-h-40 overflow-hidden rounded-[2rem] border border-dashed border-ink/20 bg-white/45 p-7 transition duration-300 hover:border-red-400/50 hover:bg-white/70 hover:shadow-[0_16px_40px_-12px_rgba(220,38,38,0.28)]"
              >
                <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-red-500/10 opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-red-500/10 text-red-600 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white">
                  <span className="absolute inset-0 animate-ping rounded-full bg-red-500/25 [animation-duration:2.4s]" />
                  <X
                    size={15}
                    strokeWidth={3}
                    className="relative transition-transform duration-300 group-hover:rotate-90"
                  />
                </span>
                <item.icon
                  size={26}
                  className="mb-5 text-ink/30 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:text-red-500/60"
                />
                <p className="text-lg font-bold leading-tight text-ink/55 transition-colors duration-300 group-hover:text-ink/80">
                  {item.text}
                </p>
                <p className="mt-2 text-sm font-medium leading-snug text-ink/40 transition-colors duration-300 group-hover:text-ink/60">
                  {item.sub}
                </p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="mt-6 flex flex-col items-start justify-between gap-5 rounded-[2rem] border border-moss/25 bg-[#DDE5D6] p-7 shadow-line sm:flex-row sm:items-center"
          >
            <div className="flex items-start gap-4 sm:items-center">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-moss text-white">
                <Check size={20} strokeWidth={3} />
              </span>
              <p className="text-lg font-bold leading-snug text-ink">
                Bei WebWerk Franken: einmal zahlen, modern auftreten &mdash;
                ohne laufende Pflichtkosten.
              </p>
            </div>
            <a
              href="#leistungen"
              className="focus-ring inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-copper"
            >
              So machen wir es
              <ArrowRight size={16} />
            </a>
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
            
            <div className="grid gap-6 sm:grid-cols-2">
              {benefits.map((item, i) => (
                <SeaFillCard
                  key={item.text}
                  icon={item.icon}
                  index={i}
                  delayStep={0.12}
                  className="min-h-[7.5rem]"
                >
                  <p className="text-lg font-semibold leading-tight">{item.text}</p>
                </SeaFillCard>
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
                whileHover="hover"
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
                whileHover="hover"
                className="group relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-line hover:shadow-soft"
              >
                <div className="relative aspect-[1.58] overflow-hidden bg-porcelain">
                  <Image
                    src={project.image}
                    alt={`Webdesign Projekt ${project.title}`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
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
            ref={processRef}
            className="relative"
          >
            <div className="pointer-events-none absolute left-[10%] right-[10%] top-[4.4rem] hidden h-px bg-ink/10 lg:block" />
            <motion.div
              className="pointer-events-none absolute left-[10%] top-[4.4rem] hidden h-px origin-left bg-copper lg:block"
              initial={{ scaleX: 0 }}
              animate={processRace ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 2.4, ease: fillEase }}
              style={{ right: "10%" }}
            />
            <motion.div
              className="pointer-events-none absolute top-[4.15rem] hidden h-2.5 w-2.5 rounded-full bg-copper shadow-[0_0_28px_rgba(163,90,58,0.65)] lg:block"
              initial={{ left: "10%", opacity: 0 }}
              animate={processRace ? { left: "90%", opacity: [0, 1, 1, 0.85] } : { left: "10%", opacity: 0 }}
              transition={{ duration: 2.4, ease: fillEase }}
            />

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                const filled = processRace;
                return (
                  <motion.div
                    key={step.label}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    whileHover={{ y: -10, scale: 1.015 }}
                    viewport={{ once: true }}
                    className={`group relative isolate flex min-h-56 flex-col overflow-hidden rounded-[2rem] border border-ink/10 bg-white/55 p-7 shadow-line backdrop-blur-sm ${index === 0 ? "ring-2 ring-copper/20" : ""} ${index === 4 ? "ring-2 ring-moss/20" : ""}`}
                  >
                    <motion.div
                      className="absolute inset-0 -z-10 bg-copper"
                      initial={{ y: "110%" }}
                      animate={filled ? { y: 0 } : { y: "110%" }}
                      transition={{ duration: 1.15, delay: index * 0.28, ease: fillEase }}
                    />
                    <motion.div
                      className="absolute inset-x-5 top-5 -z-10 h-20 rounded-full bg-white/10 blur-2xl"
                      animate={filled ? { opacity: [0, 0.75, 0.45], x: [0, 20, 0] } : { opacity: 0 }}
                      transition={{ duration: 1.2, delay: index * 0.28 + 0.2, ease: fillEase }}
                    />
                    <div className="relative z-10 mb-9 flex items-center justify-between">
                      <motion.span
                        animate={{
                          backgroundColor: filled ? "#FFFFFF" : "#111111",
                          color: filled ? "#A35A3A" : "#FFFFFF",
                        }}
                        transition={{ duration: 0.45, delay: index * 0.28 + 0.2 }}
                        className="flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold"
                      >
                        {index + 1}
                      </motion.span>
                      <motion.span
                        animate={{ color: filled ? "rgba(255,255,255,0.72)" : "rgba(163,90,58,0.66)" }}
                        transition={{ duration: 0.45, delay: index * 0.28 + 0.2 }}
                        className="text-[10px] font-bold uppercase tracking-widest"
                      >
                        {step.meta}
                      </motion.span>
                    </div>
                    <motion.div
                      animate={{
                        backgroundColor: filled ? "rgba(255,255,255,0.18)" : "rgba(17,17,17,0.06)",
                        color: filled ? "#FFFFFF" : "#A35A3A",
                      }}
                      transition={{ duration: 0.45, delay: index * 0.28 + 0.24 }}
                      className="relative z-10 mb-6 flex h-11 w-11 items-center justify-center rounded-2xl"
                    >
                      <Icon size={22} strokeWidth={2.3} />
                    </motion.div>
                    <motion.p
                      animate={{ color: filled ? "#FFFFFF" : "#111111" }}
                      transition={{ duration: 0.45, delay: index * 0.28 + 0.28 }}
                      className="relative z-10 text-lg font-semibold leading-tight"
                    >
                      {step.label}
                    </motion.p>
                    <motion.div
                      className="relative z-10 mt-auto pt-8"
                      animate={{ opacity: filled ? 1 : 0.45 }}
                      transition={{ duration: 0.45, delay: index * 0.28 + 0.35 }}
                    >
                      <div className="flex items-center gap-1.5">
                        {[0, 1, 2].map((dot) => (
                          <span key={dot} className={`h-1.5 rounded-full ${filled ? "bg-white/70" : "bg-ink/20"} ${dot === 1 ? "w-5" : "w-1.5"}`} />
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
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
                whileHover={{ y: -6 }}
                transition={{ duration: 0.22 }}
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
                +49 152 12817629
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-[1.5rem] border border-ink/10 bg-white p-6 shadow-soft md:p-8"
          >
            {!isSubmitted ? (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (isSending) return;
                  setIsSending(true);
                  setSubmitError("");
                  try {
                    const formData = new FormData(e.currentTarget);
                    const result = await sendContactRequest(formData);
                    if (result?.success) {
                      setIsSubmitted(true);
                    } else {
                      setSubmitError(
                        result?.message ||
                          "Der Versand ist fehlgeschlagen. Bitte versuchen Sie es erneut."
                      );
                    }
                  } catch (err) {
                    setSubmitError(
                      "Der Versand ist fehlgeschlagen. Bitte versuchen Sie es erneut oder kontaktieren Sie uns per WhatsApp."
                    );
                  } finally {
                    setIsSending(false);
                  }
                }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="space-y-2 text-sm font-semibold text-ink/70">
                    Name
                    <input required name="name" className="focus-ring h-12 w-full rounded-xl border border-ink/10 bg-paper px-4 text-base text-ink" placeholder="Max Mustermann" />
                  </label>
                  <label className="space-y-2 text-sm font-semibold text-ink/70">
                    Unternehmen
                    <input name="unternehmen" className="focus-ring h-12 w-full rounded-xl border border-ink/10 bg-paper px-4 text-base text-ink" placeholder="Muster GmbH" />
                  </label>
                  <label className="space-y-2 text-sm font-semibold text-ink/70">
                    E-Mail
                    <input required name="email" type="email" className="focus-ring h-12 w-full rounded-xl border border-ink/10 bg-paper px-4 text-base text-ink" placeholder="name@unternehmen.de" />
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
                    Telefon (optional)
                    <input name="telefon" type="tel" autoComplete="tel" className="focus-ring h-12 w-full rounded-xl border border-ink/10 bg-paper px-4 text-base text-ink" placeholder="+49 151 23456789" />
                  </label>
                  <label className="space-y-2 text-sm font-semibold text-ink/70 sm:col-span-2">
                    Worum geht es?
                    <textarea required name="nachricht" className="focus-ring min-h-36 w-full resize-none rounded-xl border border-ink/10 bg-paper px-4 py-3 text-base text-ink" placeholder="Ich möchte meine bestehende Webseite modernisieren..." />
                  </label>
                </div>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <motion.button
                    type="submit"
                    disabled={isSending}
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="focus-ring group relative isolate inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-copper px-6 text-sm font-semibold text-white shadow-soft sm:w-auto"
                  >
                    <span className="absolute inset-0 -z-10 translate-y-full bg-ink transition-transform duration-500 ease-out group-hover:translate-y-0" />
                    {isSending ? "Wird gesendet..." : "Anfrage senden"}
                    <CalendarCheck size={18} className="transition-transform group-hover:rotate-12" />
                  </motion.button>
                  <motion.a 
                    href="https://wa.me/4915212817629?text=Hallo%2C%20Ich%20interessiere%20mich%20f%C3%BCr%20Ihre%20Webentwicklungsdienste."
                    target="_blank"
                    rel="noreferrer"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="focus-ring inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#20ba5a] sm:w-auto"
                  >
                    WhatsApp Kontakt
                  </motion.a>
                  <motion.a 
                    href="tel:+4915212817629"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="focus-ring inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white shadow-lg sm:w-auto"
                  >
                    <Phone size={18} />
                    +49 152 12817629
                  </motion.a>
                </div>
                {submitError && (
                  <p className="mt-4 text-sm font-semibold text-red-600" role="alert">
                    {submitError}
                  </p>
                )}
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-copper/10 text-copper">
                  <Check size={32} strokeWidth={3} />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-ink">Anfrage erfolgreich gesendet.</h3>
                <p className="text-lg text-ink/70">
                  Vielen Dank für Ihr Interesse. Wir melden uns schnellstmöglich mit den nächsten Schritten.
                </p>
                <motion.button 
                  onClick={() => setIsSubmitted(false)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-8 text-sm font-bold text-copper hover:underline"
                >
                  Zurück zum Formular
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-ink/5 bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="col-span-2">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">W</span>
                <span className="text-xl font-bold tracking-tight text-ink">Webwerk Franken</span>
              </div>
              <p className="max-w-md text-lg leading-relaxed text-ink/60">
                Professionelles Webdesign und lokale SEO für Unternehmen in Bad Kissingen, Franken und ganz Deutschland. Wir erstellen Webseiten, die Ihnen gehören, ohne versteckte Kosten und ohne Abo-Falle.
              </p>
            </div>
            <div>
              <h4 className="mb-6 font-bold text-ink">Kontakt</h4>
              <ul className="space-y-4 text-ink/60">
                <li className="flex items-center gap-3"><MapPin size={18} className="text-copper" /> Bad Kissingen, Franken</li>
                <li className="flex items-center gap-3"><Mail size={18} className="text-copper" /> hallo@webwerk-franken.de</li>
                <li className="flex items-center gap-3"><Phone size={18} className="text-copper" /> +49 152 12817629</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 font-bold text-ink">Rechtliches</h4>
              <ul className="space-y-4 text-ink/60">
                <li><a href="/impressum" className="transition-colors hover:text-copper">Impressum</a></li>
                <li><a href="/datenschutz" className="transition-colors hover:text-copper">Datenschutz</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 border-t border-ink/5 pt-8 text-center text-sm text-ink/40">
            <p>© {new Date().getFullYear()} Webwerk Franken. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}