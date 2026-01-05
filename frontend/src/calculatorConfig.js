// calculatorConfig.js
import {
  Wallet, Home, Car, GraduationCap, Shield, TrendingUp, Clock, Heart
} from "lucide-react";

export const calculators = {
  "sip": {
    name: "SIP Calculator",
    icon: <Wallet className="text-green-600" size={20} />,
    description: "Calculate your systematic investment plan returns",
    inputs: [
      { key: "monthlyInvestment", label: "Monthly Investment (₹)", min: 500, max: 1000000, step: 500, default: 10000 },
      { key: "years", label: "Investment Duration (Years)", min: 1, max: 40, step: 1, default: 10 },
      { key: "rateOfReturn", label: "Expected Return Rate (%)", min: 1, max: 30, step: 0.1, default: 12 }
    ],
    calculations: (v) => {
      const monthlyRate = v.rateOfReturn / 100 / 12;
      const months = v.years * 12;
      const futureValue = v.monthlyInvestment * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
      const invested = v.monthlyInvestment * months;
      return { invested, returns: futureValue - invested, futureValue };
    },
    results: (v, c) => [
      { label: "Total Investment", value: c.invested, format: "currency" },
      { label: "Total Returns", value: c.returns, format: "currency" },
      { label: "Future Value", value: c.futureValue, format: "currency" }
    ],
    pieData: (v, c) => ({
      labels: ["Invested", "Returns"],
      datasets: [{ data: [c.invested, c.returns], backgroundColor: ["#3b82f6", "#22c55e"] }]
    }),
    lineData: (v) => {
      const labels = Array.from({ length: v.years }, (_, i) => `Year ${i + 1}`);
      const invested = [];
      const projected = [];
      const monthlyRate = v.rateOfReturn / 100 / 12;

      for (let i = 1; i <= v.years; i++) {
        const months = i * 12;
        invested.push(v.monthlyInvestment * months);
        projected.push(v.monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate));
      }
      return { labels, datasets: [
        { label: "Invested", data: invested, borderColor: "#3b82f6" },
        { label: "Projected Value", data: projected, borderColor: "#22c55e" }
      ]};
    }
  },

  "lumpsum": {
    name: "Lumpsum Calculator",
    icon: <TrendingUp className="text-green-600" size={20} />,
    description: "Calculate returns on one-time investment",
    inputs: [
      { key: "investment", label: "Investment Amount (₹)", min: 1000, max: 10000000, step: 1000, default: 500000 },
      { key: "years", label: "Investment Duration (Years)", min: 1, max: 40, step: 1, default: 10 },
      { key: "rateOfReturn", label: "Expected Return Rate (%)", min: 1, max: 30, step: 0.1, default: 12 }
    ],
    calculations: (v) => {
      const futureValue = v.investment * Math.pow(1 + v.rateOfReturn / 100, v.years);
      return { invested: v.investment, returns: futureValue - v.investment, futureValue };
    },
    results: (v, c) => [
      { label: "Invested Amount", value: c.invested, format: "currency" },
      { label: "Total Returns", value: c.returns, format: "currency" },
      { label: "Future Value", value: c.futureValue, format: "currency" }
    ],
    pieData: (v, c) => ({
      labels: ["Invested", "Returns"],
      datasets: [{ data: [c.invested, c.returns], backgroundColor: ["#3b82f6", "#f59e0b"] }]
    }),
    lineData: (v, c) => {
      const labels = Array.from({ length: v.years }, (_, i) => `Year ${i + 1}`);
      const values = labels.map((_, i) => v.investment * Math.pow(1 + v.rateOfReturn / 100, i + 1));
      return { labels, datasets: [{ label: "Growth", data: values, borderColor: "#f59e0b" }] };
    }
  },

  // 🏠 House Planning
  "house": {
    name: "House Planning",
    icon: <Home className="text-green-600" size={20} />,
    description: "Plan your dream home purchase",
    inputs: [
      { key: "currentCost", label: "Current House Cost (₹)", min: 500000, max: 100000000, step: 100000, default: 5000000 },
      { key: "years", label: "Years to Goal", min: 1, max: 40, step: 1, default: 10 },
      { key: "inflation", label: "Expected Inflation Rate (%)", min: 1, max: 15, step: 0.1, default: 6 }
    ],
    calculations: (v) => {
      const futureCost = v.currentCost * Math.pow(1 + v.inflation / 100, v.years);
      return { current: v.currentCost, futureCost, extra: futureCost - v.currentCost };
    },
    results: (v, c) => [
      { label: "Current Cost", value: c.current, format: "currency" },
      { label: "Future Cost", value: c.futureCost, format: "currency" },
      { label: "Extra Needed", value: c.extra, format: "currency" }
    ],
    pieData: (v, c) => ({
      labels: ["Current Cost", "Extra (Inflation)"],
      datasets: [{ data: [c.current, c.extra], backgroundColor: ["#3b82f6", "#ef4444"] }]
    })
  },

  // 🎓 Education Planning
  "education": {
    name: "Education Planning",
    icon: <GraduationCap className="text-green-600" size={20} />,
    description: "Plan for child’s education expenses",
    inputs: [
      { key: "currentCost", label: "Current Education Cost (₹)", min: 100000, max: 5000000, step: 10000, default: 1000000 },
      { key: "years", label: "Years to Goal", min: 1, max: 30, step: 1, default: 15 },
      { key: "inflation", label: "Expected Inflation Rate (%)", min: 1, max: 15, step: 0.1, default: 6 }
    ],
    calculations: (v) => {
      const futureCost = v.currentCost * Math.pow(1 + v.inflation / 100, v.years);
      return { current: v.currentCost, futureCost, extra: futureCost - v.currentCost };
    },
    results: (v, c) => [
      { label: "Current Cost", value: c.current, format: "currency" },
      { label: "Future Cost", value: c.futureCost, format: "currency" },
      { label: "Extra Needed", value: c.extra, format: "currency" }
    ],
    pieData: (v, c) => ({
      labels: ["Current Cost", "Extra (Inflation)"],
      datasets: [{ data: [c.current, c.extra], backgroundColor: ["#6366f1", "#f97316"] }]
    })
  },

  // 🚗 Car Planning
  "car": {
    name: "Car Planning",
    icon: <Car className="text-green-600" size={20} />,
    description: "Plan your dream car purchase",
    inputs: [
      { key: "currentCost", label: "Current Car Cost (₹)", min: 100000, max: 5000000, step: 10000, default: 800000 },
      { key: "years", label: "Years to Goal", min: 1, max: 20, step: 1, default: 5 },
      { key: "inflation", label: "Expected Inflation Rate (%)", min: 1, max: 15, step: 0.1, default: 7 }
    ],
    calculations: (v) => {
      const futureCost = v.currentCost * Math.pow(1 + v.inflation / 100, v.years);
      return { current: v.currentCost, futureCost, extra: futureCost - v.currentCost };
    },
    results: (v, c) => [
      { label: "Current Cost", value: c.current, format: "currency" },
      { label: "Future Cost", value: c.futureCost, format: "currency" },
      { label: "Extra Needed", value: c.extra, format: "currency" }
    ],
    pieData: (v, c) => ({
      labels: ["Current Cost", "Extra (Inflation)"],
      datasets: [{ data: [c.current, c.extra], backgroundColor: ["#10b981", "#f87171"] }]
    })
  },

  // 🛡️ Life Insurance
  "insurance": {
    name: "Life Insurance Calculator",
    icon: <Shield className="text-green-600" size={20} />,
    description: "Calculate your life insurance coverage needs",
    inputs: [
      { key: "annualIncome", label: "Annual Income (₹)", min: 100000, max: 5000000, step: 10000, default: 600000 },
      { key: "yearsNeeded", label: "Years Needed", min: 1, max: 40, step: 1, default: 20 }
    ],
    calculations: (v) => {
      const requiredCoverage = v.annualIncome * v.yearsNeeded;
      return { annual: v.annualIncome, coverage: requiredCoverage };
    },
    results: (v, c) => [
      { label: "Annual Income", value: c.annual, format: "currency" },
      { label: "Coverage Needed", value: c.coverage, format: "currency" }
    ],
    pieData: (v, c) => ({
      labels: ["Annual Income × Years"],
      datasets: [{ data: [c.coverage], backgroundColor: ["#a855f7"] }]
    })
  },

  // ⏰ Delay Calculator
  "delay": {
    name: "Delay Calculator",
    icon: <Clock className="text-green-600" size={20} />,
    description: "See the cost of delaying investments",
    inputs: [
      { key: "monthlyInvestment", label: "Monthly Investment (₹)", min: 500, max: 1000000, step: 500, default: 10000 },
      { key: "years", label: "Investment Duration (Years)", min: 1, max: 40, step: 1, default: 20 },
      { key: "delayYears", label: "Delay (Years)", min: 1, max: 10, step: 1, default: 5 },
      { key: "rateOfReturn", label: "Expected Return Rate (%)", min: 1, max: 30, step: 0.1, default: 12 }
    ],
    calculations: (v) => {
      const monthlyRate = v.rateOfReturn / 100 / 12;
      const totalMonths = v.years * 12;
      const fvNoDelay = v.monthlyInvestment * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
      const fvDelay = v.monthlyInvestment * (Math.pow(1 + monthlyRate, (v.years - v.delayYears) * 12) - 1) / monthlyRate;
      return { fvNoDelay, fvDelay, loss: fvNoDelay - fvDelay };
    },
    results: (v, c) => [
      { label: "Future Value (No Delay)", value: c.fvNoDelay, format: "currency" },
      { label: "Future Value (With Delay)", value: c.fvDelay, format: "currency" },
      { label: "Loss Due to Delay", value: c.loss, format: "currency" }
    ],
    pieData: (v, c) => ({
      labels: ["No Delay", "With Delay"],
      datasets: [{ data: [c.fvNoDelay, c.fvDelay], backgroundColor: ["#22c55e", "#f43f5e"] }]
    })
  },

  // ❤️ Marriage Planning
  "marriage": {
    name: "Marriage Planning",
    icon: <Heart className="text-green-600" size={20} />,
    description: "Plan for marriage expenses",
    inputs: [
      { key: "currentCost", label: "Current Marriage Cost (₹)", min: 100000, max: 5000000, step: 10000, default: 1500000 },
      { key: "years", label: "Years to Goal", min: 1, max: 20, step: 1, default: 5 },
      { key: "inflation", label: "Expected Inflation Rate (%)", min: 1, max: 15, step: 0.1, default: 6 }
    ],
    calculations: (v) => {
      const futureCost = v.currentCost * Math.pow(1 + v.inflation / 100, v.years);
      return { current: v.currentCost, futureCost, extra: futureCost - v.currentCost };
    },
    results: (v, c) => [
      { label: "Current Cost", value: c.current, format: "currency" },
      { label: "Future Cost", value: c.futureCost, format: "currency" },
      { label: "Extra Needed", value: c.extra, format: "currency" }
    ],
    pieData: (v, c) => ({
      labels: ["Current Cost", "Extra (Inflation)"],
      datasets: [{ data: [c.current, c.extra], backgroundColor: ["#ec4899", "#facc15"] }]
    })
  }
};
