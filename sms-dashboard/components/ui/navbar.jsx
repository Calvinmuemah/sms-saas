"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <nav className="w-full fixed top-0 left-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link href="/">
          <span className="text-2xl font-bold text-green-600 dark:text-green-400">
            SMS Dashboard
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-green-600 dark:hover:text-green-400 transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-green-600 dark:hover:text-green-400 transition">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-green-600 dark:hover:text-green-400 transition">
            Contact Us
          </Link>
          <Link href="/dashboard">
            <Button className="px-4 py-2 bg-green-600 text-white font-semibold hover:bg-green-700 transition">
              Dashboard
            </Button>
          </Link>

          {/* Dark Mode Toggle */}
          <Button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded"
          >
            {darkMode ? "Light" : "Dark"}
          </Button>
        </div>
      </div>
    </nav>
  );
}