import { useEffect, useRef } from "react";

const AdsterraBannerAd = () => {
    const adRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (window as any).atOptions = {
            key: "181369c164c92b58961137043571784f",
            format: "iframe",
            height: 50,
            width: 320,
            params: {}
        };

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "//www.highperformanceformat.com/181369c164c92b58961137043571784f/invoke.js";
        script.async = true;

        if (adRef.current) {
            adRef.current.innerHTML = "";
            adRef.current.appendChild(script);
        }

        return () => {
            if (adRef.current) adRef.current.innerHTML = "";
        };
    }, []);

    return (
        <div className="w-full flex justify-center py-4">
            <div className="bg-white border border-gray-200 shadow rounded-lg px-4 py-2">
                <p className="text-xs text-gray-500 font-medium text-center mb-1">🔗 Sponsored</p>
                <div ref={adRef} className="w-[320px] h-[50px]" />
            </div>
        </div>
    );
};

export default AdsterraBannerAd;
