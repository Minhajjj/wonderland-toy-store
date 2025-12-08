import { FaQuestionCircle, FaLightbulb, FaSmileBeam } from "react-icons/fa";

const FAQs = [
  {
    icon: <FaQuestionCircle className="text-pink-500 text-3xl" />,
    q: "Is WonderLand safe for toddlers?",
    a: "Absolutely! All our toys meet international safety certifications.",
  },
  {
    icon: <FaLightbulb className="text-purple-500 text-3xl" />,
    q: "Do toys help kids learn?",
    a: "Yes! Our toys are designed with educators to boost creativity & early learning.",
  },
  {
    icon: <FaSmileBeam className="text-blue-500 text-3xl" />,
    q: "Why parents trust WonderLand?",
    a: "We mix learning + fun + safety — keeping kids engaged for hours!",
  },
];

const VideoQASection = () => {
  return (
    <section className="py-20 px-6 md:px-12">
      <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">

        {/* LEFT — WONDERLAND TEXT WITH VIDEO INSIDE */}
        <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] flex items-center justify-center">
          
          {/* SVG Mask approach */}
          <svg width="100%" height="100%" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
            <defs>
              <mask id="textMask">
                <rect width="100%" height="100%" fill="black"/>
                <text
                  x="400"
                  y="200"
                  textAnchor="middle"
                  fill="white"
                  fontSize="120"
                  fontWeight="900"
                  fontFamily="Arial, sans-serif"
                  letterSpacing="3"
                  strokeWidth="3"
                  stroke="white"
                >
                  <tspan fontSize="190" strokeWidth="5">W</tspan>ONDER
                </text>
                <text
                  x="400"
                  y="350"
                  textAnchor="middle"
                  fill="white"
                  fontSize="120"
                  fontWeight="900"
                  fontFamily="Arial, sans-serif"
                  letterSpacing="3"
                  strokeWidth="3"
                  stroke="white"
                >
                  <tspan fontSize="190" strokeWidth="5">L</tspan>AND
                </text>
              </mask>
            </defs>
            
            <foreignObject width="800" height="500" mask="url(#textMask)">
              <video
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: "800px",
                  height: "500px",
                  objectFit: "cover"
                }}
              >
                <source src="/samplevideo2.mp4" type="video/mp4" />
              </video>
            </foreignObject>
          </svg>
        </div>

        {/* RIGHT — Q/A PANEL */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Questions? We've Got Answers!
          </h2>

          <div className="space-y-5">
            {FAQs.map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-xl shadow-md border border-purple-200/30 bg-white/80 backdrop-blur"
              >
                <div className="flex items-center gap-3 mb-2">
                  {item.icon}
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {item.q}
                  </h3>
                </div>
                <p className="text-gray-700 ml-11">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default VideoQASection;