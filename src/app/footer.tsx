"use client";

import { useEffect, useState } from "react";

const baseUrl = "https://dinesh-sagel-backend.onrender.com";

export default function Footer() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // ================= RANDOM CAPTCHA =================

  const generateNumbers = () => {
    const first = Math.floor(Math.random() * 20) + 1;
    const second = Math.floor(Math.random() * 20) + 1;
    setNum1(first);
    setNum2(second);
  };

  useEffect(() => {
    generateNumbers();
  }, []);

  // ================= HANDLE INPUT =================

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  // ================= SUBMIT =================

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    // ================= CAPTCHA CHECK =================

    if (Number(answer) !== num1 + num2) {
      alert("Wrong Answer ❌");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${baseUrl}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Enquiry Submitted ✅");

        setFormData({ name: "", email: "", message: "" });
        setAnswer("");
        generateNumbers();
      } else {
        alert(data.message || "Submission failed ❌");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="bg-[#06a7b5] px-5 py-16 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">

        {/* LEFT IMAGE */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop"
            alt="fitness"
            className="h-[450px] w-full rounded object-cover"
          />
          <p className="mt-5 text-lg font-bold">
            "Ready To Lose Fat , DineshSehgal Me"
          </p>
        </div>

        {/* CENTER IMAGE */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop"
            alt="coach"
            className="h-[450px] w-full rounded object-cover"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* TOP INPUTS */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="h-14 w-full border-none bg-white px-5 text-black outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="h-14 w-full border-none bg-white px-5 text-black outline-none"
              />
            </div>

            {/* MESSAGE */}
            <textarea
              rows={7}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              required
              className="w-full border-none bg-white p-5 text-black outline-none"
            />

            {/* CAPTCHA + SUBMIT */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

              {/* CAPTCHA BOX */}
              <div className="flex items-center gap-3 rounded-lg bg-white/20 px-4 py-3 backdrop-blur-sm">
                {/* num1 */}
                <span className="min-w-[28px] text-center text-3xl font-black text-white">
                  {num1}
                </span>

                {/* + */}
                <span className="text-2xl font-light text-white/80">+</span>

                {/* num2 */}
                <span className="min-w-[28px] text-center text-3xl font-black text-white">
                  {num2}
                </span>

                {/* = */}
                <span className="text-2xl font-light text-white/80">=</span>

                {/* Answer input */}
                <input
                  type="number"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="?"
                  required
                  className="h-14 w-20 border-none bg-white text-center text-2xl font-bold text-black outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />

                {/* Refresh captcha button */}
                <button
                  type="button"
                  onClick={() => { generateNumbers(); setAnswer(""); }}
                  title="New question"
                  className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-white/30 text-white transition hover:bg-white/50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M8 16H3v5" />
                  </svg>
                </button>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="h-16 rounded-[20px] border-2 border-white px-10 text-2xl font-semibold text-white transition hover:bg-white hover:text-[#06a7b5] disabled:opacity-60"
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