"use client";
import React, { useState } from "react";
import User from "../User";
import Link from "next/link";
import { MenuIcon, X } from "lucide-react";
import { motion, Variants } from "motion/react";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navItem = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Pricing", path: "/price" },
    { name: "Contact", path: "/contact" },
  ];

  const scaleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.3 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 1, duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 w-full mx-auto flex items-center">
      <motion.nav
        variants={scaleVariants}
        transition={{ duration: 0.8, ease: "easeOut" }}
        initial="hidden"
        animate="visible"
        className="w-full py-3 m-5 flex justify-between items-center rounded-[50px] px-5 bg-offwhite/50 backdrop-blur-sm text-[#1A1A1A] shadow-2xl"
      >
        <motion.h1
          variants={scaleVariants}
          transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
          initial="hidden"
          animate="visible"
          className="text-lg font-semibold tracking-wider"
        >
          <Link href="/" aria-label="Go to homepage">
            Logo
          </Link>
        </motion.h1>

        <div className="hidden md:block">
          <motion.ul
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex gap-10 lg:gap-12 text-lg justify-center items-center tracking-wide"
          >
            {navItem.map((item) => (
              <li
                key={item.name}
                className="hover:text-primary transition-colors duration-200"
              >
                <Link href={item.path}>{item.name}</Link>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          variants={scaleVariants}
          transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
          initial="hidden"
          animate="visible"
          className="hidden md:block"
        >
          <User />
        </motion.div>

        <motion.div
          variants={scaleVariants}
          transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
          initial="hidden"
          animate="visible"
          className="md:hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon size={28} />
        </motion.div>
      </motion.nav>

      {isOpen && (
        <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex flex-col justify-center items-center gap-8 text-xl font-medium z-10 md:hidden transition-all duration-300">
          {navItem.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className="hover:text-[#4D4D4D]"
            >
              {item.name}
            </Link>
          ))}
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <X size={28} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
