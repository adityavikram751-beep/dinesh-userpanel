"use client";

import { useEffect, useState } from "react";

type GymPlan = {
  _id: string;
  name: string;
  description?: string;
  price: number | string;
  duration: string;
  features: string[];
  popular?: boolean;
  currencyCode?: string; // INR, USD, GBP, EUR etc.
};

// ================= WHATSAPP =================

const WHATSAPP_NUMBER = "918585986111";

// Helper to get currency symbol
function getCurrencySymbol(currencyCode?: string): string {
  if (!currencyCode) return "₹";
  switch (currencyCode.toUpperCase()) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    case "INR":
      return "₹";
    default:
      return "₹";
  }
}

// Simple WhatsApp (no plan details)
function getSimpleWhatsappUrl() {
  const message = `Hi DineshSehgal! 👋

I want to start my fitness transformation journey.

Please guide me about:
✅ Available Plans
✅ Pricing
✅ Workout Details
✅ Diet Plan

Thank you 🙌`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Single plan WhatsApp with currency
function getPlanWhatsappUrl(plan?: GymPlan) {
  const featuresText =
    plan?.features?.length
      ? plan.features
          .slice(0, 5)
          .map((feature) => `• ${feature}`)
          .join("\n")
      : "";

  const currencySymbol = getCurrencySymbol(plan?.currencyCode);

  const message = `Hi DineshSehgal! 👋

I want this fitness plan.

🏋️ Plan Name:
${plan?.name || ""}

💰 Price:
${currencySymbol}${plan?.price || ""}

⏳ Duration:
${plan?.duration || ""}

📋 Plan Details:
${plan?.description || ""}

🔥 Features:
${featuresText}

Please share complete details 🙌`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ================= AUDIENCE =================

const audience = [
  {
    title: "Professional Athletes",
    text: "Strength, speed, biomechanics & explosive power training.",
    icon: "🏋️",
  },
  {
    title: "Sports Trial Students",
    text: "Sprint work, endurance & athletic conditioning.",
    icon: "⚡",
  },
  {
    title: "Weekend Warriors",
    text: "Mobility, explosive training & fat loss protocols.",
    icon: "🔥",
  },
  {
    title: "Longevity Seekers",
    text: "Movement efficiency, posture correction & long-term fitness.",
    icon: "💪",
  },
];

// ================= CARD COMPONENT =================
function PlanCard({
  plan,
  isPopular,
}: {
  plan: GymPlan;
  isPopular: boolean;
}) {

  const currencySymbol =
    getCurrencySymbol(
      plan.currencyCode
    );

  return (

    <article
      className={`group relative overflow-hidden rounded-[36px] border bg-white shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl flex flex-col h-[h-[560px]]
      ${
        isPopular
          ? "scale-[1.02] border-black"
          : "border-zinc-200"
      }`}
    >

      {/* MOST POPULAR */}

      {isPopular && (

        <div className="absolute right-5 top-5 rounded-full bg-lime-400 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-black z-10">

          Most Popular

        </div>

      )}

      {/* TOP */}

      <div className="bg-black px-6 py-8 sm:py-10 text-center text-white">

        <h3 className="text-3xl sm:text-4xl font-black">

          {plan.name}

        </h3>

        {plan.duration && (

          <p className="mt-2 sm:mt-3 text-base sm:text-lg text-zinc-300">

            {plan.duration}

          </p>

        )}

      </div>

      {/* PRICE */}

      <div className="border-b border-zinc-200 bg-zinc-100 px-6 py-6 sm:py-8 text-center">

        <h4 className="text-4xl sm:text-5xl lg:text-6xl font-black">

          {currencySymbol}
          {plan.price}

        </h4>

        <p className="mt-2 text-sm text-zinc-500">

          Complete Coaching

        </p>

      </div>

      {/* DESCRIPTION */}

      {plan.description && (

        <div className="px-6 pt-6 shrink-0">

          <p className="text-[14px] leading-7 text-zinc-500">

            {plan.description}

          </p>

        </div>

      )}

{/* FEATURES */}

<div className="px-6 py-5 flex-1 min-h-0 overflow-hidden">

  <div
    className="
      h-[140px]
      sm:h-[170px]
      lg:h-[190px]
      overflow-y-scroll
      overscroll-contain
      pr-2
      scrollbar-hide
    "
  >

    <div className="space-y-4">

      {plan.features?.map(
        (
          feature,
          i
        ) => (

          <div
            key={i}
            className="
              flex
              items-start
              gap-3
              text-[14px]
              sm:text-[15px]
              font-medium
              leading-6
              sm:leading-7
              text-zinc-700
            "
          >

            <span className="mt-0.5 text-base sm:text-lg">

              🔥

            </span>

            <span>

              {feature}

            </span>

          </div>

        )
      )}

    </div>

  </div>

</div>
      {/* BUTTON FIXED */}

      <div className="px-6 pb-6 sm:pb-8 mt-auto shrink-0">

        <a
          href={getPlanWhatsappUrl(
            plan
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex
            w-full
            items-center
            justify-center
            rounded-2xl
            bg-black
            px-4
            sm:px-6
            py-4
            sm:py-5
            text-sm
            font-black
            text-white
            transition
            duration-300
            hover:scale-[1.02]
            hover:bg-lime-500
            hover:text-black
          "
        >

          Buy Now On WhatsApp

        </a>

      </div>

    </article>
  );
}
export default function FitnessPlanPage() {
  const [plans, setPlans] = useState<GymPlan[]>([]);

  // ================= LOAD PLANS =================

  useEffect(() => {
    async function loadPlans() {
      try {
        const response = await fetch(
          "https://dinesh-sagel-backend.onrender.com/api/plans/plans?category=transformation"
        );
        const data = await response.json();
        console.log("PLANS API =>", data);

        if (Array.isArray(data)) {
          setPlans(data);
        } else if (Array.isArray(data?.plans)) {
          setPlans(data.plans);
        } else if (Array.isArray(data?.data)) {
          setPlans(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadPlans();
  }, []);

  return (
    <main className="overflow-x-hidden bg-[#f5f5f5] text-zinc-900">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 opacity-95" />
        <div className="absolute -left-20 top-0 h-[320px] w-[320px] rounded-full bg-lime-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 sm:gap-14 px-5 py-12 sm:py-20 lg:grid-cols-2 lg:px-10 lg:py-24">
          {/* LEFT */}
          <div>
            <p className="mb-4 sm:mb-5 inline-flex rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-1.5 sm:px-5 sm:py-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-lime-300">
              Athlete Training 2026
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05]">
              Transform
              <br />
              Your Body
            </h1>
            <p className="mt-5 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg leading-7 sm:leading-8 lg:leading-9 text-zinc-300">
              Premium online fitness coaching for fat loss, athletic performance,
              muscle building & complete body transformation.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href={getSimpleWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-lime-400 px-6 sm:px-7 py-3 sm:py-4 text-center text-sm sm:text-base font-black text-black shadow-xl transition duration-300 hover:scale-105"
              >
                Start Transformation
              </a>
              <a
                href={getSimpleWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/15 bg-white/10 px-6 sm:px-7 py-3 sm:py-4 text-center text-sm sm:text-base font-black backdrop-blur transition duration-300 hover:scale-105 hover:bg-white/20"
              >
                WhatsApp Now
              </a>
            </div>

            {/* STATS */}
            <div className="mt-10 sm:mt-12 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/10">
                <h3 className="text-2xl sm:text-3xl font-black">500+</h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-300">Clients</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/10">
                <h3 className="text-2xl sm:text-3xl font-black">24/7</h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-300">Support</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/10 col-span-2 sm:col-span-1">
                <h3 className="text-2xl sm:text-3xl font-black">100%</h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-300">Personalized</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop"
              alt="athlete"
              className="h-[320px] sm:h-[520px] lg:h-[700px] w-full rounded-[36px] object-cover shadow-2xl transition duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>

      {/* ================= AUDIENCE ================= */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:py-24 sm:px-8 lg:px-10">
        <div className="mb-10 sm:mb-14 text-center">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black">Who Is This For?</h2>
        </div>
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          {audience.map((item) => (
            <div
              key={item.title}
              className="group rounded-[32px] border border-zinc-200 bg-white p-6 sm:p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-black hover:bg-black hover:text-white hover:shadow-2xl"
            >
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-lime-100 text-2xl sm:text-3xl transition duration-300 group-hover:bg-white">
                {item.icon}
              </div>
              <h3 className="mt-5 sm:mt-6 text-xl sm:text-2xl font-black leading-tight">{item.title}</h3>
              <p className="mt-3 sm:mt-4 text-sm sm:text-[15px] leading-7 sm:leading-8 text-zinc-500 transition duration-300 group-hover:text-zinc-300">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PLANS ================= */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:pb-28 sm:px-8 lg:px-10">
        <div className="mb-10 sm:mb-14 text-center">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black">Choose Your Plan</h2>
          <p className="mt-3 sm:mt-5 text-sm sm:text-base text-zinc-600">
            Premium transformation plans with workout, nutrition & coaching.
          </p>
        </div>

        {/* NO CUSTOM SCROLL CONTAINER - pure grid with normal page scroll */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {plans.map((plan, index) => (
            <PlanCard key={plan._id} plan={plan} isPopular={plan.popular || index === 1} />
          ))}
        </div>
      </section>

      {/* ================= FLOATING WHATSAPP ================= */}
      <a
        href={getSimpleWhatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 sm:bottom-5 right-4 sm:right-5 z-50"
      >
        <div className="flex h-14 w-14 sm:h-[70px] sm:w-[70px] items-center justify-center rounded-full bg-[#25D366] shadow-[0_15px_45px_rgba(37,211,102,0.45)] transition duration-300 hover:scale-105">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="white"
            className="h-7 w-7 sm:h-9 sm:w-9"
          >
            <path d="M16.01 3C8.83 3 3 8.82 3 16c0 2.57.75 5.08 2.16 7.23L3 29l5.93-2.1A12.93 12.93 0 0016.01 29C23.18 29 29 23.18 29 16S23.18 3 16.01 3zm0 23.67c-2.13 0-4.22-.57-6.04-1.65l-.43-.25-3.52 1.25 1.15-3.62-.28-.45A10.58 10.58 0 015.33 16c0-5.89 4.79-10.68 10.68-10.68 2.85 0 5.52 1.11 7.54 3.13A10.59 10.59 0 0126.68 16c0 5.89-4.79 10.67-10.67 10.67zm5.86-7.94c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1.01 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.58-.95-.84-1.59-1.88-1.77-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.55-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.4-.29.32-1.11 1.08-1.11 2.64 0 1.55 1.13 3.05 1.29 3.26.16.21 2.22 3.39 5.39 4.75.75.32 1.34.52 1.8.66.75.24 1.44.21 1.98.13.61-.09 1.89-.77 2.15-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37z" />
          </svg>
        </div>
      </a>
    </main>
  );
}