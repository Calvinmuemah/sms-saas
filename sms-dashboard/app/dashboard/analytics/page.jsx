"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Pie, Line } from "react-chartjs-2";
import { toast } from "sonner";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [messageStats, setMessageStats] = useState({ totalSMS: 0, delivered: 0, failed: 0 });

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("https://sms-saas-53mg.vercel.app/api/v1/analytics");
      const json = await res.json();
      setData(json);
    } catch {
      toast.error("Failed to load analytics");
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  useEffect(() => {
    const fetchMessageStats = async () => {
      try {
        const res = await fetch("https://sms-saas-53mg.vercel.app/api/v1/messages");
        if (!res.ok) {
          throw new Error("Failed to fetch message stats");
        }
        const data = await res.json();
        if (data.success && Array.isArray(data.messages)) {
          setMessageStats({
            totalSMS: data.messages.length,
            delivered: data.messages.filter((m) => m.status === "Success").length,
            failed: data.messages.filter((m) => m.status !== "Success").length,
          });
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (error) {
        console.error("Error fetching message stats:", error);
      }
    };

    fetchMessageStats();
  }, []);

  if (!data) return <p>Loading...</p>;

  const pieData = {
    labels: ["Delivered", "Failed"],
    datasets: [
      {
        data: [data.delivered, data.failed],
        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };

  const lineData = {
    labels: data.dates,
    datasets: [
      {
        label: "SMS Sent",
        data: data.smsTrend,
        borderColor: "#22c55e",
        tension: 0.4,
      },
    ],
  };

  const userStats = data.userStats;

  const userStatsData = [
    { title: "Total Users", value: userStats.totalUsers },
    { title: "Opted In", value: userStats.optedInUsers, color: "text-green-500" },
    { title: "Opted Out", value: userStats.optedOutUsers, color: "text-red-500" },
  ];

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">Analytics</h1>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card><CardContent className="p-6">
          <p>Total SMS</p>
          <h2 className="text-3xl font-bold">{messageStats.totalSMS}</h2>
        </CardContent></Card>

        <Card><CardContent className="p-6">
          <p>Delivered</p>
          <h2 className="text-3xl text-green-500">{messageStats.delivered}</h2>
        </CardContent></Card>

        <Card><CardContent className="p-6">
          <p>Failed</p>
          <h2 className="text-3xl text-red-500">{messageStats.failed}</h2>
        </CardContent></Card>
      </div>

      {/* Message Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <p>Total SMS</p>
            <h2 className="text-3xl font-bold">{messageStats.totalSMS}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p>Delivered</p>
            <h2 className="text-3xl text-green-500">{messageStats.delivered}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p>Failed</p>
            <h2 className="text-3xl text-red-500">{messageStats.failed}</h2>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">

        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4">Delivery Rate</h2>
            <Pie data={pieData} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4">SMS Trend</h2>
            <Line data={lineData} />
          </CardContent>
        </Card>

      </div>

      {/* User Stats */}
      <div className="mt-6">
        <h2 className="mb-4">User Statistics</h2>
        <ul>
          {userStatsData.map((item, index) => (
            <li key={index}>
              <p>{item.title}: {item.value}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* User Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {userStatsData.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <p>{stat.title}</p>
              <h2 className={`text-3xl font-bold ${stat.color || ""}`}>
                {stat.value}
              </h2>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}