import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { meta, breadcrumbLd } from "@/lib/site";
import { parseQuarterSlug, quarterHours } from "@/lib/time";
import { ClockCountdown } from "@/components/widgets";

export function generateStaticParams() {
  return quarterHours().map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const q = parseQuarterSlug(slug);
  if (!q) return {};
  return meta(`How Long Until ${q.label}? | HowLongUntill`, `Live countdown to the next ${q.label}, today or tomorrow, whichever comes first.`, `/how-long-until/${slug}`);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const q = parseQuarterSlug(slug);
  if (!q) notFound();
  return (
    <main className="wrap">
      <section className="hero">
        <p className="muted"><Link href="/">Home</Link> / <Link href="/how-long-until">How Long Until</Link></p>
        <h1>How Long Until {q.label}?</h1>
        <p className="lead">Live countdown to the next occurrence of {q.label}. If that time has already passed today, this counts to tomorrow.</p>
      </section>
      <ClockCountdown q={q} />
      <section className="block"><h2>Other clock times</h2><p className="muted">
        {quarterHours().filter((x) => x.slug !== slug).slice(0, 24).map((x) => (<span key={x.slug}><Link href={`/how-long-until/${x.slug}`}>{x.label}</Link> · </span>))}
        See all 96 quarter-hour pages from the <Link href="/sitemap">sitemap page</Link>.
      </p></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([{ name: "Home", path: "/" }, { name: "How Long Until", path: "/how-long-until" }, { name: q.label, path: `/how-long-until/${slug}` }])) }} />
    </main>
  );
}
