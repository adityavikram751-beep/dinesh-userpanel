// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";

import Header from "./header";
import Footer from "./footer";

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
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}