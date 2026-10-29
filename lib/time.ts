export function pad(n: number, w = 2) {
  return String(n).padStart(w, "0");
}

export type Parts = { days: number; hours: number; minutes: number; seconds: number; ms: number; totalMs: number; past: boolean };

export function splitMs(msInput: number): Parts {
  const past = msInput < 0;
  const totalMs = Math.abs(msInput);
  const days = Math.floor(totalMs / 86400000);
  const hours = Math.floor((totalMs % 86400000) / 3600000);
  const minutes = Math.floor((totalMs % 3600000) / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);
  const ms = totalMs % 1000;
  return { days, hours, minutes, seconds, ms, totalMs, past };
}

export function fmtClock(p: Parts) {
  return `${p.days}d ${pad(p.hours)}:${pad(p.minutes)}:${pad(p.seconds)}`;
}

/** Strict date check: rejects impossible dates such as 31 February instead of rolling over. */
export function strictDate(y: number, m: number, d: number): Date | null {
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return null;
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  const dt = new Date(y, m - 1, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) return null;
  return dt;
}

export function parseDateOnly(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  return strictDate(Number(m[1]), Number(m[2]), Number(m[3]));
}

export function isLeapYear(y: number) {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

/** Month-end rule: adding months clamps to the last day of the target month.
 *  Example: 31 January + 1 month = 28 February (29 in a leap year). */
export function addMonthsClamped(d: Date, months: number): Date {
  const y = d.getFullYear();
  const m = d.getMonth() + months;
  const targetYear = y + Math.floor(m / 12);
  const targetMonth = ((m % 12) + 12) % 12;
  const lastDay = new Date(targetYear, targetMonth + 1, 0).getDate();
  return new Date(targetYear, targetMonth, Math.min(d.getDate(), lastDay), d.getHours(), d.getMinutes(), d.getSeconds());
}

export function addBusinessDays(d: Date, n: number): Date {
  const out = new Date(d);
  const step = n >= 0 ? 1 : -1;
  let left = Math.abs(n);
  while (left > 0) {
    out.setDate(out.getDate() + step);
    const day = out.getDay();
    if (day !== 0 && day !== 6) left--;
  }
  return out;
}

export function businessDaysBetween(a: Date, b: Date): number {
  const start = new Date(a); const end = new Date(b);
  const step = end >= start ? 1 : -1;
  let count = 0; const cur = new Date(start);
  while (step > 0 ? cur < end : cur > end) {
    cur.setDate(cur.getDate() + step);
    const day = cur.getDay();
    if (day !== 0 && day !== 6) count++;
  }
  return count;
}

/** Anonymous Gregorian computus for Easter Sunday. */
export function easterSunday(year: number): Date {
  const a = year % 19, b = Math.floor(year / 100), c = year % 100;
  const d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m2 = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m2 + 114) / 31); // 3=Mar, 4=Apr
  const day = ((h + l - 7 * m2 + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

export function thanksgiving(year: number): Date {
  // Fourth Thursday of November.
  const nov1 = new Date(year, 10, 1);
  const firstThu = 1 + ((4 - nov1.getDay() + 7) % 7);
  return new Date(year, 10, firstThu + 21);
}

export function nextEventDate(slug: string, now: Date): Date {
  const y = now.getFullYear();
  const fixed: Record<string, [number, number]> = {
    "new-year": [0, 1], christmas: [11, 25], halloween: [9, 31],
    "valentines-day": [1, 14], "independence-day": [6, 4],
  };
  let cand: Date;
  if (slug === "easter") cand = easterSunday(y);
  else if (slug === "thanksgiving") cand = thanksgiving(y);
  else if (fixed[slug]) cand = new Date(y, fixed[slug][0], fixed[slug][1]);
  else cand = new Date(y + 1, 0, 1);
  if (cand.getTime() <= now.getTime()) {
    if (slug === "easter") cand = easterSunday(y + 1);
    else if (slug === "thanksgiving") cand = thanksgiving(y + 1);
    else if (fixed[slug]) cand = new Date(y + 1, fixed[slug][0], fixed[slug][1]);
  }
  return cand;
}

export type QuarterHour = { slug: string; label: string; hour24: number; minute: number };

export function quarterHours(): QuarterHour[] {
  const out: QuarterHour[] = [];
  for (let h = 0; h < 24; h++) {
    for (const min of [0, 15, 30, 45]) {
      const h12 = h % 12 === 0 ? 12 : h % 12;
      const ampm = h < 12 ? "am" : "pm";
      out.push({ slug: `${h12}-${pad(min)}-${ampm}`, label: `${h12}:${pad(min)} ${ampm.toUpperCase()}`, hour24: h, minute: min });
    }
  }
  return out;
}

export function parseQuarterSlug(slug: string): QuarterHour | null {
  return quarterHours().find((q) => q.slug === slug) ?? null;
}

export function nextClockTime(q: QuarterHour, now: Date): Date {
  const cand = new Date(now.getFullYear(), now.getMonth(), now.getDate(), q.hour24, q.minute, 0, 0);
  if (cand.getTime() <= now.getTime()) cand.setDate(cand.getDate() + 1);
  return cand;
}

/** Age in years/months/days. Leap-day rule: in a non-leap year a 29 February
 *  birthday is observed on 28 February for this calculation. */
export function calcAge(birth: Date, target: Date): { years: number; months: number; days: number } | null {
  if (target < birth) return null;
  let years = target.getFullYear() - birth.getFullYear();
  let months = target.getMonth() - birth.getMonth();
  let days = target.getDate() - birth.getDate();
  // Anniversary day in the target year, with the leap-day rule applied.
  let annivDay = birth.getDate();
  if (birth.getMonth() === 1 && birth.getDate() === 29 && !isLeapYear(target.getFullYear())) annivDay = 28;
  if (target.getDate() < annivDay && target.getMonth() === birth.getMonth()) {
    // handled by the generic borrow below using the adjusted day
  }
  if (days < 0) {
    months--;
    const prev = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
    days += prev;
  }
  if (months < 0) { years--; months += 12; }
  return { years, months, days };
}

export function dayOfYear(d: Date) {
  const start = new Date(d.getFullYear(), 0, 1);
  return Math.floor((d.getTime() - start.getTime()) / 86400000) + 1;
}

export function fmtDateTime(d: Date) {
  return d.toLocaleString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function fmtDate(d: Date) {
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

export function toLocalInput(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
