"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
  document.title = "StudyNook - Available Rooms";
  }, []);


  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchRooms = async () => {
    try {
      setLoading(true);

      const query = new URLSearchParams();

      if (search) query.append("search", search);
      if (minPrice) query.append("minPrice", minPrice);
      if (maxPrice) query.append("maxPrice", maxPrice);

      const res = await fetch(
        `https://studynook-serversite.vercel.app/rooms?${query.toString()}`
      );

      if (!res.ok) throw new Error("Failed to fetch rooms");

      const data = await res.json();
      setRooms(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    fetchRooms();
  }, []);

  // animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-12 px-4">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl font-extrabold text-indigo-700">
          Available Study Rooms
        </h1>
        <p className="text-slate-500 mt-2">
          Search, filter and book your perfect study space
        </p>
      </motion.div>

      {/* 🔍 FILTER BAR */}
      <div className="max-w-5xl mx-auto mb-10 bg-white p-5 rounded-2xl shadow-md border border-slate-100">

        <div className="grid md:grid-cols-3 gap-4">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search rooms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full"
          />

          {/* MIN PRICE */}
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="input input-bordered w-full"
          />

          {/* MAX PRICE */}
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="input input-bordered w-full"
          />

        </div>

        {/* BUTTON */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={fetchRooms}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl transition font-medium"
          >
            Apply Filters
          </button>
        </div>

      </div>

      <div className="max-w-7xl mx-auto">

        {/* LOADING */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-96 bg-white rounded-2xl shadow animate-pulse"
              />
            ))}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="text-center text-red-500 font-medium">
            {error}
          </div>
        )}

        {/* EMPTY */}
        {!loading && rooms.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl">🏫</div>
            <h2 className="text-2xl font-bold mt-4">No rooms found</h2>
            <p className="text-slate-500 mt-2">
              Try different search filters
            </p>
          </motion.div>
        )}

        {/* GRID */}
        {!loading && rooms.length > 0 && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {rooms.map((room) => (
              <motion.div
                key={room._id}
                variants={card}
                whileHover={{ scale: 1.03, y: -6 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden border border-slate-100"
              >
                {/* IMAGE */}
                <img
                  src={room.image}
                  alt={room.roomName}
                  className="h-52 w-full object-cover hover:scale-110 transition duration-300"
                />

                {/* CONTENT */}
                <div className="p-5 space-y-2">

                  <h2 className="text-xl font-bold text-slate-800">
                    {room.roomName}
                  </h2>

                  <p className="text-sm text-slate-500 line-clamp-2">
                    {room.description}
                  </p>

                  <div className="flex justify-between text-sm text-slate-600">
                    <span>📍 {room.floor}</span>
                    <span>👥 {room.capacity}</span>
                  </div>

                  <div className="font-bold text-indigo-600 text-lg">
                    ${room.hourlyRate}/hr
                  </div>

                  {/* BUTTON */}
                  <Link
                    href={`/rooms/${room._id}`}
                    className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-medium transition"
                  >
                    View Details
                  </Link>

                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default RoomsPage;