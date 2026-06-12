"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import BookingModal from "@/components/BookingModal";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const RoomDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [room, setRoom] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (room) document.title = `StudyNook – ${room.roomName}`;
  }, [room]);

  useEffect(() => {
    const getUser = async () => {
      const session = await authClient.getSession();
      if (session?.data?.user) {
        setUser(session.data.user);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`https://studynook-serversite.vercel.app/rooms/${id}`);
        if (!res.ok) throw new Error("Failed to fetch room");
        const data = await res.json();
        setRoom(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRoom();
  }, [id]);

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting room...");
    try {
      setDeleting(true);
      const res = await fetch(
        `https://studynook-serversite.vercel.app/rooms/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Failed to delete room");

      toast.success("Room deleted successfully!", { id: toastId });
      setTimeout(() => router.push("/rooms"), 1000);
    } catch (err) {
      toast.error(err.message || "Failed to delete room", { id: toastId });
    } finally {
      setDeleting(false);
    }
  };

  const handleBookingSuccess = async () => {
    try {
      toast.success("Room booked successfully! 🎉");
      const res = await fetch(`https://studynook-serversite.vercel.app/rooms/${id}`);
      if (!res.ok) throw new Error("Failed to refresh room data");
      const data = await res.json();
      setRoom(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-semibold">
        Room not found
      </div>
    );
  }

  const isOwner = !!user;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative h-[450px] rounded-3xl overflow-hidden shadow-xl"
          >
            <Image
              src={room.image}
              alt={room.roomName}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h1 className="text-5xl font-bold text-slate-900">
              {room.roomName}
            </h1>

            <p className="text-slate-600 leading-8">{room.description}</p>

            {/* INFO GRID */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl shadow p-5">
                <p className="text-slate-500 text-sm">Floor</p>
                <h3 className="font-bold text-lg text-indigo-950">{room.floor}</h3>
              </div>

              <div className="bg-white rounded-2xl shadow p-5">
                <p className="text-slate-500 text-sm">Capacity</p>
                <h3 className="font-bold text-lg text-indigo-950">{room.capacity} People</h3>
              </div>

              <div className="bg-indigo-600 rounded-2xl shadow p-5 text-white">
                <p className="text-indigo-100 text-sm">Hourly Rate</p>
                <h3 className="font-bold text-2xl">${room.hourlyRate}/hr</h3>
              </div>

              <div className="bg-white rounded-2xl shadow p-5">
                <p className="text-slate-500 text-sm">Total Bookings</p>
                <h3 className="font-bold text-lg text-indigo-950">
                  {room.bookingCount || 0}
                </h3>
              </div>
            </div>

            {/* AMENITIES */}
            <div>
              <h2 className="font-bold text-lg mb-3">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {room.amenities?.map((item, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* BOOK BUTTON */}
            {user ? (
              <button
                onClick={() => setShowBooking(true)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-semibold transition"
              >
                Book Now
              </button>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-semibold transition"
              >
                Login to Book
              </button>
            )}

            {/* OWNER ACTIONS */}
            {isOwner && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-400 font-medium">Room Controls</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => router.push(`/rooms/edit/${room._id}`)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold transition"
                  >
                    ✏️ Edit Room
                  </button>

                  <button
                    onClick={() => router.push("/rooms")}
                    className="bg-slate-700 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold transition"
                  >
                    📋 All Rooms
                  </button>
                </div>

                <button
                  onClick={() => setShowDelete(true)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
                >
                  🗑 Delete Room
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* BOOKING MODAL */}
      <BookingModal
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        room={room}
        user={user}
        onSuccess={handleBookingSuccess}
      />

      {/* DELETE MODAL */}
      <AnimatePresence>
        {showDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-3xl p-8 w-[350px]"
            >
              <h2 className="text-2xl font-bold mb-3">Delete Room?</h2>
              <p className="text-slate-500 mb-6">
                This action cannot be undone. The room will be permanently deleted.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDelete(false)}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 py-3 rounded-xl font-semibold transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RoomDetailsPage;