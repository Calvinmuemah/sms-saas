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

  // 🔥 NEW STATES
  const [result, setResult] = useState(null);
  const [userCounts, setUserCounts] = useState({
    total_users: 0,
    opted_in_users: 0,
    opted_out_users: 0,
  });

  const { total_users, opted_in_users, opted_out_users } = userCounts;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/auth/login");
  }, [router]);

  // const fetchUsers = async () => {
  //   try {
  //     const res = await fetch(
  //       "https://sms-saas-53mg.vercel.app/api/v1/users",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     const data = await res.json();
  //     setUsers(data);
  //   } catch {
  //     toast.error("Failed to load users");
  //   }
  // };

  const fetchUserCounts = async () => {
    try {
      const res = await fetch(
        "https://sms-saas-53mg.vercel.app/api/v1/users/counts",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        setUserCounts(data.data);
      } else {
        toast.error("Failed to fetch user counts");
      }
    } catch {
      toast.error("Failed to fetch user counts");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchUserCounts();
  }, []);

  // Parse numbers
  useEffect(() => {
    const list = numbers
      .split(/[\n,]+/)
      .map((n) => n.trim())
      .filter((n) => n.length > 0);

    setParsedNumbers(list);
  }, [numbers]);

  // File upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    setNumbers((prev) => prev + "\n" + text);
    toast.success("Numbers loaded 📂");
  };

  // 🔥 SEND SMS WITH RESPONSE HANDLING
  const handleSend = async () => {
    if (!message.trim()) return toast.warning("Message is empty");
    if (parsedNumbers.length === 0)
      return toast.warning("Add at least one number");

    try {
      setLoading(true);
      setResult(null);

      const res = await fetch(
        "https://sms-saas-53mg.vercel.app/api/v1/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            message,
            numbers: parsedNumbers,
          }),
        }
      );

      const data = await res.json();

      setResult(data);

      toast.success(`Processed ${data.total} numbers 🚀`);
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
            Send bulk SMS and manage campaigns
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { title: "Total Users", value: total_users },
            { title: "Opted In", value: opted_in_users, color: "text-green-500" },
            { title: "Opted Out", value: opted_out_users, color: "text-red-500" },
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

        {/* Main */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* FORM */}
          <div className="md:col-span-2">
            <Card className="shadow-xl rounded-2xl">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Send Bulk SMS</h2>

                <textarea
                  placeholder="Enter numbers (comma or new line)"
                  value={numbers}
                  onChange={(e) => setNumbers(e.target.value)}
                  className="w-full p-4 rounded-lg border"
                  rows={4}
                />

                <input
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                />

                <p className="text-sm text-gray-500">
                  {parsedNumbers.length} numbers loaded
                </p>

                <textarea
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-4 rounded-lg border"
                  rows={4}
                />

                <Button
                  onClick={handleSend}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {loading ? "Sending..." : "Send SMS"}
                </Button>
              </CardContent>
            </Card>

            {/* 🔥 RESULTS UI */}
            {result && (
              <Card className="mt-6 shadow-xl rounded-2xl">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">
                    Delivery Report
                  </h2>

                  <div className="flex gap-6 text-sm">
                    <p>Total: {result.total}</p>
                    <p className="text-green-600">
                      Successful: {result.successful}
                    </p>
                    <p className="text-red-600">
                      Failed: {result.failed?.length || 0}
                    </p>
                  </div>

                  {/* FAILED LIST */}
                  {result.failed?.length > 0 && (
                    <div className="space-y-3">
                      {result.failed.map((f, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-lg border bg-red-50 dark:bg-red-900/20"
                        >
                          <p className="font-medium">{f.phone}</p>
                          <p className="text-sm text-red-500">
                            {f.status}
                          </p>

                          {f.status === "UserInBlacklist" && (
                            <p className="text-sm mt-2 text-yellow-600">
                              ⚠️ This user has unsubscribed. Ask them to send
                              <strong> START</strong> to receive messages again.
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
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