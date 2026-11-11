"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { P, HERO, NAV, ROLES, SERVICES, FACTS } from "@/lib/data";
import { ProjectStack, Journey } from "@/components/work";
import { TechStack } from "@/components/stack";
import { Contact } from "@/components/contact";
import { Beyond, ProcessTrack, Faq } from "@/components/more";
import { Loader, Progress, Cursor, Magnetic, Scramble, CountUp, Marquee, Words, Particles } from "@/components/fx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MASK = "radial-gradient(circle var(--reveal-radius) at var(--reveal-x) var(--reveal-y), black 100%, transparent 100%)";
const FADE = "[mask-image:linear-gradient(to_bottom,#000_60%,transparent_92%)]";
const TECH = ["React", "Next.js", "Node.js", "Express", "MongoDB", "MySQL", "Python", "LLMs", "NLP", "AWS", "Vercel", "Playwright"];

const Pill = ({ children, dark }: { children: React.ReactNode; dark?: boolean }) => (
  <span className={`inline-block rounded-full border px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest ${dark ? "border-white/20 bg-white/5 text-white" : "border-ink/15 bg-white"}`}>{children}</span>
);

function Layer({ src, filter, style }: { src: string; filter: string; style?: React.CSSProperties }) {
  return (
    <div className="absolute inset-0" style={style}>
      <div className={`absolute right-0 top-0 h-full w-full md:w-[62%] ${FADE}`}>
        <img src={src} alt="" className="h-full w-full object-cover object-top" style={{ filter }} />
      </div>
    </div>
  );
}

export default function GlassHero() {
  const root = useRef<HTMLElement>(null);
  const hero = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  useEffect(() => {
    const el = hero.current!;
    const s = { x: el.clientWidth * 0.68, y: el.clientHeight * 0.35, tx: 0, ty: 0, r: 0, tr: 150 };
    s.tx = s.x; s.ty = s.y;
    const tick = () => {
      s.x += (s.tx - s.x) * 0.14; s.y += (s.ty - s.y) * 0.14; s.r += (s.tr - s.r) * 0.12;
      el.style.setProperty("--reveal-x", s.x + "px");
      el.style.setProperty("--reveal-y", s.y + "px");
      el.style.setProperty("--reveal-radius", Math.max(s.r, 0.5) + "px");
    };
    const to = (cx: number, cy: number) => { const b = el.getBoundingClientRect(); s.tx = cx - b.left; s.ty = cy - b.top; s.tr = 170; };
    const pm = (e: PointerEvent) => to(e.clientX, e.clientY);
    const tm = (e: TouchEvent) => to(e.touches[0].clientX, e.touches[0].clientY);
    const off = () => { s.tr = 0; };
    el.addEventListener("pointermove", pm, { passive: true });
    el.addEventListener("touchmove", tm, { passive: true });
    el.addEventListener("pointerleave", off);
    el.addEventListener("touchend", off);
    gsap.ticker.add(tick);
    const pulse = gsap.delayedCall(3.2, off);
    return () => {
      pulse.kill(); gsap.ticker.remove(tick);
      el.removeEventListener("pointermove", pm); el.removeEventListener("touchmove", tm);
      el.removeEventListener("pointerleave", off); el.removeEventListener("touchend", off);
    };
  }, []);

  useGSAP(() => {
    gsap.from(".hl", { yPercent: 110, duration: 1.1, ease: "power4.out", stagger: 0.12, delay: 1.9 });
    gsap.from(".hero-fade", { y: 24, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, delay: 2.3 });
    gsap.utils.toArray<HTMLElement>(".rv").forEach((el) =>
      gsap.from(el, { y: 60, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } })
    );
    gsap.to(".hero-blob", { yPercent: 25, ease: "none", scrollTrigger: { trigger: "#sec-hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.utils.toArray<HTMLElement>(".split").forEach((el) =>
      gsap.from(el.querySelectorAll(".wd"), { yPercent: 115, rotate: 4, duration: 0.9, ease: "power4.out", stagger: 0.07, scrollTrigger: { trigger: el, start: "top 85%", once: true } })
    );
    const panels = gsap.utils.toArray<HTMLElement>(".panel");
    if (matchMedia("(min-width:1024px)").matches) panels.forEach((pn, i) => {
      const next = panels[i + 1]; if (!next) return;
      gsap.to(pn.querySelector(".panel-in"), { scale: 0.92, opacity: 0.45, ease: "none", scrollTrigger: { trigger: next, start: "top 75%", end: "top 20%", scrub: true } });
    });
    const mm = gsap.matchMedia();
    mm.add("(min-width:1024px)", () => {
      const track = document.querySelector<HTMLElement>(".proc-track")!;
      const dist = () => Math.max(0, track.scrollWidth - innerWidth + 80);
      gsap.timeline({ scrollTrigger: { trigger: "#sec-process", pin: true, scrub: 0.6, start: "top top", end: () => "+=" + dist(), invalidateOnRefresh: true, anticipatePin: 1 } })
        .to(track, { x: () => -dist(), ease: "none" }, 0)
        .to(".proc-bar", { scaleX: 1, ease: "none" }, 0);
    });
    gsap.delayedCall(0.6, () => { ScrollTrigger.sort(); ScrollTrigger.refresh(); });
    const sk = { v: 0 }, setSkew = gsap.quickSetter(".marquee", "skewX", "deg");
    ScrollTrigger.create({ onUpdate: (self) => { const v = gsap.utils.clamp(-6, 6, self.getVelocity() / -250); if (Math.abs(v) > Math.abs(sk.v)) { sk.v = v; gsap.to(sk, { v: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => setSkew(sk.v) }); } setSkew(sk.v); } });
  }, { scope: root });

  const go = () => setOpen(false);

  return (
    <>
      <Loader /><Progress /><Cursor />
      <main ref={root}>
        <header className="fixed left-1/2 top-4 z-50 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/60 bg-white/60 p-2 shadow-[0_8px_30px_rgba(12,17,29,.08)] backdrop-blur-xl md:flex">
          <a href="#sec-hero" className="px-4 text-sm font-extrabold">YM</a>
          {NAV.map(([l, h]) => <a key={h} href={h} className="rounded-full px-4 py-2 text-sm font-medium transition hover:bg-ink hover:text-white">{l}</a>)}
        </header>
        <button aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)} className="fixed right-4 top-4 z-[55] flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full bg-white/80 shadow backdrop-blur md:hidden">
          <span className={`h-0.5 w-5 bg-ink transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-5 bg-ink transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-5 bg-ink transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-black/85 text-3xl font-extrabold text-white backdrop-blur-lg transition-opacity duration-300 md:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
          {NAV.map(([l, h]) => <a key={h} href={h} onClick={go}>{l}</a>)}
        </div>

        {/* Hero */}
        <section id="sec-hero" ref={hero} style={{ "--reveal-radius": "0px", "--reveal-x": "68%", "--reveal-y": "35%" } as React.CSSProperties} className="relative min-h-[100svh] overflow-hidden">
          <div className="hero-blob absolute inset-0">
            <div className="blob -left-24 top-10 h-80 w-80 bg-sky-300" />
            <div className="blob bottom-0 left-1/3 h-72 w-72 bg-violet-300" style={{ animationDelay: "-5s" }} />
          </div>
          <Layer src={HERO.base} filter={HERO.baseFilter} />
          <Layer src={HERO.reveal} filter={HERO.revealFilter} style={{ maskImage: MASK, WebkitMaskImage: MASK }} />
          <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-16 md:justify-center md:px-14 md:pb-0">
            <p className="hero-fade mb-5 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-brand"><i className="live-dot h-2 w-2 rounded-full bg-green-500" />Open to work · {P.roleA} &amp; {P.roleB}</p>
            <h1 className="text-[clamp(2.8rem,10vw,6.8rem)] font-extrabold leading-[0.95] tracking-tight">
              {["Building", "Beyond"].map((w) => <span key={w} className="block overflow-hidden pb-2"><span className="hl block">{w}</span></span>)}
              <span className="block overflow-hidden pb-2"><span className="hl text-shine block">Possible.</span></span>
            </h1>
            <p className="hero-fade mt-6 h-8 font-mono text-lg font-bold text-ink md:text-xl"><span className="text-brand">&gt; </span><Scramble words={ROLES} /></p>
            <p className="hero-fade mt-3 max-w-sm text-base text-ink/70">I'm Yash. I ship React, Node.js and MongoDB products with AI at the core. Move your cursor (or drag) over the portrait.</p>
            <div className="hero-fade mt-8 flex flex-wrap gap-3">
              <Magnetic><a href="#sec-showcase" className="block rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-brand">See my work</a></Magnetic>
              <Magnetic><a href="#sec-contact" className="block rounded-full border border-ink/20 bg-white/70 px-6 py-3 text-sm font-bold backdrop-blur">Get in touch</a></Magnetic>
              {P.resume && <Magnetic><a href={P.resume} download className="block rounded-full border border-ink/20 bg-white/70 px-6 py-3 text-sm font-bold backdrop-blur">Resume ↓</a></Magnetic>}
            </div>
          </div>
        </section>

        <div className="bg-ink py-5 text-white"><Marquee items={TECH} /></div>

        {/* About */}
        <section id="sec-identity" className="mx-auto grid max-w-6xl gap-12 px-6 py-28 md:grid-cols-2 md:items-center">
          <div className="rv relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-100 shadow-[0_20px_60px_rgba(12,17,29,.15)]">
            <img src={HERO.reveal} alt="Yash Mishra" className="h-full w-full origin-top scale-110 object-cover object-top" />
          </div>
          <div className="space-y-6">
            <div className="rv"><Pill>01 / About</Pill></div>
            <h2 className="rv text-4xl font-extrabold leading-tight md:text-5xl">Clean code on both sides of the <span className="text-shine">API</span>.</h2>
            <p className="rv leading-relaxed text-ink/70">I'm a B.Tech CSE student at IMS Engineering College, Ghaziabad, working as a full stack developer and AI engineer. I design RESTful APIs, integrate databases, and build LLM-powered products, shipping production-ready apps from frontend to backend.</p>
            <div className="rv grid grid-cols-2 gap-3">
              {FACTS.map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-ink/10 bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/40">{k}</div>
                  <div className="mt-1 font-extrabold leading-snug">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="sec-showcase" className="relative bg-deep py-28 text-white">
          <div className="absolute inset-0 overflow-hidden"><Particles /><div className="blob -right-20 top-20 h-96 w-96 bg-brand" /><div className="blob -left-20 bottom-10 h-80 w-80 bg-violet-600" style={{ animationDelay: "-6s" }} /></div>
          <div className="relative mx-auto max-w-6xl px-6">
            <div className="rv mb-4"><Pill dark>02 / Selected work</Pill></div>
            <h2 className="split mb-4 max-w-2xl text-4xl font-extrabold leading-tight md:text-5xl"><Words text="Products people can" /><Words text="actually use." cls="text-shine" /></h2>
            <p className="rv mb-14 max-w-xl text-white/60">Four projects. Two are live products you can open right now. Scroll and each one stacks on top of the last.</p>
            <ProjectStack />
          </div>
        </section>

        {/* Journey */}
        <section id="sec-journey" className="mx-auto max-w-5xl px-6 py-28">
          <div className="rv mb-4"><Pill>03 / Internships</Pill></div>
          <h2 className="split mb-4 text-4xl font-extrabold leading-tight md:text-5xl"><Words text="Four internships," /><Words text="one direction." cls="text-shine" /></h2>
          <p className="rv mb-12 max-w-xl text-ink/60">Pick any internship on the timeline to see what I did there. Newest first.</p>
          <Journey />
        </section>

        {/* Stack */}
        <section id="sec-skills" className="relative overflow-hidden bg-deep py-28 text-white">
          <div className="blob -left-24 top-10 h-96 w-96 bg-brand" style={{ opacity: 0.3 }} />
          <div className="relative mx-auto max-w-6xl px-6">
            <div className="rv mb-4"><Pill dark>04 / Tech stack</Pill></div>
            <h2 className="split mb-14 max-w-2xl text-4xl font-extrabold leading-tight md:text-5xl"><Words text="Everything I" /><Words text="build with." cls="text-shine" /></h2>
            <p className="rv -mt-8 mb-14 max-w-xl text-white/60">Two roles, one stack: full stack development on the web and AI engineering on top of it.</p>
            <TechStack />
          </div>
        </section>

        {/* Beyond */}
        <section id="sec-beyond" className="mx-auto max-w-6xl px-6 py-28">
          <div className="rv mb-4"><Pill>05 / Beyond the code</Pill></div>
          <h2 className="split mb-12 max-w-2xl text-4xl font-extrabold leading-tight md:text-5xl"><Words text="Proof, not" /><Words text="just promises." cls="text-shine" /></h2>
          <Beyond />
        </section>

        {/* Process */}
        <section id="sec-process" className="relative overflow-hidden bg-deep text-white lg:flex lg:min-h-screen lg:flex-col lg:justify-center">
          <div className="blob -right-20 top-10 h-96 w-96 bg-brand" style={{ opacity: 0.3 }} />
          <div className="relative px-6 py-24 lg:py-16 lg:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]">
            <div className="mb-4"><Pill dark>06 / How I work</Pill></div>
            <h2 className="mb-10 max-w-2xl text-4xl font-extrabold leading-tight md:text-5xl">From idea to <span className="text-shine">live product.</span></h2>
            <ProcessTrack />
            <div className="mt-10 hidden h-1 max-w-6xl overflow-hidden rounded-full bg-white/10 lg:block"><div className="proc-bar h-full origin-left scale-x-0 bg-gradient-to-r from-brand to-sky-400" /></div>
          </div>
        </section>

        {/* Services */}
        <section id="sec-services" className="mx-auto max-w-6xl px-6 py-24">
          <div className="rv mb-10"><Pill>07 / What I build</Pill></div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <div key={s.t} className="rv rounded-3xl border border-ink/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_20px_50px_rgba(0,85,255,.12)]">
                <h3 className="text-lg font-extrabold">{s.t}</h3>
                <ul className="mt-4 space-y-2 text-sm text-ink/70">{s.b.map((b) => <li key={b}>• {b}</li>)}</ul>
                <div className="mt-5 flex flex-wrap gap-2">{s.s.map((t) => <span key={t} className="rounded-md bg-brand/10 px-2 py-1 font-mono text-[11px] text-brand">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="sec-faq" className="mx-auto max-w-3xl px-6 py-24">
          <div className="rv mb-4"><Pill>08 / FAQ</Pill></div>
          <h2 className="split mb-10 text-4xl font-extrabold leading-tight md:text-5xl"><Words text="Quick" /><Words text="answers." cls="text-shine" /></h2>
          <Faq />
        </section>

        <Contact />
      </main>
    </>
  );
}
