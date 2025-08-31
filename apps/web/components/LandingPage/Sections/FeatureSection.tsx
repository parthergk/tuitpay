import React from "react";
import FeatureCard from "../Cards/FeatureCard";
import { motion } from "framer-motion";

const FeatureSection = () => {
  const features = [
    {
      url: "/image/features/student.png",
      title: "Smart Student Management",
      desc: "Easily track every student in one place. Add new students, update details, and manage without any hassle. With our intuitive student database, teachers can save time and focus more on teaching.",
    },
    {
      url: "/image/features/reminder.png",
      title: "Automated Fee Reminders",
      desc: "The system sends smart WhatsApp and SMS reminders automatically before and after due dates. Teachers stay stress-free, while parents receive timely updates for hassle-free payments.",
    },
    {
      url: "/image/features/upi.png",
      title: "Instant UPI Payments",
      desc: "Collect tuition fees instantly through secure UPI-based payments. Every payment is logged in real time, ensuring accurate records and smooth transactions.",
    },
    {
      url: "/image/features/dashboard.png",
      title: "Fee Reports & Insights",
      desc: "Get a clear picture of your earnings with detailed fee reports and insights. Track pending, collected, and overdue payments, generate monthly reports.",
    },
    {
      url: "/image/features/mobile.png",
      title: "Mobile-First Dashboard",
      desc: "Designed for teachers on the go. Our mobile-friendly dashboard works seamlessly on phones, tablets, and desktops, giving you the freedom to manage fees anytime, anywhere.",
    },
    {
      url: "/image/features/security.png",
      title: "Secure & Private Data",
      desc: "Your data is 100% safe. With enterprise-grade security, all student and fee records are encrypted and accessible only to you. No third parties, no leaks—just complete privacy.",
    },
  ];
  return (
    <section className="mt-5 w-full py-14 md:py-28 px-5">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h3 className="sm:text-lg md:text-xl text-primary">FEATURES</h3>
        <h1 className="text-[28px] sm:text-4xl mt-5 ">
          Why Choose our Platform?
        </h1>
      </motion.div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-5 md:gap-y-10 pt-16 lg:mt-[72px]">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            url={feature.url}
            title={feature.title}
            desc={feature.desc}
          />
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
