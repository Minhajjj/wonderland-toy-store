"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthProvider";
import { BiShoppingBag } from "react-icons/bi";
import { IoSearchSharp, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { RiShieldUserLine } from "react-icons/ri";

import AuthModal from "../ui/AuthModal";

const Navbar = () => {
  const { user, profile, signOut } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };

  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const supportLinks = [
    { name: "Help Centre", href: "/help" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Returns & Exchanges", href: "/returns" },
    { name: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <>
      <AuthModal open={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* --- THEMED SIDEBAR SLIDER --- */}
      <div
        className={`fixed inset-0 bg-[#2C3E50]/40 backdrop-blur-sm z-[35] transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ top: "48px" }}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div
        className={`fixed top-[48px] left-0 h-[calc(100vh-48px)] w-[280px] z-[38] shadow-2xl transform transition-transform duration-500 ease-in-out border-r border-[#A569BD]/20 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-gradient-to-b from-[#FDFEFE] via-[#F4ECF7] to-[#FBFCFC]`}
      >
        <div className="p-8 flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex items-center justify-between mb-10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A569BD] bg-[#A569BD]/10 px-3 py-1 rounded-full">
              Navigation
            </span>
            <IoCloseOutline
              className="text-2xl text-[#2C3E50] cursor-pointer hover:text-[#FF6B9D] transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>

          {/* Nav Links with Hover Effects */}
          <ul className="flex flex-col gap-4 text-lg font-bold text-[#2C3E50]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`group flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                    isActive(link.href)
                      ? "bg-white text-[#FF6B9D] shadow-sm"
                      : "hover:bg-white/60 hover:text-[#A569BD]"
                  }`}
                >
                  <span>{link.name}</span>
                  <div
                    className={`w-1.5 h-1.5 rounded-full bg-[#FF6B9D] transition-opacity ${
                      isActive(link.href)
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-40"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Support Section at Bottom */}
          <div className="mt-auto pt-8">
            <div className="bg-[#A569BD]/5 p-6 rounded-2xl border border-[#A569BD]/10">
              <h3 className="text-[10px] uppercase tracking-widest text-[#A569BD] font-black mb-4">
                Support Magic
              </h3>
              <ul className="flex flex-col gap-3 text-sm font-semibold text-gray-600">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-[#FF6B9D] transition-colors flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-[#A569BD]/30 rounded-full" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN NAVBAR --- */}
      <nav className="bg-white/90 backdrop-blur-md w-full fixed top-12 left-0 shadow-sm z-[50] border-b border-[#A569BD]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-[#F4ECF7] rounded-xl transition-colors text-[#2C3E50]"
            >
              {isSidebarOpen ? (
                <IoCloseOutline className="text-2xl text-[#FF6B9D]" />
              ) : (
                <IoMenuOutline className="text-2xl" />
              )}
            </button>

            <Link href="/">
              <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A569BD] to-[#5DADE2] tracking-tight">
                WonderLand
              </h1>
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-5 text-[#2C3E50]">
            {profile?.role === "admin" && (
              <Link
                href="/admin"
                className="hidden md:flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-[#A569BD] to-[#5DADE2] text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:shadow-lg transition-all"
              >
                <RiShieldUserLine className="text-sm" /> Admin
              </Link>
            )}

            <IoSearchSharp className="text-2xl cursor-pointer hover:text-[#A569BD] transition-colors" />

            <div className="relative flex items-center">
              <BiShoppingBag className="text-2xl cursor-pointer hover:text-[#FF6B9D] transition-colors" />
              <span className="absolute -top-1.5 -right-1.5 bg-[#FFC93C] text-[#2C3E50] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                0
              </span>
            </div>

            {user ? (
              <div className="group relative">
                <FaRegUserCircle className="text-2xl text-[#A569BD] cursor-pointer hover:scale-110 transition-transform" />
                <div className="absolute right-0 top-full w-44 pt-2 hidden group-hover:block z-[60]">
                  <div className="rounded-xl shadow-xl bg-white border border-[#A569BD]/10 overflow-hidden">
                    <Link
                      href="/profile"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#F4ECF7]"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-3 text-sm text-red-600 font-bold border-t border-gray-50 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <FaRegUserCircle
                onClick={() => setIsAuthOpen(true)}
                className="text-2xl cursor-pointer hover:text-[#A569BD] transition-all"
              />
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
