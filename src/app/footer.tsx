"use client";

import { useCallback, useEffect, useState, useRef } from "react";

const baseUrl = "https://dinesh-sagel-backend.onrender.com";

export default function Footer() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [spinRefresh, setSpinRefresh] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", message: "" });
  const footerRef = useRef<HTMLElement>(null);

  const generateNumbers = useCallback(() => {
    setNum1(Math.floor(Math.random() * 20) + 1);
    setNum2(Math.floor(Math.random() * 20) + 1);
  }, []);

  useEffect(() => {
    const numberTimer = window.setTimeout(generateNumbers, 0);

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0, rootMargin: "0px 0px -30px 0px" }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => {
      window.clearTimeout(numberTimer);
      observer.disconnect();
    };
  }, [generateNumbers]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    const nextValue = name === "mobile" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setFormData((prev) => ({ ...prev, [name]: nextValue }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (formData.mobile.length !== 10) { alert("Mobile number 10 digit ka hona chahiye"); return; }
    if (Number(answer) !== num1 + num2) { alert("Wrong Answer ❌"); return; }
    try {
      setLoading(true);
      const enquiryPayload = {
        name: formData.name,
        email: formData.email,
        mobileNumber: formData.mobile,
        message: formData.message,
      };
      const res = await fetch(`${baseUrl}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiryPayload),
      });
      const data = await res.json();
      if (data.success) {
        alert("Enquiry Submitted ✅");
        setFormData({ name: "", email: "", mobile: "", message: "" });
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
    <footer 
      ref={footerRef} 
      className="px-5 py-12 text-white sm:px-8 lg:px-10"
      style={{
        background: "linear-gradient(180deg, #059669 0%, #047857 30%, #065f46 60%, #064e3b 100%)"
      }}
    >
      {/* Top Border with Glow */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 blur-xl" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3 pt-8">

      {/* LEFT IMAGE */}
<div
  className={`flex flex-col ${base} ${visible ? show : hidden}`}
  style={{ transitionDelay: "0ms" }}
>
  <div className="relative overflow-hidden rounded-xl border border-white/20 shadow-xl shadow-black/20 group">
    <img
      src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop"
      alt="fitness"
      className="h-[180px] sm:h-[220px] lg:h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </div>
  <p className="mt-auto pt-3 text-sm font-bold text-white/90">
    &quot;Ready To Lose Fat, DineshSehgal Me&quot;
  </p>
</div>

{/* CENTER IMAGE */}
<div
  className={`${base} ${visible ? show : hidden}`}
  style={{ transitionDelay: "150ms" }}
>
  <div className="relative overflow-hidden rounded-xl border border-white/20 shadow-xl shadow-black/20 group">
    <img
      src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
      alt="coach"
      className="h-[180px] sm:h-[220px] lg:h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </div>
</div>

        {/* RIGHT — FORM CARD */}
        <div
          className={`rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5 sm:p-6 text-white flex flex-col justify-center shadow-2xl shadow-black/20 ${base} ${visible ? `${show} scale-100` : `${hidden} scale-95`}`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-white rounded-full" />
            <p className="text-base font-black text-white">
              Get In Touch
            </p>
          </div>

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
                className="h-11 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/50 outline-none focus:border-white focus:bg-white/20 focus:-translate-y-px focus:shadow-[0_0_0_3px_rgba(255,255,255,.1)] transition-all duration-200"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="h-11 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/50 outline-none focus:border-white focus:bg-white/20 focus:-translate-y-px focus:shadow-[0_0_0_3px_rgba(255,255,255,.1)] transition-all duration-200"
              />
            </div>

            {/* MOBILE */}
            <div
              className={`${base} ${visible ? show : hidden}`}
              style={{ transitionDelay: "465ms" }}
            >
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                required
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
                title="Please enter a 10 digit mobile number"
                className="h-11 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/50 outline-none focus:border-white focus:bg-white/20 focus:-translate-y-px focus:shadow-[0_0_0_3px_rgba(255,255,255,.1)] transition-all duration-200"
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
                className="w-full rounded-xl border border-white/20 bg-white/10 p-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-white focus:bg-white/20 focus:-translate-y-px focus:shadow-[0_0_0_3px_rgba(255,255,255,.1)] transition-all duration-200 resize-none"
              />
            </div>

            {/* CAPTCHA + SUBMIT */}
            <div
              className={`flex flex-wrap items-center gap-3 ${base} ${visible ? show : hidden}`}
              style={{ transitionDelay: "600ms" }}
            >
              {/* CAPTCHA */}
              <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 transition-all duration-200 focus-within:border-white">
                <span className="min-w-[20px] text-center text-xl font-black text-white">{num1}</span>
                <span className="text-lg text-white/50">+</span>
                <span className="min-w-[20px] text-center text-xl font-black text-white">{num2}</span>
                <span className="text-lg text-white/50">=</span>
                <input
                  type="number"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="?"
                  required
                  className="h-10 w-12 rounded-lg border border-white/20 bg-white/10 text-center text-lg font-bold text-white outline-none focus:border-white transition-all duration-200 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
                  className={`flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white/70 transition-all duration-300 hover:bg-white hover:text-green-700 hover:shadow-lg hover:shadow-white/30 ${spinRefresh ? "rotate-180" : "rotate-0"}`}
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
                className="flex-1 h-11 min-w-[90px] rounded-xl bg-white text-sm font-black text-green-700 transition-all duration-200 hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,255,255,.3)] active:scale-95 disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>

          </form>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="relative mt-10">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </footer>
  );
}