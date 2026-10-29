import Link from "next/link";
import { TOOLS, EVENTS, SITE_URL, faqLd } from "@/lib/site";
import { BLOG_POSTS } from "@/lib/blog";
import { HeroCountdown } from "@/components/widgets";

const FAQS = [
  { q: "Do these calculators use my local time?", a: "Interactive tools read the current time from your browser and convert wall times with IANA time zones. The server does not assume its own zone is yours." },
  { q: "Why can a countdown jump after I leave a tab open?", a: "Browsers slow background timers. These tools store a target timestamp and subtract the current time on each tick, so returning to the tab corrects the display." },
  { q: "Is an account required?", a: "No. Preferences stay in local storage on your device. Nothing here is a signed-in product or a social publisher." },
];

const GROUPS = ["Countdown", "Time", "Date", "Calendar"];

export default function Home() {
  return (
    <main className="wrap">
      <section className="hero">
        <h1>Time, counted carefully</h1>
        <p className="lead">See how long is left — and what the calendar actually does. Countdown clocks, kitchen timers, and date math that document leap years, month-end overflow, and time zones instead of hiding them.</p>
        <HeroCountdown />
        <p className="muted">Quick countdown: pick a preset above. For a custom target, use the <Link href="/countdown-timer">Countdown Timer</Link>.</p>
      </section>

      {GROUPS.map((g) => (
        <section className="block" key={g}>
          <h2>{g} tools</h2>
          <div className="cards">
            {TOOLS.filter((t) => t.group === g).map((t) => (
              <div className="card" key={t.slug}>
                <h3><Link href={`/${t.slug}`}>{t.name}</Link></h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="block">
        <h2>Event countdowns</h2>
        <div className="cards">
          {EVENTS.map((e) => (
            <div className="card" key={e.slug}>
              <h3><Link href={`/countdown/${e.slug}`}>{e.name}</Link></h3>
              <p>{e.desc}</p>
            </div>
          ))}
          <div className="card">
            <h3><Link href="/countdown">All event countdowns</Link></h3>
            <p>Browse every recurring event countdown in one place.</p>
          </div>
        </div>
        <p><Link href="/how-long-until">How Long Until</Link> also has a page for every minute of the day — 1,440 minute pages — from <Link href="/how-long-until/12-00-am">12:00 AM</Link> to <Link href="/how-long-until/11-59-pm">11:59 PM</Link>.</p>
      </section>

      <section className="block">
        <h2>How it works</h2>
        <ol>
          <li>Pick a tool that matches the question: remaining time, elapsed time, or calendar arithmetic.</li>
          <li>Enter dates and times. Invalid values are rejected instead of being silently coerced.</li>
          <li>Live tools subtract from a stored timestamp so the number stays honest if the tab sleeps.</li>
        </ol>
      </section>

      <section className="block">
        <h2>Why these tools</h2>
        <p>Date math fails in predictable ways: February 31, daylight saving gaps, birthdays on leap days. Each calculator states the rule it uses. There are no accounts, no social publishing features, and no invented usage statistics.</p>
      </section>

      <section className="block faq">
        <h2>Questions</h2>
        {FAQS.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
      </section>

      <section className="block">
        <h2>From the blog</h2>
        <div className="cards">
          {BLOG_POSTS.map((p) => (
            <div className="card" key={p.slug}>
              <h3><Link href={`/blog/${p.slug}`}>{p.title}</Link></h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "HowLongUntill", url: `${SITE_URL}/`, applicationCategory: "UtilitiesApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(FAQS)) }} />
    </main>
  );
}
