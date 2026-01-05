import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { fetchSchemeData } from "../pages/services/mfapi";

const GraphTableResult = ({ data }) => {
  const [navHistory, setNavHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("graph");

  const [summary, setSummary] = useState({
    invested: 0,
    currentValue: 0,
    profitLoss: 0,
    absReturn: 0,
    xirr: 0,
    currentNAV: 0,
  });

  useEffect(() => {
    if (data.scheme) {
      fetchSchemeData(data.scheme).then((schemeData) => {
        if (schemeData?.data) {
          let formatted = schemeData.data
            .map((entry) => ({
              date: entry.date,
              nav: parseFloat(entry.nav),
            }))
            .reverse();

          // ✅ filter by user startDate & endDate
          if (data.startDate && data.endDate) {
            formatted = formatted.filter(
              (entry) =>
                new Date(entry.date) >= new Date(data.startDate) &&
                new Date(entry.date) <= new Date(data.endDate)
            );
          }

          let invested = 0;
          let units = 0;
          const sipAmount = data.sipAmount || 10000;

          const sipData = formatted.map((entry, i) => {
            // Every 30th day = SIP installment
            if (i % 30 === 0) {
              invested += sipAmount;
              units += sipAmount / entry.nav;
            }
            const value = units * entry.nav;
            return {
              ...entry,
              sipValue: value,
              invested,
            };
          });

          setNavHistory(sipData);

          if (sipData.length > 0) {
            const last = sipData[sipData.length - 1];
            const profitLoss = last.sipValue - last.invested;
            const absReturn = (profitLoss / last.invested) * 100;

            setSummary({
              invested: last.invested,
              currentValue: last.sipValue,
              profitLoss,
              absReturn,
              xirr: 10.01, // placeholder
              currentNAV: last.nav,
            });
          }
        }
      });
    }
  }, [data.scheme, data.sipAmount, data.startDate, data.endDate]);

  if (!data.scheme) {
    return <p className="text-gray-600">Please select a scheme to view performance.</p>;
  }

  return (
    <div className="mt-10 bg-gray-50 border border-green-200 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-green-700 mb-4">{data.scheme}</h3>
      {/* ✅ SIP Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-6">
        {[
          { label: "Amount Invested", value: `₹${summary.invested.toFixed(2)}`, color: "text-green-700" },
          { label: "Current Value", value: `₹${summary.currentValue.toFixed(2)}`, color: "text-blue-700" },
          { label: "Profit / Loss", value: `₹${summary.profitLoss.toFixed(2)}`, color: "text-purple-700" },
          { label: "Absolute Return (%)", value: `${summary.absReturn.toFixed(2)}%`, color: "text-orange-600" },
          { label: "XIRR (%)", value: `${summary.xirr}%`, color: "text-indigo-600" },
          { label: "Monthly SIP", value: `₹${data.sipAmount}`, color: "text-gray-800" },
          { label: "Current NAV", value: summary.currentNAV.toFixed(3), color: "text-teal-700" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-4 border-gray-200 rounded-xl shadow border flex flex-col justify-between min-h-[90px] text-center"
          >
            <p className="text-gray-500 text-sm">{item.label}</p>
            <p className={`text-lg sm:text-xl font-bold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>


      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          onClick={() => setActiveTab("graph")}
          className={`px-4 py-2 text-sm font-medium ${activeTab === "graph" ? "border-b-2 border-green-600 text-green-700" : "text-gray-500"
            }`}
        >
          Graph
        </button>
        <button
          onClick={() => setActiveTab("table")}
          className={`px-4 py-2 text-sm font-medium ${activeTab === "table" ? "border-b-2 border-green-600 text-green-700" : "text-gray-500"
            }`}
        >
          Table
        </button>
      </div>

      {/* Content */}
      {activeTab === "graph" && (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={navHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="nav" stroke="#16a34a" strokeWidth={2} dot={false} name="NAV" />
              <Line type="monotone" dataKey="sipValue" stroke="#2563eb" strokeWidth={2} dot={false} name="SIP Value" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === "table" && (
        <div className="overflow-y-auto max-h-60 border rounded-lg bg-white shadow-sm">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-green-100 sticky top-0">
              <tr>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">NAV</th>
                <th className="p-2 border">SIP Value</th>
                <th className="p-2 border">Invested</th>
              </tr>
            </thead>
            <tbody>
              {navHistory.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-2 border">{row.date}</td>
                  <td className="p-2 border">{row.nav.toFixed(2)}</td>
                  <td className="p-2 border">{row.sipValue?.toFixed(2)}</td>
                  <td className="p-2 border">{row.invested}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GraphTableResult;
