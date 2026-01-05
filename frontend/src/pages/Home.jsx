import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import SlideStock from "../components/SlideStock";
import gsap from "gsap";
import professionalImg from "../assets/hero-img.webp"; // add your image
import Banks from "../components/Banks";
import { ArrowBigRight } from "lucide-react";
import Contacts from "./Contacts";
import About from "./About";
import Services from "./Services";
import Choose from "../components/Choose";
import Features from "./Features";
import Facts from "../components/Facts";
import Task from "../components/Task";
import Working from "../components/Working";
import Faqs from "../components/Faqs";
import Blog from "../components/Blog";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const textRef = useRef(null);
    const imgRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        gsap.fromTo(
            textRef.current,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );
        gsap.fromTo(
            imgRef.current,
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
        );

        // removed overlapping experience card animation
    }, []);

    return (
        <div className="overflow-x-hidden">
            {/* Navbar fixed on top */}
            <Navbar />

            {/* Push content down by navbar height (h-20 = 80px) */}
            <div className="bg-[#111C2E] min-h-screen pt-20 overflow-x-hidden">
                {/* Fixed Stock Slider under Navbar */}
                <div className="relative top-0 left-0 w-full z-40">
                    <SlideStock />
                </div>

                {/* Main Content */}
                <div className="pt-10 px-6 mx-auto gap-6 w-full ">
                    {/* Portfolio Hero Section */}
                    <div className="flex flex-col md:flex-row items-center justify-between relative">
                        {/* Left Text */}
                        <div ref={textRef} className="text-[#E5D7C9] max-w-lg gap-2">
                            <p className="text-lg font-bold tracking-wide">
                                Trust Point Wealth Partners
                            </p>
                            <h1 className="text-4xl md:text-6xl font-bold w-full leading-tight">
                                <span className="text-green-600">Your Trusted</span> Partner, in FInancial Succes.
                                
                            </h1>
                            <p className="mt-4 text-[#E5D7C9] text-lg">
                                Guiding you with expert insights and strategic solutions to
                                achieve financial growth, stability, and long-term success.
                            </p>
                            <div className="mt-4 text-[#E5D7C9] text-lg font-semibold">
                                Why trust us with your finance? <span className="text-green-400">10 years</span> of proven expertise.
                            </div>
                            <button
                                onClick={() => navigate("/contacts")}
                                className="mt-4 relative bg-green-500 overflow-hidden px-6 py-3 rounded-full font-semibold text-[#E5D7C9] border border-green-500 group"
                            >
                                <span className="relative z-10 transition-colors duration-300 group-hover:text-[#E5D7C9]">
                                    Get Started
                                </span>
                                <span className="absolute inset-y-0 left-0 w-0 bg-white transition-all duration-500 ease-in-out group-hover:w-full z-0"></span>
                            </button>
                            {/* <div className="mt-4 text-[#E5D7C9] flex items-center gap-2">
                                <h2 className="text-xl font-semibold">We are Working with </h2>
                                <ArrowBigRight className="fill-[#E5D7C9]" size={16} />
                                <Banks />
                            </div> */}
                        </div>

                        {/* Right Image */}
                        <div className="mt-10 md:mt-0 relative" ref={imgRef}>
                            <img
                                src={professionalImg}
                                alt="Finance Professional"
                                className="rounded-2xl shadow-lg w-[400px] md:w-[400px]"
                            />

                            {/* Overlapping experience card removed */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Other Sections */}
            <div >
                <About />
            </div>
            <Services />
            <Choose />
            <div>
                <Features />
            </div>
            <Facts />
            <Task />
            <Working />
            <Faqs />

            <div >
                <Blog />
            </div>
        </div>
    );
};

export default Home;
//Gaurav Pal
