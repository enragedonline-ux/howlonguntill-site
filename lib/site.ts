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

export type EventPageDef = {
  slug: string; name: string; desc: string; key: string;
  mode: "fixed" | "weekday" | "midnight" | "birthday" | "exact";
  rule: string; paras: string[];
};

export const EVENT_PAGES: EventPageDef[] = [
  { slug: "how-long-until-new-year", name: "New Year", desc: "Live countdown to the next New Year.", key: "new-year", mode: "fixed",
    rule: "Counts to 1 January. If this year's New Year has passed, it moves to next year.",
    paras: ["New Year is the first day of the calendar year, and for many people it is also a moment for resolutions and fresh plans.", "This page counts, second by second, to the next 1 January. Once that date passes, the countdown rolls forward to the following year on its own.", "If you are planning a party or a midnight message, check the date the countdown shows — it is always the next occurrence, never a date in the past."] },
  { slug: "how-long-until-christmas", name: "Christmas", desc: "Live countdown to the next Christmas Day.", key: "christmas", mode: "fixed",
    rule: "Counts to 25 December. If this year's Christmas has passed, it moves to next year.",
    paras: ["Christmas Day falls on 25 December each year, and the run-up to it is often the busiest shopping and travel week of the year.", "This page counts to the next 25 December. When Christmas passes, the countdown moves to the next one without needing to be reset.", "Use it to pace gift buying, travel bookings or simply to watch the final days tick down."] },
  { slug: "how-long-until-my-birthday", name: "My Birthday", desc: "Pick your birthday and count to its next occurrence.", key: "birthday", mode: "birthday",
    rule: "Counts to the next occurrence of the month and day you pick. A 29 February birthday is observed on 28 February in non-leap years.",
    paras: ["A birthday is personal, so this page does not guess a date for you. Pick your own birthday and it will count to its next occurrence.", "The countdown repeats every year: once your birthday passes, it moves to the same month and day next year.", "Your date is never saved or published. It stays in your browser, and it only appears in a link if you choose to copy one."] },
  { slug: "how-long-until-weekend", name: "Weekend", desc: "Live countdown to the next Saturday.", key: "weekend", mode: "weekday",
    rule: "Counts to the next Saturday at 00:00. If today is Saturday and 00:00 has already passed, it counts to the following Saturday.",
    paras: ["The weekend starts at midnight on Saturday, so this page counts to the next Saturday at 00:00.", "If it is already Saturday and midnight has passed, you are in the weekend already — so the countdown moves to the following Saturday instead of showing a date in the past.", "It is a simple way to answer the Friday question: how long until the weekend actually begins."] },
  { slug: "how-long-until-friday", name: "Friday", desc: "Live countdown to the next Friday.", key: "friday", mode: "weekday",
    rule: "Counts to the next Friday at 00:00. If today is Friday and 00:00 has already passed, it counts to the following Friday.",
    paras: ["Friday is often treated as the end of the working week, and this page counts to the next Friday at midnight.", "If it is already Friday and midnight has passed, the countdown moves to the following Friday, so it never points backwards.", "Use it for weekly plans, deadlines or anything else that runs on a Friday rhythm."] },
  { slug: "how-long-until-midnight", name: "Midnight", desc: "Live countdown to tonight's midnight.", key: "midnight", mode: "midnight",
    rule: "Counts to tonight's midnight, that is, 00:00 at the start of tomorrow.",
    paras: ["Midnight is the boundary between one day and the next, and this page counts to the midnight that ends today.", "In other words, the target is always 00:00 at the start of tomorrow, never a midnight that has already passed.", "It is useful for daily deadlines, day-boundary habits and anything that resets at the end of the day."] },
  { slug: "how-long-until-wedding", name: "Wedding", desc: "Pick a wedding date and count down to it.", key: "wedding", mode: "exact",
    rule: "Counts to the start of the exact date you pick. If that date has passed, it does not roll forward to next year.",
    paras: ["A wedding date is a one-off date, so this page does not invent one. Pick the date and it will count down to it.", "Unlike a recurring holiday, a wedding countdown does not roll to next year once the date passes — it says plainly that the date is in the past.", "Your date is never saved or published. It stays in your browser, and it only appears in a link if you choose to copy one."] },
  { slug: "how-long-until-vacation", name: "Vacation", desc: "Pick a vacation date and count down to it.", key: "vacation", mode: "exact",
    rule: "Counts to the start of the exact date you pick. If that date has passed, it does not roll forward to next year.",
    paras: ["A vacation is a single trip, so this page counts to the exact date you pick, not to a repeating annual date.", "Pick your departure date and watch the days, hours and seconds fall. If the date has passed, the page says so instead of quietly moving to next year.", "Your date is never saved or published. It stays in your browser, and it only appears in a link if you choose to copy one."] },
  { slug: "how-long-until-thanksgiving", name: "Thanksgiving", desc: "Live countdown to the next Thanksgiving.", key: "thanksgiving", mode: "fixed",
    rule: "Counts to the fourth Thursday of November (US). If this year's Thanksgiving has passed, it moves to next year.",
    paras: ["In the United States, Thanksgiving falls on the fourth Thursday of November, so its calendar date moves from year to year.", "This page works out that Thursday for the current year and counts to it. Once it passes, it moves to the next year's fourth Thursday.", "Because the date shifts, a countdown is more useful than remembering a fixed day of the month."] },
  { slug: "how-long-until-independence-day", name: "Independence Day", desc: "Live countdown to the next Independence Day.", key: "independence-day", mode: "fixed",
    rule: "Counts to 4 July. If this year's Independence Day has passed, it moves to next year.",
    paras: ["Independence Day falls on 4 July each year, and it is usually marked with gatherings, fireworks and a day off.", "This page counts to the next 4 July. When it passes, the countdown rolls forward to the following year.", "If you are planning travel or an event around the holiday, the live count shows exactly how much time is left."] },
  { slug: "how-long-until-easter", name: "Easter", desc: "Live countdown to the next Easter Sunday.", key: "easter", mode: "fixed",
    rule: "Counts to Easter Sunday, worked out by computus. If this year's Easter has passed, it moves to next year.",
    paras: ["Easter Sunday is a movable feast: its date is worked out from the lunar calendar, so it can fall anywhere from late March to late April.", "This page uses the standard computus calculation to find Easter Sunday for the current year and counts to it.", "Once Easter passes, the countdown moves to next year's Easter Sunday automatically."] },
  { slug: "how-long-until-halloween", name: "Halloween", desc: "Live countdown to the next Halloween.", key: "halloween", mode: "fixed",
    rule: "Counts to 31 October. If this year's Halloween has passed, it moves to next year.",
    paras: ["Halloween falls on 31 October each year, and the countdown to it is a favourite for costume and party planning.", "This page counts to the next 31 October. When it passes, the countdown moves to the following year.", "It is also a handy check for how much preparation time is actually left, rather than guessing in weeks."] },
  { slug: "how-long-until-valentines-day", name: "Valentine's Day", desc: "Live countdown to the next Valentine's Day.", key: "valentines-day", mode: "fixed",
    rule: "Counts to 14 February. If this year's Valentine's Day has passed, it moves to next year.",
    paras: ["Valentine's Day falls on 14 February each year, and it is a common deadline for cards, gifts and reservations.", "This page counts to the next 14 February. Once it passes, the countdown rolls forward to the next one.", "If you are planning ahead, the live count shows the remaining days more honestly than a rough month count."] },
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
