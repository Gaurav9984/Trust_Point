import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { name: "Check Your KYC", url: "https://www.cvlkra.com/" },
  { name: "NSE", url: "https://www.nseindia.com/" },
  { name: "BSE", url: "https://www.bseindia.com/" },
  { name: "CAMS", url: "https://www.camsonline.com/" },
  { name: "AMFI", url: "https://www.amfiindia.com/" },
  { name: "SEBI", url: "https://www.sebi.gov.in/" },
  { name: "KARVY", url: "https://www.karvykra.com/" },
  { name: "Download Aadhaar", url: "https://uidai.gov.in/" },
];

const UsefulLinks = () => {
  const cardsRef = useRef([]);

  return (
    <div className="mx-auto min-h-screen">
      {/* Hero Section */}
      <div className="w-full flex h-[200px] items-center justify-center">
        <h1 className="hero-heading mt-13 text-green-400 text-4xl md:text-5xl font-bold">
          Useful Links
        </h1>
      </div>

      {/* Cards */}
      <div className="cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            ref={(el) => (cardsRef.current[idx] = el)}
            className="block p-6 bg-slate-800 rounded-2xl shadow-md border border-slate-700 
                       hover:border-green-400 hover:shadow-green-500/30 transition transform hover:-translate-y-1"
          >
            <h2 className="text-xl font-semibold text-green-400 mb-2">
              {link.name}
            </h2>
            <p className="text-gray-400 truncate">{link.url}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default UsefulLinks;
