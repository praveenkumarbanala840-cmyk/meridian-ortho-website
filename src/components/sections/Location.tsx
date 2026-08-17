import SectionHeading from "@/components/SectionHeading";

export default function Location() {
  return (
    <section id="location" className="scroll-mt-20 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Visit Us" title="Find our clinic" />

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="aspect-video w-full rounded-lg bg-zinc-200" />

          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Meridian Ortho Clinic
            </h3>
            <p className="mt-2 text-base leading-relaxed text-muted">
              123 Placeholder Street, Suite 400
              <br />
              City, State 00000
            </p>

            <h4 className="mt-6 text-sm font-semibold text-foreground">
              Clinic Hours
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Monday – Friday: 9:00 AM – 6:00 PM
              <br />
              Saturday: 9:00 AM – 1:00 PM
              <br />
              Sunday: Closed
            </p>

            <a
              href="#"
              className="mt-6 inline-block rounded-md border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-light"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
