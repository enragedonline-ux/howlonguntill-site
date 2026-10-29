import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("Sleep Calculator | HowLongUntill", "Estimate bedtimes and wake times from 90-minute sleep cycles.", "/sleep-calculator");

export default function Page() {
  return <ToolPage title="Sleep Calculator" intro="Choose a wake time to get bedtimes, or a bedtime to get wake times, based on 90-minute cycles. Results are estimates only." widget="sleep" path="/sleep-calculator" related={[{ slug: "countdown-timer", name: "Countdown Timer" }, { slug: "timer", name: "Online Timer" }, { slug: "stopwatch", name: "Stopwatch" }]} />;
}
