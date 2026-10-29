export const SITE_URL = "https://www.howlonguntill.site";
export const SITE_NAME = "HowLongUntill";

export type Tool = { slug: string; name: string; desc: string; group: string };

export const TOOLS: Tool[] = [
  { slug: "countdown-timer", name: "Countdown Timer", desc: "Count down to any date and time, with pause, presets and a shareable link.", group: "Countdown" },
  { slug: "timer", name: "Online Timer", desc: "Set hours, minutes and seconds and run a simple timer.", group: "Time" },
  { slug: "stopwatch", name: "Stopwatch", desc: "Start, pause and record laps with a millisecond display.", group: "Time" },
  { slug: "how-long-until", name: "How Long Until", desc: "See days, hours, minutes and seconds left until a date or clock time.", group: "Countdown" },
  { slug: "days-until", name: "Days Until", desc: "Count the days, weeks and months left until a target date.", group: "Countdown" },
  { slug: "time-calculator", name: "Time Calculator", desc: "Add or subtract hours, minutes and seconds across several durations.", group: "Time" },
  { slug: "date-calculator", name: "Date Calculator", desc: "Find the difference between dates, or add days, weeks, months, years or business days.", group: "Date" },
  { slug: "age-calculator", name: "Age Calculator", desc: "Work out years, months and days between a birth date and a target date.", group: "Date" },
  { slug: "time-zone-converter", name: "Time Zone Converter", desc: "Convert a date and time between IANA time zones, including daylight saving.", group: "Date" },
  { slug: "hours-from-now", name: "Hours From Now", desc: "Find the exact date and time a number of hours from now.", group: "Time" },
  { slug: "hours-ago", name: "Hours Ago", desc: "Find the exact date and time a number of hours ago.", group: "Time" },
  { slug: "minutes-from-now", name: "Minutes From Now", desc: "Find the exact date and time a number of minutes from now.", group: "Time" },
  { slug: "days-from-today", name: "Days From Today", desc: "Find the date a number of days from today.", group: "Date" },
  { slug: "weeks-from-today", name: "Weeks From Today", desc: "Find the date a number of weeks from today.", group: "Date" },
  { slug: "months-from-today", name: "Months From Today", desc: "Find the date a number of months from today, with the month-end rule stated.", group: "Date" },
  { slug: "years-from-today", name: "Years From Today", desc: "Find the date a number of years from today.", group: "Date" },
  { slug: "days-ago", name: "Days Ago", desc: "Find the date a number of days ago.", group: "Date" },
  { slug: "weeks-ago", name: "Weeks Ago", desc: "Find the date a number of weeks ago.", group: "Date" },
  { slug: "day-of-the-year", name: "Day of the Year", desc: "Find which day of the year a date falls on.", group: "Calendar" },
  { slug: "days-left-in-year", name: "Days Left in the Year", desc: "Count how many days remain in the current year.", group: "Calendar" },
  { slug: "weeks-left-in-year", name: "Weeks Left in the Year", desc: "Count how many weeks remain in the current year.", group: "Calendar" },
  { slug: "sleep-calculator", name: "Sleep Calculator", desc: "Estimate bedtimes and wake times from 90-minute sleep cycles.", group: "Calendar" },
];

export type EventDef = { slug: string; name: string; desc: string };

export const EVENTS: EventDef[] = [
  { slug: "new-year", name: "New Year", desc: "Countdown to 1 January." },
  { slug: "christmas", name: "Christmas", desc: "Countdown to 25 December." },
  { slug: "halloween", name: "Halloween", desc: "Countdown to 31 October." },
  { slug: "valentines-day", name: "Valentine's Day", desc: "Countdown to 14 February." },
  { slug: "thanksgiving", name: "Thanksgiving", desc: "Countdown to the fourth Thursday of November (US)." },
  { slug: "easter", name: "Easter", desc: "Countdown to Easter Sunday, worked out by computus." },
  { slug: "independence-day", name: "Independence Day", desc: "Countdown to 4 July." },
];

export function meta(title: string, description: string, path: string) {
  const canonical = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: SITE_NAME, type: "website" as const },
    twitter: { card: "summary" as const, title, description },
    robots: { index: true, follow: true },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${it.path}`,
    })),
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
