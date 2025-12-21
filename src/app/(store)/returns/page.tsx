"use client";

import React from "react";
import {
  ArrowPathRoundedSquareIcon,
  ReceiptRefundIcon,
  ShieldExclamationIcon,
  CheckBadgeIcon,
  ArchiveBoxArrowDownIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/24/outline";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen text-gray-900">
      {/* 1. Compact Hero Section */}
      <section className="pt-4 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block px-4 py-1.5 bg-gray-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Service Policy
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
            Easy <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A569BD] to-[#5DADE2]">
              Returns.
            </span>
          </h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl">
            Not the right fit for your little one? No worries. Our 30-day "Happy
            Play" guarantee ensures you get exactly what you need, every time.
          </p>
        </div>
      </section>

      {/* 2. Three-Step Process Grid */}
      <section className="py-20 border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-16">
            The Return <span className="text-[#A569BD]">Process</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProcessCard
              icon={<CursorArrowRaysIcon className="w-8 h-8" />}
              step="01. Request"
              title="Initiate Online"
              desc="Head to your 'Orders' page, select the item, and click 'Return Item' to get your prepaid label."
            />
            <ProcessCard
              icon={<ArchiveBoxArrowDownIcon className="w-8 h-8" />}
              step="02. Pack"
              title="Box It Up"
              desc="Place the toy in its original packaging. Stick the prepaid label on the outside of the box."
            />
            <ProcessCard
              icon={<ReceiptRefundIcon className="w-8 h-8" />}
              step="03. Refund"
              title="Get Paid"
              desc="Once our team inspects the item, your refund is processed back to your original payment method in 3-5 days."
            />
          </div>
        </div>
      </section>

      {/* 3. Detailed Policy Table */}
      <section className="py-24 rounded-[60px] mx-4">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tighter">
              Refund <span className="text-[#5DADE2]">Methods</span>
            </h2>
            <p className="text-gray-500 font-bold mt-2 uppercase text-xs tracking-widest">
              Everything you need to know about your money
            </p>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            <PolicyRow
              label="Return Window"
              value="30 Days from delivery date"
            />
            <PolicyRow
              label="Return Shipping"
              value="FREE (Prepaid label provided)"
              isHighlight
            />
            <PolicyRow label="Restocking Fee" value="None ($0.00)" />
            <PolicyRow
              label="Refund Type"
              value="Original Payment or Store Credit"
            />
            <PolicyRow label="Processing Time" value="5-7 Business Days" />
          </div>
        </div>
      </section>

      {/* 4. Non-Returnable Items (Asymmetric Grid) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="bg-red-50 p-12 rounded-[40px]">
            <ShieldExclamationIcon className="w-12 h-12 text-red-500 mb-6" />
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">
              Non-Returnable
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 font-bold text-red-700/70 uppercase text-sm italic">
                <span>×</span> Items without original packaging
              </li>
              <li className="flex items-center gap-3 font-bold text-red-700/70 uppercase text-sm italic">
                <span>×</span> Personalized or custom-engraved toys
              </li>
              <li className="flex items-center gap-3 font-bold text-red-700/70 uppercase text-sm italic">
                <span>×</span> Items marked as "Final Sale"
              </li>
              <li className="flex items-center gap-3 font-bold text-red-700/70 uppercase text-sm italic">
                <span>×</span> Gift cards
              </li>
            </ul>
          </div>

          <div className="p-12 border-2 border-[#A569BD]/10 rounded-[40px]">
            <ArrowPathRoundedSquareIcon className="w-12 h-12 text-[#A569BD] mb-6" />
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 text-[#A569BD]">
              Exchanges
            </h3>
            <p className="text-gray-600 font-medium leading-relaxed mb-6">
              Love the toy but want a different color? We offer instant
              exchanges. We'll ship your new item out as soon as the carrier
              scans your return package.
            </p>
            <div className="flex items-center gap-2 text-[#A569BD] font-black uppercase text-xs tracking-widest">
              <CheckBadgeIcon className="w-5 h-5" />
              Fastest in the industry
            </div>
          </div>
        </div>
      </section>

      {/* 5. Gradient Branding Footer */}
      <footer className="py-20 text-center border-t border-gray-100">
        <h3 className="inline-block text-2xl font-black uppercase tracking-[0.5em] text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A569BD] to-[#5DADE2]">
          WonderLand Returns
        </h3>
      </footer>
    </div>
  );
}

// Sub-components
function ProcessCard({ icon, step, title, desc }: any) {
  return (
    <div className="p-10 rounded-[40px] border-2 border-gray-50 hover:border-[#FF6B9D]/20 transition-all group">
      <div className="text-[#FF6B9D] mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-2">
        {step}
      </p>
      <h4 className="text-xl font-black uppercase mb-4 tracking-tighter">
        {title}
      </h4>
      <p className="text-gray-500 text-sm font-medium leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

function PolicyRow({ label, value, isHighlight }: any) {
  return (
    <div
      className={`flex flex-col sm:flex-row justify-between p-8 border-b border-gray-50 last:border-none ${
        isHighlight ? "bg-purple-50/30" : ""
      }`}
    >
      <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 sm:mb-0">
        {label}
      </span>
      <span
        className={`font-bold text-lg ${
          isHighlight ? "text-[#A569BD]" : "text-gray-900"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
