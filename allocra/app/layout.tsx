/**
 * Root Layout
 *
 * Main layout wrapper with Header, Footer, and global providers.
 * Mobile-first responsive design with DaisyUI theming.
 */

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header, Footer } from '@/components/layout';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Allocra - Smart DCA Investing',
    template: '%s | Allocra',
  },
  description:
    'Allocra is a smart DCA (Dollar Cost Averaging) alert platform that helps long-term investors allocate capital with price-based and time-based triggers.',
  keywords: [
    'DCA',
    'Dollar Cost Averaging',
    'investing',
    'stocks',
    'alerts',
    'portfolio',
    'finance',
  ],
  authors: [{ name: 'Allocra' }],
  creator: 'Allocra',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://allocra.com',
    siteName: 'Allocra',
    title: 'Allocra - Smart DCA Investing',
    description:
      'Smart DCA alert platform for long-term investors. Discipline beats timing.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Allocra - Smart DCA Investing',
    description:
      'Smart DCA alert platform for long-term investors. Discipline beats timing.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
