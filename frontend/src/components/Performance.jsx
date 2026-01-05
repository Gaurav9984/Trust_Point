import React from "react";
import { TrendingUp, Shuffle, RefreshCw, BarChart3, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";

const performanceData = [
  {
    name: "SIP Performance",
    icon: <TrendingUp size={32} className="text-green-600" />,
    desc: "Track your SIP investments and growth over time.",
    path: "/tools/financial-calculators/sip-performance",
  },
  {
    name: "STP Performance",
    icon: <Shuffle size={32} className="text-green-600" />,
    desc: "Analyze Systematic Transfer Plan performance.",
    path: "/tools/financial-calculators/stp-performance",
  },
  {
    name: "SWP Performance",
    icon: <RefreshCw size={32} className="text-green-600" />,
    desc: "Evaluate Systematic Withdrawal Plan results.",
    path: "/tools/financial-calculators/swp-performance",
  },
  {
    name: "Fund Performance",
    icon: <BarChart3 size={32} className="text-green-600" />,
    desc: "Monitor and compare mutual fund performance.",
    path: "/tools/financial-calculators/fund-performance",
  },
  {
    name: "Scheme Performance",
    icon: <Layers size={32} className="text-green-600" />,
    desc: "Explore performance of different mutual fund schemes.",
    path: "/tools/financial-calculators/scheme-performance",
  },
];

const Performance = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto mt-3 px-6">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {performanceData.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className="cursor-pointer p-6 border
            border-gray-300 rounded-2xl shadow-md bg-white hover:shadow-lg hover:bg-green-50 transition flex flex-col justify-center items-center text-center"
          >
            {item.icon}
            <h3 className="mt-3 text-lg font-semibold text-gray-700">{item.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Performance;
