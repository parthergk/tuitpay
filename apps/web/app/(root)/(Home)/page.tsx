import HeroSection from "../../../components/LandingPage/Sections/HeroSection";
import TrustSection from "../../../components/LandingPage/Sections/TrustSection";
import FeatureSection from "../../../components/LandingPage/Sections/FeatureSection";
import HowToUseSection from "../../../components/LandingPage/Sections/HowToUseSection";
import CTA from "../../../components/LandingPage/CTA";
import TestimonialSection from "../../../components/LandingPage/Sections/TestimonialSection";
import PriceSection from "../../../components/LandingPage/Sections/PriceSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yadxy – Smart Fee Tracker for Tutors & Coaching Centers",
  description:
    "Yadxy helps tuition teachers and coaching centers track student fees, send automated WhatsApp reminders, and manage payments easily. Simple, fast, and fully automated.",
  keywords: [
    "tuition fee tracker",
    "automated fee reminder",
    "teacher fee software",
    "coaching center management",
    "tuition management app",
    "student fee tracking",
    "whatsapp fee reminder",
    "yadxy",
  ],
  alternates: {
    canonical: "https://yadxy.com",
  },
  openGraph: {
    title: "Yadxy – Smart Fee Tracker for Tutors & Coaching Centers",
    description:
      "Track tuition fees, send automated reminders, accept UPI payments, and manage students effortlessly.",
    url: "https://yadxy.com",
    images: [
      {
        url: "https://yadxy.com/yadxy-social-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Yadxy fee tracking software for tutors",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yadxy – Smart Fee Tracker for Tutors & Coaching Centers",
    description:
      "Yadxy automates tuition fee reminders, student management, and UPI payments.",
    images: ["https://yadxy.com/yadxy-summary-large.jpg"],
  },
};

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Yadxy – Smart Fee Tracker",
  url: "https://yadxy.com",
  description:
    "Smart fee tracking and reminder automation for tuition teachers and coaching centers.",
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Yadxy",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://yadxy.com",
  description:
    "Yadxy helps tutors track fees, manage students, and automate WhatsApp reminders.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

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
