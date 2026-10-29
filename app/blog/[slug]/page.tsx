import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { meta, breadcrumbLd } from "@/lib/site";
import { BLOG_POSTS } from "@/lib/blog";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

const SHORT_TITLES: Record<string, string> = {
  "month-end-overflow": "Month-End Overflow Explained",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return meta(`${SHORT_TITLES[slug] ?? post.title} | HowLongUntill`, post.desc, `/blog/${slug}`);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();
  return (
    <main className="wrap">
      <section className="hero">
        <p className="muted"><Link href="/">Home</Link> / <Link href="/blog">Blog</Link> · {post.date}</p>
        <h1>{post.title}</h1>
        <p className="lead">{post.desc}</p>
      </section>
      {post.sections.map((s) => (
        <section className="block" key={s.h}><h2>{s.h}</h2>{s.ps.map((p, i) => <p key={i}>{p}</p>)}</section>
      ))}
      <section className="block"><h2>More posts</h2><div className="cards">
        {BLOG_POSTS.filter((p) => p.slug !== slug).map((p) => (<div className="card" key={p.slug}><h3><Link href={`/blog/${p.slug}`}>{p.title}</Link></h3><p>{p.desc}</p></div>))}
      </div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.desc, datePublished: post.date, author: { "@type": "Organization", name: "HowLongUntill" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${slug}` }])) }} />
    </main>
  );
}
