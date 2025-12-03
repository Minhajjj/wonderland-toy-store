"use client";
import React, { useState } from "react";
import Hero from "../sections/Hero";
import FeaturedCards from "../ui/FeaturedCards";
import ProductCard from "../ui/ProductCard";
import Benefits from "../sections/Benefits";
import Testimonials from "../sections/Testimonials";
import InteractiveSocial from "../sections/InteractiveSocial";

const Home = () => {
  const [activeTag, setActiveTag] = useState<
    "sale" | "featured" | "popular" | "all"
  >("all");

  const tabStyles = (tag: string) =>
    `cursor-pointer transition ${
      activeTag === tag ? "text-[#FF6B9D] font-bold" : "hover:text-[#FF6B9D]"
    }`;

  return (
    <div>
      <Hero />
      <FeaturedCards />

      <h1 className="flex justify-center text-3xl mt-6 font-semibold text-center ">
        Even More Offers
      </h1>

      {/* Filter Options */}
      <div className="flex items-center mt-4 mb-5 gap-5 text-2xl font-semibold px-3 md:px-8 lg:px-14">
        <h1 onClick={() => setActiveTag("sale")} className={tabStyles("sale")}>
          Sale
        </h1>
        <h1
          onClick={() => setActiveTag("featured")}
          className={tabStyles("featured")}
        >
          Featured
        </h1>
        <h1
          onClick={() => setActiveTag("popular")}
          className={tabStyles("popular")}
        >
          Popular
        </h1>
      </div>

      {/* Pass Filter to Slider */}
      <ProductCard filterTag={activeTag} />
      <Benefits />
      <Testimonials />
      <InteractiveSocial />
    </div>
  );
};

export default Home;
