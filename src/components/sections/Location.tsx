import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const CLINIC_ADDRESS =
  "Srikara hospitals, 222, Phase 2, Mythri Nagar, Hafeezpet, Madeenaguda, Hyderabad, Telangana 500049";
const ENCODED_ADDRESS = encodeURIComponent(CLINIC_ADDRESS);
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${ENCODED_ADDRESS}&output=embed`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${ENCODED_ADDRESS}`;

export default function Location() {
  return (
    <section id="location" className="scroll-mt-20 bg-gradient-to-b from-black/80 via-black/68 to-black/80 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading eyebrow="Visit Us" title="Find our clinic" />
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:items-center">
          <Reveal
            direction="right"
            className="aspect-video w-full overflow-hidden rounded-lg border border-border bg-zinc-200 shadow-md"
          >
            <iframe
              src={MAP_EMBED_SRC}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map showing Meridian Ortho Clinic location"
            />
          </Reveal>

          <Reveal direction="left" delay={100}>
            <h3 className="text-lg font-semibold text-white">
              Meridian Ortho Clinic
            </h3>
            <p className="mt-2 text-base leading-relaxed text-white/70">
              Srikara Hospitals, 222, Phase 2, Mythri Nagar
              <br />
              Hafeezpet, Madeenaguda, Hyderabad, Telangana 500049
            </p>

            <h4 className="mt-6 text-sm font-semibold text-white">
              Clinic Hours
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Open 24 Hours
            </p>

            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-md border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Get Directions
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
