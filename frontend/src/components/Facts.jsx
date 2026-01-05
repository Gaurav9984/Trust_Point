import React, { useEffect, useRef } from "react";
import { Award, TrendingUp, Globe, ArrowRightCircle } from "lucide-react";
import fact from "../assets/fact.webp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Facts = () => {
    const statsRef = useRef([]);

    // Stats data
    const stats = [
        {
            id: 1,
            icon: <Award className="w-8 h-8 text-green-600 relative z-10" />, 
            number: 10,
            suffix: "+",
            label: "Years of experience",
        },
        {
            id: 2,
            icon: <TrendingUp className="w-8 h-8 text-green-600 relative z-10" />,
            number: 95,
            suffix: "%+",
            label: "Client success rate",
        },
        {
            id: 3,
            icon: <Globe className="w-8 h-8 text-green-600 relative z-10" />,
            number: 20,
            suffix: "+",
            label: "Global research",
        },
    ];

    useEffect(() => {
        statsRef.current.forEach((el) => {
            if (!el) return;

            const numberEl = el.querySelector(".stat-number");
            const iconBox = el.querySelector(".icon-box");

            // Count-up number animation
            gsap.fromTo(
                numberEl,
                { innerText: 0 },
                {
                    innerText: numberEl.dataset.value,
                    duration: 2,
                    ease: "power3.out",
                    snap: { innerText: 1 },
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                    },
                    onUpdate: function () {
                        numberEl.innerText = Math.floor(numberEl.innerText);
                    },
                    onComplete: function () {
                        numberEl.innerText = numberEl.dataset.value; // ensure final value
                    },
                }
            );

            // Icon box "color flow" animation
            const bgCircle = iconBox.querySelector(".bg-circle");
            gsap.fromTo(
                bgCircle,
                { scale: 0, opacity: 0.5 },
                {
                    scale: 2,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power2.out",
                    repeat: -1,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                    },
                }
            );
        });
    }, []);

    return (
        <div className="flex flex-col bg-zinc-100  lg:flex-row items-center gap-12 px-8 md:px-16 lg:px-24 py-12">
            {/* Left side image */}
            <div className="flex-1">
                <img
                    src={fact}
                    alt="Facts illustration"
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
            </div>

            {/* Right side content */}
            <div className="flex-1 space-y-6">
                <p className="text-lg text-green-600 font-semibold tracking-wide">
                    SOME FACTS
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                    Key facts our <span className="text-green-600">expertise</span>
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl">
                    Our expertise is built on 10 years of industry experience, proven
                    financial strategies and a commitment to client success.
                </p>

                {/* Stats grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                    {stats.map((stat, i) => (
                        <div
                            key={stat.id}
                            ref={(el) => (statsRef.current[i] = el)}
                            className="flex items-start gap-4 p-5 rounded-xl bg-gray-100"
                        >
                            {/* Icon Box with animated bg-circle */}
                            <div className="icon-box relative w-14 h-14 flex items-center justify-center rounded-lg bg-white shadow-md overflow-hidden">
                                <span className="bg-circle absolute inset-0 rounded-full bg-green-400"></span>
                                {stat.icon}
                            </div>
                            {/* Number + Label */}

                            <div>
                                {/* number + suffix in one row */}
                                <div className="flex items-baseline">
                                    <h1
                                        className="stat-number text-2xl md:text-3xl font-bold text-gray-800"
                                        data-value={stat.number}
                                    >
                                        0
                                    </h1>
                                    <span className="ml-1 text-2xl md:text-3xl font-bold text-gray-800">
                                        {stat.suffix}
                                    </span>
                                </div>

                                <p className="text-gray-600">{stat.label}</p>
                            </div>

                        </div>
                    ))}
                </div>
                <div className="flex flex-col md:flex-row gap-6 mt-2">
                    <p className="flex items-center gap-2 text-gray-700 font-medium">
                        <ArrowRightCircle size={20} className="text-green-600" />
                        Strategic Financial Planning
                    </p>
                    <p className="flex items-center gap-2 text-gray-700 font-medium">
                        <ArrowRightCircle size={20} className="text-green-600" />
                        Expert Investment Advisory
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Facts;
