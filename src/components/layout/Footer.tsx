"use client";
import React from "react";
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
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A569BD] to-[#5DADE2]">
            WonderLand
          </h2>

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
            <li className="hover:text-[#FF6B9D] transition cursor-pointer">
              Home
            </li>
            <li className="hover:text-[#FF6B9D] transition cursor-pointer">
              Shop
            </li>
            <li className="hover:text-[#FF6B9D] transition cursor-pointer">
              Categories
            </li>
            <li className="hover:text-[#FF6B9D] transition cursor-pointer">
              About Us
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#A569BD] to-[#5DADE2]">
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#A569BD] transition cursor-pointer">
              Help Center
            </li>
            <li className="hover:text-[#A569BD] transition cursor-pointer">
              Shipping Info
            </li>
            <li className="hover:text-[#A569BD] transition cursor-pointer">
              Returns
            </li>
            <li className="hover:text-[#A569BD] transition cursor-pointer">
              Privacy Policy
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
              abc, Pakistan
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
