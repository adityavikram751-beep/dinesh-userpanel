"use client";

import { useEffect, useState } from "react";

type ContactData = {
  email: string;
  phone: string;
  mobile: string;
};

type IconName = "mail" | "phone";

const WHATSAPP_NUMBER = "918585986111";
const BASE_URL = "https://api.dineshsehgal.com";

const defaultContactData: ContactData = {
  email: "info@dineshsehgal.com",
  phone: "8585986111",
  mobile: "8585986111",
};

function toText(value: unknown, fallback: string) {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number") return String(value);
  return fallback;
}

function formatIndianPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  const localNumber = digits.length > 10 ? digits.slice(-10) : digits;
  return `+91 ${localNumber.slice(0, 5)} ${localNumber.slice(5)}`;
}

function getTelHref(value: string) {
  const digits = value.replace(/\D/g, "");
  const localNumber = digits.length > 10 ? digits.slice(-10) : digits;
  return `tel:+91${localNumber}`;
}

function getWhatsappUrl(details?: {
  name: string;
  mobile: string;
  email: string;
  message: string;
}) {
  const detailMessage = details
    ? `
Name: ${details.name || "-"}
Mobile: ${details.mobile || "-"}
Email: ${details.email || "-"}
Goal: ${details.message || "-"}`
    : "";

  const message = `Hi DineshSehgal!

I want to contact you regarding fitness coaching.

Please share:
Pricing
Workout Plans
Diet Plans
Personal Training Details${detailMessage}`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function ContactIcon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    mail: (
      <>
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    phone: (
      <path d="M7.3 4.8 9.6 4l2 4.7-1.8 1.1a10.3 10.3 0 0 0 4.4 4.4l1.1-1.8 4.7 2-.8 2.3c-.3.8-1 1.3-1.9 1.3A13.3 13.3 0 0 1 4 6.7c0-.9.5-1.6 1.3-1.9Z" />
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  );
}

export default function ContactPage() {
  const [contactData, setContactData] = useState<ContactData>(defaultContactData);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // ✅ Auto-dismiss toast after 5 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchContact() {
      try {
        const response = await fetch(`${BASE_URL}/api/contactUs`, {
          signal: controller.signal,
        });
        const data: unknown = await response.json();
        const firstItem = Array.isArray(data) ? data[0] : data;

        if (firstItem && typeof firstItem === "object") {
          const item = firstItem as Record<string, unknown>;

          setContactData({
            email: toText(item.email, defaultContactData.email),
            phone: toText(item.phone, defaultContactData.phone),
            mobile: toText(item.mobile ?? item.mobileNumber ?? item.phone, defaultContactData.mobile),
          });
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.log(error);
        }
      }
    }

    fetchContact();

    return () => controller.abort();
  }, []);

  const contactItems = [
    {
      label: "Email",
      value: contactData.email,
      helper: "For plans, support and coaching enquiries",
      href: `mailto:${contactData.email}`,
      icon: "mail" as const,
    },
    {
      label: "Phone",
      value: formatIndianPhone(contactData.phone),
      helper: "Call for personal training details",
      href: getTelHref(contactData.phone),
      icon: "phone" as const,
    },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.name.trim()) {
      setToast({ type: "error", message: "Please enter your name" });
      return;
    }
    if (!formData.email.trim()) {
      setToast({ type: "error", message: "Please enter your email" });
      return;
    }
    if (!formData.mobile.trim() || formData.mobile.replace(/\D/g, "").length !== 10) {
      setToast({ type: "error", message: "Please enter a valid 10-digit mobile number" });
      return;
    }
    if (!formData.message.trim()) {
      setToast({ type: "error", message: "Please tell us your fitness goal" });
      return;
    }

    setLoading(true);
    setToast(null);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        mobileNumber: formData.mobile.replace(/\D/g, ""),
        message: formData.message,
      };

      const res = await fetch(`${BASE_URL}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setToast({ type: "success", message: "Enquiry submitted successfully ✅" });
        setFormData({ name: "", mobile: "", email: "", message: "" });
      } else {
        setToast({ type: "error", message: data.message || "Submission failed ❌" });
      }
    } catch (error) {
      setToast({ type: "error", message: "Network error, please try again" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f7f2] text-zinc-950">
      {/* ✅ Toast — Green for success, Red for error, auto-dismisses in 5s */}
      {toast && (
        <div
          className={`fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-xl px-6 py-4 text-center text-sm font-black tracking-wide shadow-2xl transition-all ${
            toast.type === "success"
              ? "bg-red-500 text-white border border-red-600"
              : "bg-green-500 text-white border border-green-600"
          }`}
        >
          {toast.message}
          <button
            onClick={() => setToast(null)}
            className="ml-4 inline-block text-lg font-bold leading-none opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section
        className="relative isolate flex min-h-[360px] items-center overflow-hidden px-5 py-20 text-white sm:min-h-[420px] sm:px-8 lg:px-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.68) 42%, rgba(0,0,0,0.22) 100%), url('https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?auto=format&fit=crop&w=1800&q=85')",
          backgroundPosition: "center 36%",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f7f7f2] to-transparent" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6">
          <span className="w-fit rounded-full border border-white/25 bg-white/10 px-5 py-2 text-xs font-black uppercase tracking-[0.22em] text-lime-200 backdrop-blur">
            Contact Dinesh Sehgal
          </span>

          <div className="max-w-3xl">
            <h1 className="text-[48px] font-black leading-[0.96] sm:text-[72px] lg:text-[92px]">
              Contact Us
            </h1>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-zinc-100 sm:text-lg">
              Ready for online coaching, diet planning or personal training? Reach out and the team will guide you with the right fitness plan.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="mx-auto grid max-w-7xl items-stretch gap-6 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-2 lg:px-10">
        {/* Left: Contact Info */}
        <aside className="h-full">
          <div className="flex h-full flex-col rounded-lg border border-zinc-200 bg-white p-7 shadow-[0_22px_60px_rgba(17,17,17,0.07)] sm:p-9 lg:p-10">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-lime-700">
                Direct Details
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                Contact Info
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                Email, call or message us for transformation programs, pricing and one-to-one consultation.
              </p>

              <div className="mt-8 grid gap-4">
                {contactItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group grid grid-cols-[52px_1fr] gap-4 rounded-lg border border-zinc-200 bg-[#fbfbf7] p-4 transition hover:-translate-y-1 hover:border-lime-300 hover:bg-white hover:shadow-[0_18px_45px_rgba(17,17,17,0.08)]"
                  >
                    <span className="flex h-13 w-13 items-center justify-center rounded-lg bg-zinc-950 text-lime-300 transition group-hover:bg-lime-300 group-hover:text-zinc-950">
                      <ContactIcon name={item.icon} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                        {item.label}
                      </span>
                      <span className="mt-1 block break-words text-lg font-black text-zinc-950">
                        {item.value}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-zinc-500">
                        {item.helper}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-lg border border-lime-200 bg-lime-50 p-5 lg:mt-auto">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-lime-800">
                24 Hour Support
              </p>
              <h3 className="mt-3 text-2xl font-black leading-tight text-zinc-950">
                Contact anytime, reply within 24 hours.
              </h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-zinc-600">
                Share your fitness goal, diet query, or coaching question. Our team will contact you with plan details and next steps.
              </p>
            </div>
          </div>
        </aside>

        {/* Right: Form */}
        <section className="h-full rounded-lg border border-zinc-200 bg-white p-7 shadow-[0_22px_60px_rgba(17,17,17,0.07)] sm:p-9 lg:p-10">
          <form onSubmit={handleSubmit} className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-lime-700">
              Send Enquiry
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
              Get In Touch
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-600">
              Share your name, number and fitness goal. We'll get back to you shortly.
            </p>

            <div className="mt-8 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                    Name
                  </span>
                  <input
                    value={formData.name}
                    onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                    className="h-[58px] w-full rounded-lg border border-zinc-200 bg-[#fbfbf7] px-5 text-base font-semibold text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-lime-400 focus:bg-white focus:ring-4 focus:ring-lime-100"
                    placeholder="Your name"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                    Mobile
                  </span>
                  <input
                    value={formData.mobile}
                    onChange={(event) => setFormData((prev) => ({ ...prev, mobile: event.target.value }))}
                    className="h-[58px] w-full rounded-lg border border-zinc-200 bg-[#fbfbf7] px-5 text-base font-semibold text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-lime-400 focus:bg-white focus:ring-4 focus:ring-lime-100"
                    inputMode="tel"
                    placeholder="Mobile number"
                    required
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                  Email
                </span>
                <input
                  value={formData.email}
                  onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                  className="h-[58px] w-full rounded-lg border border-zinc-200 bg-[#fbfbf7] px-5 text-base font-semibold text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-lime-400 focus:bg-white focus:ring-4 focus:ring-lime-100"
                  type="email"
                  placeholder="Email ID"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                  Fitness Goal
                </span>
                <textarea
                  value={formData.message}
                  onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                  className="min-h-[132px] w-full resize-none rounded-lg border border-zinc-200 bg-[#fbfbf7] px-5 py-4 text-base font-semibold text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-lime-400 focus:bg-white focus:ring-4 focus:ring-lime-100"
                  placeholder="Tell us your goal"
                  required
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-7 inline-flex min-h-[60px] w-full items-center justify-center rounded-lg bg-zinc-950 px-6 text-sm font-black uppercase tracking-[0.18em] text-white shadow-[0_18px_40px_rgba(17,17,17,0.18)] transition hover:-translate-y-1 hover:bg-lime-400 hover:text-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
            >
              {loading ? "Submitting..." : "Send Enquiry"}
            </button>
          </form>
        </section>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href={getWhatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50"
        aria-label="Chat on WhatsApp"
      >
        <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#25D366] shadow-[0_15px_45px_rgba(37,211,102,0.45)] transition duration-300 hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" className="h-9 w-9">
            <path d="M16.01 3C8.83 3 3 8.82 3 16c0 2.57.75 5.08 2.16 7.23L3 29l5.93-2.1A12.93 12.93 0 0016.01 29C23.18 29 29 23.18 29 16S23.18 3 16.01 3zm0 23.67c-2.13 0-4.22-.57-6.04-1.65l-.43-.25-3.52 1.25 1.15-3.62-.28-.45A10.58 10.58 0 015.33 16c0-5.89 4.79-10.68 10.68-10.68 2.85 0 5.52 1.11 7.54 3.13A10.59 10.59 0 0126.68 16c0 5.89-4.79 10.67-10.67 10.67zm5.86-7.94c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1.01 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.58-.95-.84-1.59-1.88-1.77-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.55-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.4-.29.32-1.11 1.08-1.11 2.64 0 1.55 1.13 3.05 1.29 3.26.16.21 2.22 3.39 5.39 4.75.75.32 1.34.52 1.8.66.75.24 1.44.21 1.98.13.61-.09 1.89-.77 2.15-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37z" />
          </svg>
        </div>
      </a>
    </main>
  );
}