import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Calculator,
    HeartPulse,
    Shield,
    CreditCard,
    Link2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {

    const navigate = useNavigate();
    const containerRef = useRef(null);
    const leftRef = useRef(null);
    const headingRef = useRef(null);
    const buttonRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                    // markers: true, // Uncomment for debugging
                }
            });

            // Animate "OUR FEATURES"
            tl.fromTo(
                leftRef.current,
                { y: -30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
            );

            // Animate heading words one by one
            if (headingRef.current) {
                const words = headingRef.current.querySelectorAll("span");
                tl.fromTo(
                    words,
                    { y: -40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power3.out",
                    },
                    "-=0.5" // Start 0.5s before previous animation ends
                );
            }

            // Animate button
            tl.fromTo(
                buttonRef.current,
                { scale: 0.8, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                },
                "-=0.3"
            );

            // Animate feature cards with scroll trigger
            cardsRef.current.forEach((card, index) => {
                if (card) {
                    gsap.fromTo(
                        card,
                        {
                            opacity: 0,
                            y: 60,
                            scale: 0.9,
                        },
                        {
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%",
                                toggleActions: "play none none reverse",
                            },
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.8,
                            ease: "power3.out",
                            delay: index * 0.1, // Stagger cards
                        }
                    );
                }
            });

            // Refresh ScrollTrigger
            ScrollTrigger.refresh();
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Heading text split into words
    const headingText = "Key Features of our finance and consulting".split(" ");

    // Feature cards data
    const features = [
        {
            id: 1,
            icon: <Calculator className="w-8 h-8 text-white" />,
            title: "Financial Calculator",
            desc: "Quickly calculate loans, investments, and savings to plan smarter and make informed financial decisions.",
        },
        {
            id: 2,
            icon: <HeartPulse className="w-8 h-8 text-white" />,
            title: "Financial Health",
            desc: "Monitor income, expenses, and overall financial stability to achieve sustainable long-term financial growth.",
        },
        {
            id: 3,
            icon: <Shield className="w-8 h-8 text-white" />,
            title: "Risk Profile",
            desc: "Analyze your investment risk appetite with precision tools to ensure better planning and balanced growth.",
        },
        {
            id: 4,
            icon: <CreditCard className="w-8 h-8 text-white" />,
            title: "Online Payment",
            desc: "Experience fast, secure, and convenient online payment options that simplify everyday financial transactions easily.",
        },
        {
            id: 5,
            icon: <Link2 className="w-8 h-8 text-white" />,
            title: "Useful Links",
            desc: "Access essential financial tools, guides, and trusted resources to enhance knowledge and improve money management.",
        },
    ];

    return (
        <div
            ref={containerRef}
            className="bg-[#111C2E] min-h-screen text-white px-8 md:px-16 lg:px-24 py-20"
        >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
                {/* Left side (text with GSAP animation) */}
                <div className="max-w-2xl space-y-4">
                    <h4 ref={leftRef} className="text-lg font-semibold text-green-400 tracking-wide">
                        OUR FEATURES
                    </h4>
                    <h1
                        ref={headingRef}
                        className="text-4xl md:text-5xl font-bold leading-tight flex flex-wrap gap-2"
                    >
                        {headingText.map((word, index) => (
                            <span
                                key={index}
                                className={`inline-block ${word === "consulting" ? "text-green-600" : "text-[#E5D7C9]"
                                    }`}
                            >
                                {word}
                            </span>
                        ))}
                    </h1>
                </div>

                {/* Right side (button) */}
                <div>
                    <button
                        ref={buttonRef}
                         onClick={() => navigate("/contacts")}
                        className="mt-2 relative bg-green-500 overflow-hidden px-8 py-3 rounded-full font-semibold text-gray-800 border border-green-500 group"
                    >
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-gray-800">
                            Contact Now
                        </span>
                        {/* Animated background */}
                        <span className="absolute inset-y-0 left-0 w-0 bg-white transition-all duration-500 ease-in-out group-hover:w-full z-0"></span>
                    </button>
                </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                {features.map((feature, index) => (
                    <div
                        key={feature.id}
                        ref={(el) => {
                            if (el) cardsRef.current[index] = el;
                        }}
                        className={`p-6 rounded-2xl transition-transform transform hover:-translate-y-2 hover:scale-105 group cursor-pointer ${index % 2 === 0
                            ? "bg-[#f1e6da] text-black shadow-lg shadow-green-600/30 hover:shadow-green-600/50"
                            : "text-white hover:shadow-lg hover:shadow-gray-600/30 hover:text-shadow-gray-200"
                            }`}
                    >
                        {/* Icon Box */}
                        <div className="mb-4 w-14 h-14 flex items-center justify-center rounded-xl bg-gray-600 transition-all duration-300 group-hover:bg-green-600 group-hover:scale-110">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl  font-semibold mb-2 group-hover:text-green-400 transition-colors duration-300">
                            {feature.title}
                        </h3>
                        <p className=" group-hover:text-green-400 transition-colors duration-300">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;