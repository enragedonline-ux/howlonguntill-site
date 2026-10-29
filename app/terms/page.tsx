import type { Metadata } from "next";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("Terms of Use | HowLongUntill", "Terms of use for HowLongUntill: free tools provided as-is, with estimates clearly labelled.", "/terms");

export default function Page() {
  return (
    <main className="wrap">
      <section className="hero"><h1>Terms of Use</h1></section>
      <section className="block">
        <p>The tools on HowLongUntill are provided free of charge and as-is. Results are calculations based on the inputs you provide; please double-check any result that matters for travel, deadlines, contracts or medical decisions.</p>
        <p>Sleep calculator results are estimates only and are not medical advice. Date results follow the rules stated on each page, including the month-end clamping rule and the leap-day birthday rule.</p>
        <p>You may use the site for personal and commercial planning. You may not present the site or its results as affiliated with any other timer or calculator service.</p>
        
      </section>
    </main>
  );
}
