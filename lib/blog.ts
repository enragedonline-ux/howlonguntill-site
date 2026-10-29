export type BlogPost = { slug: string; title: string; desc: string; date: string; sections: { h: string; ps: string[] }[] };

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "am-pm-midnight", title: "AM, PM and Midnight, Explained Plainly",
    desc: "Why 12 AM is midnight, why 12 PM is noon, and how to avoid the most common clock mix-up.",
    date: "2026-10-20",
    sections: [
      { h: "The 12-hour clock in one paragraph", ps: ["The 12-hour clock splits the day into two halves: AM, from midnight to just before noon, and PM, from noon to just before midnight. Each half runs from 12 to 11, which is where the confusion starts — the number 12 belongs to the start of a half, not the end of the previous one."] },
      { h: "Why 12 AM is midnight", ps: ["Midnight is the moment a new day begins, so it opens the AM half: 12:00 AM. Noon is the moment the day passes its middle, so it opens the PM half: 12:00 PM. A handy check is to ask what comes next — after 11:59 AM comes 12:00 PM (noon), and after 11:59 PM comes 12:00 AM (midnight).", "If a deadline says 12 AM Friday, it usually means the very start of Friday, not the end of it. When the stakes are high, write the date and the words midnight or noon next to the time, or use 24-hour time: 00:00 for midnight and 12:00 for noon."] },
      { h: "Practical tips", ps: ["Use 24-hour time in schedules, tickets and shared calendars. In ordinary writing, prefer 12 midnight and 12 noon over bare 12 AM and 12 PM. And when you set a countdown to a 12 o'clock time, double-check whether the tool treats it as the start of the day or the middle of it."] },
    ],
  },
  {
    slug: "dst-conversion", title: "Daylight Saving and Time Zone Conversion",
    desc: "Why the gap between two cities changes through the year, and how converters handle DST gaps and repeats.",
    date: "2026-10-21",
    sections: [
      { h: "Offsets are not fixed", ps: ["A time zone is not a single offset from UTC. Most zones change offset at least once a year for daylight saving, and some have changed their rules entirely over the decades. That is why the difference between, say, London and New York is five hours in winter and four hours in summer — the cities do not move, their offsets do."] },
      { h: "Gaps and repeated hours", ps: ["When clocks spring forward, an hour of local wall time simply does not exist — 2:30 AM may never occur on that date. When clocks fall back, an hour occurs twice. A careful converter does not pretend otherwise: it relies on the platform's IANA time zone data, which records every change, and it states the zone rather than guessing an offset. If you schedule across a DST change, confirm the meeting in both zones and in UTC."] },
      { h: "A safe habit", ps: ["For anything that must happen at an exact instant — a launch, a deadline, a live event — agree the time in UTC as well as in local time. UTC never observes daylight saving, so it removes the ambiguity entirely."] },
    ],
  },
  {
    slug: "leap-day-age", title: "Leap Days, Birthdays and Age",
    desc: "What happens to a 29 February birthday in an ordinary year, and how age arithmetic handles it.",
    date: "2026-10-22",
    sections: [
      { h: "Why leap days exist", ps: ["A calendar year of 365 days is slightly shorter than the time Earth takes to orbit the Sun, so an extra day is added roughly every four years to keep the seasons aligned. A year is a leap year if it is divisible by 4, except century years, which must also be divisible by 400 — that is why 2000 was a leap year and 1900 was not."] },
      { h: "The birthday question", ps: ["Someone born on 29 February has a real birthday only in leap years. In ordinary years different people celebrate on 28 February or 1 March, and different legal systems pick different rules. For calculation purposes, this site's age calculator observes the birthday on 28 February in non-leap years and says so on the page, rather than silently picking a rule."] },
      { h: "Age is not just years", ps: ["Age in years, months and days is worked out by borrowing: if the target day of the month is smaller than the birth day, a month is borrowed, and the borrowed month's length depends on the calendar. That is why the same number of days can be a different number of months depending on which months they span."] },
    ],
  },
  {
    slug: "month-end-overflow", title: "Month-End Overflow: Why January 31 Plus One Month Is Tricky",
    desc: "Adding months is not like adding days. Here is the clamping rule, and why it is the honest choice.",
    date: "2026-10-23",
    sections: [
      { h: "Months are uneven", ps: ["Days are uniform, but months are not: they run from 28 to 31 days. So adding one month to 31 January cannot land on 31 February, because that date does not exist. Something has to give, and every calculator must choose a rule."] },
      { h: "The clamping rule", ps: ["This site clamps to the last day of the target month: 31 January plus one month becomes 28 February (29 in a leap year), and 31 March plus one month becomes 30 April. The alternative — rolling over into the next month, so 31 January plus one month becomes 3 March — looks clever but surprises most people, because the result is no longer in the month they asked for."] },
      { h: "When it matters", ps: ["Month-end arithmetic matters for subscriptions, rent, loan dates and contract deadlines. If a contract says monthly from 31 January, check what it actually says about short months before assuming a date. For planning, the clamping rule is the one most people expect."] },
    ],
  },
  {
    slug: "inclusive-exclusive-days", title: "Counting Days: Inclusive or Exclusive?",
    desc: "Two honest answers to how many days until a date, and how to tell which one you are reading.",
    date: "2026-10-24",
    sections: [
      { h: "Two ways to count", ps: ["Suppose today is Monday and an event is on Wednesday. Counting only the full days in between gives two days. Counting both endpoints gives three days. Neither answer is wrong — they answer different questions — but mixing them up causes missed deadlines."] },
      { h: "What this site does", ps: ["The days-until tools here count exclusively of today and inclusively of the target date: the number is how many midnights pass before the target day begins, plus the target day itself in plain language. Each tool states its rule on the page, so the number can be checked rather than trusted blindly."] },
      { h: "A check you can do", ps: ["If an event is tomorrow, a days-until answer of 1 should feel right. If it says 0 or 2 for tomorrow, the tool is counting differently — read its note, or count the midnights yourself."] },
    ],
  },
  {
    slug: "background-tab-timers", title: "Why Timers Jump When a Tab Sleeps",
    desc: "Browsers slow down background tabs on purpose. Good timers do not count ticks — they subtract timestamps.",
    date: "2026-10-25",
    sections: [
      { h: "Browsers throttle background tabs", ps: ["To save battery, browsers slow JavaScript timers in tabs you are not looking at, sometimes to once a minute. A timer built by subtracting one every second will therefore fall behind: leave it for ten minutes and it may show ten minutes more than it should."] },
      { h: "The timestamp fix", ps: ["A reliable timer stores the target moment — an end timestamp — and on every visible tick computes target minus now. When you return to the tab, the display corrects itself in one jump, because the arithmetic never depended on how many ticks actually ran. The jump is not a bug; it is the correction."] },
      { h: "What to look for", ps: ["Pause and resume should work the same way: pausing stores the remaining time, and resuming rebuilds a new end timestamp from now plus that remainder. If a timer drifts after a tab sleeps, it is counting ticks. If it jumps once and is then correct, it is doing the honest thing."] },
    ],
  },
];
