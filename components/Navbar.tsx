"use client";

import Link from "next/link";
import { useState } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <>
      <nav className="fixed top-3 z-100 flex w-full justify-center">
        <div className="bg-sidebar-accent/55 shadow-accent border-accent-foreground/30 text-foreground flex h-15 w-[95%] items-center justify-between gap-3 rounded-4xl border px-10 py-3 text-xl shadow-lg backdrop-blur-sm">
          {/* Logo / Judul */}
          <Link
            href={"/"}
            className="text-card-foreground font-mono text-2xl font-semibold tracking-widest"
          >
            <h1>
              SIGMA<span className="max-md:hidden"> - Pesan Aspirasi</span>
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="text-primary flex h-20 items-center justify-center gap-10 max-md:hidden">
            <Link href={"/"} className="transition-transform hover:scale-110">
              <FaHome className="h-8 w-8" />
            </Link>
            <Link
              href={"/kirim"}
              className="transition-transform hover:scale-110"
            >
              <IoMdSend className="h-8 w-8" />
            </Link>
            <Link
              href={"/pesan"}
              className="transition-transform hover:scale-110"
            >
              <MdMessage className="h-8 w-8" />
            </Link>
            <Link
              href={"/login"}
              className="transition-transform hover:scale-110"
            >
              <FaUser className="h-8 w-8" />
            </Link>
          </div>

          {/* Mobile Hamburger (Animasi dari project lama) */}
          <button
            className="relative flex h-5 w-8 flex-col items-center justify-between md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span
              className={`bg-foreground block h-[2.5px] w-7 rounded-full transition-all duration-300 ease-in-out ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`bg-foreground block h-[2.5px] w-7 rounded-full transition-all duration-300 ease-in-out ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`bg-foreground block h-[2.5px] w-7 rounded-full transition-all duration-300 ease-in-out ${
                open ? "-translate-y-2.5 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Floating Theme Toggle */}
      <div className="bg-sidebar-accent/55 fixed right-6 bottom-6 z-90 flex items-center justify-center rounded-full px-3 py-3 text-center backdrop-blur-sm">
        <ThemeToggle />
      </div>

      {/* Mobile Menu Overlay & Sidebar (Mekanisme dari project lama) */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay Blur Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Sidebar Menu Dropdown */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 30 }}
              className="border-accent-foreground/30 bg-background/95 text-foreground fixed top-20 right-4 z-50 flex h-max w-2/3 flex-col rounded-2xl border p-6 shadow-2xl backdrop-blur-md md:hidden"
            >
              <div className="flex flex-col space-y-6 text-lg font-medium">
                <Link
                  href="/"
                  className="border-border/50 hover:text-primary flex items-center gap-4 border-b pb-2"
                  onClick={() => setOpen(false)}
                >
                  <FaHome className="h-6 w-6" />
                  Home
                </Link>
                <Link
                  href="/kirim"
                  className="border-border/50 hover:text-primary flex items-center gap-4 border-b pb-2"
                  onClick={() => setOpen(false)}
                >
                  <IoMdSend className="h-6 w-6" />
                  Kirim Pesan
                </Link>
                <Link
                  href="/pesan"
                  className="border-border/50 hover:text-primary flex items-center gap-4 border-b pb-2"
                  onClick={() => setOpen(false)}
                >
                  <MdMessage className="h-6 w-6" />
                  Aspirasi Masuk
                </Link>
                <Link
                  href="/login"
                  className="hover:text-primary flex items-center gap-4 pb-2"
                  onClick={() => setOpen(false)}
                >
                  <FaUser className="h-6 w-6" />
                  Login Admin
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
