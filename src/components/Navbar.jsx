"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const session = await authClient.getSession();
        console.log("Session:", session);
        setUser(session?.data?.user || null);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    setUser(null);
    window.location.href = "/";
  };

  const navLinks = user
    ? [
        { name: "Home", href: "/" },
        { name: "Rooms", href: "/rooms" },
        { name: "Add Room", href: "/add-room" },
        { name: "My Bookings", href: "/my-bookings" },
      ]
    : [
        { name: "Home", href: "/" },
        { name: "Rooms", href: "/rooms" },
      ];

  const activeClass = (href) =>
    pathname === href
      ? "bg-indigo-600 text-white"
      : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b text-gray-900">
      <div className="h-[3px] bg-gradient-to-r from-indigo-600 via-sky-500 to-indigo-600" />

      <div className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between">

        
        <Link href="/" className="text-3xl font-extrabold text-gray-900">
          Study<span className="text-indigo-600">Nook</span>
        </Link>

        
        <div className="hidden lg:flex items-center gap-3 text-gray-900">

          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-full font-medium transition ${activeClass(item.href)}`}
            >
              {item.name}
            </Link>
          ))}

         
          {loading ? (
            <div className="w-24 h-9 bg-gray-200 rounded-full animate-pulse" />
          ) : !user ? (
            <>
              <Link className="text-gray-700 hover:text-indigo-600" href="/login">
                Login
              </Link>
              <Link
                className="bg-indigo-600 text-white px-5 py-2 rounded-full font-semibold"
                href="/register"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative group">
              <Image
                src={user.image || "/profile.png"}
                alt="Profile"
                width={42}
                height={42}
                className="rounded-full border-2 border-indigo-500 cursor-pointer"
              />

             
              <div className="absolute right-0 mt-3 w-64 bg-white border shadow-xl rounded-xl p-4 hidden group-hover:block z-50">
                <div className="text-center border-b pb-3 mb-3">
                  <Image
                    src={user.image || "/profile.png"}
                    width={60}
                    height={60}
                    className="rounded-full mx-auto"
                    alt="User profile"
                  />
                  <p className="font-bold text-gray-900 mt-2">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                <Link
                  href="/my-listings"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  My Listings
                </Link>

                <Link
                  href="/my-bookings"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  My Bookings
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-2 rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-3xl text-gray-900"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white border-t text-gray-900"
          >
            <div className="flex flex-col gap-2 p-5">

              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-xl ${activeClass(item.href)}`}
                >
                  {item.name}
                </Link>
              ))}

              {loading ? (
                <div className="w-full h-10 bg-gray-200 rounded-xl animate-pulse" />
              ) : !user ? (
                <>
                  <Link href="/login" className="px-4 py-3 text-gray-700">
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-indigo-600 text-white py-3 rounded-xl text-center"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <Image
                      src={user.image || "/profile.png"}
                      width={45}
                      height={45}
                      className="rounded-full"
                      alt="User profile mobile"
                    />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>

                  <Link href="/my-listings" className="px-4 py-3 hover:bg-gray-100 rounded">
                    My Listings
                  </Link>

                  <Link href="/my-bookings" className="px-4 py-3 hover:bg-gray-100 rounded">
                    My Bookings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white py-3 rounded-xl"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;