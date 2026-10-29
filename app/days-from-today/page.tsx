import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("Days From Today | HowLongUntill", "Find the date a number of days from today.", "/days-from-today");

export default function Page() {
  return <ToolPage title="Days From Today" intro="Enter a number of days to see the resulting date, live from now or from a starting point you choose." widget="off-days-from" path="/days-from-today" related={[{ slug: "weeks-from-today", name: "Weeks From Today" }, { slug: "months-from-today", name: "Months From Today" }, { slug: "years-from-today", name: "Years From Today" }]} />;
}
