const LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-dark px-6 py-16 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:justify-between">
        <div className="max-w-xs">
          <p className="text-lg font-semibold">Meridian Ortho</p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Precise, patient-first orthopedic care for joint, spine, and
            sports-related conditions.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-white/90">Quick Links</p>
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-white/90">Contact</p>
          <p className="text-sm text-white/70">+91 8179944626</p>
          <a
            href="mailto:Prasannakumar3338@gmail.com"
            className="text-sm text-white/70 transition-colors hover:text-white"
          >
            Prasannakumar3338@gmail.com
          </a>
          <p className="text-sm text-white/70">
            Srikara Hospitals, 222, Phase 2, Mythri Nagar
            <br />
            Hafeezpet, Madeenaguda, Hyderabad, Telangana 500049
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-6 text-xs text-white/50">
        © {new Date().getFullYear()} Meridian Ortho. All rights reserved.
      </div>
    </footer>
  );
}
