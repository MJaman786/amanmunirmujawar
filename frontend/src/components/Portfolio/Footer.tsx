import React from "react";

export default function Footer() {
  return (
    <footer className="footer border-t border-[var(--hairline)] py-12 px-4 lg:px-8 bg-[var(--canvas)]">
      <div className="footer-container max-w-[1100px] mx-auto flex flex-col sm:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <p className="label-sm text-sm font-semibold text-[var(--ink)]">Aman Mujawar</p>
          <p className="body-sm text-xs text-[var(--mute)] mt-1">Pune, India • +91 8149629079</p>
        </div>

        <div className="footer-links flex items-center gap-6">
          <a
            href="https://github.com/MJaman786"
            target="_blank"
            rel="noreferrer"
            className="body-md text-sm text-[var(--body)] hover:text-[var(--ink)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/aman-mujawar-b717a3289/"
            target="_blank"
            rel="noreferrer"
            className="body-md text-sm text-[var(--body)] hover:text-[var(--ink)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:amanmujawar064@gmail.com"
            className="body-md text-sm text-[var(--body)] hover:text-[var(--ink)] transition-colors"
          >
            Email
          </a>
        </div>
      </div>

      <div className="footer-bottom max-w-[1100px] mx-auto border-t border-[var(--hairline-soft)] pt-6">
        <p className="body-sm text-xs text-[var(--mute)]">
          © 2026 Aman Mujawar. Built with Geist Design System principles.
        </p>
      </div>
    </footer>
  );
}