"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState(""); // New state for recipient
  const [recipients, setRecipients] = useState([]); // State to store recipients
  const [loading, setLoading] = useState(false);

  // Fetch campaigns
  const fetchCampaigns = async () => {
    try {
      const res = await fetch("https://sms-saas-53mg.vercel.app/api/v1/campaigns");
      const data = await res.json();
      if (data.success) {
        setCampaigns(data.data);
      } else {
        console.error("API Error: ", data);
        toast.error("Failed to load campaigns");
      }
    } catch (error) {
      console.error("Fetch Error: ", error);
      toast.error("Failed to load campaigns");
    }
  };

  // Fetch recipients
  const fetchRecipients = async () => {
    try {
      const res = await fetch("https://sms-saas-53mg.vercel.app/api/v1/recipients");
      const data = await res.json();
      if (data.success) {
        setRecipients(data.data);
      } else {
        toast.error("Failed to load recipients");
      }
    } catch {
      toast.error("Failed to load recipients");
    }
  };

  useEffect(() => {
    fetchCampaigns();
    fetchRecipients(); // Fetch recipients on page load
  }, []);

  // Create campaign
  const handleCreate = async () => {
    if (!name || !message || !recipient) {
      toast.warning("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      await fetch("https://sms-saas-53mg.vercel.app/api/v1/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, recipient }),
      });

      toast.success("Campaign created");
      setName("");
      setMessage("");
      setRecipient("");
      fetchCampaigns();
    } catch {
      toast.error("Failed to create campaign");
    } finally {
      setLoading(false);
    }
  };

  // Send campaign
  const handleSend = async (id) => {
    try {
      await fetch(`https://sms-saas-53mg.vercel.app/api/v1/campaigns/${id}/send`, {
        method: "POST",
      });

      toast.success("Campaign sent 🚀");
      fetchCampaigns();
    } catch {
      toast.error("Failed to send campaign");
    }
  };

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <p className="text-gray-500">Manage and send SMS campaigns</p>
      </div>

      {/* Create Campaign */}
      <Card className="shadow-xl rounded-2xl">
        <CardContent className="space-y-4">
          <Input
            placeholder="Campaign Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Select onValueChange={(value) => setRecipient(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Recipient Group" />
            </SelectTrigger>
            <SelectContent>
              {recipients.map((group) => (
                <SelectItem key={group.id} value={group.id}>
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <textarea
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-4 rounded-lg border"
            rows={4}
          />

          <Button
            onClick={handleCreate}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {loading ? "Creating..." : "Create Campaign"}
          </Button>
        </CardContent>
      </Card>

      {/* Campaigns Table */}
      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">All Campaigns</h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th>Name</th>
                <th>Status</th>
                <th>Recipients</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {campaigns.map((c) => (
                <tr key={c._id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-800">
                  <td className="py-2">{c.name}</td>

                  <td>
                    <span className={`px-2 py-1 rounded text-xs ${
                      c.status === "sent"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}>
                      {c.status}
                    </span>
                  </td>

                  <td>{c.recipients || 0}</td>

                  <td>
                    <Button size="sm" onClick={() => handleSend(c._id)}>
                      Send
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