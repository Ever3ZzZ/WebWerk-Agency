"use client";

import { fadeUp } from "@/data/animations";
import { motion } from "framer-motion";
import { CalendarCheck, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    // Простая локальная имитация отправки — показываем сообщение об успешной отправке
    setTimeout(() => {
      setLoading(false);
      setStatus({ type: "success", message: "Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns in Kürze bei Ihnen." });
      try { event.target.reset(); } catch (e) {}
    }, 800);
  }

  return (
    <section id="kontakt" className="section-rule relative z-10 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-copper">
            Kostenlose Beratung
          </p>
          <h2 className="text-4xl font-semibold leading-tight md:text-6xl">
            Möchten Sie Ihre Webseite modernisieren oder monatliche Kosten reduzieren?
          </h2>
          <p className="mt-6 text-lg leading-8 text-ink/70">
            Kontaktieren Sie uns unverbindlich. Wir zeigen Ihnen, welche
            Möglichkeiten es für Ihr Unternehmen gibt.
          </p>
          <div className="mt-10 space-y-4 text-base font-medium text-ink/75">
            <p className="flex items-center gap-3">
              <MapPin size={20} className="text-copper" />
              Bad Kissingen, Franken
            </p>
            <p className="flex items-center gap-3">
              <Mail size={20} className="text-copper" />
              hallo@webwerk-franken.de
            </p>
            <p className="flex items-center gap-3">
              <Phone size={20} className="text-copper" />
              +49 971 000000
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
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold text-ink/70">
                Name
                <input required name="name" className="focus-ring h-12 w-full rounded-xl border border-ink/10 bg-paper px-4 text-base text-ink" placeholder="Max Mustermann" />
              </label>
              <label className="space-y-2 text-sm font-semibold text-ink/70">
                Unternehmen
                <input name="unternehmen" className="focus-ring h-12 w-full rounded-xl border border-ink/10 bg-paper px-4 text-base text-ink" placeholder="Muster GmbH" />
              </label>
              <label className="space-y-2 text-sm font-semibold text-ink/70">
                E-Mail
                <input required name="email" type="email" className="focus-ring h-12 w-full rounded-xl border border-ink/10 bg-paper px-4 text-base text-ink" placeholder="name@unternehmen.de" />
              </label>
              <label className="space-y-2 text-sm font-semibold text-ink/70">
                Branche
                <select name="branche" className="focus-ring h-12 w-full rounded-xl border border-ink/10 bg-paper px-4 text-base text-ink">
                  <option>Restaurant / Café</option>
                  <option>Hotel / Pension</option>
                  <option>Handwerk</option>
                  <option>Arztpraxis</option>
                  <option>Dienstleistung</option>
                  <option>Sonstiges</option>
                </select>
              </label>
              <label className="space-y-2 text-sm font-semibold text-ink/70 sm:col-span-2">
                Worum geht es?
                <textarea required name="nachricht" className="focus-ring min-h-36 w-full resize-none rounded-xl border border-ink/10 bg-paper px-4 py-3 text-base text-ink" placeholder="Ich möchte meine bestehende Webseite modernisieren..." />
              </label>
            </div>
            
            {status && (
              <div className={`p-4 rounded-xl text-sm font-medium ${status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                {status.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                disabled={loading}
                type="submit"
                className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-full bg-copper px-6 text-sm font-semibold text-white transition hover:scale-102 active:scale-95 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Wird gesendet..." : "Anfrage senden"}
                {!loading && <CalendarCheck size={18} />}
              </button>

              <a
                href="https://wa.me/4915212817629?text=Hallo%2C%20Ich%20interessiere%20mich%20f%C3%BCr%20Ihre%20Webentwicklungsdienste."
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-6 text-sm font-semibold text-ink transition hover:shadow-soft"
              >
                Mit WhatsApp kontaktieren
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
