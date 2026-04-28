// FILE: src/components/Footer.jsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="about" className="border-t border-white/10 bg-[rgba(9,11,16,0.92)]">
      <div className="section-shell grid gap-12 py-16 text-[#98a2b3] lg:grid-cols-3">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="glass flex h-10 w-10 items-center justify-center rounded-2xl">
              <svg viewBox="0 0 64 64" className="h-5 w-5 text-[#e63946]" fill="currentColor" aria-hidden="true">
                <path d="M24 8h16v16h16v16H40v16H24V40H8V24h16z" />
              </svg>
            </div>
            <span className="text-base font-semibold tracking-tight text-white">FlashAid</span>
          </div>
          <p className="max-w-sm text-sm leading-7 text-[#98a2b3]">
            A browser-based emergency response interface built to guide bystanders through the first sixty seconds when speed matters most.
          </p>
        </div>

        <div className="space-y-5">
          <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">Quick Links</h3>
          <div className="flex flex-col gap-3 text-sm text-[#bcc3cf]">
            <Link className="transition-default hover:text-white" to="/">Home</Link>
            <Link className="transition-default hover:text-white" to="/emergency">Emergency</Link>
            <Link className="transition-default hover:text-white" to="/volunteer">Volunteer</Link>
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">Legal</h3>
          <p className="max-w-md text-sm leading-7 text-[#98a2b3]">
            FlashAid is a demonstration prototype for hackathon use. It does not replace trained medical judgment, emergency dispatch, or professional emergency services.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs tracking-[0.02em] text-[#7f8597]">
        © 2025 FlashAid. Built for hackathon demonstration. Not a substitute for professional emergency services.
      </div>
    </footer>
  );
}
