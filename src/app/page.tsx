/**
 * Longly Homepage Redesign
 *
 * NOTE FOR RONE:
 * The following sections contain placeholder satirical content that you should personalize
 * before shipping:
 * 1. LogoStrip (src/components/LogoStrip/LogoStrip.tsx) - Fictional developer tool integrations.
 * 2. Testimonial (src/components/Testimonial/Testimonial.tsx) - Fictional VP & Architect reviews.
 * 3. UseCaseSlider (src/components/UseCaseSlider/UseCaseSlider.tsx) - Comedic social bio and card mockups.
 */

import { Metadata } from "next";
import NavBar from "@/components/NavBar/NavBar";
import Hero from "@/components/Hero/Hero";
import LogoStrip from "@/components/LogoStrip/LogoStrip";
import FeatureCards from "@/components/FeatureCards/FeatureCards";
import StatsBar from "@/components/StatsBar/StatsBar";
import Testimonial from "@/components/Testimonial/Testimonial";
import UseCaseSlider from "@/components/UseCaseSlider/UseCaseSlider";
import ClosingBanner from "@/components/ClosingBanner/ClosingBanner";
import Footer from "@/components/Footer/Footer";
import ExitIntentPopup from "@/components/ExitIntentPopup/ExitIntentPopup";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Longly - Absurdly Long Reversible URLs",
  description:
    "The premium satirical URL longener. Convert standard links into beautifully descriptive, fully reversible, human-readable prose with zero database storage.",
};

export default function Home() {
  return (
    <div className={styles.container}>
      {/* 2. Sticky Nav Bar */}
      <NavBar />

      <main className={styles.main}>
        {/* 3. Hero Section (with Inline Tool Widget) */}
        <Hero />

        {/* 4. Logo Strip */}
        <LogoStrip />

        {/* 5. Three-Card Feature Row */}
        <FeatureCards />

        {/* 6. Stats Bar */}
        <StatsBar />

        {/* 7. Testimonial Section */}
        <Testimonial />

        {/* 8. Absurd Use Cases Slider */}
        <UseCaseSlider />

        {/* 9. Closing CTA Banner */}
        <ClosingBanner />
      </main>

      {/* 10. Multi-column Footer */}
      <Footer />

      {/* 11. Exit Intent Popup Modal */}
      <ExitIntentPopup />
    </div>
  );
}
