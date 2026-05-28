import React from "react";
import { NavLink } from "react-router";

function About() {
  const coreStats = [
    { label: "Total Books", value: "--+" },
    { label: "Active Members", value: "--+" },
    { label: "Digital Resource Hours", value: "--+" },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6 flex flex-col items-center">
      {/* Container Frame */}
      <div className="w-[98%] max-w-[1200px] border border-zinc-400 bg-white rounded-[60px] shadow-xl py-16 px-12 flex flex-col gap-12 mt-4">
        {/* Title Block */}
        <div className="text-center flex flex-col gap-3 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl text-slate-900 tracking-wide font-normal font-stylish">
            Our Library System
          </h1>
          <div className="h-1 w-24 bg-zinc-400 mx-auto rounded-full mt-2" />
          <p className="text-xl md:text-2xl text-slate-700 font-sans tracking-wide mt-4 leading-relaxed font-stylish">
            Bridging tradition and technical innovation to streamline resource
            sharing, community research, and persistent knowledge exploration.
          </p>
        </div>

        {/* Content Layout Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch mt-4">
          {/* Mission Card */}
          <div className="border border-zinc-300 bg-zinc-50 p-8 rounded-[40px] flex flex-col justify-between">
            <div>
              <h2 className="text-3xl text-slate-900 font-stylish mb-4">
                Our Mission
              </h2>
              <p className="text-lg  font-system text-slate-700 leading-relaxed font-sans">
                We purpose to break down institutional resource barriers by
                providing fluid, accessible web architectures for managing
                literary assets. Through clean user experiences, we optimize how
                readers connect with authors, documents, and historical text
                repositories.
              </p>
            </div>
            <div className="mt-6">
              <NavLink
                to="/books"
                className="inline-block p-3 border border-zinc-700 rounded-2xl bg-zinc-300 px-6 font-stylish text-lg transition-all hover:bg-zinc-400/70"
              >
                Browse Collection
              </NavLink>
            </div>
          </div>

          {/* Infrastructure Card */}
          <div className="border border-zinc-300 bg-zinc-50 p-8 rounded-[40px] flex flex-col justify-between">
            <div>
              <h2 className="text-3xl text-slate-900 font-stylish mb-4">
                The System
              </h2>
              <p className="text-lg font-system text-slate-700 leading-relaxed font-sans">
                Engineered with high-accuracy modularity using React, Tailwind
                CSS, and global state tracking. This ecosystem ensures near-zero
                latency catalog navigation, instant session initialization,
                secure credential parsing, and an entirely deterministic user
                journey.
              </p>
            </div>
            <div className="mt-6 flex gap-3 text-sm font-mono text-zinc-500">
              <span>v1.0.0</span>
              <span>•</span>
              <span>Open Source Asset</span>
            </div>
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-zinc-100 border border-zinc-300 rounded-[32px] p-8 text-center mt-4">
          {coreStats.map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <span className="text-4xl font-normal text-slate-900 font-stylish">
                {stat.value}
              </span>
              <span className="text-sm uppercase tracking-wider text-zinc-500 font-sans">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
