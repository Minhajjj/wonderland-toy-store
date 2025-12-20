"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthProvider";
import { BiShoppingBag } from "react-icons/bi";
import { TiHeartOutline } from "react-icons/ti";
import { IoSearchSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { RiShieldUserLine } from "react-icons/ri";

import AuthModal from "../ui/AuthModal";

const Navbar = () => {
  const { user, profile, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const pathname = usePathname();

  const renderAuthIcon = () => {
    if (user) {
      return (
        <div className="group relative">
          <Link href="/profile">
            <FaRegUserCircle className="text-3xl cursor-pointer text-[#A569BD] hover:text-[#FF6B9D] hover:scale-110 transition" />
          </Link>

          <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-[60] overflow-hidden border border-gray-100">
            <div className="py-1">
              {profile?.role === "admin" && (
                <Link
                  href="/admin"
                  className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-purple-600 hover:bg-purple-50 border-b border-gray-50"
                >
                  <RiShieldUserLine className="text-lg" />
                  Admin Dashboard
                </Link>
              )}
              <Link href="/profile" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
                My Profile
              </Link>
              <button
                onClick={signOut}
                className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      );
    } else {
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
      <AuthModal open={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* 1. top-10 or top-12: This should match the height of your Top Banner.
          2. z-40: Ensures it stays above page content but potentially below modals.
      */}
      <nav className="bg-white w-full fixed top-12 left-0 shadow-md z-40 border-b-2 border-[#FF6B9D]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-10">
            <Link href="/">
              <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A569BD] to-[#5DADE2] tracking-tight cursor-pointer">
                WonderLand
              </h1>
            </Link>

            <ul className="hidden md:flex gap-8 text-base font-semibold text-[#2C3E50]">
              <li><Link href="/shop" className="hover:text-[#FF6B9D] transition">Shop</Link></li>
              <li><Link href="/categories" className="hover:text-[#FF6B9D] transition">Categories</Link></li>
            </ul>
          </div>

          <div className="flex items-center gap-5 text-[#2C3E50]">
            {/* Admin Quick Link */}
            {profile?.role === "admin" && (
              <Link
                href="/admin"
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-black uppercase hover:bg-purple-200 transition"
              >
                <RiShieldUserLine />
                Admin
              </Link>
            )}

            <IoSearchSharp className="text-2xl cursor-pointer hover:text-[#FF6B9D]" />

            <div className="relative">
              <BiShoppingBag className="text-2xl cursor-pointer hover:text-[#FF6B9D]" />
              <span className="absolute -top-2 -right-2 bg-[#FFC93C] text-[#2C3E50] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </div>

            {renderAuthIcon()}
          </div>
        </div>
      </nav>

      {/* IMPORTANT: This spacer prevents your page content from starting 
          underneath the fixed navbar. 
      */}
      <div className="h-32"></div> 
    </>
  );
};

export default Navbar;