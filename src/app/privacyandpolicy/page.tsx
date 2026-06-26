"use client";

import Link from "next/link";

export default function PrivacyPolicyPage() {
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
            Privacy Policy
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
              Information We Collect
            </h2>
            <p className="mb-3">At <strong className="text-emerald-300">Dinesh Sehgal Fitness</strong>, we collect personal information you provide directly, including:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc pl-6 marker:text-emerald-400">
              <li>Full name and contact details (email, phone)</li>
              <li>Age, gender, fitness goals, and medical history</li>
              <li>Payment and transaction data (securely processed)</li>
              <li>Communication preferences and feedback</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-black">2</span>
              How We Use Your Data
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-disc pl-6 marker:text-emerald-400">
              <li>Deliver personalised fitness coaching</li>
              <li>Process purchases and manage subscriptions</li>
              <li>Send program updates and important notifications</li>
              <li>Improve our services and customer support</li>
              <li>Comply with legal and regulatory obligations</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-black">3</span>
              Data Security &amp; Protection
            </h2>
            <p>We implement <strong className="text-emerald-300">industry-standard security measures</strong> to protect your information:</p>
            <ul className="mt-3 list-disc pl-6 marker:text-emerald-400 space-y-1">
              <li>All payment transactions are encrypted (Razorpay / SSL)</li>
              <li>We do not store sensitive card details on our servers</li>
              <li>Regular security audits and monitoring</li>
              <li>Access restricted to authorised personnel only</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-black">4</span>
              Information Sharing
            </h2>
            <p className="mb-3">We <strong className="text-red-400">do not</strong> sell, trade, or rent your personal information. We may share data with:</p>
            <ul className="list-disc pl-6 marker:text-emerald-400 space-y-1">
              <li>Trusted service providers (payment processing, email delivery)</li>
              <li>Legal authorities when required by applicable law</li>
              <li>Our coaching team for program customisation</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-black">5</span>
              Cookies &amp; Tracking
            </h2>
            <p>We use cookies to enhance your experience, analyse traffic, and remember preferences. You can manage cookie settings in your browser. <br />
            <span className="text-emerald-300 text-sm">We respect your privacy choices.</span></p>
          </section>

          {/* Section 6 */}
          <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-black">6</span>
              Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="mt-3 list-disc pl-6 marker:text-emerald-400 space-y-1">
              <li>Access, correct, or delete your personal data</li>
              <li>Withdraw consent at any time</li>
              <li>Request data portability</li>
              <li>Lodge a complaint with regulatory authorities</li>
            </ul>
            <p className="mt-3 text-sm text-white/70">
              To exercise your rights, contact us at <a href="mailto:info@dineshsehgal.in" className="text-emerald-300 hover:text-white underline transition-colors">info@dineshsehgal.in</a>
            </p>
          </section>

          {/* Section 7 */}
          <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-black">7</span>
              International Users
            </h2>
            <p>Our services are available globally. By using our platform, you consent to the transfer of your data to India, where our servers are located. We ensure compliance with applicable data protection laws.</p>
          </section>

          {/* Section 8 */}
          <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-black">8</span>
              Policy Updates
            </h2>
            <p>We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.</p>
          </section>

          {/* Contact */}
          <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-2xl p-6 sm:p-8 text-center">
            <p className="text-base sm:text-lg font-semibold text-white">
              📧 For any privacy-related questions, reach out to us:
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