"use client";
import { useRef } from "react";
import { STACK } from "@/lib/data";

const get = (k: string) => STACK.find(([c]) => c === k)?.[1] ?? [];

type Group = { title?: string; items: string[] };
type Block = { title: string; sub: string; hue: number; icon: string; groups: Group[]; span?: string };

const BLOCKS: Block[] = [
  { title: "Full Stack Development", sub: "From the interface a user touches to the API and database behind it.", hue: 212, icon: "</>", span: "lg:col-span-2", groups: [{ title: "Frontend", items: get("Frontend") }, { title: "Backend & databases", items: get("Backend & databases") }] },
  { title: "AI Engineering", sub: "LLM-powered features and conversational AI that understands intent.", hue: 272, icon: "AI", groups: [{ items: get("AI engineering") }] },
  { title: "Cloud & deploy", sub: "Shipping to AWS and Vercel.", hue: 28, icon: "☁", groups: [{ items: get("Cloud & deploy") }] },
  { title: "Languages & CS", sub: "Core languages and fundamentals.", hue: 340, icon: "{ }", groups: [{ items: get("Languages & CS") }] },
  { title: "Tooling", sub: "Testing and workflow tools.", hue: 170, icon: "⚙", groups: [{ items: get("Tooling") }] },
];

function Card({ b }: { b: Block }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div className={`rv ${b.span ?? ""}`}>
      <div ref={ref} onPointerMove={move} className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/25 md:p-8">
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `radial-gradient(380px circle at var(--mx,50%) var(--my,50%), hsl(${b.hue} 90% 60% / .22), transparent 60%)` }} />
        <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: `linear-gradient(90deg, hsl(${b.hue} 90% 60%), hsl(${b.hue + 50} 90% 65%), transparent)` }} />
        <div className="relative">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl font-mono text-sm font-extrabold text-white transition duration-300 group-hover:rotate-6 group-hover:scale-110" style={{ background: `linear-gradient(135deg, hsl(${b.hue} 85% 52%), hsl(${b.hue + 45} 85% 42%))`, boxShadow: `0 10px 30px hsl(${b.hue} 90% 50% / .45)` }}>{b.icon}</span>
            <div><h3 className="text-xl font-extrabold md:text-2xl">{b.title}</h3><p className="text-sm text-white/55">{b.sub}</p></div>
          </div>
          <div className={`mt-6 grid gap-6 ${b.groups.length > 1 ? "md:grid-cols-2" : ""}`}>
            {b.groups.map((g) => (
              <div key={g.title ?? b.title}>
                {g.title && <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-widest" style={{ color: `hsl(${b.hue} 90% 72%)` }}>{g.title}</p>}
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold transition duration-200 hover:-translate-y-0.5 hover:bg-white/15">
                      <i className="h-1.5 w-1.5 rounded-full" style={{ background: `hsl(${b.hue} 90% 65%)`, boxShadow: `0 0 8px hsl(${b.hue} 90% 60%)` }} />{s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TechStack() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {BLOCKS.slice(0, 2).map((b) => <Card key={b.title} b={b} />)}
      {BLOCKS.slice(2).map((b) => <Card key={b.title} b={b} />)}
    </div>
  );
}
