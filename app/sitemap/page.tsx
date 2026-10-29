import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS, EVENTS, meta } from "@/lib/site";
import { BLOG_POSTS } from "@/lib/blog";
import { quarterHours } from "@/lib/time";

export const metadata: Metadata = meta("Sitemap | HowLongUntill", "Every tool, event countdown, clock-time page and blog post on HowLongUntill.", "/sitemap");

export default function Page() {
  return (
    <main className="wrap">
      <section className="hero"><h1>Sitemap</h1><p className="lead">Every page on this site, grouped for browsing. The machine-readable version is at /sitemap.xml.</p></section>
      <section className="block"><h2>Main pages</h2><ul>
        <li><Link href="/">Home</Link></li><li><Link href="/about-us">About Us</Link></li><li><Link href="/contact-us">Contact Us</Link></li><li><Link href="/privacy">Privacy</Link></li><li><Link href="/terms">Terms</Link></li><li><Link href="/blog">Blog</Link></li><li><Link href="/countdown">Event Countdowns</Link></li>
      </ul></section>
      <section className="block"><h2>Tools</h2><ul>{TOOLS.map((t) => <li key={t.slug}><Link href={`/${t.slug}`}>{t.name}</Link></li>)}</ul></section>
      <section className="block"><h2>Event countdowns</h2><ul>{EVENTS.map((e) => <li key={e.slug}><Link href={`/countdown/${e.slug}`}>{e.name}</Link></li>)}</ul></section>
      <section className="block"><h2>How long until — every quarter hour</h2><ul>{quarterHours().map((q) => <li key={q.slug}><Link href={`/how-long-until/${q.slug}`}>{q.label}</Link></li>)}</ul></section>
      <section className="block"><h2>Blog posts</h2><ul>{BLOG_POSTS.map((p) => <li key={p.slug}><Link href={`/blog/${p.slug}`}>{p.title}</Link></li>)}</ul></section>
    </main>
  );
}
