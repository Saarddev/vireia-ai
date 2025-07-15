import { useEffect, useRef } from 'react';

export default function Banner(): JSX.Element {
    const banner = useRef<HTMLDivElement>(null);

    const atOptions = {
        key: '6c128e8067bebd5aa5594bdedcac2e18',
        format: 'iframe',
        height: 600,
        width: 160,
        params: {}
    };

    useEffect(() => {
        if (banner.current && !banner.current.firstChild) {
            const conf = document.createElement('script');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `//www.highperformancedformats.com/${atOptions.key}/invoke.js`;

            conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;
            banner.current.append(conf);
            banner.current.append(script);
        }

    }, []);

    return (
        <div
            className="mx-2 my-5 border border-gray-200 justify-center items-center text-white text-center"
            ref={banner}
        ></div>
    );
}
