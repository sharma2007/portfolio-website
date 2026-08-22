"use client";

import Link from "next/link";
import { IconLinkedIn, IconGitHub, IconMail } from "./Icons";

const EMAIL = "sharmasoham2007@gmail.com";

const NAV = [
  { id: "about", label: "About" },
  { id: "resume", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "tech-stack", label: "Skills" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-surface">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="#top" className="font-mono text-sm text-text hover:text-accent transition-colors flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden />
              soham.sharma
            </Link>
            <p className="text-muted mt-4 max-w-xs leading-relaxed">
              CS student at HKUST. Building at the intersection of cryptography, machine learning, and robotics.
            </p>
            <div className="flex gap-3 mt-6">
              <a href={`mailto:${EMAIL}`} aria-label="Email" className="flex h-10 w-10 items-center justify-center rounded-full bg-bg border border-line text-text hover:text-accent hover:border-accent/50 transition-colors"><IconMail /></a>
              <a href="https://linkedin.com/in/ssharma25" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full bg-bg border border-line text-text hover:text-accent hover:border-accent/50 transition-colors"><IconLinkedIn size="md" /></a>
              <a href="https://github.com/sharma2007" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex h-10 w-10 items-center justify-center rounded-full bg-bg border border-line text-text hover:text-accent hover:border-accent/50 transition-colors"><IconGitHub size="md" /></a>
            </div>
          </div>

          <div>
            <h3 className="kicker text-muted mb-4">Navigate</h3>
            <ul className="space-y-2.5">
              {NAV.map((n) => (
                <li key={n.id}>
                  <Link href={`#${n.id}`} className="text-muted hover:text-accent transition-colors text-sm">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="kicker text-muted mb-4">Elsewhere</h3>
            <ul className="space-y-2.5">
              <li><a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors text-sm">CV (PDF)</a></li>
              <li><a href="https://linkedin.com/in/ssharma25" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors text-sm">LinkedIn</a></li>
              <li><a href="https://github.com/sharma2007" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors text-sm">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-muted">© {year} Soham Sharma — Built with Next.js</p>
          <Link href="/login" className="font-mono text-xs text-muted/50 hover:text-accent transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
