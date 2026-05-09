"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardNavbar() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // ✅ get real stored auth object
    const authData = localStorage.getItem("auth");

    if (authData) {
      const parsed = JSON.parse(authData);
      setUser(parsed.user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">

      <div className="w-full px-2 md:px-4 py-3 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/dashboard">
          <span className="text-xl md:text-2xl font-black text-green-600 dark:text-green-400">
            SMS Dashboard
          </span>
        </Link>

        {/* LINKS (NEW) */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/about" className="hover:text-green-600 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-green-600 transition">
            Contact
          </Link>
        </div>

        {/* USER MENU */}
        <div className="relative">

          <Button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 h-9 px-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl"
          >

            <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white">
              <User size={16} />
            </div>

            <div className="text-left hidden md:block leading-tight">
              <p className="text-sm font-semibold">
                {user?.name || "Guest"}
              </p>
              <p className="text-xs text-gray-500">
                {user?.email || "Not signed in"}
              </p>
            </div>

          </Button>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 shadow-xl rounded-2xl border overflow-hidden">

              {/* USER INFO */}
              <div className="p-4 border-b">
                <p className="font-semibold">
                  {user?.name || "Guest"}
                </p>
                <p className="text-sm text-gray-500">
                  {user?.email || "No email"}
                </p>
              </div>

              {/* ABOUT / CONTACT (mobile fallback inside dropdown) */}
              <Link href="/about">
                <div className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm cursor-pointer">
                  About
                </div>
              </Link>

              <Link href="/contact">
                <div className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm cursor-pointer">
                  Contact
                </div>
              </Link>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-red-500"
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </nav>
  );
}