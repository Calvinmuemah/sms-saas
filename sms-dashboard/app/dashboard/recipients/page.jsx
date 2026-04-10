"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function RecipientsPage() {
  const [recipients, setRecipients] = useState([]);
  const [name, setName] = useState("");
  const [numbers, setNumbers] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch recipients
  const fetchRecipients = async () => {
    try {
      const res = await fetch("https://sms-saas-53mg.vercel.app/api/v1/recipients");
      const data = await res.json();
      setRecipients(data.data);
    } catch {
      toast.error("Failed to load recipients");
    }
  };

  useEffect(() => {
    fetchRecipients();
  }, []);

  // Create recipient group
  const handleCreate = async () => {
    if (!name || !numbers) {
      toast.warning("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      await fetch("https://sms-saas-53mg.vercel.app/api/v1/recipients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, numbers: numbers.split(/[,\n]+/).map((n) => n.trim()) }),
      });

      toast.success("Recipient group created");
      setName("");
      setNumbers("");
      fetchRecipients();
    } catch {
      toast.error("Failed to create recipient group");
    } finally {
      setLoading(false);
    }
  };

  // Delete recipient group
  const handleDelete = async (id) => {
    try {
      await fetch(`https://sms-saas-53mg.vercel.app/api/v1/recipients/${id}`, {
        method: "DELETE",
      });

      toast.success("Recipient group deleted");
      fetchRecipients();
    } catch {
      toast.error("Failed to delete recipient group");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Recipients</h1>
        <p className="text-gray-500">Manage recipient groups</p>
      </div>

      {/* Create Recipient Group */}
      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Create Recipient Group</h2>

          <Input
            placeholder="Group Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Enter numbers (comma or new line)"
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            className="w-full p-4 rounded-lg border dark:bg-gray-800"
          />

          <Button onClick={handleCreate} disabled={loading}>
            {loading ? "Creating..." : "Create Group"}
          </Button>
        </CardContent>
      </Card>

      {/* Recipient Groups Table */}
      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">All Recipient Groups</h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th>Name</th>
                <th>Numbers</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {recipients.map((r) => (
                <tr key={r.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-800">
                  <td className="py-2">{r.name}</td>
                  <td>{r.numbers.join(", ")}</td>
                  <td>
                    <Button size="sm" onClick={() => handleDelete(r.id)}>
                      Delete
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