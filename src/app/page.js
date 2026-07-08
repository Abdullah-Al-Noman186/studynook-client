
"use client";

import Hero from "../components/Hero";
import LatestRooms from "../components/LatestRooms";
import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  HiAdjustments,
  HiCalendar,
  HiShieldCheck,
  HiStar,
} from "react-icons/hi";

const sectionFade = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardFade = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const features = [
  {
    title: "Smart Conflict Prevention",
    desc: "Automatically prevents overlapping bookings with real-time validation and cleaner scheduling.",
    icon: HiShieldCheck,
    color: "bg-indigo-600",
    accent: "from-indigo-500 to-sky-500",
  },
  {
    title: "Owner Control System",
    desc: "Room owners can publish, update, and manage listings with a secure, organized workflow.",
    icon: HiCalendar,
    color: "bg-violet-600",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Advanced Search & Filters",
    desc: "Students can quickly discover rooms by price, capacity, amenities, and availability.",
    icon: HiAdjustments,
    color: "bg-emerald-600",
    accent: "from-emerald-500 to-teal-500",
  },
];

const testimonials = [
  {
    name: "Rahim Ahmed",
    role: "Student",
    text: "StudyNook helped me book a quiet room instantly during exams. The experience felt smooth and reliable.",
  },
  {
    name: "Nabila Sultana",
    role: "Room Owner",
    text: "Managing room availability is much easier now. The system feels clean, professional, and simple to use.",
  },
  {
    name: "Tanvir Hasan",
    role: "Student",
    text: "The interface is clear, booking is fast, and I can find the right study space without wasting time.",
  },
];

const HomePage = () => {
  useEffect(() => {
    document.title = "StudyNook - Home";
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <Hero />

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-24 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <motion.div
            variants={sectionFade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300">
              Built for smarter study-space booking
            </span>

            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
              Why Choose <span className="text-indigo-600">StudyNook</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
              A modern booking experience for students and room owners, designed
              around speed, clarity, and fewer scheduling mistakes.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-16 grid gap-6 md:grid-cols-3"
          >
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  variants={cardFade}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-2xl hover:shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/40"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.accent}`}
                  />

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 transition-transform duration-300 group-hover:scale-110 dark:bg-slate-800">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color} text-white shadow-lg`}
                    >
                      <Icon className="text-xl" />
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-extrabold text-slate-950 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                    {item.desc}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-50 py-24 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <motion.div
            variants={sectionFade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300">
              <HiStar className="text-lg" />
              Student feedback
            </span>

            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
              What Students Say
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
              Real experiences from students and owners who use StudyNook to
              book and manage study spaces.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-16 grid gap-6 md:grid-cols-3"
          >
            {testimonials.map((item) => (
              <motion.article
                key={item.name}
                variants={cardFade}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
              >
                <div className="mb-6 flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <HiStar key={index} className="text-lg" />
                  ))}
                </div>

                <p className="leading-8 text-slate-600 dark:text-slate-300">
                  "{item.text}"
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-sm font-black text-white shadow-lg shadow-indigo-600/20">
                    {item.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </div>

                  <div>
                    <p className="font-extrabold text-slate-950 dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {item.role}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <LatestRooms />
    </main>
  );
};

export default HomePage;
