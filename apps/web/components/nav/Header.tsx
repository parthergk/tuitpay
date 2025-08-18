"use client";
import React, { useState } from "react";
import User from "../User";
import Link from "next/link";
import { MenuIcon, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navItem = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Pricing", path: "/price" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 z-20 w-full flex items-center">
      <nav className="w-full py-3 m-5 flex justify-between items-center rounded-[50px] px-5 bg-offwhite/50 text-[#1A1A1A] shadow-2xl">
        {/* Logo */}
        <h1 className="text-lg font-semibold tracking-wider">
          <Link href="/">Logo</Link>
        </h1>

        {/* Desktop Nav */}
        <div className="hidden md:block">
          <ul className="flex gap-10 lg:gap-12 text-lg justify-center items-center tracking-wide">
            {navItem.map((item) => (
              <li key={item.name} className="hover:text-[#4D4D4D]">
                <Link href={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop User */}
        <div className="hidden md:block">
          <User />
        </div>

        {/* Mobile Menu Icon */}
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
           <MenuIcon size={28} />
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
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
