import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("Date Calculator | HowLongUntill", "Find the difference between dates, or add days, weeks, months, years or business days.", "/date-calculator");

export default function Page() {
  return <ToolPage title="Date Calculator" intro="Compare two dates, or start from one date and add a span. Month-end and leap rules are stated on the page." widget="datecalc" path="/date-calculator" related={[{ slug: "age-calculator", name: "Age Calculator" }, { slug: "time-zone-converter", name: "Time Zone Converter" }, { slug: "hours-from-now", name: "Hours From Now" }]} />;
}
