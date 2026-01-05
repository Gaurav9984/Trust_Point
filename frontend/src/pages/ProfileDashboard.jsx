import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const investmentTypes = [
  "SIP",
  "Fixed Deposit",
  "Fund Management",
  "Retirement Planning",
];

function ProfileDashboard() {
  const [form, setForm] = useState({
    investmentType: "",
    amount: "",
    duration: "",
    returnRate: "",
    currency: "INR",
  });
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Back Button */}
      <div className="w-full flex items-center px-4 pt-6 pb-2">
        <button
          onClick={() => navigate('/profile')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition flex items-center"
        >
          <span className="material-icons mr-2" style={{ fontSize: 20 }}>arrow_back</span>
          Back to Profile
        </button>
      </div>
      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 max-w-6xl mx-auto w-full py-10 px-4 gap-8">
        {/* Left Section */}
        <div className="flex-1 bg-white rounded-2xl shadow-md p-8 mb-8 md:mb-0">
          <h2 className="text-2xl font-bold text-blue-700 mb-8">Your Investments</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Investment Type</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50"
                value={form.investmentType}
                onChange={e => setForm(f => ({ ...f, investmentType: e.target.value }))}
              >
                <option value="">Select</option>
                {investmentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Amount</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50"
                placeholder="Enter amount"
                value={form.amount}
                onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Duration (Years)</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50"
                placeholder="Enter duration"
                value={form.duration}
                onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Return Rate (%)</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50"
                placeholder="Enter return rate"
                value={form.returnRate}
                onChange={e => setForm(f => ({ ...f, returnRate: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Currency</label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="currency"
                    value="INR"
                    checked={form.currency === "INR"}
                    onChange={() => setForm(f => ({ ...f, currency: "INR" }))}
                  />
                  INR
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="currency"
                    value="USD"
                    checked={form.currency === "USD"}
                    onChange={() => setForm(f => ({ ...f, currency: "USD" }))}
                  />
                  USD
                </label>
              </div>
            </div>
          </form>
          <div className="flex gap-4 mt-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition">Financial Calculators</button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
              onClick={() => alert('Feature coming soon')}
            >
              Deposit
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
              onClick={() => alert('Feature coming soon')}
            >
              Withdraw
            </button>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-full md:w-96 flex flex-col items-center">
          <div className="bg-white rounded-2xl shadow-md p-8 w-full flex flex-col items-center mb-6">
            <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center mb-4 text-center">
              <span className="text-gray-400 text-lg font-semibold">No Data / Investment Related Image</span>
            </div>
            {form.investmentType || form.amount || form.duration || form.returnRate ? (
              <div className="w-full bg-gray-50 rounded-xl p-4 shadow-inner">
                <h3 className="text-lg font-bold text-gray-700 mb-2">Summary</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>Investment Type: <span className="font-medium">{form.investmentType || '-'}</span></li>
                  <li>Amount: <span className="font-medium">{form.amount || '-'}</span></li>
                  <li>Duration: <span className="font-medium">{form.duration || '-'}</span></li>
                  <li>Return Rate: <span className="font-medium">{form.returnRate || '-'}</span></li>
                  <li>Currency: <span className="font-medium">{form.currency}</span></li>
                </ul>
              </div>
            ) : (
              <div className="w-full bg-gray-50 rounded-xl p-4 shadow-inner text-center text-gray-400">
                Enter investment details to see summary
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full bg-gray-100 text-center py-4 mt-auto border-t text-gray-500 text-sm">
        Footer content
      </footer>
    </div>
  );
}

export default ProfileDashboard;
