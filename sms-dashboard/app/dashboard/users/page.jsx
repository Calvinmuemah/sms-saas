"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api";
import {
  Users,
  Search,
  ShieldCheck,
  UserCheck,
  UserX,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/users/all`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        return res.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setUsers(data.data);
        } else {
          throw new Error("Unexpected data format");
        }
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  const filteredUsers = users.filter((u) =>
    u.phone.includes(search)
  );

  const optedIn = users.filter((u) => u.opted_in).length;
  const optedOut = users.filter((u) => !u.opted_in).length;

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 p-8 text-white shadow-2xl">

        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 px-4 py-1 rounded-full text-sm backdrop-blur-md">
              <ShieldCheck size={15} />
              User Management
            </div>

            <h1 className="text-4xl font-black mt-4">
              Users
            </h1>

            <p className="text-green-100 mt-3 max-w-2xl">
              Manage subscribers, monitor opt-ins, and track
              your SMS audience activity in real-time.
            </p>
          </div>

          <div className="hidden md:flex items-center justify-center w-24 h-24 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl">
            <Users size={42} />
          </div>

        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card className="border-0 shadow-xl rounded-3xl">
          <CardContent className="p-6 flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm">
                Total Users
              </p>

              <h2 className="text-3xl font-black mt-1">
                {users.length}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
              <Users className="text-green-600" size={28} />
            </div>

          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl rounded-3xl">
          <CardContent className="p-6 flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm">
                Opted In
              </p>

              <h2 className="text-3xl font-black mt-1">
                {optedIn}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
              <UserCheck className="text-green-600" size={28} />
            </div>

          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl rounded-3xl">
          <CardContent className="p-6 flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm">
                Opted Out
              </p>

              <h2 className="text-3xl font-black mt-1">
                {optedOut}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
              <UserX className="text-red-600" size={28} />
            </div>

          </CardContent>
        </Card>

      </div>

      {/* USERS TABLE */}
      <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">

        <CardContent className="p-6 space-y-6">

          {/* TOP */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <h2 className="text-2xl font-bold">
                Subscribers
              </h2>

              <p className="text-gray-500 text-sm">
                View and manage all registered users
              </p>
            </div>

            {/* SEARCH */}
            <div className="relative w-full md:w-[320px]">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <Input
                placeholder="Search by phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 h-12 rounded-2xl border-gray-200 focus:border-green-500"
              />

            </div>

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto rounded-2xl border border-gray-100">

            <table className="w-full text-sm">

              <thead className="bg-gray-50">

                <tr className="text-left">

                  <th className="px-6 py-4 font-semibold text-gray-600">
                    Phone Number
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-600">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => (
                    <tr
                      key={u.phone}
                      className="border-t hover:bg-gray-50 transition"
                    >

                      <td className="px-6 py-4 font-medium">
                        {u.phone}
                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            u.opted_in
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {u.opted_in ? "Opted In" : "Opted Out"}
                        </span>

                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={2}
                      className="text-center py-10 text-gray-500"
                    >
                      No users found
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </CardContent>

      </Card>

    </div>
  );
}