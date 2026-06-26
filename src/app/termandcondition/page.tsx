"use client";

import Link from "next/link";

export default function TermsConditionsPage() {
  return (
    <main className="min-h-screen py-12 px-4 sm:py-16 sm:px-6 lg:px-10 bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-950 text-white">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-emerald-300 hover:text-white transition-colors mb-6 text-sm font-semibold"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Home
        </Link>

        {/* Header */}
        <div className="border-l-4 border-emerald-400 pl-5 mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-emerald-200/80 text-sm mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-white/90 leading-relaxed text-base sm:text-lg">

          {/* Section 1 */}
          <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-black">1</span>
              Acceptance of Terms
            </h2>
            <p>By accessing or using the <strong className="text-emerald-300">Dinesh Sehgal Fitness</strong> website, services, and programs, you agree to comply with and be bound by these Terms &amp; Conditions. If you do not agree, please refrain from using our services.</p>
          </section>

          {/* Section 2 */}
          <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-black">2</span>
              Services Provided
            </h2>
            <p>We offer online fitness coaching, personalised workout plans, nutrition guidance, video consultations, and other health-related services. All services are subject to availability and may be modified at our discretion.</p>
          </section>

          {/* Section 3 */}
          <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-black">3</span>
              User Responsibilities
            </h2>
            <ul className="list-disc pl-6 marker:text-emerald-400 space-y-2">
              <li>Provide accurate, current, and complete information during registration and consultation.</li>
              <li>Disclose any pre-existing medical conditions, injuries, or health concerns that may affect your participation.</li>
              <li>Follow the guidance and advice provided by our coaches responsibly.</li>
              <li>Do not share your account access or program materials with unauthorised individuals.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-black">4</span>
              Payments &amp; Billing
            </h2>
            <p>All payments are processed securely via <strong className="text-emerald-300">Razorpay</strong>. Prices are listed in your selected currency (INR, USD, GBP, etc.). You agree to pay all charges incurred under your account.</p>
            <p className="mt-2 text-sm text-white/70">Refunds are subject to our refund policy, which is available upon request. We reserve the right to change pricing with prior notice.</p>
          </section>

          {/* Section 5 */}
          <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-black">5</span>
              Intellectual Property
            </h2>
            <p>All content on this site – including videos, workout plans, nutrition guides, logos, and training materials – is the exclusive property of <strong className="text-emerald-300">Dinesh Sehgal Fitness</strong> and is protected by international copyright laws.</p>
            <p className="mt-2 text-sm text-white/70">You may not reproduce, distribute, modify, or create derivative works without explicit written permission.</p>
          </section>

          {/* Section 6 */}
          <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-black">6</span>
              Health &amp; Fitness Disclaimer
            </h2>
            <p>Our programs are designed for general health and wellness. Results may vary based on individual factors such as genetics, lifestyle, and adherence.</p>
            <p className="mt-2 font-semibold text-yellow-200/80">⚠️ Always consult a physician or healthcare professional before starting any exercise or nutrition program. We are not responsible for any injuries sustained while following our advice.</p>
          </section>

          {/* Section 7 */}
          <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-black">7</span>
              Limitation of Liability
            </h2>
            <p>To the fullest extent permitted by applicable law, <strong className="text-emerald-300">Dinesh Sehgal Fitness</strong> shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of our services. Our total liability is limited to the amount you paid for the service.</p>
          </section>

          {/* Section 8 */}
          <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-black">8</span>
              Termination &amp; Suspension
            </h2>
            <p>We reserve the right to suspend or terminate your access to our services if you:</p>
            <ul className="mt-3 list-disc pl-6 marker:text-emerald-400 space-y-1">
              <li>Violate these Terms &amp; Conditions</li>
              <li>Engage in fraudulent or harmful behaviour</li>
              <li>Misuse our platform or content</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-black">9</span>
              Governing Law
            </h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of <strong className="text-emerald-300">India</strong>. Any disputes shall be subject to the exclusive jurisdiction of courts in Pune, India.</p>
            <p className="mt-2 text-sm text-white/70">For international users, you agree to comply with all applicable local laws and regulations.</p>
          </section>

          {/* Section 10 */}
          <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-black">10</span>
              Changes to Terms
            </h2>
            <p>We may revise these Terms at any time. Continued use of our services after changes are posted constitutes acceptance of the updated terms. Please review this page regularly.</p>
          </section>

          {/* Contact */}
          <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-2xl p-6 sm:p-8 text-center">
            <p className="text-base sm:text-lg font-semibold text-white">
              📧 Have questions about our Terms?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4 text-sm sm:text-base">
              <a href="mailto:info@dineshsehgal.in" className="text-emerald-300 hover:text-white transition-colors underline">
                info@dineshsehgal.in
              </a>
              <span className="hidden sm:inline text-white/30">|</span>
              <a href="tel:+918585986111" className="text-emerald-300 hover:text-white transition-colors underline">
                +91 85859 86111
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-white/40">
          &copy; {new Date().getFullYear()} Dinesh Sehgal Fitness. All rights reserved.
        </div>
      </div>
    </main>
  );
}