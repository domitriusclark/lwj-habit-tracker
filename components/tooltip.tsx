interface TooltipProps {
  message: string;
  position: "top" | "right" | "bottom" | "left";
  children: React.ReactNode;
}
import React, { useState } from "react";

export default function Tooltip({ message, position, children }: TooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseOver = () => setShowTooltip(true);
  const handleMouseOut = () => setShowTooltip(false);

  let stylePosition = "";
  switch (position) {
    case "top":
      stylePosition = "bottom-full left-1/2 transform -translate-x-1/2";
      break;
    case "right":
      stylePosition = "top-1/2 right-full transform -translate-y-1/2";
      break;
    case "bottom":
      stylePosition = "top-full left-1/2 transform -translate-x-1/2";
      break;
    case "left":
      stylePosition = "top-1/2 left-full transform -translate-y-1/2";
      break;
  }

  const opacityClass = showTooltip ? "opacity-100" : "opacity-0";

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
      onTouchStart={handleMouseOver}
      onTouchEnd={handleMouseOut}
    >
      <div
        className={`absolute ${stylePosition} w-32 p-2 mt-1 text-center text-white bg-black rounded ${opacityClass} transition-opacity`}
      >
        <div>{message}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}
