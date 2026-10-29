import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("Weeks Ago | HowLongUntill", "Find the date a number of weeks ago.", "/weeks-ago");

export default function Page() {
  return <ToolPage title="Weeks Ago" intro="Enter a number of weeks to see the date that far back, live from now or from a starting point you choose." widget="off-weeks-ago" path="/weeks-ago" related={[{ slug: "day-of-the-year", name: "Day of the Year" }, { slug: "days-left-in-year", name: "Days Left in the Year" }, { slug: "weeks-left-in-year", name: "Weeks Left in the Year" }]} />;
}
