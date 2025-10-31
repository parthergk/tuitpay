"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import CTA from "../../../../components/LandingPage/CTA";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
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

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-10 pt-28 sm:pt-36 lg:pt-44">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-forum text-heading mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl text-sub max-w-2xl mx-auto leading-relaxed"
          >
            Have questions about Feexy? We'd love to hear from you. Send us a
            message and we'll respond as soon as possible.
          </motion.p>
        </section>

        {/* Contact Content */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-20">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 space-y-8"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-forum text-heading mb-6">
                Contact Information
              </h2>
              <p className="text-base text-sub leading-relaxed mb-8">
                Whether you need support, have a question about pricing, or just
                want to say hello — we're here to help.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  content: "support@feexy.in",
                  link: "mailto:support@feexy.in",
                },
                {
                  icon: Phone,
                  title: "Phone",
                  content: "+91 XXX XXX XXXX",
                  link: "tel:+91XXXXXXXXXX",
                },
                {
                  icon: MapPin,
                  title: "Office",
                  content: "Mumbai, Maharashtra, India",
                  link: null,
                },
              ].map(({ icon: Icon, title, content, link }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-5 rounded-xl bg-white/50 backdrop-blur-md border border-white/40 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-heading mb-1">{title}</h3>
                    {link ? (
                      <a
                        href={link}
                        className="text-sub hover:text-primary transition-colors"
                      >
                        {content}
                      </a>
                    ) : (
                      <p className="text-sub">{content}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-8 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
            >
              <h3 className="font-semibold text-heading mb-2">
                Quick Support Available
              </h3>
              <p className="text-sm text-sub leading-relaxed">
                Our support team typically responds within 24 hours on business
                days. For urgent matters, please call us directly.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-forum text-heading mb-6">
                Send us a Message
              </h2>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-heading mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/80 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-heading mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/80 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-heading mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/80 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-heading mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/80 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        <CTA />
      </div>
    </section>
  );
};

export default Contact;