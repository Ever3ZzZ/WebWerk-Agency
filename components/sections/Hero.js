"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/data/animations";
import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles } from "lucide-react";
import Button from "../Button";

export default function Hero() {
  return (
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
        <motion.div variants={fadeUp} transition={{ duration: 0.7 }} className="max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-4 py-2 text-sm font-medium text-ink/70 backdrop-blur">
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
            <Button href="#kontakt">
              Kostenlose Beratung
              <ArrowRight size={18} />
            </Button>
            <Button href="#preise" variant="secondary">
              Preise ansehen
            </Button>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.8, delay: 0.18 }}
          className="mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {["Keine langfristigen Verträge", "Keine versteckten Kosten", "Optionale Wartung"].map((item) => (
            <div
              key={item}
              className="group relative overflow-hidden rounded-3xl border border-ink/20 bg-white/60 px-5 py-4 text-medium font-semibold text-ink/75 shadow-line backdrop-blur transition-all duration-500 hover:-translate-y-0.5"
            >
              <div className="pointer-events-none absolute inset-0 -z-10 bg-copper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-full group-hover:translate-y-0" />
              <p className="relative z-10 transition-colors duration-500 group-hover:text-white">{item}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
