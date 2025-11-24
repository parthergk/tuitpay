"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import CTA from "../../../../components/LandingPage/CTA";
import PriceCard from "../../../../components/LandingPage/Cards/PriceCard";
import { IPlan } from "@repo/types";

const Price = () => {
    const [plans, setPlans] = useState<IPlan[]>([]);
    
      useEffect(() => {
        const fetchProducts = async () => {
          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/plan`);
            const {plans} = await res.json();
            setPlans(plans);
          } catch (error) {
            console.log("Error during the fetching the plan", error);
          }
        };
        fetchProducts();
      }, [plans]);
  return (
    <section className="relative z-0 flex flex-col bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#E0ECFF_25%,#EAE2FF_50%,#F8E8DB_75%,#FFFFFF_100%)]">
      {/* Subtle noise background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "url('/image/noise.png')",
          backgroundSize: "128px",
          backgroundRepeat: "repeat",
        }}
      />
        {/* Hero Section */}
        <div className="relative w-full px-4 pt-28 sm:pt-36 lg:pt-44 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-forum text-heading"
          >
            Simple Pricing for Every Tutor
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 text-lg sm:text-xl text-sub max-w-2xl mx-auto"
          >
            No hidden fees. No confusing plans. Just one platform to manage your
            students, track payments, and send automatic reminders.
          </motion.p>
        </div>

        {/* Pricing Plans */}
        <div className="relative w-full px-4 mt-10 lg:mt-20">

        <div className="  grid grid-cols-1 md:grid-cols-2 gap-10">
          {plans && plans.map((plan, index) => (
              <PriceCard key={index} {...plan} />
            ))}
        </div>
            </div>

      {/* FAQ Section */}
      <div className="relative w-full px-4 mt-32 md:mt-48 text-center ">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-forum text-heading mb-12"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-8 text-left">
          {[
            {
              q: "Can I try Yadxy for free?",
              a: "Yes! You can start with our free trial — no credit card required.",
            },
            {
              q: "Is Yadxy difficult to set up?",
              a: "Not at all. Yadxy is designed for tutors with no tech background. You’ll be ready in minutes.",
            },
            {
              q: "Can I cancel anytime?",
              a: "Absolutely. You can upgrade, downgrade, or cancel whenever you want.",
            },
            {
              q: "What if I need help?",
              a: "You can reach our support team anytime at team@yadxy.com. We’re here to help!",
            },
          ].map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/50 backdrop-blur-md border border-white/40 rounded-xl px-6 py-3 shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg text-heading mb-2">
                {faq.q}
              </h3>
              <p className="text-sub leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <CTA />
    </section>
  );
};

export default Price;
