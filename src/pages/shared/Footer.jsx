import React from "react";
import Logo from "./Logo";
import {
  FaLinkedinIn,
  FaXTwitter,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="mb-10">
      <div className="rounded-[28px] bg-[#0F1010] text-white px-6 md:px-10 py-10 md:py-12">
        {/* Logo */}
        <div className="flex justify-center">
          <Logo />
        </div>

        {/* Tagline */}
        <p className="mt-4 text-center text-sm text-gray-300 max-w-3xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        {/* dashed rule */}
        <div className="mt-6 border-t border-dashed border-teal-700/40" />

        {/* Nav links */}
        <nav className="mt-4">
          <ul className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300">
            <li>
              <a href="#services" className="hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a href="#coverage" className="hover:text-white">
                Coverage
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-white">
                Pricing
              </a>
            </li>
            <li>
              <a href="#blog" className="hover:text-white">
                Blog
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* dashed rule */}
        <div className="mt-4 border-t border-dashed border-teal-700/40" />

        {/* Socials */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <a
            href="https://linkedin.com"
            aria-label="LinkedIn"
            className="h-9 w-9 rounded-full bg-[#0A66C2] grid place-items-center hover:opacity-90"
          >
            <FaLinkedinIn className="text-white" />
          </a>
          <a
            href="https://x.com"
            aria-label="X"
            className="h-9 w-9 rounded-full bg-white grid place-items-center hover:opacity-90"
          >
            <FaXTwitter className="text-black" />
          </a>
          <a
            href="https://facebook.com"
            aria-label="Facebook"
            className="h-9 w-9 rounded-full bg-[#1877F2] grid place-items-center hover:opacity-90"
          >
            <FaFacebookF className="text-white" />
          </a>
          <a
            href="https://youtube.com"
            aria-label="YouTube"
            className="h-9 w-9 rounded-full bg-[#FF0000] grid place-items-center hover:opacity-90"
          >
            <FaYoutube className="text-white" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
