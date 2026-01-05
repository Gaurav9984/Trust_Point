import React from "react";

const SectionHeader = ({ children }) => (
    <div className="w-full flex h-[240px] bg-[#F9F0D3] items-center justify-center">
        <h1 className="text-gray-600 text-5xl md:text-6xl font-bold">{children}</h1>
    </div>
);

export default SectionHeader;
