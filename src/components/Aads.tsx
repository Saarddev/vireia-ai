// src/components/ads/AAdsAd.tsx

import React from "react";

interface AAdsAdProps {
  adId?: string;
  width?: number;
  height?: number;
}

const AAdsAd = () => {
  return (
    <div
      className="rounded-xl shadow border border-muted mx-auto my-6 w-fit"
      dangerouslySetInnerHTML={{
        __html: `
          <iframe 
            data-aa="2404556" 
            src="https://ad.a-ads.com/2404556?size=300x250" 
            style="width:300px; height:250px; border:0px; padding:0; overflow:hidden; background-color:transparent;">
          </iframe>
        `,
      }}
    />
  );
};

export default AAdsAd;



