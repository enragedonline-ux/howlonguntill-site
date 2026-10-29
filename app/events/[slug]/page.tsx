import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EVENT_PAGES, meta, breadcrumbLd } from "@/lib/site";
import { EventCountdown, PersonalDateCountdown } from "@/components/widgets";

export function generateStaticParams() {
  return EVENT_PAGES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const def = EVENT_PAGES.find((e) => e.slug === slug);
  if (!def) return {};
  return meta(`How Long Until ${def.name}? | HowLongUntill`, def.desc, `/events/${slug}`);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const def = EVENT_PAGES.find((e) => e.slug === slug);
  if (!def) notFound();
  return (
    <main className="wrap">
      <section className="hero">
        <p className="muted"><Link href="/">Home</Link> / <Link href="/events">Events</Link></p>
        <h1>How Long Until {def.name}?</h1>
        <p className="lead">{def.desc}</p>
        <p className="muted">Rule: {def.rule}</p>
      </section>
      {def.mode === "birthday" ? (
        <PersonalDateCountdown mode="birthday" noun="birthday" />
      ) : def.mode === "exact" ? (
        <PersonalDateCountdown mode="exact" noun={def.name === "Wedding" ? "wedding date" : "vacation date"} />
      ) : (
        <EventCountdown slug={def.key} />
      )}
      <section className="block">
        {def.paras.map((p, i) => (<p key={i}>{p}</p>))}
      </section>
      <section className="block"><h2>Other events</h2><div className="cards">
        {EVENT_PAGES.filter((e) => e.slug !== slug).map((e) => (<div className="card" key={e.slug}><h3><Link href={`/events/${e.slug}`}>{e.name}</Link></h3><p>{e.desc}</p></div>))}
      </div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([{ name: "Home", path: "/" }, { name: "Events", path: "/events" }, { name: def.name, path: `/events/${slug}` }])) }} />
    </main>
  );
}
