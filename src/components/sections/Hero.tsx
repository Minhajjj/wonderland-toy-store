import React from "react";
import Primary_Button from "../ui/Primary_Button";
import Secondary_Button from "../ui/Secondary_Button";

const Hero = () => {
  return (
    <section className="pt-36 pb-20 bg-gradient-to-br from-[#FFE5E5] via-white to-[#E8F8F5] w-full">
      {/* Content wrapper only centers content, no extra padding */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="flex-1 px-6 md:px-0">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C3E50] leading-tight">
            Discover Premium Toys Crafted for{" "}
            <span className="text-[#FF6B9D]">Joy</span>
          </h1>

          <p className="mt-4 text-[#2C3E50]/70 text-lg">
            Explore beautifully designed toys with exceptional quality for your
            little ones.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <Primary_Button text="Shop Now" />
            <Secondary_Button text="View More" />
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <div className="w-full h-72 bg-linear-to-br from-[#5DADE2]/20 to-[#A569BD]/20 border-2 border-dashed border-[#5DADE2]/40 rounded-3xl flex items-center justify-center">
            <p className="text-[#5DADE2]/60 font-medium">Hero Image Here</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
