const PHONE_NUMBER = "15551234567";
const PREFILLED_MESSAGE =
  "Hi, I'd like to book an appointment at Meridian Ortho.";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(PREFILLED_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Meridian Ortho on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-colors hover:bg-accent-hover"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.3a8.4 8.4 0 0 1-1.1-4.2 8.4 8.4 0 0 1 16.9-.6z" />
      </svg>
    </a>
  );
}
