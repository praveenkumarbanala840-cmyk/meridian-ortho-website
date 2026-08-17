import SectionHeading from "@/components/SectionHeading";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Book your appointment"
          description="Fill out the form and our team will get back to you within one business day — or reach us instantly by chat."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <form className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Jane Doe"
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-foreground"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="(555) 000-0000"
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="reason"
                className="text-sm font-medium text-foreground"
              >
                Reason for Visit
              </label>
              <input
                id="reason"
                type="text"
                placeholder="e.g. Knee pain, sports injury"
                className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="text-sm font-medium text-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Tell us a bit about your condition..."
                className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
              />
            </div>

            <button
              type="button"
              className="mt-2 self-start rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Request Appointment
            </button>
          </form>

          <div className="flex flex-col justify-between gap-8">
            <div className="rounded-lg border border-border bg-background p-6">
              <h3 className="text-sm font-semibold text-foreground">
                Call Us
              </h3>
              <p className="mt-1 text-base text-muted">(555) 123-4567</p>

              <h3 className="mt-6 text-sm font-semibold text-foreground">
                Email Us
              </h3>
              <p className="mt-1 text-base text-muted">
                care@meridianortho.example
              </p>
            </div>

            <a
              href="https://wa.me/15551234567?text=Hi%2C%20I%27d%20like%20to%20book%20an%20appointment%20at%20Meridian%20Ortho."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.3a8.4 8.4 0 0 1-1.1-4.2 8.4 8.4 0 0 1 16.9-.6z" />
              </svg>
              Chat with Us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
