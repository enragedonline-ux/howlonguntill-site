import type { Metadata } from "next";
import Link from "next/link";
import { EVENTS, meta } from "@/lib/site";

export const metadata: Metadata = meta("Event Countdowns | HowLongUntill", "Live countdowns to recurring holidays and notable dates, always to the next occurrence.", "/countdown");

export default function Page() {
  return (
    <main className="wrap">
      <section className="hero"><h1>Event Countdowns</h1><p className="lead">Live countdowns to recurring holidays and notable dates. Each page counts to the next occurrence, moving to next year automatically once a date has passed.</p></section>
      <div className="cards">
        {EVENTS.map((e) => (<div className="card" key={e.slug}><h3><Link href={`/countdown/${e.slug}`}>{e.name}</Link></h3><p>{e.desc}</p></div>))}
      </div>
    </main>
  );
}
