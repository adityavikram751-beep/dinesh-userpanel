"use client";

import { useEffect, useState } from "react";

type GymPlan = {
  _id: string;
  name: string;
  description?: string;
  price: number | string;
  duration: string;
  category?: string;
  currencyCode?: string; // INR, USD, etc.
  features: string[];
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

// ===== SIMPLE FLOATING WHATSAPP =====

function getSimpleWhatsappUrl() {
  const message = `Hi DineshSehgal! 👋

  I want to know more about your fitness programs.
  
  Please share:
  ✅ Pricing
  ✅ Workout Plans
  ✅ Diet Plans
  ✅ Coaching Details
  
  Thank you 🙌`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ===== SINGLE CARD DETAIL =====

function getWhatsappUrl(plan?: GymPlan) {
  const featuresText =
    plan?.features?.length
      ? plan.features.map((feature) => `• ${feature}`).join("\n")
      : "";

  const currencySymbol = getCurrencySymbol(plan?.currencyCode);

  const message = `Hi DineshSehgal! 👋

I want this Diet Plan.

🥗 Plan Name:
${plan?.name || ""}

💰 Price:
${currencySymbol}${plan?.price || ""}

⏳ Duration:
${plan?.duration || ""}

📋 Plan Details:
${plan?.description || ""}

🔥 Included Features:
${featuresText}

Please share complete details 🙌`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ===== ALL PLANS DETAIL =====

function getAllPlansWhatsappUrl(plans: GymPlan[]) {
  const plansText =
    plans?.length > 0
      ? plans
          .map((plan, index) => {
            const currencySymbol = getCurrencySymbol(plan.currencyCode);
            return `
${index + 1}. ${plan.name}

💰 Price: ${currencySymbol}${plan.price}

⏳ Duration: ${plan.duration}

📋 ${plan.description || ""}

🔥 Features:
${plan.features?.map((f) => `• ${f}`).join("\n") || ""}`;
          })
          .join("\n\n")
      : "";

  const message = `Hi DineshSehgal! 👋

I want details about all diet plans.

${plansText}

Please guide me about:
✅ Best Plan
✅ Diet Details
✅ Weight Loss
✅ Muscle Gain
✅ Transformation

Thank you 🙌`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ================= CARD COMPONENT WITH "SEE MORE" SCROLL =================

function PlanCard({ plan, isPopular }: { plan: GymPlan; isPopular: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const currencySymbol = getCurrencySymbol(plan.currencyCode);

  // Determine if description/features need expansion based on rough line count
  // We'll use a simple height check via CSS, but for interactivity we just toggle a class.

  return (
    <div
      className={`group overflow-hidden rounded-[36px] border transition duration-300 hover:-translate-y-3 hover:shadow-2xl flex flex-col h-full ${
        isPopular
          ? "relative border-black bg-black text-white shadow-2xl"
          : "border-zinc-200 bg-white shadow-xl"
      }`}
    >
      {/* MOST POPULAR BADGE */}
      {isPopular && (
        <div className="absolute right-5 top-5 rounded-full bg-lime-400 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-black z-10">
          Most Popular
        </div>
      )}

      {/* TOP SECTION */}
      <div className="bg-black px-6 py-10 text-center text-white">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-lime-300">
          {plan.name}
        </p>
        <h2 className="mt-5 text-5xl font-black sm:text-6xl">
          {currencySymbol}
          {plan.price}
        </h2>
        <p className="mt-3 text-zinc-300">{plan.duration}</p>
      </div>

      {/* DESCRIPTION - limited to 3 lines, with "See More" if needed */}
      {plan.description && (
        <div className="px-6 pt-6">
          <div
            className={`text-[14px] leading-7 ${
              isPopular ? "text-zinc-300" : "text-zinc-600"
            } ${!expanded ? "line-clamp-3" : ""}`}
          >
            {plan.description}
          </div>
          {plan.description.split("\n").join(" ").length > 100 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-xs font-semibold text-lime-500 hover:underline"
            >
              {expanded ? "See less" : "See more"}
            </button>
          )}
        </div>
      )}

      {/* FEATURES SECTION - with scrollable area when expanded */}
      <div className="px-6 py-6 flex-1">
        <div
          className={`space-y-3 ${
            expanded ? "max-h-48 overflow-y-auto pr-2" : ""
          }`}
          style={expanded ? { scrollbarWidth: "thin" } : {}}
        >
          {Array.isArray(plan.features) &&
            plan.features.map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 text-[15px] leading-6 ${
                  isPopular ? "text-zinc-300" : "text-zinc-700"
                }`}
              >
                <span className="mt-0.5 text-lg">🔥</span>
                <span>{item}</span>
              </div>
            ))}
        </div>
        {plan.features && plan.features.length > 3 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-xs font-semibold text-lime-500 hover:underline"
          >
            {expanded ? "Show less" : "See all features"}
          </button>
        )}
      </div>

      {/* BUTTON - stays at bottom due to flex layout */}
      <div className="px-6 pb-8 mt-auto">
        <a
          href={getWhatsappUrl(plan)}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center rounded-2xl px-6 py-5 text-base font-black transition duration-300 ${
            isPopular
              ? "bg-lime-400 text-black hover:scale-[1.02]"
              : "bg-black text-white hover:bg-zinc-800"
          }`}
        >
          Buy Now
        </a>
      </div>
    </div>
  );
}

export default function DietPlanPage() {
  const [plans, setPlans] = useState<GymPlan[]>([]);

  useEffect(() => {
    async function loadPlans() {
      try {
        const response = await fetch(
          "https://dinesh-sagel-backend.onrender.com/api/plans/plans?category=diet"
        );
        const data = await response.json();
        console.log("DIET API =>", data);

        if (Array.isArray(data)) {
          setPlans(data);
        } else if (Array.isArray(data?.plans)) {
          setPlans(data.plans);
        } else if (Array.isArray(data?.data)) {
          setPlans(data.data);
        } else if (Array.isArray(data?.data?.plans)) {
          setPlans(data.data.plans);
        } else {
          setPlans([]);
        }
      } catch (error) {
        console.log(error);
        setPlans([]);
      }
    }
    loadPlans();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f5f5]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-black text-white">
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
              Get a customized meal plan designed according to your body goals,
              lifestyle and complete fitness transformation.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={getAllPlansWhatsappUrl(plans)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-2xl bg-lime-400 px-7 py-4 text-sm font-black text-black shadow-xl transition duration-300 hover:scale-105 sm:text-base"
              >
                Get Your Diet Plan
              </a>
              <a
                href={getSimpleWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-7 py-4 text-sm font-black backdrop-blur transition duration-300 hover:bg-white/20 sm:text-base"
              >
                WhatsApp Now
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
                <h3 className="text-3xl font-black">500+</h3>
                <p className="mt-1 text-xs text-zinc-300 sm:text-sm">Clients</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
                <h3 className="text-3xl font-black">24/7</h3>
                <p className="mt-1 text-xs text-zinc-300 sm:text-sm">Support</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
                <h3 className="text-3xl font-black">100%</h3>
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
            <div className="absolute bottom-5 left-5 rounded-3xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
              <p className="text-sm text-zinc-300">Nutrition Coaching</p>
              <h3 className="mt-1 text-3xl font-black">Fat Loss + Muscle Gain</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PLANS SECTION ================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-black sm:text-5xl lg:text-6xl">
            Choose Your Plan
          </h2>
        </div>

        {/* Responsive grid, cards have equal height buttons at bottom */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {plans.map((plan, index) => (
            <PlanCard key={plan._id} plan={plan} isPopular={index === 1} />
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-5 pb-24 sm:px-8 lg:px-10">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[42px] bg-black px-6 py-16 text-center text-white shadow-[0_30px_100px_rgba(0,0,0,0.18)] sm:px-10 sm:py-20">
          <div className="absolute -left-20 top-0 h-[300px] w-[300px] rounded-full bg-lime-500/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-orange-500/10 blur-3xl" />

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
              Expert online nutrition coaching with customized meal plans
              designed for fat loss, muscle gain & complete transformation.
            </p>
            <div className="mt-12 flex justify-center">
              <a
                href={getAllPlansWhatsappUrl(plans)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl bg-lime-400 px-8 py-5 text-lg font-black text-black transition duration-300 hover:scale-105"
              >
                Start Your Diet Plan
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FLOATING WHATSAPP ================= */}
      <a
        href={getSimpleWhatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50"
      >
        <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#25D366] shadow-[0_15px_45px_rgba(37,211,102,0.45)] transition duration-300 hover:scale-105">
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