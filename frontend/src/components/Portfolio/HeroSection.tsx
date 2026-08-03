import React from "react";
import { ArrowUpRight, ShieldCheck, Cpu, Layers, GitBranch, Sparkles } from "lucide-react";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="hero-band relative flex justify-center overflow-hidden py-16 lg:py-24 px-4 lg:px-8 border-b border-[var(--hairline)] font-sans"
    >
      <div className="hero-mesh-bg pointer-events-none" />

      <div className="hero-container relative z-10 max-w-[1100px] w-full grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 items-center">

        {/* Left Column */}
        <div className="hero-content flex flex-col gap-5">

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-4xl bg-[var(--link)]/10 text-[var(--link)] border border-[var(--link)]/20 font-mono text-xs font-medium uppercase tracking-wider flex items-center gap-1.5">
              {/* <Sparkles size={13} />  */}
              SOFTWARE ENGINEER
            </span>
          </div>

          <h1 className="display-xl text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.14]">
            Building high-concurrency backend services & modern frontend systems.
          </h1>

          <p className="body-lg text-base lg:text-lg text-[var(--body)] font-normal leading-relaxed max-w-2xl">
            Experienced Software Engineer with a track record of architecting full-stack SaaS applications, WebRTC P2P networks, and Dockerized cloud deployments on AWS.
          </p>

          {/* Key Competencies Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 font-mono text-xs">
            <div className="p-2.5 rounded-xl bg-[var(--hairline-soft)] border border-[var(--hairline)] text-[var(--ink)] flex items-center gap-2">
              <Cpu size={15} className="text-[var(--link)] shrink-0" />
              <span className="truncate">Node / Express / FastApi</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[var(--hairline-soft)] border border-[var(--hairline)] text-[var(--ink)] flex items-center gap-2">
              <Layers size={15} className="text-[var(--link)] shrink-0" />
              <span className="truncate">React / TS</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[var(--hairline-soft)] border border-[var(--hairline)] text-[var(--ink)] flex items-center gap-2">
              <GitBranch size={15} className="text-[var(--link)] shrink-0" />
              <span className="truncate">Docker / AWS</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="cta-row flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => scrollTo("projects")}
              className="btn-primary btn-pill-primary cursor-pointer flex items-center gap-2 group"
            >
              <span>View Projects</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => scrollTo("experience")}
              className="btn-secondary btn-pill-secondary cursor-pointer"
            >
              View Work History
            </button>
          </div>
        </div>

        {/* Right Column: Layered Card with Impact Metrics */}
        <div className="flex flex-col items-center lg:items-end w-full order-first lg:order-last">

          <div className="relative w-full max-w-[360px] bg-[var(--canvas-elevated)] border border-[var(--hairline)] rounded-2xl p-5 shadow-xs flex flex-col gap-5">

            {/* Header Status */}
            <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-mono font-bold text-[var(--ink)]">ENGINEER PROFILE</span>
              </div>
              <span className="text-[11px] font-mono text-[var(--mute)]">PUNE, IN</span>
            </div>

            {/* Profile Photo */}
            <div className="relative w-full h-64 rounded-xl overflow-hidden border border-[var(--hairline)] bg-[var(--canvas)] group">
              <img
                src="aman.jpg"
                alt="Aman Mujawar"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-sm font-bold leading-none">Aman Mujawar</p>
                <p className="text-xs text-slate-300 mt-1">Full-Stack Software Engineer</p>
              </div>
            </div>

            {/* Metrics Impact Grid */}
            <div className="grid grid-cols-3 gap-2 text-center pt-1 font-mono">
              <div className="p-2 bg-[var(--hairline-soft)] border border-[var(--hairline)] rounded-xl">
                <p className="text-base font-bold text-[var(--ink)]">8+</p>
                <p className="text-[9px] text-[var(--mute)] uppercase tracking-wider mt-0.5">Apps Shipped</p>
              </div>
              <div className="p-2 bg-[var(--hairline-soft)] border border-[var(--hairline)] rounded-xl">
                <p className="text-base font-bold text-[var(--ink)]">70%</p>
                <p className="text-[9px] text-[var(--mute)] uppercase tracking-wider mt-0.5">Test Cover</p>
              </div>
              <div className="p-2 bg-[var(--hairline-soft)] border border-[var(--hairline)] rounded-xl">
                <p className="text-base font-bold text-[var(--ink)]">100%</p>
                <p className="text-[9px] text-[var(--mute)] uppercase tracking-wider mt-0.5">Data Isolation</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}