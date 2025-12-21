"use client";

import React from "react";
import {
  TruckIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ClockIcon,
  ArchiveBoxIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export default function ShippingInfo() {
  return (
    <div className="min-h-screen text-gray-900">
      {/* 1. Dynamic Hero Section - pt-4 reduces top height */}
      <section className="pt-4 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-4 py-1.5 bg-gray-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              Logistics & Delivery
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              Wonder <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A569BD] to-[#5DADE2]">
                Travels.
              </span>
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-md">
              From our magic warehouse to your front door. We ensure every toy
              arrives safe, sound, and ready to play.
            </p>
          </div>

          <div className="relative">
            {/* Abstract Delivery Visual */}
            <div className="aspect-square rounded-[60px] flex items-center justify-center p-12">
              <TruckIcon className="w-full h-full text-black absolute -rotate-12 scale-110" />
              <div className="relative z-10 space-y-4 w-full">
                <div className="bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4 transform -translate-x-6">
                  <div className="w-12 h-12 bg-[#FF6B9D]/10 rounded-full flex items-center justify-center text-[#FF6B9D]">
                    <ArchiveBoxIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-gray-400">
                      Status
                    </p>
                    <p className="font-bold">Packed with Care</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4 transform translate-x-12">
                  <div className="w-12 h-12 bg-[#A569BD]/10 rounded-full flex items-center justify-center text-[#A569BD]">
                    <MapPinIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-gray-400">
                      Destination
                    </p>
                    <p className="font-bold">Your Playroom</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Journey (Vertical Stepper Layout) */}
      <section className="py-24 border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-20 text-center">
            The Delivery <span className="text-[#A569BD]">Cycle</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <StepItem
              num="01"
              title="Order Prep"
              desc="Orders are processed within 24 hours. We double-check every toy for quality before sealing the box."
            />
            <StepItem
              num="02"
              title="Eco-Transit"
              desc="We use carbon-neutral shipping partners and 100% recyclable packaging to protect our planet."
            />
            <StepItem
              num="03"
              title="Unboxing"
              desc="Delivered straight to your door with real-time tracking updates every step of the way."
            />
          </div>
        </div>
      </section>

      {/* 3. Shipping Rates Table (Clean Grid) */}
      <section className="py-24 bg-gray-900 text-white rounded-[60px] mx-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter">
                Rates & Times
              </h2>
              <p className="text-gray-400 font-medium mt-2">
                Free shipping on all orders over $50
              </p>
            </div>
            <GlobeAltIcon className="w-16 h-16 text-[#5DADE2] opacity-50" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
            <RateCard region="United States" time="3-5 Days" price="$5.99" />
            <RateCard region="Europe & UK" time="5-9 Days" price="$12.00" />
            <RateCard region="Rest of World" time="10-14 Days" price="$19.00" />
          </div>
        </div>
      </section>

      {/* 4. Policy Highlights (Asymmetric Layout) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-12 rounded-[40px] border-2 border-gray-50 hover:border-[#FF6B9D]/20 transition-all">
            <ShieldCheckIcon className="w-12 h-12 text-[#FF6B9D] mb-6" />
            <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">
              Insurance Included
            </h3>
            <p className="text-gray-500 leading-relaxed font-medium">
              Every shipment is fully insured. If your package is lost or
              damaged during its travels, we will send a replacement immediately
              at no cost to you.
            </p>
          </div>
          <div className="p-12 rounded-[40px] border-2 border-gray-50 hover:border-[#FF6B9D]/20 transition-all">
            <ClockIcon className="w-12 h-12 text-[#FF6B9D] mb-6" />
            <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">
              Express Delivery
            </h3>
            <p className="text-gray-500 leading-relaxed font-medium">
              Need it for a birthday tomorrow? We offer Next-Day Express for
              most urban areas. Select "Express Wonder" at checkout for priority
              handling.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Gradient Branding Footer */}
      <footer className="py-20 text-center border-t border-gray-100">
        <h3 className="inline-block text-2xl font-black uppercase tracking-[0.5em] text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A569BD] to-[#5DADE2]">
          WonderLand Logistics
        </h3>
      </footer>
    </div>
  );
}

// Sub-components
function StepItem({ num, title, desc }: any) {
  return (
    <div className="relative">
      <div className="text-8xl font-black text-gray-50 absolute -top-10 -left-4 z-0 selection:bg-transparent">
        {num}
      </div>
      <div className="relative z-10 pt-4">
        <h4 className="text-xl font-black uppercase mb-3 tracking-tighter">
          {title}
        </h4>
        <p className="text-gray-500 text-sm font-medium leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}

function RateCard({ region, time, price }: any) {
  return (
    <div className="bg-gray-900 p-10 hover:bg-gray-800 transition-colors">
      <p className="text-[#FF6B9D] font-black uppercase tracking-widest text-xs mb-4">
        {region}
      </p>
      <h4 className="text-3xl font-black mb-1 tracking-tight">{time}</h4>
      <p className="text-gray-400 font-bold uppercase text-xs">
        Starting from {price}
      </p>
    </div>
  );
}
