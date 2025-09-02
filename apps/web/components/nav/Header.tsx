"use client";
import React, { useState } from "react";
import User from "../User";
import Link from "next/link";
import { MenuIcon, X } from "lucide-react";
import { motion } from "motion/react";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navItem = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Pricing", path: "/price" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 right-0 left-0 z-50 w-full max-w-5xl mx-auto flex items-center">
      <motion.nav
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1,
        }}
        className="w-full py-3 m-5 flex justify-between items-center rounded-[50px] px-5 bg-offwhite/50 backdrop-blur-sm text-[#1A1A1A] shadow-2xl"
      >
        <motion.h1
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 1.5,
            duration: 0.6,
          }}
          className="text-lg font-semibold tracking-wider"
        >
          <Link href="/">Logo</Link>
        </motion.h1>

        <div className="hidden md:block">
          <motion.ul
            initial={{ opacity: 0, transform: "translateY(60%)" }}
            animate={{ opacity: 1, transform: "translateY(0%)" }}
            transition={{ delay: 1.2, duration: 0.5 }}
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
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 1.5,
            duration: 0.6,
          }}
          className="hidden md:block"
        >
          <User />
        </motion.div>

        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 1.5,
            duration: 0.6,
          }}
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
