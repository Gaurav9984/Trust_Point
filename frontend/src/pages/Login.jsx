import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// axios removed: use AuthContext.login instead
import gsap from 'gsap'
import finance1 from '../assets/finance1.webp'
import { AuthContext } from '../authContext/AuthProvider'
import toast from 'react-hot-toast'

const Login = () => {
  const formRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const modalRef = useRef(null)
  const navigate = useNavigate()

  const [investerId, setInvesterId] = useState('')
  const [password, setPassword] = useState('')
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const {login}=useContext(AuthContext);

  useEffect(() => {
    gsap.fromTo(
      leftRef.current,
      { x: '-100%', opacity: 0 },
      { x: '0%', opacity: 1, duration: 1.2, ease: 'power3.out' }
    )
    gsap.fromTo(
      rightRef.current,
      { x: '100%', opacity: 0 },
      { x: '0%', opacity: 1, duration: 1.2, ease: 'power3.out' }
    )
    gsap.fromTo(
      formRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    )
  }, [])

  useEffect(() => {
    if (showForgotPassword) {
      gsap.fromTo(
        modalRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
    }
  }, [showForgotPassword])


const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  try {
    await login(investerId, password); // Pass investerId instead of email
    toast.success("Logged in");
    navigate('/profile');
  } catch (err) {
    const message = err.message || err.error || 'Login failed';
    setError(message);
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F9F0D3]">
      {/* Left Side */}
      <div
        ref={leftRef}
        className="w-screen lg:w-1/2 flex flex-col justify-center items-center text-center p-10 bg-[#E5D7C9]"
      >
        <h1 className="text-5xl font-extrabold text-green-700 mb-6">Welcome Back!</h1>
        <p className="text-lg text-gray-700 max-w-md mb-6">
          Securely log in to manage your investments, track your portfolio, and grow your wealth
          with <span className="font-semibold text-green-600">Trust Point Wealth Partners</span>.
        </p>
        <img
          src={finance1}
          alt="Finance Illustration"
          className="rounded-2xl shadow-lg w-3/4 lg:w-2/3"
        />
      </div>

      {/* Right Side */}
      <div
        ref={rightRef}
        className="w-full lg:w-1/2 flex justify-center items-center bg-white p-10"
      >
        <div
          ref={formRef}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-zinc-200"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Login</h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Invester ID
              </label>
              <input
                type="text"
                value={investerId}
                onChange={(e) => setInvesterId(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-400 rounded-lg  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                placeholder="Enter your Invester ID"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-300 rounded-lg  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex justify-between items-center mb-4">
              <label className="flex items-center text-sm text-gray-700">
                <input type="checkbox" className="mr-2 accent-green-600" />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-green-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-700">
            Don't have an account?{' '}
            <Link to="/signup" className="text-green-600 hover:underline font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div
            ref={modalRef}
            className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm border border-green-200"
          >
            <h2 className="text-2xl font-bold mb-4 text-green-700">Reset Password</h2>
            <p className="text-sm text-gray-700 mb-4">
              Enter your email to receive a password reset link.
            </p>
            <input
              type="email"
              className="w-full px-4 py-2 border border-green-300 rounded-lg bg-[#F9F0D3] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
              placeholder="Enter your email"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowForgotPassword(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Send Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login
