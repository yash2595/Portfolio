"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Intro curtain with counter. Removes itself when finished. */
export function Loader() {
  const [done, setDone] = useState(false);
  const num = useRef<HTMLSpanElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced()) { setDone(true); return; }
    const c = { v: 0 };
    const tl = gsap.timeline({ onComplete: () => setDone(true) });
    tl.to(c, { v: 100, duration: 1.1, ease: "power2.inOut", onUpdate: () => { if (num.current) num.current.textContent = String(Math.round(c.v)).padStart(2, "0"); } })
      .to(".ld-in", { yPercent: -120, opacity: 0, duration: 0.5, ease: "power3.in" })
      .to(wrap.current, { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, "-=0.1");
    return () => { tl.kill(); };
  }, []);
  if (done) return null;
  return (
    <div ref={wrap} className="fixed inset-0 z-[100] flex items-center justify-center bg-deep text-white">
      <div className="ld-in text-center">
        <div className="font-mono text-xs uppercase tracking-[0.4em] text-white/50">Yash Mishra</div>
        <div className="mt-3 text-7xl font-extrabold tabular-nums md:text-8xl"><span ref={num}>00</span><span className="text-brand">%</span></div>
      </div>
    </div>
  );
}

/** Thin gradient progress bar tied to page scroll. */
export function Progress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
    };
    on(); addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return <div ref={bar} className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-brand via-sky-400 to-violet-500" />;
}

/** Dot + lagging ring cursor, only on fine pointers. Grows over interactive elements. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (reduced() || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setOn(true);
    document.documentElement.classList.add("has-cursor");
    const p = { x: innerWidth / 2, y: innerHeight / 2, rx: innerWidth / 2, ry: innerHeight / 2 };
    const move = (e: PointerEvent) => {
      p.x = e.clientX; p.y = e.clientY;
      const t = e.target as HTMLElement | null;
      const hot = !!t?.closest("a,button,input,textarea,[data-hot]");
      ring.current?.classList.toggle("is-hot", hot);
    };
    const tick = () => {
      p.rx += (p.x - p.rx) * 0.16; p.ry += (p.y - p.ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${p.x}px,${p.y}px,0) translate(-50%,-50%)`;
      if (ring.current) ring.current.style.transform = `translate3d(${p.rx}px,${p.ry}px,0) translate(-50%,-50%)`;
    };
    addEventListener("pointermove", move, { passive: true });
    gsap.ticker.add(tick);
    return () => { removeEventListener("pointermove", move); gsap.ticker.remove(tick); document.documentElement.classList.remove("has-cursor"); };
  }, []);
  if (!on) return null;
  return (
    <>
      <div ref={ring} className="cursor-ring pointer-events-none fixed left-0 top-0 z-[90] h-9 w-9 rounded-full border border-brand/70 mix-blend-multiply transition-[width,height,background] duration-200" />
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 rounded-full bg-brand" />
    </>
  );
}

/** Wraps a child so it gently follows the pointer. */
export function Magnetic({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const b = ref.current!.getBoundingClientRect();
    gsap.to(ref.current, { x: (e.clientX - b.left - b.width / 2) * 0.3, y: (e.clientY - b.top - b.height / 2) * 0.4, duration: 0.3, ease: "power2.out" });
  };
  const leave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,.4)" });
  return <span ref={ref} onPointerMove={move} onPointerLeave={leave} className={`inline-block ${className}`}>{children}</span>;
}

const GLYPHS = "!<>-_\\/[]{}=+*^?#01";
/** Cycles through words with a scramble transition. */
export function Scramble({ words, className = "" }: { words: string[]; className?: string }) {
  const el = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = el.current!;
    if (reduced()) { node.textContent = words[0]; return; }
    let i = 0, raf = 0, timer: ReturnType<typeof setTimeout>, dead = false;
    const run = (to: string) => {
      const from = node.textContent || "";
      const len = Math.max(from.length, to.length);
      const q = Array.from({ length: len }, (_, k) => ({ f: from[k] || "", t: to[k] || "", s: Math.floor(Math.random() * 14), e: 14 + Math.floor(Math.random() * 18) }));
      let frame = 0;
      const step = () => {
        let out = "", n = 0;
        for (const c of q) {
          if (frame >= c.e) { n++; out += c.t; }
          else if (frame >= c.s) out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          else out += c.f;
        }
        node.textContent = out;
        if (n === len) { if (!dead) timer = setTimeout(() => { i = (i + 1) % words.length; run(words[i]); }, 2200); }
        else { frame++; raf = requestAnimationFrame(step); }
      };
      step();
    };
    node.textContent = "";
    run(words[0]);
    return () => { dead = true; cancelAnimationFrame(raf); clearTimeout(timer); };
  }, [words]);
  return <span ref={el} className={className} aria-label={words[0]} />;
}

/** Counts up to `to` when scrolled into view. */
export function CountUp({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current!;
    const fmt = (v: number) => v.toFixed(decimals) + suffix;
    if (reduced()) { node.textContent = fmt(to); return; }
    const o = { v: 0 };
    node.textContent = fmt(0);
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      gsap.to(o, { v: to, duration: 1.6, ease: "power2.out", onUpdate: () => { node.textContent = fmt(o.v); } });
    }, { threshold: 0.4 });
    io.observe(node);
    return () => io.disconnect();
  }, [to, suffix, decimals]);
  return <span ref={ref}>{to.toFixed(decimals) + suffix}</span>;
}

/** Infinite horizontal marquee (pure CSS). */
export function Marquee({ items }: { items: string[] }) {
  const row = (k: string) => (
    <div key={k} aria-hidden={k === "b"} className="marquee-row flex shrink-0 items-center gap-10 pr-10">
      {items.map((t) => <span key={k + t} className="flex items-center gap-10 whitespace-nowrap text-2xl font-extrabold uppercase tracking-tight md:text-4xl">{t}<i className="text-brand not-italic">✦</i></span>)}
    </div>
  );
  return <div className="marquee flex overflow-hidden">{row("a")}{row("b")}</div>;
}

/** Splits text into words that slide up when scrolled into view (animated by `.split` in the page). */
export function Words({ text, cls = "" }: { text: string; cls?: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className="split-w inline-block overflow-hidden align-bottom pb-[0.12em]">
          <span className={`wd inline-block ${cls}`}>{w}&nbsp;</span>
        </span>
      ))}
    </>
  );
}

/** Mouse-reactive particle network on a canvas. Pauses when off-screen. */
export function Particles({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!, ctx = cv.getContext("2d")!;
    if (reduced()) return;
    let w = 0, h = 0, raf = 0, vis = true;
    const m = { x: -999, y: -999 };
    const dpr = Math.min(devicePixelRatio || 1, 2);
    type Pt = { x: number; y: number; vx: number; vy: number };
    let pts: Pt[] = [];
    const size = () => {
      const b = cv.getBoundingClientRect(); w = b.width; h = b.height;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(70, Math.floor((w * h) / 16000));
      pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4 }));
    };
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!vis) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = m.x - p.x, dy = m.y - p.y, d = Math.hypot(dx, dy);
        if (d < 140) { p.x -= dx * 0.01; p.y -= dy * 0.01; }
        ctx.fillStyle = "rgba(120,170,255,.8)";
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, 6.283); ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < 120) { ctx.strokeStyle = `rgba(120,170,255,${0.22 * (1 - d / 120)})`; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); }
      }
    };
    const mv = (e: PointerEvent) => { const b = cv.getBoundingClientRect(); m.x = e.clientX - b.left; m.y = e.clientY - b.top; };
    const io = new IntersectionObserver(([en]) => { vis = en.isIntersecting; });
    io.observe(cv); size(); draw();
    addEventListener("resize", size); addEventListener("pointermove", mv, { passive: true });
    return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener("resize", size); removeEventListener("pointermove", mv); };
  }, []);
  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
