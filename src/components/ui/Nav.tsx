"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CubeLogo from "./CubeLogo";
import { CAL_LINK } from "@/lib/constants";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 sm:px-10"
        style={{
          background: "rgba(10,10,10,0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <a href="#" className="flex items-center gap-2">
          <CubeLogo size={24} />
          <span className="text-sm font-semibold tracking-[0.15em] text-foreground">
            FOUNDOS
          </span>
        </a>
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hidden text-sm sm:block"
              style={{ color: "#8a8f98" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block rounded-md border px-4 py-2 text-sm font-medium transition-all duration-200"
            style={{
              borderColor: "rgba(255,255,255,0.25)",
              color: "#f7f8f8",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
              e.currentTarget.style.boxShadow =
                "0 0 15px rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Book a Call
          </a>
          {/* Hamburger — mobile only */}
          <button
            className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-5 h-px bg-white"
              animate={
                menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-px bg-white"
              animate={
                menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 sm:hidden"
            style={{ background: "rgba(10,10,10,0.97)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-2xl font-semibold"
                style={{ color: "#f7f8f8" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.1 }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 rounded-md border px-8 py-3.5 text-base font-semibold"
              style={{
                borderColor: "rgba(255,255,255,0.3)",
                color: "#f7f8f8",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => setMenuOpen(false)}
            >
              Book a Call
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
