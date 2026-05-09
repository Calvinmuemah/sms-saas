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
    () => recipients.reduce((a, r) => a + (r.numbers?.length || 0), 0),
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
      setName("");
      setNumbers("");
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
    <div className="space-y-6 px-3 md:px-4">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-black">Recipients</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Manage groups & contacts
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 gap-4">

        <Card className="rounded-3xl shadow-xl border-0">
          <CardContent className="p-5 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Groups</p>
              <h2 className="text-3xl font-black">{recipients.length}</h2>
            </div>
            <Users className="text-green-600" size={28} />
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-xl border-0">
          <CardContent className="p-5 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Contacts</p>
              <h2 className="text-3xl font-black">{totalContacts}</h2>
            </div>
            <Phone className="text-green-600" size={28} />
          </CardContent>
        </Card>

      </div>

      {/* ACTIONS (NOW BELOW STATS) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

        <div className="relative w-full md:w-[260px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="h-10 pl-10 rounded-xl"
          />
        </div>

        <div className="flex gap-2">

          <Button
            onClick={() => setShowCreate(true)}
            className="bg-green-600 hover:bg-green-700 h-10 rounded-xl"
          >
            <Plus size={16} className="mr-1" />
            Create
          </Button>

          <Button
            onClick={fetchRecipients}
            variant="outline"
            className="h-10 rounded-xl"
          >
            <RefreshCw size={16} className="mr-1" />
            Refresh
          </Button>

        </div>

      </div>

      {/* TABLE */}
      <Card className="rounded-3xl shadow-2xl border-0 overflow-hidden">
        <CardContent className="p-0">

          <div className="p-4 border-b bg-green-50">
            <h2 className="font-bold">Groups</h2>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[650px] text-sm">

              <thead>
                <tr className="text-left border-b bg-white">
                  <th className="p-3">#</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Numbers</th>
                  <th className="p-3">Count</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>

                {filtered.map((r, i) => (
                  <tr key={r.id} className="border-b hover:bg-green-50">

                    {/* NUMBERING */}
                    <td className="p-3 font-bold text-gray-500">
                      {i + 1}
                    </td>

                    <td className="p-3 font-semibold">{r.name}</td>

                    <td className="p-3 flex gap-2 flex-wrap">
                      {r.numbers?.slice(0, 2).map((n, idx) => (
                        <span key={idx} className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                          {n}
                        </span>
                      ))}
                      {r.numbers?.length > 2 && (
                        <span className="text-green-600 text-xs font-semibold">
                          +{r.numbers.length - 2}
                        </span>
                      )}
                    </td>

                    <td className="p-3">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                        {r.numbers?.length || 0}
                      </span>
                    </td>

                    <td className="p-3 flex gap-2">

                      <button
                        onClick={() => setEditing(r)}
                        className="bg-blue-500 text-white px-2 py-1 rounded-lg"
                      >
                        <Pencil size={14} />
                      </button>

                      <button
                        onClick={() => handleDelete(r.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-lg"
                      >
                        <Trash2 size={14} />
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </CardContent>
      </Card>

      {/* MODALS (UNCHANGED LOGIC, KEEP SIMPLE) */}
      {showCreate && (
        <Modal title="Create Group" onClose={() => setShowCreate(false)}>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Group name" />
          <textarea
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            className="w-full border p-3 rounded-xl mt-3"
            rows={4}
            placeholder="Numbers"
          />

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowCreate(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} className="bg-green-600">
              Create
            </Button>
          </div>
        </Modal>
      )}

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
              rows={4}
            />

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setEditing(null)}>
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

/* MODAL */
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-3">
      <div className="bg-white w-full max-w-lg rounded-2xl p-5 space-y-3">
        <div className="flex justify-between">
          <h2 className="font-bold text-lg">{title}</h2>
          <button onClick={onClose}><X /></button>
        </div>
        {children}
      </div>
    </div>
  );
}