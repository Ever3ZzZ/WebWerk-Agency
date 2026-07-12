"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/data/animations";
import { Check } from "lucide-react";
import SectionIntro from "../SectionIntro";
import { audiences, benefits } from "@/data/site-content";

export default function Leistungen() {
  return (
    <section id="leistungen" className="section-rule relative z-10 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionIntro eyebrow="Unsere Alternative" title="Eine faire Webseite, die verkauft und Vertrauen schafft.">
          Wir entwickeln schnelle, mobil optimierte Webseiten für lokale
          Unternehmen, die klar informieren, professionell wirken und Anfragen
          einfacher machen.
        </SectionIntro>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-[1.5rem] bg-ink p-8 text-white md:p-10"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/50">
              Geeignet für
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {audiences.map((item) => (
                <span key={item} className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-12 border-t border-white/10 pt-8">
              <p className="text-3xl font-semibold leading-tight">
                Standort Bad Kissingen. Aktiv in Schweinfurt, Würzburg,
                Fulda und deutschlandweit.
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {benefits.map((item) => (
              <motion.div
                variants={fadeUp}
                key={item.title}
                className={`group relative overflow-hidden rounded-2xl border border-ink/10 bg-white/60 p-6 shadow-line transition duration-500 hover:-translate-y-1 hover:shadow-soft hover:border-copper/30 ${item.image ? "card-photo" : ""}`}
                style={item.image ? { "--card-image": `url(${item.image})`, "--card-overlay": item.overlay ?? 0.42 } : undefined}
              >
                <div className="relative z-10 flex gap-4">
                  <Check className="mt-1 shrink-0 text-copper" size={20} />
                  <p className="text-lg font-semibold leading-7">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
