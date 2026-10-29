import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("Weeks Left in the Year | HowLongUntill", "Count how many weeks remain in the current year.", "/weeks-left-in-year");

export default function Page() {
  return <ToolPage title="Weeks Left in the Year" intro="See how many weeks are left in the year, rounded up so a part-week counts as one week." widget="cal-weeks-left" path="/weeks-left-in-year" related={[{ slug: "sleep-calculator", name: "Sleep Calculator" }, { slug: "countdown-timer", name: "Countdown Timer" }, { slug: "timer", name: "Online Timer" }]} />;
}
