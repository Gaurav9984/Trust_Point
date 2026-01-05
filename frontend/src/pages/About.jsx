import React, { useEffect, useRef } from "react";
import p1 from "../assets/pair1.jpg";
import p2 from "../assets/p2.webp";
import { BadgeIndianRupeeIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const img1Ref = useRef(null);
    const img2Ref = useRef(null);
    const rightRef = useRef(null);
    const boxRefs = useRef([]);
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Main timeline with ScrollTrigger
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                    end: "bottom 25%",
                    toggleActions: "play none none reverse",
                    // markers: true, // Uncomment for debugging
                }
            });

            // Animate main image
            tl.fromTo(
                img1Ref.current,
                { opacity: 0, scale: 0.8, y: 50 },
                { 
                    opacity: 1, 
                    scale: 1, 
                    y: 0, 
                    duration: 1, 
                    ease: "power3.out" 
                }
            );

            // Animate second image with overlap
            tl.fromTo(
                img2Ref.current,
                { opacity: 0, scale: 0.8, y: 80, rotation: 5 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotation: 0,
                    duration: 1,
                    ease: "power3.out",
                },
                "-=0.7" // Start 0.7s before previous animation ends
            );

            // Animate right side text content
            if (rightRef.current && rightRef.current.children.length > 0) {
                tl.fromTo(
                    rightRef.current.children,
                    { opacity: 0, x: 60 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: "power3.out",
                        stagger: 0.2,
                    },
                    "-=0.5" // Start 0.5s before previous animation ends
                );
            }

            // Animate info boxes with individual ScrollTriggers for better control
            const validBoxes = boxRefs.current.filter(box => box !== null);
            validBoxes.forEach((box, index) => {
                gsap.fromTo(
                    box,
                    { opacity: 0, y: 40, scale: 0.9 },
                    {
                        scrollTrigger: {
                            trigger: box,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: "back.out(1.7)",
                        delay: index * 0.2,
                    }
                );
            });

            // Refresh ScrollTrigger
            ScrollTrigger.refresh();
        }, containerRef);

        return () => {
            // Clean up all animations
            ctx.revert();
        };
    }, []);

    return (
        <div 
            ref={containerRef}
            className="min-h-screen bg-gray-100 flex flex-col md:flex-row items-center md:items-start justify-center py-12 px-4 gap-10"
        >
            {/* Left side with images */}
            <div className="relative flex-1 flex justify-start ml-10">
                <div className="relative w-72 h-96 md:w-80 md:h-[420px] group">
                    {/* Main Image */}
                    <img
                        ref={img1Ref}
                        src={p1}
                        alt="main"
                        className="w-full h-full object-cover rounded-2xl shadow-lg transform transition duration-500 group-hover:scale-105 group-hover:shadow-2xl"
                    />
                    {/* Second Image (hidden on small, shows on md+) */}
                    <img
                        ref={img2Ref}
                        src={p2}
                        alt="secondary"
                        className="absolute bottom-[-80px] right-[-260px] w-72 h-96 object-cover rounded-2xl shadow-lg hidden md:block transform transition duration-500 group-hover:scale-110 group-hover:shadow-2xl"
                    />
                </div>
            </div>

            {/* Right side with text + boxes */}
            <div ref={rightRef} className="flex-1 space-y-8 text-center md:text-left">
                {/* Heading */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-gray-500">About Us</h2>
                    <h2 className="text-3xl md:text-5xl font-bold max-w-lg mx-auto md:mx-0">
                        Trusted guidance for{" "}
                        <span className="text-green-500">financial growth</span>
                    </h2>
                    <p className="text-gray-600 leading-relaxed mt-2 md:mt-4 text-base md:text-lg">
                        With years of expertise in finance and consulting, we provide tailored
                        strategies to help you achieve sustainable growth. Our commitment is
                        to guide you with integrity, insight, and a personalized approach.
                    </p>
                </div>

                {/* Info Items */}
                <div
                    ref={(el) => {
                        if (el) boxRefs.current[0] = el;
                    }}
                    className="flex flex-col items-start gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                    <div
                        className="flex-shrink-0 w-14 h-14 flex items-center justify-center 
                    rounded-full text-white bg-green-500 
                    transition-all duration-300 ease-in-out 
                    hover:bg-green-600 hover:scale-110 hover:shadow-lg"
                    >
                        <BadgeIndianRupeeIcon size={28} className="text-white" />
                    </div>

                    <div className="text-left">
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">Financial Strategies</h4>
                        <p className="text-gray-600 text-base leading-relaxed">
                            Tailored plans to meet your unique financial needs and goals with expert guidance.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;