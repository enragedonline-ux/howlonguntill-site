import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("Countdown Timer | HowLongUntill", "Count down to any date and time, with pause, presets and a shareable link.", "/countdown-timer");

export default function Page() {
  return <ToolPage title="Countdown Timer" intro="Pick a target, start the countdown, and pause or resume it any time. The remaining time is worked out from a stored timestamp on every tick." widget="countdown" path="/countdown-timer" related={[{ slug: "timer", name: "Online Timer" }, { slug: "stopwatch", name: "Stopwatch" }, { slug: "how-long-until", name: "How Long Until" }]} />;
}
