"use client";

import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/sections/Navbar";
import PageTransition from "@/components/ui/PageTransition";
import GlobalStars from "@/components/ui/GlobalStars";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useLenis();

  return (
    <>
      <GlobalStars />
      <Navbar />
      <PageTransition>{children}</PageTransition>
    </>
  );
}
