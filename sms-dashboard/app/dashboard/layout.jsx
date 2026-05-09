import Sidebar from "@/components/ui/Sidebar";
import DashboardNavbar from "@/components/ui/DashboardNavbar";
import Footer from "@/components/ui/Footer";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex flex-col flex-1 ml-64 min-h-screen">

        {/* TOP NAVBAR */}
        <DashboardNavbar />

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