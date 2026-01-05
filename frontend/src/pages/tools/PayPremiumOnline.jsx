import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import hdfc from '../../assets/hdfclife.png'
import icici from '../../assets/icici.png'
import tata from '../../assets/tata.jpeg'
import bajaj from '../../assets/bajaj.png'
import birla from '../../assets/birla.png'
import lic from '../../assets/lic.jpeg'
import star from '../../assets/star.png'
import sbi from '../../assets/sbilife.jpeg'
import niva from '../../assets/niva.jpeg'
import care from '../../assets/care.jpeg'


const insuranceData = {
  "General Insurance": [
    { name: "HDFC ERGO General Insurance", img: hdfc },
    { name: "ICICI Lombard", img: icici },
    { name: "Bajaj Allianz", img: bajaj },
    { name: "Tata AIG", img: tata },
  ],
  "Life Insurance": [
    { name: "LIC of India", img: lic },
    { name: "HDFC Life", img: hdfc },
    { name: "ICICI Prudential Life", img: icici },
    { name: "SBI Life", img: sbi },
  ],
  "Health Insurance": [
    { name: "Star Health Insurance", img: star },
    { name: "Niva Bupa", img: niva },
    { name: "Care Health", img: care },
    { name: "Aditya Birla Health", img: birla },
  ],
};

const PayPremiumOnline = () => {
  const [activeTab, setActiveTab] = useState("General Insurance");
  const cardsRef = useRef([]);

  // Animate cards when tab changes
  useEffect(() => {
    if (cardsRef.current.length) {
      gsap.fromTo(
        cardsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        }
      );
    }
  }, [activeTab]);

  return (
    <div>
      {/* Hero Section */}
      <div className="w-full flex h-[230px]  items-center justify-center">
        <h1 className="text-green-600 text-5xl md:text-6xl font-bold">
          Pay Premium Online
        </h1>
      </div>

      {/* Tab Section */}
      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Tabs */}
        <div className="flex justify-center space-x-6 border-b border-gray-300">
          {Object.keys(insuranceData).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`py-2 px-6 font-semibold text-lg rounded-full transition-all duration-300 ${
                activeTab === category
                  ? "border-b-4 border-green-400 text-gray-600"
                  : "text-gray-600 hover:text-green-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {insuranceData[activeTab].map((company, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="flex flex-col items-center p-6 rounded-2xl shadow-md w-52 bg-white hover:shadow-xl transition"
            >
              <img
                src={company.img}
                alt={company.name}
                className="h-16 object-contain mb-4"
              />
              <h2 className="text-center text-base font-medium text-gray-800">
                {company.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PayPremiumOnline;
