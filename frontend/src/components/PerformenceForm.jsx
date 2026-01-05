import React, { useState, useEffect } from "react";
import GraphTableResult from "./GraphTableResult";

async function fetchAllSchemes() {
  const res = await fetch("https://api.mfapi.in/mf");
  return res.json();
}

// Static fallback AMCs
const fundHouse = [
  "Aditya Birla Sun Life Mutual Fund",
  "Axis Mutual Fund",
  "Baroda BNP Paribas Mutual Fund",
  "BNP Paribas Mutual Fund",
  "Canara Robeco Mutual Fund",
  "DSP Mutual Fund",
  "Edelweiss Mutual Fund",
  "Franklin Templeton Mutual Fund",
  "HDFC Mutual Fund",
  "ICICI Prudential Mutual Fund",
  "IDFC Mutual Fund",
  "IIFL Mutual Fund",
  "Invesco Mutual Fund",
  "JM Financial Mutual Fund",
  "Kotak Mutual Fund",
  "L&T Mutual Fund",
];

const PerformanceForm = ({ type }) => {
  const [activeTab, setActiveTab] = useState("Fund");
  const [schemeList, setSchemeList] = useState([]);
  const [fundHouses, setFundHouses] = useState(fundHouse); // start with static list
  const [errors, setErrors] = useState({});
  const [showResult, setShowResult] = useState(false);

  // Search states
  const [amcSearch, setAmcSearch] = useState("");
  const [fundHouseSearch, setFundHouseSearch] = useState("");

  const today = new Date();

  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }
  function addYears(date, years) {
    const d = new Date(date);
    d.setFullYear(d.getFullYear() + years);
    return d;
  }
  function addMonths(date, months) {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
  }

  const initialFormData = {
    fundHouse: "",
    scheme: "",
    sipAmount: 5000,
    sipStartDate: formatDate(addMonths(today, 1)),
    sipEndDate: formatDate(addYears(today, 3)),
    valuationDate: formatDate(today),
    sourceScheme: "",
    targetScheme: "",
    transferAmount: 2000,
    frequency: "Monthly",
    startDate: formatDate(addMonths(today, 1)),
    endDate: formatDate(addYears(today, 2)),
    initialAmount: 100000,
    withdrawalAmount: 5000,
    investmentDate: formatDate(today),
    swpStartDate: formatDate(addMonths(today, 6)),
    swpEndDate: formatDate(addYears(today, 2)),
    amc: "HDFC Mutual Fund", // default AMC
    schemeAmount: 10000,
    schemeStartDate: formatDate(addYears(today, -3)),
    schemeEndDate: formatDate(today),
    compareFund: "SENSEX",
    navRange: "1Y",
    assetCategories: [],
    selectedFundHouses: [], // (kept for future multi-select needs)
  };

  const [formData, setFormData] = useState(initialFormData);

  // Fetch & merge AMCs safely
  useEffect(() => {
    let isMounted = true;

    fetchAllSchemes()
      .then((data) => {
        if (!isMounted) return;

        setSchemeList(Array.isArray(data) ? data.slice(0, 200) : []);

        // Build AMC list from API, filter empties/undefined
        const apiHouses = Array.isArray(data)
          ? [...new Set(data.map((s) => s?.fundHouse).filter(Boolean))]
          : [];

        // Merge static + API, dedupe & sort
        const merged = [...new Set([...fundHouse, ...apiHouses])].sort();

        setFundHouses(merged);

        // Ensure current selected AMC exists; otherwise set a safe default
        setFormData((prev) => {
          const current = prev.amc;
          const safeAMC = merged.includes(current)
            ? current
            : merged[0] || "";
          return { ...prev, amc: safeAMC };
        });

        // Ensure fundHouse default too (if you use it elsewhere)
        setFormData((prev) => {
          const currentFundHouse = prev.fundHouse;
          const safeFundHouse = merged.includes(currentFundHouse)
            ? currentFundHouse
            : merged[0] || "";
          return { ...prev, fundHouse: safeFundHouse };
        });
      })
      .catch(() => {
        // If API fails, keep static list and make sure defaults are valid
        setFormData((prev) => {
          const safeAMC = fundHouse.includes(prev.amc)
            ? prev.amc
            : fundHouse[0] || "";
          const safeFundHouse = fundHouse.includes(prev.fundHouse)
            ? prev.fundHouse
            : fundHouse[0] || "";
          return { ...prev, amc: safeAMC, fundHouse: safeFundHouse };
        });
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Input configs
  const inputConfigs = {
    SIP: [
      { key: "amc", label: "AMC", type: "select", options: fundHouses },
      { key: "scheme", label: "Scheme", type: "selectScheme" },
      { key: "sipAmount", label: "SIP Amount", type: "number" },
      { key: "sipStartDate", label: "Start Date", type: "date" },
      { key: "sipEndDate", label: "End Date", type: "date" },
      { key: "valuationDate", label: "Valuation Date", type: "date" },
    ],
    STP: [
      { key: "sourceScheme", label: "Source Scheme", type: "selectScheme" },
      { key: "targetScheme", label: "Target Scheme", type: "selectScheme" },
      { key: "transferAmount", label: "Transfer Amount", type: "number" },
      { key: "frequency", label: "Frequency", type: "select", options: ["Monthly", "Quarterly"] },
      { key: "startDate", label: "Start Date", type: "date" },
      { key: "endDate", label: "End Date", type: "date" },
    ],
    SWP: [
      { key: "amc", label: "Select AMC", type: "select", options: fundHouses },
      { key: "scheme", label: "Scheme", type: "selectScheme" },
      { key: "initialAmount", label: "Initial Amount", type: "number" },
      { key: "withdrawalAmount", label: "Withdrawal Amount", type: "number" },
      { key: "investmentDate", label: "Investment Date", type: "date" },
      { key: "swpStartDate", label: "SWP Start Date", type: "date" },
      { key: "swpEndDate", label: "SWP End Date", type: "date" },
    ],
    Scheme: [
      { key: "amc", label: "Select AMC", type: "select", options: fundHouses },
      { key: "scheme", label: "Scheme", type: "selectScheme" },
      { key: "schemeAmount", label: "Scheme Amount (Monthly)", type: "number", default: 10000 },
      { key: "schemeStartDate", label: "Scheme Start Date", type: "date" },
      { key: "schemeEndDate", label: "Scheme End Date", type: "date" },
      { key: "compareFund", label: "Compare Fund", type: "select", options: ["SENSEX", "NIFTY 50", "BANK NIFTY"] },
      { key: "valuationDate", label: "Valuation Date", type: "date" },
    ],
  };

  const inputs = inputConfigs[type] || [];

  // Validate only visible inputs for current type
  const validate = () => {
    const newErrors = {};
    inputs.forEach((inp) => {
      if (!formData[inp.key]) {
        newErrors[inp.key] = `${inp.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  };

  // Asset categories
  const assetOptions = {
    Equity: [
      "Equity - Flexi Cap Fund",
      "Equity - Sectoral/Thematic Fund",
      "Equity - Focused Fund",
      "Equity - Large Cap Fund",
      "Equity - Mid Cap Fund",
      "Equity - Small Cap Fund",
      "Equity - ELSS",
      "Equity - Value Fund",
      "Equity - Multi Cap Fund",
      "Equity - Dividend Yield Fund",
    ],
    Debt: [
      "Debt - Corporate Bond Fund",
      "Debt - Dynamic Bond Fund",
      "Debt - Liquid Fund",
      "Debt - Money Market Fund",
      "Debt - Ultra Short Duration Fund",
      "Debt - Low Duration Fund",
      "Debt - Short Duration Fund",
      "Debt - Medium Duration Fund",
      "Debt - Long Duration Fund",
      "Debt - Gilt Fund",
    ],
    Hybrid: [
      "Hybrid - Balanced Hybrid Fund",
      "Hybrid - Arbitrage Fund",
      "Hybrid - Aggressive Hybrid Fund",
      "Hybrid - Conservative Hybrid Fund",
      "Hybrid - Multi Asset Allocation",
      "Hybrid - Dynamic Asset Allocation",
      "Hybrid - Equity Savings",
    ],
    Others: [
      "Other - ETF",
      "Other - Index Funds or ETFs",
      "Other - Gold Fund",
      "Other - International Fund",
      "Other - Fund of Funds",
      "Other - Solution Oriented Fund",
      "Other - Retirement Fund",
    ],
  };

  const toggleAsset = (option) => {
    setFormData((prev) => {
      const selected = new Set(prev.assetCategories);
      if (selected.has(option)) selected.delete(option);
      else selected.add(option);
      return { ...prev, assetCategories: [...selected] };
    });
  };

  // (kept for future multi-select Fund House usage)
  const toggleFundHouse = (house) => {
    setFormData((prev) => {
      const selected = new Set(prev.selectedFundHouses || []);
      if (selected.has(house)) selected.delete(house);
      else selected.add(house);
      return { ...prev, selectedFundHouses: [...selected].map((h) => h.toLowerCase()) };
    });
  };

  // Filtered lists
  const filteredAMCs = fundHouses.filter((house) =>
    (house || "").toLowerCase().includes(amcSearch.toLowerCase())
  );

  const filteredFundHouses = fundHouses.filter((house) =>
    (house || "").toLowerCase().includes(fundHouseSearch.toLowerCase())
  );

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-8 w-full mx-auto">
      {/* Toggle Buttons */}
      <div className="flex justify-start gap-4 mb-6">
        <button
          onClick={() => setActiveTab("Fund")}
          className={`px-4 text-sm py-2 rounded-full font-semibold ${
            activeTab === "Fund" ? "bg-green-500 text-white" : "bg-gray-800 text-white"
          }`}
        >
          Fund House
        </button>
        <button
          onClick={() => setActiveTab("Asset")}
          className={`px-4 text-sm py-2 rounded-full font-semibold ${
            activeTab === "Asset" ? "bg-green-500 text-white" : "bg-gray-500 text-white"
          }`}
        >
          Asset Category
        </button>
      </div>

      {/* Fund House Tab */}
      {activeTab === "Fund" && (
        <>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">{type} Performance</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {inputs.map((inp) => (
              <div key={inp.key}>
                <label className="block mb-1 font-semibold text-gray-700">{inp.label}</label>

                {/* Custom AMC picker with search + initial 10 */}
                {inp.type === "select" && inp.key === "amc" ? (
                  <div className="min-w-[250px] border border-gray-200 rounded-lg p-3 text-sm">
                    <h4 className="font-semibold mb-2">Select AMC</h4>

                    <input
                      type="text"
                      placeholder="Search AMC..."
                      value={amcSearch}
                      onChange={(e) => setAmcSearch(e.target.value)}
                      className="w-full mb-3 p-2 border border-gray-300 rounded-md text-sm"
                    />

                    <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                      {(amcSearch.trim() === "" ? fundHouses.slice(0, 10) : filteredAMCs).map(
                        (house, idx) => (
                          <label
                            key={`${house}-${idx}`}
                            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition ${
                              formData.amc === house
                                ? "bg-green-100 border border-green-300"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            <input
                              type="radio"
                              name="amc"
                              value={house}
                              checked={formData.amc === house}
                              onChange={() => setFormData({ ...formData, amc: house })}
                              className="text-green-600 border-gray-300"
                            />
                            <span>{house}</span>
                          </label>
                        )
                      )}

                      {amcSearch.trim() !== "" && filteredAMCs.length === 0 && (
                        <p className="text-gray-500 text-sm">No AMC found</p>
                      )}
                    </div>
                  </div>
                ) : inp.type === "select" ? (
                  <select
                    value={formData[inp.key] || ""}
                    onChange={(e) => setFormData({ ...formData, [inp.key]: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3"
                  >
                    <option value="">Select {inp.label}</option>
                    {(inp.options || []).map((o, idx) => (
                      <option key={`${o}-${idx}`} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : inp.type === "selectScheme" ? (
                  <select
                    value={formData[inp.key] || ""}
                    onChange={(e) => setFormData({ ...formData, [inp.key]: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3"
                  >
                    <option value="">Choose Scheme</option>
                    {(schemeList || []).map((s, i) => (
                      <option key={`${s.schemeCode}-${i}`} value={s.schemeCode}>
                        {s.schemeName}
                      </option>
                    ))}
                  </select>
                ) : inp.type === "number" ? (
                  <input
                    type="number"
                    value={formData[inp.key] || ""}
                    onChange={(e) => setFormData({ ...formData, [inp.key]: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3"
                  />
                ) : inp.type === "date" ? (
                  <input
                    type="date"
                    value={formData[inp.key] || ""}
                    onChange={(e) => setFormData({ ...formData, [inp.key]: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3"
                  />
                ) : null}

                {errors[inp.key] && <p className="text-red-500 text-sm">{errors[inp.key]}</p>}
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 bg-green-600 text-white py-2 px-4 rounded-full font-semibold hover:bg-green-700 transition shadow-md"
          >
            Show
          </button>

          {showResult && <GraphTableResult type={type} data={formData} />}
        </>
      )}

      {/* Asset Category Tab */}
      {activeTab === "Asset" && (
        <div className="asset-category-container">
          <h2 className="text-2xl font-bold mb-6 text-gray-600 text-center">{type} Performance</h2>

          <div className="mt-6 border border-gray-300 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Select Asset Categories</h3>
            <div className="flex overflow-x-auto gap-4 pb-2 w-full">
              {Object.entries(assetOptions).map(([category, options]) => (
                <div key={category} className="min-w-[250px] border border-gray-200 rounded-lg p-3 text-sm">
                  <h4 className="font-semibold mb-2">{category}</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                    {options.map((option, idx) => (
                      <label key={`${option}-${idx}`} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.assetCategories.includes(option)}
                          onChange={() => toggleAsset(option)}
                          className="text-green-600 border-gray-300"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mt-6">
            {inputs.map((inp) => (
              <div key={inp.key}>
                <label className="block mb-1 font-semibold text-gray-700">{inp.label}</label>
                {inp.type === "select" ? (
                  <select
                    value={formData[inp.key] || ""}
                    onChange={(e) => setFormData({ ...formData, [inp.key]: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3"
                  >
                    <option value="">Select {inp.label}</option>
                    {(inp.options || []).map((o, idx) => (
                      <option key={`${o}-${idx}`} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : inp.type === "selectScheme" ? (
                  <select
                    value={formData[inp.key] || ""}
                    onChange={(e) => setFormData({ ...formData, [inp.key]: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3"
                  >
                    <option value="">Choose Scheme</option>
                    {(schemeList || []).map((s, i) => (
                      <option key={`${s.schemeCode}-${i}`} value={s.schemeCode}>
                        {s.schemeName}
                      </option>
                    ))}
                  </select>
                ) : inp.type === "number" ? (
                  <input
                    type="number"
                    value={formData[inp.key] || ""}
                    onChange={(e) => setFormData({ ...formData, [inp.key]: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3"
                  />
                ) : inp.type === "date" ? (
                  <input
                    type="date"
                    value={formData[inp.key] || ""}
                    onChange={(e) => setFormData({ ...formData, [inp.key]: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3"
                  />
                ) : null}
                {errors[inp.key] && <p className="text-red-500 text-sm">{errors[inp.key]}</p>}
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 bg-green-600 text-white py-2 px-4 rounded-full font-semibold hover:bg-green-700 transition shadow-md"
          >
            Show
          </button>

          {showResult && <GraphTableResult type={type} data={formData} />}
        </div>
      )}
    </div>
  );
};

export default PerformanceForm;
