import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Pie, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from "chart.js";
import {
    Car,
    Wallet,
    Clock,
    Home,
    GraduationCap,
    Shield,
    PiggyBank,
    Heart,
    TrendingUp,
} from "lucide-react";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
);

// Calculator configurations - easily add new calculators here
const calculatorConfigs = {
    "car-planning": {
        name: "Car Planning Calculator",
        icon: <Car className="text-green-600" size={20} />,
        description: "Plan your dream car purchase with smart financial planning",
        inputs: [
            {
                key: "currentCost",
                label: "Current Cost",
                min: 100000,
                max: 10000000,
                step: 10000,
                default: 500000,
                color: "bg-green-500",
                format: "currency"
            },
            {
                key: "years",
                label: "After How Many Years",
                min: 1,
                max: 30,
                step: 1,
                default: 5,
                color: "bg-blue-500",
                format: "years"
            },
            {
                key: "rateOfReturn",
                label: "Expected Rate of Return",
                min: 1,
                max: 20,
                step: 0.5,
                default: 10,
                color: "bg-yellow-500",
                format: "percentage"
            },
            {
                key: "inflationRate",
                label: "Inflation Rate",
                min: 1,
                max: 15,
                step: 0.5,
                default: 6,
                color: "bg-red-500",
                format: "percentage"
            }
        ],
        calculations: (values) => {
            const { currentCost, years, rateOfReturn, inflationRate } = values;
            const futureCost = Math.round(currentCost * Math.pow(1 + inflationRate / 100, years));
            const monthlyRate = rateOfReturn / 100 / 12;
            const totalMonths = years * 12;
            const sipAmount = Math.round((futureCost * monthlyRate) / (Math.pow(1 + monthlyRate, totalMonths) - 1));
            const lumpSum = Math.round(futureCost / Math.pow(1 + rateOfReturn / 100, years));

            return {
                futureCost,
                sipAmount,
                lumpSum,
                totalInvestment: sipAmount * totalMonths,
                returns: futureCost - lumpSum
            };
        },
        results: (values, calculations) => [
            { label: "Current Cost", value: values.currentCost, format: "currency" },
            { label: "Future Cost", value: calculations.futureCost, format: "currency" },
            { label: "Monthly SIP Required", value: calculations.sipAmount, format: "currency" },
            { label: "Lump Sum Required", value: calculations.lumpSum, format: "currency" }
        ]
    },

    "sip-calculator": {
        name: "SIP Calculator",
        icon: <Wallet className="text-green-600" size={20} />,
        description: "Calculate your systematic investment plan returns",
        inputs: [
            {
                key: "monthlyInvestment",
                label: "Monthly Investment",
                min: 500,
                max: 100000,
                step: 500,
                default: 5000,
                color: "bg-green-500",
                format: "currency"
            },
            {
                key: "years",
                label: "Investment Period",
                min: 1,
                max: 40,
                step: 1,
                default: 10,
                color: "bg-blue-500",
                format: "years"
            },
            {
                key: "rateOfReturn",
                label: "Expected Annual Return",
                min: 1,
                max: 25,
                step: 0.5,
                default: 12,
                color: "bg-yellow-500",
                format: "percentage"
            }
        ],
        calculations: (values) => {
            const { monthlyInvestment, years, rateOfReturn } = values;
            const monthlyRate = rateOfReturn / 100 / 12;
            const totalMonths = years * 12;
            const futureValue = Math.round(monthlyInvestment * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
            const totalInvestment = monthlyInvestment * totalMonths;
            const returns = futureValue - totalInvestment;

            return {
                futureValue,
                totalInvestment,
                returns,
                sipAmount: monthlyInvestment
            };
        },
        results: (values, calculations) => [
            { label: "Monthly Investment", value: values.monthlyInvestment, format: "currency" },
            { label: "Total Investment", value: calculations.totalInvestment, format: "currency" },
            { label: "Future Value", value: calculations.futureValue, format: "currency" },
            { label: "Total Returns", value: calculations.returns, format: "currency" }
        ]
    },

    "house-planning": {
        name: "House Planning Calculator",
        icon: <Home className="text-green-600" size={20} />,
        description: "Plan your dream home purchase with smart savings",
        inputs: [
            {
                key: "currentCost",
                label: "Current House Price",
                min: 1000000,
                max: 50000000,
                step: 100000,
                default: 5000000,
                color: "bg-green-500",
                format: "currency"
            },
            {
                key: "years",
                label: "Years to Buy",
                min: 1,
                max: 25,
                step: 1,
                default: 7,
                color: "bg-blue-500",
                format: "years"
            },
            {
                key: "rateOfReturn",
                label: "Investment Return Rate",
                min: 1,
                max: 18,
                step: 0.5,
                default: 12,
                color: "bg-yellow-500",
                format: "percentage"
            },
            {
                key: "inflationRate",
                label: "Property Inflation Rate",
                min: 1,
                max: 12,
                step: 0.5,
                default: 5,
                color: "bg-red-500",
                format: "percentage"
            }
        ],
        calculations: (values) => {
            const { currentCost, years, rateOfReturn, inflationRate } = values;
            const futureCost = Math.round(currentCost * Math.pow(1 + inflationRate / 100, years));
            const monthlyRate = rateOfReturn / 100 / 12;
            const totalMonths = years * 12;
            const sipAmount = Math.round((futureCost * monthlyRate) / (Math.pow(1 + monthlyRate, totalMonths) - 1));
            const lumpSum = Math.round(futureCost / Math.pow(1 + rateOfReturn / 100, years));

            return {
                futureCost,
                sipAmount,
                lumpSum,
                totalInvestment: sipAmount * totalMonths,
                returns: futureCost - lumpSum
            };
        },
        results: (values, calculations) => [
            { label: "Current House Price", value: values.currentCost, format: "currency" },
            { label: "Future House Price", value: calculations.futureCost, format: "currency" },
            { label: "Monthly SIP Required", value: calculations.sipAmount, format: "currency" },
            { label: "Lump Sum Required", value: calculations.lumpSum, format: "currency" }
        ]
    },


    "delay-planning": {
        name: "Delay Planning Calculator",
        icon: <Clock className="text-green-600" size={20} />,
        description: "See the cost of delaying your investments",
        inputs: [
            {
                key: "monthlyInvestment",
                label: "Monthly SIP (₹)",
                min: 500,
                max: 100000,
                step: 500,
                default: 5000,
                color: "bg-green-500",
                format: "currency"
            },
            {
                key: "years",
                label: "Time Period (Years)",
                min: 1,
                max: 40,
                step: 1,
                default: 10,
                color: "bg-blue-500",
                format: "years"
            },
            {
                key: "delayMonths",
                label: "Delay in Starting SIP (Months)",
                min: 0,
                max: 120, // up to 10 years of delay
                step: 1,
                default: 12,
                color: "bg-red-500",
                format: "months"
            },
            {
                key: "rateOfReturn",
                label: "Expected Return (%)",
                min: 1,
                max: 20,
                step: 0.5,
                default: 7,
                color: "bg-yellow-500",
                format: "percentage"
            }
        ],
        calculations: (values) => {
            const { monthlyInvestment, years, delayMonths, rateOfReturn } = values;
            const monthlyRate = rateOfReturn / 100 / 12;
            const totalMonths = years * 12;
            const investedMonths = Math.max(totalMonths - delayMonths, 0);

            // Future Value if started immediately
            const futureValueNoDelay = Math.round(
                monthlyInvestment * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)
            );

            // Future Value if delayed
            const futureValueWithDelay = Math.round(
                monthlyInvestment * ((Math.pow(1 + monthlyRate, investedMonths) - 1) / monthlyRate)
            );

            return {
                futureValueNoDelay,
                futureValueWithDelay,
                loss: futureValueNoDelay - futureValueWithDelay
            };
        },
        results: (values, calculations) => [
            { label: "Future Value (No Delay)", value: calculations.futureValueNoDelay, format: "currency" },
            { label: "Future Value (With Delay)", value: calculations.futureValueWithDelay, format: "currency" },
            { label: "Wealth Lost Due to Delay", value: calculations.loss, format: "currency" }
        ]
    },

    "education-planning": {
        name: "Education Planning Calculator",
        icon: <GraduationCap className="text-green-600" size={20} />,
        description: "Plan for child's education expenses",
        inputs: [
            {
                key: "currentAge",
                label: "Current Age",
                min: 1,
                max: 25,
                step: 1,
                default: 10,
                color: "bg-blue-500",
                format: "years"
            },
            {
                key: "startAge",
                label: "Age at the Start of Education",
                min: 5,
                max: 30,
                step: 1,
                default: 18,
                color: "bg-indigo-500",
                format: "years"
            },
            {
                key: "currentCost",
                label: "Current Education Cost",
                min: 100000,
                max: 5000000,
                step: 10000,
                default: 500000,
                color: "bg-green-500",
                format: "currency"
            },
            {
                key: "rateOfReturn",
                label: "Expected Return (%)",
                min: 1,
                max: 20,
                step: 0.5,
                default: 7,
                color: "bg-yellow-500",
                format: "percentage"
            },
            {
                key: "inflationRate",
                label: "Inflation Rate (%)",
                min: 1,
                max: 15,
                step: 0.5,
                default: 5,
                color: "bg-red-500",
                format: "percentage"
            }
        ],
        calculations: (values) => {
            const { currentAge, startAge, currentCost, rateOfReturn, inflationRate } = values;
            const years = Math.max(startAge - currentAge, 0); // prevent negative years
            const futureCost = Math.round(currentCost * Math.pow(1 + inflationRate / 100, years));
            const monthlyRate = rateOfReturn / 100 / 12;
            const totalMonths = years * 12;

            const sipAmount =
                totalMonths > 0
                    ? Math.round((futureCost * monthlyRate) / (Math.pow(1 + monthlyRate, totalMonths) - 1))
                    : 0;

            const lumpSum = Math.round(futureCost / Math.pow(1 + rateOfReturn / 100, years || 1));

            return { years, futureCost, sipAmount, lumpSum };
        },
        results: (values, calculations) => [
            { label: "Current Age", value: values.currentAge, format: "years" },
            { label: "Age at Start of Education", value: values.startAge, format: "years" },
            { label: "Years Until Education", value: calculations.years, format: "years" },
            { label: "Current Education Cost", value: values.currentCost, format: "currency" },
            { label: "Future Education Cost", value: calculations.futureCost, format: "currency" },
            { label: "Monthly SIP Required", value: calculations.sipAmount, format: "currency" },
            { label: "Lump Sum Required", value: calculations.lumpSum, format: "currency" }
        ]
    },
    "life-insurance": {
        name: "Life Insurance Calculator",
        icon: <Shield className="text-green-600" size={20} />,
        description: "Calculate your life insurance coverage needs",
        inputs: [
            {
                key: "loanAmount",
                label: "Loan Amount (₹)",
                min: 0,
                max: 100000000,
                step: 10000,
                default: 100000,
                color: "bg-green-500",
                format: "currency"
            },
            {
                key: "fdRate",
                label: "Current FD Rate (%)",
                min: 1,
                max: 15,
                step: 0.5,
                default: 5,
                color: "bg-blue-500",
                format: "percentage"
            },
            {
                key: "inflationRate",
                label: "Inflation Rate (%)",
                min: 1,
                max: 15,
                step: 0.5,
                default: 5,
                color: "bg-yellow-500",
                format: "percentage"
            },
            {
                key: "years",
                label: "For How Many Years You Want To Protect Your Household Expenses",
                min: 1,
                max: 40,
                step: 1,
                default: 5,
                color: "bg-purple-500",
                format: "years"
            },
            {
                key: "monthlyExpenses",
                label: "Monthly Expenses (₹)",
                min: 1000,
                max: 1000000,
                step: 1000,
                default: 10000,
                color: "bg-red-500",
                format: "currency"
            }
        ],
        calculations: (values) => {
            const { loanAmount, fdRate, inflationRate, years, monthlyExpenses } = values;

            // Approximate future expenses with inflation adjustment
            let totalExpenses = 0;
            let currentMonthly = monthlyExpenses;
            for (let i = 1; i <= years; i++) {
                currentMonthly *= (1 + inflationRate / 100);
                totalExpenses += currentMonthly * 12;
            }

            // Required insurance = Loan + Present value of future expenses (adjusted with FD rate)
            const discountFactor = Math.pow(1 + fdRate / 100, years);
            const requiredCover = Math.round(loanAmount + (totalExpenses / discountFactor));

            return { requiredCover, totalExpenses };
        },
        results: (values, calculations) => [
            { label: "Loan Amount", value: values.loanAmount, format: "currency" },
            { label: "Monthly Expenses (starting)", value: values.monthlyExpenses, format: "currency" },
            { label: "Inflation Rate", value: values.inflationRate, format: "percentage" },
            { label: "FD Rate", value: values.fdRate, format: "percentage" },
            { label: "Protection Period", value: values.years, format: "years" },
            { label: "Total Future Expenses (inflation adjusted)", value: calculations.totalExpenses, format: "currency" },
            { label: "Required Insurance Cover", value: calculations.requiredCover, format: "currency" }
        ]
    },
    "lumpsum-calculator": {
        name: "Lumpsum Calculator",
        icon: <TrendingUp className="text-green-600" size={20} />,
        description: "Calculate one-time investment returns",
        inputs: [
            {
                key: "investment",
                label: "Total Investment (₹)",
                min: 100,
                max: 10000000,
                step: 100,
                default: 500,  // stays as you requested
                color: "bg-green-500",
                format: "currency"
            },
            {
                key: "years",
                label: "Time Period (Years)",
                min: 1,
                max: 40,
                step: 1,
                default: 1,  // stays as you requested
                color: "bg-blue-500",
                format: "years"
            },
            {
                key: "rateOfReturn",
                label: "Expected Return (%)",
                min: 1,
                max: 20,
                step: 0.5,
                default: 1,  // stays as you requested
                color: "bg-yellow-500",
                format: "percentage"
            }
        ],
        calculations: (values) => {
            const { investment, years, rateOfReturn } = values;

            const futureValue = years > 0
                ? Math.round(investment * Math.pow(1 + rateOfReturn / 100, years))
                : investment;

            const returns = futureValue - investment;

            const cagr = years > 0
                ? ((futureValue / investment) ** (1 / years) - 1) * 100
                : 0;

            return { futureValue, returns, cagr };
        },
        results: (values, calculations) => [
            { label: "Total Investment", value: values.investment, format: "currency" },
            { label: "Future Value", value: calculations.futureValue, format: "currency" },
            { label: "Returns", value: calculations.returns, format: "currency" },
            { label: "CAGR", value: calculations.cagr.toFixed(2), format: "percentage" } // ✅ new
        ]
    }
    ,
    "marriage-planning": {
        name: "Marriage Planning Calculator",
        icon: <Heart className="text-green-600" size={20} />,
        description: "Plan and save for wedding expenses",
        inputs: [
            {
                key: "currentAge",
                label: "Current Age",
                min: 1,
                max: 100,
                step: 1,
                default: 10,
                color: "bg-green-500",
                format: "years"
            },
            {
                key: "marriageAge",
                label: "Age at the Start of Marriage",
                min: 15,
                max: 100,
                step: 1,
                default: 18,
                color: "bg-blue-500",
                format: "years"
            },
            {
                key: "currentCost",
                label: "Current Marriage Expenses",
                min: 100000,
                max: 10000000,
                step: 10000,
                default: 500000,
                color: "bg-purple-500",
                format: "currency"
            },
            {
                key: "rateOfReturn",
                label: "Expected Return (%)",
                min: 1,
                max: 20,
                step: 0.5,
                default: 7,
                color: "bg-yellow-500",
                format: "percentage"
            },
            {
                key: "inflationRate",
                label: "Inflation Rate (%)",
                min: 1,
                max: 15,
                step: 0.5,
                default: 5,
                color: "bg-red-500",
                format: "percentage"
            }
        ],
        calculations: (values) => {
            const { currentAge, marriageAge, currentCost, rateOfReturn, inflationRate } = values;
            const years = marriageAge - currentAge;

            // Future cost after inflation
            const futureCost = Math.round(currentCost * Math.pow(1 + inflationRate / 100, years));

            // SIP calculation
            const monthlyRate = rateOfReturn / 100 / 12;
            const totalMonths = years * 12;
            const sipAmount = Math.round((futureCost * monthlyRate) / (Math.pow(1 + monthlyRate, totalMonths) - 1));

            // Lump Sum required today
            const lumpSum = Math.round(futureCost / Math.pow(1 + rateOfReturn / 100, years));

            return { years, futureCost, sipAmount, lumpSum };
        },
        results: (values, calculations) => [
            { label: "Current Age", value: values.currentAge, format: "years" },
            { label: "Marriage Age", value: values.marriageAge, format: "years" },
            { label: "Years to Wedding", value: calculations.years, format: "years" },
            { label: "Current Marriage Cost", value: values.currentCost, format: "currency" },
            { label: "Future Marriage Cost", value: calculations.futureCost, format: "currency" },
            { label: "Monthly SIP Required", value: calculations.sipAmount, format: "currency" },
            { label: "Lump Sum Required", value: calculations.lumpSum, format: "currency" }
        ]
    }

};



const ModularCalculator = ({ defaultType }) => {
    const location = useLocation();
    const [values, setValues] = useState({});

    // 🔹 Dynamically detect calculator type from URL
    const getCalculatorTypeFromURL = () => {
        const path = location.pathname;
        const match = Object.keys(calculatorConfigs).find(key =>
            path.includes(key)
        );
        return match || defaultType || "car-planning";
    };

    const [selectedType, setSelectedType] = useState(getCalculatorTypeFromURL());
    const currentConfig = calculatorConfigs[selectedType];

    // 🔹 Initialize default values on calculator change
    useEffect(() => {
        if (currentConfig) {
            const defaultValues = {};
            currentConfig.inputs.forEach(input => {
                defaultValues[input.key] = input.default;
            });
            setValues(defaultValues);
        }
    }, [selectedType, currentConfig]);

    // 🔹 Update type on URL change
    useEffect(() => {
        setSelectedType(getCalculatorTypeFromURL());
    }, [location.pathname]);

    // 🔹 Update page title
    useEffect(() => {
        if (currentConfig) {
            document.title = `${currentConfig.name} - Financial Planning Tool`;
        }
    }, [selectedType, currentConfig]);

    if (!currentConfig) {
        return (
            <div className="max-w-4xl mx-auto py-20 px-6 text-center bg-[#F9F0D3]">
                <div className="bg-white rounded-2xl shadow-lg p-12">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Calculator Not Found
                    </h1>
                    <p className="text-gray-600 mb-6">
                        The requested calculator is not available yet.
                    </p>
                </div>
            </div>
        );
    }

    // 🔹 Perform calculations
    const calculations = currentConfig.calculations(values);
    const results = currentConfig.results(values, calculations);

    // 🔹 Format values (IN style: Lakhs, Crores)
    const formatValue = (value, format) => {
        if (value === null || value === undefined) return "";
        const numValue = Number(value);
        if (isNaN(numValue)) return "";

        switch (format) {
            case "currency":
                if (numValue >= 10000000) return `₹${(numValue / 10000000).toFixed(2)} Cr`;
                if (numValue >= 100000) return `₹${(numValue / 100000).toFixed(2)} Lakh`;
                return `₹${numValue.toLocaleString("en-IN")}`;
            case "percentage":
                return `${numValue}%`;
            case "years":
                return `${numValue} year${numValue > 1 ? "s" : ""}`;
            default:
                return numValue.toString();
        }
    };

    // 🔹 Progress bar helper
    const getProgress = (value, min, max) => ((value - min) / (max - min)) * 100;

    // 🔹 Update input values
    const updateValue = (key, newValue) => {
        setValues(prev => ({ ...prev, [key]: Number(newValue) }));
    };

    // 🔹 Line Chart Data
    // 🔹 PIE DATA
const generatePieData = () => {
    let invested = 0;
    let projected = 0;

    switch (selectedType) {
        case "sip-calculator":
            invested = (values.monthlyInvestment || 0) * (values.years || 5) * 12;
            const monthlyRate = (values.rateOfReturn || 0) / 100 / 12;
            const totalMonths = (values.years || 5) * 12;
            projected = (values.monthlyInvestment || 0) * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
            break;

        case "lumpsum-calculator":
            invested = values.investment || 0;
            projected = values.investment * Math.pow(1 + (values.rateOfReturn || 0) / 100, values.years || 5);
            break;

        case "education-planning":
        case "house-planning":
        case "car-planning":
        case "marriage-planning":
            invested = values.currentCost || 0;
            projected = invested * Math.pow(1 + (values.inflationRate || 0) / 100, values.years || 5);
            break;

        case "delay-planning":
            const monthsInvested = Math.max((values.years || 5) * 12 - (values.delayMonths || 0), 0);
            invested = (values.monthlyInvestment || 0) * monthsInvested;
            const monthlyR = (values.rateOfReturn || 0) / 100 / 12;
            projected = (values.monthlyInvestment || 0) * ((Math.pow(1 + monthlyR, monthsInvested) - 1) / monthlyR);
            break;

        case "life-insurance":
            const annualExpenses = (values.monthlyExpenses || 0) * 12;
            invested = annualExpenses * (values.years || 5);
            projected = calculations.requiredCover || invested; // use calculated insurance cover
            break;

        default:
            invested = 100000;
            projected = 120000;
    }

    const returns = projected - invested;

    return {
        labels: ["Total Investment", "Returns"],
        datasets: [
            {
                data: [invested, returns > 0 ? returns : 0],
                backgroundColor: ["#60a5fa", "#4ade80"],
                borderWidth: 1,
            },
        ],
    };
};
    // 🔹 LINE DATA (works for all calculators)
const generateLineData = () => {
    const years = values.years || 5;
    const labels = Array.from({ length: years }, (_, i) => `Year ${i + 1}`);

    let investedData = [];
    let projectedData = [];

    for (let i = 1; i <= years; i++) {
        const monthlyRate = (values.rateOfReturn || 0) / 100 / 12;
        const totalMonths = i * 12;

        switch (selectedType) {
            case "sip-calculator":
                investedData.push((values.monthlyInvestment || 0) * i * 12);
                projectedData.push(
                    (values.monthlyInvestment || 0) * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)
                );
                break;

            case "lumpsum-calculator":
                investedData.push(values.investment || 0);
                projectedData.push((values.investment || 0) * Math.pow(1 + (values.rateOfReturn || 0) / 100, i));
                break;

            case "education-planning":
            case "house-planning":
            case "car-planning":
            case "marriage-planning":
                investedData.push(values.currentCost || 0);
                projectedData.push(
                    (values.currentCost || 0) * Math.pow(1 + (values.inflationRate || 0) / 100, i)
                );
                break;

            case "delay-planning":
                const monthsInvested = Math.max(totalMonths - (values.delayMonths || 0), 0);
                investedData.push((values.monthlyInvestment || 0) * monthsInvested);
                projectedData.push(
                    (values.monthlyInvestment || 0) * ((Math.pow(1 + monthlyRate, monthsInvested) - 1) / monthlyRate)
                );
                break;

            case "life-insurance":
                const annualExpense = (values.monthlyExpenses || 0) * 12;
                investedData.push(annualExpense * i);
                projectedData.push(
                    (annualExpense * i) * Math.pow(1 + (values.inflationRate || 0) / 100, i)
                );
                break;

            default:
                investedData.push(i * 10000);
                projectedData.push(i * 12000);
        }
    }

    return {
        labels,
        datasets: [
            {
                label: "Total Invested",
                data: investedData,
                borderColor: "#60a5fa",
                backgroundColor: "#60a5fa",
                fill: false,
            },
            {
                label: "Projected Value",
                data: projectedData,
                borderColor: "#22c55e",
                backgroundColor: "#22c55e",
                fill: false,
            },
        ],
    };
};


    // 🔹 Chart Options
    const chartOptions = { responsive: true, maintainAspectRatio: false };


    return (
        <div className="max-w-6xl mx-auto py-10 px-6 bg-[#F9F0D3] min-h-screen">
            {/* Title */}
            <div className="w-full flex h-[200px] items-center justify-center">
                <h1 className="text-gray-600 text-5xl md:text-6xl font-bold">
                    Financial Calculator
                </h1>
            </div>

            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            {currentConfig.icon}
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                                {currentConfig.name}
                            </h1>
                        </div>
                        <p className="text-gray-600 text-lg">{currentConfig.description}</p>
                    </div>

                    {/* Calculator Selector */}
                    <div className="lg:w-80">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Switch Calculator
                        </label>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        >
                            {Object.entries(calculatorConfigs).map(([key, config]) => (
                                <option key={key} value={key}>
                                    {config.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Inputs + Pie */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Input Parameters
                    </h2>
                    <div className="space-y-8">
                        {currentConfig.inputs.map((input) => (
                            <div key={input.key} className="space-y-3">
                                <label className="block text-gray-700 font-semibold">
                                    {input.label} (
                                    {formatValue(values[input.key] || input.default, input.format)})
                                </label>
                                <input
                                    type="range"
                                    min={input.min}
                                    max={input.max}
                                    step={input.step}
                                    value={values[input.key] || input.default}
                                    onChange={(e) => updateValue(input.key, e.target.value)}
                                    className="w-full accent-green-500"
                                />
                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <div
                                        className={`${input.color} h-3 rounded-full transition-all duration-300 ease-out`}
                                        style={{
                                            width: `${getProgress(
                                                values[input.key] || input.default,
                                                input.min,
                                                input.max
                                            )}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">
                        Investment Breakdown
                    </h3>
                    <div className="h-80 flex items-center justify-center">
                        <div className="w-full h-full">
                            <Pie data={generatePieData()} options={chartOptions} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Results + Line */}
            <div className="grid lg:grid-cols-2 gap-8 mt-8">
                {/* Results */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg border border-green-200">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        Calculation Results
                    </h2>
                    <div className="grid gap-4">
                        {results.map((result, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm"
                            >
                                <span className="font-medium text-gray-700">
                                    {result.label}:
                                </span>
                                <span className="font-bold text-lg text-green-600">
                                    {formatValue(result.value, result.format)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Line Chart */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">
                        Growth Projection
                    </h3>
                    <div className="h-80">
                        <Line data={generateLineData()} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModularCalculator;