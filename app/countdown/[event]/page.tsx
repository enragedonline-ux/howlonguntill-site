import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EVENTS, meta, breadcrumbLd } from "@/lib/site";
import { EventCountdown } from "@/components/widgets";

export function generateStaticParams() {
  return EVENTS.map((e) => ({ event: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ event: string }> }): Promise<Metadata> {
  const { event } = await params;
  const def = EVENTS.find((e) => e.slug === event);
  if (!def) return {};
  return meta(`${def.name} Countdown | HowLongUntill`, `How long until ${def.name}? Live countdown to the next occurrence.`, `/countdown/${event}`);
}

export default async function Page({ params }: { params: Promise<{ event: string }> }) {
  const { event } = await params;
  const def = EVENTS.find((e) => e.slug === event);
  if (!def) notFound();
  return (
    <main className="wrap">
      <section className="hero">
        <p className="muted"><Link href="/">Home</Link> / <Link href="/countdown">Event Countdowns</Link></p>
        <h1>How Long Until {def.name}?</h1>
        <p className="lead">{def.desc}</p>
      </section>
      <EventCountdown slug={event} />
      <section className="block"><h2>Other events</h2><div className="cards">
        {EVENTS.filter((e) => e.slug !== event).map((e) => (<div className="card" key={e.slug}><h3><Link href={`/countdown/${e.slug}`}>{e.name}</Link></h3><p>{e.desc}</p></div>))}
      </div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([{ name: "Home", path: "/" }, { name: "Event Countdowns", path: "/countdown" }, { name: def.name, path: `/countdown/${event}` }])) }} />
    </main>
  );
}
