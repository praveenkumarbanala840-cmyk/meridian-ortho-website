"use client";

import { useState, type FormEvent } from "react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const WHATSAPP_NUMBER = "918179944626";

type FormErrors = {
  name?: string;
  phone?: string;
};

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nextErrors: FormErrors = {};
    if (!name.trim()) nextErrors.name = "Please enter your name.";
    if (!phone.trim()) nextErrors.phone = "Please enter your phone number.";
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.phone) return;

    const whatsappMessage = [
      "Hi, I'd like to book an appointment.",
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Reason: ${reason.trim()}`,
      `Message: ${message.trim()}`,
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contact" className="scroll-mt-20 bg-gradient-to-b from-black/80 via-black/68 to-black/80 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Book your appointment"
            description="Fill out the form and our team will get back to you within one business day — or reach us instantly by chat."
          />
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <Reveal>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-white"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-border focus:border-primary"
                  }`}
                />
                {errors.name && (
                  <p id="name-error" className="text-xs text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-white"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="(555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className={`rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none ${
                    errors.phone
                      ? "border-red-500 focus:border-red-500"
                      : "border-border focus:border-primary"
                  }`}
                />
                {errors.phone && (
                  <p id="phone-error" className="text-xs text-red-400">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="reason"
                className="text-sm font-medium text-white"
              >
                Reason for Visit
              </label>
              <input
                id="reason"
                type="text"
                placeholder="e.g. Knee pain, sports injury"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="text-sm font-medium text-white"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Tell us a bit about your condition..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-2 self-start rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Request Appointment
            </button>
            </form>
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-lg border border-border bg-background p-6">
              <h3 className="text-sm font-semibold text-foreground">
                Call Us
              </h3>
              <p className="mt-1 text-base text-muted">+91 8179944626</p>

              <h3 className="mt-6 text-sm font-semibold text-foreground">
                Email Us
              </h3>
              <p className="mt-1 text-base text-muted">
                <a
                  href="mailto:Prasannakumar3338@gmail.com"
                  className="hover:text-primary hover:underline"
                >
                  Prasannakumar3338@gmail.com
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
