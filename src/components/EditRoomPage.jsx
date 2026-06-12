"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const amenitiesList = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const EditRoomPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [formData, setFormData] = useState({
    roomName: "",
    description: "",
    image: "",
    floor: "",
    capacity: "",
    hourlyRate: "",
  });

 
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);

        const res = await fetch(`https://studynook-server-8mek.onrender.com/rooms/${id}`);

        if (!res.ok) throw new Error("Failed to load room");

        const data = await res.json();

        setFormData({
          roomName: data.roomName,
          description: data.description,
          image: data.image,
          floor: data.floor,
          capacity: data.capacity,
          hourlyRate: data.hourlyRate,
        });

        setSelectedAmenities(data.amenities || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRoom();
  }, [id]);

 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  const toggleAmenity = (item) => {
    if (selectedAmenities.includes(item)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== item));
    } else {
      setSelectedAmenities([...selectedAmenities, item]);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const payload = {
        ...formData,
        capacity: Number(formData.capacity),
        hourlyRate: Number(formData.hourlyRate),
        amenities: selectedAmenities,
      };

      const res = await fetch(`https://studynook-server-8mek.onrender.com/rooms/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Update failed");

      router.push(`/rooms/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-10 px-4">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-bold text-indigo-700">
          Edit Room
        </h1>
        <p className="text-slate-500">
          Update your room details
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-5"
      >

        
        <input
          name="roomName"
          value={formData.roomName}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Room Name"
        />

        
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          rows="4"
          placeholder="Description"
        />

        
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Image URL"
        />

        <div className="grid md:grid-cols-2 gap-4">

          <input
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Floor"
          />

          <input
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            type="number"
            className="input input-bordered"
            placeholder="Capacity"
          />

        </div>

        <input
          name="hourlyRate"
          value={formData.hourlyRate}
          onChange={handleChange}
          type="number"
          className="input input-bordered w-full"
          placeholder="Hourly Rate"
        />

        {/* AMENITIES */}
        <div>
          <h3 className="font-semibold mb-2">Amenities</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {amenitiesList.map((item) => (
              <label
                key={item}
                className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(item)}
                  onChange={() => toggleAmenity(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        
        <button
          type="submit"
          disabled={updating}
          className="btn btn-primary w-full"
        >
          {updating ? "Updating..." : "Update Room"}
        </button>

      </motion.form>
    </div>
  );
};

export default EditRoomPage;