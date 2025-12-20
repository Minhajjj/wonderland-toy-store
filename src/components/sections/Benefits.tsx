import { FaShippingFast, FaLeaf, FaHandsHelping, FaBrain, FaPaintBrush } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";


const benefits = [
  { icon: <FaShippingFast size={40} className="text-pink-500" />, title: "Free Shipping", subtitle: "On orders over $50" },
  { icon: <FaLeaf size={40} className="text-purple-500" />, title: "Safe & Non-toxic", subtitle: "Eco-friendly materials" },
  { icon: <FaHandsHelping size={40} className="text-blue-500" />, title: "Handcrafted Quality", subtitle: "Made with care" },
  { icon: <FaBrain size={40} className="text-green-500" />, title: "Educational Fun", subtitle: "Stimulates creativity & learning" },
  { icon: <FaPaintBrush size={40} className="text-yellow-500" />, title: "Creative Play", subtitle: "Encourages imagination" },
  { icon: <IoStarSharp size={40} className="text-orange-500" />, title: "Parent-Approved", subtitle: "Trusted by families worldwide" },
];

const Benefits = () => {
  return (
    <section className="py-16 relative">
      {/* Subtle decorative shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-200 opacity-10 rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-blue-200 opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 left-1/3 w-28 h-28 bg-purple-200 opacity-10 rounded-full"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Why Choose WonderLand
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg cursor-pointer overflow-hidden group"
            >
              {/* Icon / Logo */}
              <div className="transition-transform duration-500 transform group-hover:scale-125">
                {benefit.icon}
              </div>

              {/* Text Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white bg-opacity-95 rounded-2xl">
                <h3 className="text-xl font-semibold text-gray-900">{benefit.title}</h3>
                <p className="mt-2 text-gray-700">{benefit.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
