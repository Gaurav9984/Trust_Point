import { Grid2X2, UserCheck, ArrowRightCircle } from 'lucide-react'
import React from 'react'
import p1 from '../assets/pair1.jpg'
import p2 from '../assets/p2.webp'

const Choose = () => {
    return (
        <div className="w-full py-16 px-6 md:px-12 lg:px-20 bg-[#E5D7C9]">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left side */}
                <div className="flex flex-col gap-8">
                    <div>
                        <h4 className="text-lg text-gray-600 font-semibold mb-2">WHY CHOOSE US</h4>
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            Why trust us with <span className="text-green-600">your finances</span>
                        </h1>
                    </div>

                    {/* Features section */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        {/* 1 - Card */}
                        <div className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition transform group">
                            <div className="p-3 w-fit bg-green-100 rounded-xl text-green-600 mb-4 group-hover:bg-green-200 transition">
                                <Grid2X2 size={28} />
                            </div>
                            <h4 className="flex items-center gap-2 text-lg font-semibold mb-2 group-hover:text-green-600 transition">

                                Deep Industry Experience
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                10+ years of industry expertise, crafting winning strategies in Mutual Funds
                                and Commercial Insurance. Your financial security, our priority.
                            </p>
                        </div>

                        {/* 2 - Card */}
                        <div className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition transform group">
                            <div className="p-3 w-fit bg-green-100 rounded-xl text-green-600 mb-4 group-hover:bg-green-200 transition">
                                <UserCheck size={28} />
                            </div>
                            <h4 className="flex items-center gap-2 text-lg font-semibold mb-2 group-hover:text-green-600 transition">

                                Consulting Expertise
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Service over sales defines us. Our consulting respects your time – we connect only when it suits you, ensuring no disruptions. Your convenience, our commitment.
                            </p>
                        </div>
                    </div>

                    {/* 3 & 4 - Simple text (not in box) */}
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

                {/* Right side - overlapping images */}
                <div className="relative flex justify-center md:justify-start">
                    <div className="relative w-82 h-96 md:w-80 md:h-[420px] group">
                        {/* Main Image */}
                        <img
                            src={p1}
                            alt="main"
                            className="h-full w-full max-w-xs sm:max-w-sm md:max-w-md 
                                object-cover rounded-2xl shadow-lg 
                                transform transition duration-500 
                                group-hover:scale-105 group-hover:shadow-2xl"
                        />

                        {/* Secondary Image */}
                        <img
                            src={p2}
                            alt="secondary"
                            className="absolute h-48  w-full
                                object-cover rounded-2xl shadow-lg 
                                transform transition duration-500 
                                group-hover:scale-105 group-hover:shadow-2xl 
                                bottom-[-130px] right-[-80px] 
                                md:bottom-[-60px] md:right-[-140px] 
                                hidden sm:block"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Choose
