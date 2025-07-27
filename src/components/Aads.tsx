import React, { useEffect, useRef } from "react";

interface AAdsAdProps {
  adId?: string;
  width?: number;
  height?: number;
}

const AAdsAd: React.FC<AAdsAdProps> = ({
  adId = "2404556",
  width = 300,
  height = 250,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = ""; // clear any placeholder

    const iframe = document.createElement("iframe");
    iframe.setAttribute("data-aa", adId);
    iframe.src = `https://ad.a-ads.com/${adId}?size=${width}x${height}`;
    iframe.width = `${width}`;
    iframe.height = `${height}`;
    iframe.style.border = "0";
    iframe.style.overflow = "hidden";
    iframe.style.backgroundColor = "transparent";
    containerRef.current.appendChild(iframe);
  }, [adId, width, height]);

  return (
    <div
      ref={containerRef}
      className="rounded-2xl overflow-hidden shadow-sm border border-muted bg-transparent w-fit mx-auto"
    />
  );
};
