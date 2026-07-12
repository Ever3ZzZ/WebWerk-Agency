"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, BadgeCheck, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import { stagger, fadeUp, slideUpVariants } from "@/lib/animations";

const heroItems = [
  { text: "Keine langfristigen Verträge", delay: 0 },
  { text: "Keine versteckten Kosten", delay: 0.15 },
  { text: "Optionale Wartung", delay: 0.3 }
];

export default function Hero() {
  const [heroDomino, setHeroDomino] = useState(false);

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
        <motion.div variants={fadeUp} custom={0} className="max-w-4xl">
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

        <motion.div
          variants={fadeUp}
          custom={0.3}
          className="mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {heroItems.map((item, i) => (
            <motion.div 
              key={item.text} 
              variants={{
                initial: {},
                hover: {}
              }}
              onMouseEnter={() => i === 0 && setHeroDomino(true)}
              animate={heroDomino ? "hover" : "initial"}
              className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-white/60 px-6 py-5 text-base font-bold text-ink/75 shadow-line backdrop-blur transition-all duration-700 hover:-translate-y-1 hover:shadow-soft"
            >
              <motion.div 
                className="absolute inset-0 -z-10 bg-copper"
                initial="initial"
                variants={slideUpVariants}
                custom={item.delay}
                className="absolute inset-0 -z-10 bg-copper"
              />
              <span className={`relative z-10 transition-colors duration-500 ${heroDomino ? 'text-white' : 'group-hover:text-white'}`}>
                {item.text}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}