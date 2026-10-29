import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("Days Ago | HowLongUntill", "Find the date a number of days ago.", "/days-ago");

export default function Page() {
  return <ToolPage title="Days Ago" intro="Enter a number of days to see the date that far back, live from now or from a starting point you choose." widget="off-days-ago" path="/days-ago" related={[{ slug: "weeks-ago", name: "Weeks Ago" }, { slug: "day-of-the-year", name: "Day of the Year" }, { slug: "days-left-in-year", name: "Days Left in the Year" }]} />;
}
