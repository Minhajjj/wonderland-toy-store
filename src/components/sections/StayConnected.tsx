"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { MdCameraAlt } from "react-icons/md";
import { IoSparklesSharp } from "react-icons/io5";
import "swiper/css";

const StayConnected = () => {
  const [email, setEmail] = useState("");

  const posts = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => `/moments/toy${i + 1}.jpg`);
  }, []);

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex flex-col lg:flex-row items-center gap-14">
          {/* Left Side: Newsletter (Increased Scale) */}
          <div className="w-full lg:w-[35%] space-y-8">
            <div className="space-y-3">
              <h2 className="text-5xl font-black text-gray-900 leading-tight">
                Stay <br /> Connected
                <IoSparklesSharp className="inline-block text-pink-500 ml-2 animate-bounce text-3xl" />
              </h2>
              <p className="text-gray-500 text-lg font-medium leading-relaxed">
                Join the magical WonderLand community! Real moments shared by
                our adventurers.
              </p>
            </div>

            <div className="p-10 rounded-[3rem] border border-pink-50 bg-white shadow-2xl shadow-pink-100/50 relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <MdCameraAlt size={80} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">
                Join our newsletter
              </h4>
              <p className="text-sm text-gray-500 mb-8">
                Get exclusive toy guides and magical updates.
              </p>

              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-pink-300 focus:bg-white outline-none transition-all font-medium"
                />
                <button className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-pink-600 shadow-lg shadow-indigo-100 transition-all active:scale-95">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Expanded Mosaic + Smooth Slider */}
          <div className="w-full lg:w-[65%] space-y-4">
            {/* Row 1: Larger Wide Mosaic */}
            <div className="flex gap-4 h-64">
              <div className="relative flex-[2] rounded-[2.5rem] overflow-hidden shadow-xl group">
                <Image
                  src={posts[0]}
                  alt="Toy"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
              <div className="relative flex-1 rounded-[2.5rem] overflow-hidden shadow-xl group">
                <Image
                  src={posts[1]}
                  alt="Toy"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
              <div className="relative flex-1 rounded-[2.5rem] overflow-hidden shadow-xl group">
                <Image
                  src={posts[2]}
                  alt="Toy"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
            </div>

            {/* Row 2: Wider Secondary Icons */}
            <div className="flex gap-4 h-32">
              {posts.slice(3, 8).map((src, i) => (
                <div
                  key={i}
                  className="relative flex-1 rounded-2xl overflow-hidden shadow-md border border-gray-50 group"
                >
                  <Image
                    src={src}
                    alt="Toy"
                    fill
                    className="object-cover group-hover:rotate-3 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>

            {/* Row 3: THE SMOOTH CONTINUOUS SLIDER */}
            <div className="pt-4">
              <Swiper
                modules={[Autoplay]}
                slidesPerView="auto"
                spaceBetween={16}
                loop={true}
                speed={6000} // Higher speed = Slower, smoother crawl
                allowTouchMove={false}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                }}
                className="linear-swiper"
              >
                {posts.slice(8).map((src, i) => (
                  <SwiperSlide key={i} style={{ width: "160px" }}>
                    <div className="relative h-28 w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                      <Image
                        src={src}
                        alt="Slider"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .linear-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  );
};

export default StayConnected;
