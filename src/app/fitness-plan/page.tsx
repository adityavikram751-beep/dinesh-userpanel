"use client";

import { type FormEvent, useEffect, useState } from "react";

// ================= TYPES =================

type PriceEntry = {
  currencyCode: string;
  price: number;
  symbol: string;
  _id: string;
};

type GymPlan = {
  _id: string;
  name: string;
  description?: string;
  price?: number | string;
  currencyCode?: string;
  allprice?: PriceEntry[];
  duration: string;
  features: string[];
  popular?: boolean;
};

type CheckoutStep = "form" | "payment" | "success";

type CheckoutForm = {
  country: string;
  name: string;
  age: string;
  sex: string;
  email: string;
  mobile: string;
  description: string;
  pastInjury: string;
  goal: string;
};

// ================= CONSTANTS =================

const WHATSAPP_NUMBER = "918585986111";
const UPI_ID = "dineshsehgal@upi";

const defaultCheckoutForm: CheckoutForm = {
  country: "India",
  name: "",
  age: "",
  sex: "",
  email: "",
  mobile: "",
  description: "",
  pastInjury: "",
  goal: "",
};

const countryOptions = ["India", "United States", "United Kingdom", "Canada"];

const premiumAudience = [
  {
    title: "Beginners",
    text: "Simple workouts, habit building, form guidance and nutrition basics for a confident start.",
    image:
      "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Professional Athletics",
    text: "Performance coaching focused on strength, speed, conditioning and sport-ready movement.",
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Office Professionals",
    text: "Efficient plans for busy schedules, posture support, fat loss and sustainable energy.",
    image:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=900&q=80",
  },
];

// ================= HELPERS =================

function countryToCurrency(country: string): string {
  switch (country) {
    case "United States":
      return "USD";
    case "United Kingdom":
      return "GBP";
    case "Canada":
      return "CAD";
    default:
      return "INR";
  }
}

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
    case "CAD":
      return "CA$";
    default:
      return "₹";
  }
}

function resolvePlanPrice(
  plan: GymPlan,
  preferredCurrency: string = "INR"
): { price: number | string; symbol: string; currencyCode: string } {
  if (plan.allprice?.length) {
    const match =
      plan.allprice.find(
        (p) => p.currencyCode.toUpperCase() === preferredCurrency.toUpperCase()
      ) ?? plan.allprice[0];
    return {
      price: match.price,
      symbol: match.symbol,
      currencyCode: match.currencyCode,
    };
  }
  return {
    price: plan.price ?? "",
    symbol: getCurrencySymbol(plan.currencyCode),
    currencyCode: plan.currencyCode ?? "INR",
  };
}

function getOrderId() {
  return `DSF-${Date.now().toString().slice(-6)}`;
}

// ================= WHATSAPP HELPERS =================

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

function getPlanWhatsappUrl(
  plan: GymPlan,
  price: number | string,
  symbol: string
) {
  const featuresText = plan.features?.length
    ? plan.features
        .slice(0, 5)
        .map((f) => `• ${f}`)
        .join("\n")
    : "";

  const message = `Hi DineshSehgal! 👋

I want this fitness plan.

🏋️ Plan Name:
${plan.name}

💰 Price:
${symbol}${price}

⏳ Duration:
${plan.duration}

📋 Plan Details:
${plan.description || ""}

🔥 Features:
${featuresText}

Please share complete details 🙌`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ================= PLAN CARD =================

function PlanCard({
  plan,
  isPopular,
  onBuyNow,
}: {
  plan: GymPlan;
  isPopular: boolean;
  onBuyNow: (plan: GymPlan) => void;
}) {
  const primaryPrice = plan.allprice?.[0] ?? {
    symbol: getCurrencySymbol(plan.currencyCode),
    price: plan.price ?? "",
    currencyCode: plan.currencyCode ?? "INR",
  };
  const otherPrices = plan.allprice?.slice(1) ?? [];

  const filteredFeatures = (plan.features || []).filter(
    (f) => f.trim().toLowerCase() !== "include"
  );

  return (
    <article
      className={`group relative flex h-full min-h-[560px] max-h-[560px] flex-col overflow-hidden rounded-2xl border-2 bg-white shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl
      ${
        isPopular
          ? "border-emerald-400 shadow-emerald-500/40 hover:shadow-emerald-500/70"
          : "border-zinc-200 hover:border-emerald-300/50"
      }`}
    >
      {/* Glowing top bar */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/50" />

      {/* "Most Popular" – top right */}
      {isPopular && (
        <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 px-3.5 py-1.5 text-[8px] font-black uppercase tracking-[0.15em] text-black shadow-lg shadow-emerald-500/50">
          <span>⭐</span> Most Popular
        </div>
      )}

      {/* HEADER */}
      <div className="bg-gradient-to-br from-zinc-50 via-white to-emerald-50/70 px-5 pt-6 pb-4 border-b border-emerald-200/50">
        <div className="flex flex-col items-center text-center">
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900">
            {plan.name}
          </h3>
          {plan.duration && (
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
              <span>⏱</span> {plan.duration}
            </div>
          )}
        </div>
      </div>

      {/* PRICE */}
      <div className="border-y border-emerald-100/60 bg-gradient-to-r from-emerald-50/50 via-white to-emerald-50/50 px-5 py-4">
        <div className="flex flex-col items-center gap-2.5">
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
              {primaryPrice.symbol}{primaryPrice.price}
            </span>
            <span className="rounded-full bg-emerald-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
              {primaryPrice.currencyCode}
            </span>
          </div>
          {otherPrices.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {otherPrices.map((p) => (
                <span
                  key={p._id}
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-4 py-2 text-base sm:text-lg font-bold text-emerald-700 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-emerald-200 hover:shadow-md"
                >
                  {p.symbol}{p.price}
                  <span className="text-[11px] sm:text-xs font-semibold text-emerald-500/80 uppercase">
                    {p.currencyCode}
                  </span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* DESCRIPTION */}
      {plan.description && (
        <div className="px-5 pt-3.5 text-left">
          <p className="text-base font-bold leading-6 text-zinc-700 line-clamp-2">
            {plan.description}
          </p>
        </div>
      )}

      {/* FEATURES */}
      <div className="flex-1 min-h-0 overflow-hidden px-5 pt-2.5 pb-1">
        <div
          className="h-[150px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent"
          style={{ scrollbarWidth: "thin" }}
        >
          <div className="space-y-1.5">
            {filteredFeatures.slice(0, 8).map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 text-base sm:text-base leading-6 text-zinc-700 font-medium text-left"
              >
                <span className="mt-0.5 text-base shrink-0 text-emerald-500">●</span>
                <span>{feature}</span>
              </div>
            ))}
            {filteredFeatures.length > 8 && (
              <p className="pt-1 text-xs font-bold text-emerald-600 text-left">
                +{filteredFeatures.length - 8} more features →
              </p>
            )}
          </div>
        </div>
      </div>

      {/* BUTTON */}
      <div className="mt-auto shrink-0 px-5 pb-5 pt-1">
        <button
          type="button"
          onClick={() => onBuyNow(plan)}
          className={`group/btn flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-black transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]
          ${
            isPopular
              ? "bg-gradient-to-r from-emerald-400 to-emerald-500 text-black shadow-lg shadow-emerald-500/40 hover:shadow-emerald-500/70"
              : "bg-zinc-800 text-white border border-emerald-300/30 hover:border-emerald-400/70 hover:shadow-lg hover:shadow-emerald-500/20"
          }`}
        >
          <span>Choose Plan</span>
          <span className="text-lg transition-transform duration-300 group-hover/btn:translate-x-1">
            →
          </span>
        </button>
      </div>
    </article>
  );
}

// ================= MAIN PAGE =================

export default function FitnessPlanPage() {
  const [plans, setPlans] = useState<GymPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<GymPlan | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("form");
  const [checkoutForm, setCheckoutForm] =
    useState<CheckoutForm>(defaultCheckoutForm);
  const [orderId, setOrderId] = useState("");

  function openCheckout(plan: GymPlan) {
    setSelectedPlan(plan);
    setCheckoutStep("form");
    setCheckoutForm(defaultCheckoutForm);
    setOrderId("");
  }

  function closeCheckout() {
    setSelectedPlan(null);
    setCheckoutStep("form");
    setOrderId("");
  }

  function updateCheckoutField(field: keyof CheckoutForm, value: string) {
    setCheckoutForm((prev) => ({ ...prev, [field]: value }));
  }

  function proceedToPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOrderId(getOrderId());
    setCheckoutStep("payment");
  }

  const resolvedCheckoutPrice = selectedPlan
    ? resolvePlanPrice(
        selectedPlan,
        countryToCurrency(checkoutForm.country)
      )
    : null;

  useEffect(() => {
    async function loadPlans() {
      try {
        const response = await fetch(
          "https://dinesh-sagel-backend.onrender.com/api/plans/plans?category=transformation"
        );
        const data = await response.json();

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
        <div className="absolute -left-20 top-0 h-[320px] w-[320px] rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:gap-14 sm:py-20 lg:grid-cols-2 lg:px-10 lg:py-24">
          {/* LEFT */}
          <div>
            <p className="mb-4 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.3em] text-emerald-300 backdrop-blur-sm sm:mb-5 sm:px-5 sm:py-2 sm:text-[10px]">
              Athlete Training 2026
            </p>
            <h1 className="text-4xl font-black leading-[1.05] sm:text-5xl lg:text-7xl">
              Transform
              <br />
              <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 bg-clip-text text-transparent">Your Body</span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-300 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg lg:leading-9">
              Premium online fitness coaching for fat loss, athletic performance,
              muscle building & complete body transformation.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <a
                href={getSimpleWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-6 py-3 text-center text-sm font-black text-black shadow-xl shadow-emerald-500/30 transition duration-300 hover:scale-105 hover:shadow-emerald-500/50 sm:px-7 sm:py-4 sm:text-base"
              >
                Start Transformation
              </a>
            </div>

            {/* STATS */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4">
              {[
                { value: "500+", label: "Clients" },
                { value: "24/7", label: "Support" },
                { value: "100%", label: "Personalized" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/10 sm:p-5 last:col-span-2 sm:last:col-span-1"
                >
                  <h3 className="text-2xl font-black text-emerald-300 sm:text-3xl">{stat.value}</h3>
                  <p className="mt-1 text-xs text-zinc-300 sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop"
              alt="athlete"
              className="h-[320px] w-full rounded-[36px] object-cover shadow-2xl shadow-emerald-500/10 transition duration-500 hover:scale-[1.02] sm:h-[520px] lg:h-[700px]"
            />
          </div>
        </div>
      </section>

      {/* ================= AUDIENCE ================= */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mb-10 text-center sm:mb-14">
          <h2 className="text-3xl font-black sm:text-5xl lg:text-6xl">
            Who Is This <span className="text-emerald-500">For?</span>
          </h2>
        </div>
        <div className="grid gap-5 sm:gap-6 lg:grid-cols-3">
          {premiumAudience.map((item) => (
            <div
              key={item.title}
              className="group relative min-h-[390px] overflow-hidden rounded-[30px] border border-emerald-200/30 bg-black p-7 text-white shadow-[0_28px_80px_rgba(17,17,17,0.18)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_36px_100px_rgba(16,185,129,0.15)] hover:border-emerald-400/40 sm:p-8"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.46) 42%, rgba(0,0,0,0.9) 100%), url('${item.image}')`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent transition duration-500 group-hover:via-black/25" />
              <div className="relative flex h-full min-h-[326px] flex-col justify-end">
                <div className="h-[228px]">
                  <h3 className="flex min-h-[88px] max-w-[320px] items-start text-3xl font-black leading-tight sm:text-4xl text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 line-clamp-3 max-w-[330px] text-sm font-semibold leading-7 text-zinc-200 sm:text-[15px] sm:leading-8">
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PLANS ================= */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28 lg:px-10">
        <div className="mb-10 text-center sm:mb-14">
          <h2 className="text-3xl font-black sm:text-5xl lg:text-6xl">
            Choose Your <span className="text-emerald-500">Plan</span>
          </h2>
          <p className="mt-3 text-sm text-zinc-600 sm:mt-5 sm:text-base">
            Premium transformation plans with workout, nutrition & coaching.
          </p>
        </div>

        <div className="grid auto-rows-fr gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <PlanCard
              key={plan._id}
              plan={plan}
              isPopular={plan.popular || index === 1}
              onBuyNow={openCheckout}
            />
          ))}
        </div>
      </section>

      {/* ================= CHECKOUT MODAL - WAISA HI ================= */}
      {selectedPlan && resolvedCheckoutPrice && (
        <div className="fixed inset-0 z-[70] overflow-y-auto bg-black/70 px-4 py-6 backdrop-blur-sm sm:py-10">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[28px] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.35)]">

            {/* MODAL HEADER */}
            <div className="flex items-start justify-between gap-5 border-b border-zinc-200 bg-zinc-950 px-6 py-6 text-white sm:px-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-300">
                  Secure Checkout
                </p>
                <h3 className="mt-3 text-2xl font-black sm:text-3xl">
                  {selectedPlan.name}
                </h3>
                <p className="mt-2 text-sm text-zinc-300">
                  {resolvedCheckoutPrice.symbol}
                  {resolvedCheckoutPrice.price} / {selectedPlan.duration}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCheckout}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-2xl font-light text-white transition hover:bg-white hover:text-black"
                aria-label="Close checkout"
              >
                ✕
              </button>
            </div>

            {/* STEP: FORM - WAISA HI */}
            {checkoutStep === "form" && (
              <form
                onSubmit={proceedToPayment}
                className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8"
              >
                <label className="sm:col-span-2">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                    Plan Name
                  </span>
                  <input
                    value={selectedPlan.name}
                    readOnly
                    className="h-14 w-full rounded-2xl border border-zinc-200 bg-zinc-100 px-5 text-base font-black text-zinc-950 outline-none"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                    Buying From
                  </span>
                  <select
                    value={checkoutForm.country}
                    onChange={(e) => updateCheckoutField("country", e.target.value)}
                    className="h-14 w-full rounded-2xl border border-zinc-200 bg-white px-5 text-base font-bold text-zinc-950 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                  >
                    {countryOptions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                    Amount Payable
                  </span>
                  <div className="flex h-14 w-full items-center rounded-2xl border border-emerald-300 bg-emerald-50 px-5 text-base font-black text-zinc-950">
                    {resolvedCheckoutPrice.symbol}
                    {resolvedCheckoutPrice.price}
                    <span className="ml-2 text-xs font-bold text-zinc-400">
                      ({resolvedCheckoutPrice.currencyCode})
                    </span>
                  </div>
                </label>

                <label>
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                    Name
                  </span>
                  <input
                    required
                    value={checkoutForm.name}
                    onChange={(e) => updateCheckoutField("name", e.target.value)}
                    className="h-14 w-full rounded-2xl border border-zinc-200 bg-white px-5 text-base font-semibold text-zinc-950 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                    placeholder="Your full name"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                    Age
                  </span>
                  <input
                    required
                    type="number"
                    min="10"
                    value={checkoutForm.age}
                    onChange={(e) => updateCheckoutField("age", e.target.value)}
                    className="h-14 w-full rounded-2xl border border-zinc-200 bg-white px-5 text-base font-semibold text-zinc-950 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                    placeholder="Age"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                    Sex
                  </span>
                  <select
                    required
                    value={checkoutForm.sex}
                    onChange={(e) => updateCheckoutField("sex", e.target.value)}
                    className="h-14 w-full rounded-2xl border border-zinc-200 bg-white px-5 text-base font-bold text-zinc-950 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                <label>
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                    Email ID
                  </span>
                  <input
                    required
                    type="email"
                    value={checkoutForm.email}
                    onChange={(e) => updateCheckoutField("email", e.target.value)}
                    className="h-14 w-full rounded-2xl border border-zinc-200 bg-white px-5 text-base font-semibold text-zinc-950 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                    placeholder="you@example.com"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                    Mobile Number
                  </span>
                  <input
                    required
                    inputMode="tel"
                    value={checkoutForm.mobile}
                    onChange={(e) => updateCheckoutField("mobile", e.target.value)}
                    className="h-14 w-full rounded-2xl border border-zinc-200 bg-white px-5 text-base font-semibold text-zinc-950 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                    placeholder="Mobile number"
                  />
                </label>

                <label className="sm:col-span-2">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                    Description
                  </span>
                  <textarea
                    value={checkoutForm.description}
                    onChange={(e) => updateCheckoutField("description", e.target.value)}
                    className="min-h-[110px] w-full resize-none rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-base font-semibold text-zinc-950 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                    placeholder="Tell us about your current routine, schedule, or preference"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                    Any Past Injury
                  </span>
                  <textarea
                    value={checkoutForm.pastInjury}
                    onChange={(e) => updateCheckoutField("pastInjury", e.target.value)}
                    className="min-h-[96px] w-full resize-none rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-base font-semibold text-zinc-950 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                    placeholder="Mention injuries, pain, or medical conditions"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                    Goal
                  </span>
                  <textarea
                    required
                    value={checkoutForm.goal}
                    onChange={(e) => updateCheckoutField("goal", e.target.value)}
                    className="min-h-[96px] w-full resize-none rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-base font-semibold text-zinc-950 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                    placeholder="Fat loss, muscle gain, athletics, strength, etc."
                  />
                </label>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="flex min-h-[58px] w-full items-center justify-center rounded-2xl bg-zinc-900 px-6 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-emerald-400 hover:text-black sm:w-auto"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </form>
            )}

            {/* STEP: PAYMENT */}
            {checkoutStep === "payment" && (
              <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_0.82fr]">
                <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-6">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
                    Order Generated
                  </p>
                  <h4 className="mt-3 text-3xl font-black text-zinc-950">{orderId}</h4>
                  <div className="mt-6 grid gap-3 text-sm font-semibold text-zinc-600">
                    <p>
                      Plan:{" "}
                      <span className="text-zinc-950">{selectedPlan.name}</span>
                    </p>
                    <p>
                      Buyer:{" "}
                      <span className="text-zinc-950">{checkoutForm.name}</span>
                    </p>
                    <p>
                      Country:{" "}
                      <span className="text-zinc-950">{checkoutForm.country}</span>
                    </p>
                    <p>
                      Amount:{" "}
                      <span className="text-zinc-950">
                        {resolvedCheckoutPrice.symbol}
                        {resolvedCheckoutPrice.price}{" "}
                        <span className="text-xs text-zinc-400">
                          ({resolvedCheckoutPrice.currencyCode})
                        </span>
                      </span>
                    </p>
                  </div>
                </div>

                <div className="rounded-[24px] bg-zinc-900 p-6 text-white">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
                    UPI Payment
                  </p>
                  <h4 className="mt-3 text-2xl font-black">Pay using UPI ID</h4>
                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/10 p-4 text-xl font-black text-emerald-300">
                    {UPI_ID}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-zinc-300">
                    Complete the payment in your UPI app, then tap the button
                    below to confirm your order.
                  </p>

                  <button
                    type="button"
                    onClick={() => setCheckoutStep("success")}
                    className="mt-6 flex min-h-[56px] w-full items-center justify-center rounded-2xl bg-emerald-400 px-5 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-white"
                  >
                    Payment Done
                  </button>

                  <a
                    href={getPlanWhatsappUrl(
                      selectedPlan,
                      resolvedCheckoutPrice.price,
                      resolvedCheckoutPrice.symbol
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex min-h-[52px] w-full items-center justify-center rounded-2xl border border-white/20 px-5 text-sm font-black text-white transition hover:bg-white hover:text-black"
                  >
                    Need Help On WhatsApp
                  </a>
                </div>
              </div>
            )}

            {/* STEP: SUCCESS */}
            {checkoutStep === "success" && (
              <div className="p-8 text-center sm:p-12">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl font-black text-emerald-700">
                  ✓
                </div>
                <h4 className="mt-6 text-3xl font-black text-zinc-950">
                  Payment Successful
                </h4>
                <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-zinc-600">
                  Your order {orderId} has been submitted. Our team will verify
                  the payment and contact you with onboarding details.
                </p>
                <button
                  type="button"
                  onClick={closeCheckout}
                  className="mt-8 min-h-[56px] rounded-2xl bg-zinc-900 px-8 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-emerald-400 hover:text-black"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= FLOATING WHATSAPP ================= */}
      <a
        href={getSimpleWhatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 sm:bottom-5 sm:right-5"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_15px_45px_rgba(37,211,102,0.45)] transition duration-300 hover:scale-105 sm:h-[70px] sm:w-[70px]">
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