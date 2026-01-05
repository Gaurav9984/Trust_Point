
import React from "react";
import ServiceLayout from "../../components/ServiceLayout";

const FixedDeposit = () => {
  const types = [
    { name: "ELSS (Equity Linked Savings Scheme)", desc: "Get tax benefits under Section 80C with a 3-year lock-in period." },
    { name: "NPS (National Pension Scheme)", desc: "Save for retirement while enjoying additional tax deductions." },
    { name: "Tax Saving FDs", desc: "Fixed deposits with tax-saving benefits and assured returns." },
    { name: "PPF (Public Provident Fund)", desc: "Long-term tax saving option with government backing." },
    { name: "Insurance Premiums", desc: "Life and health insurance premiums qualify for tax deductions." }
  ];

  const benefits = [
    { name: "Maximized Savings", desc: "Optimize your tax outgo with effective planning." },
    { name: "Legal Compliance", desc: "Ensure your investments are compliant with Indian tax laws." },
    { name: "Wealth Creation", desc: "Invest in tax-saving instruments that also generate returns." },
    { name: "Retirement Security", desc: "Plan early for a financially secure retirement." },
    { name: "Expert Guidance", desc: "Tailored strategies to match your income, goals, and risk appetite." }
  ];

  return (
    <>
     {/* Fixed Deposit Plans */}
      <div className="max-w-5xl mx-auto mt-10 mb-8 px-4">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Fixed Deposit Plans</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl shadow p-5 flex flex-col items-center border border-green-200">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 mb-2">
              <span className="text-green-600 font-bold text-lg">B</span>
            </div>
            <h4 className="font-semibold text-lg text-gray-700 mb-1">Basic</h4>
            <p className="text-gray-500 text-sm mb-1">3 Months</p>
            <span className="text-green-600 font-bold">Up To 8% p.a.</span>
          </div>
          <div className="bg-white rounded-2xl shadow p-5 flex flex-col items-center border border-green-200">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 mb-2">
              <span className="text-green-600 font-bold text-lg">A</span>
            </div>
            <h4 className="font-semibold text-lg text-gray-700 mb-1">Advance</h4>
            <p className="text-gray-500 text-sm mb-1">6 Months</p>
            <span className="text-green-600 font-bold">Up To 15% p.a.</span>
          </div>
          <div className="bg-white rounded-2xl shadow p-5 flex flex-col items-center border border-green-200">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 mb-2">
              <span className="text-green-600 font-bold text-lg">1Y</span>
            </div>
            <h4 className="font-semibold text-lg text-gray-700 mb-1">1 Year</h4>
            <p className="text-gray-500 text-sm mb-1">12 Months</p>
            <span className="text-green-600 font-bold">Up To 38% p.a.</span>
          </div>
          <div className="bg-white rounded-2xl shadow p-5 flex flex-col items-center border border-green-200">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 mb-2">
              <span className="text-green-600 font-bold text-lg">3Y</span>
            </div>
            <h4 className="font-semibold text-lg text-gray-700 mb-1">3 Year</h4>
            <p className="text-gray-500 text-sm mb-1">36 Months</p>
            <span className="text-green-600 font-bold">Up To 38% p.a.</span>
          </div>
        </div>
      </div>
     
      <ServiceLayout
        title="Fixed Deposit"
        subtitle="Smart Planning. Big Savings."
        description="Effective fund planning is not just about saving fund, it’s about aligning your financial decisions with your long-term goals. 
        At Trust Point Wealth Partners, we help you choose the best Fund instruments that maximize savings and ensure compliance."
        types={types}

          
     



        benefits={benefits}
        ctaText="Save more with smart Fixed Deposit planning strategies."
        ctaAction={() => alert('Explore Fixed Deposit Options')}
      />
    </>
  );
};

export default FixedDeposit;
