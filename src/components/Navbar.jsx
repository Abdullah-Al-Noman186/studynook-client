
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX, HiChevronDown, HiLogout } from "react-icons/hi";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const profileRef = useRef(null);

  useEffect(() => {
    const getSession = async () => {
      try {
        const session = await authClient.getSession();
        setUser(session?.data?.user || null);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProfileOpen(false);
  }, [pathname]);

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

  const isActive = (href) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 text-slate-900 shadow-sm backdrop-blur-xl">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="h-[3px] origin-left bg-gradient-to-r from-indigo-600 via-sky-500 to-cyan-500"
      />

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="group inline-flex items-center gap-1">
          <span className="text-3xl font-black tracking-tight text-slate-950">
            Study
          </span>
          <span className="text-3xl font-black tracking-tight text-indigo-600 transition-colors group-hover:text-indigo-700">
            Nook
          </span>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                isActive(item.href)
                  ? "text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              {isActive(item.href) && (
                <motion.span
                  layoutId="activeNav"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-full bg-indigo-600 shadow-md shadow-indigo-600/20"
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {loading ? (
            <div className="h-10 w-28 animate-pulse rounded-full bg-slate-200" />
          ) : !user ? (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 hover:shadow-indigo-600/30 focus:outline-none focus:ring-4 focus:ring-indigo-200"
              >
                Register
              </Link>
            </>
          ) : (
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-3 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-3 shadow-sm transition hover:border-indigo-200 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                aria-label="Open profile menu"
              >
                <Image
                  src={user.image || "/profile.png"}
                  alt="Profile"
                  width={38}
                  height={38}
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-indigo-100"
                />

                <span className="max-w-28 truncate text-sm font-semibold text-slate-700">
                  {user.name || "Account"}
                </span>

                <HiChevronDown
                  className={`text-lg text-slate-500 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute right-0 mt-4 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10"
                  >
                    <div className="border-b border-slate-100 p-5 text-center">
                      <Image
                        src={user.image || "/profile.png"}
                        width={64}
                        height={64}
                        className="mx-auto h-16 w-16 rounded-full object-cover ring-4 ring-indigo-50"
                        alt="User profile"
                      />

                      <p className="mt-3 truncate text-base font-bold text-slate-950">
                        {user.name}
                      </p>

                      <p className="truncate text-sm text-slate-500">
                        {user.email}
                      </p>
                    </div>

                    <div className="p-2">
                      <Link
                        href="/my-listings"
                        className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                      >
                        My Listings
                      </Link>

                      <Link
                        href="/my-bookings"
                        className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                      >
                        My Bookings
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-600 hover:text-white"
                      >
                        <HiLogout className="text-lg" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-2xl text-slate-900 shadow-sm transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-100 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="overflow-hidden border-t border-slate-200 bg-white lg:hidden"
          >
            <motion.div
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
              className="space-y-2 px-5 py-5"
            >
              {navLinks.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={item.href}
                    className={`block rounded-2xl px-4 py-3 text-sm font-bold transition ${
                      isActive(item.href)
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-3">
                {loading ? (
                  <div className="h-12 w-full animate-pulse rounded-2xl bg-slate-200" />
                ) : !user ? (
                  <div className="grid gap-3">
                    <Link
                      href="/login"
                      className="rounded-2xl px-4 py-3 text-center text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      className="rounded-2xl bg-indigo-600 px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
                    >
                      Register
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                      <Image
                        src={user.image || "/profile.png"}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-indigo-100"
                        alt="User profile mobile"
                      />

                      <div className="min-w-0">
                        <p className="truncate font-bold text-slate-950">
                          {user.name}
                        </p>
                        <p className="truncate text-sm text-slate-500">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/my-listings"
                      className="block rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                    >
                      My Listings
                    </Link>

                    <Link
                      href="/my-bookings"
                      className="block rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                    >
                      My Bookings
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-600 hover:text-white"
                    >
                      <HiLogout className="text-lg" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
