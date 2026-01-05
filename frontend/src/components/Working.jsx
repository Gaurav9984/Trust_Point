import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const servicesData = [
    {
        id: 1,
        icon: 'STEP-01',
        title: "Understand the Client's Profile and Objectives",
        desc: "We start by understanding your financial goals, challenges, and priorities to tailor a personalized strategy that suits your objectives.",
    },
    {
        id: 2,
        icon: 'STEP-02',
        title: "Recommend Suitable Mutual Fund Schemes",
        desc: "We analyze your risk profile and goals to recommend mutual fund schemes that align with your investment horizon and financial objectives.",
    },
    {
        id: 3,
        icon: 'STEP-03',
        title: "Execute, Monitor, and Review Investments",
        desc: "We implement your investment plan, continuously monitor performance, and regularly review it to ensure alignment with your evolving financial goals.",
    },
];

const Working = () => {
    const leftRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        gsap.from(leftRef.current, {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
        });
    }, []);

    const truncateText = (text, wordLimit) => {
        const words = text.split(" ");
        return words.length > wordLimit
            ? words.slice(0, wordLimit).join(" ") + "..."
            : text;
    };

    return (
        <div className="py-20 px-6 md:px-20 bg-[#f1e6da]">
            <div className="flex flex-col md:flex-row items-start justify-between gap-16">

                {/* Left side (not sticky now) */}
                <div  className="md:w-1/3 space-y-6 self-start">
                    <p className="text-gray-500 font-semibold text-xl">HOW IT WORKS</p>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Our process for financial
                        <span className="text-green-500"> success</span>
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Our process is designed to guide you every step of the way. From initial consultation to personalized strategy development.
                    </p>

                    <button  onClick={() => navigate("/contacts")} className="relative bg-green-500 overflow-hidden px-6 py-3 rounded-full font-semibold text-gray-700 border border-green-500 group text-lg">
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-gray-700">
                            Learn More
                        </span>
                        <span className="absolute inset-y-0 left-0 w-0 bg-white transition-all duration-500 ease-in-out group-hover:w-full z-0"></span>
                    </button>
                </div>

                {/* Right side scrollable */}
                <div className="md:w-2/3 h-[70vh] overflow-y-auto pr-3 scrollbar-hide">
                    <div className="grid grid-cols-1 gap-10">
                        {servicesData.map((service) => (
                            <div
                                key={service.id}
                                className="relative p-8 bg-gray-50 rounded-2xl shadow group overflow-hidden cursor-pointer min-h-[250px]"
                            >
                                {/* Gray overlay animation from top */}
                                <div className="absolute inset-0 bg-gray-700 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <p className="text-green-500 text-base font-semibold">{service.icon}</p>
                                    <h3 className="text-xl font-semibold mb-3 text-gray-700 group-hover:text-white">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 text-lg group-hover:text-gray-200">
                                        {truncateText(service.desc, 20)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Working;
