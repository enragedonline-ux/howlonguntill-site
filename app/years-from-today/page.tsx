import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("Years From Today | HowLongUntill", "Find the date a number of years from today.", "/years-from-today");

export default function Page() {
  return <ToolPage title="Years From Today" intro="Enter a number of years to see the resulting date, live from now or from a starting point you choose." widget="off-years-from" path="/years-from-today" related={[{ slug: "days-ago", name: "Days Ago" }, { slug: "weeks-ago", name: "Weeks Ago" }, { slug: "day-of-the-year", name: "Day of the Year" }]} />;
}
