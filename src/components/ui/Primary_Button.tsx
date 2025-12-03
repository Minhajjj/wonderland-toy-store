import React from "react";

const Button = ({ text }: { text: string }) => {
    const btnTxt = text || "Click Me";
  return (
    <button className="px-8 py-3 bg-[#FF6B9D] text-white rounded-full font-semibold hover:bg-[#E94B7B] transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
      {btnTxt}
    </button>
  );
};

export default Button;
