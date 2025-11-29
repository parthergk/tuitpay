import React from "react";
import { Metadata } from "next";
import MotionSection from "../../../../components/LandingPage/about/MotionSection";

export const metadata: Metadata = {
  title: "About Yadxy – Fee Tracking Made Simple for Tutors",
  description:
    "Discover how Yadxy automates tuition fee tracking with WhatsApp reminders, UPI payments, and student management for tutors and coaching centers.",
  keywords: [
    "about yadxy",
    "tuition fee management software",
    "automated fee tracking",
    "coaching center software",
    "fee reminder system",
  ],
  alternates: { canonical: "https://yadxy.com/about" },
  openGraph: {
    title: "About Yadxy – Fee Tracking Made Simple for Tutors",
    description:
      "Learn how Yadxy helps tutors save time with automated fee tracking, WhatsApp reminders, and seamless payment management.",
    url: "https://yadxy.com/about",
    images: [
      {
        url: "https://yadxy.com/yadxy-social-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Yadxy tuition fee tracking platform for teachers",
      },
    ],
    
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Yadxy – Fee Tracking Made Simple for Tutors",
    description:
      "Learn the mission behind Yadxy and why we made fee tracking simple for tutors and coaching centers.",
    images: ["https://yadxy.com/yadxy-summary-large.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://yadxy.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: "https://yadxy.com/about",
    },
  ],
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  mainEntity: {
    "@type": "Organization",
    name: "Yadxy",
    description:
      "Yadxy helps private tutors and coaching centers easily track student fees, send reminders, and get paid on time.",
    foundingDate: "2024",
    url: "https://yadxy.com",
  },
};

const About = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <section className="relative z-0 flex flex-col bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#E0ECFF_25%,#EAE2FF_50%,#F8E8DB_75%,#FFFFFF_100%)]">
        {/* Subtle noise background */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "url('/image/noise.png')",
            backgroundSize: "128px",
            backgroundRepeat: "repeat",
          }}
        ></div>
        <MotionSection />
      </section>
    </>
  );
};

export default About;
