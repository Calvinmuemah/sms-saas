"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { toast } from "sonner";
import Navbar from "@/components/ui/navbar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Define the User type
interface User {
  optedIn: boolean;
}

export default function Dashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]); // Explicitly type users
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Protect route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login"); // redirect to login if no token
    }
  }, [router]);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await fetch(
        "https://sms-saas-53mg.vercel.app/api/v1/users",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Send SMS
  const handleSend = async () => {
    if (!message.trim()) {
      toast.warning("Message cannot be empty");
      return;
    }

    try {
      setLoading(true);
      await fetch("https://sms-saas-53mg.vercel.app/api/v1/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ message }),
      });

      toast.success("SMS sent successfully 🚀");
      setMessage("");
      fetchUsers(); // refresh stats
    } catch (err) {
      toast.error("Failed to send SMS");
    } finally {
      setLoading(false);
    }
  };

  // Stats
  const totalUsers = users.length;
  const optedIn = users.filter((u) => u.optedIn).length;
  const optedOut = totalUsers - optedIn;

  const chartData = {
    labels: ["Opted In", "Opted Out"],
    datasets: [
      {
        data: [optedIn, optedOut],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />

      <div className="pt-24 max-w-7xl mx-auto px-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Monitor your SMS campaigns and user engagement
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { title: "Total Users", value: totalUsers },
            { title: "Opted In", value: optedIn, color: "text-green-500" },
            { title: "Opted Out", value: optedOut, color: "text-red-500" },
          ].map((stat, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }}>
              <Card className="shadow-lg rounded-2xl">
                <CardContent className="p-6">
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <h2 className={`text-3xl font-bold mt-2 ${stat.color || ""}`}>
                    {stat.value}
                  </h2>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Send SMS */}
          <div className="md:col-span-2">
            <Card className="shadow-xl rounded-2xl">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Send SMS</h2>
                <textarea
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                  rows={4}
                />

                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">{message.length} characters</p>

                  <Button
                    onClick={handleSend}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send SMS"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          <div>
            <Card className="shadow-xl rounded-2xl">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">User Distribution</h2>
                <Pie data={chartData} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Users */}
        <Card className="shadow-xl rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Users</h2>

            {users.length === 0 ? (
              <p className="text-gray-500">No users found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-2">Phone</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.slice(0, 5).map((u) => (
                      <tr
                        key={u._id}
                        className="border-b hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      >
                        <td className="py-2">{u.phone}</td>
                        <td>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              u.optedIn
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {u.optedIn ? "Opted In" : "Opted Out"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// "use client";

// import Link from "next/link";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import Navbar from "@/components/ui/navbar";

// export default function Home() {
//   const { scrollY } = useScroll();
//   const y1 = useTransform(scrollY, [0, 500], [0, 100]);
//   const y2 = useTransform(scrollY, [0, 500], [0, -150]);

//   return (
//     <div className="min-h-screen flex flex-col overflow-x-hidden bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      
//       {/* Navbar */}
//       <Navbar />

//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-r from-green-400 to-teal-600 overflow-hidden min-h-[90vh] flex items-center justify-center pt-20">
//         {/* Hero background illustration */}
//         <img
//           src="/hero-bg.png"
//           alt="Hero Illustration"
//           className="absolute inset-0 w-full h-full object-cover opacity-20"
//         />

//         {/* Moving SVG shapes */}
//         <motion.svg
//           style={{ y: y1 }}
//           className="absolute top-0 left-0 w-full h-full"
//           xmlns="http://www.w3.org/2000/svg"
//           preserveAspectRatio="none"
//           viewBox="0 0 1440 320"
//         >
//           <path
//             fill="#ffffff20"
//             d="M0,128L80,122.7C160,117,320,107,480,133.3C640,160,800,224,960,245.3C1120,267,1280,245,1360,234.7L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
//           />
//         </motion.svg>

//         <motion.svg
//           style={{ y: y2 }}
//           className="absolute bottom-0 right-0 w-full h-full rotate-180"
//           xmlns="http://www.w3.org/2000/svg"
//           preserveAspectRatio="none"
//           viewBox="0 0 1440 320"
//         >
//           <path
//             fill="#ffffff10"
//             d="M0,160L80,138.7C160,117,320,75,480,69.3C640,64,800,96,960,128C1120,160,1280,192,1360,208L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
//           />
//         </motion.svg>

//         {/* Hero Content */}
//         <motion.div
//           className="relative z-10 text-center px-6"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
//             SMS Dashboard
//           </h1>
//           <p className="text-lg md:text-2xl text-white/90 mb-6 drop-shadow-sm max-w-3xl mx-auto">
//             Send, manage, and track SMS messages in real-time. Keep your subscribers engaged with advanced analytics.
//           </p>

//           <Link href="/dashboard">
//             <Button className="px-8 py-3 text-lg bg-white text-green-600 font-bold hover:bg-gray-100 transition">
//               Go to Dashboard
//             </Button>
//           </Link>

//           <motion.div
//             className="mt-8 animate-bounce"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1.2, repeat: Infinity }}
//           >
//             <svg className="w-8 h-8 mx-auto text-white" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M10 14a1 1 0 01-.707-.293l-5-5a1 1 0 011.414-1.414L10 11.586l4.293-4.293a1 1 0 111.414 1.414l-5 5A1 1 0 0110 14z" clipRule="evenodd"/>
//             </svg>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 bg-gray-50 dark:bg-gray-800">
//         <motion.div
//           className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={{
//             hidden: { opacity: 0, y: 30 },
//             visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
//           }}
//         >
//           <Card className="shadow-xl rounded-xl hover:scale-105 transition-transform">
//             <CardContent>
//               <h3 className="text-xl font-bold mb-2">Send SMS</h3>
//               <p>Compose and send messages to all opted-in users with one click.</p>
//             </CardContent>
//           </Card>

//           <Card className="shadow-xl rounded-xl hover:scale-105 transition-transform">
//             <CardContent>
//               <h3 className="text-xl font-bold mb-2">User Management</h3>
//               <p>Track who opted in or out and manage your subscribers easily.</p>
//             </CardContent>
//           </Card>

//           <Card className="shadow-xl rounded-xl hover:scale-105 transition-transform">
//             <CardContent>
//               <h3 className="text-xl font-bold mb-2">Analytics</h3>
//               <p>Visualize delivery rates and opt-in statistics with charts and dashboards.</p>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </section>

//       {/* CTA + Dashboard Preview */}
//       <section className="py-16 bg-white dark:bg-gray-900">
//         <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
//           <motion.div
//             className="flex-1"
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <h2 className="text-4xl font-bold mb-4">See Your Dashboard in Action</h2>
//             <p className="text-gray-600 dark:text-gray-300 mb-6">
//               Monitor SMS delivery, user opt-ins, and campaign performance with our intuitive dashboard.
//             </p>
//             <Link href="/dashboard">
//               <Button className="px-8 py-3 text-lg bg-green-600 text-white font-bold hover:bg-green-700 transition">
//                 Go to Dashboard
//               </Button>
//             </Link>
//           </motion.div>

//           <motion.div
//             className="flex-1"
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <div className="border rounded-2xl shadow-2xl overflow-hidden">
//               <img
//                 src="/dashboard-preview.png"
//                 alt="Dashboard Preview"
//                 className="w-full h-auto object-cover"
//               />
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Client Logos / Testimonials */}
//       <section className="py-16 bg-gray-50 dark:bg-gray-800">
//         <div className="max-w-6xl mx-auto px-6 text-center">
//           <h3 className="text-3xl font-bold mb-8">Trusted by Clients</h3>
//           <div className="flex flex-wrap justify-center items-center gap-8">
//             <img src="/client1.png" alt="Client 1" className="h-12 grayscale hover:grayscale-0 transition"/>
//             <img src="/client2.png" alt="Client 2" className="h-12 grayscale hover:grayscale-0 transition"/>
//             <img src="/client3.png" alt="Client 3" className="h-12 grayscale hover:grayscale-0 transition"/>
//             <img src="/client4.png" alt="Client 4" className="h-12 grayscale hover:grayscale-0 transition"/>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-6 text-center">
//         <p>&copy; {new Date().getFullYear()} SMS Dashboard. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }
