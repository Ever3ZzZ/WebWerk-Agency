"use client";

import { fadeUp } from "@/data/animations";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import SectionIntro from "../SectionIntro";
import { portfolio } from "@/data/site-content";

export default function Portfolio() {
  return (
    <section id="portfolio" className="section-rule relative z-10 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionIntro eyebrow="Referenzen" title="Webseiten für echte lokale Kaufentscheidungen.">
          Ausgewählte Projekte für Gastronomie, Handwerk, Hotellerie und
          medizinische Dienstleistungen.
        </SectionIntro>
        <div className="grid gap-6 lg:grid-cols-2">
          {portfolio.map((project) => (
            <motion.a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="group overflow-hidden rounded-[1.5rem] border border-ink/10 bg-white shadow-line transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="relative aspect-[1.58] overflow-hidden bg-porcelain">
                <Image
                  src={project.image}
                  alt={`Webdesign Projekt ${project.title}`}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
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
  );
}
