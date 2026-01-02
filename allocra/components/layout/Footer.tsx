/**
 * Footer Component
 *
 * Simple, clean footer with links and branding.
 */

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content mt-auto">
      <nav className="grid grid-flow-col gap-4">
        <Link href="/about" className="link link-hover">
          About
        </Link>
        <Link href="/pricing" className="link link-hover">
          Pricing
        </Link>
        <Link href="/docs" className="link link-hover">
          Docs
        </Link>
        <Link href="/privacy" className="link link-hover">
          Privacy
        </Link>
        <Link href="/terms" className="link link-hover">
          Terms
        </Link>
      </nav>
      <aside>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold text-xs">A</span>
          </div>
          <span className="font-semibold">Allocra</span>
        </div>
        <p className="text-sm opacity-70">
          Smart DCA investing. Discipline beats timing.
        </p>
        <p className="text-xs opacity-50 mt-2">
          © {currentYear} Allocra. All rights reserved.
        </p>
      </aside>
    </footer>
  );
}
