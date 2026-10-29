import type { Metadata } from "next";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("Privacy Policy | HowLongUntill", "HowLongUntill privacy policy: tools run in your browser, with no accounts and no personal data collection.", "/privacy");

export default function Page() {
  return (
    <main className="wrap">
      <section className="hero"><h1>Privacy Policy</h1></section>
      <section className="block">
        <p>HowLongUntill does not require an account, and the tools run in your browser. Inputs you enter into a calculator or timer are processed on your device and are not sent to a server by this site.</p>
        <p>Preferences, if stored at all, are kept in your browser's local storage on your own device. This site does not sell personal data, because it does not collect it in the first place.</p>
        <p>Standard server logs may record technical details such as the pages requested, as part of operating any website. If this policy changes, the updated version will be published on this page.</p>
        
      </section>
    </main>
  );
}
