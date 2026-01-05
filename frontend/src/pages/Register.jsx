import React, { useEffect, useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import finance2 from "../assets/finance2.jpg";
import { AuthContext } from "../authContext/AuthProvider";
import toast from "react-hot-toast";

const Register = () => {
  const formRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      formRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
      .fromTo(
        leftPanelRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(
        rightPanelRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.8 },
        "-=0.4"
      );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agree) {
      toast.error("Please accept Terms & Privacy Policy");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setSubmitting(true);

    try {
      await register(email, fullName, password);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      const resp = err?.response?.data;
      let message = "Registration failed";
      if (resp) {
        if (typeof resp === "string") message = resp;
        else if (resp.error) message = resp.error;
        else if (resp.message) message = resp.message;
        else if (Array.isArray(resp.errors)) message = resp.errors.join(";");
        else message = JSON.stringify(resp);
      } else if (err?.message) {
        message = err.message;
      }
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#F9F0D3] text-gray-800">
      {/* Left Panel */}
      <div
        ref={leftPanelRef}
        className="hidden md:flex flex-1 flex-col items-center justify-center p-10 bg-white"
      >
        <img
          src={finance2}
          alt="Financial Growth"
          className="rounded-lg shadow-lg w-3/4"
        />
        <p className="mt-6 text-center text-lg font-medium text-green-600">
          Secure your financial journey with us.
        </p>
      </div>

      {/* Right Panel */}
      <div
        ref={rightPanelRef}
        className="flex flex-1 items-center justify-center bg-[#E5D7C9]"
      >
        <div
          ref={formRef}
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-zinc-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-zinc-500 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-zinc-500 focus:outline-none"
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-zinc-500 focus:outline-none"
              />
            </div>

            {/* Terms */}
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">
                I agree to the{" "}
                <Link
                  to="/privacy-policy"
                  className="text-green-600 hover:underline"
                >
                  Terms & Privacy Policy
                </Link>
              </span>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-2 rounded-lg text-white transition ${
                submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {submitting ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
