import React from "react";

const Secondary_Button = ({ text }: { text: string }) => {
  const btnTxt = text || "Seondary Action";
  return (
    <button className="px-8 py-3 bg-white text-[#FF6B9D] border-2 border-[#FF6B9D] rounded-full font-semibold hover:bg-[#FF6B9D] hover:text-white transition-all">
      {btnTxt}
    </button>
  );
};

export default Secondary_Button;
