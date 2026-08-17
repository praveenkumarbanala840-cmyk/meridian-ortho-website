export default function Hero() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-32">
      <span className="rounded-full bg-primary-light px-3 py-1 text-sm font-medium text-primary">
        Now accepting new patients
      </span>
      <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
        Expert orthopedic care, focused on getting you moving again.
      </h1>
      <p className="max-w-xl text-lg leading-relaxed text-muted">
        Meridian Ortho provides precise diagnosis and personalized treatment
        for joint, spine, and sports-related conditions — with a calm,
        patient-first experience.
      </p>
      <div className="flex flex-wrap items-center gap-6">
        <a
          href="#contact"
          className="rounded-md bg-accent px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Book an Appointment
        </a>
        <a
          href="#services"
          className="text-base font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          View Services →
        </a>
      </div>
    </section>
  );
}
