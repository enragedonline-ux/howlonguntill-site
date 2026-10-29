import type { Metadata } from "next";
import { meta } from "@/lib/site";

export const metadata: Metadata = meta("Contact Us | HowLongUntill", "Contact HowLongUntill by email. No form or account is needed.", "/contact-us");

export default function Page() {
  return (
    <main className="wrap">
      <section className="hero"><h1>Contact Us</h1></section>
      <section className="block">
        <p>You can reach us by email at hello@howlonguntill.site. There is no contact form on this site and no account system, so email is the only contact route.</p>
        <p>When reporting a problem with a tool, please include the tool name, the inputs you used, and the result you expected. That makes it possible to reproduce the issue quickly.</p>
        <p><a className="btn" href="mailto:hello@howlonguntill.site">Email hello@howlonguntill.site</a></p>
      </section>
    </main>
  );
}
