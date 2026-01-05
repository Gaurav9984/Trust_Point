import React, { useState } from "react";
import {
  BarChart3,
  Landmark,
  Layers,
  Compass,
  MoreHorizontal,
  Search,
} from "lucide-react";

// Dummy Data (later you can expand this)
const data = {
  Equity: {
    "Flexi Cap Fund": [
      {
        name: "360 ONE FlexiCap Fund - Regular Plan - Growth",
        week: -1.17,
        month: -1.74,
        threeMonth: 0.02,
        sixMonth: 8.76,
        nineMonth: -2.18,
        oneYear: -5.33,
        threeYear: 12.24,
        fiveYear: 0.0,
      },
      {
        name: "Aditya Birla Sun Life Flexi Cap Fund - Growth",
        week: 0.32,
        month: 1.24,
        threeMonth: 2.15,
        sixMonth: 9.21,
        nineMonth: 6.75,
        oneYear: 10.3,
        threeYear: 14.1,
        fiveYear: 12.9,
      },
    ],
    "Large Cap Fund": [],
    "Mid Cap Fund": [],
  },
  "Fund of Funds": {
    "Fund of Funds": [
      {
        name: "Aditya Birla Sun Life Asset Allocator FOF - Regular Plan - Growth",
        week: -0.62,
        month: -0.51,
        threeMonth: 0.67,
        sixMonth: 9.33,
        nineMonth: 5.72,
        oneYear: 3.69,
        threeYear: 15.26,
        fiveYear: 0.0,
      },
    ],
    "Index Funds/ETFs": [],
  },
  Debt: {
    "Gilt Fund": [],
    "Low Duration Fund": [],
  },
  Hybrid: {
    "Balanced Advantage Fund": [],
  },
  "Solution Oriented": {
    "Retirement Fund": [],
  },
  Others: {
    "Sectoral/Thematic Fund": [],
  },
};

// Sidebar scheme list
const fundSchemes = {
  Equity: {
    "Flexi Cap Fund": [],
    "Large Cap Fund": [],
    "Large & Mid Cap Fund": [],
    "Mid Cap Fund": [],
    "ELSS Fund": [],
    "Small Cap Fund": [],
    "Multi Cap Fund": [],
    "Contra Fund": [],
    "Focused Fund": [],
    "Dividend Yield Fund": [],
  },
  "Fund of Funds": {
    "Fund of Funds": [],
    "Index Funds/ETFs": [],
  },
  Debt: {
    "Gilt Fund": [],
    "Low Duration Fund": [],
    "Liquid Fund": [],
    "Short Duration Fund": [],
    "Dynamic Bond Fund": [],
    "Money Market Fund": [],
    "Floater Fund": [],
    "Medium Duration Fund": [],
    "Corporate Bond Fund": [],
    "Banking and PSU Fund": [],
    "Ultra Short Duration Fund": [],
    "FMP": [],
    "Credit Risk Fund": [],
    "Medium to Long Duration Fund": [],
    "Long Duration Fund": [],
    "Overnight Fund": [],
    "Income Fund": [],
    "MIP": [],
    "Index Funds/ETFs": [],
  },
  Hybrid: {
    "Balanced Advantage Fund": [],
    "Aggressive Hybrid Fund": [],
  },
  "Solution Oriented": {
    "Retirement Fund": [],
    "Children’s Gift Fund": [],
  },
  Others: {
    "Sectoral/Thematic Fund": [],
    "Banking and Financial Services Fund": [],
  },
};

const categories = [
  { key: "Equity", icon: <BarChart3 className="text-green-500 w-10 h-10" /> },
  { key: "Debt", icon: <Landmark className="text-green-500 w-10 h-10" /> },
  { key: "Hybrid", icon: <Layers className="text-green-500 w-10 h-10" /> },
  {
    key: "Solution Oriented",
    icon: <Compass className="text-green-500 w-10 h-10" />,
  },
  { key: "Others", icon: <MoreHorizontal className="text-green-500 w-10 h-10" /> },
];

const FundPerformance = () => {
  const [activeCategory, setActiveCategory] = useState("Equity");
  const [activeScheme, setActiveScheme] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Get schemes for active category
  const schemeList = Object.keys(fundSchemes[activeCategory] || {});
  // Apply search filter
  const filteredSchemes = schemeList.filter((scheme) =>
    scheme.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get fund data for the selected scheme
  const fundData = activeScheme
    ? data[activeCategory]?.[activeScheme] || []
    : [];

  return (
    <div>
      {/* Header */}
      <div className="w-full flex h-[240px] bg-[#F9F0D3] items-center justify-center">
        <h1 className="text-gray-600 text-5xl md:text-6xl font-bold">
          Fund Performance
        </h1>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto py-10 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => {
              setActiveCategory(cat.key);
              setActiveScheme(null);
              setSearchTerm("");
            }}
            className={`flex flex-col items-cente border border-gray-300 justify-center p-6 rounded-2xl shadow-lg bg-white hover:shadow-xl transition ${
              activeCategory === cat.key ? "border-2 border-green-300" : ""
            }`}
          >
            {cat.icon}
            <p className="mt-3 text-lg font-semibold text-gray-700">{cat.key}</p>
          </button>
        ))}
      </div>

      {/* Main Box */}
      <div className="max-w-6xl mx-auto flex rounded-2xl md:flex-row flex-col shadow-lg overflow-hidden bg-white">
        {/* Sidebar */}
        <div className="w-72 border-r bg-gray-50 p-4 flex flex-col">
          <h3 className="text-lg font-bold text-green-700 mb-4">Search Scheme</h3>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          {/* Scheme List */}
          <ul className="space-y-2 overflow-y-auto flex-1">
            {filteredSchemes.length > 0 ? (
              filteredSchemes.map((scheme) => (
                <li key={scheme}>
                  <button
                    onClick={() => setActiveScheme(scheme)}
                    className={`w-full text-left px-3 py-2 border border-gray-200 rounded-md transition ${
                      activeScheme === scheme
                        ? "bg-green-400 text-white font-medium"
                        : "hover:bg-green-100 text-gray-700"
                    }`}
                  >
                    {scheme}
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-500 px-3">No schemes found</p>
            )}
          </ul>
        </div>

        {/* Data Table */}
        <div className="flex-1 p-6 overflow-x-auto">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            {activeCategory} {activeScheme ? `- ${activeScheme}` : ""}
          </h2>

          {fundData.length > 0 ? (
            <table className="w-full border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-green-100 text-green-800">
                  <th className="p-3 text-left">Fund Name</th>
                  <th className="p-3">1 Week</th>
                  <th className="p-3">1 Month</th>
                  <th className="p-3">3 Month</th>
                  <th className="p-3">6 Month</th>
                  <th className="p-3">9 Month</th>
                  <th className="p-3">1 Year</th>
                  <th className="p-3">3 Year</th>
                  <th className="p-3">5 Year</th>
                </tr>
              </thead>
              <tbody>
                {fundData.map((fund, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-left font-medium">{fund.name}</td>
                    <td className="p-3">{fund.week}</td>
                    <td className="p-3">{fund.month}</td>
                    <td className="p-3">{fund.threeMonth}</td>
                    <td className="p-3">{fund.sixMonth}</td>
                    <td className="p-3">{fund.nineMonth}</td>
                    <td className="p-3">{fund.oneYear}</td>
                    <td className="p-3">{fund.threeYear}</td>
                    <td className="p-3">{fund.fiveYear}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">
              {activeScheme
                ? `No data available for ${activeScheme}.`
                : "Please select a scheme."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FundPerformance;
