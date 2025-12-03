import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaBrain, FaPaintBrush, FaPaw, FaRocket } from "react-icons/fa";
import "swiper/css";

// Social media images
const socialMediaPosts = Array.from({ length: 12 }).map(
  (_, i) => `https://i.pravatar.cc/200?img=${i + 20}`
);

// Fun QA questions
const quizQuestions = [
  {
    question: "What sparks your kid's imagination? ✨",
    options: [
      { label: "STEM Adventures 🧠", icon: <FaBrain /> },
      { label: "Creative Arts 🎨", icon: <FaPaintBrush /> },
      { label: "Animal Fun 🐾", icon: <FaPaw /> },
      { label: "Space & Rockets 🚀", icon: <FaRocket /> },
    ],
  },
  {
    question: "Pick the play style they love most 🎯",
    options: [
      { label: "Role-Play 👑", icon: "👑" },
      { label: "Building Blocks 🧱", icon: "🧱" },
      { label: "Puzzle Challenges 🧩", icon: "🧩" },
      { label: "Outdoor Fun 🌳", icon: "🌳" },
    ],
  },
];

const InteractiveSocial = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setTimeout(() => {
      setSelectedOption(null);
      setCurrentQuestion((prev) => (prev + 1) % quizQuestions.length);
    }, 1000);
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
        Discover & Play with WonderLand Toys
      </h2>

      <div className="relative flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: Video */}
        <div className="lg:w-2/3 rounded-3xl overflow-hidden shadow-lg relative">
          <video
            src="https://www.w3schools.com/html/mov_bbb.mp4" // Replace with your video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 rounded-3xl"></div>
        </div>

        {/* Right: QA / Quiz */}
        <div className="lg:w-1/3 flex flex-col justify-start relative lg:-mt-8">
          <div className="bg-gradient-to-tr from-pink-100 via-purple-100 to-blue-100 rounded-2xl shadow-xl p-6 lg:w-[95%]">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              {quizQuestions[currentQuestion].question}
            </h3>
            <div className="flex flex-col gap-3">
              {quizQuestions[currentQuestion].options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleOptionClick(option.label)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all justify-start hover:scale-105 ${
                    selectedOption === option.label
                      ? "bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 text-white border-none"
                      : "bg-white text-gray-900 border border-gray-300"
                  }`}
                >
                  <span className="text-lg">{option.icon}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
            {selectedOption && (
              <p className="mt-4 text-center text-gray-900 font-semibold">
                Selected: <span className="text-blue-600">{selectedOption}</span>
              </p>
            )}
          </div>

          {/* Social Media Feed */}
          <div className="mt-6 lg:mt-12">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={6}
              slidesPerView={2}
              loop
              autoplay={{ delay: 0, disableOnInteraction: false }}
              speed={4000}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 3 },
              }}
            >
              {[...socialMediaPosts, ...socialMediaPosts].map((img, idx) => (
                <SwiperSlide key={idx} className="flex justify-center">
                  <img
                    src={img}
                    alt={`Social post ${idx + 1}`}
                    className="rounded-xl object-cover w-full h-28 hover:scale-105 transition-transform"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveSocial;
