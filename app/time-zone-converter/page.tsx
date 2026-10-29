import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("Time Zone Converter | HowLongUntill", "Convert a date and time between IANA time zones, including daylight saving.", "/time-zone-converter");

export default function Page() {
  return <ToolPage title="Time Zone Converter" intro="Enter a date and time, choose the zone it is in, and choose the zone to convert to. Daylight saving is handled by IANA data." widget="tz" path="/time-zone-converter" related={[{ slug: "hours-from-now", name: "Hours From Now" }, { slug: "hours-ago", name: "Hours Ago" }, { slug: "minutes-from-now", name: "Minutes From Now" }]} />;
}
