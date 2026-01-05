import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
    Briefcase,
    BarChart,
    PiggyBank,
    ShieldCheck,
    Users,
    TrendingUp,
} from "lucide-react";

const servicesData = [
    {
        id: 1,
        icon: <Briefcase size={28} />,
        title: "Business Consulting",
        desc: "Our business consulting service helps organizations identify opportunities, streamline operations, and overcome challenges with tailored strategies. We focus on driving growth, improving efficiency, and enhancing decision-making processes. Whether you're a startup or an established company, we provide actionable solutions that ensure long-term success and competitive advantage.",
    },
    {
        id: 2,
        icon: <BarChart size={28} />,
        title: "Financial Planning",
        desc: "We create personalized financial plans designed to align with your goals, lifestyle, and future aspirations. Our process involves assessing income, expenses, savings, and investments to ensure financial stability and growth. With expert guidance, you gain clarity and control, making informed decisions for both short-term and long-term objectives.",
    },
    {
        id: 3,
        icon: <PiggyBank size={28} />,
        title: "Investment Advisory",
        desc: "Our investment advisory service provides expert insights into market opportunities and risk management strategies. We help diversify portfolios, maximize returns, and safeguard wealth. With data-driven research and personalized recommendations, we guide you toward achieving financial security and sustainable growth while adapting to market changes and evolving economic conditions.",
    },
    {
        id: 4,
        icon: <ShieldCheck size={28} />,
        title: "Risk Management",
        desc: "Effective risk management protects your assets and minimizes potential losses. We identify, analyze, and address risks across financial, operational, and market domains. By implementing preventive measures and strategic solutions, we ensure business continuity, regulatory compliance, and resilience against uncertainties, enabling your business to thrive in any environment.",
    },
    {
        id: 5,
        icon: <Users size={28} />,
        title: "Team Training",
        desc: "We design specialized training programs to enhance the skills, productivity, and knowledge of your workforce. Our workshops and learning modules cover leadership, communication, finance, and technology, helping employees adapt to challenges and industry changes. Empowered teams create stronger organizations, fostering innovation, collaboration, and long-lasting professional growth opportunities.",
    },
    {
        id: 6,
        icon: <TrendingUp size={28} />,
        title: "Market Analysis",
        desc: "Our market analysis services deliver valuable insights into customer behavior, industry trends, and competitor strategies. We use data-driven research to uncover opportunities, forecast changes, and minimize risks. Businesses gain the clarity needed to refine strategies, improve product positioning, and make smarter investment decisions that drive measurable growth.",
    },
];

const Services = () => {
    const leftRef = useRef(null);

    useEffect(() => {
        // Left side animation
        gsap.from(leftRef.current, {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
        });

    }, []);

    const truncateText = (text, wordLimit) => { const words = text.split(" "); return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text; };

    return (
        <div className="py-16 px-6 md:px-20 bg-[#E5D7C9]">
            <div className="flex flex-col md:flex-row items-start justify-between gap-12">

                {/* Left side sticky */}
                <div
                    className="md:w-1/3 space-y-6 md:sticky md:top-20 self-start"
                >
                    <p className="text-gray-500 font-semibold text-xl">SERVICES</p>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Expert finance & consult services
                        <span className="text-green-500"> for success</span>
                    </h1>
                    <p className="text-gray-500">
                        Explore a wide range of financial and consulting solutions tailored to empower your business with growth and stability.
                    </p>

                    <button className="relative bg-green-500 overflow-hidden px-6 py-3 rounded-full font-semibold text-gray-700 border border-green-500 group">
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-gray-700">
                            All Services
                        </span>
                        <span className="absolute inset-y-0 left-0 w-0 bg-white transition-all duration-500 ease-in-out group-hover:w-full z-0"></span>
                    </button>
                </div>

                {/* Right side scrollable grid */}
                <div className="md:w-2/3 h-[70vh] overflow-y-auto pr-2 scrollbar-hide">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {servicesData.map((service) => (
                            <div
                                key={service.id}
                                className="relative p-6 bg-gray-50 rounded-2xl shadow group overflow-hidden cursor-pointer"
                            >
                                {/* Green overlay animation */}
                                <div className="absolute inset-0 bg-green-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white mb-4 group-hover:bg-white group-hover:text-green-600 transition-all duration-300">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-700 group-hover:text-white">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 text-md group-hover:text-gray-100">
                                        {truncateText(service.desc,15)}
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

export default Services;
