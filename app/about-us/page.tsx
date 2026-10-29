import type { Metadata } from "next";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("About Us | HowLongUntill", "About HowLongUntill: free timers and date calculators that run in your browser, with no account.", "/about-us");

export default function Page() {
  return (
    <main className="wrap">
      <section className="hero"><h1>About HowLongUntill</h1></section>
      <section className="block">
        <p>HowLongUntill is a small collection of time tools: countdowns, timers, a stopwatch, and calculators for dates, ages and time zones. Every tool runs in your browser. There is no account to create, nothing to install, and nothing published socially from the site.</p>
        <p>The tools are built to be honest about the tricky parts of date arithmetic. Month-end overflow, leap years, daylight saving changes and background-tab throttling are all documented on the pages where they matter, instead of being hidden behind a simple-looking number.</p>
        <p>If a result looks wrong, the rule stated on the page is the place to check first. Dates that do not exist, such as 31 February, are rejected rather than silently rolled over.</p>
        
      </section>
    </main>
  );
}
