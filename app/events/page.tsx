import type { Metadata } from "next";
import Link from "next/link";
import { EVENT_PAGES, meta } from "@/lib/site";

export const metadata: Metadata = meta("Events | HowLongUntill", "Live countdowns to holidays, weekends and personal dates, always to the next occurrence.", "/events");

export default function Page() {
  return (
    <main className="wrap">
      <section className="hero"><h1>Events</h1><p className="lead">Live countdowns to holidays, the weekend and personal dates. Fixed events count to their next occurrence, and personal dates are counted only from a date you pick yourself — nothing is invented for you.</p></section>
      <div className="cards">
        {EVENT_PAGES.map((e) => (<div className="card" key={e.slug}><h3><Link href={`/events/${e.slug}`}>{e.name}</Link></h3><p>{e.desc}</p><p className="muted">{e.rule}</p></div>))}
      </div>
      <section className="block"><h2>Also available</h2><p className="muted">The original recurring-event countdowns are still available at <Link href="/countdown">/countdown</Link>, including New Year, Christmas, Easter, Thanksgiving, Halloween, Valentine&apos;s Day and Independence Day.</p></section>
    </main>
  );
}
