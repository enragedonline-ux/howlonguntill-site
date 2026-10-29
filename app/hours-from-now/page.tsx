import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("Hours From Now | HowLongUntill", "Find the exact date and time a number of hours from now.", "/hours-from-now");

export default function Page() {
  return <ToolPage title="Hours From Now" intro="Enter a number of hours to see the resulting date and time, live from now or from a starting point you choose." widget="off-hours-from" path="/hours-from-now" related={[{ slug: "hours-ago", name: "Hours Ago" }, { slug: "minutes-from-now", name: "Minutes From Now" }, { slug: "days-from-today", name: "Days From Today" }]} />;
}
