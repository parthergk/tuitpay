"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import CTA from "../../../../components/LandingPage/CTA";

type ContactFormInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact: React.FC = () => {
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    try {
      setLoading(true);
      setMessage(null);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Something went wrong");
      }

      setMessage({type:"success",text:"Message sent successfully!"});
      reset();
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setMessage({type:"error",text:error.message || "Failed to send message."});
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative z-0 flex flex-col bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#E0ECFF_25%,#EAE2FF_50%,#F8E8DB_75%,#FFFFFF_100%)]">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "url('/image/noise.png')",
          backgroundSize: "128px",
          backgroundRepeat: "repeat",
        }}
      ></div>

      <div className="relative w-full px-4 sm:px-8 pt-28 sm:pt-36 lg:pt-44">
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
            Have questions about Smritya? We'd love to hear from you. Send us a
            message and we'll respond as soon as possible.
          </motion.p>
        </section>

        {/* Contact Section */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-20">
          {/* Left Section */}
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
                  content: "support@smritya.com",
                  link: "mailto:support@smritya.com",
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
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white/60 backdrop-blur-md border border-white/50 rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-forum text-heading mb-6">
                Send us a Message
              </h2>
              
              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-heading mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-heading mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Enter a valid email address",
                      },
                    })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-heading mb-2"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    {...register("subject", {
                      required: "Subject is required",
                    })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="How can we help?"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-heading mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register("message", {
                      required: "Message cannot be empty",
                    })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/80 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60
                    ${
                      loading
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-primary hover:bg-[#ea580c] active:bg-[#c2410c] text-white"
                    }
                    `}
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
                {message && (
                <div
                  className={`mt-2 p-2 rounded-md text-sm font-medium bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30 shadow-xl shadow-black/10 border border-white/50 ${
                    message.type === "success"
                      ? "text-[#0F9D58]"
                      : "text-[#E53935]"
                  }`}
                >
                  {message.text}
                </div>
              )}
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
