"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ message, type }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-xl text-white font-semibold ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    }`}
  >
    {message}
  </motion.div>
);

const LoginPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.title = "StudyNook – Login";
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        showToast(error.message || "Invalid email or password", "error");
        setLoading(false);
        return;
      }

      showToast("Login successful! Redirecting...", "success");
      setTimeout(() => router.push("/"), 1000);
    } catch (err) {
      showToast(err.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-700">
            Welcome Back
          </h1>
          <p className="text-slate-600 mt-2">
            Login to your StudyNook account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-300 bg-white text-black placeholder:text-slate-500 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-300 bg-white text-black placeholder:text-slate-500 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-slate-300"></div>
          <span className="text-slate-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-slate-300"></div>
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          className="w-full border border-slate-300 bg-white hover:bg-slate-50 rounded-xl py-3 flex items-center justify-center gap-3 font-medium text-slate-800 transition"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        {/* Register Link */}
        <p className="text-center mt-6 text-slate-600">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </AnimatePresence>
    </div>
  );
};

export default LoginPage;