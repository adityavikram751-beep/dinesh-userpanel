"use client";

import { useEffect, useState, useRef } from "react";

const baseUrl = "https://dinesh-sagel-backend.onrender.com";

export default function Footer() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [spinRefresh, setSpinRefresh] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const footerRef = useRef<HTMLElement>(null);

  const generateNumbers = () => {
    setNum1(Math.floor(Math.random() * 20) + 1);
    setNum2(Math.floor(Math.random() * 20) + 1);
  };

  useEffect(() => {
    generateNumbers();

    // Mobile pe bhi kaam kare isliye rootMargin negative nahi rakha
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0, rootMargin: "0px 0px -30px 0px" }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (Number(answer) !== num1 + num2) { alert("Wrong Answer ❌"); return; }
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        alert("Enquiry Submitted ✅");
        setFormData({ name: "", email: "", message: "" });
        setAnswer("");
        generateNumbers();
      } else {
        alert(data.message || "Submission failed ❌");
      }
    } catch {
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  }

  const base = "transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]";
  const hidden = "opacity-0 translate-y-8";
  const show = "opacity-100 translate-y-0";

  return (
    <footer ref={footerRef} className="bg-[#06a7b5] px-5 py-12 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">

        {/* LEFT IMAGE */}
        <div
          className={`flex flex-col ${base} ${visible ? show : hidden}`}
          style={{ transitionDelay: "0ms" }}
        >
          <div className="overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop"
              alt="fitness"
              className="h-[180px] sm:h-[220px] lg:h-[280px] w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          {/* Tagline — mt-auto se image ke bilkul niche, bottom mein */}
          <p className="mt-auto pt-3 text-sm font-bold">
            "Ready To Lose Fat, DineshSehgal Me"
          </p>
        </div>

        {/* CENTER IMAGE */}
        <div
          className={`${base} ${visible ? show : hidden}`}
          style={{ transitionDelay: "150ms" }}
        >
          <div className="overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
              alt="coach"
              className="h-[180px] sm:h-[220px] lg:h-[280px] w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* RIGHT — FORM CARD */}
        <div
          className={`rounded-2xl bg-white p-5 sm:p-6 text-zinc-900 flex flex-col justify-center ${base} ${visible ? `${show} scale-100` : `${hidden} scale-95`}`}
          style={{ transitionDelay: "300ms" }}
        >
          <p className="mb-4 text-base font-black text-zinc-900">Get In Touch</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">

            {/* NAME + EMAIL */}
            <div
              className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${base} ${visible ? show : hidden}`}
              style={{ transitionDelay: "420ms" }}
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-100 px-4 text-sm text-zinc-900 outline-none focus:border-[#06a7b5] focus:bg-white focus:-translate-y-px focus:shadow-[0_0_0_3px_rgba(6,167,181,.15)] transition-all duration-200"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-100 px-4 text-sm text-zinc-900 outline-none focus:border-[#06a7b5] focus:bg-white focus:-translate-y-px focus:shadow-[0_0_0_3px_rgba(6,167,181,.15)] transition-all duration-200"
              />
            </div>

            {/* MESSAGE */}
            <div
              className={`${base} ${visible ? show : hidden}`}
              style={{ transitionDelay: "510ms" }}
            >
              <textarea
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                required
                className="w-full rounded-xl border border-zinc-200 bg-zinc-100 p-3 text-sm text-zinc-900 outline-none focus:border-[#06a7b5] focus:bg-white focus:-translate-y-px focus:shadow-[0_0_0_3px_rgba(6,167,181,.15)] transition-all duration-200 resize-none"
              />
            </div>

            {/* CAPTCHA + SUBMIT */}
            <div
              className={`flex flex-wrap items-center gap-3 ${base} ${visible ? show : hidden}`}
              style={{ transitionDelay: "600ms" }}
            >
              {/* CAPTCHA */}
              <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-100 px-3 py-2 transition-all duration-200 focus-within:border-[#06a7b5]">
                <span className="min-w-[20px] text-center text-xl font-black text-zinc-900">{num1}</span>
                <span className="text-lg text-zinc-400">+</span>
                <span className="min-w-[20px] text-center text-xl font-black text-zinc-900">{num2}</span>
                <span className="text-lg text-zinc-400">=</span>
                <input
                  type="number"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="?"
                  required
                  className="h-10 w-12 rounded-lg border border-zinc-200 bg-white text-center text-lg font-bold text-zinc-900 outline-none focus:border-[#06a7b5] transition-all duration-200 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    generateNumbers();
                    setAnswer("");
                    setSpinRefresh(true);
                    setTimeout(() => setSpinRefresh(false), 400);
                  }}
                  title="New question"
                  className={`flex h-7 w-7 items-center justify-center rounded-full bg-zinc-200 text-zinc-600 transition-all duration-300 hover:bg-[#06a7b5] hover:text-white ${spinRefresh ? "rotate-180" : "rotate-0"}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                    <path d="M21 3v5h-5"/>
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                    <path d="M8 16H3v5"/>
                  </svg>
                </button>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="flex-1 h-11 min-w-[90px] rounded-xl bg-[#06a7b5] text-sm font-black text-white transition-all duration-200 hover:bg-[#058fa0] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(6,167,181,.4)] active:scale-95 disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>

          </form>
        </div>

      </div>
    </footer>
  );
}