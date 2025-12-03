"use client";
import React, { useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { TiHeartOutline } from "react-icons/ti";
import { IoSearchSharp } from "react-icons/io5";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white w-full fixed top-12 left-0 shadow-md z-40 border-b-2 border-[#FF6B9D]/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo + Menu */}
        <div className="flex items-center gap-10">
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A569BD] to-[#5DADE2] tracking-tight">
            WonderLand
          </h1>

          <ul className="hidden md:flex gap-8 text-base font-semibold text-[#2C3E50]">
            <li className="hover:text-[#FF6B9D] transition cursor-pointer relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B9D] transition-all group-hover:w-full"></span>
            </li>
            <li className="hover:text-[#FF6B9D] transition cursor-pointer relative group">
              Shop
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B9D] transition-all group-hover:w-full"></span>
            </li>
            <li className="hover:text-[#FF6B9D] transition cursor-pointer relative group">
              Categories
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B9D] transition-all group-hover:w-full"></span>
            </li>
            <li className="hover:text-[#FF6B9D] transition cursor-pointer relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B9D] transition-all group-hover:w-full"></span>
            </li>
            <li className="hover:text-[#FF6B9D] transition cursor-pointer relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B9D] transition-all group-hover:w-full"></span>
            </li>
          </ul>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-5 text-[#2C3E50]">
          <IoSearchSharp className="text-2xl cursor-pointer hover:text-[#FF6B9D] hover:scale-110 transition" />
          <TiHeartOutline className="text-2xl cursor-pointer hover:text-[#FF6B9D] hover:scale-110 transition" />
          <div className="relative">
            <BiShoppingBag className="text-2xl cursor-pointer hover:text-[#FF6B9D] hover:scale-110 transition" />
            <span className="absolute -top-2 -right-2 bg-[#FFC93C] text-[#2C3E50] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              3
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-3xl text-[#FF6B9D] ml-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-[#FFF8F0] px-6 pb-4 text-base font-semibold text-[#2C3E50] flex flex-col gap-4 border-t-2 border-[#FF6B9D]/20">
          <li className="hover:text-[#FF6B9D] transition cursor-pointer">Home</li>
          <li className="hover:text-[#FF6B9D] transition cursor-pointer">Shop</li>
          <li className="hover:text-[#FF6B9D] transition cursor-pointer">Categories</li>
          <li className="hover:text-[#FF6B9D] transition cursor-pointer">About</li>
          <li className="hover:text-[#FF6B9D] transition cursor-pointer">Contact</li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;