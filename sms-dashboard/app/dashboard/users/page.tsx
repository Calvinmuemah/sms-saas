"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/ui/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Define the User type
interface User {
  _id: string;
  phone: string;
  optedIn: boolean;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]); // Explicitly type users
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://sms-saas-53mg.vercel.app/api/v1/users")
      .then(res => res.json())
      .then(setUsers);
  }, []);

  const filteredUsers = users.filter(u =>
    u.phone.includes(search)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />

      <div className="pt-24 max-w-7xl mx-auto px-6 space-y-6">
        <h1 className="text-3xl font-bold">Users</h1>

        {/* Search */}
        <Input
          placeholder="Search by phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Table */}
        <Card className="shadow-xl rounded-2xl">
          <CardContent className="p-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2">Phone</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-800">
                    <td className="py-2">{u.phone}</td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        u.optedIn
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}>
                        {u.optedIn ? "Opted In" : "Opted Out"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}