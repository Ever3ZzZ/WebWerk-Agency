import { ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-ink/10 bg-paper/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#" className="focus-ring flex items-center gap-3 rounded-full">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
            W
          </span>
          <span className="text-base font-semibold tracking-normal">
            Webwerk Franken
          </span>
        </a>
        <div className="hidden items-center gap-12 text-medium font-bold text-ink/80 lg:flex">
          <a className="nav-link" href="#leistungen">Leistungen</a>
          <a className="nav-link" href="#preise">Preise</a>
          <a className="nav-link" href="#portfolio">Portfolio</a>
          <a className="nav-link" href="#faq">FAQ</a>
        </div>
        <a
          href="#kontakt"
          className="focus-ring inline-flex h-10 items-center gap-2 rounded-full bg-copper px-4 text-sm font-semibold text-white transition hover:bg-ink"
        >
          Anfrage
          <ArrowRight size={25} />
        </a>
      </nav>
    </header>
  );
}
