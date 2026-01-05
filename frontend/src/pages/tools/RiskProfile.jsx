import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RiskProfile = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        mobile: "",
        email: "",
        message: "",
    });
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [direction, setDirection] = useState("next"); // for slide animation

    const questions = [
        "Do you have any savings?",
        "Do you invest regularly?",
        "Do you track your expenses?",
        "Do you have a retirement plan?",
        "Do you invest in mutual funds?",
        "Do you invest in stocks or ETFs?",
        "Do you monitor your investment portfolio?",
        "Are you comfortable taking investment risks?",
    ];

    useEffect(() => {
        // Open the popup automatically when page loads
        setShowPopup(true);
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setDirection("next");
        setStep(1);
    };

    const handleAnswer = (answer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[step - 1] = answer;
        setAnswers(updatedAnswers);

        if (step < questions.length) {
            setDirection("next");
            setStep(step + 1);
        } else {
            setStep(questions.length + 1);
            console.log("Form Data:", formData);
            console.log("Answers:", updatedAnswers);
        }
    };

    const handleBack = () => {
        if (step === 1) {
            setDirection("back");
            setStep(0);
        } else if (step > 1) {
            setDirection("back");
            setStep(step - 1);
        }
    };

    const handleClose = () => {
        setShowPopup(false);
        navigate("/"); // move to home page
    };

    const progress =
        step > 0 && step <= questions.length ? (step / questions.length) * 100 : 0;

    // Slide animation classes
    const slideClass =
        direction === "next"
            ? "transform transition-transform duration-300 translate-x-0"
            : "transform transition-transform duration-300 -translate-x-0";

    return (
        <div className="p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Financial Health Tool</h1>

            {showPopup && (
                <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-md bg-transparent animate-fadeIn">
                    <div className="bg-white rounded-2xl border border-gray-200/60 shadow-2xl w-96 p-6 relative overflow-hidden transform transition-all duration-300 animate-zoomIn">

                        {/* Close Icon */}
                        <button
                            onClick={handleClose}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
                        >
                            ✕
                        </button>

                        {/* Progress Bar */}
                        {step > 0 && step <= questions.length && (
                            <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
                                <div
                                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        )}
                        {/* Step 0 - Form */}
                        {step === 0 && (
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
                                    Tell us about yourself
                                </h2>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Mobile Number</label>
                                    <input
                                        type="number"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="resize-none w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition"
                                        rows="3"
                                        required
                                    />
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition"
                                    >
                                        Next
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Questions */}
                        {step > 0 && step <= questions.length && (
                            <div className="text-center space-y-6">
                                <p className="text-lg font-medium">{questions[step - 1]}</p>

                                <div className="flex justify-center space-x-8">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name={`question-${step}`}
                                            value="Yes"
                                            checked={answers[step - 1] === "Yes"}
                                            onChange={() => handleAnswer("Yes")}
                                            className="form-radio h-5 w-5 text-green-500"
                                        />
                                        <span className="text-green-600 font-medium">Yes</span>
                                    </label>

                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name={`question-${step}`}
                                            value="No"
                                            checked={answers[step - 1] === "No"}
                                            onChange={() => handleAnswer("No")}
                                            className="form-radio h-5 w-5 text-red-500"
                                        />
                                        <span className="text-red-600 font-medium">No</span>
                                    </label>
                                </div>
                            </div>
                        )}


                        {/* Thank You */}
                        {step > questions.length && (
                            <div className="text-center space-y-6">
                                {/* Success Icon */}
                                <div className="flex justify-center">
                                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-3xl shadow-md">
                                        ✓
                                    </div>
                                </div>

                                {/* Thank You Text */}
                                <p className="text-xl font-bold text-green-600">Thank You!</p>
                                <p className="text-gray-600 text-sm">
                                    Your responses have been successfully submitted.
                                </p>

                                {/* Close Button */}
                                <button
                                    onClick={handleClose}
                                    className="px-8 py-2 bg-green-500 text-white font-medium rounded-full shadow hover:bg-green-600 transition"
                                >
                                    Close
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
};

export default RiskProfile;
