import React from "react";
import ServiceLayout from "../../components/ServiceLayout";

const RetirementPlanning = () => {
  const types = [
    { name: "Pension Plans", desc: "Ensure steady income post-retirement through structured pension plans." },
    { name: "NPS (National Pension Scheme)", desc: "Government-backed retirement plan with additional tax benefits." },
    { name: "Mutual Funds for Retirement", desc: "Equity & hybrid mutual funds to build long-term wealth." },
    { name: "Annuity Plans", desc: "Secure guaranteed income streams for life." }
  ];

  const benefits = [
    { name: "Financial Security", desc: "Live your retirement life without financial stress." },
    { name: "Inflation Protection", desc: "Invest in assets that grow faster than inflation." },
    { name: "Goal-Oriented", desc: "Custom plans for travel, healthcare, and lifestyle needs." },
    { name: "Tax Efficient", desc: "Leverage tax-saving retirement instruments for maximum benefit." },
    { name: "Expert Advice", desc: "Plan early with our advisors for a worry-free future." }
  ];

  return (
    <ServiceLayout
      title="Retirement Planning"
      subtitle="Plan Today. Relax Tomorrow."
      description="Retirement is not the end of earning, it’s the beginning of enjoying life. 
      At Advit Capital Advisor Private Limited, we create retirement plans that ensure financial independence and peace of mind."
      types={types}
      benefits={benefits}
      ctaText="Secure your golden years with smart retirement planning."
      ctaAction={() => alert('Explore Retirement Planning')}
    />
  );
};

export default RetirementPlanning;
