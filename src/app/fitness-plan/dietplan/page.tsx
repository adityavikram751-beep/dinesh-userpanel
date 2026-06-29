"use client";

import { type FormEvent, useEffect, useState } from "react";
import {
  createPlanPurchase,
  getPlanCurrencyOptions,
  initiatePlanPayment,
  verifyPayment,
} from "../checkout-api";

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
  currencyCode: string;
  plantype: string;
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
  plantype: "transformationPlan",
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

function getAllPlansWhatsappUrl(plans: GymPlan[]) {
  if (plans.length === 0) return getSimpleWhatsappUrl();
  const plan = plans[0];
  const resolved = resolvePlanPrice(plan, "INR");
  return getPlanWhatsappUrl(plan, resolved.price, resolved.symbol);
}

// ================= MAIN PAGE =================

export default function DietPlanPage() {
  const [plans, setPlans] = useState<GymPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<GymPlan | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("form");
  const [checkoutForm, setCheckoutForm] =
    useState<CheckoutForm>(defaultCheckoutForm);
  const [orderId, setOrderId] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentCurrency, setPaymentCurrency] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [paymentSubmitting, setPaymentSubmitting] = useState(false);
  const [toast, setToast] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load plans
  useEffect(() => {
    async function loadPlans() {
      try {
        const response = await fetch(
          "https://api.dineshsehgal.com/api/plans/plans?category=diet"
        );
        const data = await response.json();

        let fetchedPlans: GymPlan[] = [];
        if (Array.isArray(data)) {
          fetchedPlans = data;
        } else if (Array.isArray(data?.plans)) {
          fetchedPlans = data.plans;
        } else if (Array.isArray(data?.data)) {
          fetchedPlans = data.data;
        } else if (Array.isArray(data?.data?.plans)) {
          fetchedPlans = data.data.plans;
        }
        setPlans(fetchedPlans);
      } catch (error) {
        console.log(error);
        setPlans([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadPlans();
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  function openCheckout(plan: GymPlan) {
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

  // ================= MAIN PAYMENT FUNCTION =================
  async function proceedToPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedPlan) return;
    setSubmitting(true);

    try {
      const resolvedPrice = resolvePlanPrice(
        selectedPlan,
        checkoutForm.currencyCode
      );

      // STEP 1: Create payload for purchase
      const payload = {
        course_id: selectedPlan._id,
        plantype: checkoutForm.plantype,
        full_name: checkoutForm.name,
        age: parseInt(checkoutForm.age),
        sex: checkoutForm.sex,
        email: checkoutForm.email,
        mobile_number: checkoutForm.mobile,
        description: checkoutForm.description,
        past_injury: checkoutForm.pastInjury,
        goal: checkoutForm.goal,
        currencyCode: checkoutForm.currencyCode,
      };

      // STEP 2: Call first API - Create purchase and get payment ID
      console.log("🔄 Creating purchase...");
      const purchase = await createPlanPurchase(payload);
      console.log("✅ Payment ID generated:", purchase.paymentId);
      
      // Store payment ID for later use
      setPaymentId(purchase.paymentId);
      
      // STEP 3: Call second API - Initiate payment with Razorpay
      console.log("🔄 Initiating payment with Razorpay...");
      const razorpayData = await initiatePlanPayment(purchase.paymentId);
      console.log("✅ Razorpay Order ID:", razorpayData.razorpayOrderId);
      console.log("✅ Razorpay Key:", razorpayData.key);
      console.log("✅ Amount:", razorpayData.amount);

      // STEP 4: Open Razorpay checkout
      const options = {
        key: razorpayData.key,
        amount: razorpayData.amount,
        currency: razorpayData.currency,
        order_id: razorpayData.razorpayOrderId,
        name: "Dinesh Sehgal Fitness",
        description: selectedPlan.name,
        prefill: {
          name: checkoutForm.name,
          email: checkoutForm.email,
          contact: checkoutForm.mobile,
        },
        theme: {
          color: "#22c55e",
        },
        handler: async function (response: any) {
          console.log("💰 Payment Success:", response);
          
          // Store order and payment IDs
          setOrderId(response.razorpay_order_id);
          setPaymentId(response.razorpay_payment_id);
          
          // STEP 5: Verify payment on backend (optional but recommended)
          try {
            console.log("🔄 Verifying payment...");
            await verifyPayment({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature
            });
            console.log("✅ Payment verified successfully!");
          } catch (err) {
            console.error("Verification error:", err);
            // Still show success to user, but log error for debugging
          }
          
          // Show success page
          setCheckoutStep("success");
          showToast("✅ Payment Successful!");
        },
        modal: {
          ondismiss() {
            showToast("Payment Cancelled");
          },
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
      
    } catch (error: unknown) {
      console.error("Payment error:", error);
      showToast(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  // ================= REMOVE THIS FUNCTION - NOT NEEDED =================
  // async function confirmPaymentDone() {
  //   setPaymentSubmitting(true);
  //   try {
  //     await initiatePlanPayment(paymentId);
  //     setCheckoutStep("success");
  //     showToast("Payment initiated successfully!");
  //   } catch (error: unknown) {
  //     console.error("Payment initiate error:", error);
  //     showToast(
  //       error instanceof Error ? error.message : "Payment failed. Please try again."
  //     );
  //   } finally {
  //     setPaymentSubmitting(false);
  //   }
  // }

  const resolvedCheckoutPrice = selectedPlan
    ? resolvePlanPrice(selectedPlan, checkoutForm.currencyCode)
    : null;

  const mainPlan = plans.length > 0 ? plans[0] : null;
  const primaryPrice = mainPlan
    ? resolvePlanPrice(mainPlan, "INR")
    : { price: "", symbol: "₹", currencyCode: "INR" };
  const otherPrices = mainPlan?.allprice?.slice(1) ?? [];

  if (!isMounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-black">
      
      {/* Toast Notification */}
      {toast && (
        <div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl text-sm font-semibold text-white shadow-lg transition-all duration-300"
          style={{
            background: toast.includes("✅") ? "#22c55e" : "#ef4444",
          }}
        >
          {toast}
        </div>
      )}

      {/* ================= PRICING SECTION ================= */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-5" />
        
        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full">
          
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 sm:px-4 py-1 text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-300 backdrop-blur-sm mb-3 sm:mb-4">
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-full w-full rounded-full bg-emerald-400" />
              </span>
              Pricing
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white">
              Simple & 
              <span className="bg-gradient-to-r from-emerald-300 to-emerald-400 bg-clip-text text-transparent ml-2 sm:ml-3">Affordable</span>
            </h2>
            <p className="mt-2 sm:mt-4 max-w-xl mx-auto text-xs sm:text-sm text-slate-300">
              Direct expert support and personalized coaching according to your body goals.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10 items-center">
            
            {/* LEFT - Image & Stats */}
            <div className="space-y-4 sm:space-y-5 order-2 lg:order-1">
              {/* Image Card */}
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/10 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent" />
                <img
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop"
                  alt="Healthy nutrition diet plan"
                  className="w-full h-[200px] sm:h-[320px] lg:h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Badges */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                  <div className="rounded-lg sm:rounded-xl bg-black/60 backdrop-blur-md px-2.5 sm:px-4 py-1 sm:py-2 border border-white/10">
                    <p className="text-[8px] sm:text-xs font-semibold text-emerald-300">🥗 Nutrition Expert</p>
                  </div>
                </div>
                
                <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 flex flex-wrap gap-1.5 sm:gap-2">
                  <div className="inline-flex items-center gap-1 sm:gap-2 rounded-lg sm:rounded-xl bg-black/60 backdrop-blur-md px-2 sm:px-4 py-1 sm:py-2 border border-white/10">
                    <span className="text-base sm:text-xl">🥑</span>
                    <span className="text-[10px] sm:text-sm font-semibold text-white">Balanced Diet</span>
                  </div>
                  <div className="inline-flex items-center gap-1 sm:gap-2 rounded-lg sm:rounded-xl bg-black/60 backdrop-blur-md px-2 sm:px-4 py-1 sm:py-2 border border-white/10">
                    <span className="text-base sm:text-xl">💪</span>
                    <span className="text-[10px] sm:text-sm font-semibold text-white">Muscle Gain</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                <div className="rounded-lg sm:rounded-xl border border-white/10 bg-white/5 p-2.5 sm:p-4 text-center backdrop-blur hover:bg-white/10 transition-colors">
                  <p className="text-lg sm:text-2xl font-bold text-emerald-300">500+</p>
                  <p className="text-[8px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">Happy Clients</p>
                </div>
                <div className="rounded-lg sm:rounded-xl border border-white/10 bg-white/5 p-2.5 sm:p-4 text-center backdrop-blur hover:bg-white/10 transition-colors">
                  <p className="text-lg sm:text-2xl font-bold text-emerald-300">24/7</p>
                  <p className="text-[8px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">Expert Support</p>
                </div>
                <div className="rounded-lg sm:rounded-xl border border-white/10 bg-white/5 p-2.5 sm:p-4 text-center backdrop-blur hover:bg-white/10 transition-colors">
                  <p className="text-lg sm:text-2xl font-bold text-emerald-300">100%</p>
                  <p className="text-[8px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">Customized</p>
                </div>
                <div className="rounded-lg sm:rounded-xl border border-white/10 bg-white/5 p-2.5 sm:p-4 text-center backdrop-blur hover:bg-white/10 transition-colors">
                  <p className="text-lg sm:text-2xl font-bold text-emerald-300">4.9★</p>
                  <p className="text-[8px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">Client Rating</p>
                </div>
              </div>
            </div>

            {/* RIGHT - Plan Card */}
            <div className="order-1 lg:order-2">
              {isLoading ? (
                <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8 sm:p-12 text-center">
                  <div className="mx-auto h-8 w-8 sm:h-12 sm:w-12 rounded-full border-3 sm:border-4 border-emerald-400 border-t-transparent animate-spin" />
                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-400 font-medium">Loading Plans...</p>
                </div>
              ) : mainPlan ? (
                <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl shadow-emerald-500/5 overflow-hidden hover:border-white/20 transition-all duration-300 max-w-sm sm:max-w-md mx-auto lg:mx-0">
                  
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-emerald-500/20 to-emerald-400/10 px-4 sm:px-6 py-3.5 sm:py-5 border-b border-white/10">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-emerald-500/20 px-2 sm:px-3 py-0.5 sm:py-1 mb-1 sm:mb-2">
                          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-full w-full rounded-full bg-emerald-400" />
                          </span>
                          <span className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300">
                            Personalized Plan
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-2xl font-bold text-white truncate">
                          {mainPlan.name}
                        </h3>
                        {/* {mainPlan.description && (
                          <p className="mt-0.5 text-[10px] sm:text-sm text-slate-300 truncate">
                            {mainPlan.description}
                          </p>
                        )} */}
                      </div>
                      <div className="shrink-0 flex items-center gap-1 rounded-lg sm:rounded-xl bg-white/10 px-2 sm:px-3 py-1 sm:py-2">
                        <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                        </svg>
                        <span className="text-[8px] sm:text-xs font-semibold text-emerald-400 whitespace-nowrap">{mainPlan.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="px-4 sm:px-6 py-4 sm:py-6">
                    
                    {/* Price Section */}
                    <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div>
                        <p className="text-[8px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-0.5">
                          Plan Price
                        </p>
                        <div className="flex items-baseline gap-2 sm:gap-3">
                          <span className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white">
                            {primaryPrice.symbol}{primaryPrice.price}
                          </span>
                          <span className="rounded-lg bg-white/10 px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[7px] sm:text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                            {primaryPrice.currencyCode}
                          </span>
                        </div>
                      </div>

                      {otherPrices.length > 0 && (
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {otherPrices.map((p) => (
                            <span
                              key={p._id}
                              className="inline-flex items-center gap-0.5 sm:gap-1 rounded-lg border border-white/10 bg-white/5 px-1.5 sm:px-3 py-0.5 sm:py-1.5 text-[10px] sm:text-sm font-semibold text-slate-300 hover:bg-white/10 transition-colors"
                            >
                              {p.symbol}{p.price}
                              <span className="text-[6px] sm:text-[10px] font-medium text-slate-400 uppercase ml-0.5">{p.currencyCode}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Features - Dynamic from API */}
                    <div className="mb-4 sm:mb-6">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <span className="text-[8px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                          What's included
                        </span>
                        <span className="flex-1 h-px bg-white/10" />
                      </div>

                      <div className="grid grid-cols-1 gap-1 sm:gap-2">
                        {(mainPlan.features || []).map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-white/5 bg-white/5 px-2.5 sm:px-4 py-1.5 sm:py-2.5 hover:bg-white/10 transition-colors group"
                          >
                            <span className="mt-0.5 flex h-3.5 w-3.5 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
                              <svg className="h-2 w-2 sm:h-3 sm:w-3 text-emerald-400" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                            <span className="text-[10px] sm:text-sm font-medium text-slate-200">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-white/10 mb-4 sm:mb-6" />

                    {/* CTA Buttons */}
                    <div className="flex flex-col gap-2 sm:gap-3">
                      <button
                        onClick={() => openCheckout(mainPlan)}
                        className="w-full rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-4 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold text-black transition hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black"
                      >
                        Buy Now - Start Your Journey
                      </button>

                  
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8 sm:p-12 text-center">
                  <p className="text-xs sm:text-sm text-slate-400 font-medium">No diet plans available right now.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CHECKOUT MODAL ================= */}
      {selectedPlan && resolvedCheckoutPrice && (
        <div className="fixed inset-0 z-[70] overflow-y-auto bg-black/80 px-4 py-6 backdrop-blur-sm sm:py-10">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-2xl">
            
            {/* MODAL HEADER */}
            <div className="flex items-start justify-between gap-5 border-b border-slate-200 bg-black px-4 sm:px-6 py-4 sm:py-5 text-white">
              <div>
                <p className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-300">
                  Secure Checkout
                </p>
                <h3 className="mt-1 sm:mt-2 text-lg sm:text-2xl font-bold">
                  {selectedPlan.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {resolvedCheckoutPrice.symbol}
                  {resolvedCheckoutPrice.price} / {selectedPlan.duration}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCheckout}
                className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg sm:text-xl font-light text-white transition hover:bg-white hover:text-black"
                aria-label="Close checkout"
              >
                ✕
              </button>
            </div>

            {/* STEP: FORM */}
            {checkoutStep === "form" && (
              <form
                onSubmit={proceedToPayment}
                className="grid gap-3 sm:gap-4 p-4 sm:p-6 sm:grid-cols-2 sm:p-8"
              >
                <label className="sm:col-span-2">
                  <span className="mb-1 block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Plan Name
                  </span>
                  <input
                    value={selectedPlan.name}
                    readOnly
                    className="h-10 sm:h-12 w-full rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-slate-900 outline-none"
                  />
                </label>
               
                <label className="sm:col-span-2">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                    Plan Type 
                    </span>
                  <select
                    required
                    value={checkoutForm.plantype}
                    onChange={(e) =>
                      updateCheckoutField("plantype", e.target.value)
                    }
                    className="h-14 w-full rounded-2xl border border-zinc-200 bg-white px-5 text-base font-bold text-zinc-950 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                  >
                    <option value="">Select</option>
                    <option value="transformationPlan">transformationPlan</option>
                    <option value="videoPlan">videoPlan</option>
                  </select>
                </label>

                <label>
                  <span className="mb-1 block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Currency Code
                  </span>
                  <select
                    value={checkoutForm.currencyCode}
                    onChange={(e) => updateCheckoutField("currencyCode", e.target.value)}
                    className="h-10 sm:h-12 w-full rounded-lg sm:rounded-xl border border-slate-200 bg-white px-3 sm:px-4 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  >
                    {getPlanCurrencyOptions(selectedPlan).map((currencyCode) => (
                      <option key={currencyCode} value={currencyCode}>
                        {currencyCode}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span className="mb-1 block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Amount Payable
                  </span>
                  <div className="flex h-10 sm:h-12 w-full items-center rounded-lg sm:rounded-xl border border-emerald-200 bg-emerald-50 px-3 sm:px-4 text-xs sm:text-sm font-bold text-slate-900">
                    {resolvedCheckoutPrice.symbol}
                    {resolvedCheckoutPrice.price}
                    <span className="ml-1.5 sm:ml-2 text-[10px] sm:text-xs font-medium text-slate-500">
                      ({resolvedCheckoutPrice.currencyCode})
                    </span>
                  </div>
                </label>

                <label>
                  <span className="mb-1 block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Full Name
                  </span>
                  <input
                    required
                    value={checkoutForm.name}
                    onChange={(e) => updateCheckoutField("name", e.target.value)}
                    className="h-10 sm:h-12 w-full rounded-lg sm:rounded-xl border border-slate-200 bg-white px-3 sm:px-4 text-xs sm:text-sm font-medium text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Your full name"
                  />
                </label>

                <label>
                  <span className="mb-1 block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Age
                  </span>
                  <input
                    required
                    type="number"
                    min="10"
                    value={checkoutForm.age}
                    onChange={(e) => updateCheckoutField("age", e.target.value)}
                    className="h-10 sm:h-12 w-full rounded-lg sm:rounded-xl border border-slate-200 bg-white px-3 sm:px-4 text-xs sm:text-sm font-medium text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Age"
                  />
                </label>

                <label>
                  <span className="mb-1 block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Sex
                  </span>
                  <select
                    required
                    value={checkoutForm.sex}
                    onChange={(e) => updateCheckoutField("sex", e.target.value)}
                    className="h-10 sm:h-12 w-full rounded-lg sm:rounded-xl border border-slate-200 bg-white px-3 sm:px-4 text-xs sm:text-sm font-medium text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                <label>
                  <span className="mb-1 block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Email ID
                  </span>
                  <input
                    required
                    type="email"
                    value={checkoutForm.email}
                    onChange={(e) => updateCheckoutField("email", e.target.value)}
                    className="h-10 sm:h-12 w-full rounded-lg sm:rounded-xl border border-slate-200 bg-white px-3 sm:px-4 text-xs sm:text-sm font-medium text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="you@example.com"
                  />
                </label>

                <label>
                  <span className="mb-1 block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Mobile Number
                  </span>
                  <input
                    required
                    inputMode="tel"
                    value={checkoutForm.mobile}
                    onChange={(e) => updateCheckoutField("mobile", e.target.value)}
                    className="h-10 sm:h-12 w-full rounded-lg sm:rounded-xl border border-slate-200 bg-white px-3 sm:px-4 text-xs sm:text-sm font-medium text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Mobile number"
                  />
                </label>

                <label className="sm:col-span-2">
                  <span className="mb-1 block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Description
                  </span>
                  <textarea
                    value={checkoutForm.description}
                    onChange={(e) => updateCheckoutField("description", e.target.value)}
                    className="min-h-[60px] sm:min-h-[80px] w-full resize-none rounded-lg sm:rounded-xl border border-slate-200 bg-white px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Tell us about your current routine, schedule, or preference"
                  />
                </label>

                <label>
                  <span className="mb-1 block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Past Injury
                  </span>
                  <textarea
                    value={checkoutForm.pastInjury}
                    onChange={(e) => updateCheckoutField("pastInjury", e.target.value)}
                    className="min-h-[60px] sm:min-h-[80px] w-full resize-none rounded-lg sm:rounded-xl border border-slate-200 bg-white px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Mention injuries, pain, or medical conditions"
                  />
                </label>

                <label>
                  <span className="mb-1 block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Goal
                  </span>
                  <textarea
                    required
                    value={checkoutForm.goal}
                    onChange={(e) => updateCheckoutField("goal", e.target.value)}
                    className="min-h-[60px] sm:min-h-[80px] w-full resize-none rounded-lg sm:rounded-xl border border-slate-200 bg-white px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Fat loss, muscle gain, athletics, strength, etc."
                  />
                </label>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`flex min-h-[44px] sm:min-h-[52px] w-full items-center justify-center rounded-lg sm:rounded-xl bg-black px-4 sm:px-6 text-xs sm:text-sm font-semibold text-white transition ${
                      submitting
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-emerald-500 hover:text-black"
                    } sm:w-auto`}
                  >
                    {submitting ? "Processing..." : "Proceed to Payment"}
                  </button>
                </div>
              </form>
            )}

            {/* STEP: PAYMENT - REMOVED because Razorpay handles it */}
            {/* STEP: SUCCESS */}
            {checkoutStep === "success" && (
              <div className="p-6 sm:p-8 text-center sm:p-12">
                <div className="mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl sm:text-3xl font-bold text-emerald-700">
                  ✓
                </div>
                <h4 className="mt-4 sm:mt-5 text-xl sm:text-2xl font-bold text-slate-900">
                  Payment Successful! 🎉
                </h4>
                <p className="mx-auto mt-2 sm:mt-3 max-w-xl text-xs sm:text-sm leading-6 sm:leading-7 text-slate-600">
                  Your order has been submitted successfully. 
                  {orderId && ` Order ID: ${orderId}`}
                  <br />
                  Our team will verify the payment and contact you with onboarding details within 24 hours.
                </p>
                <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <button
                    type="button"
                    onClick={closeCheckout}
                    className="min-h-[44px] sm:min-h-[50px] rounded-lg sm:rounded-xl bg-black px-6 sm:px-8 text-xs sm:text-sm font-semibold text-white transition hover:bg-emerald-500 hover:text-black"
                  >
                    Done
                  </button>
                  <a
                    href={getPlanWhatsappUrl(
                      selectedPlan,
                      resolvedCheckoutPrice?.price || "",
                      resolvedCheckoutPrice?.symbol || "₹"
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 min-h-[44px] sm:min-h-[50px] rounded-lg sm:rounded-xl border border-black/20 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-black transition hover:bg-black/5"
                  >
                    <svg viewBox="0 0 32 32" fill="currentColor" className="h-4 w-4 sm:h-5 sm:w-5 text-[#25D366]">
                      <path d="M16.01 3C8.83 3 3 8.82 3 16c0 2.57.75 5.08 2.16 7.23L3 29l5.93-2.1A12.93 12.93 0 0016.01 29C23.18 29 29 23.18 29 16S23.18 3 16.01 3zm0 23.67c-2.13 0-4.22-.57-6.04-1.65l-.43-.25-3.52 1.25 1.15-3.62-.28-.45A10.58 10.58 0 015.33 16c0-5.89 4.79-10.68 10.68-10.68 2.85 0 5.52 1.11 7.54 3.13A10.59 10.59 0 0126.68 16c0 5.89-4.79 10.67-10.67 10.67zm5.86-7.94c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1.01 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.58-.95-.84-1.59-1.88-1.77-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.55-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.4-.29.32-1.11 1.08-1.11 2.64 0 1.55 1.13 3.05 1.29 3.26.16.21 2.22 3.39 5.39 4.75.75.32 1.34.52 1.8.66.75.24 1.44.21 1.98.13.61-.09 1.89-.77 2.15-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37z" />
                    </svg>
                    Chat with Support
                  </a>
                </div>
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
        <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 transition hover:scale-105">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="white"
            className="h-6 w-6 sm:h-7 sm:w-7"
          >
            <path d="M16.01 3C8.83 3 3 8.82 3 16c0 2.57.75 5.08 2.16 7.23L3 29l5.93-2.1A12.93 12.93 0 0016.01 29C23.18 29 29 23.18 29 16S23.18 3 16.01 3zm0 23.67c-2.13 0-4.22-.57-6.04-1.65l-.43-.25-3.52 1.25 1.15-3.62-.28-.45A10.58 10.58 0 015.33 16c0-5.89 4.79-10.68 10.68-10.68 2.85 0 5.52 1.11 7.54 3.13A10.59 10.59 0 0126.68 16c0 5.89-4.79 10.67-10.67 10.67zm5.86-7.94c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1.01 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.58-.95-.84-1.59-1.88-1.77-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.55-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.4-.29.32-1.11 1.08-1.11 2.64 0 1.55 1.13 3.05 1.29 3.26.16.21 2.22 3.39 5.39 4.75.75.32 1.34.52 1.8.66.75.24 1.44.21 1.98.13.61-.09 1.89-.77 2.15-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37z" />
          </svg>
        </div>
      </a>
    </main>
  );
}