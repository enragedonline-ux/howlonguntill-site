import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("Weeks From Today | HowLongUntill", "Find the date a number of weeks from today.", "/weeks-from-today");

export default function Page() {
  return <ToolPage title="Weeks From Today" intro="Enter a number of weeks to see the resulting date, live from now or from a starting point you choose." widget="off-weeks-from" path="/weeks-from-today" related={[{ slug: "months-from-today", name: "Months From Today" }, { slug: "years-from-today", name: "Years From Today" }, { slug: "days-ago", name: "Days Ago" }]} />;
}
