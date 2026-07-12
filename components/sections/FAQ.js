"use client";

import { fadeUp } from "@/data/animations";
import { motion } from "framer-motion";
import SectionIntro from "../SectionIntro";
import { faqs } from "@/data/site-content";

export default function FAQ() {
  return (
    <section id="faq" className="section-rule relative z-10 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionIntro eyebrow="FAQ" title="Kurze Antworten auf die wichtigsten Fragen." />
        <div className="space-y-4">
          {faqs.map((faq) => (
            <motion.details
              key={faq.q}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="group rounded-2xl border border-ink/10 bg-white/70 p-6 shadow-line"
            >
              <summary className="cursor-pointer list-none text-xl font-semibold">
                <span className="flex items-center justify-between gap-6">
                  {faq.q}
                  <span className="text-copper transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-5 max-w-3xl leading-8 text-ink/70">{faq.a}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
