"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 text-white">

      {/* Glow background (same as footer theme) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sky-500/10 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 py-28 grid lg:grid-cols-2 gap-14 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block bg-white/10 border border-white/10 px-4 py-1 rounded-full text-sm text-slate-200">
            ⚡ Smart • Fast • Conflict-Free Booking
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mt-6">
            Find & Book
            <br />
            <span className="text-indigo-400">Perfect Study Rooms</span>
          </h1>

          <p className="mt-6 text-slate-300 max-w-xl leading-relaxed">
            Discover quiet study spaces, reserve instantly, and manage bookings with real-time availability and zero conflicts.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/rooms"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition"
              >
                Explore Rooms
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/add-room"
                className="bg-white/10 border border-white/20 hover:bg-white hover:text-slate-900 text-white px-6 py-3 rounded-xl transition"
              >
                List Your Room
              </Link>
            </motion.div>

          </div>

          {/* Stats */}
          <div className="mt-10 flex gap-10 text-sm text-slate-300">

            <div>
              <p className="text-2xl font-bold text-white">500+</p>
              Rooms
            </div>

            <div>
              <p className="text-2xl font-bold text-white">1000+</p>
              Bookings
            </div>

            <div>
              <p className="text-2xl font-bold text-white">24/7</p>
              Access
            </div>

          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >

          {/* Image */}
          <motion.img
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da"
            alt="Study Room"
            className="rounded-3xl shadow-2xl object-cover h-[520px] w-full border border-white/10"
          />

          {/* Floating Card (modern SaaS style) */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl p-5 shadow-xl"
          >
            <h3 className="font-bold text-lg">Real-Time Booking</h3>
            <p className="text-sm text-slate-300">
              No double booking conflicts
            </p>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};

export default Hero;