"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Menu, Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardNavbar({ isSidebarCollapsed, onToggleSidebar }) {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const parsed = JSON.parse(authData);
      setUser(parsed.user);
    }
    
    // Sync dark mode state from documentElement
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    setUser(null);
    router.replace("/auth/login");
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav
      className={`fixed top-0 right-0 z-30 transition-all duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-150/60 dark:border-gray-800/60 shadow-sm left-0 ${
        isSidebarCollapsed ? "md:left-20" : "md:left-64"
      }`}
    >
      <div className="w-full px-4 py-3 flex justify-between items-center">
        
        {/* LEFT SIDE: TOGGLE & WORKSPACE TITLE */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl text-gray-500 dark:text-gray-400 transition cursor-pointer active:scale-95"
            title="Toggle Sidebar"
          >
            <Menu size={18} />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-green-500/10 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider hidden sm:inline-block">
              Workspace
            </span>
            <span className="text-sm font-bold text-gray-800 dark:text-white">
              Console
            </span>
          </div>
        </div>

        {/* RIGHT SIDE: TOOLS & PROFILE */}
        <div className="flex items-center gap-4">
          
          {/* DARK MODE SWITCHER */}
          <Button
            onClick={toggleDarkMode}
            variant="ghost"
            className="h-9 w-9 p-0 flex items-center justify-center bg-gray-50 dark:bg-gray-850 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 cursor-pointer"
            title="Toggle Theme"
          >
            {darkMode ? <Sun size={16} className="text-yellow-500" /> : <Moon size={16} className="text-gray-500" />}
          </Button>

          {/* USER MENU */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2.5 h-10 px-3 bg-gray-50 dark:bg-gray-850 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-xl transition duration-150 cursor-pointer text-left"
            >
              <div className="w-7 h-7 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold text-xs shadow-inner">
                {user?.name ? user.name[0].toUpperCase() : "G"}
              </div>

              <div className="hidden md:block leading-tight pr-1">
                <p className="text-xs font-bold text-gray-800 dark:text-white">
                  {user?.name || "Guest"}
                </p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate max-w-[120px]">
                  {user?.email || "not logged in"}
                </p>
              </div>
            </button>

            {/* DROPDOWN */}
            {open && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50 animate-fade-in">
                {/* USER INFO */}
                <div className="p-4 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700">
                  <p className="font-extrabold text-xs text-gray-400 uppercase tracking-wider">Signed in as</p>
                  <p className="font-bold text-gray-800 dark:text-white mt-1 truncate">{user?.name || "Guest"}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email || "No email"}</p>
                </div>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-red-50 dark:hover:bg-red-950/20 text-xs font-bold text-red-600 dark:text-red-400 transition cursor-pointer"
                >
                  Sign Out Workspace
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
}