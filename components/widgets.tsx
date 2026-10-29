"use client";
import { useEffect, useRef, useState } from "react";
import { splitMs, fmtDate, fmtDateTime, pad, parseDateOnly, strictDate, addMonthsClamped, addBusinessDays, businessDaysBetween, calcAge, dayOfYear, isLeapYear, toLocalInput, nextEventDate, nextClockTime, type QuarterHour } from "@/lib/time";

function useNow(intervalMs = 250) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

export function Digits({ ms, showMs = false }: { ms: number; showMs?: boolean }) {
  const p = splitMs(ms);
  return (
    <div className="digits" role="timer" aria-live="off">
      <div className="digit"><b>{p.days}</b><span>Days</span></div>
      <div className="digit"><b>{pad(p.hours)}</b><span>Hours</span></div>
      <div className="digit"><b>{pad(p.minutes)}</b><span>Minutes</span></div>
      <div className="digit"><b>{pad(p.seconds)}</b><span>Seconds</span></div>
      {showMs && <div className="digit"><b>{pad(p.ms, 3)}</b><span>Milliseconds</span></div>}
    </div>
  );
}

/** Countdown to a fixed target timestamp. Pause stores the remaining time,
 *  resume rebuilds the end time from Date.now() + remaining, so a sleeping
 *  background tab corrects itself on return. */
export function CountdownTool({ initialTarget }: { initialTarget?: number }) {
  const [input, setInput] = useState("");
  const [target, setTarget] = useState<number | null>(null);
  const [pausedRemaining, setPausedRemaining] = useState<number | null>(null);
  const [share, setShare] = useState("");
  const now = useNow();
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("target");
    if (q) {
      const t = new Date(q).getTime();
      if (!Number.isNaN(t)) { setTarget(t); setInput(toLocalInput(new Date(t))); return; }
    }
    if (initialTarget) setTarget(initialTarget);
    setInput(toLocalInput(new Date(Date.now() + 3600000)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const remaining = target === null ? 0 : pausedRemaining !== null ? pausedRemaining : (now === null ? 0 : target - now);
  const start = () => {
    const t = new Date(input).getTime();
    if (Number.isNaN(t)) { setShare("Please choose a valid date and time."); return; }
    setTarget(t); setPausedRemaining(null); setShare("");
  };
  const pause = () => { if (target !== null && now !== null) setPausedRemaining(Math.max(0, target - now)); };
  const resume = () => { if (pausedRemaining !== null) { setTarget(Date.now() + pausedRemaining); setPausedRemaining(null); } };
  const copyLink = async () => {
    if (target === null) return;
    const url = `${window.location.origin}${window.location.pathname}?target=${encodeURIComponent(new Date(target).toISOString())}`;
    try { await navigator.clipboard.writeText(url); setShare("Link copied: " + url); }
    catch { setShare(url); }
  };
  return (
    <div className="toolbox">
      <div className="row">
        <div><label htmlFor="cd-target">Target date and time</label><input id="cd-target" type="datetime-local" value={input} onChange={(e) => setInput(e.target.value)} /></div>
      </div>
      <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={start}>Start countdown</button>
        <button className="secondary" onClick={pause}>Pause</button>
        <button className="secondary" onClick={resume}>Resume</button>
        <button className="secondary" onClick={() => { setTarget(null); setPausedRemaining(null); }}>Reset</button>
        <button className="secondary" onClick={copyLink}>Copy shareable link</button>
      </div>
      <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button className="secondary" onClick={() => { const t = Date.now() + 3600000; setTarget(t); setInput(toLocalInput(new Date(t))); setPausedRemaining(null); }}>+1 hour</button>
        <button className="secondary" onClick={() => { const d = new Date(); d.setDate(d.getDate() + 1); d.setHours(9, 0, 0, 0); setTarget(d.getTime()); setInput(toLocalInput(d)); setPausedRemaining(null); }}>Tomorrow 9:00 AM</button>
        <button className="secondary" onClick={() => { const d = new Date(new Date().getFullYear() + 1, 0, 1); setTarget(d.getTime()); setInput(toLocalInput(d)); setPausedRemaining(null); }}>Next New Year</button>
      </div>
      {target !== null && (<>
        <Digits ms={remaining} />
        <p className="result">{remaining <= 0 ? "Time is up." : pausedRemaining !== null ? "Paused." : `Counting down to ${fmtDateTime(new Date(target))}`}</p>
      </>)}
      {share && <p className="muted" style={{ wordBreak: "break-all" }}>{share}</p>}
      <p className="muted">Remaining time is computed from a stored timestamp on every tick, not by subtracting one each second.</p>
    </div>
  );
}

export function OnlineTimer() {
  const [h, setH] = useState(0); const [m, setM] = useState(5); const [s, setS] = useState(0);
  const [end, setEnd] = useState<number | null>(null);
  const [paused, setPaused] = useState<number | null>(null);
  const now = useNow();
  const remaining = end === null ? 0 : paused !== null ? paused : (now === null ? 0 : Math.max(0, end - now));
  const start = () => { const total = (h * 3600 + m * 60 + s) * 1000; if (total <= 0) return; setEnd(Date.now() + total); setPaused(null); };
  return (
    <div className="toolbox">
      <div className="row">
        <div><label htmlFor="t-h">Hours</label><input id="t-h" type="number" min={0} max={99} value={h} onChange={(e) => setH(Number(e.target.value))} /></div>
        <div><label htmlFor="t-m">Minutes</label><input id="t-m" type="number" min={0} max={59} value={m} onChange={(e) => setM(Number(e.target.value))} /></div>
        <div><label htmlFor="t-s">Seconds</label><input id="t-s" type="number" min={0} max={59} value={s} onChange={(e) => setS(Number(e.target.value))} /></div>
      </div>
      <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={start}>Start</button>
        <button className="secondary" onClick={() => { if (end !== null && now !== null) setPaused(Math.max(0, end - now)); }}>Pause</button>
        <button className="secondary" onClick={() => { if (paused !== null) { setEnd(Date.now() + paused); setPaused(null); } }}>Resume</button>
        <button className="secondary" onClick={() => { setEnd(null); setPaused(null); }}>Reset</button>
        <button className="secondary" onClick={() => { setH(0); setM(1); setS(0); }}>1 min</button>
        <button className="secondary" onClick={() => { setH(0); setM(5); setS(0); }}>5 min</button>
        <button className="secondary" onClick={() => { setH(0); setM(25); setS(0); }}>25 min</button>
      </div>
      {end !== null && (<><Digits ms={remaining} /><p className="result">{remaining <= 0 ? "Timer finished." : paused !== null ? "Paused." : "Running…"}</p></>)}
      <p className="muted">The timer tracks a stored end timestamp, so it stays honest if the tab sleeps.</p>
    </div>
  );
}

export function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const startRef = useRef<number>(0);
  const accRef = useRef(0);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed(accRef.current + (Date.now() - startRef.current)), 47);
    return () => clearInterval(id);
  }, [running]);
  const start = () => { startRef.current = Date.now(); setRunning(true); };
  const pause = () => { accRef.current = elapsed; setRunning(false); };
  const reset = () => { accRef.current = 0; setElapsed(0); setRunning(false); setLaps([]); };
  return (
    <div className="toolbox">
      <Digits ms={elapsed} showMs />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {!running ? <button onClick={start}>Start</button> : <button onClick={pause}>Pause</button>}
        <button className="secondary" onClick={() => setLaps((l) => [...l, elapsed])}>Lap</button>
        <button className="secondary" onClick={reset}>Reset</button>
      </div>
      {laps.length > 0 && (
        <table style={{ marginTop: 16 }}><thead><tr><th>Lap</th><th>Time</th></tr></thead>
          <tbody>{laps.map((l, i) => { const p = splitMs(l); return (<tr key={i}><td>{i + 1}</td><td>{p.days > 0 ? `${p.days}d ` : ""}{pad(p.hours)}:{pad(p.minutes)}:{pad(p.seconds)}.{pad(p.ms, 3)}</td></tr>); })}</tbody>
        </table>
      )}
      <p className="muted">Elapsed time is measured from timestamps, not by counting ticks.</p>
    </div>
  );
}

export function HowLongUntilTool() {
  const [input, setInput] = useState("");
  const [target, setTarget] = useState<number | null>(null);
  const now = useNow();
  useEffect(() => { const d = new Date(Date.now() + 86400000); setInput(toLocalInput(d)); setTarget(d.getTime()); }, []);
  return (
    <div className="toolbox">
      <div className="row"><div><label htmlFor="hlu">Date and time</label><input id="hlu" type="datetime-local" value={input} onChange={(e) => setInput(e.target.value)} /></div></div>
      <button style={{ marginTop: 12 }} onClick={() => { const t = new Date(input).getTime(); if (!Number.isNaN(t)) setTarget(t); }}>Calculate</button>
      {target !== null && now !== null && (<>
        <Digits ms={target - now} />
        <p className="result">{target > now ? `${fmtDateTime(new Date(target))} is ${Math.floor((target - now) / 86400000)} days away.` : "That moment has already passed."}</p>
      </>)}
    </div>
  );
}

export function DaysUntilTool() {
  const [date, setDate] = useState("");
  const now = useNow(1000);
  const target = date ? parseDateOnly(date) : null;
  const diffDays = target && now !== null ? Math.ceil((new Date(target.getFullYear(), target.getMonth(), target.getDate()).getTime() - new Date(new Date(now).getFullYear(), new Date(now).getMonth(), new Date(now).getDate()).getTime()) / 86400000) : null;
  return (
    <div className="toolbox">
      <div className="row"><div><label htmlFor="du">Target date</label><input id="du" type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div></div>
      {diffDays !== null && (
        <><p className="result">{diffDays < 0 ? `${Math.abs(diffDays)} days ago` : diffDays === 0 ? "Today" : `${diffDays} days to go`}</p>
        <p className="muted">That is about {(diffDays / 7).toFixed(1)} weeks, or {(diffDays / 30.44).toFixed(1)} average months. Day counting here is exclusive of today and inclusive of the target date.</p></>
      )}
      <p className="muted">Pick a date above — for example, a holiday, a deadline or a birthday.</p>
    </div>
  );
}

export function TimeCalculator() {
  const [rows, setRows] = useState([{ sign: 1, h: 1, m: 30, s: 0 }, { sign: 1, h: 0, m: 45, s: 0 }]);
  const totalSec = rows.reduce((acc, r) => acc + r.sign * (r.h * 3600 + r.m * 60 + r.s), 0);
  const abs = Math.abs(totalSec);
  const hh = Math.floor(abs / 3600), mm = Math.floor((abs % 3600) / 60), ss = abs % 60;
  return (
    <div className="toolbox">
      {rows.map((r, i) => (
        <div className="row" key={i} style={{ marginBottom: 8 }}>
          <div><label>Sign</label><select value={r.sign} onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, sign: Number(e.target.value) } : x))}><option value={1}>Add (+)</option><option value={-1}>Subtract (−)</option></select></div>
          <div><label>Hours</label><input type="number" min={0} value={r.h} onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, h: Number(e.target.value) } : x))} /></div>
          <div><label>Minutes</label><input type="number" min={0} max={59} value={r.m} onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, m: Number(e.target.value) } : x))} /></div>
          <div><label>Seconds</label><input type="number" min={0} max={59} value={r.s} onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, s: Number(e.target.value) } : x))} /></div>
          <div><button className="secondary" onClick={() => setRows(rows.filter((_, j) => j !== i))}>Remove</button></div>
        </div>
      ))}
      <button className="secondary" onClick={() => setRows([...rows, { sign: 1, h: 0, m: 0, s: 0 }])}>Add another duration</button>
      <p className="result">{totalSec < 0 ? "−" : ""}{hh}h {pad(mm)}m {pad(ss)}s</p>
      <p className="muted">Total in seconds: {totalSec.toLocaleString()} · in minutes: {(totalSec / 60).toFixed(2)} · in hours: {(totalSec / 3600).toFixed(2)}</p>
    </div>
  );
}

export function DateCalculator() {
  const [a, setA] = useState(""); const [b, setB] = useState("");
  const [base, setBase] = useState(""); const [amount, setAmount] = useState(30);
  const [unit, setUnit] = useState("days"); const [dir, setDir] = useState(1);
  const da = a ? parseDateOnly(a) : null; const db = b ? parseDateOnly(b) : null;
  const diff = da && db ? Math.round((db.getTime() - da.getTime()) / 86400000) : null;
  const dBase = base ? parseDateOnly(base) : null;
  let added: Date | null = null; let note = "";
  if (dBase) {
    if (unit === "days") added = new Date(dBase.getTime() + dir * amount * 86400000);
    else if (unit === "weeks") added = new Date(dBase.getTime() + dir * amount * 7 * 86400000);
    else if (unit === "months") { added = addMonthsClamped(dBase, dir * amount); note = "Month-end rule: the result clamps to the last day of the target month (31 January + 1 month = 28 February, or 29 in a leap year)."; }
    else if (unit === "years") { added = addMonthsClamped(dBase, dir * amount * 12); note = "Leap rule: 29 February + 1 year lands on 28 February in a non-leap year, by the same clamping rule."; }
    else if (unit === "business") { added = addBusinessDays(dBase, dir * amount); note = "Business days skip Saturdays and Sundays. Public holidays are not skipped, because they vary by country."; }
  }
  return (
    <div className="toolbox">
      <h3>Difference between two dates</h3>
      <div className="row">
        <div><label htmlFor="dc-a">Start date</label><input id="dc-a" type="date" value={a} onChange={(e) => setA(e.target.value)} /></div>
        <div><label htmlFor="dc-b">End date</label><input id="dc-b" type="date" value={b} onChange={(e) => setB(e.target.value)} /></div>
      </div>
      {diff !== null && (<>
        <p className="result">{Math.abs(diff)} days {diff < 0 ? "earlier" : diff === 0 ? "— same date" : "later"}</p>
        <p className="muted">{(Math.abs(diff) / 7).toFixed(1)} weeks · about {(Math.abs(diff) / 30.44).toFixed(1)} months · about {(Math.abs(diff) / 365.25).toFixed(2)} years{da && db ? ` · business days (Mon–Fri) between: ${businessDaysBetween(da, db)}` : ""}</p>
      </>)}
      <h3 style={{ marginTop: 24 }}>Add to a date</h3>
      <div className="row">
        <div><label htmlFor="dc-base">Start date</label><input id="dc-base" type="date" value={base} onChange={(e) => setBase(e.target.value)} /></div>
        <div><label htmlFor="dc-amt">Amount</label><input id="dc-amt" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></div>
        <div><label htmlFor="dc-unit">Unit</label><select id="dc-unit" value={unit} onChange={(e) => setUnit(e.target.value)}><option value="days">Days</option><option value="weeks">Weeks</option><option value="months">Months</option><option value="years">Years</option><option value="business">Business days</option></select></div>
        <div><label htmlFor="dc-dir">Direction</label><select id="dc-dir" value={dir} onChange={(e) => setDir(Number(e.target.value))}><option value={1}>Add (+)</option><option value={-1}>Subtract (−)</option></select></div>
      </div>
      {added && (<><p className="result">{fmtDate(added)}</p>{note && <p className="muted">{note}</p>}</>)}
      <p className="muted">Invalid dates such as 31 February are rejected by the date picker and by the strict check behind this tool — they are never silently rolled over to March.</p>
    </div>
  );
}

export function AgeCalculator() {
  const [birth, setBirth] = useState(""); const [target, setTarget] = useState("");
  const b = birth ? parseDateOnly(birth) : null;
  const t = target ? parseDateOnly(target) : new Date();
  const age = b && t ? calcAge(b, t) : null;
  const nextBday = (() => {
    if (!b || !t) return null;
    let y = t.getFullYear();
    let cand = new Date(y, b.getMonth(), b.getDate());
    if (b.getMonth() === 1 && b.getDate() === 29 && !isLeapYear(y)) cand = new Date(y, 1, 28);
    if (cand < t) { y++; cand = new Date(y, b.getMonth(), b.getDate()); if (b.getMonth() === 1 && b.getDate() === 29 && !isLeapYear(y)) cand = new Date(y, 1, 28); }
    return cand;
  })();
  return (
    <div className="toolbox">
      <div className="row">
        <div><label htmlFor="age-b">Birth date</label><input id="age-b" type="date" value={birth} onChange={(e) => setBirth(e.target.value)} /></div>
        <div><label htmlFor="age-t">Target date (blank = today)</label><input id="age-t" type="date" value={target} onChange={(e) => setTarget(e.target.value)} /></div>
      </div>
      {b && !age && <p className="error">The target date is before the birth date.</p>}
      {age && (<>
        <p className="result">{age.years} years, {age.months} months, {age.days} days</p>
        <p className="muted">Total days lived: {Math.floor((t!.getTime() - b!.getTime()) / 86400000).toLocaleString()} · total weeks: {Math.floor((t!.getTime() - b!.getTime()) / 604800000).toLocaleString()}</p>
        {nextBday && <p className="muted">Next birthday: {fmtDate(nextBday)} ({Math.ceil((nextBday.getTime() - new Date(t!.getFullYear(), t!.getMonth(), t!.getDate()).getTime()) / 86400000)} days away).</p>}
      </>)}
      <p className="muted">Leap-day rule: a person born on 29 February is treated as having a birthday on 28 February in non-leap years for this calculation.</p>
    </div>
  );
}

const FALLBACK_ZONES = ["UTC", "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", "Europe/London", "Europe/Berlin", "Europe/Paris", "Africa/Cairo", "Asia/Dubai", "Asia/Karachi", "Asia/Kolkata", "Asia/Dhaka", "Asia/Bangkok", "Asia/Singapore", "Asia/Tokyo", "Australia/Sydney", "Pacific/Auckland"];

export function TimeZoneConverter() {
  const [zones, setZones] = useState<string[]>(FALLBACK_ZONES);
  const [input, setInput] = useState(""); const [from, setFrom] = useState("Europe/London"); const [to, setTo] = useState("Asia/Karachi");
  const [out, setOut] = useState("");
  useEffect(() => {
    try {
      const v = (Intl as unknown as { supportedValuesOf?: (k: string) => string[] }).supportedValuesOf?.("timeZone");
      if (v && v.length > 50) setZones(v);
    } catch { /* keep fallback list */ }
    setInput(toLocalInput(new Date()));
  }, []);
  const convert = () => {
    const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(input);
    if (!m) { setOut("Please enter a valid date and time."); return; }
    const wall = strictDate(Number(m[1]), Number(m[2]), Number(m[3]));
    if (!wall) { setOut("That date does not exist (for example, 31 February)."); return; }
    // Convert a wall time in `from` to an absolute instant by iterative correction.
    const guess = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]), Number(m[4]), Number(m[5])));
    const fmt = (tz: string, d: Date) => new Intl.DateTimeFormat("en-GB", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(d);
    const wallMs = (tz: string, d: Date) => { const p = Object.fromEntries(fmt(tz, d).map((x) => [x.type, x.value])); return Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day), Number(p.hour), Number(p.minute)); };
    let instant = guess;
    for (let i = 0; i < 3; i++) instant = new Date(instant.getTime() + (guess.getTime() - wallMs(from, instant)));
    const targetParts = fmt(to, instant);
    const tp = Object.fromEntries(targetParts.map((x) => [x.type, x.value]));
    setOut(`${tp.day}/${tp.month}/${tp.year} ${tp.hour}:${tp.minute} in ${to}`);
  };
  return (
    <div className="toolbox">
      <div className="row">
        <div><label htmlFor="tz-in">Date and time</label><input id="tz-in" type="datetime-local" value={input} onChange={(e) => setInput(e.target.value)} /></div>
        <div><label htmlFor="tz-from">From time zone</label><select id="tz-from" value={from} onChange={(e) => setFrom(e.target.value)}>{zones.map((z) => <option key={z} value={z}>{z}</option>)}</select></div>
        <div><label htmlFor="tz-to">To time zone</label><select id="tz-to" value={to} onChange={(e) => setTo(e.target.value)}>{zones.map((z) => <option key={z} value={z}>{z}</option>)}</select></div>
      </div>
      <button style={{ marginTop: 12 }} onClick={convert}>Convert</button>
      {out && <p className="result">{out}</p>}
      <p className="muted">Conversion uses IANA time zones through Intl, so daylight saving shifts are handled by the platform data — including gaps and repeated hours around DST changes.</p>
    </div>
  );
}

export function OffsetTool({ unit, direction }: { unit: "hours" | "minutes" | "days" | "weeks" | "months" | "years"; direction: "from" | "ago" }) {
  const [amount, setAmount] = useState(unit === "hours" ? 24 : unit === "minutes" ? 90 : 30);
  const [base, setBase] = useState("");
  const now = useNow(1000);
  const baseDate = base ? new Date(base) : now !== null ? new Date(now) : null;
  let result: Date | null = null;
  if (baseDate && !Number.isNaN(baseDate.getTime())) {
    const s = direction === "from" ? 1 : -1;
    if (unit === "hours") result = new Date(baseDate.getTime() + s * amount * 3600000);
    else if (unit === "minutes") result = new Date(baseDate.getTime() + s * amount * 60000);
    else if (unit === "days") result = new Date(baseDate.getTime() + s * amount * 86400000);
    else if (unit === "weeks") result = new Date(baseDate.getTime() + s * amount * 7 * 86400000);
    else if (unit === "months") result = addMonthsClamped(baseDate, s * amount);
    else result = addMonthsClamped(baseDate, s * amount * 12);
  }
  const unitLabel = unit.replace(/s$/, "") + (amount === 1 ? "" : "s");
  return (
    <div className="toolbox">
      <div className="row">
        <div><label htmlFor="off-amt">Number of {unit}</label><input id="off-amt" type="number" min={0} value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></div>
        <div><label htmlFor="off-base">Starting point (blank = now, live)</label><input id="off-base" type="datetime-local" value={base} onChange={(e) => setBase(e.target.value)} /></div>
      </div>
      {result && (<>
        <p className="result">{fmtDateTime(result)}</p>
        <p className="muted">{amount} {unitLabel} {direction === "from" ? "from" : "before"} {base ? fmtDateTime(baseDate!) : "now"}.</p>
        {(unit === "months" || unit === "years") && <p className="muted">Month-end rule: the result clamps to the last day of the target month.</p>}
      </>)}
    </div>
  );
}

export function CalendarTool({ kind }: { kind: "day-of-year" | "days-left" | "weeks-left" }) {
  const [date, setDate] = useState("");
  const now = useNow(1000);
  const today = now !== null ? new Date(now) : null;
  const d = date ? parseDateOnly(date) : today;
  if (!d) return null;
  const doy = dayOfYear(d);
  const total = isLeapYear(d.getFullYear()) ? 366 : 365;
  const left = total - doy;
  return (
    <div className="toolbox">
      <div className="row"><div><label htmlFor="cal-d">Date (blank = today)</label><input id="cal-d" type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div></div>
      {kind === "day-of-year" && <><p className="result">{fmtDate(d)} is day {doy} of {total} in {d.getFullYear()}.</p><p className="muted">{left} days remain after it in the year.</p></>}
      {kind === "days-left" && <><p className="result">{left} days left in {d.getFullYear()}.</p><p className="muted">Today is day {doy} of {total}. Days left counts the days after today up to 31 December.</p></>}
      {kind === "weeks-left" && <><p className="result">{Math.ceil(left / 7)} weeks left in {d.getFullYear()} ({left} days).</p><p className="muted">Weeks left is rounded up, so a part-week counts as one week.</p></>}
    </div>
  );
}

export function SleepCalculator() {
  const [mode, setMode] = useState<"wake" | "bed">("wake");
  const [time, setTime] = useState("07:00");
  const cycles = [6, 5, 4];
  const fmtT = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const base = (() => { const [hh, mm] = time.split(":").map(Number); const d = new Date(); d.setHours(hh || 0, mm || 0, 0, 0); return d; })();
  const rows = cycles.map((c) => {
    const mins = c * 90 + 14; // 14 minutes average time to fall asleep
    const other = mode === "wake" ? new Date(base.getTime() - mins * 60000) : new Date(base.getTime() + mins * 60000);
    return { cycles: c, time: fmtT(other), hours: (c * 1.5).toFixed(1) };
  });
  return (
    <div className="toolbox">
      <div className="row">
        <div><label htmlFor="sl-mode">I want to…</label><select id="sl-mode" value={mode} onChange={(e) => setMode(e.target.value as "wake" | "bed")}><option value="wake">Wake up at a time — find bedtimes</option><option value="bed">Go to bed at a time — find wake times</option></select></div>
        <div><label htmlFor="sl-time">Time</label><input id="sl-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} /></div>
      </div>
      <table style={{ marginTop: 16 }}><thead><tr><th>Sleep cycles</th><th>Sleep time</th><th>{mode === "wake" ? "Go to bed at" : "Wake up at"}</th></tr></thead>
        <tbody>{rows.map((r) => <tr key={r.cycles}><td>{r.cycles} ({r.hours} hours)</td><td>{r.hours} hours</td><td><b>{r.time}</b></td></tr>)}</tbody>
      </table>
      <p className="muted">Estimates only. Each cycle is taken as 90 minutes, plus 14 minutes to fall asleep. Sleep needs vary by person; this is not medical advice.</p>
    </div>
  );
}

export function EventCountdown({ slug }: { slug: string }) {
  const now = useNow();
  if (now === null) return <div className="toolbox"><p className="muted">Loading countdown…</p></div>;
  const target = nextEventDate(slug, new Date(now));
  return (
    <div className="toolbox">
      <Digits ms={target.getTime() - now} />
      <p className="result">Next occurrence: {fmtDate(target)}</p>
      <p className="muted">This page always counts to the next occurrence — if this year&apos;s date has passed, it moves to next year automatically.</p>
    </div>
  );
}

export function ClockCountdown({ q }: { q: QuarterHour }) {
  const now = useNow();
  if (now === null) return <div className="toolbox"><p className="muted">Loading countdown…</p></div>;
  const target = nextClockTime(q, new Date(now));
  const sameDay = target.getDate() === new Date(now).getDate();
  return (
    <div className="toolbox">
      <Digits ms={target.getTime() - now} />
      <p className="result">Next {q.label} is {sameDay ? "today" : "tomorrow"} at {q.label} ({fmtDateTime(target)}).</p>
      <p className="muted">If that clock time has already passed today, this counts to tomorrow&apos;s occurrence.</p>
    </div>
  );
}

export function HeroCountdown() {
  const [preset, setPreset] = useState<"today" | "newyear" | "hour">("today");
  const now = useNow();
  if (now === null) return <p className="muted">Loading…</p>;
  const d = new Date(now);
  let target: Date;
  if (preset === "today") { target = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1, 0, 0, 0); }
  else if (preset === "newyear") { target = new Date(d.getFullYear() + 1, 0, 1); }
  else { target = new Date(now + 3600000); }
  return (
    <div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button className={preset === "today" ? "" : "secondary"} onClick={() => setPreset("today")}>End of today</button>
        <button className={preset === "newyear" ? "" : "secondary"} onClick={() => setPreset("newyear")}>New Year</button>
        <button className={preset === "hour" ? "" : "secondary"} onClick={() => setPreset("hour")}>One hour from now</button>
      </div>
      <Digits ms={target.getTime() - now} />
    </div>
  );
}
