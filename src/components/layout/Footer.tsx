"use client";
import React from "react";
import Link from "next/link"; // Imported Link
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import {
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
} from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-white border-t-2 border-[#FF6B9D]/20 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-12 text-[#2C3E50]">
        {/* Brand */}
        <div>
          <Link href="/">
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A569BD] to-[#5DADE2] cursor-pointer">
              WonderLand
            </h2>
          </Link>

          <p className="text-sm mt-3 text-[#2C3E50]/70 leading-relaxed">
            A magical world of toys, imagination, joy, and creativity.
          </p>

          <div className="flex gap-4 mt-4">
            <FaFacebookF className="text-xl cursor-pointer hover:text-[#FF6B9D] transition" />
            <FaInstagram className="text-xl cursor-pointer hover:text-[#A569BD] transition" />
            <FaTwitter className="text-xl cursor-pointer hover:text-[#5DADE2] transition" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#A569BD]">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#FF6B9D] transition">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-[#FF6B9D] transition">
              <Link href="/shop">Shop</Link>
            </li>
            <li className="hover:text-[#FF6B9D] transition">
              <Link href="/categories">Categories</Link>
            </li>
            <li className="hover:text-[#FF6B9D] transition">
              <Link href="/about">About Us</Link>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#A569BD] to-[#5DADE2]">
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#A569BD] transition">
              <Link href="/help">Help Center</Link>
            </li>
            <li className="hover:text-[#A569BD] transition">
              <Link href="/shipping">Shipping Info</Link>
            </li>
            <li className="hover:text-[#A569BD] transition">
              <Link href="/returns">Returns</Link>
            </li>
            <li className="hover:text-[#A569BD] transition">
              <Link href="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#5DADE2] to-[#A569BD]">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <IoLocationOutline className="text-[#FF6B9D] text-xl" />
              Rawalpindi, Pakistan
            </li>
            <li className="flex items-center gap-3">
              <IoCallOutline className="text-[#A569BD] text-xl" />
              +92 300 xxxxxxx
            </li>
            <li className="flex items-center gap-3">
              <IoMailOutline className="text-[#5DADE2] text-xl" />
              support@wonderland.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-[#FF6B9D]/10 py-4 text-center text-sm text-[#2C3E50]/70">
        © {new Date().getFullYear()} WonderLand — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
