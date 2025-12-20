"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ⭐️ Import the useAuth hook
import { useAuth } from "../../context/AuthProvider";

import { BiShoppingBag } from "react-icons/bi";
import { TiHeartOutline } from "react-icons/ti";
import { IoSearchSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa"; // User icon

import AuthModal from "../ui/AuthModal";

const Navbar = () => {
  // ⭐️ Destructure user and profile from the AuthContext
  const { user, profile, signOut } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  // Conditional rendering for the User Icon area
  const renderAuthIcon = () => {
    // Check if the user object exists
    if (user) {
      // User is logged in and session is active
      return (
        <div className="group relative">
          {/* User Icon or Profile Name */}
          <Link href="/profile">
            <FaRegUserCircle className="text-3xl cursor-pointer text-[#A569BD] hover:text-[#FF6B9D] hover:scale-110 transition" />
          </Link>

          {/* Simple Dropdown for Sign Out */}
          <div className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
            >
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Profile
              </Link>
              <button
                onClick={signOut} // Call the signOut function from AuthContext
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                role="menuitem"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      // User is logged out: Show Login/Signup Icon that opens the modal
      return (
        <FaRegUserCircle
          onClick={() => setIsAuthOpen(true)}
          className="text-3xl cursor-pointer hover:text-[#FF6B9D] hover:scale-110 transition"
        />
      );
    }
  };

  return (
    <>
      {/* Auth Modal */}
      <AuthModal open={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      <nav className="bg-white w-full fixed top-12 left-0 shadow-md z-40 border-b-2 border-[#FF6B9D]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo + Menu */}
          {/* ... (Logo and Menu code remains the same) ... */}
          <div className="flex items-center gap-10">
            <Link href="/">
              <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A569BD] to-[#5DADE2] tracking-tight cursor-pointer hover:scale-105 transition-transform">
                WonderLand
              </h1>
            </Link>

            <ul className="hidden md:flex gap-8 text-base font-semibold text-[#2C3E50]">
              {/* ... (Navigation Links) ... */}
            </ul>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-5 text-[#2C3E50]">
            <IoSearchSharp className="text-2xl cursor-pointer hover:text-[#FF6B9D] hover:scale-110 transition" />
            <TiHeartOutline className="text-2xl cursor-pointer hover:text-[#FF6B9D] hover:scale-110 transition" />

            {/* Cart */}
            <div className="relative">
              <BiShoppingBag className="text-2xl cursor-pointer hover:text-[#FF6B9D] hover:scale-110 transition" />
              <span className="absolute -top-2 -right-2 bg-[#FFC93C] text-[#2C3E50] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </div>

            {/* ⭐️ RENDER THE CONDITIONAL ICON HERE ⭐️ */}
            {renderAuthIcon()}

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
        {/* ... (Mobile Menu code remains the same) ... */}
      </nav>
    </>
  );
};

export default Navbar;
