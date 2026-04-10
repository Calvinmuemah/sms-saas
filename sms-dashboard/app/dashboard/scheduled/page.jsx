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
  const [recipients, setRecipients] = useState([]); // Selected recipients
  const [manualRecipient, setManualRecipient] = useState(""); // For manual input
  const [existingRecipients, setExistingRecipients] = useState([]); // Existing recipients
  const [loading, setLoading] = useState(false);

  const fetchSchedules = async () => {
    try {
      const res = await fetch("https://sms-saas-53mg.vercel.app/api/v1/scheduled");
      const data = await res.json();
      setSchedules(Array.isArray(data) ? data : []); // Ensure data is an array
    } catch {
      toast.error("Failed to load schedules");
    }
  };

  const fetchExistingRecipients = async () => {
    try {
      const res = await fetch("https://sms-saas-53mg.vercel.app/api/v1/recipients");
      const data = await res.json();
      console.log("Recipients API Response:", data); // Debugging log
      setExistingRecipients(Array.isArray(data) ? data : []); // Ensure data is an array
    } catch (error) {
      console.error("Error fetching recipients:", error); // Log errors
      toast.error("Failed to load recipients");
    }
  };

  useEffect(() => {
    fetchSchedules();
    fetchExistingRecipients();
  }, []);

  const handleAddRecipient = () => {
    if (manualRecipient) {
      setRecipients([...recipients, manualRecipient]);
      setManualRecipient("");
    }
  };

  const handleSelectRecipient = (recipient) => {
    if (!recipients.includes(recipient)) {
      setRecipients([...recipients, recipient]);
    }
  };

  const handleSchedule = async () => {
    if (!message || !date || recipients.length === 0) {
      toast.warning("Fill all fields and add at least one recipient");
      return;
    }

    try {
      setLoading(true);

      const formattedDate = new Date(date).toISOString(); // Ensure ISO format

      await fetch("https://sms-saas-53mg.vercel.app/api/v1/scheduled", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, scheduledAt: formattedDate, recipients }),
      });

      toast.success("Scheduled successfully 0");
      setMessage("");
      setDate("");
      setRecipients([]);
      fetchSchedules();
    } catch {
      toast.error("Failed to schedule");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      await fetch(`https://sms-saas-53mg.vercel.app/api/v1/scheduled/${id}`, {
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
          <div className="flex space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-medium">Input Numbers</h3>
              <Input
                type="text"
                placeholder="Enter phone number"
                value={manualRecipient}
                onChange={(e) => setManualRecipient(e.target.value)}
              />
              <Button onClick={handleAddRecipient} className="mt-2">
                Add Number
              </Button>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium">Select Existing Recipients</h3>
              <select
                className="w-full p-2 border rounded-lg"
                onChange={(e) => handleSelectRecipient(e.target.value)}
              >
                <option value="">Select a recipient</option>
                {existingRecipients.map((recipient) => (
                  <option key={recipient.id} value={recipient.phone}>
                    {recipient.phone}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <ul className="mt-4">
            {recipients.map((r, index) => (
              <li key={index}>{r}</li>
            ))}
          </ul>
          <Button onClick={handleSchedule} disabled={loading}>
            {loading ? "Scheduling..." : "Schedule"}
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Messages</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th>Message</th>
                <th>Date</th>
                <th>Recipients</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((s) => (
                <tr key={s._id} className="border-b">
                  <td>{s.message}</td>
                  <td>{new Date(s.scheduledAt).toLocaleString()}</td>
                  <td>{Array.isArray(s.recipients) ? s.recipients.join(", ") : "No recipients"}</td>
                  <td>
                    <Button onClick={() => handleCancel(s._id)}>Cancel</Button>
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