"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";

export default function FooterSlot() {
  const pathname = usePathname();

  if (pathname === "/contact") {
    return null;
  }

  return <Footer />;
}
