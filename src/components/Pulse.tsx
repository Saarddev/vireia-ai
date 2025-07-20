"use client";

import { PulseBeams } from "@/components/ui/pulse-beams";

const beams = [
    {
        path: "M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5",
        gradientConfig: {
            initial: {
                x1: "0%",
                x2: "0%",
                y1: "80%",
                y2: "100%",
            },
            animate: {
                x1: ["0%", "0%", "200%"],
                x2: ["0%", "0%", "180%"],
                y1: ["80%", "0%", "0%"],
                y2: ["100%", "20%", "20%"],
            },
            transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                repeatDelay: 2, // changed for continuous flow
                delay: 1        // changed for continuous flow
            },
        },
        connectionPoints: [
            { cx: 6.5, cy: 398.5, r: 6 },
            { cx: 269, cy: 220.5, r: 6 }
        ]
    },
    {
        path: "M568 200H841C846.523 200 851 195.523 851 190V40",
        gradientConfig: {
            initial: {
                x1: "0%",
                x2: "0%",
                y1: "80%",
                y2: "100%",
            },
            animate: {
                x1: ["20%", "100%", "100%"],
                x2: ["0%", "90%", "90%"],
                y1: ["80%", "80%", "-20%"],
                y2: ["100%", "100%", "0%"],
            },
            transition: {
                duration: 5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                repeatDelay: 0, // changed for continuous flow
                delay: 0        // changed for continuous flow
            },
        },
        connectionPoints: [
            { cx: 851, cy: 34, r: 6.5 },
            { cx: 568, cy: 200, r: 6 }
        ]
    },
    {
        path: "M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5",
        gradientConfig: {
            initial: {
                x1: "0%",
                x2: "0%",
                y1: "80%",
                y2: "100%",
            },
            animate: {
                x1: ["20%", "100%", "100%"],
                x2: ["0%", "90%", "90%"],
                y1: ["80%", "80%", "-20%"],
                y2: ["100%", "100%", "0%"],
            },
            transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                repeatDelay: 0, // changed for continuous flow
                delay: 0        // changed for continuous flow
            },
        },
        connectionPoints: [
            { cx: 142, cy: 427, r: 6.5 },
            { cx: 425.5, cy: 274, r: 6 }
        ]
    },
    {
        path: "M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427",
        gradientConfig: {
            initial: {
                x1: "40%",
                x2: "50%",
                y1: "160%",
                y2: "180%",
            },
            animate: {
                x1: "0%",
                x2: "10%",
                y1: "-40%",
                y2: "-20%",
            },
            transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                repeatDelay: 0, // changed for continuous flow
                delay: 0        // changed for continuous flow
            },
        },
        connectionPoints: [
            { cx: 770, cy: 427, r: 6.5 },
            { cx: 493, cy: 274, r: 6 }
        ]
    },
    {
        path: "M380 168V17C380 11.4772 384.477 7 390 7H414",
        gradientConfig: {
            initial: {
                x1: "-40%",
                x2: "-10%",
                y1: "0%",
                y2: "20%",
            },
            animate: {
                x1: ["40%", "0%", "0%"],
                x2: ["10%", "0%", "0%"],
                y1: ["0%", "0%", "180%"],
                y2: ["20%", "20%", "200%"],
            },
            transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                repeatDelay: 0, // changed for continuous flow
                delay: 0        // changed for continuous flow
            },
        },
        connectionPoints: [
            { cx: 420.5, cy: 6.5, r: 6 },
            { cx: 380, cy: 168, r: 6 }
        ]
    }
];

const gradientColors = {
    start: "#18CCFC",
    middle: "#6344F5",
    end: "#AE48FF"
};

export const PulseBeamsUi = () => {
    return (
        <PulseBeams
            beams={beams}
            gradientColors={gradientColors}
            className="bg-resume-gray/5"
        >
            <button className="bg-resume-purple w-[220px] z-40 h-[100px] no-underline group cursor-pointer relative shadow-2xl shadow-zinc-700 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">

                <div className="relative flex justify-center w-[220px] text-center space-x-2 h-[100px] items-center z-10 rounded-full bg-resume-purple/50 py-0.5 px-4 ring-1 ring-white/10 ">
                    <span className="md:text-4xl text-base inline-block bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-resume-purple-light brightness-110 to-neutral-300">
                        Vireia AI
                    </span>
                </div>
            </button>
        </PulseBeams>
    );
}