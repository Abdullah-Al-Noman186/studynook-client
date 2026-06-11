
"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const BookingModal = ({
  isOpen,
  onClose,
  room,
  user,
  onSuccess,
}) => {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const endOptions = useMemo(() => {
    return timeSlots.filter((time) => time > startTime);
  }, [startTime]);

  const totalCost = useMemo(() => {
    const start = Number(startTime.split(":")[0]);
    const end = Number(endTime.split(":")[0]);

    return (end - start) * Number(room?.hourlyRate || 0);
  }, [startTime, endTime, room]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const bookingData = {
        roomId: room._id,
        roomName: room.roomName,
        roomImage: room.image,

        userName: user?.name,
        userEmail: user?.email,

        date,
        startTime,
        endTime,

        totalCost,
        specialNote: note,
      };

      const res = await fetch("https://studynook-serversite.vercel.app/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Booking failed");
        return;
      }

      alert("Room booked successfully!");

      onSuccess?.();

      onClose();
    } catch (err) {
      console.log(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-indigo-700 mb-6">
              Book Study Room
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Date */}

              <div>
                <label className="block mb-2 font-medium text-slate-900">
                  Date
                </label>

                <input
                  type="date"
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-500 p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Start Time */}

              <div>
                <label className="block mb-2 font-medium text-slate-900">
                  Start Time
                </label>

                <select
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);

                    const index = timeSlots.indexOf(e.target.value);

                    if (timeSlots[index + 1]) {
                      setEndTime(timeSlots[index + 1]);
                    }
                  }}
                  className="w-full rounded-xl border border-slate-300 bg-white text-slate-900 p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              {/* End Time */}

              <div>
                <label className="block mb-2 font-medium text-slate-900">
                  End Time
                </label>

                <select
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white text-slate-900 p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {endOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              {/* Total Cost */}

              <div className="rounded-xl bg-indigo-50 p-4">
                <p className="font-semibold text-indigo-700">
                  Total Cost: ${totalCost}
                </p>
              </div>

              {/* Special Note */}

              <div>
                <label className="block mb-2 font-medium text-slate-900">
                  Special Note (Optional)
                </label>

                <textarea
                  rows={4}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Any special requirements..."
                  className="w-full rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-500 p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Buttons */}

              <div className="grid grid-cols-2 gap-4">

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl bg-slate-200 py-3 font-semibold text-slate-900 hover:bg-slate-300 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 transition disabled:opacity-60"
                >
                  {loading ? "Booking..." : "Confirm Booking"}
                </button>

              </div>

            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;

