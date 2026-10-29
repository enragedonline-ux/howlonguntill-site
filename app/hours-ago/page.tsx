import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("Hours Ago | HowLongUntill", "Find the exact date and time a number of hours ago.", "/hours-ago");

export default function Page() {
  return <ToolPage title="Hours Ago" intro="Enter a number of hours to see the date and time that far back from now, or from a starting point you choose." widget="off-hours-ago" path="/hours-ago" related={[{ slug: "minutes-from-now", name: "Minutes From Now" }, { slug: "days-from-today", name: "Days From Today" }, { slug: "weeks-from-today", name: "Weeks From Today" }]} />;
}
