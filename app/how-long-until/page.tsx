import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("How Long Until | HowLongUntill", "See days, hours, minutes and seconds left until a date or clock time.", "/how-long-until");

export default function Page() {
  return <ToolPage title="How Long Until" intro="Choose a date and time to see exactly how long is left, down to the second, with the count updating live." widget="howlong" path="/how-long-until" related={[{ slug: "days-until", name: "Days Until" }, { slug: "time-calculator", name: "Time Calculator" }, { slug: "date-calculator", name: "Date Calculator" }]} />;
}
