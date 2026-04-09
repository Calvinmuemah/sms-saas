"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/ui/navbar";
import { Card, CardContent } from "@/components/ui/card";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://sms-saas-53mg.vercel.app/api/v1/messages")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch messages");
        }
        return res.json();
      })
      .then((data) => {
        setMessages(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />

      <div className="pt-24 max-w-7xl mx-auto px-6 space-y-6">
        <h1 className="text-3xl font-bold">Messages</h1>

        {loading && <p className="text-center">Loading messages...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <Card className="shadow-xl rounded-2xl">
            <CardContent className="p-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-2">Message</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((m) => (
                    <tr
                      key={m._id}
                      className="border-b hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <td className="py-2">{m.message}</td>
                      <td>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600">
                          {m.status || "Sent"}
                        </span>
                      </td>
                      <td>{new Date(m.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}