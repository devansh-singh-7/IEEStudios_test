import HeroSection    from "@/components/sections/HeroSection";
import SelectedWork   from "@/components/sections/SelectedWork";
import StatsBar       from "@/components/sections/StatsBar";
import FAQSection     from "@/components/sections/FAQSection";
import Footer         from "@/components/sections/Footer";
import SectionDivider from "@/components/ui/SectionDivider";

// Metadata has moved back to app/layout.tsx

export default function Home() {
  return (
    <main>
      <HeroSection />
      
      <SectionDivider />
      <SelectedWork />
      
      {/* StatsBar already has borders out-of-the-box, but we can divide it too */}
      <StatsBar />
      
      <FAQSection />
      
      <Footer />
    </main>
  );
}
