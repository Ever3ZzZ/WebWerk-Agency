export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-white px-5 py-16 sm:px-8 text-ink">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-4xl font-bold">Datenschutzerklärung</h1>

        <section className="space-y-6 text-lg leading-8">
          <div>
            <h2 className="mb-3 text-2xl font-semibold">Verantwortliche Stelle</h2>
            <p>Webwerk Franken</p>
            <p>Bad Kissingen</p>
            <p>Deutschland</p>
            <p>E-Mail: hallo@webwerk-franken.de</p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold">Allgemeines zur Datenverarbeitung</h2>
            <p>
              Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung erfolgt nur nach gesetzlicher Erlaubnis, insbesondere nach Art. 6 DSGVO.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold">Erhebung von Daten</h2>
            <p>
              Beim Besuch der Website speichern wir in sogenannten Server-Log-Dateien automatisch Informationen, die Ihr Browser an uns übermittelt. Dazu gehören IP-Adresse, Datum und Uhrzeit der Anfrage, betrachtete Seite, Browsertyp und Betriebssystem.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold">Kontaktformular</h2>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zusenden, werden die dort eingegebenen Daten zum Zweck der Bearbeitung Ihres Anliegens verarbeitet. Eine Weitergabe an Dritte findet nur statt, wenn dies gesetzlich erlaubt ist oder Sie ausdrücklich eingewilligt haben.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold">Cookies</h2>
            <p>
              Diese Website verwendet Cookies nur in dem Umfang, wie sie für den Betrieb der Seite erforderlich sind. Cookies sind kleine Textdateien, die im Internetbrowser gespeichert werden. Sie können die Speicherung von Cookies durch eine entsprechende Einstellung in Ihrem Browser verhindern.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold">Ihre Rechte</h2>
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten. Bei Fragen zum Datenschutz kontaktieren Sie uns bitte per E-Mail.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold">Änderungen dieser Erklärung</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen. Die jeweils aktuelle Version ist auf dieser Seite verfügbar.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
