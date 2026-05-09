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

const API = "https://sms-saas-53mg.vercel.app/api/v1/recipients";

export default function RecipientsPage() {
  const [recipients, setRecipients] = useState([]);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [numbers, setNumbers] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchRecipients = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setRecipients(data.data || []);
    } catch {
      toast.error("Failed to load recipients");
    }
  };

  useEffect(() => {
    fetchRecipients();
  }, []);

  const totalContacts = useMemo(
    () =>
      recipients.reduce((a, r) => a + (r.numbers?.length || 0), 0),
    [recipients]
  );

  const filtered = useMemo(() => {
    return recipients.filter(
      (r) =>
        r.name?.toLowerCase().includes(search.toLowerCase()) ||
        r.numbers?.some((n) =>
          n.toLowerCase().includes(search.toLowerCase())
        )
    );
  }, [search, recipients]);

  const resetForm = () => {
    setName("");
    setNumbers("");
  };

  const handleCreate = async () => {
    if (!name || !numbers) return toast.warning("Fill all fields");

    try {
      setLoading(true);

      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          numbers: numbers
            .split(/[,\n]+/)
            .map((n) => n.trim())
            .filter(Boolean),
        }),
      });

      toast.success("Group created");
      setShowCreate(false);
      resetForm();
      fetchRecipients();
    } catch {
      toast.error("Create failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      toast.success("Deleted");
      fetchRecipients();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editing) return;

    try {
      await fetch(`${API}/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });

      toast.success("Updated");
      setEditing(null);
      fetchRecipients();
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="space-y-8 px-4 md:px-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-4xl font-black">Recipients</h1>
          <p className="text-gray-500 mt-2">
            Manage recipient groups and contacts
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">

          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="h-11 pl-11 rounded-xl w-[240px]"
            />
          </div>

          <Button
            onClick={() => setShowCreate(true)}
            className="bg-green-600 hover:bg-green-700 h-11 rounded-xl"
          >
            <Plus size={18} className="mr-2" />
            Create
          </Button>

          <Button
            onClick={fetchRecipients}
            variant="outline"
            className="h-11 rounded-xl"
          >
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>

        </div>

      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 gap-5">

        <Card className="rounded-3xl shadow-xl border-0">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Groups</p>
              <h2 className="text-3xl font-black">{recipients.length}</h2>
            </div>
            <Users className="text-green-600" size={30} />
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-xl border-0">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Contacts</p>
              <h2 className="text-3xl font-black">{totalContacts}</h2>
            </div>
            <Phone className="text-green-600" size={30} />
          </CardContent>
        </Card>

      </div>

      {/* TABLE */}
      <Card className="rounded-3xl shadow-2xl border-0 overflow-hidden">
        <CardContent className="p-0">

          <div className="p-5 border-b bg-green-50">
            <h2 className="text-xl font-bold">Groups</h2>
            <p className="text-sm text-gray-500">All recipient groups</p>
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              No data found
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[700px]">

                <thead>
                  <tr className="text-left border-b">
                    <th className="p-4">Name</th>
                    <th className="p-4">Numbers</th>
                    <th className="p-4">Count</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id} className="border-b hover:bg-green-50">

                      <td className="p-4 font-semibold">{r.name}</td>

                      <td className="p-4 flex gap-2 flex-wrap">
                        {r.numbers?.slice(0, 3).map((n, i) => (
                          <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                            {n}
                          </span>
                        ))}
                      </td>

                      <td className="p-4">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                          {r.numbers?.length || 0}
                        </span>
                      </td>

                      <td className="p-4 flex gap-2">

                        <button
                          onClick={() => setEditing(r)}
                          className="bg-blue-500 text-white px-3 py-2 rounded-xl"
                        >
                          <Pencil size={14} />
                        </button>

                        <button
                          onClick={() => handleDelete(r.id)}
                          className="bg-red-500 text-white px-3 py-2 rounded-xl"
                        >
                          <Trash2 size={14} />
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

      {/* CREATE MODAL */}
      {showCreate && (
        <Modal title="Create Group" onClose={() => setShowCreate(false)}>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Group name" />
          <textarea
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            className="w-full border p-3 rounded-xl mt-3"
            rows={5}
            placeholder="Numbers separated by comma or new line"
          />

          <div className="flex justify-end gap-3 mt-4">
            <Button onClick={() => setShowCreate(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={loading} className="bg-green-600">
              Create
            </Button>
          </div>
        </Modal>
      )}

      {/* EDIT MODAL */}
      {editing && (
        <Modal title="Edit Group" onClose={() => setEditing(null)}>
          <form onSubmit={handleUpdate} className="space-y-3">

            <Input
              value={editing.name}
              onChange={(e) =>
                setEditing({ ...editing, name: e.target.value })
              }
            />

            <textarea
              value={editing.numbers.join(",")}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  numbers: e.target.value.split(",").map((n) => n.trim()),
                })
              }
              className="w-full border p-3 rounded-xl"
              rows={5}
            />

            <div className="flex justify-end gap-3">
              <Button type="button" onClick={() => setEditing(null)} variant="outline">
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600">
                Save
              </Button>
            </div>

          </form>
        </Modal>
      )}

    </div>
  );
}

/* SIMPLE MODAL */
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl p-6 space-y-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}