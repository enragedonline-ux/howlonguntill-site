import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("Days Until | HowLongUntill", "Count the days, weeks and months left until a target date.", "/days-until");

export default function Page() {
  return <ToolPage title="Days Until" intro="Pick a target date to see how many days remain, plus the same span expressed in weeks and average months." widget="daysuntil" path="/days-until" related={[{ slug: "time-calculator", name: "Time Calculator" }, { slug: "date-calculator", name: "Date Calculator" }, { slug: "age-calculator", name: "Age Calculator" }]} />;
}
