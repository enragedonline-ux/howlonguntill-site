import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("Online Timer | HowLongUntill", "Set hours, minutes and seconds and run a simple timer in your browser.", "/timer");

export default function Page() {
  return <ToolPage title="Online Timer" intro="Enter hours, minutes and seconds, then start. Pause and resume keep the remaining time, and presets cover common lengths." widget="timer" path="/timer" related={[{ slug: "stopwatch", name: "Stopwatch" }, { slug: "how-long-until", name: "How Long Until" }, { slug: "days-until", name: "Days Until" }]} />;
}
