"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthProvider";
import { BiShoppingBag } from "react-icons/bi";
import { IoSearchSharp, IoChevronDownOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { RiShieldUserLine } from "react-icons/ri";

import AuthModal from "../ui/AuthModal";

const Navbar = () => {
  const { user, profile, signOut } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  // Handle Sign Out properly
  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const renderAuthIcon = () => {
    if (user) {
      return (
        <div className="group relative flex items-center h-full">
          <div className="py-2 cursor-pointer">
            <FaRegUserCircle className="text-3xl text-[#A569BD] hover:text-[#FF6B9D] transition-all hover:scale-110" />
          </div>

          {/* Profile Dropdown */}
          <div className="absolute right-0 top-full w-48 pt-2 hidden group-hover:block z-[70]">
            <div className="rounded-xl shadow-2xl bg-white border border-gray-100 overflow-hidden ring-1 ring-black/5">
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
                <Link
                  href="/profile"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  My Profile
                </Link>
                {/* Fixed Sign Out Button */}
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-bold border-t border-gray-50 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <FaRegUserCircle
          onClick={() => setIsAuthOpen(true)}
          className="text-3xl cursor-pointer hover:text-[#FF6B9D] transition-transform hover:scale-110"
        />
      );
    }
  };

  return (
    <>
      <AuthModal open={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      <nav className="bg-white w-full fixed top-12 left-0 shadow-md z-40 border-b-2 border-[#FF6B9D]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-10">
            <Link href="/">
              <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A569BD] to-[#5DADE2] tracking-tight cursor-pointer">
                WonderLand
              </h1>
            </Link>

            <ul className="hidden lg:flex items-center gap-8 text-base font-semibold text-[#2C3E50]">
              <li>
                <Link
                  href="/shop"
                  className={`${
                    isActive("/shop") ? "text-[#FF6B9D]" : ""
                  } hover:text-[#FF6B9D] transition py-2`}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className={`${
                    isActive("/categories") ? "text-[#FF6B9D]" : ""
                  } hover:text-[#FF6B9D] transition py-2`}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`${
                    isActive("/about") ? "text-[#FF6B9D]" : ""
                  } hover:text-[#FF6B9D] transition py-2`}
                >
                  About
                </Link>
              </li>

              <li className="relative group flex items-center h-full cursor-pointer py-2">
                <div className="flex items-center gap-1 hover:text-[#A569BD] transition">
                  Support{" "}
                  <IoChevronDownOutline className="text-sm group-hover:rotate-180 transition-transform" />
                </div>
                <div className="absolute left-0 top-full w-52 pt-2 hidden group-hover:block z-[50]">
                  <div className="rounded-xl shadow-2xl bg-white border border-gray-100 overflow-hidden">
                    <Link
                      href="/help"
                      className="block px-4 py-3 text-sm hover:bg-gray-50 hover:text-[#A569BD]"
                    >
                      Help Centre
                    </Link>
                    <Link
                      href="/shipping"
                      className="block px-4 py-3 text-sm hover:bg-gray-50 hover:text-[#A569BD]"
                    >
                      Shipping Info
                    </Link>
                    <Link
                      href="/returns"
                      className="block px-4 py-3 text-sm hover:bg-gray-50 hover:text-[#A569BD]"
                    >
                      Returns & Exchanges
                    </Link>
                    <Link
                      href="/privacy"
                      className="block px-4 py-3 text-sm hover:bg-gray-50 hover:text-[#A569BD]"
                    >
                      Privacy Policy
                    </Link>
                  </div>
                </div>
              </li>

              <li>
                <Link
                  href="/contact"
                  className={`${
                    isActive("/contact") ? "text-[#FF6B9D]" : ""
                  } hover:text-[#FF6B9D] transition py-2`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-5 text-[#2C3E50]">
            {/* Admin Button - Ensured visible */}
            {profile?.role === "admin" && (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-purple-700 transition-all"
              >
                <RiShieldUserLine className="text-sm" />
                Admin
              </Link>
            )}

            <IoSearchSharp className="text-2xl cursor-pointer hover:text-[#FF6B9D]" />

            <div className="relative flex items-center">
              <BiShoppingBag className="text-2xl cursor-pointer hover:text-[#FF6B9D]" />
              <span className="absolute -top-2 -right-2 bg-[#FFC93C] text-[#2C3E50] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                0
              </span>
            </div>

            <div className="flex items-center">{renderAuthIcon()}</div>
          </div>
        </div>
      </nav>

      <div className="h-32"></div>
    </>
  );
};

export default Navbar;
