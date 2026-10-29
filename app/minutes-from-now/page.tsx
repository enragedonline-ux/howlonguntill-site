import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("Minutes From Now | HowLongUntill", "Find the exact date and time a number of minutes from now.", "/minutes-from-now");

export default function Page() {
  return <ToolPage title="Minutes From Now" intro="Enter a number of minutes to see the resulting date and time, live from now or from a starting point you choose." widget="off-minutes-from" path="/minutes-from-now" related={[{ slug: "days-from-today", name: "Days From Today" }, { slug: "weeks-from-today", name: "Weeks From Today" }, { slug: "months-from-today", name: "Months From Today" }]} />;
}
