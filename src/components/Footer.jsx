"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-200 mt-24"
    >
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/20 blur-3xl rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 py-16 grid md:grid-cols-3 gap-12">

        
        <motion.div whileHover={{ scale: 1.02 }}>
          <h2 className="text-3xl font-bold text-white">
            Study<span className="text-indigo-500">Nook</span>
          </h2>

          <p className="mt-4 text-sm text-slate-400 leading-relaxed">
            Find, book, and manage study rooms effortlessly.
            A modern platform for students and creators.
          </p>
        </motion.div>

       
        <div>
          <h3 className="text-lg font-semibold text-white mb-5">
            Useful Links
          </h3>

          <div className="flex flex-col gap-3 text-sm">
            {[
              { name: "Home", href: "/" },
              { name: "Rooms", href: "/rooms" },
              { name: "About", href: "/about" },
            ].map((link, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href={link.href}
                  className="hover:text-indigo-400 transition"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold text-white mb-5">
            Get in Touch
          </h3>

          <div className="text-sm text-slate-400 space-y-2">
            <p>Email: support@studynook.com</p>
            <p>Phone: +880 1234-567890</p>
          </div>

          <div className="flex gap-4 mt-6">
            {[
              { icon: <FaFacebookF />, link: "#" },
              { icon: <FaXTwitter />, link: "#" },
              { icon: <FaLinkedinIn />, link: "#" },
              { icon: <FaInstagram />, link: "#" },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.link}
                whileHover={{ scale: 1.2, rotate: 6 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-indigo-600/30 transition"
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      
      <div className="border-t border-slate-800 py-5 text-center text-sm text-slate-500">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          © {new Date().getFullYear()}{" "}
          <span className="text-indigo-400 font-medium">StudyNook</span>.
          All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;