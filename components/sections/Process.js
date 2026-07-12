"use client";

import { fadeUp } from "@/data/animations";
import { motion } from "framer-motion";
import SectionIntro from "../SectionIntro";
import { processSteps } from "@/data/site-content";

export default function Process() {
  return (
    <section id="prozess" className="section-rule relative z-10 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionIntro eyebrow="Ablauf" title="Ein klarer Prozess statt Agentur-Nebel.">
          Vom ersten Gespräch bis zur Veröffentlichung wissen Sie, was als
          Nächstes passiert und welche Entscheidung ansteht.
        </SectionIntro>
        <div className="grid gap-4 md:grid-cols-5">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className={`group relative overflow-hidden rounded-2xl border border-ink/10 bg-white/60 p-6 shadow-line transition duration-500 hover:-translate-y-1 hover:shadow-soft hover:border-copper/30 ${step.image ? "card-photo" : ""}`}
              style={step.image ? { "--card-image": `url(${step.image})`, "--card-overlay": step.overlay ?? 0.42 } : undefined}
            >
              <div className="relative z-10">
                <span className="mb-10 flex h-10 w-10 items-center justify-center rounded-full bg-copper/10 text-sm font-semibold text-copper">
                  {index + 1}
                </span>
                <p className="text-lg font-semibold leading-7">{step.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
