"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Squares2X2Icon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  XMarkIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Squares2X2Icon },
  { name: "Products", href: "/admin/products", icon: ShoppingBagIcon },
  { name: "Orders", href: "/admin/orders", icon: ClipboardDocumentListIcon },
  { name: "Customers", href: "/admin/customers", icon: UsersIcon },
  { name: "Analytics", href: "/admin/analytics", icon: ChartBarIcon },
  { name: "Settings", href: "/admin/settings", icon: Cog6ToothIcon },
];

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function Sidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();

  // Your Brand Gradient Class
  const brandGradientText =
    "bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B9D] via-[#9B59B6] to-[#4FA8D5]";
  const brandGradientBg =
    "bg-gradient-to-r from-[#FF6B9D] via-[#9B59B6] to-[#4FA8D5]";

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white/80 backdrop-blur-xl border-r border-gray-100">
      {/* Logo Area */}
      <div className="h-20 flex items-center px-8 border-b border-gray-50">
        <RocketLaunchIcon className="h-8 w-8 text-[#FF6B9D] mr-3" />
        <span
          className={`text-2xl font-black tracking-tighter ${brandGradientText}`}
        >
          WONDERLAND
        </span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
          Menu
        </p>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center px-4 py-3.5 text-sm font-semibold rounded-2xl transition-all duration-300 ${
                isActive
                  ? `${brandGradientBg} text-white shadow-lg shadow-purple-200`
                  : "text-gray-500 hover:bg-gray-50 hover:text-[#9B59B6]"
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 group-hover:text-[#9B59B6]"
                }`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Snippet at Bottom */}
      <div className="p-4 border-t border-gray-50">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50">
          <div className={`h-10 w-10 rounded-full ${brandGradientBg} p-0.5`}>
            <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
              <span className={`font-bold text-xs ${brandGradientText}`}>
                MA
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">
              Minhaj Arshad
            </p>
            <p className="text-xs text-gray-500 truncate">Admin Access</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          mobileOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button onClick={() => setMobileOpen(false)}>
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          <SidebarContent />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <SidebarContent />
      </div>
    </>
  );
}
