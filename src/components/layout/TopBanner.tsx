"use client";
import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const messages = [
  "Free shipping on orders above $50",
  "10% off for new customers - Use code: WONDER10",
  "Fast delivery on all orders",
  "Subscribe and get exclusive offers",
];

const TopBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevMessage = () => {
    setCurrentIndex((prev) => (prev === 0 ? messages.length - 1 : prev - 1));
  };

  const nextMessage = () => {
    setCurrentIndex((prev) => (prev === messages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full h-12 flex items-center justify-between px-4 md:px-20 fixed top-0 left-0 z-50 bg-gradient-to-r from-[#FF6B9D] via-[#A569BD] to-[#5DADE2]">
      <button 
        onClick={prevMessage} 
        className="text-white hover:text-white/80 transition shrink-0"
        aria-label="Previous message"
      >
        <FiChevronLeft size={22} />
      </button>

      <p className="text-sm md:text-base font-semibold text-white text-center flex-1 mx-4 px-2">
        {messages[currentIndex]}
      </p>

      <button 
        onClick={nextMessage} 
        className="text-white hover:text-white/80 transition shrink-0"
        aria-label="Next message"
      >
        <FiChevronRight size={22} />
      </button>
    </div>
  );
};

export default TopBanner;