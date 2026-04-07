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

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/v1/analytics");
      const json = await res.json();
      setData(json);
    } catch {
      toast.error("Failed to load analytics");
    }
  };

  useEffect(() => {
    fetchAnalytics();
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

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">Analytics</h1>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card><CardContent className="p-6">
          <p>Total SMS</p>
          <h2 className="text-3xl font-bold">{data.totalSMS}</h2>
        </CardContent></Card>

        <Card><CardContent className="p-6">
          <p>Delivered</p>
          <h2 className="text-3xl text-green-500">{data.delivered}</h2>
        </CardContent></Card>

        <Card><CardContent className="p-6">
          <p>Failed</p>
          <h2 className="text-3xl text-red-500">{data.failed}</h2>
        </CardContent></Card>
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
    </div>
  );
}