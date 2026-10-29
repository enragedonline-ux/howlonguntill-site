import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("Days Left in the Year | HowLongUntill", "Count how many days remain in the current year.", "/days-left-in-year");

export default function Page() {
  return <ToolPage title="Days Left in the Year" intro="See how many days are left in the year from today, or from any date you pick." widget="cal-days-left" path="/days-left-in-year" related={[{ slug: "weeks-left-in-year", name: "Weeks Left in the Year" }, { slug: "sleep-calculator", name: "Sleep Calculator" }, { slug: "countdown-timer", name: "Countdown Timer" }]} />;
}
