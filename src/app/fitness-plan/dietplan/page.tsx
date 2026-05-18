
"use client";

export default function DietPlanPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f5f5]">
      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-black text-white">
        
        {/* BG EFFECT */}

        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-900" />

        <div className="absolute -left-24 top-0 h-[320px] w-[320px] rounded-full bg-lime-500/20 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-24">
          
          {/* LEFT */}

          <div>
            <p className="inline-flex rounded-full border border-lime-400/20 bg-lime-400/10 px-5 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-lime-300 sm:text-xs">
              Personalized Nutrition
            </p>

            <h1 className="mt-6 text-4xl font-black leading-[1.05] sm:text-5xl lg:text-7xl">
              Personalized
              <br />
              Diet Plans
            </h1>

            <p className="mt-6 max-w-2xl text-[15px] leading-8 text-zinc-300 sm:text-lg sm:leading-9">
              Get a customized meal
              plan designed according
              to your body goals,
              lifestyle and complete
              fitness transformation.
            </p>

            {/* BUTTONS */}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                className="flex items-center justify-center rounded-2xl bg-lime-400 px-7 py-4 text-sm font-black text-black shadow-xl transition duration-300 hover:scale-105 sm:text-base"
              >
                Get Your Diet Plan
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
                  500+
                </h3>

                <p className="mt-1 text-xs text-zinc-300 sm:text-sm">
                  Clients
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

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
                <h3 className="text-3xl font-black">
                  100%
                </h3>

                <p className="mt-1 text-xs text-zinc-300 sm:text-sm">
                  Personalized
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1400&auto=format&fit=crop"
              alt="diet plan"
              className="h-[380px] w-full rounded-[36px] object-cover shadow-2xl sm:h-[520px] lg:h-[700px]"
            />

            {/* FLOAT CARD */}

            <div className="absolute bottom-5 left-5 rounded-3xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
              <p className="text-sm text-zinc-300">
                Nutrition Coaching
              </p>

              <h3 className="mt-1 text-3xl font-black">
                Fat Loss + Muscle Gain
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        
        {/* HEADING */}

        <div className="mb-14 text-center">
          <h2 className="text-4xl font-black sm:text-5xl lg:text-6xl">
            Choose Your Plan
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-zinc-600 sm:text-lg">
            Premium customized meal
            plans for fat loss,
            muscle building and
            complete body
            transformation.
          </p>
        </div>

        {/* GRID */}

        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* INDIA */}

          <div className="group overflow-hidden rounded-[36px] border border-zinc-200 bg-white shadow-xl transition duration-300 hover:-translate-y-3 hover:shadow-2xl">
            
            {/* TOP */}

            <div className="bg-black px-6 py-10 text-center text-white">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-lime-300">
                India
              </p>

              <h2 className="mt-5 text-5xl font-black sm:text-6xl">
                ₹1,499
              </h2>

              <p className="mt-3 text-zinc-300">
                One Time Payment
              </p>
            </div>

            {/* FEATURES */}

            <div className="space-y-5 px-6 py-8">
              {[
                "Customized Diet Plan",
                "Fat Loss / Muscle Gain",
                "Indian Meal Options",
                "Flexible Meal Timing",
                "Supplement Guidance",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-[15px] leading-7 text-zinc-700"
                >
                  <span className="mt-1 text-lg">
                    🥗
                  </span>

                  <span>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* BUTTON */}

            <div className="px-6 pb-8">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                className="flex items-center justify-center rounded-2xl bg-black px-6 py-5 text-base font-black text-white transition duration-300 hover:bg-zinc-800"
              >
                Buy Now
              </a>
            </div>
          </div>

          {/* UK */}

          <div className="relative group overflow-hidden rounded-[36px] border border-black bg-black text-white shadow-2xl transition duration-300 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(0,0,0,0.2)]">
            
            {/* POPULAR */}

            <div className="absolute right-5 top-5 rounded-full bg-lime-400 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-black">
              Most Popular
            </div>

            {/* TOP */}

            <div className="px-6 py-10 text-center">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-lime-300">
                UK
              </p>

              <h2 className="mt-5 text-5xl font-black sm:text-6xl">
                £29
              </h2>

              <p className="mt-3 text-zinc-300">
                One Time Payment
              </p>
            </div>

            {/* FEATURES */}

            <div className="space-y-5 px-6 py-8">
              {[
                "Complete Nutrition Plan",
                "Calories & Macros",
                "Easy Meal Structure",
                "Weight Loss Support",
                "WhatsApp Assistance",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-[15px] leading-7 text-zinc-300"
                >
                  <span className="mt-1 text-lg">
                    🔥
                  </span>

                  <span>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* BUTTON */}

            <div className="px-6 pb-8">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                className="flex items-center justify-center rounded-2xl bg-lime-400 px-6 py-5 text-base font-black text-black transition duration-300 hover:scale-[1.02]"
              >
                Buy Now
              </a>
            </div>
          </div>

          {/* USA */}

          <div className="group overflow-hidden rounded-[36px] border border-zinc-200 bg-white shadow-xl transition duration-300 hover:-translate-y-3 hover:shadow-2xl">
            
            {/* TOP */}

            <div className="bg-black px-6 py-10 text-center text-white">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-lime-300">
                USA / Canada
              </p>

              <h2 className="mt-5 text-5xl font-black sm:text-6xl">
                $39
              </h2>

              <p className="mt-3 text-zinc-300">
                One Time Payment
              </p>
            </div>

            {/* FEATURES */}

            <div className="space-y-5 px-6 py-8">
              {[
                "Customized Meal Plan",
                "Muscle Building Nutrition",
                "Healthy Recipes",
                "Supplement Suggestions",
                "Easy To Follow Structure",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-[15px] leading-7 text-zinc-700"
                >
                  <span className="mt-1 text-lg">
                    💪
                  </span>

                  <span>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* BUTTON */}

            <div className="px-6 pb-8">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                className="flex items-center justify-center rounded-2xl bg-black px-6 py-5 text-base font-black text-white transition duration-300 hover:bg-zinc-800"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="px-5 pb-24 sm:px-8 lg:px-10">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[42px] bg-black px-6 py-16 text-center text-white shadow-[0_30px_100px_rgba(0,0,0,0.18)] sm:px-10 sm:py-20">
          
          {/* BG */}

          <div className="absolute -left-20 top-0 h-[300px] w-[300px] rounded-full bg-lime-500/20 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-orange-500/10 blur-3xl" />

          {/* CONTENT */}

          <div className="relative z-10">
            <p className="mb-4 inline-flex rounded-full border border-lime-400/20 bg-lime-400/10 px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-lime-300 sm:text-xs">
              Expert Nutrition Coaching
            </p>

            <h2 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Eat Better.
              <br />
              Transform Faster.
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg sm:leading-9">
              Expert online nutrition
              coaching with customized
              meal plans designed for
              fat loss, muscle gain &
              complete transformation.
            </p>

            {/* BUTTON */}

            <div className="mt-12 flex justify-center">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                className="flex items-center gap-3 rounded-2xl bg-lime-400 px-8 py-5 text-lg font-black text-black transition duration-300 hover:scale-105"
              >
                Start Your Diet Plan

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
        <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#25D366] shadow-[0_12px_35px_rgba(37,211,102,0.40)] transition duration-300 hover:scale-105">
          
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