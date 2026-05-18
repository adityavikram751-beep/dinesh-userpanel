// src/app/fitness-plan/page.tsx

"use client";

const plans = [
  {
    title: "6 Weeks",
    subtitle: "Beginner",
    price: "3499",

    features: [
      "Full-body workout plan",
      "Goal-based nutrition",
      "Fat loss & mobility",
      "Weekly check-ins",
      "WhatsApp support",
      "Lifestyle reset",
    ],
  },

  {
    title: "12 Weeks",
    subtitle: "Intermediate",
    price: "4199",
    popular: true,

    features: [
      "Custom workout split",
      "Nutrition coaching",
      "Progress tracking",
      "Direct WhatsApp support",
      "Recovery routines",
      "Visible transformation",
    ],
  },

  {
    title: "24 Weeks",
    subtitle: "Advanced",
    price: "4499",

    features: [
      "Advanced training",
      "Macro nutrition",
      "Performance tracking",
      "1-on-1 check-ins",
      "Mindset coaching",
      "Long-term results",
    ],
  },
];

const audience = [
  {
    title:
      "Professional Athletes",

    text:
      "Strength, speed, biomechanics & explosive power training.",

    icon: "🏋️",
  },

  {
    title:
      "Sports Trial Students",

    text:
      "Sprint work, endurance & athletic conditioning.",

    icon: "⚡",
  },

  {
    title:
      "Weekend Warriors",

    text:
      "Mobility, explosive training & fat loss protocols.",

    icon: "🔥",
  },

  {
    title:
      "Longevity Seekers",

    text:
      "Movement efficiency, posture correction & long-term fitness.",

    icon: "💪",
  },
];

export default function FitnessPlanPage() {
  return (
    <main className="overflow-hidden bg-[#f5f5f5] text-zinc-900">
      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-black text-white">
        
        {/* BG EFFECTS */}

        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 opacity-95" />

        <div className="absolute -left-20 top-0 h-[320px] w-[320px] rounded-full bg-lime-500/20 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:px-10 lg:py-24">
          
          {/* LEFT */}

          <div>
            <p className="mb-5 inline-flex rounded-full border border-lime-400/20 bg-lime-400/10 px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-lime-300 sm:text-xs">
              Athlete Training 2026
            </p>

            <h1 className="text-4xl font-black leading-[1.05] sm:text-5xl lg:text-7xl">
              Transform
              <br />
              Your Body
            </h1>

            <p className="mt-6 max-w-2xl text-[15px] leading-8 text-zinc-300 sm:text-lg sm:leading-9">
              Premium online fitness
              coaching for fat loss,
              athletic performance,
              muscle building &
              complete body
              transformation.
            </p>

            {/* BUTTONS */}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button className="rounded-2xl bg-lime-400 px-7 py-4 text-sm font-black text-black shadow-xl transition duration-300 hover:scale-105 sm:text-base">
                Start Transformation
              </button>

              <a
                href="https://wa.me/919999999999"
                target="_blank"
                className="rounded-2xl border border-white/15 bg-white/10 px-7 py-4 text-center text-sm font-black backdrop-blur transition duration-300 hover:scale-105 hover:bg-white/20 sm:text-base"
              >
                WhatsApp Now
              </a>
            </div>

            {/* STATS */}

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
              
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/10">
                <h3 className="text-3xl font-black">
                  500+
                </h3>

                <p className="mt-1 text-sm text-zinc-300">
                  Clients
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/10">
                <h3 className="text-3xl font-black">
                  24/7
                </h3>

                <p className="mt-1 text-sm text-zinc-300">
                  Support
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/10 col-span-2 sm:col-span-1">
                <h3 className="text-3xl font-black">
                  100%
                </h3>

                <p className="mt-1 text-sm text-zinc-300">
                  Personalized
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop"
              alt="athlete"
              className="h-[380px] w-full rounded-[36px] object-cover shadow-2xl transition duration-500 hover:scale-[1.02] sm:h-[520px] lg:h-[700px]"
            />

            {/* FLOAT CARD */}

            <div className="absolute bottom-5 left-5 rounded-3xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
              <p className="text-sm text-zinc-300">
                Trusted By
              </p>

              <h3 className="mt-1 text-3xl font-black">
                500+ Athletes
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ================= AUDIENCE ================= */}

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-black sm:text-5xl lg:text-6xl">
            Who Is This For?
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-zinc-600 sm:text-lg">
            Customized fitness
            coaching for athletes,
            transformation seekers &
            long-term fitness goals.
          </p>
        </div>

        {/* GRID */}

        <div className="grid gap-6 md:grid-cols-2">
          {audience.map((item) => (
            <div
              key={item.title}
              className="group rounded-[32px] border border-zinc-200 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-black hover:bg-black hover:text-white hover:shadow-2xl"
            >
              {/* ICON */}

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-100 text-3xl transition duration-300 group-hover:bg-white">
                {item.icon}
              </div>

              <h3 className="mt-6 text-2xl font-black leading-tight">
                {item.title}
              </h3>

              <p className="mt-4 text-[15px] leading-8 text-zinc-500 transition duration-300 group-hover:text-zinc-300">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PLANS ================= */}

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28">
        
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-black sm:text-5xl lg:text-6xl">
            Choose Your Plan
          </h2>

          <p className="mt-5 text-base text-zinc-600 sm:text-lg">
            Premium transformation
            plans with workout,
            nutrition & coaching.
          </p>
        </div>

        {/* GRID */}

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.title}
              className={`group relative overflow-hidden rounded-[36px] border bg-white shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${
                plan.popular
                  ? "scale-[1.02] border-black"
                  : "border-zinc-200"
              }`}
            >
              {/* POPULAR */}

              {plan.popular && (
                <div className="absolute right-5 top-5 rounded-full bg-lime-400 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-black">
                  Most Popular
                </div>
              )}

              {/* TOP */}

              <div className="bg-black px-6 py-10 text-center text-white transition duration-500 group-hover:bg-zinc-900">
                <h3 className="text-5xl font-black sm:text-6xl">
                  {plan.title}
                </h3>

                <p className="mt-3 text-lg text-zinc-300">
                  {plan.subtitle}
                </p>
              </div>

              {/* PRICE */}

              <div className="border-b border-zinc-200 bg-zinc-100 px-6 py-8 text-center">
                <h4 className="text-5xl font-black sm:text-6xl">
                  ₹{plan.price}
                </h4>

                <p className="mt-2 text-sm text-zinc-500">
                  Complete Coaching
                </p>
              </div>

              {/* FEATURES */}

              <div className="space-y-5 px-6 py-8">
                {plan.features.map(
                  (feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 text-[15px] font-medium leading-7 text-zinc-700"
                    >
                      <span className="mt-1 text-lg">
                        🔥
                      </span>

                      <span>
                        {feature}
                      </span>
                    </div>
                  )
                )}
              </div>

              {/* BUTTON */}

              <div className="px-6 pb-8">
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  className="flex w-full items-center justify-center rounded-2xl bg-black px-6 py-5 text-base font-black text-white transition duration-300 hover:scale-[1.02] hover:bg-zinc-800"
                >
                  Buy Now
                </a>
              </div>
            </article>
          ))}
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
              Premium Online Coaching
            </p>

            <h2 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Ready To Transform
              <br />
              Your Body?
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg sm:leading-9">
              Transform your body with
              expert online coaching,
              customized workouts &
              complete nutrition
              guidance.
            </p>

            {/* BUTTON */}

            <div className="mt-12 flex justify-center">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                className="group flex items-center gap-3 rounded-2xl bg-lime-400 px-8 py-5 text-lg font-black text-black transition duration-300 hover:scale-105"
              >
                Start Transformation

                <span className="transition duration-300 group-hover:translate-x-1">
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