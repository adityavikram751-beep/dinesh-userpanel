"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const BANNERS_API = "/api/homepage-banners";
const API_ORIGIN = "https://dinesh-sagel-backend.onrender.com";
const WHATSAPP_NUMBER = "8585986111";

function getWhatsappUrl(plan?: string) {
  const message = plan
    ? `Hi DineshSehgal! 👋\n\nI'm interested in the *${plan}* plan.\n\nPlease share more details about:\n✅ Pricing\n✅ Duration\n✅ What's included\n\nLooking forward to hearing from you!`
    : `Hi DineshSehgal! 👋\n\nI want to start my fitness transformation journey.\n\nPlease guide me about:\n✅ Available Plans\n✅ Pricing\n✅ How to get started\n\nLooking forward to hearing from you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const defaultHeroBanner = {
  title: "",
  image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2400&auto=format&fit=crop",
};

const defaultTransformations = [
  {
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200&auto=format&fit=crop",
    name: "Weight Loss Success Story",
    result: "-18 KG Fat Loss",
    desc: "An inspiring transformation achieved through personalized coaching, strength training, and a calorie-controlled nutrition plan. The client successfully reduced excess body fat while improving overall health, confidence, and physical performance.",
    duration: "4 MONTHS",
  },
  {
    image: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=1200&auto=format&fit=crop",
    name: "3 Month Body Transformation",
    result: "12 Week Transformation",
    desc: "From gaining strength to improving overall fitness, this incredible 3-month transformation shows what consistency, proper nutrition, and a personalized workout plan can achieve. With regular training and expert guidance, the client reduced body fat, increased lean muscle, and built healthier lifestyle habits.",
    duration: "3 MONTHS",
  },
  {
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    name: "Rohit Singh",
    result: "12 Week Transformation",
    desc: "Incredible body transformation through customized workout, nutrition and expert coaching.",
    duration: "12 WEEKS",
  },
  {
    image: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1200&auto=format&fit=crop",
    name: "Vikas Yadav",
    result: "Complete Body Recomp",
    desc: "Incredible body transformation through customized workout, nutrition and expert coaching.",
    duration: "12 WEEKS",
  },
];

type Transformation = (typeof defaultTransformations)[number];

type BannerApiItem = Record<string, unknown>;

function getString(item: BannerApiItem, keys: string[]) {
  for (const key of keys) {
    const value = item[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function getBannerItems(payload: unknown): BannerApiItem[] {
  if (Array.isArray(payload)) return payload.filter(Boolean);
  if (!payload || typeof payload !== "object") return [];
  const data = payload as Record<string, unknown>;
  for (const key of ["value", "data", "banners", "results", "items"]) {
    const value = data[key];
    if (Array.isArray(value)) return value.filter(Boolean);
  }
  return [];
}

function toImageUrl(image: string) {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  return `${API_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`;
}

function bannerText(item: BannerApiItem) {
  return ["bannerfor", "section", "type", "category", "title", "heading", "name"]
    .map((key) => getString(item, [key]))
    .join(" ")
    .toLowerCase();
}

function isHeroBanner(item: BannerApiItem) {
  const text = bannerText(item);
  return text.includes("hero") || text.includes("home") || text.includes("main banner");
}

function isTransformationBanner(item: BannerApiItem) {
  const text = bannerText(item);
  return (
    text.includes("transformation") ||
    text.includes("lifestyle") ||
    text.includes("result") ||
    Boolean(getString(item, ["result", "clientResult", "client_result"]))
  );
}

function mapHeroBanner(item: BannerApiItem) {
  return {
    title: getString(item, ["title", "heading", "name"]) || defaultHeroBanner.title,
    image:
      toImageUrl(getString(item, ["image", "imageUrl", "image_url", "bannerImage", "banner_image", "desktopImage", "desktop_image", "photo", "thumbnail"])) ||
      defaultHeroBanner.image,
  };
}

function mapTransformation(item: BannerApiItem, index: number) {
  const fallback = defaultTransformations[index % defaultTransformations.length];
  const rawDuration = getString(item, ["duration", "Duration", "time", "weeks", "period", "timeframe"]);
  const duration = rawDuration
    ? /^\d+$/.test(rawDuration) ? `${rawDuration} WEEKS` : rawDuration.toUpperCase()
    : fallback.duration;
  return {
    image: toImageUrl(getString(item, ["image", "imageUrl", "image_url", "bannerImage", "banner_image", "photo", "thumbnail"])) || fallback.image,
    name: getString(item, ["name", "clientName", "client_name", "title"]) || fallback.name,
    result: getString(item, ["result", "clientResult", "client_result", "heading"]) || fallback.result,
    desc: getString(item, ["description", "desc", "subTitle", "subtitle"]) || fallback.desc,
    duration,
  };
}

const servicePlans = [
  {
    title: "Online Coaching",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    desc: "Customized workout plans to build muscle, burn fat, and stay consistent designed for your goals.",
    href: "/fitness-plan",
  },
  {
    title: "Customized Nutrition",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
    desc: "Get a personalized meal plan with the right macros, vitamins, and meal timing.",
    href: "/fitness-plan/dietplan",
  },
  {
    title: "1-1 VIP Training",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    desc: "Exclusive 1-on-1 coaching with expert guidance, accountability and support.",
    href: "/fitness-plan/consultation",
  },
];

// ================= TRANSFORMATIONS SECTION =================
function TransformationsSection({ transformations }: { transformations: Transformation[] }) {
  return (
    <section className="bg-gradient-to-b from-[#fffaf5] to-[#f8f7ff] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <p className="inline-flex rounded-full border border-[#ff8c42]/20 bg-[#ff8c42]/10 px-5 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#ff8c42] sm:text-[11px]">REAL CLIENT RESULTS</p>
          <h2 className="mt-6 text-[34px] font-black leading-tight text-[#111] sm:text-5xl lg:text-7xl">Successful Lifestyle<br />Transformation</h2>
          <p className="mx-auto mt-6 max-w-3xl text-[14px] leading-7 text-[#666] sm:text-[18px] sm:leading-9">
            Real people. Real fat loss. Real body transformations through consistency, nutrition and expert coaching.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {transformations.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="group flex flex-col overflow-hidden rounded-[32px] border border-[#eee] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-3 hover:border-[#ff8c42]/30 hover:shadow-[0_20px_70px_rgba(255,140,66,0.18)]"
            >
              {/* Image — fixed aspect ratio */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#111] sm:aspect-[3/4] flex-shrink-0">
                <img
                  src={item.image}
                  alt=""
                  className="h-full w-full object-contain object-center transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 shadow-lg backdrop-blur">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff8c42]">VERIFIED</p>
                </div>
                <div className="absolute bottom-5 left-5">
                  <div className="rounded-2xl border border-white/20 bg-white/15 px-5 py-3 backdrop-blur-xl">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#ffd2b1]">TRANSFORMATION</p>
                    <h3 className="mt-2 text-[22px] font-black text-white">{item.result}</h3>
                  </div>
                </div>
              </div>

              {/* Card Body - BIGGER WITH HIDDEN SCROLLBAR */}
              <div 
                className="flex flex-col p-5 flex-shrink-0"
                style={{ 
                  height: "clamp(280px, 32vh, 320px)"
                }}
              >
                {/* Title - Fixed height */}
                <div className="flex-shrink-0" style={{ height: "clamp(64px, 8vh, 76px)", overflow: "hidden" }}>
                  <h3 className="text-[20px] font-black text-[#111] leading-tight sm:text-[24px] lg:text-[26px] line-clamp-2">
                    {item.name}
                  </h3>
                </div>

                {/* Description - SCROLLABLE with HIDDEN SCROLLBAR */}
                <div 
                  className="flex-1 overflow-y-auto pr-1 mt-2 scroll-container-hide"
                  style={{ 
                    height: "clamp(120px, 14vh, 140px)", 
                    minHeight: "clamp(120px, 14vh, 140px)", 
                    maxHeight: "clamp(120px, 14vh, 140px)" 
                  }}
                >
                  <p className="text-[14px] leading-6 text-[#666] sm:text-[15px] sm:leading-7 lg:text-[16px] lg:leading-7">
                    {item.desc}
                  </p>
                </div>

                {/* Badges - Fixed at bottom */}
                <div className="flex flex-wrap items-center gap-2 pt-3 flex-shrink-0 mt-auto" style={{ height: "clamp(40px, 5vh, 48px)" }}>
                  {item.duration && (
                    <div className="rounded-full bg-[#fff1e7] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-[#ff8c42] sm:text-[11px] lg:text-[12px]">
                      {item.duration}
                    </div>
                  )}
                  <div className="rounded-full bg-[#f5f5f5] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-[#555] sm:text-[11px] lg:text-[12px]">
                    REAL CLIENT
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom scrollbar styles - HIDDEN */}
        <style>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .scroll-container-hide::-webkit-scrollbar {
            width: 0px;
            background: transparent;
          }
          
          /* Hide scrollbar for Firefox */
          .scroll-container-hide {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          
          /* Smooth scrolling */
          .scroll-container-hide {
            scroll-behavior: smooth;
          }
          
          /* Optional: Show scrollbar on hover for desktop */
          @media (hover: hover) {
            .scroll-container-hide:hover::-webkit-scrollbar {
              width: 3px;
            }
            .scroll-container-hide:hover::-webkit-scrollbar-track {
              background: #f0f0f0;
              border-radius: 10px;
            }
            .scroll-container-hide:hover::-webkit-scrollbar-thumb {
              background: #ff8c42;
              border-radius: 10px;
            }
            .scroll-container-hide:hover {
              scrollbar-width: thin;
              scrollbar-color: #ff8c42 #f0f0f0;
            }
          }
        `}</style>

        <div className="mt-14 flex justify-center pb-4">
          <a
            href={getWhatsappUrl("Body Transformation")}
            target="_blank"
            className="flex h-[54px] w-full max-w-[300px] items-center justify-center rounded-[18px] bg-gradient-to-r from-[#ff8c42] to-[#ff6b35] px-5 text-center text-[12px] font-black uppercase tracking-[0.18em] text-white shadow-[0_12px_35px_rgba(255,140,66,0.28)] transition-all duration-300 hover:scale-[1.02] sm:h-[62px] sm:max-w-fit sm:px-10 sm:text-[15px]"
          >
            Start Your Transformation
          </a>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [heroBanner, setHeroBanner] = useState(defaultHeroBanner);
  const [transformations, setTransformations] = useState(defaultTransformations);

  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(30);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(11.65);
  const [weight, setWeight] = useState(176.4);
  const [bmi, setBmi] = useState(24.2);
  const [category, setCategory] = useState("Healthy weight");

  useEffect(() => {
    const controller = new AbortController();
    async function loadBanners() {
      try {
        const response = await fetch(BANNERS_API, { signal: controller.signal });
        if (!response.ok) return;
        const payload: unknown = await response.json();
        const banners = getBannerItems(payload);
        if (!banners.length) return;
        const hero = banners.find(isHeroBanner) || banners[0];
        setHeroBanner(mapHeroBanner(hero));
        const transformationItems = banners.filter(isTransformationBanner);
        const nextTransformations = (transformationItems.length ? transformationItems : banners.slice(1))
          .slice(0, 4)
          .map(mapTransformation);
        if (nextTransformations.length) setTransformations(nextTransformations);
      } catch (error) {
        if (!controller.signal.aborted) console.error("Unable to load banners", error);
      }
    }
    loadBanners();
    return () => controller.abort();
  }, []);

  const calculateBMI = () => {
    const totalInches = Number(heightFt) * 12 + Number(heightIn);
    const heightMeters = totalInches * 0.0254;
    const weightKg = Number(weight) * 0.453592;
    const bmiValue = weightKg / (heightMeters * heightMeters);
    const finalBMI = Number(bmiValue.toFixed(1));
    setBmi(finalBMI);
    if (finalBMI < 18.5) setCategory("Underweight");
    else if (finalBMI < 25) setCategory("Healthy weight");
    else if (finalBMI < 30) setCategory("Overweight");
    else setCategory("Obesity");
  };

  return (
    <main className="overflow-hidden bg-[#f6f6f6] text-[#222]">

      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden bg-black">
        <img
          src={heroBanner.image}
          alt="Fitness Banner"
          className="block w-full object-cover object-center"
          style={{ height: "clamp(260px, 56vw, 92vh)" }}
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
          <div className="text-center" />
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-black sm:text-5xl">
              Customized Plan That Give You Best Results
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {servicePlans.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group block overflow-hidden rounded-[10px] bg-white shadow-[0_12px_35px_rgba(0,0,0,0.10)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_22px_60px_rgba(0,0,0,0.16)] focus:outline-none focus:ring-4 focus:ring-orange-200"
              >
                <div className="overflow-hidden bg-zinc-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="aspect-[1.05/1] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex min-h-[82px] items-center justify-center px-5 py-5">
                  <h3 className="text-center text-[22px] font-semibold leading-tight text-[#020617] sm:text-[24px]">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRANSFORMATIONS ================= */}
      <TransformationsSection transformations={transformations} />

      {/* ================= ABOUT ================= */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-black sm:text-5xl">About DineshSehgal</h2>
            <p className="mx-auto mt-6 max-w-5xl text-[17px] leading-9 text-[#666] sm:text-[20px]">
              Hi, I'm DINESH SEHGAL, a Certified Fitness Coach dedicated to helping people achieve life-changing transformations through science-based training, proper nutrition, and consistent guidance.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex h-[54px] items-center justify-center rounded-[18px] bg-black px-8 text-[13px] font-black uppercase tracking-[0.18em] text-white shadow-[0_12px_35px_rgba(0,0,0,0.16)] transition-all duration-300 hover:scale-[1.03] hover:bg-[#00d26a] hover:text-black"
            >
              About More
            </Link>
          </div>

          {/* BMI SECTION */}
          <div className="mt-20 grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
            {/* LEFT */}
            <div className="rounded-[30px] border border-[#e5e5e5] bg-white p-6 shadow-lg sm:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5d4ff3] text-2xl text-white">⚕️</div>
                <h2 className="text-3xl font-light sm:text-5xl">BMI Calculator</h2>
              </div>

              <div className="mt-10">
                <p className="mb-4 text-lg font-semibold">Gender</p>
                <div className="flex overflow-hidden rounded-2xl border border-[#ddd]">
                  <button onClick={() => setGender("male")} className={`flex h-[65px] flex-1 items-center justify-center gap-2 text-lg font-semibold transition-all ${gender === "male" ? "bg-[#5d4ff3] text-white" : "bg-white text-[#222]"}`}>♂ Male</button>
                  <button onClick={() => setGender("female")} className={`flex h-[65px] flex-1 items-center justify-center gap-2 text-lg font-semibold transition-all ${gender === "female" ? "bg-[#5d4ff3] text-white" : "bg-white text-[#222]"}`}>♀ Female</button>
                </div>
              </div>

              <div className="mt-8">
                <p className="mb-4 text-lg font-semibold">Age</p>
                <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="h-[65px] w-full rounded-2xl border border-[#ddd] px-5 text-[20px] outline-none" />
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-4 text-lg font-semibold">Height (ft)</p>
                  <input type="number" value={heightFt} onChange={(e) => setHeightFt(Number(e.target.value))} className="h-[65px] w-full rounded-2xl border border-[#ddd] px-5 text-[20px] outline-none" />
                </div>
                <div>
                  <p className="mb-4 text-lg font-semibold">Height (in)</p>
                  <input type="number" value={heightIn} onChange={(e) => setHeightIn(Number(e.target.value))} className="h-[65px] w-full rounded-2xl border border-[#ddd] px-5 text-[20px] outline-none" />
                </div>
              </div>

              <div className="mt-8">
                <p className="mb-4 text-lg font-semibold">Weight (pounds)</p>
                <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="h-[65px] w-full rounded-2xl border border-[#ddd] px-5 text-[20px] outline-none" />
              </div>

              <button onClick={calculateBMI} className="mt-10 h-[70px] w-full rounded-2xl bg-[#5d4ff3] text-[22px] font-bold text-white transition-all duration-300 hover:scale-[1.02]">Calculate</button>
            </div>

            {/* RIGHT */}
            <div className="overflow-hidden rounded-[30px] bg-[#eaf1ff] shadow-lg">
              <div className="bg-[#dce7ff] px-6 py-6">
                <h3 className="text-[18px] font-black uppercase tracking-[0.18em] text-[#5d4ff3]">BODY MASS INDEX</h3>
              </div>
              <div className="p-6 sm:p-8">
                <div className="relative mt-10 px-2">
                  <div className="relative h-[22px] overflow-visible rounded-full bg-[#ececec] p-[4px] shadow-inner">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-[#ff7b7b] via-[#9dff6b] to-[#ff7b7b]" />
                    <div
                      className="absolute top-1/2 z-10 h-[32px] w-[32px] rounded-full border-[5px] border-white bg-[#5d4ff3] shadow-[0_0_25px_rgba(93,79,243,0.45)]"
                      style={{ left: `${Math.min(Math.max((bmi / 40) * 100, 5), 95)}%`, transform: "translate(-50%, -50%)" }}
                    />
                  </div>
                  <div className="mt-5 flex justify-between text-[11px] font-bold text-[#666] sm:text-[14px]">
                    <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obesity</span>
                  </div>
                </div>
                <div className="mt-10 overflow-hidden rounded-[24px] border border-[#d7dff5]">
                  {[
                    ["Body Mass Index (BMI)", `${bmi} kg/m²`],
                    ["BMI Category", category],
                    ["Healthy BMI range", "18.5 - 25 kg/m²"],
                    ["Healthy weight", "135.1 lbs - 182.6 lbs"],
                    ["Gain to BMI 18.5", "-"],
                    ["Lose to BMI 25", "-"],
                    ["Ponderal Index", "13.27 kg/m³"],
                  ].map((item, index) => (
                    <div key={index} className="grid grid-cols-2 border-b border-[#d7dff5] last:border-none">
                      <div className="bg-[#dce7ff] px-5 py-5 text-[15px] text-[#333] sm:text-[18px]">{item[0]}</div>
                      <div className="bg-white px-5 py-5 text-[15px] font-semibold sm:text-[18px]">{item[1]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* WHY CHOOSE */}
          <div className="mt-24 grid gap-14 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-black leading-tight sm:text-6xl">Why choose DineshSehgal</h2>
              <div className="mt-10 space-y-5">
                {[
                  "Science-Based Coaching for Real Results",
                  "Tailored workout plan based on your schedule",
                  "Custom nutrition built for indian food habits",
                  "Weekly check-ins for accountability",
                  "Fatloss that is sustainable",
                  "Home, gym, or online training options",
                  "Celebrity trainer & certified nutrition coach",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4 rounded-2xl bg-[#fafafa] px-5 py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#00d26a] text-lg font-black text-black">✓</div>
                    <p className="text-[16px] font-semibold sm:text-[20px]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-[34px] shadow-2xl">
              <img src="/hoome.jpeg" alt="" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHATSAPP FLOATING BUTTON ================= */}
      <a href={getWhatsappUrl()} target="_blank" className="fixed bottom-5 right-5 z-50">
        <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#25D366] shadow-[0_15px_45px_rgba(37,211,102,0.45)] transition duration-300 hover:scale-105 active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" className="h-9 w-9">
            <path d="M16.01 3C8.83 3 3 8.82 3 16c0 2.57.75 5.08 2.16 7.23L3 29l5.93-2.1A12.93 12.93 0 0016.01 29C23.18 29 29 23.18 29 16S23.18 3 16.01 3zm0 23.67c-2.13 0-4.22-.57-6.04-1.65l-.43-.25-3.52 1.25 1.15-3.62-.28-.45A10.58 10.58 0 015.33 16c0-5.89 4.79-10.68 10.68-10.68 2.85 0 5.52 1.11 7.54 3.13A10.59 10.59 0 0126.68 16c0 5.89-4.79 10.67-10.67 10.67zm5.86-7.94c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1.01 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.58-.95-.84-1.59-1.88-1.77-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.55-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.4-.29.32-1.11 1.08-1.11 2.64 0 1.55 1.13 3.05 1.29 3.26.16.21 2.22 3.39 5.39 4.75.75.32 1.34.52 1.8.66.75.24 1.44.21 1.98.13.61-.09 1.89-.77 2.15-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37z" />
          </svg>
        </div>
      </a>
    </main>
  );
}