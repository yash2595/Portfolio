"use client";
import { useEffect, useRef, useState } from "react";
import { PROJECTS, JOURNEY, JOURNEY_SPAN, JOURNEY_NOW, type Project } from "@/lib/data";

const Browser = ({ url, children }: { url: string; children: React.ReactNode }) => (
  <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#0a0f1d] shadow-[0_30px_80px_rgba(0,0,0,.5)]">
    <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
      <i className="h-2.5 w-2.5 rounded-full bg-red-400" /><i className="h-2.5 w-2.5 rounded-full bg-yellow-400" /><i className="h-2.5 w-2.5 rounded-full bg-green-400" />
      <span className="ml-3 flex-1 truncate rounded-md bg-black/30 px-3 py-1 font-mono text-[11px] text-white/50">{url}</span>
    </div>
    <div className="h-[290px] p-5">{children}</div>
  </div>
);

function Exam() {
  const [t, setT] = useState(3588);
  const [q, setQ] = useState(36);
  useEffect(() => { const i = setInterval(() => { setT((v) => (v > 0 ? v - 1 : 3588)); }, 1000); return () => clearInterval(i); }, []);
  useEffect(() => { const i = setInterval(() => setQ((v) => (v >= 99 ? 36 : v + 1)), 2200); return () => clearInterval(i); }, []);
  const mm = String(Math.floor(t / 60)).padStart(2, "0"), ss = String(t % 60).padStart(2, "0");
  return (
    <Browser url="mylatindia.com/test">
      <div className="flex items-center justify-between text-xs text-white/70"><span>Question {q + 1} / 100</span><span className="rounded-full bg-red-500/20 px-3 py-1 font-mono font-bold text-red-300">⏱ {mm}:{ss}</span></div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-brand transition-all duration-700" style={{ width: `${q + 1}%` }} /></div>
      <div className="mt-4 space-y-2"><div className="h-3 w-5/6 rounded bg-white/20" /><div className="h-3 w-2/3 rounded bg-white/10" /></div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {["A", "B", "C", "D"].map((o, i) => (
          <div key={o} className={`rounded-lg border px-3 py-2 text-xs transition-all duration-500 ${q % 4 === i ? "border-sky-400 bg-sky-400/15 text-white" : "border-white/10 text-white/50"}`}>{o}. <span className="ml-1 inline-block h-2 w-14 rounded bg-white/20 align-middle" /></div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
        <div className="flex gap-1.5">{[1, 2, 3, 4, 5].map((l) => <span key={l} className={`rounded-md px-2 py-1 font-mono text-[10px] font-bold ${l === 3 ? "bg-green-400 text-black" : "bg-white/10 text-white/50"}`}>L{l}</span>)}</div>
        <span className="font-mono text-[10px] text-green-300">✓ autosaved · QR certificate</span>
      </div>
    </Browser>
  );
}

function Chat() {
  return (
    <Browser url="saarthi-mantrasetu.vercel.app">
      <div className="mb-3 flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-full bg-orange-500 text-xs font-extrabold">ॐ</span><span className="text-xs font-bold">Saarthi AI</span><i className="live-dot ml-1 h-2 w-2 rounded-full bg-green-400" /></div>
      <div className="relative h-[200px] text-xs">
        <div className="chat-u absolute right-0 top-0 max-w-[80%] rounded-2xl rounded-br-sm bg-orange-500 px-3 py-2">Which puja is good for a new home?</div>
        <div className="chat-t dot3 absolute left-0 top-14 flex gap-1 rounded-2xl rounded-bl-sm bg-white/10 px-4 py-3"><i className="h-1.5 w-1.5 rounded-full bg-white" /><i className="h-1.5 w-1.5 rounded-full bg-white" /><i className="h-1.5 w-1.5 rounded-full bg-white" /></div>
        <div className="chat-a absolute left-0 top-14 max-w-[85%] space-y-2 rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2">
          <p>Griha Pravesh puja is the usual choice. Here are the pujas and pandits I can connect you with:</p>
          <div className="flex gap-2"><span className="rounded-md bg-orange-500/25 px-2 py-1">Griha Pravesh</span><span className="rounded-md bg-orange-500/25 px-2 py-1">Book pandit →</span></div>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[11px] text-white/40">Ask Saarthi anything…<span className="blink ml-auto h-3 w-px bg-white" /></div>
    </Browser>
  );
}

function Chart() {
  return (
    <Browser url="dam-ai-guardian-sx3t.vercel.app">
      <div className="flex items-center justify-between text-xs"><span className="font-bold">Live monitoring</span><span className="blink rounded-full bg-amber-400/20 px-2 py-1 font-mono text-[10px] text-amber-300">⚠ ALERT RULE ACTIVE</span></div>
      <svg viewBox="0 0 300 110" className="mt-3 h-[130px] w-full">
        {[20, 55, 90].map((y) => <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="rgba(255,255,255,.08)" />)}
        <path className="draw" d="M0 85 C30 80 40 50 70 55 S120 90 150 60 S210 20 240 40 S280 30 300 18" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="300" cy="18" r="4" fill="#22d3ee" className="blink" />
      </svg>
      <div className="mt-2 grid grid-cols-3 gap-2 text-center">
        {[["Water level", "72%"], ["Flow", "Normal"], ["Sensors", "Online"]].map(([k, v]) => <div key={k} className="rounded-lg bg-white/5 py-2"><div className="font-mono text-sm font-bold text-cyan-300">{v}</div><div className="text-[10px] text-white/50">{k}</div></div>)}
      </div>
    </Browser>
  );
}

function Grid() {
  const cats = ["Books", "Tools", "Food", "Clothes", "Study"];
  const [a, setA] = useState(0);
  useEffect(() => { const i = setInterval(() => setA((v) => (v + 1) % cats.length), 1600); return () => clearInterval(i); }, [cats.length]);
  return (
    <Browser url="raah-setu">
      <div className="flex flex-wrap gap-2">{cats.map((c, i) => <span key={c} className={`rounded-full px-3 py-1 text-[11px] font-bold transition-all duration-500 ${a === i ? "scale-110 bg-violet-500 text-white" : "bg-white/10 text-white/60"}`}>{c}</span>)}</div>
      <div key={a} className="mt-4 grid grid-cols-2 gap-2.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rise rounded-xl border border-white/10 bg-white/5 p-3" style={{ animationDelay: `${i * 90}ms` }}>
            <div className="mb-2 h-9 rounded-lg bg-gradient-to-br from-violet-500/40 to-sky-500/30" />
            <div className="h-2.5 w-4/5 rounded bg-white/25" /><div className="mt-1.5 h-2 w-1/2 rounded bg-white/10" />
          </div>
        ))}
      </div>
    </Browser>
  );
}

const VIS = { exam: Exam, chat: Chat, chart: Chart, grid: Grid };

/** Real site screenshot inside a browser frame. Pans down on hover to show the whole page. Falls back via onFail. */
function Shot({ src, url, alt, onFail }: { src: string; url: string; alt: string; onFail: () => void }) {
  const img = useRef<HTMLImageElement>(null);
  const [off, setOff] = useState(0);
  const bad = (el: HTMLImageElement | null) => !el || !el.complete || el.naturalWidth < 300;
  const measure = () => {
    if (bad(img.current)) { onFail(); return; }
    const h = img.current?.getBoundingClientRect().height ?? 0; setOff(Math.max(0, h - 290));
  };
  useEffect(() => {
    // errors can fire before hydration, so re-check on mount and give up after 8s
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) { onFail(); return; }
    const t = setTimeout(() => { if (bad(img.current)) onFail(); }, 8000);
    window.addEventListener("resize", measure);
    return () => { clearTimeout(t); window.removeEventListener("resize", measure); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);
  return (
    <div className="group" data-hot>
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#0a0f1d] shadow-[0_30px_80px_rgba(0,0,0,.5)]">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
          <i className="h-2.5 w-2.5 rounded-full bg-red-400" /><i className="h-2.5 w-2.5 rounded-full bg-yellow-400" /><i className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-3 flex-1 truncate rounded-md bg-black/30 px-3 py-1 font-mono text-[11px] text-white/50">{url}</span>
        </div>
        <div className="relative h-[290px] overflow-hidden bg-[#0a0f1d]">
          <img ref={img} src={src} alt={alt} loading="lazy" onLoad={measure} onError={onFail} className="block w-full min-h-[290px] object-cover object-top transition-transform duration-[3500ms] ease-in-out group-hover:[transform:translateY(calc(var(--off)*-1px))]" style={{ "--off": off } as React.CSSProperties} />
        </div>
      </div>
    </div>
  );
}

function Visual({ p }: { p: Project }) {
  const [live, setLive] = useState(true);
  const [local, setLocal] = useState(true);
  const host = p.live ? p.live.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";
  if (p.shot && local) return <><Shot src={p.shot} url={host || p.title} alt={`${p.title} screenshot`} onFail={() => setLocal(false)} /><p className="mt-2 text-center font-mono text-[10px] text-white/35">Hover to scroll through the page</p></>;
  if (p.live && live) return <><Shot src={`https://image.thum.io/get/width/1280/noanimate/${p.live}`} url={host} alt={`${p.title} live preview`} onFail={() => setLive(false)} /><p className="mt-2 text-center font-mono text-[10px] text-white/35">Live preview of {host}</p></>;
  const V = VIS[p.kind];
  return <><V /><p className="mt-2 text-center font-mono text-[10px] text-white/35">Animated illustration of the product UI</p></>;
}


function Panel({ p, i, n }: { p: Project; i: number; n: number }) {
  return (
    <div className="panel lg:sticky" style={{ top: `${96 + i * 18}px` }}>
      <div className="panel-in grid gap-8 rounded-[2rem] border border-white/10 p-6 shadow-2xl md:p-10 lg:grid-cols-[1fr_1.05fr] lg:items-center" style={{ background: `linear-gradient(135deg,hsl(${p.hue} 60% 9%),hsl(${p.hue} 55% 15%))` }}>
        <div className="space-y-5">
          <div className="flex items-center gap-3 font-mono text-xs text-white/60"><span className="text-3xl font-extrabold text-white/20">{String(i + 1).padStart(2, "0")}<span className="text-base">/{String(n).padStart(2, "0")}</span></span><span className="rounded-full border border-white/20 px-3 py-1">{p.tag}</span></div>
          <h3 className="text-3xl font-extrabold md:text-4xl">{p.title}</h3>
          <div><p className="mb-1 font-mono text-[11px] font-bold uppercase tracking-widest text-sky-300">What it is</p><p className="leading-relaxed text-white/75">{p.what}</p></div>
          <div><p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-widest text-sky-300">Key features</p>
            <ul className="space-y-2 text-sm text-white/80">{p.points.map((x) => <li key={x} className="flex gap-2"><span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-sky-400/20 text-[10px] text-sky-300">✓</span>{x}</li>)}</ul></div>
          <div><p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-widest text-sky-300">Built with</p>
            <div className="flex flex-wrap gap-2">{p.stack.map((s) => <span key={s} className="rounded-md bg-white/10 px-2.5 py-1 font-mono text-[11px]">{s}</span>)}</div></div>
          <div className="flex flex-wrap gap-3 pt-1">
            {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-ink transition hover:bg-brand hover:text-white">Visit live site ↗</a>}
            {p.code && <a href={p.code} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/25 px-6 py-3 text-sm font-bold transition hover:bg-white/10">View on GitHub ↗</a>}
          </div>
        </div>
        <div><Visual p={p} /></div>
      </div>
    </div>
  );
}

export function ProjectStack() {
  return <div className="space-y-10 lg:space-y-16">{PROJECTS.map((p, i) => <Panel key={p.title} p={p} i={i} n={PROJECTS.length} />)}</div>;
}

export function Journey() {
  const [a, setA] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hov, setHov] = useState(false);
  useEffect(() => {
    if (!auto || hov) return;
    const t = setInterval(() => setA((v) => (v + 1) % JOURNEY.length), 5500);
    return () => clearInterval(t);
  }, [auto, hov, a]);
  const pick = (i: number) => { setA(i); setAuto(false); };
  const j = JOURNEY[a];
  const pct = (m: number) => `${(m / JOURNEY_SPAN) * 100}%`;
  const ticks: [number, string][] = [[0, "Nov 2024"], [14, "Jan 2026"], [20, "Jul 2026"]];

  return (
    <div onPointerEnter={() => setHov(true)} onPointerLeave={() => setHov(false)}>
      {/* Gantt timeline */}
      <div className="rv rounded-3xl border border-ink/10 bg-white p-5 md:p-7">
        <div className="mb-4 flex items-center justify-between"><p className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink/40">Timeline · click a bar</p><p className="font-mono text-[11px] text-ink/40">Nov 2024 → today</p></div>
        <div className="relative">
          <div className="pointer-events-none absolute bottom-0 top-0 z-10 w-px bg-brand/60" style={{ left: `calc(7rem + (100% - 7rem) * ${JOURNEY_NOW / JOURNEY_SPAN})` }}><span className="absolute -top-5 -translate-x-1/2 rounded bg-brand px-1.5 py-0.5 font-mono text-[9px] font-bold text-white">TODAY</span></div>
          <div className="space-y-2 pt-5">
            {JOURNEY.map((x, i) => (
              <button key={x.org} onClick={() => pick(i)} className="flex w-full items-center text-left" aria-pressed={a === i}>
                <span className={`w-28 shrink-0 truncate pr-3 text-xs font-bold transition ${a === i ? "text-brand" : "text-ink/50"}`}>{x.org}</span>
                <span className="relative h-8 flex-1 rounded-full bg-ink/[0.05]">
                  <span className={`absolute top-0 flex h-8 items-center justify-end overflow-hidden rounded-full pr-2 transition-all duration-500 ${a === i ? "bg-gradient-to-r from-brand to-sky-400 shadow-[0_6px_20px_rgba(0,85,255,.4)]" : "bg-ink/20 hover:bg-ink/30"}`} style={{ left: pct(x.start), width: pct(x.end - x.start), minWidth: 22 }}>
                    {x.status === "ongoing" && <i className="live-dot h-2.5 w-2.5 rounded-full bg-green-400" />}
                  </span>
                </span>
              </button>
            ))}
          </div>
          <div className="relative ml-28 mt-3 h-4 border-t border-ink/10">
            {ticks.map(([m, l]) => <span key={l} className={`absolute top-1 font-mono text-[10px] text-ink/40 ${l === "Jul 2026" ? "hidden sm:block" : ""}`} style={{ left: pct(m) }}>{l}</span>)}
          </div>
        </div>
      </div>

      {/* Selector + detail */}
      <div className="rv mt-6 grid gap-6 lg:grid-cols-[300px_1fr]">
        <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
          {JOURNEY.map((x, i) => (
            <button key={x.org} onClick={() => pick(i)} className={`relative min-w-[220px] overflow-hidden rounded-2xl border p-4 text-left transition lg:min-w-0 ${a === i ? "border-brand bg-brand text-white shadow-[0_14px_40px_rgba(0,85,255,.3)]" : "border-ink/10 bg-white hover:border-brand/40"}`}>
              <div className="flex items-center justify-between"><span className={`font-mono text-xs font-bold ${a === i ? "text-white/70" : "text-brand"}`}>0{i + 1}</span>
                {x.status === "ongoing" ? <span className="flex items-center gap-1.5 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700"><i className="live-dot h-1.5 w-1.5 rounded-full bg-green-500" />Ongoing</span> : <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${a === i ? "bg-white/20" : "bg-ink/5 text-ink/50"}`}>Completed</span>}</div>
              <p className="mt-2 font-extrabold leading-tight">{x.org}</p>
              <p className={`text-xs ${a === i ? "text-white/75" : "text-ink/60"}`}>{x.role}</p>
              {a === i && auto && <span key={a} className="fillbar absolute bottom-0 left-0 h-1 bg-white/80" style={{ animationPlayState: hov ? "paused" : "running" }} />}
            </button>
          ))}
        </div>

        <article key={a} className="rise relative overflow-hidden rounded-3xl bg-deep p-7 text-white md:p-10">
          <div className="blob -right-10 -top-10 h-56 w-56 bg-brand" style={{ opacity: 0.35 }} />
          <span className="pointer-events-none absolute -bottom-10 right-4 text-[11rem] font-extrabold leading-none text-white/[0.05]">0{a + 1}</span>
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] font-bold">{j.when}</span>
              {j.status === "ongoing" ? <span className="flex items-center gap-1.5 rounded-full bg-green-400/15 px-3 py-1 text-[11px] font-bold text-green-300"><i className="live-dot h-1.5 w-1.5 rounded-full bg-green-400" />Currently working</span> : <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-white/60">Completed</span>}
            </div>
            <h3 className="mt-5 text-3xl font-extrabold md:text-5xl">{j.org}</h3>
            <p className="mt-2 text-lg font-bold text-sky-300">{j.role}{j.via ? <span className="font-normal text-white/50"> · via {j.via}</span> : null}</p>
            <p className="mb-3 mt-7 font-mono text-[11px] font-bold uppercase tracking-widest text-white/40">What I did</p>
            <ul className="space-y-3">{j.points.map((x, k) => <li key={x} className="rise flex gap-3 text-white/85" style={{ animationDelay: `${150 + k * 120}ms` }}><span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sky-400/20 text-[11px] text-sky-300">✓</span>{x}</li>)}</ul>
            <div className="mt-7 flex flex-wrap gap-2">{j.stack.map((s) => <span key={s} className="rounded-md bg-white/10 px-2.5 py-1 font-mono text-[11px]">{s}</span>)}</div>
          </div>
        </article>
      </div>
    </div>
  );
}
