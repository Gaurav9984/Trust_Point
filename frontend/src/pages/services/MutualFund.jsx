import React from "react";
import ServiceLayout from '../../components/ServiceLayout';

const MutualFund = () => {
  const types = [
    { name: "Equity Funds", desc: "Invest in stocks for higher growth potential over the long term." },
    { name: "Debt Funds", desc: "Lower risk investment in government and corporate bonds." },
    { name: "Hybrid Funds", desc: "Combine equity and debt for balanced risk and return." },
    { name: "ELSS (Tax Saving Funds)", desc: "Get tax benefits under Section 80C with a 3-year lock-in." },
    { name: "Liquid Funds", desc: "Ideal for parking surplus funds with quick liquidity." }
  ];

  const benefits = [
    { name: "Diversified Portfolio", desc: "Reduce risk through asset diversification across sectors and markets." },
    { name: "Professional Management", desc: "Expert fund managers handle all investment decisions." },
    { name: "Flexible Investment Options", desc: "Start with SIPs or lump sums based on your convenience." },
    { name: "Liquidity", desc: "Easy entry and exit options with most open-ended funds." },
    { name: "Goal-Based Planning", desc: "Tailored solutions for retirement, education, and wealth creation." }
  ];

  return (
    <ServiceLayout
      title="SIP"
      subtitle="Diversified. Managed. Growth."
      description="Mutual Funds are professionally managed investment schemes that pool money from multiple investors 
      to invest in diversified asset classes. At Advit Capital Advisor, we offer a wide range of 
      mutual fund options that align with your financial goals, risk profile, and investment horizon."
      types={types}
      benefits={benefits}
      ctaText="Take control of your financial future with smart mutual fund investments."
      ctaAction={() => alert("Explore Funds Clicked!")}
    />
  );
};

export default MutualFund;
