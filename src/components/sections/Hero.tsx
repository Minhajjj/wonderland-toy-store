"use client";

import React from "react";
import Image from "next/image";
import Primary_Button from "../ui/Primary_Button";
import Secondary_Button from "../ui/Secondary_Button";
import { IoSparklesSharp } from "react-icons/io5";
import { HiOutlineArrowTrendingUp } from "react-icons/hi2";

const Hero = () => {
  return (
    <section className="relative pt-12 pb-16 lg:pt-35 lg:pb-24 bg-gradient-to-br from-[#FFF5F5] via-white to-[#F0F9FF] overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-[12px] font-black tracking-wider uppercase">
            <IoSparklesSharp className="animate-pulse" /> New Collection Arrived
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-[#2C3E50] leading-[1.05] tracking-tight">
            Magical Toys for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#A569BD]">
              Big Imaginations
            </span>
          </h1>

          <p className="text-base md:text-lg text-[#2C3E50]/70 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Explore our curated selection of eco-friendly, premium toys designed
            to inspire creativity and built to last generations.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
            <Primary_Button text="Explore Shop" />
            <Secondary_Button text="Our Story" />
          </div>

          {/* Compact Social Proof */}
          <div className="flex items-center justify-center lg:justify-start gap-8 pt-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                >
                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-[#2C3E50]">
                15k+ Happy Parents
              </p>
              <div className="flex text-yellow-400 text-xs">
                {"★★★★★"}{" "}
                <span className="text-gray-400 ml-2 font-bold">(4.9/5)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image Composition */}
        <div className="relative">
          <div className="relative w-full aspect-square max-w-[480px] mx-auto">
            {/* Morphing Blob Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B9D]/10 to-[#5DADE2]/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] animate-[blob_10s_infinite_alternate] border-2 border-white shadow-inner"></div>

            {/* Central Image Placeholder */}
            <div className="absolute inset-4 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] overflow-hidden bg-white/50 backdrop-blur-sm border-4 border-white shadow-2xl flex items-center justify-center">
              <img
                src="/HeroPic.png"
                alt="Hero"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Card: Best Seller */}
            <div className="absolute top-8 -right-4 bg-white p-3 rounded-2xl shadow-xl border border-gray-50 animate-float">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                  <HiOutlineArrowTrendingUp size={20} />
                </div>
                <div className="pr-2">
                  <p className="text-[9px] font-black text-gray-400 uppercase">
                    Popular
                  </p>
                  <p className="text-xs font-bold text-gray-800">Wooden Sets</p>
                </div>
              </div>
            </div>

            {/* Floating Badge: Material */}
            <div className="absolute bottom-16 -left-4 bg-white py-2.5 px-4 rounded-full shadow-xl border border-gray-50 animate-float-delayed">
              <p className="text-xs font-black text-gray-800 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Non-Toxic Materials
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
