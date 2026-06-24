"use client";

import { useEffect, useState } from "react";

// ================= WHATSAPP FUNCTION =================

const WHATSAPP_NUMBER = "918585986111";

function getWhatsappUrl() {
  const message = `Hi DineshSehgal! 👋

I want to start my fitness transformation journey.

Please guide me about:
✅ Available Plans
✅ Pricing
✅ Diet Plan
✅ Workout Details

Thank you 🙌`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}

export default function AboutPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const specialties = [
    { icon: "🔥", label: "Fat Loss & Inch Loss" },
    { icon: "💪", label: "Muscle Gain & Body Recomposition" },
    { icon: "👩", label: "PCOD/PCOS Fitness Guidance" },
    { icon: "🏆", label: "Competition Preparation" },
    { icon: "⚡", label: "Strength & Conditioning" },
    { icon: "🥗", label: "Personalized Nutrition Plans" },
    { icon: "💊", label: "Supplement Guidance" },
    { icon: "🔄", label: "Lifestyle Transformation" },
  ];

  const achievements = [
    { number: "500+", label: "Transformations", icon: "🏋️" },
    { number: "2x", label: "Mr. India", icon: "🏆" },
    { number: "Multiple", label: "Mr. Delhi Winner", icon: "🥇" },
    { number: "100%", label: "Customized Plans", icon: "📋" },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      
      {/* ================= HERO SECTION - Upar kiya ================= */}
      <section className="relative overflow-hidden min-h-[50vh] flex items-start justify-center pt-20 sm:pt-24 lg:pt-28">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80"
            alt="Fitness background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/80 to-[#0a0a0a]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </div>
        
        {/* Glow Effects - Smaller */}
        <div className="absolute top-10 right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-300 backdrop-blur-sm mb-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            About Me
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-3 leading-[1.1]">
            Dinesh <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 bg-clip-text text-transparent">Sehgal</span>
          </h1>
          
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-400/50" />
            <p className="text-sm sm:text-base lg:text-lg text-emerald-300 font-semibold tracking-wide">
              Certified Fitness Coach
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-400/50" />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 backdrop-blur-sm px-4 py-1.5 text-[10px] sm:text-xs text-white border border-white/10 hover:border-emerald-400/50 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              2x Mr. India
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 backdrop-blur-sm px-4 py-1.5 text-[10px] sm:text-xs text-white border border-white/10 hover:border-emerald-400/50 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              500+ Transformations
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 backdrop-blur-sm px-4 py-1.5 text-[10px] sm:text-xs text-white border border-white/10 hover:border-emerald-400/50 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Mr. Delhi Winner
            </span>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* About Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* LEFT - About Text */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-10 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full" />
              <div>
                <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-[0.2em]">Get to Know</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  About <span className="text-emerald-400">Me</span>
                </h2>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Hi, I'm <span className="text-emerald-300 font-semibold">Dinesh Sehgal</span>, a Certified Fitness Coach dedicated to helping people achieve life-changing transformations through science-based training, proper nutrition, and consistent guidance.
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                My journey in fitness has been driven by passion, discipline, and results. I'm a multiple-time <span className="text-emerald-300 font-semibold">Mr. Delhi winner</span> and a <span className="text-emerald-300 font-semibold">2-time Mr. India title holder</span>. Over the years, I've successfully guided <span className="text-emerald-300 font-semibold">500+ body transformations</span>, helping clients improve not only their physique but also their confidence and lifestyle.
              </p>
            </div>

            {/* Achievements Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              {achievements.map((item, index) => (
                <div 
                  key={index} 
                  className="group relative rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 p-3.5 text-center hover:bg-emerald-500/15 transition-all duration-500 hover:border-emerald-400/40 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-500/10"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-400/0 to-emerald-400/0 group-hover:from-emerald-400/5 group-hover:to-emerald-400/10 transition-all duration-500" />
                  <div className="relative">
                    <span className="text-xl block mb-0.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">{item.icon}</span>
                    <p className="text-lg sm:text-xl font-bold text-emerald-300 group-hover:text-emerald-200 transition-colors">
                      {item.number}
                    </p>
                    <p className="text-[8px] sm:text-[10px] text-slate-400 mt-0.5 group-hover:text-slate-300 transition-colors">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mission Statement */}
            <div className="relative rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-5 mt-1 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
              <div className="relative">
                <span className="text-3xl text-emerald-400/30 block mb-1 leading-none">"</span>
                <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed font-light">
                  My mission is simple — to provide the right knowledge, right guidance, and the right strategy so every client can become the strongest and best version of themselves.
                </p>
                <span className="text-3xl text-emerald-400/30 block text-right mt-1 leading-none">"</span>
              </div>
            </div>
          </div>

          {/* RIGHT - Image & Specialties */}
          <div className="space-y-6">
            {/* Profile Image */}
            <div className="relative rounded-xl overflow-hidden border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img
                src="/profile.jpeg"
                alt="Dinesh Sehgal - Fitness Coach"
                className="w-full h-[280px] sm:h-[340px] object-contain group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="inline-flex items-center gap-2.5 rounded-xl bg-[#0a0a0a]/80 backdrop-blur-xl px-4 py-2.5 border border-white/10">
                  <span className="text-xl">🏋️</span>
                  <div>
                    <p className="text-xs font-bold text-white">Certified Fitness Coach</p>
                    <p className="text-[8px] text-emerald-300">Dinesh Sehgal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Specialties Grid */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full" />
                <div>
                  <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-[0.2em]">Expertise</p>
                  <h3 className="text-base font-bold text-white">I Specialize In</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {specialties.map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-2 rounded-xl border border-emerald-500/10 bg-[#0a0a0a]/50 px-3 py-2.5 hover:bg-emerald-500/10 hover:border-emerald-400/30 transition-all duration-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/5"
                  >
                    <span className="text-base group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">{item.icon}</span>
                    <span className="text-[10px] sm:text-xs font-medium text-slate-300 group-hover:text-white transition-colors leading-tight">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM SECTION ================= */}
        <div className="mt-16 pt-8 border-t border-emerald-500/10">
          {/* Premium Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <div className="group relative">
              <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 px-4 py-2 text-xs text-emerald-300 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/10">
                <span className="text-base">🏆</span>
                500+ Transformations
              </span>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 px-4 py-2 text-xs text-emerald-300 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/10">
                <span className="text-base">✅</span>
                Certified Coach
              </span>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 px-4 py-2 text-xs text-emerald-300 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/10">
                <span className="text-base">🥇</span>
                Mr. Delhi Winner
              </span>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 px-4 py-2 text-xs text-emerald-300 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/10">
                <span className="text-base">⭐</span>
                2x Mr. India
              </span>
            </div>
          </div>

          {/* Coaching Types */}
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <span className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-emerald-300 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Online Coaching
            </span>
            <span className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-emerald-300 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Offline Coaching
            </span>
            <span className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-emerald-300 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Personalized Plans
            </span>
            <span className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-emerald-300 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              24/7 Support
            </span>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
          </div>

          {/* Main Tagline */}
          <div className="text-center relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[400px] h-[100px] bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                Transform Your Body. Transform Your Life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FLOATING WHATSAPP ================= */}
      <a
        href={getWhatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 sm:bottom-5 sm:right-5 group"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#25D366] blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
          <div className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] shadow-2xl shadow-[#25D366]/30 transition duration-300 hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="white"
              className="h-6 w-6 sm:h-7 sm:w-7"
            >
              <path d="M16.01 3C8.83 3 3 8.82 3 16c0 2.57.75 5.08 2.16 7.23L3 29l5.93-2.1A12.93 12.93 0 0016.01 29C23.18 29 29 23.18 29 16S23.18 3 16.01 3zm0 23.67c-2.13 0-4.22-.57-6.04-1.65l-.43-.25-3.52 1.25 1.15-3.62-.28-.45A10.58 10.58 0 015.33 16c0-5.89 4.79-10.68 10.68-10.68 2.85 0 5.52 1.11 7.54 3.13A10.59 10.59 0 0126.68 16c0 5.89-4.79 10.67-10.67 10.67zm5.86-7.94c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1.01 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.58-.95-.84-1.59-1.88-1.77-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.55-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.4-.29.32-1.11 1.08-1.11 2.64 0 1.55 1.13 3.05 1.29 3.26.16.21 2.22 3.39 5.39 4.75.75.32 1.34.52 1.8.66.75.24 1.44.21 1.98.13.61-.09 1.89-.77 2.15-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37z" />
            </svg>
          </div>
        </div>
      </a>
    </main>
  );
}