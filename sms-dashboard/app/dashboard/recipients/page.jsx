"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Users,
  Plus,
  Trash2,
  Pencil,
  Phone,
  Save,
  X,
  Search,
  UserPlus2,
  RefreshCw,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function RecipientsPage() {
  const [recipients, setRecipients] = useState([]);

  const [name, setName] = useState("");
  const [numbers, setNumbers] = useState("");

  const [loading, setLoading] = useState(false);

  const [editingRecipient, setEditingRecipient] =
    useState(null);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [search, setSearch] = useState("");

  // FETCH RECIPIENTS
  const fetchRecipients = async () => {
    try {
      const res = await fetch(
        "https://sms-saas-53mg.vercel.app/api/v1/recipients"
      );

      const data = await res.json();

      setRecipients(data.data || []);
    } catch {
      toast.error("Failed to load recipients");
    }
  };

  useEffect(() => {
    fetchRecipients();
  }, []);

  // CREATE GROUP
  const handleCreate = async () => {
    if (!name || !numbers) {
      toast.warning("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      await fetch(
        "https://sms-saas-53mg.vercel.app/api/v1/recipients",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            numbers: numbers
              .split(/[,\n]+/)
              .map((n) => n.trim())
              .filter(Boolean),
          }),
        }
      );

      toast.success("Recipient group created");

      setName("");
      setNumbers("");

      setShowCreateModal(false);

      fetchRecipients();
    } catch {
      toast.error("Failed to create recipient group");
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await fetch(
        `https://sms-saas-53mg.vercel.app/api/v1/recipients/${id}`,
        {
          method: "DELETE",
        }
      );

      toast.success("Recipient group deleted");

      fetchRecipients();
    } catch {
      toast.error("Failed to delete recipient group");
    }
  };

  // EDIT
  const handleEditClick = (recipient) => {
    setEditingRecipient({
      ...recipient,
      numbers: [...recipient.numbers],
    });
  };

  // UPDATE
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!editingRecipient) return;

    try {
      await fetch(
        `https://sms-saas-53mg.vercel.app/api/v1/recipients/${editingRecipient.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editingRecipient.name,
            numbers: editingRecipient.numbers,
          }),
        }
      );

      toast.success("Recipient group updated");

      setEditingRecipient(null);

      fetchRecipients();
    } catch {
      toast.error("Failed to update recipient group");
    }
  };

  // FILTER
  const filteredRecipients = useMemo(() => {
    return recipients.filter(
      (r) =>
        r.name?.toLowerCase().includes(search.toLowerCase()) ||
        r.numbers?.some((n) =>
          n.toLowerCase().includes(search.toLowerCase())
        )
    );
  }, [search, recipients]);

  // TOTAL CONTACTS
  const totalNumbers = useMemo(() => {
    return recipients.reduce(
      (acc, curr) => acc + curr.numbers.length,
      0
    );
  }, [recipients]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50/40 to-white text-gray-900">

      <div className="pt-24 pb-10 px-2 md:px-3">

        <div className="max-w-7xl mx-auto space-y-7">

          {/* HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div>
              <h1 className="text-4xl font-black tracking-tight">
                Recipients
              </h1>

              <p className="text-gray-500 mt-2">
                Manage recipient groups and contact lists
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">

              {/* SEARCH */}
              <div className="relative">

                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <Input
                  placeholder="Search recipients..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-11 w-full sm:w-[280px] pl-11 rounded-2xl border-gray-200 focus-visible:ring-green-500"
                />

              </div>

              {/* CREATE */}
              <button
                onClick={() =>
                  setShowCreateModal(true)
                }
                className="h-11 px-5 rounded-2xl bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
              >
                <Plus size={18} />
                Create Recipient
              </button>

              {/* REFRESH */}
              <button
                onClick={fetchRecipients}
                className="h-11 px-5 rounded-2xl bg-white border border-gray-200 hover:border-green-300 hover:bg-green-50 text-gray-700 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <RefreshCw size={17} />
                Refresh
              </button>

            </div>

          </div>

          {/* STATS */}
          <div className="grid sm:grid-cols-2 gap-5">

            {/* GROUPS */}
            <Card className="rounded-3xl border-0 shadow-xl bg-white">
              <CardContent className="p-6">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-gray-500">
                      Total Groups
                    </p>

                    <h2 className="text-4xl font-black mt-2">
                      {recipients.length}
                    </h2>
                  </div>

                  <div className="w-16 h-16 rounded-3xl bg-green-100 flex items-center justify-center">
                    <Users
                      size={30}
                      className="text-green-600"
                    />
                  </div>

                </div>

              </CardContent>
            </Card>

            {/* CONTACTS */}
            <Card className="rounded-3xl border-0 shadow-xl bg-white">
              <CardContent className="p-6">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-gray-500">
                      Total Contacts
                    </p>

                    <h2 className="text-4xl font-black mt-2">
                      {totalNumbers}
                    </h2>
                  </div>

                  <div className="w-16 h-16 rounded-3xl bg-green-100 flex items-center justify-center">
                    <Phone
                      size={30}
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

              <div className="px-6 py-5 border-b bg-green-50">

                <h2 className="text-2xl font-bold">
                  Recipient Groups
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  View and manage all recipient groups
                </p>

              </div>

              {filteredRecipients.length === 0 ? (
                <div className="py-24 text-center">

                  <p className="text-gray-500">
                    No recipient groups found
                  </p>

                </div>
              ) : (
                <div className="overflow-x-auto">

                  <table className="w-full min-w-[850px]">

                    <thead className="bg-white border-b">

                      <tr className="text-left">

                        <th className="px-6 py-4 text-sm font-bold text-gray-700">
                          Group Name
                        </th>

                        <th className="px-6 py-4 text-sm font-bold text-gray-700">
                          Numbers
                        </th>

                        <th className="px-6 py-4 text-sm font-bold text-gray-700">
                          Contacts
                        </th>

                        <th className="px-6 py-4 text-sm font-bold text-gray-700">
                          Actions
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {filteredRecipients.map((r) => (
                        <tr
                          key={r.id}
                          className="border-b hover:bg-green-50/40 transition"
                        >

                          {/* NAME */}
                          <td className="px-6 py-5 font-semibold">
                            {r.name}
                          </td>

                          {/* NUMBERS */}
                          <td className="px-6 py-5 max-w-[420px]">

                            <div className="flex flex-wrap gap-2">

                              {r.numbers
                                .slice(0, 4)
                                .map((num, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium"
                                  >
                                    {num}
                                  </span>
                                ))}

                              {r.numbers.length > 4 && (
                                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                                  +{r.numbers.length - 4} more
                                </span>
                              )}

                            </div>

                          </td>

                          {/* CONTACTS */}
                          <td className="px-6 py-5">

                            <span className="px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                              {r.numbers.length} Contacts
                            </span>

                          </td>

                          {/* ACTIONS */}
                          <td className="px-6 py-5">

                            <div className="flex items-center gap-2">

                              <button
                                onClick={() =>
                                  handleEditClick(r)
                                }
                                className="h-10 px-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 transition cursor-pointer"
                              >
                                <Pencil size={16} />
                                Edit
                              </button>

                              <button
                                onClick={() =>
                                  handleDelete(r.id)
                                }
                                className="h-10 px-4 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 transition cursor-pointer"
                              >
                                <Trash2 size={16} />
                                Delete
                              </button>

                            </div>

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

      {/* CREATE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">

          <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

            {/* TOP */}
            <div className="flex items-center justify-between px-7 py-5 border-b bg-green-50">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                  <UserPlus2
                    size={24}
                    className="text-green-600"
                  />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    Create Recipient Group
                  </h2>

                  <p className="text-sm text-gray-500">
                    Add contacts for bulk messaging
                  </p>
                </div>

              </div>

              <button
                onClick={() =>
                  setShowCreateModal(false)
                }
                className="w-10 h-10 rounded-xl bg-white hover:bg-gray-100 flex items-center justify-center transition cursor-pointer"
              >
                <X size={18} />
              </button>

            </div>

            {/* CONTENT */}
            <div className="p-7 space-y-5">

              {/* NAME */}
              <div className="space-y-2">

                <label className="text-sm font-semibold text-gray-700">
                  Group Name
                </label>

                <Input
                  placeholder="Marketing Team"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 rounded-2xl border-gray-200 focus-visible:ring-green-500"
                />

              </div>

              {/* NUMBERS */}
              <div className="space-y-2">

                <label className="text-sm font-semibold text-gray-700">
                  Phone Numbers
                </label>

                <textarea
                  placeholder="Enter numbers separated by comma or new line"
                  value={numbers}
                  onChange={(e) =>
                    setNumbers(e.target.value)
                  }
                  rows={6}
                  className="w-full rounded-2xl border border-gray-200 p-4 outline-none focus:border-green-500 resize-none"
                />

              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 pt-2">

                <Button
                  type="button"
                  onClick={() =>
                    setShowCreateModal(false)
                  }
                  className="bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-2xl h-11 px-6 cursor-pointer"
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleCreate}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 rounded-2xl h-11 px-6 shadow-lg cursor-pointer"
                >
                  <Plus
                    size={18}
                    className="mr-2"
                  />

                  {loading
                    ? "Creating..."
                    : "Create Group"}
                </Button>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* EDIT MODAL */}
      {editingRecipient && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">

          <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

            {/* TOP */}
            <div className="flex items-center justify-between px-7 py-5 border-b bg-green-50">

              <div>
                <h2 className="text-2xl font-bold">
                  Edit Recipient Group
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Update recipient information
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingRecipient(null)
                }
                className="w-10 h-10 rounded-xl bg-white hover:bg-gray-100 flex items-center justify-center transition cursor-pointer"
              >
                <X size={18} />
              </button>

            </div>

            {/* BODY */}
            <form
              onSubmit={handleUpdateSubmit}
              className="p-7 space-y-5"
            >

              <div className="space-y-2">

                <label className="text-sm font-semibold text-gray-700">
                  Group Name
                </label>

                <Input
                  value={editingRecipient.name}
                  onChange={(e) =>
                    setEditingRecipient({
                      ...editingRecipient,
                      name: e.target.value,
                    })
                  }
                  className="h-12 rounded-2xl border-gray-200 focus-visible:ring-green-500"
                />

              </div>

              <div className="space-y-2">

                <label className="text-sm font-semibold text-gray-700">
                  Numbers
                </label>

                <textarea
                  value={editingRecipient.numbers.join(
                    ", "
                  )}
                  onChange={(e) =>
                    setEditingRecipient({
                      ...editingRecipient,
                      numbers: e.target.value
                        .split(",")
                        .map((n) => n.trim()),
                    })
                  }
                  rows={6}
                  className="w-full rounded-2xl border border-gray-200 p-4 outline-none focus:border-green-500 resize-none"
                />

              </div>

              <div className="flex justify-end gap-3">

                <Button
                  type="button"
                  onClick={() =>
                    setEditingRecipient(null)
                  }
                  className="bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-2xl h-11 px-6 cursor-pointer"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 rounded-2xl h-11 px-6 shadow-lg cursor-pointer"
                >
                  <Save
                    size={17}
                    className="mr-2"
                  />
                  Save Changes
                </Button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}