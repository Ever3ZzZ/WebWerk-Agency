"use client";

import { fadeUp } from "@/data/animations";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SectionIntro from "../SectionIntro";
import { pricing } from "@/data/site-content";

export default function Pricing() {
  return (
    <section id="preise" className="section-rule relative z-10 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionIntro eyebrow="Pakete" title="Klare Preise ohne Pflicht-Abo.">
          Sie bezahlen einmalig für Ihre Webseite und entscheiden selbst, ob
          Sie später technische Betreuung möchten.
        </SectionIntro>
        <div className="grid gap-5 lg:grid-cols-3">
          {pricing.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className={`group card-3d relative overflow-hidden rounded-[1.5rem] border p-8 shadow-line transition duration-500 hover:-translate-y-1 hover:shadow-soft ${
                plan.featured
                  ? "border-copper/30 bg-white"
                  : "border-ink/10 bg-white/60"
              } ${plan.image ? "card-photo" : ""}`}
              style={plan.image ? { "--card-image": `url(${plan.image})`, "--card-overlay": plan.overlay ?? 0.75 } : undefined}
            >
              <div className="card-3d-inner relative z-10">
                {plan.featured && (
                  <p className="mb-6 inline-flex rounded-full bg-copper/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-copper">
                    Beliebt
                  </p>
                )}
                <div className={`relative z-10 ${plan.image ? "text-white" : ""}`}>
                  <h3 className="text-2xl font-semibold">{plan.name}</h3>
                  <p className="mt-4 text-4xl font-semibold">{plan.price}</p>
                  <p className={`mt-5 min-h-24 text-base leading-7 ${plan.image ? "text-white/70" : "text-ink/60"}`}>
                    {plan.description}
                  </p>
                  <ul className="mt-8 space-y-4">
                    {plan.items.map((item) => (
                      <li key={item} className={`flex gap-3 text-sm font-medium ${plan.image ? "text-white/80" : "text-ink/75"}`}>
                        <Check size={18} className="mt-0.5 shrink-0 text-copper" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
