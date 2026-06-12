"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ message, type }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-xl text-white font-semibold ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    }`}
  >
    {message}
  </motion.div>
);

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.title = "StudyNook – My Bookings";
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const sessionData = await authClient.getSession();

        if (!sessionData?.data?.user?.email) {
          setLoading(false);
          return;
        }

        setSession(sessionData.data);

        const res = await fetch(
          `https://studynook-server-8mek.onrender.com/bookings?email=${sessionData.data.user.email}`
        );

        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCancel = async () => {
    if (!selectedBooking) return;

    try {
      setCancelling(true);

      const res = await fetch(
        `https://studynook-server-8mek.onrender.com/bookings/${selectedBooking._id}/cancel`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: session?.user?.email,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === selectedBooking._id
              ? { ...b, status: "cancelled" }
              : b
          )
        );
        setShowModal(false);
        setSelectedBooking(null);
        showToast("Booking cancelled successfully!");
      } else {
        showToast(data.message || "Failed to cancel booking", "error");
      }
    } catch (error) {
      console.log(error);
      showToast("Something went wrong", "error");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <h2 className="text-2xl font-bold text-gray-800">
          Please login first.
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto">

        <motion.div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-2">Manage your booked study rooms</p>
        </motion.div>

        {bookings.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-2xl shadow">
            <h2 className="text-xl font-semibold text-gray-800">
              You have no bookings yet.
            </h2>
            <p className="text-gray-500 mt-2">Book a room to see it here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-xl">
            <table className="w-full text-sm">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="p-3 text-left">Room</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Time</th>
                  <th className="p-3 text-left">Cost</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => {
                  const today = new Date().toISOString().split("T")[0];
                  const isFuture = booking.date >= today;
                  const canCancel = booking.status === "confirmed" && isFuture;

                  return (
                    <tr key={booking._id} className="border-b hover:bg-gray-50">

                      <td className="p-3 flex items-center gap-3">
                        <img
                          src={booking.roomImage}
                          alt="room"
                          className="w-14 h-12 rounded object-cover"
                        />
                        <span className="font-medium text-gray-900">
                          {booking.roomName}
                        </span>
                      </td>

                      <td className="p-3 text-gray-700">{booking.date}</td>

                      <td className="p-3 text-gray-700">
                        {booking.startTime} - {booking.endTime}
                      </td>

                      <td className="p-3 font-bold text-indigo-600">
                        ${booking.totalCost}
                      </td>

                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.status === "cancelled"
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {booking.status || "confirmed"}
                        </span>
                      </td>

                      <td className="p-3">
                        {canCancel ? (
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setShowModal(true);
                            }}
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition"
                          >
                            Cancel
                          </button>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-6 rounded-xl w-[400px] shadow-xl"
            >
              <h2 className="text-xl font-bold text-gray-900">
                Cancel Booking?
              </h2>

              <p className="text-gray-600 mt-3 mb-6">
                Are you sure you want to cancel{" "}
                <b>{selectedBooking.roomName}</b> booking on{" "}
                <b>{selectedBooking.date}</b>?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedBooking(null);
                  }}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded font-medium transition"
                >
                  No, Keep it
                </button>

                <button
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded font-medium transition disabled:opacity-60"
                >
                  {cancelling ? "Cancelling..." : "Yes, Cancel"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <Toast message={toast.message} type={toast.type} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyBookingsPage;