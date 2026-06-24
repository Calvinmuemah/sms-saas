"use client";

import { useState } from "react";
import Sidebar from "@/components/ui/Sidebar";
import DashboardNavbar from "@/components/ui/DashboardNavbar";
import Footer from "@/components/ui/Footer";

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    // If screen width is less than 768px, toggle mobile drawer. Else toggle desktop collapse.
    if (window.innerWidth < 768) {
      setIsMobileOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Mobile background overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/45 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* MAIN AREA */}
      <div
        className={`flex flex-col flex-1 min-h-screen transition-all duration-300 ml-0 ${
          isCollapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        {/* TOP NAVBAR */}
        <DashboardNavbar
          isSidebarCollapsed={isCollapsed}
          onToggleSidebar={toggleSidebar}
        />

        {/* PAGE CONTENT AREA */}
        <main className="flex-1 pt-20 px-2 sm:px-4 md:px-6 lg:px-8">
          {children}
        </main>

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
}