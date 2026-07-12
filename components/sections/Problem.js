"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/data/animations";
import SectionIntro from "../SectionIntro";

export default function Problem() {
  return (
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
              className="rounded-2xl border border-ink/10 bg-white/60 p-6 shadow-line"
            >
              <p className="text-lg font-semibold">{item}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
