import React, { useEffect, useRef } from "react";
import { ArrowRightCircle } from "lucide-react";
import gsap from "gsap";
import p1 from "../assets/pair1.jpg";
import p2 from "../assets/p2.webp";
import { useNavigate } from "react-router-dom";

const Task = () => {
    const features = [
        "Strategic Financial Planning",
        "Expert Investment Advisory",
        "Retirement & Future Planning",
        "Wealth Management Solutions",
    ];
    const cardRef=useRef()
    const navigate = useNavigate();

    useEffect(() => {
        // Experience card → slide in, then continuous left-right motion
        gsap.fromTo(
            cardRef.current,
            { x: -200, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1.2,
                ease: "back.out(1.7)",
                delay: 1,
                onComplete: () => {
                    gsap.to(cardRef.current, {
                        x: 20, // how far it moves right
                        duration: 1.5,
                        repeat: -1, // infinite loop
                        yoyo: true, // back and forth
                        ease: "power1.inOut",
                    });
                },
            }
        );
    }, []);
    return (
        <div className="flex flex-col md:flex-row min-h-screen px-6 md:px-10 items-center gap-4 md:gap-6 bg-gray-100">
            {/* left */}
            <div className="flex-1 space-y-4 text-center md:text-left">
                <p className="text-base md:text-lg font-bold text-gray-700 tracking-wider">
                    WHAT WE DO
                </p>

                <h1 className="text-3xl md:text-5xl max-w-2xl text-gray-600 font-bold leading-snug mx-auto md:mx-0">
                    Driving financial growth{" "}
                    <span className="text-green-600">and success</span>
                </h1>

                <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto md:mx-0">
                    We provide expert financial and consulting solutions designed to
                    foster growth, stability, and long-term success.
                </p>

                {/* mapped features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {features.map((feature, index) => (
                        <p
                            key={index}
                            className="flex items-center gap-2 text-gray-700 font-medium justify-center md:justify-start"
                        >
                            <ArrowRightCircle size={20} className="text-green-600" />
                            {feature}
                        </p>
                    ))}
                </div>

                <button onClick={()=>navigate('/contacts')} className="mt-6 relative bg-green-500 overflow-hidden px-6 py-3 rounded-full font-semibold text-white border border-green-500 group">
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-gray-700">
                        Contact Now
                    </span>
                    <span className="absolute inset-y-0 left-0 w-0 bg-white transition-all duration-500 ease-in-out group-hover:w-full z-0"></span>
                </button>
            </div>

            {/* right */}
            <div className="relative flex justify-center mt-4 md:mt-0 flex-1">
                <div className="relative w-65 h-60 sm:w-64 sm:h-80 md:w-140 md:h-[400px] group">
                    {/* Main Image */}
                    <img
                        src={p2}
                        alt="main"
                        className="h-full w-full object-cover rounded-2xl shadow-lg 
                            transform transition duration-500 
                            group-hover:scale-105 group-hover:shadow-2xl"
                    />

                    {/* Secondary Image */}
                    <img
                        src={p1}
                        alt="secondary"
                        className="absolute h-24 sm:h-40 md:h-42 w-auto
                            object-cover rounded-2xl shadow-lg 
                            transform transition duration-500 
                            group-hover:scale-105 group-hover:shadow-2xl 
                            bottom-[-30px] right-[-15px] 
                            sm:bottom-[-50px] sm:right-[-30px] 
                            md:bottom-[-60px] md:right-[-60px] 
                            hidden sm:block"
                    />
                </div>

                {/* Overlapping Experience Card */}
                <div ref={cardRef} className="absolute bottom-20 -left-6 overflow-hidden text-gray-700 px-10 border border-l-0 border-t-0 py-4 rounded-xl shadow-xl group">
                    {/* Text content */}
                    <div className="relative z-10 transition-colors duration-500 group-hover:text-white">
                        <h2 className="text-3xl md:text-4xl font-bold">10+ Years</h2>
                        <p className="text-lg font-medium">of Experience in finance</p>
                    </div>

                    {/* Overlay animation (left → right, green) */}
                    <span className="absolute top-0 left-0 h-full w-0 bg-green-500 transition-all duration-500 ease-in-out group-hover:w-full z-0"></span>
                </div>
            </div>
        </div>
    );
};

export default Task;
