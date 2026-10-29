import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("Age Calculator | HowLongUntill", "Work out years, months and days between a birth date and a target date.", "/age-calculator");

export default function Page() {
  return <ToolPage title="Age Calculator" intro="Enter a birth date and, optionally, a target date. The result gives years, months and days, plus total days lived." widget="agecalc" path="/age-calculator" related={[{ slug: "time-zone-converter", name: "Time Zone Converter" }, { slug: "hours-from-now", name: "Hours From Now" }, { slug: "hours-ago", name: "Hours Ago" }]} />;
}
