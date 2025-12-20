import { IoStarSharp } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// 24 sample reviews
const reviews = Array.from({ length: 24 }).map((_, i) => ({
  name: `Parent ${i + 1}`,
  review: `WonderLand toys are amazing! My kids loved toy #${i + 1}.`,
  rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
  image: `https://i.pravatar.cc/100?img=${i + 10}`,
}));

// Split reviews into 3 groups for 3 rows
const rowReviews = [
  reviews.slice(0, 8),
  reviews.slice(8, 16),
  reviews.slice(16, 24),
];

const Testimonials = () => {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
        What Parents Say
      </h2>

      <div className="space-y-6">
        {rowReviews.map((row, rowIndex) => (
          <Swiper
            key={rowIndex}
            modules={[Autoplay]}
            spaceBetween={8} // small horizontal gap
            slidesPerView={1} // default for mobile
            loop
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              reverseDirection: rowIndex % 2 === 1,
              pauseOnMouseEnter: false,
            }}
            speed={8000 + rowIndex * 2000}
            allowTouchMove={false}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2.5 },
              1024: { slidesPerView: 4 },
            }}
          >
            {[...row, ...row].map((t, idx) => (
              <SwiperSlide key={idx} className="flex justify-center">
                <div
                  className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-lg w-full ${
                    idx % 2 === 0
                      ? "bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200"
                      : "bg-white"
                  }`}
                >
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-20 h-20 rounded-full mb-3 object-cover"
                  />
                  <div className="flex mb-2">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <IoStarSharp key={i} className="text-yellow-400 mr-1" />
                    ))}
                  </div>
                  <p className="text-gray-900 text-base text-center mb-1">
                    "{t.review}"
                  </p>
                  <h4 className="text-gray-900 font-semibold">{t.name}</h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
