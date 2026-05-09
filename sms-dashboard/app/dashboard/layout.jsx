import Sidebar from "@/components/ui/Sidebar";
import DashboardNavbar from "@/components/ui/DashboardNavbar";
import Footer from "@/components/ui/Footer";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex flex-col w-full ml-64">

        {/* ALWAYS DASHBOARD NAVBAR */}
        <DashboardNavbar />

        {/* PAGE CONTENT */}
        <main className="flex-1 pt-16 p-2 md:p-3">
          {children}
        </main>

        {/* FOOTER */}
        <Footer />

      </div>

    </div>
  );
}