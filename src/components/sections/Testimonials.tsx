"use client";

import { useEffect, useState } from "react";
import { getReviews } from "@/lib/reviewActions";
import { IoStarSharp } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Testimonials = () => {
  const [allReviews, setAllReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getReviews();
      setAllReviews(data);
    };
    fetchData();
  }, []);

  // Split reviews into 2 rows
  const half = Math.ceil(allReviews.length / 2);
  const rowReviews = [allReviews.slice(0, half), allReviews.slice(half)];

  if (allReviews.length === 0) return null;

  return (
    <section className="py-16 overflow-hidden">
      <h2 className="text-3xl font-black text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A569BD] to-[#5DADE2]">
        What Parents Say
      </h2>

      <div className="space-y-6">
        {rowReviews.map((row, rowIndex) => (
          <Swiper
            key={rowIndex}
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            speed={rowIndex === 0 ? 9000 : 12000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true, // Stops on hover
              reverseDirection: rowIndex % 2 === 1,
            }}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2.5 },
              1024: { slidesPerView: 4 },
            }}
            className="swiper-linear-fix"
          >
            {row.map((t, idx) => (
              <SwiperSlide key={t.id} className="py-4">
                <div
                  className={`flex flex-col items-center justify-center p-8 rounded-2xl border border-gray-100 h-full transition-all duration-300 hover:shadow-xl hover:border-[#A569BD]/30 ${
                    idx % 2 === 0
                      ? "bg-gradient-to-br from-[#FF6B9D]/5 via-white to-[#A569BD]/5 shadow-sm"
                      : "bg-white shadow-sm"
                  }`}
                >
                  <img
                    src={t.image_url || "https://via.placeholder.com/100"}
                    alt={t.name}
                    className="w-16 h-16 rounded-full object-cover mb-4 ring-2 ring-white shadow-md"
                  />
                  <div className="flex mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <IoStarSharp
                        key={i}
                        className="text-yellow-400 text-sm"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm italic text-center mb-4 leading-relaxed">
                    "{t.review}"
                  </p>
                  <h4 className="text-[#2C3E50] font-bold text-xs uppercase tracking-widest">
                    {t.name}
                  </h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ))}
      </div>

      <style jsx global>{`
        .swiper-linear-fix .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
