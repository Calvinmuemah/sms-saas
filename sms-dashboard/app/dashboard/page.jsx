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

export default function Dashboard() {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [numbers, setNumbers] = useState("");
  const [parsedNumbers, setParsedNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Protect route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/auth/login");
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
    } catch {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Parse numbers (comma / newline)
  useEffect(() => {
    const list = numbers
      .split(/[\n,]+/)
      .map((n) => n.trim())
      .filter((n) => n.length > 0);

    setParsedNumbers(list);
  }, [numbers]);

  // Handle file upload (CSV/TXT)
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();

    setNumbers((prev) => prev + "\n" + text);
    toast.success("Numbers loaded from file 📂");
  };

  // Send SMS
  const handleSend = async () => {
    if (!message.trim()) return toast.warning("Message is empty");
    if (parsedNumbers.length === 0)
      return toast.warning("Add at least one phone number");

    try {
      setLoading(true);

      await fetch("https://sms-saas-53mg.vercel.app/api/v1/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          message,
          numbers: parsedNumbers,
        }),
      });

      toast.success(`SMS sent to ${parsedNumbers.length} users 🚀`);
      setMessage("");
      setNumbers("");
    } catch {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="pt-24 max-w-7xl mx-auto px-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">SMS Dashboard</h1>
          <p className="text-gray-500">
            Send bulk SMS and manage your campaigns
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
                  <h2 className={`text-3xl font-bold ${stat.color || ""}`}>
                    {stat.value}
                  </h2>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Section */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* SMS FORM */}
          <div className="md:col-span-2">
            <Card className="shadow-xl rounded-2xl">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Send Bulk SMS</h2>

                {/* Numbers Input */}
                <textarea
                  placeholder="Enter phone numbers (comma or new line separated)"
                  value={numbers}
                  onChange={(e) => setNumbers(e.target.value)}
                  className="w-full p-4 rounded-lg border bg-gray-50 dark:bg-gray-800"
                  rows={4}
                />

                {/* Upload */}
                <input
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="text-sm"
                />

                {/* Count */}
                <p className="text-sm text-gray-500">
                  {parsedNumbers.length} numbers loaded
                </p>

                {/* Message */}
                <textarea
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-4 rounded-lg border bg-gray-50 dark:bg-gray-800"
                  rows={4}
                />

                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    {message.length} characters
                  </p>

                  <Button
                    onClick={handleSend}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {loading ? "Sending..." : "Send SMS"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
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
    </div>
  );
}