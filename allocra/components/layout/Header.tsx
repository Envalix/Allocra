/**
 * Header Component
 *
 * Mobile-first responsive header with navigation.
 * Uses DaisyUI navbar with drawer for mobile menu.
 */

'use client';

import Link from 'next/link';
import { useState } from 'react';

interface NavLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

const navLinks: NavLink[] = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/plans', label: 'My Plans' },
  { href: '/stocks', label: 'Stocks' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="navbar bg-base-100/80 backdrop-blur-lg border-b border-base-200 px-4 lg:px-8">
        {/* Mobile menu button */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-circle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
            {isMenuOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-200"
              >
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="py-3"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <div className="divider my-1"></div>
                <li>
                  <Link
                    href="/login"
                    className="py-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 ml-2 lg:ml-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Allocra
            </span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-lg font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side: Auth buttons */}
        <div className="navbar-end gap-2">
          {/* Theme toggle */}
          <button
            className="btn btn-ghost btn-circle"
            aria-label="Toggle theme"
            onClick={() => {
              // Toggle between light and dark themes
              const html = document.documentElement;
              const currentTheme = html.getAttribute('data-theme');
              html.setAttribute(
                'data-theme',
                currentTheme === 'dark' ? 'light' : 'dark'
              );
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>

          {/* Auth buttons (hidden on mobile, shown in dropdown) */}
          <div className="hidden sm:flex gap-2">
            <Link href="/login" className="btn btn-ghost btn-sm">
              Sign In
            </Link>
            <Link href="/signup" className="btn btn-primary btn-sm">
              Get Started
            </Link>
          </div>

          {/* Mobile: Just show Get Started */}
          <Link href="/signup" className="btn btn-primary btn-sm sm:hidden">
            Start
          </Link>
        </div>
      </div>
    </header>
  );
}
