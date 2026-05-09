"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <nav className="w-full fixed top-0 left-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">

      <div className="w-full px-2 md:px-4 py-3 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/">
          <span className="text-xl md:text-2xl font-black text-green-600 dark:text-green-400">
            SMS Dashboard
          </span>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 md:gap-5 text-sm md:text-base">

          <Link href="/about" className="hover:text-green-600 transition">
            About
          </Link>

          <Link href="/contact" className="hover:text-green-600 transition">
            Contact
          </Link>

          {/* DARK MODE ICON */}
          <Button
            onClick={() => setDarkMode(!darkMode)}
            className="h-9 w-9 p-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

        </div>

      </div>

    </nav>
  );
}