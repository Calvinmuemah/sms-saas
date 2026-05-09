import Sidebar from "@/components/ui/Sidebar";
import DashboardNavbar from "@/components/ui/DashboardNavbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex flex-col w-full ml-64">

        {/* TOP NAVBAR */}
        <DashboardNavbar />

        {/* PAGE CONTENT */}
        <main className="flex-1 pt-16 p-2 md:p-4">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="text-center text-xs text-gray-500 py-4 border-t border-gray-200 dark:border-gray-800">
          © {new Date().getFullYear()} SMS SaaS Platform • All rights reserved
        </footer>

      </div>

    </div>
  );
}