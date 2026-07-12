"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/data/animations";

export default function SectionIntro({ eyebrow, title, children }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
