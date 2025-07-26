// src/components/ads/AAdsAd.tsx

import React from "react";

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
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border border-muted bg-transparent w-fit mx-auto">
      <iframe
        data-aa={adId}
        src={`//ad.a-ads.com/${adId}?size=${width}x${height}`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          border: "0px",
          padding: "0",
          overflow: "hidden",
          backgroundColor: "transparent",
        }}
        title="A-ADS Banner"
      ></iframe>
    </div>
  );
};

export default AAdsAd;
