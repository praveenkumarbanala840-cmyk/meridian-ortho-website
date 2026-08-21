import BodyRotationBackground from "@/components/BodyRotationBackground";
import Hero from "@/components/sections/Hero";
import Credibility from "@/components/sections/Credibility";
import Services from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Location from "@/components/sections/Location";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <BodyRotationBackground />
      <main className="flex flex-col">
        <Hero />
        <Credibility />
        <Services />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <Location />
        <Contact />
      </main>
    </>
  );
}
