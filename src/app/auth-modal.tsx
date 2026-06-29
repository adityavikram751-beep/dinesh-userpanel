"use client";

import { useEffect, useState } from "react";
import { PASSWORD_RULE_MESSAGE, useAuth } from "./auth-context";

export default function AuthModal() {
  const {
    authModalOpen,
    authMode,
    closeAuthModal,
    setAuthMode,
    login,
    signup,
    forgotPassword,
    verifyOtp,
    resetPassword,
  } = useAuth();

  const [forgotStep, setForgotStep] = useState<"email" | "otp" | "password">("email");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!authModalOpen) return;
    const resetTimer = window.setTimeout(() => {
      setName("");
      setEmail("");
      setOtp("");
      setVerificationId("");
      setResetToken("");
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setForgotStep("email");
      setMessage("");
      setIsSubmitting(false);
      setShowPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    }, 0);

    return () => {
      window.clearTimeout(resetTimer);
    };
  }, [authModalOpen, authMode]);

  useEffect(() => {
    if (!authModalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [authModalOpen]);

  if (!authModalOpen) return null;

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setMessage("");

    if (authMode === "login") {
      const result = await login(email, password);
      setMessage(result.message);
      setIsSubmitting(false);
      return;
    }

    if (authMode === "signup") {
      const result = await signup(name, email, password);
      setMessage(result.message);
      setIsSubmitting(false);
      return;
    }

    if (authMode === "forgot") {
      if (forgotStep === "email") {
        const result = await forgotPassword(email);
        if (result.success && result.verificationId) {
          setVerificationId(result.verificationId);
          setForgotStep("otp");
        }
        setMessage(result.message);
        setIsSubmitting(false);
        return;
      }

      if (forgotStep === "otp") {
        const result = await verifyOtp(verificationId, otp);
        if (result.success && result.resetToken) {
          setResetToken(result.resetToken);
          setForgotStep("password");
        }
        setMessage(result.message);
        setIsSubmitting(false);
        return;
      }

      if (newPassword !== confirmPassword) {
        setMessage("New password and confirm password do not match.");
        setIsSubmitting(false);
        return;
      }

      const result = await resetPassword(resetToken, newPassword);
      if (result.success) {
        setAuthMode("login");
        setForgotStep("email");
        setOtp("");
        setVerificationId("");
        setResetToken("");
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
      setMessage(result.message);
    }

    setIsSubmitting(false);
  };

  const resendOtp = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setMessage("");
    const result = await forgotPassword(email);
    if (result.success && result.verificationId) {
      setVerificationId(result.verificationId);
    }
    setOtp("");
    setMessage(result.message);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4 sm:px-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeAuthModal} />
      
      {/* Modal */}
      <div className="relative z-10 mx-auto w-full max-w-md overflow-y-auto rounded-2xl bg-[#111111] p-6 shadow-2xl sm:max-h-[90vh] sm:p-8 border border-emerald-500/20">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-emerald-400">
              {authMode === "login" && "Welcome Back"}
              {authMode === "signup" && "Join Now"}
              {authMode === "forgot" && forgotStep === "email" && "Reset Password"}
              {authMode === "forgot" && forgotStep === "otp" && "Verify OTP"}
              {authMode === "forgot" && forgotStep === "password" && "New Password"}
            </p>
            <h2 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-white">
              {authMode === "login" && "Login to your account"}
              {authMode === "signup" && "Create a new account"}
              {authMode === "forgot" && forgotStep === "email" && "Reset your password"}
              {authMode === "forgot" && forgotStep === "otp" && "Enter OTP"}
              {authMode === "forgot" && forgotStep === "password" && "Create new password"}
            </h2>
          </div>
          <button 
            type="button" 
            onClick={closeAuthModal} 
            className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-zinc-700 text-lg text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
          
          {/* Name - Signup only */}
          {authMode === "signup" && (
            <label className="block text-sm font-semibold text-zinc-200">
              Name
              <input
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-black/40 px-4 py-3 sm:py-4 text-base text-white placeholder:text-zinc-500 outline-none transition focus:border-emerald-400 focus:bg-black/60"
                placeholder="Your full name"
              />
            </label>
          )}

          {/* Email */}
          {(authMode === "login" || authMode === "signup" || (authMode === "forgot" && forgotStep === "email")) && (
            <label className="block text-sm font-semibold text-zinc-200">
              Email
              <input
                autoComplete="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-black/40 px-4 py-3 sm:py-4 text-base text-white placeholder:text-zinc-500 outline-none transition focus:border-emerald-400 focus:bg-black/60"
                placeholder="you@example.com"
              />
            </label>
          )}

          {/* Password with Eye Icon */}
          {(authMode === "login" || authMode === "signup") && (
            <div>
              <label className="block text-sm font-semibold text-zinc-200">
                Password
                <div className="relative mt-2">
                  <input
                    autoComplete={authMode === "signup" ? "new-password" : "current-password"}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-xl border border-zinc-700 bg-black/40 px-4 py-3 sm:py-4 pr-12 text-base text-white placeholder:text-zinc-500 outline-none transition focus:border-emerald-400 focus:bg-black/60"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </label>
              <p className="mt-1 px-1 text-[10px] sm:text-xs font-semibold leading-5 text-zinc-500">
              Password must be at least 8 characters long, start with a capital letter, contain at least one number.              </p>
            </div>
          )}

          {/* OTP */}
          {authMode === "forgot" && forgotStep === "otp" && (
            <div className="space-y-3 sm:space-y-4">
              <div className="rounded-xl border border-zinc-700 bg-black/40 px-4 py-3 sm:py-4 text-sm text-zinc-300">
                OTP sent to <span className="font-bold text-emerald-300">{email}</span>
              </div>
              <label className="block text-sm font-semibold text-zinc-200">
                OTP
                <input
                  autoComplete="one-time-code"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
                  className="mt-2 w-full rounded-xl border border-zinc-700 bg-black/40 px-4 py-3 sm:py-4 text-base text-white placeholder:text-zinc-500 outline-none transition focus:border-emerald-400 focus:bg-black/60"
                  placeholder="Enter 6 digit OTP"
                />
              </label>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={resendOtp}
                className="text-sm font-semibold text-emerald-400 transition hover:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Resend OTP
              </button>
            </div>
          )}

          {/* New Password with Eye Icon */}
          {authMode === "forgot" && forgotStep === "password" && (
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-zinc-200">
                New Password
                <div className="relative mt-2">
                  <input
                    autoComplete="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    className="w-full rounded-xl border border-zinc-700 bg-black/40 px-4 py-3 sm:py-4 pr-12 text-base text-white placeholder:text-zinc-500 outline-none transition focus:border-emerald-400 focus:bg-black/60"
                    placeholder="Create a new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
                  >
                    {showNewPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </label>
              <p className="-mt-2 px-1 text-[10px] sm:text-xs font-semibold leading-5 text-zinc-500">
              Password must be at least 8 characters long, start with a capital letter, contain at least one number.              </p>
              <label className="block text-sm font-semibold text-zinc-200">
                Confirm Password
                <div className="relative mt-2">
                  <input
                    autoComplete="new-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="w-full rounded-xl border border-zinc-700 bg-black/40 px-4 py-3 sm:py-4 pr-12 text-base text-white placeholder:text-zinc-500 outline-none transition focus:border-emerald-400 focus:bg-black/60"
                    placeholder="Confirm your new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
                  >
                    {showConfirmPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </label>
            </div>
          )}

          {/* Message */}
          {message && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              {message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-5 py-3.5 sm:py-4 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting && "Please wait..."}
            {!isSubmitting && authMode === "login" && "Login"}
            {!isSubmitting && authMode === "signup" && "Sign up"}
            {!isSubmitting && authMode === "forgot" && forgotStep === "email" && "Send OTP"}
            {!isSubmitting && authMode === "forgot" && forgotStep === "otp" && "Verify OTP"}
            {!isSubmitting && authMode === "forgot" && forgotStep === "password" && "Reset password"}
          </button>

          {/* Footer Links */}
          <div className="flex flex-col gap-2 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
            {authMode === "login" && (
              <>
                <button 
                  type="button" 
                  onClick={() => setAuthMode("signup")} 
                  className="font-semibold text-emerald-400 transition hover:text-emerald-300"
                >
                  Create an account
                </button>
                <button 
                  type="button" 
                  onClick={() => setAuthMode("forgot")} 
                  className="font-semibold text-emerald-400 transition hover:text-emerald-300"
                >
                  Forgot password?
                </button>
              </>
            )}
            {authMode === "signup" && (
              <button 
                type="button" 
                onClick={() => setAuthMode("login")} 
                className="font-semibold text-emerald-400 transition hover:text-emerald-300"
              >
                Already have an account? Login
              </button>
            )}
            {authMode === "forgot" && (
              <div className="flex gap-4">
                {forgotStep !== "email" && (
                  <button
                    type="button"
                    onClick={() => {
                      setMessage("");
                      setForgotStep(forgotStep === "password" ? "otp" : "email");
                    }}
                    className="font-semibold text-emerald-400 transition hover:text-emerald-300"
                  >
                    Back
                  </button>
                )}
                <button 
                  type="button" 
                  onClick={() => setAuthMode("login")} 
                  className="font-semibold text-emerald-400 transition hover:text-emerald-300"
                >
                  Back to login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}