"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
  Globe,
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
  { text: "Veraltetes Design", sub: "Wirkt unseriös und schreckt neue Kunden ab", icon: TimerReset },
  { text: "Schwach auf Smartphones", sub: "Die meisten Besucher kommen über das Smartphone", icon: Laptop },
  { text: "Langsame Ladezeiten", sub: "Besucher springen ab und Google stuft die Seite herab", icon: Gauge },
  { text: "Hohe laufende Kosten", sub: "Monat für Monat zahlen, oft ohne echten Gegenwert", icon: Wallet },
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

const RU = {
  "Leistungen": "Услуги",
  "Preise": "Цены",
  "Portfolio": "Портфолио",
  "Ablauf": "Процесс",
  "Anfrage": "Заявка",
  "Sprache wählen": "Выбор языка",
  "Alle Leistungen im Menü": "Все разделы — в меню",
  "Kostenlose Anfrage": "Бесплатная заявка",
  "Direkt anrufen": "Позвонить напрямую",
  "Bad Kissingen, Franken und deutschlandweit": "Бад-Киссинген, Франкония и вся Германия",
  "Webseiten, die Ihnen gehören.": "Сайты, которые принадлежат вам.",
  "Moderne Webseiten für Unternehmen in Bad Kissingen und ganz Deutschland. Einmal bezahlen, professionell auftreten und frei entscheiden, ob Sie später Unterstützung brauchen.": "Современные сайты для компаний в Бад-Киссингене и по всей Германии. Заплатите один раз, выглядите профессионально и сами решайте, нужна ли вам поддержка позже.",
  "Kostenlose Beratung": "Бесплатная консультация",
  "Preise ansehen": "Посмотреть цены",
  "Keine langfristigen Verträge": "Без долгосрочных договоров",
  "Keine versteckten Kosten": "Без скрытых расходов",
  "Optionale Wartung": "Обслуживание по желанию",
  "Das Problem": "Проблема",
  "Viele Unternehmen zahlen jeden Monat für eine Webseite, die ihnen kaum noch hilft.": "Многие компании каждый месяц платят за сайт, который им почти не помогает.",
  "100 EUR, 150 EUR oder mehr pro Monat, nur damit die Seite online bleibt. Oft kommen veraltetes Design, schlechte mobile Darstellung und langsame Ladezeiten dazu.": "100, 150 евро и больше в месяц — только за то, чтобы сайт оставался онлайн. Часто к этому добавляются устаревший дизайн, плохое мобильное отображение и медленная загрузка.",
  "Veraltetes Design": "Устаревший дизайн",
  "Schwach auf Smartphones": "Слабо работает на смартфонах",
  "Langsame Ladezeiten": "Медленная загрузка",
  "Hohe laufende Kosten": "Высокие постоянные расходы",
  "Wirkt unseriös und schreckt neue Kunden ab": "Выглядит несолидно и отпугивает новых клиентов",
  "Die meisten Besucher kommen über das Smartphone": "Большинство посетителей заходят со смартфона",
  "Besucher springen ab und Google stuft die Seite herab": "Посетители уходят, а Google понижает сайт в выдаче",
  "Monat für Monat zahlen, oft ohne echten Gegenwert": "Платить месяц за месяцем, часто без реальной отдачи",
  "Bei WebWerk Franken: einmal zahlen, modern auftreten — ohne laufende Pflichtkosten.": "В WebWerk Franken: платите один раз, выглядите современно — без постоянных обязательных платежей.",
  "Unsere Alternative": "Наша альтернатива",
  "Eine faire Webseite, die verkauft und Vertrauen schafft.": "Честный сайт, который продаёт и вызывает доверие.",
  "Wir entwickeln schnelle, mobil optimierte Webseiten für lokale Unternehmen, die klar informieren, professionell wirken und Anfragen einfacher machen.": "Мы разрабатываем быстрые, адаптированные под мобильные сайты для локального бизнеса: понятные, профессиональные и упрощающие получение заявок.",
  "Geeignet für": "Для кого",
  "Restaurants & Cafés": "Рестораны и кафе",
  "Hotels & Pensionen": "Отели и пансионы",
  "Handwerksbetriebe": "Ремесленные предприятия",
  "Ärzte & Praxen": "Врачи и клиники",
  "Dienstleister": "Поставщики услуг",
  "Lokale Unternehmen": "Локальный бизнес",
  "Modernes Design, das Vertrauen aufbaut": "Современный дизайн, который вызывает доверие",
  "Schnelle Ladezeiten auf Smartphone und Desktop": "Быстрая загрузка на смартфоне и компьютере",
  "SEO-freundlicher Aufbau für lokale Suchanfragen": "SEO-структура для локальных поисковых запросов",
  "Persönlicher Ansprechpartner aus der Region": "Личный контакт из вашего региона",
  "Pakete": "Пакеты",
  "Klare Preise ohne Pflicht-Abo.": "Понятные цены без обязательной подписки.",
  "Sie bezahlen einmalig für Ihre Webseite und entscheiden selbst, ob Sie später technische Betreuung möchten.": "Вы платите за сайт один раз и сами решаете, нужна ли вам техническая поддержка позже.",
  "Starter Website": "Стартовый сайт",
  "Business Website": "Бизнес-сайт",
  "Wartung & Sicherheit": "Обслуживание и безопасность",
  "ab 590 EUR": "от 590 EUR",
  "ab 990 EUR": "от 990 EUR",
  "29 EUR / Monat": "29 EUR / месяц",
  "Ideal für Restaurants, Cafés, kleine Betriebe und lokale Dienstleister, die online professionell auftreten möchten.": "Идеально для ресторанов, кафе, небольших предприятий и локальных услуг, которые хотят профессионально выглядеть онлайн.",
  "Für Unternehmen mit mehreren Leistungen, mehr Struktur und einem umfangreicheren Angebot.": "Для компаний с несколькими услугами, большей структурой и более широким предложением.",
  "Optional für Unternehmen, die technische Betreuung wünschen. Ohne Bindung und ohne Pflicht.": "Опционально для компаний, которым нужна техническая поддержка. Без привязки и обязательств.",
  "Moderne Landing Page": "Современный лендинг",
  "Mobil optimiert": "Адаптация под мобильные",
  "Kontaktformular": "Контактная форма",
  "Google Maps Integration": "Интеграция Google Maps",
  "Schnelle Ladezeiten": "Быстрая загрузка",
  "Bis zu 5 Unterseiten": "До 5 подстраниц",
  "Erweiterte Struktur": "Расширенная структура",
  "SEO-freundlicher Aufbau": "SEO-структура",
  "Individuelle Inhalte": "Индивидуальный контент",
  "Erweiterte Kontaktmöglichkeiten": "Расширенные способы связи",
  "Technische Überwachung": "Технический мониторинг",
  "Sicherheitsupdates": "Обновления безопасности",
  "Unterstützung bei Problemen": "Поддержка при проблемах",
  "Schnelle Hilfe im Notfall": "Быстрая помощь в экстренных случаях",
  "Jederzeit kündbar": "Отмена в любой момент",
  "Beliebt": "Популярный",
  "Anfrage senden": "Отправить заявку",
  "Referenzen": "Наши работы",
  "Webseiten für echte lokale Kaufentscheidungen.": "Сайты, которые помогают клиентам принимать решения.",
  "Ausgewählte Projekte für Gastronomie, Handwerk, Hotellerie und medizinische Dienstleistungen.": "Избранные проекты для гастрономии, ремесла, отельного бизнеса и медицинских услуг.",
  "Café & Bistro (Starter Website)": "Кафе и бистро (Стартовый сайт)",
  "Handwerk & Bau (Starter Website)": "Ремесло и строительство (Стартовый сайт)",
  "Massage Studio (Business Website)": "Массажная студия (Бизнес-сайт)",
  "Elektriker-Fachbetrieb (Starter Website)": "Электромонтажная компания (Стартовый сайт)",
  "Bad Kissingen": "Бад-Киссинген",
  "Rhön": "Рён",
  "Niederlande": "Нидерланды",
  "Warme Markenwirkung, klare Speisekarten-Struktur und einfache Reservierungsanfrage.": "Тёплый образ бренда, понятная структура меню и простая форма бронирования.",
  "Vertrauensstarker Auftritt für Sanierung, Innenausbau und regionale Bauleistungen.": "Вызывающий доверие сайт для санации, внутренней отделки и региональных строительных услуг.",
  "Professionelle Massageangebote mit modernem Design und intuitiver Buchung.": "Профессиональные массажные услуги с современным дизайном и удобной записью.",
  "Elektriker in Veenendaal für Sicherungskästen, Ladestationen, Beleuchtung und Altbausanierung": "Электрик в Венендале: электрощиты, зарядные станции, освещение и реновация старых зданий",
  "Ein klarer Prozess statt Agentur-Nebel.": "Понятный процесс вместо агентского тумана.",
  "Vom ersten Gespräch bis zur Veröffentlichung wissen Sie, was als Nächstes passiert und welche Entscheidung ansteht.": "От первого разговора до публикации вы знаете, что будет дальше и какое решение предстоит принять.",
  "Kostenloses Erstgespräch": "Бесплатная первая консультация",
  "Planung Ihrer Webseite": "Планирование вашего сайта",
  "Design & Entwicklung": "Дизайн и разработка",
  "Veröffentlichung": "Публикация",
  "Auf Wunsch Betreuung und Wartung": "Поддержка и обслуживание по желанию",
  "Start": "Старт",
  "Strategie": "Стратегия",
  "Umsetzung": "Реализация",
  "Launch": "Запуск",
  "Ziel": "Цель",
  "Kurze Antworten auf die wichtigsten Fragen.": "Короткие ответы на главные вопросы.",
  "Gehört mir die Webseite wirklich?": "Сайт действительно будет принадлежать мне?",
  "Ja. Nach der Fertigstellung können Sie die Webseite komplett kaufen. Sie sind nicht gezwungen, dauerhaft monatliche Agenturgebühren zu zahlen.": "Да. После завершения вы можете полностью выкупить сайт. Вы не обязаны постоянно платить агентству ежемесячные взносы.",
  "Kann ich trotzdem Wartung buchen?": "Могу ли я всё же заказать обслуживание?",
  "Ja. Wartung ist optional. Sie können sie nutzen, wenn Sie technische Sicherheit und schnelle Hilfe möchten, aber sie ist keine Voraussetzung.": "Да. Обслуживание опционально. Подключайте его, если хотите техническую надёжность и быструю помощь, но это не обязательное условие.",
  "Arbeiten Sie nur in Bad Kissingen?": "Вы работаете только в Бад-Киссингене?",
  "Nein. Wir arbeiten lokal in Bad Kissingen, Schweinfurt, Würzburg und Fulda, betreuen aber auch Unternehmen in ganz Deutschland.": "Нет. Мы работаем локально в Бад-Киссингене, Швайнфурте, Вюрцбурге и Фульде, но также обслуживаем компании по всей Германии.",
  "Ist die Webseite für Smartphones optimiert?": "Сайт оптимизирован для смартфонов?",
  "Ja. Jede Webseite wird mobil optimiert, schnell aufgebaut und so strukturiert, dass Kunden auf dem Smartphone schnell Kontakt aufnehmen können.": "Да. Каждый сайт адаптируется под мобильные, быстро загружается и структурирован так, чтобы клиенты могли быстро связаться с вами со смартфона.",
  "Möchten Sie Ihre Webseite modernisieren oder monatliche Kosten reduzieren?": "Хотите модернизировать сайт или сократить ежемесячные расходы?",
  "Kontaktieren Sie uns unverbindlich. Wir zeigen Ihnen, welche Möglichkeiten es für Ihr Unternehmen gibt.": "Свяжитесь с нами без обязательств. Мы покажем, какие возможности есть для вашего бизнеса.",
  "Bad Kissingen, Franken": "Бад-Киссинген, Франкония",
  "Name": "Имя",
  "Unternehmen": "Компания",
  "E-Mail": "E-Mail",
  "Branche": "Отрасль",
  "Telefon (optional)": "Телефон (по желанию)",
  "Worum geht es?": "О чём речь?",
  "Restaurant / Café": "Ресторан / Кафе",
  "Hotel / Pension": "Отель / Пансион",
  "Handwerk": "Ремесло",
  "Arztpraxis": "Врачебная практика",
  "Dienstleistung": "Услуги",
  "Sonstiges": "Другое",
  "Bitte wählen": "Выберите",
  "Wird gesendet…": "Отправка…",
  "WhatsApp Kontakt": "Написать в WhatsApp",
  "Der Versand ist fehlgeschlagen. Bitte versuchen Sie es später erneut.": "Не удалось отправить. Пожалуйста, попробуйте позже.",
  "Anfrage erfolgreich gesendet.": "Заявка успешно отправлена.",
  "Vielen Dank für Ihr Interesse. Wir melden uns schnellstmöglich mit den nächsten Schritten.": "Спасибо за ваш интерес! Мы свяжемся с вами в ближайшее время и обсудим следующие шаги.",
  "Zurück zum Formular": "Вернуться к форме",
  "Professionelles Webdesign und lokale SEO für Unternehmen in Bad Kissingen, Franken und ganz Deutschland. Wir erstellen Webseiten, die Ihnen gehören, ohne versteckte Kosten und ohne Abo-Falle.": "Профессиональный веб-дизайн и локальное SEO для компаний в Бад-Киссингене, Франконии и по всей Германии. Мы создаём сайты, которые принадлежат вам — без скрытых расходов и подписочной ловушки.",
  "Kontakt": "Контакты",
  "Rechtliches": "Правовая информация",
  "Impressum": "Импрессум",
  "Datenschutz": "Защита данных",
  "Alle Rechte vorbehalten.": "Все права защищены.",
};

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showMenuHint, setShowMenuHint] = useState(false);
  const [lang, setLang] = useState("de");
  const [langOpen, setLangOpen] = useState(false);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("ww-lang");
      if (saved === "ru" || saved === "de") setLang(saved);
      if (!localStorage.getItem("ww-menu-hint-seen")) {
        const showTimer = setTimeout(() => setShowMenuHint(true), 1200);
        const hideTimer = setTimeout(() => setShowMenuHint(false), 6500);
        return () => {
          clearTimeout(showTimer);
          clearTimeout(hideTimer);
        };
      }
    } catch (e) {}
  }, []);

  const dismissMenuHint = () => {
    setShowMenuHint(false);
    try {
      localStorage.setItem("ww-menu-hint-seen", "1");
    } catch (e) {}
  };

  const switchLang = (l) => {
    setLang(l);
    setLangOpen(false);
    try {
      localStorage.setItem("ww-lang", l);
    } catch (e) {}
  };

  const t = (str) => (lang === "ru" && RU[str] ? RU[str] : str);

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
                {t(item.label)}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-copper transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </div>
          <div className="relative mr-3 hidden items-center lg:flex">
            <motion.button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              whileTap={{ scale: 0.94 }}
              className="focus-ring flex h-11 items-center gap-2 rounded-full border border-ink/10 bg-white px-4 text-sm font-bold text-ink transition-colors hover:border-copper/40 hover:text-copper"
            >
              <Globe size={14} className="text-copper" />
              {lang.toUpperCase()}
            </motion.button>
            <AnimatePresence>
              {langOpen && (
                <>
                  <div className="fixed inset-0" onClick={() => setLangOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 top-14 z-[80] min-w-[180px] rounded-2xl border border-ink/10 bg-white p-2 shadow-[0_8px_40px_-4px_rgba(0,0,0,0.22)]"
                  >
                    <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
                      {t("Sprache wählen")}
                    </p>
                    {[
                      { code: "de", label: "Deutsch" },
                      { code: "ru", label: "Русский" },
                    ].map((l) => (
                      <motion.button
                        key={l.code}
                        type="button"
                        onClick={() => switchLang(l.code)}
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.96 }}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold ${
                          lang === l.code ? "bg-copper/10 text-copper" : "text-ink/70"
                        }`}
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink/5 text-[10px] font-bold uppercase">
                          {l.code}
                        </span>
                        {l.label}
                        {lang === l.code && <Check size={14} className="ml-auto" />}
                      </motion.button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          <Button href="#kontakt" hasSeaFill={true} className="hidden h-11 !px-6 bg-copper text-white border-none lg:inline-flex">
            {t("Anfrage")}
            <ArrowRight size={16} />
          </Button>
          <motion.button
            type="button"
            aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={mobileMenuOpen}
            onClick={() => {
              dismissMenuHint();
              setMobileMenuOpen((open) => !open);
            }}
            whileTap={{ scale: 0.94 }}
            className="focus-ring relative z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-ink/10 bg-white/88 text-ink shadow-soft backdrop-blur-xl lg:hidden"
          >
            {showMenuHint && !mobileMenuOpen && (
              <>
                <span className="pointer-events-none absolute inset-0 animate-ping rounded-full border-2 border-copper/60 [animation-duration:1.6s]" />
                <span className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-xs font-bold text-white shadow-soft">
                  {t("Alle Leistungen im Menü")}
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
                    {t(item.label)}
                    <ArrowRight size={18} className="text-copper transition-transform group-hover:translate-x-1" />
                  </motion.a>
                ))}
              </div>
              <div className="mt-auto rounded-2xl border border-ink/10 bg-paper/60 p-3">
                <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
                  {t("Sprache wählen")}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { code: "de", label: "Deutsch" },
                    { code: "ru", label: "Русский" },
                  ].map((l) => (
                    <motion.button
                      key={l.code}
                      type="button"
                      onClick={() => switchLang(l.code)}
                      whileTap={{ scale: 0.95 }}
                      className={`flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-bold transition-colors ${
                        lang === l.code
                          ? "bg-copper text-white shadow-soft"
                          : "border border-ink/10 bg-white text-ink/70"
                      }`}
                    >
                      {l.label}
                      {lang === l.code && <Check size={14} />}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="space-y-3 pt-4">
                <a
                  href="#kontakt"
                  onClick={() => setMobileMenuOpen(false)}
                  className="focus-ring flex h-14 items-center justify-center gap-2 rounded-full bg-copper px-5 text-base font-bold text-white shadow-soft"
                >
                  {t("Kostenlose Anfrage")}
                  <ArrowRight size={18} />
                </a>
                <a
                  href="tel:+4915212817629"
                  className="focus-ring flex h-12 items-center justify-center gap-2 rounded-full border border-ink/10 bg-white text-sm font-bold text-ink"
                >
                  <Phone size={17} className="text-copper" />
                  {t("Direkt anrufen")}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </header>

      <section className="relative flex items-start pt-24 lg:min-h-[92vh] lg:items-center lg:pt-28">
        <div className="absolute left-5 top-4 z-[60] lg:hidden">
          <motion.button
            type="button"
            onClick={() => setLangOpen((v) => !v)}
            whileTap={{ scale: 0.91 }}
            className="focus-ring flex h-12 items-center gap-2 rounded-full border border-ink/10 bg-white/88 px-4 text-sm font-bold text-ink shadow-soft backdrop-blur-xl"
          >
            <Globe size={15} className="text-copper" />
            {lang.toUpperCase()}
          </motion.button>
          <AnimatePresence>
            {langOpen && (
              <>
                <div className="fixed inset-0" onClick={() => setLangOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.94 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 top-14 min-w-[190px] rounded-2xl border border-ink/10 bg-white p-2 shadow-[0_8px_40px_-4px_rgba(0,0,0,0.22)]"
                >
                  <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
                    {t("Sprache wählen")}
                  </p>
                  {[
                    { code: "de", label: "Deutsch" },
                    { code: "ru", label: "Русский" },
                  ].map((l) => (
                    <motion.button
                      key={l.code}
                      type="button"
                      onClick={() => switchLang(l.code)}
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.96 }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold ${
                        lang === l.code ? "bg-copper/10 text-copper" : "text-ink/70"
                      }`}
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink/5 text-[10px] font-bold uppercase">
                        {l.code}
                      </span>
                      {l.label}
                      {lang === l.code && <Check size={14} className="ml-auto" />}
                    </motion.button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
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
              {t("Bad Kissingen, Franken und deutschlandweit")}
            </div>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-normal text-ink sm:text-7xl lg:text-8xl">
              {t("Webseiten, die Ihnen gehören.")}
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-ink/70 md:text-2xl md:leading-10">
              {t("Moderne Webseiten für Unternehmen in Bad Kissingen und ganz Deutschland. Einmal bezahlen, professionell auftreten und frei entscheiden, ob Sie später Unterstützung brauchen.")}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="#kontakt" hasSeaFill={true}>
                {t("Kostenlose Beratung")}
                <ArrowRight size={18} />
              </Button>
              <Button href="#preise" variant="secondary" hasSeaFill={true}>
                {t("Preise ansehen")}
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
                <p className="leading-tight">{t(item.text)}</p>
              </SeaFillCard>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="problem" className="section-rule relative z-10 px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow={t("Das Problem")} title={t("Viele Unternehmen zahlen jeden Monat für eine Webseite, die ihnen kaum noch hilft.")}>
            {t("100 EUR, 150 EUR oder mehr pro Monat, nur damit die Seite online bleibt. Oft kommen veraltetes Design, schlechte mobile Darstellung und langsame Ladezeiten dazu.")}
          </SectionIntro>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-4 md:grid-cols-4"
          >
            {problemCards.map((item, index) => (
              <motion.div
                key={item.text}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-[1.5rem] border border-red-800/10 bg-red-50/50 p-6 transition-colors hover:border-red-800/25 hover:bg-red-50"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-800/10 text-red-800/70">
                    <item.icon size={20} />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.18, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.35 }}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-red-800/10 text-red-800/80"
                  >
                    <X size={13} strokeWidth={3} />
                  </motion.div>
                </div>
                <p className="text-lg font-bold leading-tight text-ink">{t(item.text)}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/55">{t(item.sub)}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-6 flex flex-wrap items-center gap-3 rounded-[1.5rem] border border-moss/20 bg-moss/5 px-6 py-5"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-moss/15 text-moss">
              <Check size={16} strokeWidth={3} />
            </span>
            <p className="text-base font-bold text-ink">
              {t("Bei WebWerk Franken: einmal zahlen, modern auftreten — ohne laufende Pflichtkosten.")}
            </p>
          </motion.div>
        </div>
      </section>

      <section id="leistungen" className="section-rule relative z-10 px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow={t("Unsere Alternative")} title={t("Eine faire Webseite, die verkauft und Vertrauen schafft.")}>
            {t("Wir entwickeln schnelle, mobil optimierte Webseiten für lokale Unternehmen, die klar informieren, professionell wirken und Anfragen einfacher machen.")}
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
                {t("Geeignet für")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {audiences.map((item) => (
                  <span key={item} className="rounded-full border border-ink/5 bg-white px-5 py-2.5 text-sm font-bold text-ink/60 shadow-sm transition-all hover:border-copper/30 hover:text-copper">
                    {t(item)}
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
                  <p className="text-lg font-semibold leading-tight">{t(item.text)}</p>
                </SeaFillCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="preise" className="section-rule relative z-10 px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow={t("Pakete")} title={t("Klare Preise ohne Pflicht-Abo.")}>
            {t("Sie bezahlen einmalig für Ihre Webseite und entscheiden selbst, ob Sie später technische Betreuung möchten.")}
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
                    {t("Beliebt")}
                  </p>
                )}
                <h3 className="text-sm font-bold uppercase tracking-widest text-ink/40">{t(plan.name)}</h3>
                <p className="mt-4 text-4xl font-bold tracking-tight text-ink">{t(plan.price)}</p>
                <p className="mt-6 min-h-[4.5rem] text-base leading-relaxed text-ink/70">
                  {t(plan.description)}
                </p>
                <ul className="mt-8 mb-10 flex-1 space-y-4 border-t border-ink/5 pt-8">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-medium text-ink/80">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-copper/10 text-copper">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      {t(item)}
                    </li>
                  ))}
                </ul>
                <Button 
                  href="#kontakt" 
                  variant={plan.featured ? "primary" : "secondary"}
                  hasSeaFill={true}
                  className="w-full"
                >
                  {t("Anfrage senden")}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="portfolio" className="section-rule relative z-10 px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow={t("Referenzen")} title={t("Webseiten für echte lokale Kaufentscheidungen.")}>
            {t("Ausgewählte Projekte für Gastronomie, Handwerk, Hotellerie und medizinische Dienstleistungen.")}
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
                      {t(project.type)}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-ink/50">
                      {t(project.location)}
                      <ExternalLink size={15} />
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold">{project.title}</h3>
                  <p className="mt-4 leading-7 text-ink/70">{t(project.result)}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section id="prozess" className="section-rule relative z-10 px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow={t("Ablauf")} title={t("Ein klarer Prozess statt Agentur-Nebel.")}>
            {t("Vom ersten Gespräch bis zur Veröffentlichung wissen Sie, was als Nächstes passiert und welche Entscheidung ansteht.")}
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
                        {t(step.meta)}
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
                      {t(step.label)}
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
          <SectionIntro eyebrow={t("FAQ")} title={t("Kurze Antworten auf die wichtigsten Fragen.")} />
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
                  {t(faq.q)}
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
                  <p className="max-w-3xl leading-8 text-ink/70 border-t border-ink/5 pt-5">{t(faq.a)}</p>
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
              {t("Kostenlose Beratung")}
            </p>
            <h2 className="text-4xl font-semibold leading-tight md:text-6xl">
              {t("Möchten Sie Ihre Webseite modernisieren oder monatliche Kosten reduzieren?")}
            </h2>
            <p className="mt-6 text-lg leading-8 text-ink/70">
              {t("Kontaktieren Sie uns unverbindlich. Wir zeigen Ihnen, welche Möglichkeiten es für Ihr Unternehmen gibt.")}
            </p>
            <div className="mt-10 space-y-4 text-base font-medium text-ink/75">
              <p className="flex items-center gap-3">
                <MapPin size={20} className="text-copper" />
                {t("Bad Kissingen, Franken")}
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
                  const data = new FormData(e.currentTarget);
                  setIsSending(true);
                  setSubmitError("");
                  const result = await sendContactRequest(data);
                  setIsSending(false);
                  if (result && result.success) {
                    setIsSubmitted(true);
                  } else {
                    setSubmitError((result && result.message) || t("Der Versand ist fehlgeschlagen. Bitte versuchen Sie es später erneut."));
                  }
                }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="space-y-2 text-sm font-semibold text-ink/70">
                    {t("Name")}
                    <input required name="name" className="focus-ring h-12 w-full rounded-xl border border-ink/10 bg-paper px-4 text-base text-ink" placeholder="Max Mustermann" />
                  </label>
                  <label className="space-y-2 text-sm font-semibold text-ink/70">
                    {t("Unternehmen")}
                    <input name="unternehmen" className="focus-ring h-12 w-full rounded-xl border border-ink/10 bg-paper px-4 text-base text-ink" placeholder="Muster GmbH" />
                  </label>
                  <label className="space-y-2 text-sm font-semibold text-ink/70">
                    {t("E-Mail")}
                    <input required name="email" type="email" className="focus-ring h-12 w-full rounded-xl border border-ink/10 bg-paper px-4 text-base text-ink" placeholder="name@unternehmen.de" />
                  </label>
                  <label className="space-y-2 text-sm font-semibold text-ink/70">
                    {t("Branche")}
                    <select name="branche" className="focus-ring h-12 w-full rounded-xl border border-ink/10 bg-paper px-4 text-base text-ink">
                      <option>{t("Restaurant / Café")}</option>
                      <option>{t("Hotel / Pension")}</option>
                      <option>{t("Handwerk")}</option>
                      <option>{t("Arztpraxis")}</option>
                      <option>{t("Dienstleistung")}</option>
                      <option>{t("Sonstiges")}</option>
                    </select>
                  </label>
                  <label className="space-y-2 text-sm font-semibold text-ink/70">
                    {t("Telefon (optional)")}
                    <input name="telefon" type="tel" placeholder="+49 152 12817629" className="focus-ring h-12 w-full rounded-xl border border-ink/10 bg-paper px-4 text-base text-ink" />
                  </label>
                  <label className="space-y-2 text-sm font-semibold text-ink/70 sm:col-span-2">
                    {t("Worum geht es?")}
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
                    {isSending ? t("Wird gesendet…") : t("Anfrage senden")}
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
                    {t("WhatsApp Kontakt")}
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
                  <p className="mt-4 text-sm font-semibold text-red-700">{submitError}</p>
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
                <h3 className="mb-2 text-2xl font-bold text-ink">{t("Anfrage erfolgreich gesendet.")}</h3>
                <p className="text-lg text-ink/70">
                  {t("Vielen Dank für Ihr Interesse. Wir melden uns schnellstmöglich mit den nächsten Schritten.")}
                </p>
                <motion.button 
                  onClick={() => setIsSubmitted(false)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-8 text-sm font-bold text-copper hover:underline"
                >
                  {t("Zurück zum Formular")}
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
                {t("Professionelles Webdesign und lokale SEO für Unternehmen in Bad Kissingen, Franken und ganz Deutschland. Wir erstellen Webseiten, die Ihnen gehören, ohne versteckte Kosten und ohne Abo-Falle.")}
              </p>
            </div>
            <div>
              <h4 className="mb-6 font-bold text-ink">{t("Kontakt")}</h4>
              <ul className="space-y-4 text-ink/60">
                <li className="flex items-center gap-3"><MapPin size={18} className="text-copper" /> {t("Bad Kissingen, Franken")}</li>
                <li className="flex items-center gap-3"><Mail size={18} className="text-copper" /> hallo@webwerk-franken.de</li>
                <li className="flex items-center gap-3"><Phone size={18} className="text-copper" /> +49 152 12817629</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 font-bold text-ink">{t("Rechtliches")}</h4>
              <ul className="space-y-4 text-ink/60">
                <li><a href="/impressum" className="transition-colors hover:text-copper">{t("Impressum")}</a></li>
                <li><a href="/datenschutz" className="transition-colors hover:text-copper">{t("Datenschutz")}</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 border-t border-ink/5 pt-8 text-center text-sm text-ink/40">
            <p>© {new Date().getFullYear()} Webwerk Franken. {t("Alle Rechte vorbehalten.")}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}