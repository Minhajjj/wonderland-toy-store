"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import {
  Bars3BottomLeftIcon,
  BellIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <Bars3BottomLeftIcon className="h-6 w-6" />
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-100 focus-within:ring-2 focus-within:ring-[#9B59B6]/20 transition-all w-96">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search orders, products, or customers..."
                className="bg-transparent border-none outline-none text-sm text-gray-600 w-full placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-[#9B59B6] transition-colors">
              <BellIcon className="h-6 w-6" />
              <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-[#FF6B9D] border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Main Content Rendered Here */}
        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
