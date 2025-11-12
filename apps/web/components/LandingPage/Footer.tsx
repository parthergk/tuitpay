import { Linkedin, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-primary text-white w-full pt-14 md:pt-28 px-5">
      {/* Subtle Noise Texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/image/noise.png')",
          backgroundSize: "128px",
          backgroundRepeat: "repeat",
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-white tracking-widest">
            Smritya
          </h2>
          <p className="mt-3 text-sm text-orange-50 leading-relaxed">
            Empowering teachers and institutes to manage fees, track students,
            and send reminders — all in one simple platform.
          </p>
        </div>

        {/* Links 1 */}
        <div>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-orange-50 hover:text-black transition"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-orange-50 hover:text-black transition"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-orange-50 hover:text-black transition"
              >
                How it Works
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-orange-50 hover:text-black transition"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Links 2 */}
        <div>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-orange-50 hover:text-black transition"
              >
                Terms & Conditions
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-orange-50 hover:text-black transition"
              >
                Privacy Policy
              </a>
            </li>
            
          </ul>
        </div>

        {/* Socials */}
        <div className="flex gap-4 items-start">
          <a
            href="#"
            className="p-2 rounded-full border border-white text-white hover:bg-black hover:border-black transition"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="#"
            className="p-2 rounded-full border border-white text-white hover:bg-black hover:border-black transition"
          >
            <Twitter size={18} />
          </a>
          <a
            href="#"
            className="p-2 rounded-full border border-white text-white hover:bg-black hover:border-black transition"
          >
            <Instagram size={18} />
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative border-t border-orange-300/40 mt-10 py-6 text-sm text-orange-50 text-center">
        © {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
