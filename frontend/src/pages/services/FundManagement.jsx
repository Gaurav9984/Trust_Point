import React from "react";
import ServiceLayout from "../../components/ServiceLayout";

const FundMangement = () => {
  const types = [
    { name: "Individual Health Plans", desc: "Coverage for hospitalization, treatment, and medical expenses." },
    { name: "Family Floater Plans", desc: "One plan to cover the health of the entire family." },
    { name: "Critical Illness Plans", desc: "Lump sum cover against life-threatening illnesses." },
    { name: "Top-Up Plans", desc: "Additional coverage at affordable premiums." }
  ];

  const benefits = [
    { name: "Comprehensive Coverage", desc: "Protect against rising medical costs and emergencies." },
    { name: "Cashless Treatment", desc: "Access a wide network of hospitals with cashless claims." },
    { name: "Tax Benefits", desc: "Get deductions under Section 80D of the Income Tax Act." },
    { name: "Peace of Mind", desc: "Focus on recovery while we take care of finances." },
    { name: "Customizable Plans", desc: "Choose coverage that fits your health needs and budget." }
  ];

  return (
    <ServiceLayout
      title="Fund Management"
      subtitle="Your Fund. Our Priority."
      description="Health insurance is not an expense, it’s an investment in your family’s well-being. 
      At Advit Capital Advisor Fincare Private Limited, we offer a wide range of health plans that protect you from medical emergencies."
      types={types}
      benefits={benefits}
      ctaText="Protect your family with comprehensive Fund Management."
      ctaAction={() => alert('Explore Fund Mangement')}
    />
  );
};

export default FundMangement;
