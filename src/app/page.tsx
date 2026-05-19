"use client";

import { useState } from "react";

export default function HomePage() {

  // BMI STATES

  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(30);

  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(11.65);

  const [weight, setWeight] = useState(176.4);

  const [bmi, setBmi] = useState(24.2);
  const [category, setCategory] = useState("Healthy weight");

  // BMI FUNCTION

  const calculateBMI = () => {

    const totalInches =
      Number(heightFt) * 12 + Number(heightIn);

    const heightMeters = totalInches * 0.0254;

    const weightKg = Number(weight) * 0.453592;

    const bmiValue =
      weightKg / (heightMeters * heightMeters);

    const finalBMI = Number(bmiValue.toFixed(1));

    setBmi(finalBMI);

    if (finalBMI < 18.5) {
      setCategory("Underweight");
    } else if (finalBMI >= 18.5 && finalBMI < 25) {
      setCategory("Healthy weight");
    } else if (finalBMI >= 25 && finalBMI < 30) {
      setCategory("Overweight");
    } else {
      setCategory("Obesity");
    }
  };

  return (

    <main className="overflow-hidden bg-[#f6f6f6] text-[#222]">

      {/* HERO */}

      <section className="relative h-[100vh] overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2400&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex h-full items-center justify-center px-4">

          <div className="max-w-7xl text-center">

            <h1 className="text-[42px] font-black uppercase leading-[1] tracking-tight text-white drop-shadow-2xl sm:text-[70px] lg:text-[110px]">

              FITNESS BACKED BY EXPERIENCE
              <br />
              & FUELED BY PASSION
            </h1>
          </div>
        </div>
      </section>

      {/* SERVICES */}

      <section className="py-20 sm:py-24">

        <div className="mx-auto max-w-7xl px-4 sm:px-6">

          <div className="text-center">

            <h2 className="text-3xl font-black sm:text-5xl">
              Customized Plan That Give You Best Results
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            {[
              {
                title: "Sport Specific Plans",
                image:
                  "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1200&auto=format&fit=crop",
                desc:
                  "Boost your performance with tailored training plans designed for your sport, improving speed, strength, and agility.",
              },

              {
                title: "Workout Plans",
                image:
                  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
                desc:
                  "Customized workout plans to build muscle, burn fat, and stay consistent designed for your goals.",
              },

              {
                title: "Nutrition Plans",
                image:
                  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
                desc:
                  "Get a personalized meal plan with the right macros, vitamins, and meal timing.",
              },

              {
                title: "1-1 VIP Training",
                image:
                  "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
                desc:
                  "Exclusive 1-on-1 coaching with expert guidance, accountability and support.",
              },
            ].map((item) => (

              <div
                key={item.title}
                className="group flex h-full flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_55px_rgba(0,0,0,0.12)]"
              >

                <div className="overflow-hidden">

                  <img
                    src={item.image}
                    alt=""
                    className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">

                  <div className="min-h-[170px]">

                    <h3 className="text-[28px] font-black leading-tight">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-[17px] leading-8 text-[#555]">
                      {item.desc}
                    </p>
                  </div>

                  {/* BUTTON FIXED */}

                  <div className="mt-auto pt-8">

                    <button className="h-[62px] w-full rounded-[18px] bg-black text-[15px] font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#00d26a] hover:text-black">

                      Explore Plan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}

      <section className="bg-white py-20 sm:py-24">

        <div className="mx-auto max-w-7xl px-4 sm:px-6">

          <div className="text-center">

            <h2 className="text-3xl font-black sm:text-5xl">
              About DineshSehgal
            </h2>

            <p className="mx-auto mt-6 max-w-5xl text-[17px] leading-9 text-[#666] sm:text-[20px]">

              At DineshSehgalMe, we simplify fitness for working professionals.
              Whether you're aiming to lose fat, build muscle, or boost
              energy, our expert-designed programs fit into your schedule.
            </p>
          </div>

          {/* BMI SECTION */}

          <div className="mt-20 grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">

            {/* LEFT */}

            <div className="rounded-[30px] border border-[#e5e5e5] bg-white p-6 shadow-lg sm:p-8">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5d4ff3] text-2xl text-white">
                  ⚕️
                </div>

                <h2 className="text-3xl font-light sm:text-5xl">
                  BMI Calculator
                </h2>
              </div>

              {/* GENDER */}

              <div className="mt-10">

                <p className="mb-4 text-lg font-semibold">
                  Gender
                </p>

                <div className="flex overflow-hidden rounded-2xl border border-[#ddd]">

                  <button
                    onClick={() => setGender("male")}
                    className={`flex h-[65px] flex-1 items-center justify-center gap-2 text-lg font-semibold transition-all ${
                      gender === "male"
                        ? "bg-[#5d4ff3] text-white"
                        : "bg-white text-[#222]"
                    }`}
                  >
                    ♂ Male
                  </button>

                  <button
                    onClick={() => setGender("female")}
                    className={`flex h-[65px] flex-1 items-center justify-center gap-2 text-lg font-semibold transition-all ${
                      gender === "female"
                        ? "bg-[#5d4ff3] text-white"
                        : "bg-white text-[#222]"
                    }`}
                  >
                    ♀ Female
                  </button>
                </div>
              </div>

              {/* AGE */}

              <div className="mt-8">

                <p className="mb-4 text-lg font-semibold">
                  Age
                </p>

                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="h-[65px] w-full rounded-2xl border border-[#ddd] px-5 text-[20px] outline-none"
                />
              </div>

              {/* HEIGHT */}

              <div className="mt-8 grid grid-cols-2 gap-4">

                <div>

                  <p className="mb-4 text-lg font-semibold">
                    Height (ft)
                  </p>

                  <input
                    type="number"
                    value={heightFt}
                    onChange={(e) =>
                      setHeightFt(Number(e.target.value))
                    }
                    className="h-[65px] w-full rounded-2xl border border-[#ddd] px-5 text-[20px] outline-none"
                  />
                </div>

                <div>

                  <p className="mb-4 text-lg font-semibold">
                    Height (in)
                  </p>

                  <input
                    type="number"
                    value={heightIn}
                    onChange={(e) =>
                      setHeightIn(Number(e.target.value))
                    }
                    className="h-[65px] w-full rounded-2xl border border-[#ddd] px-5 text-[20px] outline-none"
                  />
                </div>
              </div>

              {/* WEIGHT */}

              <div className="mt-8">

                <p className="mb-4 text-lg font-semibold">
                  Weight (pounds)
                </p>

                <input
                  type="number"
                  value={weight}
                  onChange={(e) =>
                    setWeight(Number(e.target.value))
                  }
                  className="h-[65px] w-full rounded-2xl border border-[#ddd] px-5 text-[20px] outline-none"
                />
              </div>

              {/* BUTTON */}

              <button
                onClick={calculateBMI}
                className="mt-10 h-[70px] w-full rounded-2xl bg-[#5d4ff3] text-[22px] font-bold text-white transition-all duration-300 hover:scale-[1.02]"
              >
                Calculate
              </button>
            </div>

            {/* RIGHT */}

            <div className="overflow-hidden rounded-[30px] bg-[#eaf1ff] shadow-lg">

              <div className="bg-[#dce7ff] px-6 py-6">

                <h3 className="text-[18px] font-black uppercase tracking-[0.18em] text-[#5d4ff3]">
                  BODY MASS INDEX
                </h3>
              </div>

              <div className="p-6 sm:p-8">

              {/* BAR */}

<div className="relative mt-10 px-2">

  {/* OUTER */}

  <div className="relative h-[22px] overflow-visible rounded-full bg-[#ececec] p-[4px] shadow-inner">

    {/* GRADIENT */}

    <div className="h-full w-full rounded-full bg-gradient-to-r from-[#ff7b7b] via-[#9dff6b] to-[#ff7b7b]" />

    {/* POINTER */}

    <div
      className="absolute top-1/2 z-10 h-[32px] w-[32px] rounded-full border-[5px] border-white bg-[#5d4ff3] shadow-[0_0_25px_rgba(93,79,243,0.45)]"
      style={{
        left: `${Math.min(
          Math.max((bmi / 40) * 100, 5),
          95
        )}%`,
        transform: "translate(-50%, -50%)",
      }}
    />
  </div>

  {/* LABELS */}

  <div className="mt-5 flex justify-between text-[11px] font-bold text-[#666] sm:text-[14px]">

    <span>Underweight</span>

    <span>Normal</span>

    <span>Overweight</span>

    <span>Obesity</span>
  </div>
</div>
                {/* TABLE */}

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

                    <div
                      key={index}
                      className="grid grid-cols-2 border-b border-[#d7dff5] last:border-none"
                    >

                      <div className="bg-[#dce7ff] px-5 py-5 text-[15px] text-[#333] sm:text-[18px]">

                        {item[0]}
                      </div>

                      <div className="bg-white px-5 py-5 text-[15px] font-semibold sm:text-[18px]">

                        {item[1]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* WHY CHOOSE */}

          <div className="mt-24 grid gap-14 lg:grid-cols-2">

            <div>

              <h2 className="text-4xl font-black leading-tight sm:text-6xl">

                Why choose DineshSehgal
              </h2>

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

                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-2xl bg-[#fafafa] px-5 py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                  >

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#00d26a] text-lg font-black text-black">
                      ✓
                    </div>

                    <p className="text-[16px] font-semibold sm:text-[20px]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[34px] shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1600&auto=format&fit=crop"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= SUCCESSFUL TRANSFORMATION ================= */}

<section className="bg-gradient-to-b from-[#fffaf5] to-[#f8f7ff] py-20 sm:py-28">

  <div className="mx-auto max-w-7xl px-4 sm:px-6">

    {/* HEADING */}

    <div className="text-center">

      <p className="inline-flex rounded-full border border-[#ff8c42]/20 bg-[#ff8c42]/10 px-5 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#ff8c42] sm:text-[11px]">

        REAL CLIENT RESULTS
      </p>

      <h2 className="mt-6 text-[34px] font-black leading-tight text-[#111] sm:text-5xl lg:text-7xl">

        Successful Lifestyle
        <br />
        Transformation
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-[14px] leading-7 text-[#666] sm:text-[18px] sm:leading-9">

        Real people. Real fat loss.
        Real body transformations
        through consistency,
        nutrition and expert
        coaching.
      </p>
    </div>

    {/* GRID */}

    <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

      {[
        {
          image:
            "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200&auto=format&fit=crop",

          name:
            "Rahul Sharma",

          result:
            "-18 KG Fat Loss",
        },

        {
          image:
            "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=1200&auto=format&fit=crop",

          name:
            "Aman Verma",

          result:
            "Muscle Gain Journey",
        },

        {
          image:
            "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",

          name:
            "Rohit Singh",

          result:
            "12 Week Transformation",
        },

        {
          image:
            "https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1200&auto=format&fit=crop",

          name:
            "Vikas Yadav",

          result:
            "Complete Body Recomp",
        },
      ].map((item) => (

        <div
          key={item.name}
          className="group overflow-hidden rounded-[32px] border border-[#eee] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-3 hover:border-[#ff8c42]/30 hover:shadow-[0_20px_70px_rgba(255,140,66,0.18)]"
        >

          {/* IMAGE */}

          <div className="relative overflow-hidden">

            <img
              src={item.image}
              alt=""
              className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-110 sm:h-[420px]"
            />

            {/* OVERLAY */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

            {/* VERIFIED */}

            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 shadow-lg backdrop-blur">

              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff8c42]">

                VERIFIED
              </p>
            </div>

            {/* RESULT */}

            <div className="absolute bottom-5 left-5">

              <div className="rounded-2xl border border-white/20 bg-white/15 px-5 py-3 backdrop-blur-xl">

                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#ffd2b1]">

                  TRANSFORMATION
                </p>

                <h3 className="mt-2 text-[22px] font-black text-white">

                  {item.result}
                </h3>
              </div>
            </div>
          </div>

          {/* CONTENT */}

          <div className="p-6">

            <h3 className="text-[24px] font-black text-[#111] sm:text-[28px]">

              {item.name}
            </h3>

            <p className="mt-4 text-[15px] leading-8 text-[#666]">

              Incredible body
              transformation through
              customized workout,
              nutrition and expert
              coaching.
            </p>

            {/* STATS */}

            <div className="mt-6 flex flex-wrap items-center gap-3">

              <div className="rounded-full bg-[#fff1e7] px-4 py-2 text-[11px] font-black uppercase tracking-[0.15em] text-[#ff8c42]">

                12 WEEKS
              </div>

              <div className="rounded-full bg-[#f5f5f5] px-4 py-2 text-[11px] font-black uppercase tracking-[0.15em] text-[#555]">

                REAL CLIENT
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* BUTTON */}

    {/* BUTTON */}

<div className="mt-14 pb-4 flex justify-center">

  <a
    href="https://wa.me/919999999999"
    target="_blank"
    className="flex h-[54px] w-full max-w-[300px] items-center justify-center rounded-[18px] bg-gradient-to-r from-[#ff8c42] to-[#ff6b35] px-5 text-center text-[12px] font-black uppercase tracking-[0.18em] text-white shadow-[0_12px_35px_rgba(255,140,66,0.28)] transition-all duration-300 hover:scale-[1.02] sm:h-[62px] sm:max-w-fit sm:px-10 sm:text-[15px]"
  >
    Start Your Transformation
  </a>
</div>
  </div>
</section>

      {/* TESTIMONIALS

      <section className="bg-white py-24">

        <div className="mx-auto max-w-7xl px-4 sm:px-6">

          <div className="text-center">

            <h2 className="text-4xl font-black sm:text-6xl">
              Real People. Real Transformations
            </h2>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            {[1, 2, 3, 4].map((item) => (

              <div
                key={item}
                className="rounded-[30px] bg-[#f7f7f7] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >

                <div className="flex justify-center">

                  <img
                    src={`https://i.pravatar.cc/200?img=${item + 10}`}
                    alt=""
                    className="h-24 w-24 rounded-full object-cover"
                  />
                </div>

                <p className="mt-8 text-[20px] font-bold leading-10">
                  “Amazing experience and incredible support.”
                </p>

                <div className="mt-5 text-2xl text-[#ffbb00]">
                  ★★★★★
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}


      {/* WHATSAPP */}

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