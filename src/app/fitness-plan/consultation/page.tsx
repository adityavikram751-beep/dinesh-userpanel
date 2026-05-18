
"use client";

export default function ConsultationPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f7f5] text-zinc-900">
      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-[#0b0f0d] text-white">
        
        {/* BG */}

        <div className="absolute inset-0 bg-gradient-to-br from-[#07130d] via-[#0b0f0d] to-[#101010]" />

        {/* GLOW */}

        <div className="absolute -left-24 top-0 h-[320px] w-[320px] rounded-full bg-emerald-500/20 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-24">
          
          {/* LEFT */}

          <div>
            <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-5 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-emerald-300 sm:text-xs">
              PREMIUM ONLINE COACHING
            </p>

            <h1 className="mt-6 text-4xl font-black leading-[1.05] sm:text-5xl lg:text-7xl">
              Video
              <br />
              Consultation
            </h1>

            <p className="mt-6 max-w-2xl text-[15px] leading-8 text-zinc-300 sm:text-lg sm:leading-9">
              Get direct expert fitness
              guidance for fat loss,
              muscle building,
              nutrition planning,
              workout structure and
              complete body
              transformation.
            </p>

            {/* BUTTONS */}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                className="flex items-center justify-center rounded-2xl bg-emerald-400 px-7 py-4 text-sm font-black text-black shadow-[0_15px_40px_rgba(52,211,153,0.35)] transition duration-300 hover:scale-105 hover:bg-emerald-300 sm:text-base"
              >
                Book Consultation
              </a>

              <a
                href="https://wa.me/919999999999"
                target="_blank"
                className="flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-7 py-4 text-sm font-black backdrop-blur transition duration-300 hover:bg-white/20 sm:text-base"
              >
                WhatsApp Now
              </a>
            </div>

            {/* STATS */}

            <div className="mt-12 grid grid-cols-3 gap-4">
              
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
                <h3 className="text-3xl font-black">
                  30
                </h3>

                <p className="mt-1 text-xs text-zinc-300 sm:text-sm">
                  Minutes
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
                <h3 className="text-3xl font-black">
                  1:1
                </h3>

                <p className="mt-1 text-xs text-zinc-300 sm:text-sm">
                  Coaching
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
                <h3 className="text-3xl font-black">
                  24/7
                </h3>

                <p className="mt-1 text-xs text-zinc-300 sm:text-sm">
                  Support
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1400&auto=format&fit=crop"
              alt="consultation"
              className="h-[380px] w-full rounded-[40px] object-cover shadow-[0_30px_100px_rgba(0,0,0,0.4)] sm:h-[520px] lg:h-[700px]"
            />

            {/* FLOAT CARD */}

            <div className="absolute bottom-5 left-5 rounded-3xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
              <p className="text-sm text-zinc-300">
                Trusted By
              </p>

              <h3 className="mt-1 text-3xl font-black">
                500+ Clients
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-black sm:text-5xl lg:text-6xl">
            What You’ll Get
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-zinc-600 sm:text-lg">
            Premium personalized
            coaching designed to help
            you achieve real fitness
            transformation.
          </p>
        </div>

        {/* GRID */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title:
                "Fat Loss Strategy",
              icon: "🔥",
            },

            {
              title:
                "Muscle Building",
              icon: "💪",
            },

            {
              title:
                "Workout Guidance",
              icon: "🏋️",
            },

            {
              title:
                "Nutrition Advice",
              icon: "🥗",
            },

            {
              title:
                "Supplement Guidance",
              icon: "⚡",
            },

            {
              title:
                "Lifestyle Coaching",
              icon: "🧠",
            },

            {
              title:
                "Goal Planning",
              icon: "🎯",
            },

            {
              title:
                "WhatsApp Support",
              icon: "📲",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group rounded-[32px] border border-zinc-200 bg-white p-7 shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-2 hover:border-emerald-400 hover:bg-[#0f1110] hover:text-white hover:shadow-[0_25px_60px_rgba(16,185,129,0.18)]"
            >
              {/* ICON */}

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">
                {item.icon}
              </div>

              <h3 className="mt-6 text-2xl font-black leading-tight">
                {item.title}
              </h3>

              <p className="mt-4 text-[15px] leading-7 text-zinc-500 transition group-hover:text-zinc-300">
                Personalized expert
                guidance according to
                your fitness goals.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PRICING ================= */}

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-10">
        
        <div className="overflow-hidden rounded-[42px] bg-[#0f1110] text-white shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
          
          <div className="grid items-center gap-10 lg:grid-cols-2">
            
            {/* LEFT */}

            <div className="p-8 lg:p-14">
              <p className="text-sm font-black uppercase tracking-[0.28em] text-emerald-300">
                Pricing
              </p>

              <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Simple &
                <br />
                Affordable
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg sm:leading-9">
                Direct expert support
                and personalized
                coaching according to
                your body goals.
              </p>

              <a
                href="https://wa.me/919999999999"
                target="_blank"
                className="mt-10 inline-flex rounded-2xl bg-emerald-400 px-8 py-5 text-lg font-black text-black shadow-[0_15px_40px_rgba(52,211,153,0.35)] transition duration-300 hover:scale-105 hover:bg-emerald-300"
              >
                Start Consultation
              </a>
            </div>

            {/* RIGHT */}

            <div className="grid gap-5 p-8 lg:p-14">
              {[
                {
                  country:
                    "India",
                  price:
                    "₹999",
                },

                {
                  country: "UK",
                  price:
                    "£25",
                },

                {
                  country:
                    "USA/Canada",
                  price:
                    "$30",
                },
              ].map((item) => (
                <div
                  key={item.country}
                  className="rounded-[32px] border border-white/10 bg-white/5 p-7 backdrop-blur transition duration-300 hover:scale-[1.02] hover:border-emerald-400"
                >
                  <div className="flex items-center justify-between">
                    
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-zinc-400">
                        {
                          item.country
                        }
                      </p>

                      <h3 className="mt-3 text-4xl font-black sm:text-5xl">
                        {
                          item.price
                        }
                      </h3>
                    </div>

                    <div className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-black">
                      30 MIN
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="px-5 pb-24 sm:px-8 lg:px-10">
        
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[42px] bg-[#0f1110] px-8 py-20 text-center text-white shadow-[0_30px_100px_rgba(0,0,0,0.18)]">
          
          {/* BG */}

          <div className="absolute -left-20 top-0 h-[300px] w-[300px] rounded-full bg-emerald-500/20 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-orange-500/10 blur-3xl" />

          {/* CONTENT */}

          <div className="relative z-10">
            <p className="mb-4 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-5 py-2 text-xs font-black uppercase tracking-[0.3em] text-emerald-300">
              PREMIUM ONLINE COACHING
            </p>

            <h2 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Ready To Transform
              <br />
              Your Body?
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg sm:leading-9">
              Transform your body with
              expert online coaching,
              customized workout
              plans and complete
              nutrition guidance.
            </p>

            {/* BUTTON */}

            <div className="mt-12 flex justify-center">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                className="flex items-center gap-3 rounded-2xl bg-emerald-400 px-8 py-5 text-lg font-black text-black shadow-[0_15px_40px_rgba(52,211,153,0.35)] transition duration-300 hover:scale-105 hover:bg-emerald-300"
              >
                Start Consultation

                <span>
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHATSAPP ================= */}

      <a
        href="https://wa.me/919999999999"
        target="_blank"
        className="fixed bottom-5 right-5 z-50"
      >
        <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#25D366] shadow-[0_15px_45px_rgba(37,211,102,0.45)] transition duration-300 hover:scale-105">
          
          {/* ICON */}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="white"
            className="h-9 w-9"
          >
            <path d="M16.01 3C8.83 3 3 8.82 3 16c0 2.57.75 5.08 2.16 7.23L3 29l5.93-2.1A12.93 12.93 0 0016.01 29C23.18 29 29 23.18 29 16S23.18 3 16.01 3zm0 23.67c-2.13 0-4.22-.57-6.04-1.65l-.43-.25-3.52 1.25 1.15-3.62-.28-.45A10.58 10.58 0 015.33 16c0-5.89 4.79-10.68 10.68-10.68 2.85 0 5.52 1.11 7.54 3.13A10.59 10.59 0 0126.68 16c0 5.89-4.79 10.67-10.67 10.67zm5.86-7.94c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1.01 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.58-.95-.84-1.59-1.88-1.77-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.55-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.4-.29.32-1.11 1.08-1.11 2.64 0 1.55 1.13 3.05 1.29 3.26.16.21 2.22 3.39 5.39 4.75.75.32 1.34.52 1.8.66.75.24 1.44.21 1.98.13.61-.09 1.89-.77 2.15-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37z" />
          </svg>
        </div>
      </a>
    </main>
  );
}