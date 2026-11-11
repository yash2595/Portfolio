"use client";
import { useState } from "react";
import { ACHIEVE, EDU, WHY, STEPS, FAQ } from "@/lib/data";
import { CountUp } from "@/components/fx";

export function Beyond() {
  return (
    <div>
      <div className="grid gap-5 md:grid-cols-3">
        {ACHIEVE.map((a) => (
          <div key={a.title} className="rv group relative overflow-hidden rounded-3xl border border-ink/10 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_20px_60px_rgba(0,85,255,.14)]">
            <span className="absolute -right-3 -top-3 text-7xl opacity-10 transition duration-500 group-hover:rotate-12 group-hover:scale-125 group-hover:opacity-25">{a.icon}</span>
            <div className="text-6xl font-extrabold text-brand"><CountUp to={a.n} suffix={a.suffix} decimals={a.dec} /></div>
            <h3 className="mt-3 text-lg font-extrabold">{a.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink/65">{a.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.3fr]">
        <div className="rv relative overflow-hidden rounded-3xl bg-deep p-7 text-white md:p-9">
          <div className="blob -right-10 -top-10 h-48 w-48 bg-brand" style={{ opacity: 0.35 }} />
          <div className="relative">
            <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-sky-300">Education</p>
            <h3 className="mt-3 text-2xl font-extrabold leading-tight">{EDU.degree}</h3>
            <p className="mt-1 text-white/65">{EDU.school}</p>
            <div className="mt-6 flex items-end gap-3"><span className="text-6xl font-extrabold text-shine">{EDU.cgpa}</span><span className="pb-2 font-mono text-xs text-white/50">CGPA</span></div>
            <div className="mt-6 flex flex-wrap gap-2">{EDU.subjects.map((s) => <span key={s} className="rounded-md bg-white/10 px-2.5 py-1 font-mono text-[11px]">{s}</span>)}</div>
          </div>
        </div>
        <div className="rv rounded-3xl border border-ink/10 bg-white p-7 md:p-9">
          <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand">Why work with me</p>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2">
            {WHY.map(([t, d], i) => (
              <li key={t} className="flex gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand/10 font-mono text-xs font-extrabold text-brand">0{i + 1}</span>
                <div><h4 className="font-extrabold leading-snug">{t}</h4><p className="mt-1 text-sm leading-relaxed text-ink/65">{d}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ProcessTrack() {
  return (
    <div className="proc-track flex flex-col gap-5 lg:w-max lg:flex-row lg:gap-6 lg:pr-[10vw]">
      {STEPS.map((s, i) => (
        <div key={s.t} className="proc-card relative flex w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur lg:min-h-[340px] lg:w-[460px]">
          <span className="pointer-events-none absolute -bottom-6 -right-2 text-[10rem] font-extrabold leading-none text-white/[0.05]">0{i + 1}</span>
          <span className="font-mono text-xs font-bold text-sky-300">STEP 0{i + 1} / 04</span>
          <h3 className="mt-4 text-4xl font-extrabold">{s.t}</h3>
          <p className="mt-4 max-w-sm leading-relaxed text-white/70">{s.d}</p>
          <div className="mt-auto flex flex-wrap gap-2 pt-8">{s.tags.map((t) => <span key={t} className="rounded-md bg-white/10 px-2.5 py-1 font-mono text-[11px]">{t}</span>)}</div>
        </div>
      ))}
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-3">
      {FAQ.map(([q, a], i) => {
        const on = open === i;
        return (
          <div key={q} className={`rv overflow-hidden rounded-2xl border bg-white transition duration-300 ${on ? "border-brand shadow-[0_14px_40px_rgba(0,85,255,.12)]" : "border-ink/10 hover:border-brand/40"}`}>
            <button onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
              <span className="font-extrabold md:text-lg">{q}</span>
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-lg transition duration-300 ${on ? "rotate-45 bg-brand text-white" : "bg-ink/5"}`}>+</span>
            </button>
            <div className={`grid transition-all duration-300 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}><div className="overflow-hidden"><p className="px-6 pb-5 leading-relaxed text-ink/70">{a}</p></div></div>
          </div>
        );
      })}
    </div>
  );
}
