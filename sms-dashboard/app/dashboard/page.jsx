"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { toast } from "sonner";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [numbers, setNumbers] = useState("");
  const [parsedNumbers, setParsedNumbers] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const fetchUsers = async () => {
    try {
      const res = await fetch("https://sms-saas-53mg.vercel.app/api/v1/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setUsers(data);
    } catch {
      toast.error("Failed to load users");
    }
  };

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
      if (data.success) setUserCounts(data.data);
    } catch {
      toast.error("Failed to fetch user counts");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchUserCounts();
  }, []);

  useEffect(() => {
    setParsedNumbers(
      numbers
        .split(/[\n,]+/)
        .map((n) => n.trim())
        .filter(Boolean)
    );
  }, [numbers]);

  const handleSend = async () => {
    if (!message.trim()) return toast.warning("Message is empty");
    if (!parsedNumbers.length)
      return toast.warning("Add at least one number");

    try {
      setLoading(true);
      setResult(null);

      const res = await fetch("https://sms-saas-53mg.vercel.app/api/v1/send", {
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

  const chartData = {
    labels: ["Opted In", "Opted Out"],
    datasets: [
      {
        data: [opted_in_users, opted_out_users],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">
          SMS Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Send bulk SMS and manage campaigns
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {[
          { title: "Total Users", value: total_users },
          { title: "Opted In", value: opted_in_users, color: "text-green-500" },
          { title: "Opted Out", value: opted_out_users, color: "text-red-500" },
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ scale: 1.03 }}>
            <Card className="shadow-md rounded-2xl border-0">
              <CardContent className="p-5">
                <p className="text-xs text-gray-500">{stat.title}</p>
                <h2 className={`text-2xl font-bold ${stat.color || ""}`}>
                  {stat.value}
                </h2>
              </CardContent>
            </Card>
          </motion.div>
        ))}

      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-4">

        {/* FORM */}
        <div className="lg:col-span-2 space-y-4">

          <Card className="rounded-2xl border-0 shadow-lg">
            <CardContent className="p-5 space-y-4">

              <h2 className="font-semibold text-lg">Send Bulk SMS</h2>

              <textarea
                placeholder="Enter numbers (comma or new line)"
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
                className="w-full p-3 rounded-xl border"
                rows={3}
              />

              <textarea
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 rounded-xl border"
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

          {/* RESULT */}
          {result && (
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardContent className="p-5 space-y-3">

                <h2 className="font-semibold">Delivery Report</h2>

                <div className="flex gap-4 text-sm">
                  <p>Total: {result.total}</p>
                  <p className="text-green-600">
                    Success: {result.successful}
                  </p>
                  <p className="text-red-600">
                    Failed: {result.failed?.length || 0}
                  </p>
                </div>

              </CardContent>
            </Card>
          )}

        </div>

        {/* CHART */}
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardContent className="p-5">
            <h2 className="font-semibold mb-3">User Distribution</h2>
            <Pie data={chartData} />
          </CardContent>
        </Card>

      </div>

    </div>
  );
}