import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// Now 30 images for a fuller look
const posts = Array.from({ length: 30 }).map(
  (_, i) => `https://i.pravatar.cc/300?img=${i + 40}`
);

const StayConnected = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      alert(`Thanks for subscribing with ${email}!`);
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-3">
          Stay Connected ✨
        </h2>
        <p className="text-center max-w-2xl mx-auto text-gray-700 mb-16">
          Join the magical WonderLand community! Explore real moments and never
          miss an update.
        </p>

        <div className="relative flex flex-col lg:flex-row items-start gap-12">
          {/* Floating Left Section */}
          <div className="w-full lg:w-1/2 relative">
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              Wonderland Moments 📸
            </h3>
            <p className="text-gray-700 mb-6 text-base">
              Magical memories shared by our amazing parents and their little
              adventurers.
            </p>

            {/* Signup section - MORE COMPACT */}
            <div className="rounded-2xl p-8 shadow-2xl border border-pink-200 bg-white/95 backdrop-blur-sm">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    Join our newsletter 💌
                  </h4>
                  <p className="text-gray-600 text-base leading-relaxed">
                    Get special offers, toy guides, and updates straight into your inbox!
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-pink-400 text-base transition-all"
                />
                <button 
                  onClick={handleSubscribe}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold px-8 py-4 rounded-xl hover:from-pink-600 hover:to-purple-600 duration-300 shadow-lg text-base whitespace-nowrap transform hover:scale-[1.02] transition-transform">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Social media area - HORIZONTAL LAYOUT */}
          <div className="w-full lg:flex-1 relative space-y-4">
            {/* First row - horizontal spread */}
            <div className="flex gap-3 overflow-hidden">
              {posts.slice(0, 6).map((p, i) => (
                <div
                  key={i}
                  className="flex-shrink-0"
                  style={{ width: i % 3 === 0 ? '280px' : '180px' }}
                >
                  <img
                    src={p}
                    alt={`Wonderland moment ${i + 1}`}
                    className="rounded-2xl shadow-lg object-cover w-full h-36"
                  />
                </div>
              ))}
            </div>

            {/* Second row - horizontal spread */}
            <div className="flex gap-3 overflow-hidden">
              {posts.slice(6, 11).map((p, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-48"
                >
                  <img
                    src={p}
                    alt={`Wonderland moment ${i + 7}`}
                    className="rounded-2xl shadow-lg object-cover w-full h-36"
                  />
                </div>
              ))}
            </div>

            {/* Infinite slider - horizontal */}
            <div className="pt-2">
              <Swiper
                modules={[Autoplay]}
                slidesPerView="auto"
                spaceBetween={12}
                loop
                autoplay={{ delay: 0, disableOnInteraction: false }}
                speed={8000}
                breakpoints={{
                  320: { slidesPerView: 2.5 },
                  640: { slidesPerView: 3.5 },
                  1024: { slidesPerView: 5.5 }
                }}
              >
                {[...posts, ...posts, ...posts].map((p, i) => (
                  <SwiperSlide key={i} style={{ width: '180px' }}>
                    <img
                      src={p}
                      alt={`Wonderland slider ${i + 1}`}
                      className="rounded-2xl shadow-lg h-36 w-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StayConnected;