import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("Stopwatch | HowLongUntill", "Start, pause and record laps with a millisecond display.", "/stopwatch");

export default function Page() {
  return <ToolPage title="Stopwatch" intro="Start the stopwatch, record laps as you go, and pause or reset whenever you need to. Times are measured from timestamps." widget="stopwatch" path="/stopwatch" related={[{ slug: "how-long-until", name: "How Long Until" }, { slug: "days-until", name: "Days Until" }, { slug: "time-calculator", name: "Time Calculator" }]} />;
}
