import type { Metadata } from "next";
import Link from "next/link";
import { meta } from "@/lib/site";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = meta("Blog | HowLongUntill", "Short explainers on clocks, calendars, daylight saving, leap days and honest date math.", "/blog");

export default function Page() {
  return (
    <main className="wrap">
      <section className="hero"><h1>Blog</h1><p className="lead">Short explainers on the parts of timekeeping that usually cause confusion.</p></section>
      <div className="cards">
        {BLOG_POSTS.map((p) => (<div className="card" key={p.slug}><p className="muted">{p.date}</p><h3><Link href={`/blog/${p.slug}`}>{p.title}</Link></h3><p>{p.desc}</p></div>))}
      </div>
    </main>
  );
}
