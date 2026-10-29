import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("Months From Today | HowLongUntill", "Find the date a number of months from today, with the month-end rule stated.", "/months-from-today");

export default function Page() {
  return <ToolPage title="Months From Today" intro="Enter a number of months to see the resulting date. Short months clamp to their last day, as explained on the page." widget="off-months-from" path="/months-from-today" related={[{ slug: "years-from-today", name: "Years From Today" }, { slug: "days-ago", name: "Days Ago" }, { slug: "weeks-ago", name: "Weeks Ago" }]} />;
}
