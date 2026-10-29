import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("Day of the Year | HowLongUntill", "Find which day of the year a date falls on.", "/day-of-the-year");

export default function Page() {
  return <ToolPage title="Day of the Year" intro="Pick a date to see its day number in the year, and how many days remain after it." widget="cal-doy" path="/day-of-the-year" related={[{ slug: "days-left-in-year", name: "Days Left in the Year" }, { slug: "weeks-left-in-year", name: "Weeks Left in the Year" }, { slug: "sleep-calculator", name: "Sleep Calculator" }]} />;
}
