import Link from "next/link";
import { Activity } from "lucide-react";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/40 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 md:h-16 md:gap-0 md:py-0">
        <Link href="/" className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Activity
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5"
          />
          <span className="block text-[14px] font-bold leading-tight tracking-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] max-[360px]:text-[13px] sm:text-base md:hidden">
            Dr. Prasanna Kumar
            <br />
            Physio Care
          </span>
          <span className="hidden text-lg font-semibold tracking-tight text-primary md:block">
            Dr. Prasanna Kumar Physio Care
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="shrink-0 whitespace-nowrap rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-accent-hover max-[360px]:px-2.5 max-[360px]:py-1 max-[360px]:text-[11px] sm:px-3.5 sm:py-2 sm:text-[13px] md:px-4 md:py-2 md:text-sm"
        >
          Book an Appointment
        </a>
      </nav>
    </header>
  );
}
