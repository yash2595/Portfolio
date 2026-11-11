"use client";
import { useEffect, useRef, useState } from "react";
import { P, NAV } from "@/lib/data";
import { Magnetic, Marquee, Particles, Words } from "@/components/fx";

const I = {
  mail: "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z",
  li: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  gh: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  tel: "M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z",
};
const Svg = ({ d, c = "h-5 w-5" }: { d: string; c?: string }) => <svg viewBox="0 0 24 24" className={`${c} fill-current`} aria-hidden="true"><path d={d} /></svg>;

const TOPICS = ["Job opportunity", "Project work", "Collaboration", "Just saying hi"];
const OPEN = ["Full Stack Developer roles", "AI Engineer roles", "Project collaborations"];

function Spot({ href, icon, label, value, hue, children }: { href: string; icon: string; label: string; value: string; hue: number; children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => { const r = ref.current!.getBoundingClientRect(); ref.current!.style.setProperty("--mx", `${e.clientX - r.left}px`); ref.current!.style.setProperty("--my", `${e.clientY - r.top}px`); };
  const ext = href.startsWith("http");
  return (
    <div ref={ref} onPointerMove={move} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/30">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `radial-gradient(260px circle at var(--mx,50%) var(--my,50%), hsl(${hue} 90% 60% / .25), transparent 60%)` }} />
      <div className="relative flex items-center">
        <a href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="flex min-w-0 flex-1 items-center gap-3 p-3.5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white transition duration-300 group-hover:rotate-6 group-hover:scale-110" style={{ background: `linear-gradient(135deg,hsl(${hue} 85% 52%),hsl(${hue + 40} 85% 42%))`, boxShadow: `0 8px 24px hsl(${hue} 90% 50% / .4)` }}><Svg d={icon} /></span>
          <span className="min-w-0 flex-1"><span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-white/45">{label}</span><span className="block truncate text-sm font-bold">{value}</span></span>
          <span className="text-xl text-white/40 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white">↗</span>
        </a>
        {children}
      </div>
    </div>
  );
}

function Form() {
  const ref = useRef<HTMLFormElement>(null);
  const [f, setF] = useState({ name: "", email: "", topic: TOPICS[0], msg: "" });
  const [done, setDone] = useState("");
  const build = () => {
    const subject = `[Portfolio] ${f.topic} — ${f.name}`;
    const body = `${f.msg}\n\n— ${f.name}\nReply to: ${f.email}`;
    return { subject, body };
  };
  const ok = () => ref.current?.reportValidity() ?? false;
  const gmail = () => {
    if (!ok()) return;
    const { subject, body } = build();
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(P.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_blank", "noopener,noreferrer");
    setDone("Gmail compose opened in a new tab. Just hit send.");
  };
  const app = () => {
    if (!ok()) return;
    const { subject, body } = build();
    window.location.href = `mailto:${P.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDone("Opening your mail app… if nothing opens, use the Gmail button.");
  };
  const inp = "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-sky-400 focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(56,189,248,.12)]";
  return (
    <form ref={ref} onSubmit={(e) => e.preventDefault()} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur md:p-8">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand via-sky-400 to-violet-500" />
      <h3 className="text-xl font-extrabold">Send me a message</h3>
      <p className="mb-5 mt-1 text-sm text-white/55">It lands straight in my inbox. No sign-ups.</p>
      <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-white/45">What is this about?</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {TOPICS.map((t) => <button type="button" key={t} onClick={() => setF({ ...f, topic: t })} aria-pressed={f.topic === t} className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition ${f.topic === t ? "border-transparent bg-brand text-white shadow-[0_6px_20px_rgba(0,85,255,.5)]" : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"}`}>{t}</button>)}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Your name" aria-label="Your name" className={inp} />
        <input required type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="Your email" aria-label="Your email" className={inp} />
      </div>
      <textarea required minLength={10} maxLength={1000} rows={5} value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} placeholder="Tell me about the role or project…" aria-label="Message" className={`${inp} mt-3 resize-none`} />
      <div className="mt-1 text-right font-mono text-[10px] text-white/35">{f.msg.length}/1000</div>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={gmail} className="flex-1 rounded-full bg-brand px-6 py-3.5 text-sm font-bold transition hover:bg-white hover:text-ink">Open in Gmail →</button>
        <button type="button" onClick={app} className="flex-1 rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold transition hover:bg-white/10">Use my mail app</button>
      </div>
      <p aria-live="polite" className={`mt-3 min-h-[1.25rem] text-center text-xs transition ${done ? "text-green-300" : "text-white/35"}`}>{done ? `✓ ${done}` : `Or write directly to ${P.email}`}</p>
    </form>
  );
}

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }));
    f(); const i = setInterval(f, 1000); return () => clearInterval(i);
  }, []);
  return <span className="font-mono tabular-nums">{t || "--:--:--"}</span>;
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(P.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { window.location.href = `mailto:${P.email}`; }
  };
  const tel = P.phone.replace(/[^+\d]/g, "");
  return (
    <footer id="sec-contact" className="relative overflow-hidden bg-deep text-white">
      <div className="absolute inset-0"><Particles /><div className="blob left-1/4 top-10 h-96 w-96 bg-brand" /><div className="blob bottom-20 right-0 h-80 w-80 bg-violet-600" style={{ animationDelay: "-6s" }} /></div>
      <div className="relative border-b border-white/10 py-5 text-white/10"><Marquee items={["Let's build something great", "Full Stack", "AI Engineer", "Open to opportunities"]} /></div>

      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="rv mb-4 inline-block rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest">09 / Contact</div>
            <h2 className="split text-[clamp(2.4rem,6.5vw,4.8rem)] font-extrabold leading-[1.02] tracking-tight"><Words text="Have something" /><br /><Words text="to" /><Words text="build?" cls="text-shine" /></h2>
            <p className="rv mt-5 max-w-md text-white/65">Hiring for a full stack or AI role, or have a product idea? Send a message. I read everything.</p>

            <div className="rv mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70">
              <span className="flex items-center gap-2"><i className="live-dot h-2 w-2 rounded-full bg-green-400" />Open to work</span>
              <span>India · IST <Clock /></span>
            </div>
            <ul className="rv mt-4 flex flex-wrap gap-2">{OPEN.map((o) => <li key={o} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold">{o}</li>)}</ul>

            <div className="rv mt-8 grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2"><Spot href={`mailto:${P.email}`} icon={I.mail} label="Email" value={P.email} hue={212}>
                <button onClick={copy} aria-label="Copy email" className="mr-3 shrink-0 rounded-lg border border-white/15 px-2.5 py-1.5 font-mono text-[10px] font-bold text-white/70 transition hover:bg-white hover:text-ink">{copied ? "✓ COPIED" : "COPY"}</button>
              </Spot></div>
              <Spot href={P.linkedin} icon={I.li} label="LinkedIn" value="Connect with me" hue={201} />
              <Spot href={P.github} icon={I.gh} label="GitHub" value="See my code" hue={272} />
              {tel && <Spot href={`tel:${tel}`} icon={I.tel} label="Call" value={P.phone} hue={152} />}
              {tel && <Spot href={`https://wa.me/${tel.replace("+", "")}`} icon={I.tel} label="WhatsApp" value="Message me" hue={142} />}
            </div>
          </div>
          <div className="rv lg:pt-14"><Form /></div>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-white/10 px-6 pb-8 pt-10">
        <div className="stroke-text pointer-events-none select-none text-center text-[clamp(3rem,13vw,11rem)] font-extrabold uppercase leading-none tracking-tight">Yash Mishra</div>
        <div className="mx-auto mt-8 flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} {P.name} · {P.roleA} &amp; {P.roleB}</p>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1">{NAV.map(([l, h]) => <li key={h}><a href={h} className="transition hover:text-white">{l}</a></li>)}</ul>
          <Magnetic><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="rounded-full border border-white/20 px-4 py-2 font-bold text-white transition hover:bg-white hover:text-ink">Back to top ↑</button></Magnetic>
        </div>
        <p className="mt-4 text-center font-mono text-[11px] text-white/30">Designed &amp; built by me with Next.js, GSAP and Tailwind CSS</p>
      </div>
    </footer>
  );
}
