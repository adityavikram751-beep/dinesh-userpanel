

"use client";

import { type FormEvent, useEffect, useState } from "react";
import {
  createPlanPurchase,
  getPlanCurrencyOptions,
  initiatePlanPayment,
} from "../checkout-api";

// ================= TYPES =================

type PriceEntry = {
  currencyCode: string;
  price: number;
  symbol: string;
  _id: string;
};

type VideoPlan = {
  _id: string;
  title: string;
  price?: number | string;
  currencyCode?: string;
  allprice?: PriceEntry[];
  duration: string;
  description?: string;
  features?: string[];
  createdAt?: string;
  updatedAt?: string;
};

type CheckoutStep = "form" | "payment" | "success";

type CheckoutForm = {
  currencyCode: string;
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
  currencyCode: "INR",
  name: "",
  age: "",
  sex: "",
  email: "",
  mobile: "",
  description: "",
  pastInjury: "",
  goal: "",
};

// ================= HELPERS =================

function getCurrencySymbol(currencyCode?: string): string {
  if (!currencyCode) return "₹";
  switch (currencyCode.toUpperCase()) {
    case "GBP":
      return "£";
    case "USD":
      return "$";
    case "EUR":
      return "€";
    default:
      return "₹";
  }
}

function resolvePlanPrice(
  plan: VideoPlan,
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

// ================= WHATSAPP HELPERS =================

function getSimpleWhatsappUrl() {
  const message = `Hi DineshSehgal! 👋

I want to start my fitness transformation journey.

Please guide me about:
✅ Available Plans
✅ Pricing
✅ Diet Plan
✅ Workout Details

Thank you 🙌`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function getPlanWhatsappUrl(
  plan: VideoPlan,
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

I want this consultation plan.

📹 Plan Name:
${plan.title}

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

// ================= WHAT YOU GET FEATURES =================

const whatYouGetFeatures = [
  {
    title: "1-on-1 Personal Coaching",
    desc: "Personalized attention for your fitness goals",
  },
  {
    title: "Daily Monitoring",
    desc: "Track your progress every single day",
  },
  {
    title: "Custom Meal Adjustments",
    desc: "Meal plans tailored to your body needs",
  },
  {
    title: "Live Video Sessions",
    desc: "Real-time coaching and form correction",
  },
  {
    title: "Direct Personal Support",
    desc: "Get your questions answered instantly",
  },
  {
    title: "Fast Response Priority",
    desc: "Quick responses whenever you need help",
  },
  {
    title: "Full Lifestyle Management",
    desc: "Complete holistic fitness approach",
  },
];

// ================= MAIN PAGE =================

export default function ConsultationPage() {
  const [videoPlans, setVideoPlans] = useState<VideoPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<VideoPlan | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("form");
  const [checkoutForm, setCheckoutForm] =
    useState<CheckoutForm>(defaultCheckoutForm);
  const [orderId, setOrderId] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentCurrency, setPaymentCurrency] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [paymentSubmitting, setPaymentSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // ================= LOAD PLANS =================

  useEffect(() => {
    async function loadPlans() {
      try {
        const res = await fetch(
          `https://dinesh-sagel-backend.onrender.com/api/video-plans`
        );
        const data = await res.json();

        if (Array.isArray(data)) {
          setVideoPlans(data);
        } else if (Array.isArray(data?.videoPlans)) {
          setVideoPlans(data.videoPlans);
        } else if (Array.isArray(data?.videoplans)) {
          setVideoPlans(data.videoplans);
        } else if (Array.isArray(data?.plans)) {
          setVideoPlans(data.plans);
        } else if (Array.isArray(data?.data)) {
          setVideoPlans(data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadPlans();
  }, []);

  // ================= CHECKOUT FUNCTIONS =================

  function openCheckout(plan: VideoPlan) {
    setSelectedPlan(plan);
    setCheckoutStep("form");
    setCheckoutForm(defaultCheckoutForm);
    setOrderId("");
    setPaymentId("");
    setPaymentAmount("");
    setPaymentCurrency("");
  }

  function closeCheckout() {
    setSelectedPlan(null);
    setCheckoutStep("form");
    setOrderId("");
    setPaymentId("");
    setPaymentAmount("");
    setPaymentCurrency("");
  }

  function updateCheckoutField(field: keyof CheckoutForm, value: string) {
    setCheckoutForm((prev) => ({ ...prev, [field]: value }));
  }

  async function proceedToPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedPlan || !resolvedCheckoutPrice) return;

    setSubmitting(true);
    try {
      const purchase = await createPlanPurchase({
        course_id: selectedPlan._id,
        full_name: checkoutForm.name,
        age: Number(checkoutForm.age),
        sex: checkoutForm.sex,
        email: checkoutForm.email,
        mobile_number: checkoutForm.mobile,
        description: checkoutForm.description,
        past_injury: checkoutForm.pastInjury,
        goal: checkoutForm.goal,
        currencyCode: checkoutForm.currencyCode,
      });

      setPaymentId(purchase.paymentId);
      setOrderId(purchase.paymentId);
      setPaymentAmount(purchase.amount ?? String(resolvedCheckoutPrice.price));
      setPaymentCurrency(
        purchase.currency ?? resolvedCheckoutPrice.currencyCode
      );
      setCheckoutStep("payment");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  async function confirmPaymentDone() {
    setPaymentSubmitting(true);
    try {
      await initiatePlanPayment(paymentId);
      setCheckoutStep("success");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Payment failed.");
    } finally {
      setPaymentSubmitting(false);
    }
  }

  const resolvedCheckoutPrice = selectedPlan
    ? resolvePlanPrice(selectedPlan, checkoutForm.currencyCode)
    : null;

  // ================= UI =================

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f5f5] text-zinc-900">
      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-[#0b0f0d] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#07130d] via-[#0b0f0d] to-[#101010]" />
        <div className="absolute -left-24 top-0 h-[320px] w-[320px] rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-emerald-400/10 blur-3xl" />

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
              Get direct expert fitness guidance for fat loss, muscle building,
              nutrition planning, workout structure and complete body
              transformation.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={getSimpleWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-2xl bg-emerald-400 px-7 py-4 text-sm font-black text-black shadow-[0_15px_40px_rgba(52,211,153,0.35)] transition duration-300 hover:scale-105 hover:bg-emerald-300 sm:text-base"
              >
                Book Consultation
              </a>
            </div>

            {/* STATS */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
                <h3 className="text-3xl font-black">30</h3>
                <p className="mt-1 text-xs text-zinc-300 sm:text-sm">
                  Minutes
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
                <h3 className="text-3xl font-black">1:1</h3>
                <p className="mt-1 text-xs text-zinc-300 sm:text-sm">
                  Coaching
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
                <h3 className="text-3xl font-black">24/7</h3>
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

            <div className="absolute bottom-5 left-5 rounded-3xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
              <p className="text-sm text-zinc-300">Trusted By</p>
              <h3 className="mt-1 text-3xl font-black">500+ Clients</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT YOU'LL GET — CLEAN, NO ICONS, NO NUMBERS, NO LINES ================= */}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-600 backdrop-blur-sm mb-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Benefits
          </div>
          <h2 className="text-4xl font-black sm:text-5xl lg:text-6xl">
            What You'll <span className="text-emerald-500">Get</span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-zinc-600 sm:text-lg">
            Premium personalized coaching designed to help you achieve real
            fitness transformation.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whatYouGetFeatures.map((item) => (
            <div
              key={item.title}
              className="group relative rounded-2xl bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >
              {/* Clean minimal card — just title + description */}
              <h3 className="text-lg font-black leading-tight text-zinc-900 transition-colors duration-300 group-hover:text-emerald-600">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PRICING SECTION ================= */}

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[42px] bg-[#0f1110] text-white shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            {/* LEFT */}
            <div className="p-6 sm:p-8 lg:p-14">
              <p className="text-sm font-black uppercase tracking-[0.28em] text-emerald-300">
                Pricing
              </p>
              <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Simple &
                <br />
                Affordable
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg sm:leading-9">
                Direct expert support and personalized coaching according to
                your body goals.
              </p>
            </div>

            {/* RIGHT - Single Card */}
            <div className="p-6 sm:p-8 lg:p-14">
              {loading ? (
                <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 text-center">
                  <div className="mx-auto h-10 w-10 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin" />
                  <p className="mt-4 text-sm text-zinc-400">Loading Plans...</p>
                </div>
              ) : videoPlans.length > 0 ? (
                videoPlans.map((plan) => {
                  const primaryPrice = plan.allprice?.[0] ?? {
                    symbol: getCurrencySymbol(plan.currencyCode),
                    price: plan.price ?? "",
                    currencyCode: plan.currencyCode ?? "INR",
                  };
                  const otherPrices = plan.allprice?.slice(1) ?? [];

                  return (
                    <div
                      key={plan._id}
                      className="rounded-[32px] border border-white/10 bg-white/5 p-7 backdrop-blur transition duration-300 hover:scale-[1.02] hover:border-emerald-400"
                    >
                      <div className="flex flex-col gap-4">
                        <div>
                          {/* Plan Title - made BIG */}
                          <p className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
                            {plan.title}
                          </p>

                          {/* Primary Price (INR) */}
                          <div className="mt-3 flex items-baseline gap-3">
                            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black">
                              {primaryPrice.symbol}
                              {primaryPrice.price}
                            </h3>
                            <span className="rounded-full bg-emerald-400/20 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-300 border border-emerald-400/30">
                              {primaryPrice.currencyCode}
                            </span>
                          </div>

                          {/* Other Currencies - bigger and more prominent */}
                          {otherPrices.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-4">
                              {otherPrices.map((p) => (
                                <span
                                  key={p._id}
                                  className="inline-flex items-center gap-1 rounded-full bg-white/10 px-4 py-2 text-base sm:text-lg font-bold text-zinc-200 border border-white/20"
                                >
                                  {p.symbol}
                                  {p.price}
                                  <span className="text-xs font-medium text-zinc-400 uppercase ml-1">
                                    {p.currencyCode}
                                  </span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="rounded-2xl bg-emerald-400/20 border border-emerald-400/30 px-4 py-2 sm:px-5 sm:py-3 text-sm font-black text-emerald-300 self-start whitespace-nowrap">
                          ⏱ {plan.duration || "30 MIN"}
                        </div>

                        {/* BOOK BUTTON */}
                        <button
                          onClick={() => openCheckout(plan)}
                          className="mt-2 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-6 py-4 text-sm font-black text-black shadow-lg shadow-emerald-500/30 transition duration-300 hover:scale-[1.02] hover:shadow-emerald-500/50"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 text-center">
                  <p className="text-zinc-400">No plans available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CHECKOUT MODAL ================= */}
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
                  {selectedPlan.title}
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

            {/* STEP: FORM */}
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
                    value={selectedPlan.title}
                    readOnly
                    className="h-14 w-full rounded-2xl border border-zinc-200 bg-zinc-100 px-5 text-base font-black text-zinc-950 outline-none"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                    Currency Code
                  </span>
                  <select
                    value={checkoutForm.currencyCode}
                    onChange={(e) =>
                      updateCheckoutField("currencyCode", e.target.value)
                    }
                    className="h-14 w-full rounded-2xl border border-zinc-200 bg-white px-5 text-base font-bold text-zinc-950 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                  >
                    {getPlanCurrencyOptions(selectedPlan).map((currencyCode) => (
                      <option key={currencyCode} value={currencyCode}>
                        {currencyCode}
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
                    onChange={(e) =>
                      updateCheckoutField("name", e.target.value)
                    }
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
                    onChange={(e) =>
                      updateCheckoutField("age", e.target.value)
                    }
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
                    onChange={(e) =>
                      updateCheckoutField("sex", e.target.value)
                    }
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
                    onChange={(e) =>
                      updateCheckoutField("email", e.target.value)
                    }
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
                    onChange={(e) =>
                      updateCheckoutField("mobile", e.target.value)
                    }
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
                    onChange={(e) =>
                      updateCheckoutField("description", e.target.value)
                    }
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
                    onChange={(e) =>
                      updateCheckoutField("pastInjury", e.target.value)
                    }
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
                    onChange={(e) =>
                      updateCheckoutField("goal", e.target.value)
                    }
                    className="min-h-[96px] w-full resize-none rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-base font-semibold text-zinc-950 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                    placeholder="Fat loss, muscle gain, athletics, strength, etc."
                  />
                </label>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex min-h-[58px] w-full items-center justify-center rounded-2xl bg-zinc-900 px-6 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-emerald-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {submitting ? "Creating Payment..." : "Proceed to Payment"}
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
                  <h4 className="mt-3 text-3xl font-black text-zinc-950">
                    {orderId}
                  </h4>
                  <div className="mt-6 grid gap-3 text-sm font-semibold text-zinc-600">
                    <p>
                      Plan:{" "}
                      <span className="text-zinc-950">
                        {selectedPlan.title}
                      </span>
                    </p>
                    <p>
                      Buyer:{" "}
                      <span className="text-zinc-950">
                        {checkoutForm.name}
                      </span>
                    </p>
                    <p>
                      Currency:{" "}
                      <span className="text-zinc-950">
                        {paymentCurrency || resolvedCheckoutPrice.currencyCode}
                      </span>
                    </p>
                    <p>
                      Amount:{" "}
                      <span className="text-zinc-950">
                        {getCurrencySymbol(
                          paymentCurrency || resolvedCheckoutPrice.currencyCode
                        )}
                        {paymentAmount || resolvedCheckoutPrice.price}{" "}
                        <span className="text-xs text-zinc-400">
                          ({paymentCurrency || resolvedCheckoutPrice.currencyCode})
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
                    onClick={confirmPaymentDone}
                    disabled={paymentSubmitting}
                    className="mt-6 flex min-h-[56px] w-full items-center justify-center rounded-2xl bg-emerald-400 px-5 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {paymentSubmitting ? "Confirming..." : "Payment Done"}
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
        className="fixed bottom-5 right-5 z-50"
      >
        <div className="flex h-[60px] w-[60px] sm:h-[70px] sm:w-[70px] items-center justify-center rounded-full bg-[#25D366] shadow-[0_15px_45px_rgba(37,211,102,0.45)] transition duration-300 hover:scale-105">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="white"
            className="h-8 w-8 sm:h-9 sm:w-9"
          >
            <path d="M16.01 3C8.83 3 3 8.82 3 16c0 2.57.75 5.08 2.16 7.23L3 29l5.93-2.1A12.93 12.93 0 0016.01 29C23.18 29 29 23.18 29 16S23.18 3 16.01 3zm0 23.67c-2.13 0-4.22-.57-6.04-1.65l-.43-.25-3.52 1.25 1.15-3.62-.28-.45A10.58 10.58 0 015.33 16c0-5.89 4.79-10.68 10.68-10.68 2.85 0 5.52 1.11 7.54 3.13A10.59 10.59 0 0126.68 16c0 5.89-4.79 10.67-10.67 10.67zm5.86-7.94c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1.01 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.58-.95-.84-1.59-1.88-1.77-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.55-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.4-.29.32-1.11 1.08-1.11 2.64 0 1.55 1.13 3.05 1.29 3.26.16.21 2.22 3.39 5.39 4.75.75.32 1.34.52 1.8.66.75.24 1.44.21 1.98.13.61-.09 1.89-.77 2.15-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37z" />
          </svg>
        </div>
      </a>
    </main>
  );
}
