"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  const router = useRouter();

  useEffect(() => {
    document.title = "StudyNook – Page Not Found";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white via-indigo-50 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-9xl font-extrabold text-indigo-600">404</h1>

        <h2 className="text-3xl font-bold text-slate-900 mt-4">
          Page Not Found
        </h2>

        <p className="text-slate-500 mt-4 max-w-md mx-auto">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
          className="mt-8 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl transition"
        >
          Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;