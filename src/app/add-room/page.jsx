"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const amenitiesList = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const AddRoomPage = () => {
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleCheckboxChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const roomData = {
      roomName: form.roomName.value,
      description: form.description.value,
      image: form.image.value,
      floor: form.floor.value,
      capacity: Number(form.capacity.value),
      hourlyRate: Number(form.hourlyRate.value),
      amenities: selectedAmenities,
    };

    const res = await fetch("https://studynook-server-8mek.onrender.com/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomData),
    });

    const data = await res.json();
    console.log(data);
  };

  const inputStyle =
    "w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 py-12 px-4 text-slate-900">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-5xl font-extrabold text-indigo-700">
          Add Study Room
        </h1>
        <p className="text-slate-600 mt-3">
          Create and manage your study space easily
        </p>
      </motion.div>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-slate-100"
      >
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* ROOM NAME */}
          <div>
            <label className="font-medium">Room Name</label>
            <input
              type="text"
              name="roomName"
              required
              placeholder="Enter room name"
              className={inputStyle}
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="font-medium">Description</label>
            <textarea
              name="description"
              rows="4"
              required
              placeholder="Describe the room..."
              className={inputStyle}
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="font-medium">Image URL</label>
            <input
              type="url"
              name="image"
              required
              placeholder="https://example.com/image.jpg"
              className={inputStyle}
            />
          </div>

          {/* FLOOR + CAPACITY */}
          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="font-medium">Floor</label>
              <input
                type="text"
                name="floor"
                required
                placeholder="e.g. 3rd Floor"
                className={inputStyle}
              />
            </div>

            <div>
              <label className="font-medium">Capacity</label>
              <input
                type="number"
                name="capacity"
                required
                min="1"
                placeholder="e.g. 4"
                className={inputStyle}
              />
            </div>

          </div>

          {/* RATE */}
          <div>
            <label className="font-medium">Hourly Rate ($)</label>
            <input
              type="number"
              name="hourlyRate"
              required
              min="1"
              placeholder="e.g. 5"
              className={inputStyle}
            />
          </div>

          {/* AMENITIES */}
          <div>
            <label className="font-medium">Amenities</label>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
              {amenitiesList.map((item) => (
                <motion.label
                  key={item}
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-2 p-3 rounded-xl border bg-slate-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(item)}
                    onChange={() => handleCheckboxChange(item)}
                  />
                  <span className="text-slate-800 text-sm">{item}</span>
                </motion.label>
              ))}
            </div>
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg"
          >
            Add Room
          </motion.button>

        </form>
      </motion.div>
    </div>
  );
};

export default AddRoomPage;