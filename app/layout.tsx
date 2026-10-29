import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "HowLongUntill — Timers, Countdowns & Date Calculators",
  description: "Free countdown timers, stopwatch, online timer and date calculators that run in your browser. No account needed.",
  alternates: { canonical: `${SITE_URL}/` },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "HowLongUntill — Timers, Countdowns & Date Calculators",
    description: "Free countdown timers, stopwatch, online timer and date calculators that run in your browser. No account needed.",
    url: `${SITE_URL}/`, siteName: SITE_NAME, type: "website",
  },
  robots: { index: true, follow: true },
};

function Logo() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
      <circle cx="15" cy="15" r="13" fill="none" stroke="#2bb3a0" strokeWidth="2.5" />
      <path d="M15 8v7l5 3" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="15" cy="15" r="2" fill="#2bb3a0" />
    </svg>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="header-inner">
            <Link className="brand" href="/">
              <Logo />
              <span>HowLongUntill<small>TIME, COUNTED CAREFULLY</small></span>
            </Link>
            <nav className="nav" aria-label="Main">
              <Link href="/countdown-timer">Countdown</Link>
              <Link href="/timer">Timer</Link>
              <Link href="/stopwatch">Stopwatch</Link>
              <Link href="/date-calculator">Date Calc</Link>
              <Link href="/countdown">Events</Link>
              <Link href="/blog">Blog</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="footer">
          <div className="footer-grid">
            <div>
              <h4>Tools</h4>
              <ul>
                <li><Link href="/countdown-timer">Countdown Timer</Link></li>
                <li><Link href="/timer">Online Timer</Link></li>
                <li><Link href="/stopwatch">Stopwatch</Link></li>
                <li><Link href="/how-long-until">How Long Until</Link></li>
                <li><Link href="/days-until">Days Until</Link></li>
              </ul>
            </div>
            <div>
              <h4>Calculators</h4>
              <ul>
                <li><Link href="/time-calculator">Time Calculator</Link></li>
                <li><Link href="/date-calculator">Date Calculator</Link></li>
                <li><Link href="/age-calculator">Age Calculator</Link></li>
                <li><Link href="/time-zone-converter">Time Zone Converter</Link></li>
                <li><Link href="/sleep-calculator">Sleep Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h4>Events</h4>
              <ul>
                <li><Link href="/events">Events</Link></li>
                <li><Link href="/countdown">All Event Countdowns</Link></li>
                <li><Link href="/countdown/new-year">New Year</Link></li>
                <li><Link href="/countdown/christmas">Christmas</Link></li>
                <li><Link href="/countdown/easter">Easter</Link></li>
                <li><Link href="/countdown/thanksgiving">Thanksgiving</Link></li>
              </ul>
            </div>
            <div>
              <h4>Site</h4>
              <ul>
                <li><Link href="/about-us">About Us</Link></li>
                <li><Link href="/contact-us">Contact Us</Link></li>
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
                <li><Link href="/sitemap">Sitemap</Link></li>
                <li><Link href="/llms.txt">LLMs.txt</Link></li>
              </ul>
            </div>
          </div>
          <div className="wrap" style={{ marginTop: 20 }}>
            <p className="muted" style={{ color: "#9fb0ac" }}>
              {SITE_NAME} runs entirely in your browser. No account is required, and nothing is published socially from here.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
