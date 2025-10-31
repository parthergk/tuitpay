"use client";
import Footer from "../../../components/LandingPage/Footer";
import HeroSection from "../../../components/LandingPage/Sections/HeroSection";
import TrustSection from "../../../components/LandingPage/Sections/TrustSection";
import FeatureSection from "../../../components/LandingPage/Sections/FeatureSection";
import HowToUseSection from "../../../components/LandingPage/Sections/HowToUseSection";
import CTA from "../../../components/LandingPage/CTA";
import TestimonialSection from "../../../components/LandingPage/Sections/TestimonialSection";
import PriceSection from "../../../components/LandingPage/Sections/PriceSection";

export default function Home() {
  return (
    <>
      <div className=" w-full min-h-screen flex flex-col bg-[#EAE2FF]">
        <HeroSection />
        <TrustSection />
        <FeatureSection />
        <HowToUseSection />
        <TestimonialSection />
        <PriceSection />
        <CTA />
      </div>
    </>
  );
}
