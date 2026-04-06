"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/ui/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    const res = await fetch("https://sms-saas-53mg.vercel.app/api/v1/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSend = async () => {
    if (!message.trim()) return;

    await fetch("https://sms-saas-53mg.vercel.app/api/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    setMessage("");
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
            Overview of your SMS activity
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
                  <p className="text-sm text-gray-500">
                    {message.length} characters
                  </p>

                  <Button
                    onClick={handleSend}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Send SMS
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          <div>
            <Card className="shadow-xl rounded-2xl">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">
                  User Distribution
                </h2>
                <Pie data={chartData} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Users Table */}
        <Card className="shadow-xl rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Users</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2">Phone</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}