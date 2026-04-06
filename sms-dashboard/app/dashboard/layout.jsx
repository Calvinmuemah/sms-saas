import Sidebar from "@/components/ui/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 w-full min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        {children}
      </main>

    </div>
  );
}