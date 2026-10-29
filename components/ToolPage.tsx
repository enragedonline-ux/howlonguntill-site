import Link from "next/link";
import { SITE_URL, breadcrumbLd, faqLd } from "@/lib/site";
import { CountdownTool, OnlineTimer, Stopwatch, HowLongUntilTool, DaysUntilTool, TimeCalculator, DateCalculator, AgeCalculator, TimeZoneConverter, OffsetTool, CalendarTool, SleepCalculator } from "./widgets";

export type WidgetKey = "countdown" | "timer" | "stopwatch" | "howlong" | "daysuntil" | "timecalc" | "datecalc" | "agecalc" | "tz" | "off-hours-from" | "off-hours-ago" | "off-minutes-from" | "off-days-from" | "off-weeks-from" | "off-months-from" | "off-years-from" | "off-days-ago" | "off-weeks-ago" | "cal-doy" | "cal-days-left" | "cal-weeks-left" | "sleep";

export function Widget({ k }: { k: WidgetKey }) {
  switch (k) {
    case "countdown": return <CountdownTool />;
    case "timer": return <OnlineTimer />;
    case "stopwatch": return <Stopwatch />;
    case "howlong": return <HowLongUntilTool />;
    case "daysuntil": return <DaysUntilTool />;
    case "timecalc": return <TimeCalculator />;
    case "datecalc": return <DateCalculator />;
    case "agecalc": return <AgeCalculator />;
    case "tz": return <TimeZoneConverter />;
    case "off-hours-from": return <OffsetTool unit="hours" direction="from" />;
    case "off-hours-ago": return <OffsetTool unit="hours" direction="ago" />;
    case "off-minutes-from": return <OffsetTool unit="minutes" direction="from" />;
    case "off-days-from": return <OffsetTool unit="days" direction="from" />;
    case "off-weeks-from": return <OffsetTool unit="weeks" direction="from" />;
    case "off-months-from": return <OffsetTool unit="months" direction="from" />;
    case "off-years-from": return <OffsetTool unit="years" direction="from" />;
    case "off-days-ago": return <OffsetTool unit="days" direction="ago" />;
    case "off-weeks-ago": return <OffsetTool unit="weeks" direction="ago" />;
    case "cal-doy": return <CalendarTool kind="day-of-year" />;
    case "cal-days-left": return <CalendarTool kind="days-left" />;
    case "cal-weeks-left": return <CalendarTool kind="weeks-left" />;
    case "sleep": return <SleepCalculator />;
  }
}

const FAQS: Partial<Record<WidgetKey, { q: string; a: string }[]>> = {
  countdown: [
    { q: "Does the countdown stay accurate if I leave the tab open?", a: "Yes. It stores a target timestamp and subtracts the current time on every tick, so returning to the tab corrects the display." },
    { q: "Can I share this countdown?", a: "Yes. Use the copy shareable link button to get a link with the target time encoded in it." },
  ],
  timer: [
    { q: "Does the timer keep working in a background tab?", a: "Yes, in effect. It tracks a stored end time, so the display corrects itself when you return to the tab." },
    { q: "Do I need an account?", a: "No. The timer runs entirely in your browser." },
  ],
  stopwatch: [
    { q: "How are laps recorded?", a: "Each lap stores the elapsed time at the moment you press Lap. Laps stay on this page only and are not uploaded anywhere." },
  ],
  datecalc: [
    { q: "What happens with month-end dates?", a: "Adding months clamps to the last day of the target month: 31 January plus one month is 28 February, or 29 in a leap year." },
    { q: "Are impossible dates accepted?", a: "No. Dates such as 31 February are rejected instead of being silently rolled over to March." },
  ],
  agecalc: [
    { q: "How are leap-day birthdays handled?", a: "A person born on 29 February is treated as having a birthday on 28 February in non-leap years for this calculation." },
  ],
  tz: [
    { q: "Does this handle daylight saving?", a: "Yes. Conversion uses IANA time zones through Intl, so daylight saving shifts are handled by the platform data." },
  ],
  sleep: [
    { q: "Are sleep calculator results medical advice?", a: "No. They are estimates based on 90-minute sleep cycles and are not a substitute for professional advice." },
  ],
};

export default function ToolPage({ title, intro, widget, path, related }: { title: string; intro: string; widget: WidgetKey; path: string; related: { slug: string; name: string }[] }) {
  const faqs = FAQS[widget] ?? [{ q: "Do I need an account to use this tool?", a: "No. All tools on this site run in your browser and need no account." }];
  return (
    <main className="wrap">
      <section className="hero">
        <p className="muted"><Link href="/">Home</Link> / {title}</p>
        <h1>{title}</h1>
        <p className="lead">{intro}</p>
      </section>
      <Widget k={widget} />
      <section className="block faq">
        <h2>Questions</h2>
        {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
      </section>
      <section className="block">
        <h2>Related tools</h2>
        <div className="cards">
          {related.map((r) => (<div className="card" key={r.slug}><h3><Link href={`/${r.slug}`}>{r.name}</Link></h3></div>))}
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: title, url: `${SITE_URL}${path}`, applicationCategory: "UtilitiesApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([{ name: "Home", path: "/" }, { name: title, path }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(faqs)) }} />
    </main>
  );
}
