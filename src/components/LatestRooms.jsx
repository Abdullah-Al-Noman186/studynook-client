"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const LatestRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await fetch("https://studynook-serversite.vercel.app/rooms/latest");
      const data = await res.json();
      setRooms(data);
    };

    fetchRooms();
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-white via-indigo-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-5">

        {/* TITLE (same style as HomePage) */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-slate-900 dark:text-white"
        >
          Available{" "}
          <span className="text-indigo-500">Study Rooms</span>
        </motion.h2>

        <p className="text-center text-gray-500 mt-4">
          Latest rooms added to StudyNook
        </p>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

          {rooms.map((room) => (
            <motion.div
              key={room._id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >

              {/* glow effect (same style as your cards) */}
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 bg-gradient-to-r from-indigo-500 to-blue-500"></div>

              {/* IMAGE */}
              <img
                src={room.image}
                className="h-48 w-full object-cover rounded-xl"
                alt={room.roomName}
              />

              {/* CONTENT */}
              <h3 className="text-xl font-semibold mt-4 text-slate-900 dark:text-white">
                {room.roomName}
              </h3>

              <p className="text-gray-500 mt-2 text-sm">
                {room.description?.slice(0, 100)}...
              </p>

              {/* INFO */}
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mt-3">
                <span>📍 {room.floor}</span>
                <span>👥 {room.capacity}</span>
              </div>

              <div className="text-indigo-500 font-bold mt-2">
                ${room.hourlyRate}/hr
              </div>

              {/* AMENITIES */}
              <div className="flex flex-wrap gap-1 mt-3">
                {room.amenities?.slice(0, 3).map((a, i) => (
                  <span
                    key={i}
                    className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full"
                  >
                    {a}
                  </span>
                ))}

                {room.amenities?.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{room.amenities.length - 3} more
                  </span>
                )}
              </div>

              {/* BUTTON */}
              <Link
                href={`/rooms/${room._id}`}
                className="mt-4 block text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition font-medium"
              >
                View Details
              </Link>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default LatestRooms;