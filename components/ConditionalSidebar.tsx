"use client";

import { usePathname } from "next/navigation";
import AppSidebar from "@/components/AppSidebar";

export default function ConditionalSidebar() {
  const pathname = usePathname() || "/";

  // Hide sidebar for auth pages (login, signup)
  if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    return null;
  }

  return <AppSidebar />;
}
