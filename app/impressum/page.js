export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-white px-5 py-16 sm:px-8 text-ink">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-4xl font-bold">Impressum</h1>

        <section className="space-y-6 text-lg leading-8">
          <div>
            <h2 className="mb-3 text-2xl font-semibold">Angaben gemäß § 5 TMG</h2>
            <p>Webwerk Franken</p>
            <p>Bad Kissingen</p>
            <p>Deutschland</p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold">Kontakt</h2>
            <p>E-Mail: hallo@webwerk-franken.de</p>
            <p>Telefon: +49 152 12817629</p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold">Vertreten durch</h2>
            <p>Webwerk Franken</p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold">Umsatzsteuer</h2>
            <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: nicht vorhanden</p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold">Verantwortlich für den Inhalt</h2>
            <p>Webwerk Franken</p>
            <p>Bad Kissingen</p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold">Haftungsausschluss</h2>
            <p>
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
