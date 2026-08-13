export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-start justify-center gap-6 px-6 py-32">
        <span className="rounded-full bg-primary-light px-3 py-1 text-sm font-medium text-primary">
          Now accepting new patients
        </span>
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
          Confident smiles, guided by trusted orthodontic care.
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-muted">
          Meridian Ortho combines precise, modern treatment with a calm,
          personal experience — for patients of every age.
        </p>
        <a
          href="/contact"
          className="rounded-md bg-accent px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Book a Consultation
        </a>
      </section>
    </main>
  );
}
