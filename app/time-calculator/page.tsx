import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("Time Calculator | HowLongUntill", "Add or subtract hours, minutes and seconds across several durations.", "/time-calculator");

export default function Page() {
  return <ToolPage title="Time Calculator" intro="Add rows for each duration, mark each one to add or subtract, and read the total in hours, minutes and seconds." widget="timecalc" path="/time-calculator" related={[{ slug: "date-calculator", name: "Date Calculator" }, { slug: "age-calculator", name: "Age Calculator" }, { slug: "time-zone-converter", name: "Time Zone Converter" }]} />;
}
