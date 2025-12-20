import React from "react";

// Tailwind CSS for the spinning animation
const spinnerStyle: React.CSSProperties = {
  width: "3rem",
  height: "3rem",
  border: "4px solid",
  borderColor: "transparent",
  borderTopColor: "#8B5CF6", // Purple-500
  borderRightColor: "#A78BFA", // Purple-400
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

// Define the spin keyframe animation (required since Tailwind doesn't have a default spin speed)
const keyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default function Loader() {
  return (
    <>
      <style>{keyframes}</style>
      <div className="flex flex-col items-center justify-center p-8">
        <div style={spinnerStyle} />
        <p className="mt-4 text-lg text-purple-600 font-medium">Loading...</p>
      </div>
    </>
  );
}
