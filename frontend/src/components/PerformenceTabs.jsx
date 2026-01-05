import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PerformanceForm from '../components/PerformenceForm'
import { ArrowLeft } from "lucide-react";

const PerformanceTabs = ({ defaultTab = "SIP" }) => {
  const tabs = ["SIP", "STP", "SWP", "Scheme"];
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  const navigate = useNavigate();

  return (
    <div className="w-full mx-auto mt-20 p-12">
      {/* Back Button */}
      <button
        onClick={() => navigate("/tools/financial-calculators")}
        className="flex items-center gap-2 mb-6 px-3 text-sm py-2 bg-gray-800 text-white rounded-full transition"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Tab Headers */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 tex-sm rounded-full font-medium transition ${
              activeTab === tab
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-800  text-white"
            }`}
          >
            {tab} Performance
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        <PerformanceForm type={activeTab} />
      </div>
    </div>
  );
};

export default PerformanceTabs;
