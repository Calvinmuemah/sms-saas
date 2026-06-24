"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  MessageSquare,
  CheckCircle2,
  XCircle,
  RefreshCw,
  DollarSign,
  CalendarDays,
  Eye,
  X,
} from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

import Navbar from "@/components/ui/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  // FETCH MESSAGES
  const fetchMessages = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API_BASE_URL}/messages`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await res.json();

      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages);
        setFilteredMessages(data.messages);
        setError(null);
      } else {
        throw new Error("Unexpected data format");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // SEARCH FILTER
  useEffect(() => {
    const filtered = messages.filter(
      (m) =>
        m.phone?.toLowerCase().includes(search.toLowerCase()) ||
        m.message?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredMessages(filtered);
  }, [search, messages]);

  // STATS
  const stats = useMemo(() => {
    const success = messages.filter(
      (m) => m.status === "Success"
    ).length;

    const failed = messages.filter(
      (m) => m.status !== "Success"
    ).length;

    return {
      total: messages.length,
      success,
      failed,
    };
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50/40 to-white text-gray-900">

      <Navbar />

      {/* SMALLER SIDE MARGINS */}
      <div className="pt-24 pb-10 px-3 md:px-4">

        {/* WIDER CONTAINER */}
        <div className="max-w-full space-y-8">

          {/* HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div>
              <h1 className="text-4xl font-black tracking-tight">
                Messages
              </h1>

              <p className="text-gray-500 mt-2">
                Monitor SMS delivery reports and message activity
              </p>
            </div>

            {/* SEARCH + REFRESH */}
            <div className="flex flex-col sm:flex-row gap-3">

              <div className="relative w-full sm:w-[320px]">

                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <Input
                  placeholder="Search messages..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-11 pl-11 rounded-2xl border-gray-200 focus-visible:ring-green-500"
                />

              </div>

              <button
                onClick={fetchMessages}
                className="h-11 px-5 rounded-2xl bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
              >
                <RefreshCw size={17} />
                Refresh
              </button>

            </div>

          </div>

          {/* STATS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* TOTAL */}
            <Card className="rounded-3xl border-0 shadow-xl bg-white">
              <CardContent className="p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-gray-500">
                      Total Messages
                    </p>

                    <h2 className="text-3xl font-black mt-2">
                      {stats.total}
                    </h2>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                    <MessageSquare
                      size={26}
                      className="text-green-600"
                    />
                  </div>

                </div>

              </CardContent>
            </Card>

            {/* SUCCESS */}
            <Card className="rounded-3xl border-0 shadow-xl bg-white">
              <CardContent className="p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-gray-500">
                      Successful
                    </p>

                    <h2 className="text-3xl font-black mt-2 text-green-600">
                      {stats.success}
                    </h2>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                    <CheckCircle2
                      size={26}
                      className="text-green-600"
                    />
                  </div>

                </div>

              </CardContent>
            </Card>

            {/* FAILED */}
            <Card className="rounded-3xl border-0 shadow-xl bg-white">
              <CardContent className="p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-gray-500">
                      Failed
                    </p>

                    <h2 className="text-3xl font-black mt-2 text-red-500">
                      {stats.failed}
                    </h2>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
                    <XCircle
                      size={26}
                      className="text-red-500"
                    />
                  </div>

                </div>

              </CardContent>
            </Card>

            {/* GATEWAY */}
            <Card className="rounded-3xl border-0 shadow-xl bg-white">
              <CardContent className="p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-gray-500">
                      SMS Gateway
                    </p>

                    <h2 className="text-lg font-bold mt-2">
                      Active
                    </h2>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                    <DollarSign
                      size={26}
                      className="text-green-600"
                    />
                  </div>

                </div>

              </CardContent>
            </Card>

          </div>

          {/* TABLE */}
          <Card className="rounded-3xl border-0 shadow-2xl bg-white overflow-hidden">

            <CardContent className="p-0">

              {loading ? (
                <div className="py-24 flex flex-col items-center justify-center">

                  <div className="w-14 h-14 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />

                  <p className="mt-5 text-gray-500">
                    Loading messages...
                  </p>

                </div>
              ) : error ? (
                <div className="py-24 text-center">

                  <p className="text-red-500 font-medium">
                    {error}
                  </p>

                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="py-24 text-center">

                  <p className="text-gray-500">
                    No messages found
                  </p>

                </div>
              ) : (
                <div className="overflow-x-auto">

                  <table className="w-full min-w-[950px]">

                    <thead className="bg-green-50 border-b">

                      <tr className="text-left">

                        <th className="px-6 py-4 text-sm font-bold text-gray-700 w-16">
                          #
                        </th>

                        <th className="px-6 py-4 text-sm font-bold text-gray-700">
                          Phone
                        </th>

                        <th className="px-6 py-4 text-sm font-bold text-gray-700">
                          Message
                        </th>

                        <th className="px-6 py-4 text-sm font-bold text-gray-700">
                          Status
                        </th>

                        <th className="px-6 py-4 text-sm font-bold text-gray-700">
                          Cost
                        </th>

                        <th className="px-6 py-4 text-sm font-bold text-gray-700">
                          Message ID
                        </th>

                        <th className="px-6 py-4 text-sm font-bold text-gray-700">
                          Date
                        </th>

                        <th className="px-6 py-4 text-sm font-bold text-gray-700 text-center">
                          Actions
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {filteredMessages.map((m, i) => (
                        <tr
                          key={m.id}
                          className="border-b hover:bg-green-50/40 transition"
                        >

                          <td className="px-6 py-5 font-bold text-gray-400">
                            {i + 1}
                          </td>

                          <td className="px-6 py-5 font-medium">
                            {m.phone}
                          </td>

                          <td className="px-6 py-5 max-w-[320px] truncate text-gray-600">
                            {m.message}
                          </td>

                          <td className="px-6 py-5">

                            <span
                              className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                                m.status === "Success"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {m.status}
                            </span>

                          </td>

                          <td className="px-6 py-5 font-medium">
                            {m.cost}
                          </td>

                          <td className="px-6 py-5 text-gray-500 text-sm">
                            {m.message_id !== "None"
                              ? m.message_id
                              : "N/A"}
                          </td>

                          <td className="px-6 py-5">

                            <div className="flex items-center gap-2 text-sm text-gray-500">

                              <CalendarDays size={15} />

                              {new Date(
                                m.created_at
                              ).toLocaleString()}

                            </div>

                          </td>

                          <td className="px-6 py-5 text-center">
                            <button
                              onClick={() => setSelectedMessage(m)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition cursor-pointer"
                              title="View full message"
                            >
                              <Eye size={18} />
                            </button>
                          </td>

                        </tr>
                      ))}

                    </tbody>

                  </table>

                </div>
              )}

            </CardContent>

          </Card>

        </div>

      </div>

      {/* VIEW MODAL */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-3 z-50 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 space-y-4 animate-in zoom-in-95 shadow-2xl text-left">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                <MessageSquare className="text-green-600" /> Message Details
              </h2>
              <button 
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <span className="text-xs text-gray-400 block uppercase font-bold">Recipient Phone</span>
                <span className="font-semibold text-base">{selectedMessage.phone}</span>
              </div>
              
              <div>
                <span className="text-xs text-gray-400 block uppercase font-bold text-gray-400">Status</span>
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold mt-1 ${
                  selectedMessage.status === "Success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}>
                  {selectedMessage.status}
                </span>
              </div>
              
              <div>
                <span className="text-xs text-gray-400 block uppercase font-bold">Cost</span>
                <span className="font-semibold">{selectedMessage.cost || "0.00"} KES</span>
              </div>

              <div>
                <span className="text-xs text-gray-400 block uppercase font-bold">Message ID</span>
                <span className="font-mono text-gray-600">{selectedMessage.message_id || "N/A"}</span>
              </div>

              <div>
                <span className="text-xs text-gray-400 block uppercase font-bold">Sent Date</span>
                <span>{new Date(selectedMessage.created_at).toLocaleString()}</span>
              </div>

              <div className="border-t pt-3">
                <span className="text-xs text-gray-400 block uppercase font-bold mb-1">Message Content</span>
                <div className="bg-gray-50 p-4 rounded-xl border max-h-[200px] overflow-y-auto whitespace-pre-wrap text-gray-700">
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button 
                onClick={() => setSelectedMessage(null)}
                className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-xl text-white text-sm font-semibold transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}