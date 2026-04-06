"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    await fetch("https://sms-saas-53mg.vercel.app/api/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    setMessage("");
  };

  // Stats
  const totalUsers = users.length;
  const optedIn = users.filter(u => u.optedIn).length;
  const optedOut = totalUsers - optedIn;

  // Chart Data
  const chartData = {
    labels: ["Opted In", "Opted Out"],
    datasets: [
      {
        label: "# of Users",
        data: [optedIn, optedOut],
        backgroundColor: ["#34D399", "#F87171"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 grid gap-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-lg rounded-xl">
          <CardContent>
            <h2 className="text-lg font-bold">Total Users</h2>
            <p className="text-2xl mt-2">{totalUsers}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-xl">
          <CardContent>
            <h2 className="text-lg font-bold">Opted In</h2>
            <p className="text-2xl mt-2 text-green-600">{optedIn}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-xl">
          <CardContent>
            <h2 className="text-lg font-bold">Opted Out</h2>
            <p className="text-2xl mt-2 text-red-600">{optedOut}</p>
          </CardContent>
        </Card>
      </div>

      {/* Send SMS */}
      <div className="mt-4">
        <Card className="shadow-xl rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-2">Send SMS</h2>
            <div className="flex gap-2">
              <Input
                placeholder="Enter message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button onClick={handleSend}>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users List */}
      <div className="mt-4">
        <Card className="shadow-xl rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-4">Users</h2>
            {users.map(u => (
              <div
                key={u._id}
                className="flex justify-between border p-2 rounded mb-2"
              >
                <span>{u.phone}</span>
                <span className={u.optedIn ? "text-green-600" : "text-red-600"}>
                  {u.optedIn ? "Opted In" : "Opted Out"}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Message Logs Chart */}
      <div className="mt-4">
        <Card className="shadow-xl rounded-2xl">
          <CardContent>
            <h2 className="text-xl font-bold mb-4">Users Opt-in Status</h2>
            <Pie data={chartData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}