"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Footer from "../../../components/LandingPage/Footer";
import HeroSection from "../../../components/LandingPage/Sections/HeroSection";
import TrustSection from "../../../components/LandingPage/Sections/TrustSection";
import FeatureSection from "../../../components/LandingPage/Sections/FeatureSection";
import HowToUseSection from "../../../components/LandingPage/Sections/HowToUseSection";
import CTA from "../../../components/LandingPage/CTA";
import TestimonialSection from "../../../components/LandingPage/Sections/TestimonialSection";


interface Inputs {
  email: string;
}

export default function Home() {
  const { register, handleSubmit } = useForm<Inputs>();
  const [isPopup, setIsPopup] = useState(false);
  const router = useRouter();

  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session.status, router]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch(
        `/api/auth/check-user?email=${encodeURIComponent(data.email)}`
      );
      const resData = await res.json();

      router.push(resData.exists ? "/login" : "/register");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className=" w-full min-h-screen flex flex-col bg-[#EAE2FF]">
      <HeroSection />
      <TrustSection />
      <FeatureSection />
      <HowToUseSection />
      <TestimonialSection/>
      <CTA />
      <Footer />
    </div>
  );
}
