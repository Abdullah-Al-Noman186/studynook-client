"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

const MyListingsPage = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    document.title = "StudyNook – My Listings";
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const session = await authClient.getSession();

        if (!session?.data?.user) {
          router.push("/login");
          return;
        }

        setUser(session.data.user);

        const res = await fetch(
          `https://studynook-server-8mek.onrender.com/rooms?ownerId=${session.data.user.id}`
        );
        const data = await res.json();
        setRooms(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDelete = async () => {
    if (!selectedRoom) return;

    try {
      setDeleting(true);

      const res = await fetch(
        `https://studynook-server-8mek.onrender.com/rooms/${selectedRoom._id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setRooms((prev) => prev.filter((r) => r._id !== selectedRoom._id));
        setShowDelete(false);
        setSelectedRoom(null);
        showToast("Room deleted successfully!");
      } else {
        showToast("Failed to delete room", "error");
      }
    } catch (err) {
      showToast("Something went wrong", "error");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">

        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-10"
        >
          <div>
            <h1 className="text-4xl font-bold text-slate-900">My Listings</h1>
            <p className="text-slate-500 mt-1">Manage your study rooms</p>
          </div>

          <button
            onClick={() => router.push("/add-room")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            + Add Room
          </button>
        </motion.div>

        
        {rooms.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-2xl shadow">
            <div className="text-6xl mb-4">🏫</div>
            <h2 className="text-xl font-semibold text-slate-800">
              You have no listings yet.
            </h2>
            <p className="text-slate-500 mt-2">
              Add your first room to get started.
            </p>
            <button
              onClick={() => router.push("/add-room")}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Add Room
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <motion.div
                key={room._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100"
              >
               
                <img
                  src={room.image}
                  alt={room.roomName}
                  className="h-48 w-full object-cover"
                />

                
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

                  <div className="font-bold text-indigo-600">
                    ${room.hourlyRate}/hr
                  </div>

                  <div className="text-sm text-slate-500">
                    📊 {room.bookingCount || 0} bookings
                  </div>

                  
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <button
                      onClick={() => router.push(`/rooms/${room._id}`)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-xl text-sm font-medium transition"
                    >
                      View
                    </button>

                    <button
                      onClick={() => router.push(`/rooms/edit/${room._id}`)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl text-sm font-medium transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setSelectedRoom(room);
                        setShowDelete(true);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl text-sm font-medium transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      
      <AnimatePresence>
        {showDelete && selectedRoom && (
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
              <h2 className="text-xl font-bold text-gray-900">Delete Room?</h2>

              <p className="text-gray-600 mt-3 mb-6">
                Are you sure you want to delete{" "}
                <b>{selectedRoom.roomName}</b>? This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowDelete(false);
                    setSelectedRoom(null);
                  }}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded font-medium transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded font-medium transition disabled:opacity-60"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </AnimatePresence>
    </div>
  );
};

export default MyListingsPage;