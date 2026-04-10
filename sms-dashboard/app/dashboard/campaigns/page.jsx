"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch campaigns
  const fetchCampaigns = async () => {
    try {
      const res = await fetch("https://sms-saas-53mg.vercel.app/api/v1/campaigns");
      const data = await res.json();
      setCampaigns(data);
    } catch {
      toast.error("Failed to load campaigns");
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Create campaign
  const handleCreate = async () => {
    if (!name || !message) {
      toast.warning("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      await fetch("https://sms-saas-53mg.vercel.app/api/v1/campaigns", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name, message }),
      });

      toast.success("Campaign created");
      setName("");
      setMessage("");
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
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Create Campaign</h2>

          <Input
            placeholder="Campaign Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-4 rounded-lg border dark:bg-gray-800"
          />

          <Button onClick={handleCreate} disabled={loading}>
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