import React from "react";

export function LogoMark({ className = "w-10 h-10" }) {
  return (
    <div className={`${className} rounded-xl overflow-hidden shadow-lg shadow-blue-600/20 flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id="goldGradMark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="blueGradMark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="bgGradMark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>
        
        {/* Rounded Shield Frame */}
        <rect x="5" y="5" width="90" height="90" rx="24" fill="url(#bgGradMark)" stroke="url(#goldGradMark)" strokeWidth="2.5" />
        
        {/* Architectural Gable Roof Apex */}
        <path d="M 50 19 L 75 38 L 68 38 L 50 25 L 32 38 L 25 38 Z" fill="url(#goldGradMark)" />
        
        {/* Left Pillar of 'H' */}
        <rect x="33" y="37" width="8" height="36" rx="2" fill="url(#blueGradMark)" />
        
        {/* Right Pillar of 'H' */}
        <rect x="59" y="37" width="8" height="36" rx="2" fill="url(#blueGradMark)" />
        
        {/* Crossbar & Horizon Line */}
        <path d="M 22 53 L 78 53" stroke="url(#goldGradMark)" strokeWidth="4.5" strokeLinecap="round" />
        
        {/* Foundation Plinth */}
        <path d="M 28 77 L 72 77" stroke="url(#blueGradMark)" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      </svg>
    </div>
  );
}

export function BrandLogo({ size = "default" }) {
  return (
    <div className="flex items-center gap-3 group">
      <LogoMark className={size === "sm" ? "w-8 h-8" : "w-10 h-10"} />
      <div>
        <span className={`font-heading ${size === "sm" ? "text-lg" : "text-xl"} font-bold tracking-tight text-white flex items-center`}>
          Horizon<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Homes</span>
        </span>
        <span className="block text-[9px] tracking-[0.25em] uppercase text-slate-400 font-semibold">Premier Living</span>
      </div>
    </div>
  );
}

export default BrandLogo;
