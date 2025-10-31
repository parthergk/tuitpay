"use client";
import React from "react";
import { motion, Variants } from "motion/react";
import { HeartHandshake, Rocket, Sparkles, Users } from "lucide-react";
import CTA from "../../../../components/LandingPage/CTA";

const About = () => {
  const slideLeftVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 1.8, duration: 0.6, ease: "easeOut" },
    },
  };

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
      ></div>

      <div className="relative w-full max-w-7xl mx-auto pt-28 sm:pt-36 lg:pt-44">
        {/* Hero Section */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-16 sm:gap-20 md:gap-28 text-start pb-12 sm:pb-16 lg:pb-20">
          <div className="flex-1 space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-forum text-heading leading-tight">
              <motion.span
                variants={slideLeftVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                className="block"
              >
                Making Fee Management
              </motion.span>
              <motion.span
                variants={slideLeftVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
                className="block"
              >
                Simple for Every Tutor
              </motion.span>
            </h1>

            <motion.p
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="text-base sm:text-lg text-sub max-w-2xl leading-relaxed"
            >
              Feexy helps private tutors and coaching centers easily track
              student fees, send reminders, and get paid on time — all from one
              simple dashboard.
            </motion.p>
          </div>

          <div className="flex-1 flex justify-center sm:justify-end">
            <div className="w-[280px] h-[240px] sm:w-[360px] sm:h-[300px] bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500">
              Image
            </div>
          </div>
        </section>

        {/* What Makes Feexy Different */}
        <section className="py-24 sm:py-32 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-forum text-heading mb-6"
          >
            What Makes Feexy Different
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-12 text-base italic leading-relaxed text-muted max-w-2xl mx-auto"
          >
            At Feexy, we believe managing fees should be as easy as teaching
            your favorite subject. No spreadsheets. No stress. Just simple,
            smooth fee management.
          </motion.p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 md:gap-12">
            {[
              { icon: Sparkles, text: "Built for Tutors, Not Accountants" },
              { icon: HeartHandshake, text: "Focus on Teaching, Not Tracking" },
              { icon: Rocket, text: "Automated Reminders & UPI Payments" },
              { icon: Users, text: "Trusted by Growing Coaching Centers" },
            ].map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="py-6 sm:py-8 px-4 sm:px-6 rounded-2xl shadow-md shadow-black/10 border border-white/50 bg-gradient-to-bl from-[#E8DFFF]/40 to-[#DDEBFF]/40 hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
              >
                <Icon className="mx-auto w-10 h-10 text-primary mb-4" />
                <p className="text-center text-base font-medium text-gray-700">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 sm:py-32 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-forum text-heading mb-6"
          >
            Our Mission
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mx-auto text-base sm:text-lg text-sub max-w-4xl leading-relaxed mb-10"
          >
            We built Feexy with one goal in mind — to take the stress out of fee
            tracking. As teachers and tutors, your time is better spent
            teaching, not chasing payments. Feexy automates all the small but
            important things — recording payments, sending reminders, and
            organizing student details — so you can focus on what truly matters:
            your students.
          </motion.p>

          <div className="w-full max-w-3xl mx-auto h-[240px] sm:h-[300px] bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500">
            Image
          </div>
        </section>

        <CTA />
      </div>
    </section>
  );
};

export default About;
