// components/LayoutWithFooter.tsx
"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function LayoutWithFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");

  return (
    <>
      {children}
      {!isAuthRoute && <Footer />}
    </>
  );
}
