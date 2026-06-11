"use client";

import Hero from "../components/Hero";
import { motion } from "framer-motion";
import LatestRooms from "../components/LatestRooms";
import { useEffect } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const HomePage = () => {
  useEffect(() => {
  document.title = "StudyNook – Home";
  }, []);
  return (
    <div>
      <Hero />
      
      {/* Why Choose Us */}
      <section className="py-24 bg-gradient-to-b from-white via-indigo-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-5">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-slate-900 dark:text-white"
          >
            Why Choose{" "}
            <span className="text-indigo-500">StudyNook</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-500 mt-4 max-w-2xl mx-auto"
          >
            A modern booking system designed for students with smart scheduling,
            clean UI, and zero booking conflicts.
          </motion.p>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mt-14"
          >
            {[
              {
                title: "Smart Conflict Prevention",
                desc: "Automatically blocks overlapping bookings using real-time validation.",
                color: "from-indigo-500 to-blue-500",
              },
              {
                title: "Owner Control System",
                desc: "Room owners can manage listings securely with full control.",
                color: "from-purple-500 to-pink-500",
              },
              {
                title: "Advanced Search & Filters",
                desc: "Find rooms quickly using amenities, price, and capacity filters.",
                color: "from-emerald-500 to-teal-500",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
                className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Gradient glow */}
                <div
                  className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 bg-gradient-to-r ${item.color}`}
                ></div>

                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-500 mt-4 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-5">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-slate-900 dark:text-white"
          >
            What Students Say
          </motion.h2>

          <p className="text-center text-gray-500 mt-4">
            Real feedback from StudyNook users
          </p>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mt-14"
          >
            {[
              {
                name: "Rahim Ahmed",
                text: "StudyNook helped me book a quiet room instantly during exams. No conflicts at all.",
                color: "from-blue-500 to-indigo-500",
              },
              {
                name: "Nabila Sultana",
                text: "As a room owner, I can easily manage everything. The system feels very professional.",
                color: "from-pink-500 to-purple-500",
              },
              {
                name: "Tanvir Hasan",
                text: "Clean UI, smooth booking, and reliable system. Perfect for students.",
                color: "from-emerald-500 to-teal-500",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="p-8 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                {/* subtle glow */}
                <div
                  className={`absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-3xl opacity-20 bg-gradient-to-r ${item.color}`}
                ></div>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  “{item.text}”
                </p>

                <div className="mt-6 font-semibold text-slate-900 dark:text-white">
                  — {item.name}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <LatestRooms />
    </div>
  );
};

export default HomePage;