import React, { useState } from "react";
import p2 from "../assets/p3.webp";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqsData = [
  {
    question: "What services do you offer?",
    answer:
      "We provide personalized financial consulting, investment planning, risk management, and more tailored to your needs.",
  },
  {
    question: "How do I know if I need a financial consultant?",
    answer:
      "If you're looking to optimize your finances, plan for retirement, or navigate complex investments, a consultant can help guide you.",
  },
  {
    question: "What can I expect from an initial consultation?",
    answer:
      "During the first consultation, we’ll discuss your goals, assess your current financial situation, and outline a tailored strategy.",
  },
  {
    question: "Are my consultations confidential?",
    answer:
      "Yes, all consultations are strictly confidential. Your privacy and data security are our top priorities.",
  },
  {
    question: "What kind of clients do you work with?",
    answer:
      "We work with individuals, families, and businesses seeking professional financial advice, regardless of their income or net worth.",
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="h-screen bg-[#111C2E] px-6 md:px-16 py-12">
      {/* Heading */}
      <div className="text-center mb-12">
        <h4 className="text-2xl font-semibold text-[#E5D7C9] tracking-wider">FAQS</h4>
        <h1 className="text-3xl text-[#E5D7C9] md:text-5xl font-semibold">
          Your most frequently asked{" "}
          <span className="text-green-600">questions answered</span>
        </h1>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Left image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={p2}
            alt="FAQ illustration"
            className="w-80 md:w-[520px] rounded-2xl shadow-lg"
          />
        </div>

        {/* Right FAQ accordion */}
        <div className="w-full md:w-1/2 space-y-4">
          {faqsData.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-xl p-4 shadow-sm cursor-pointer transition ${
                openIndex === index ? "bg-green-50 border-green-400" : "bg-white"
              }`}
              onClick={() => toggleFAQ(index)}
            >
              {/* Question */}
              <div className="flex justify-between items-center">
                <h3
                  className={`font-semibold text-lg ${
                    openIndex === index ? "text-green-700" : "text-gray-800"
                  }`}
                >
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="text-green-600" />
                ) : (
                  <ChevronDown className="text-gray-500" />
                )}
              </div>

              {/* Answer */}
              {openIndex === index && (
                <p className="mt-3 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
