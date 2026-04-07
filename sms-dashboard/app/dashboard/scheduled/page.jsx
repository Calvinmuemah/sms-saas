"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ScheduledPage() {
  const [schedules, setSchedules] = useState([]);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSchedules = async () => {
    try {
      const res = await fetch("/api/v1/scheduled");
      const data = await res.json();
      setSchedules(data);
    } catch {
      toast.error("Failed to load schedules");
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleSchedule = async () => {
    if (!message || !date) {
      toast.warning("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      await fetch("/api/v1/scheduled", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ message, scheduledAt: date }),
      });

      toast.success("Scheduled successfully ⏰");
      setMessage("");
      setDate("");
      fetchSchedules();
    } catch {
      toast.error("Failed to schedule");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      await fetch(`/api/v1/scheduled/${id}`, {
        method: "DELETE",
      });

      toast.success("Schedule cancelled");
      fetchSchedules();
    } catch {
      toast.error("Failed to cancel");
    }
  };

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">Scheduled SMS</h1>
        <p className="text-gray-500">Plan messages for later delivery</p>
      </div>

      {/* Create */}
      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Schedule Message</h2>

          <textarea
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-4 rounded-lg border dark:bg-gray-800"
          />

          <Input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <Button onClick={handleSchedule} disabled={loading}>
            {loading ? "Scheduling..." : "Schedule"}
          </Button>
        </CardContent>
      </Card>

      {/* List */}
      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Messages</h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {schedules.map((s) => (
                <tr key={s._id} className="border-b">
                  <td>{s.message}</td>
                  <td>{new Date(s.scheduledAt).toLocaleString()}</td>

                  <td>
                    <span className="text-yellow-500 text-xs">
                      {s.status || "pending"}
                    </span>
                  </td>

                  <td>
                    <Button size="sm" onClick={() => handleCancel(s._id)}>
                      Cancel
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

    </div>
  );
}