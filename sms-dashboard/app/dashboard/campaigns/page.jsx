"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Megaphone,
  Send,
  RefreshCw,
  Search,
  X,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api";

const API = API_BASE_URL;

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [recipients, setRecipients] = useState([]);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");

  const fetchCampaigns = async () => {
    try {
      const res = await fetch(`${API}/campaigns`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setCampaigns(data.data || []);
    } catch {
      toast.error("Failed to load campaigns");
    }
  };

  const fetchRecipients = async () => {
    try {
      const res = await fetch(`${API}/recipients`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setRecipients(data.data || []);
    } catch {
      toast.error("Failed to load recipients");
    }
  };

  useEffect(() => {
    fetchCampaigns();
    fetchRecipients();
  }, []);

  const filtered = useMemo(() => {
    return campaigns.filter((c) =>
      c.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, campaigns]);

  const resetForm = () => {
    setName("");
    setMessage("");
    setRecipient("");
  };

  const handleCreate = async () => {
    if (!name || !message || !recipient)
      return toast.warning("Fill all fields");

    try {
      setLoading(true);

      await fetch(`${API}/campaigns`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, message, recipient }),
      });

      toast.success("Campaign created");
      setShowModal(false);
      resetForm();
      fetchCampaigns();
    } catch {
      toast.error("Failed to create campaign");
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (id) => {
    try {
      await fetch(`${API}/campaigns/${id}/send`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Campaign sent 🚀");
      fetchCampaigns();
    } catch {
      toast.error("Failed to send campaign");
    }
  };

  return (
    <div className="space-y-6 px-3 md:px-4">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-black">Campaigns</h1>
        <p className="text-gray-500 mt-1">
          Manage and send SMS campaigns
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 gap-4">

        <Card className="rounded-3xl shadow-xl border-0">
          <CardContent className="p-5 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Campaigns</p>
              <h2 className="text-3xl font-black">{campaigns.length}</h2>
            </div>
            <Megaphone className="text-green-600" size={28} />
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-xl border-0">
          <CardContent className="p-5 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Recipients</p>
              <h2 className="text-3xl font-black">{recipients.length}</h2>
            </div>
            <Send className="text-green-600" size={28} />
          </CardContent>
        </Card>

      </div>

      {/* ACTION BAR */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

        <div className="relative w-full md:w-[260px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search campaigns..."
            className="h-10 pl-10 rounded-xl"
          />
        </div>

        <div className="flex gap-2">

          <Button
            onClick={() => setShowModal(true)}
            className="bg-green-600 hover:bg-green-700 h-10 rounded-xl"
          >
            + Create Campaign
          </Button>

          <Button
            onClick={() => {
              fetchCampaigns();
              fetchRecipients();
            }}
            variant="outline"
            className="h-10 rounded-xl"
          >
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>

        </div>

      </div>

      {/* TABLE */}
      <Card className="rounded-3xl shadow-2xl border-0 overflow-hidden">
        <CardContent className="p-0">

          <div className="p-4 bg-green-50 border-b">
            <h2 className="font-bold">All Campaigns</h2>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[650px] text-sm">

              <thead>
                <tr className="text-left border-b">
                  <th className="p-3">#</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Recipients</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((c, i) => (
                  <tr key={c.id} className="border-b hover:bg-green-50">

                    <td className="p-3 font-bold text-gray-500">
                      {i + 1}
                    </td>

                    <td className="p-3 font-semibold">{c.name}</td>

                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        c.status === "sent"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {c.status}
                      </span>
                    </td>

                    <td className="p-3">{c.recipients || 0}</td>

                    <td className="p-3">
                      <Button
                        size="sm"
                        onClick={() => handleSend(c.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Send
                      </Button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </CardContent>
      </Card>

      {/* CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-3 z-50">

          <div className="bg-white w-full max-w-lg rounded-2xl p-5 space-y-4 animate-in fade-in zoom-in-95">

            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Create Campaign</h2>
              <button onClick={() => setShowModal(false)}>
                <X />
              </button>
            </div>

            {/* FORM */}
            <Input
              placeholder="Campaign name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 rounded-xl"
            />

            <Select onValueChange={setRecipient}>
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue placeholder="Select recipient group" />
              </SelectTrigger>
              <SelectContent>
                {recipients.map((g) => (
                  <SelectItem key={g.id} value={g.id}>
                    {g.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Message..."
              className="w-full border rounded-xl p-3"
            />

            {/* ACTIONS */}
            <div className="flex justify-end gap-2">

              <Button
                variant="outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>

              <Button
                onClick={handleCreate}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700"
              >
                {loading ? "Creating..." : "Create"}
              </Button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}