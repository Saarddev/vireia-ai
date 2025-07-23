// src/components/ads/SocialBar.tsx
import { useEffect } from "react";

const SocialBar = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//pl27243745.profitableratecpm.com/8c/e7/0a/8ce70ad94d2672cf83215f1d5830b974.js"; // your ad code
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      // Clean up on unmount to prevent re-adding it
      document.body.removeChild(script);
    };
  }, []);

  return null; // Adsterra script injects itself
};

export default SocialBar;
