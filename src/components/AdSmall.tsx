import { useEffect, useRef } from "react";

const AdsterraSmallAd = () => {
    const adRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Set global ad options
        (window as any).atOptions = {
            key: "c9a73752c7c6227a287d99032be907dc",
            format: "iframe",
            height: 300,
            width: 160,
            params: {}
        };

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "//www.highperformanceformat.com/c9a73752c7c6227a287d99032be907dc/invoke.js";
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
        <div className="max-w-full bg-white border border-gray-200 shadow-md rounded-xl p-3 flex flex-col items-center">
            <p className="text-xs text-gray-500 font-semibold mb-2">🎯 Sponsored</p>
            <div ref={adRef} className="w-full h-[300px]" />
        </div>
    );
};

export default AdsterraSmallAd;
