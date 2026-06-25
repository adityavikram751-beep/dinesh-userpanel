// src/app/layout.tsx

import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import { AuthProvider } from "../app/auth-context";
import AuthModal from "../app/auth-modal";
import Header from "./header";
import FooterSlot from "./footer-slot";

export const metadata: Metadata = {
  title: "Dinesh Sehgal User Panel",
  description: "Fitness user panel built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Razorpay Checkout Script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />

        <AuthProvider>
          <Header />

          {children}

          <FooterSlot />
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}