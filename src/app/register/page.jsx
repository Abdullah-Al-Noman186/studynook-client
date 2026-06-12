"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
  document.title = "StudyNook – Register";
  }, []);

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }

    return "";
  };

  
const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  const form = e.target;

  const name = form.name.value;
  const email = form.email.value;
  const image = form.image.value;
  const password = form.password.value;

  const passwordError = validatePassword(password);

  if (passwordError) {
    setError(passwordError);
    toast.error(passwordError);
    return;
  }

  const toastId = toast.loading("Creating your account...");

  try {
    setLoading(true);

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image,
    });

    if (error) {
      setError(error.message);

      toast.error(error.message, {
        id: toastId,
      });

      return;
    }

    toast.success("Registration successful!", {
      id: toastId,
    });

    setTimeout(() => {
      router.push("/");
    }, 1000);
  } catch (err) {
    const message = err.message || "Registration failed.";

    setError(message);

    toast.error(message, {
      id: toastId,
    });
  } finally {
    setLoading(false);
  }
};



  const handleGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-slate-200">
        <h1 className="text-4xl font-bold text-center text-indigo-700">
          Create Account
        </h1>

        <p className="text-center text-slate-600 mt-2">
          Join StudyNook today
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 mt-8">
          
          <div>
            <label className="block mb-2 font-medium text-slate-800">
              Name
            </label>

            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              className="w-full rounded-xl border border-slate-300 bg-white text-black placeholder:text-slate-500 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          
          <div>
            <label className="block mb-2 font-medium text-slate-800">
              Email
            </label>

            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-300 bg-white text-black placeholder:text-slate-500 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          
          <div>
            <label className="block mb-2 font-medium text-slate-800">
              Photo URL
            </label>

            <input
              type="text"
              name="image"
              required
              placeholder="https://example.com/photo.jpg"
              className="w-full rounded-xl border border-slate-300 bg-white text-black placeholder:text-slate-500 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          
          <div>
            <label className="block mb-2 font-medium text-slate-800">
              Password
            </label>

            <input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-300 bg-white text-black placeholder:text-slate-500 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <p className="text-xs text-slate-500 mt-2">
              • Minimum 6 characters
              <br />
              • At least one uppercase letter
              <br />
              • At least one lowercase letter
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-300 text-red-600 rounded-xl p-3 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px bg-slate-300 flex-1"></div>
          <span className="text-slate-500 text-sm">OR</span>
          <div className="h-px bg-slate-300 flex-1"></div>
        </div>

        <button
          onClick={handleGoogle}
          className="w-full border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 py-3 rounded-xl font-medium flex items-center justify-center gap-3 transition"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <p className="text-center text-slate-600 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;