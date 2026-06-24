"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  Camera,
  Save,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();

      setUser({
        name: data.name || "",
        email: data.email || "",
      });
    } catch {
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);

      await fetch(`${API_BASE_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...user,
          password,
        }),
      });

      toast.success("Profile updated successfully");
      setPassword("");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900">
            Profile Settings
          </h1>

          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Manage your personal information and account security
          </p>
        </div>

        <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-2xl w-fit">
          <ShieldCheck size={18} />
          <span className="text-sm font-semibold">
            Secure Account
          </span>
        </div>

      </div>

      {/* PROFILE CARD */}
      <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden bg-white">

        {/* TOP BANNER */}
        <div className="relative h-40 bg-gradient-to-r from-green-600 via-emerald-500 to-green-700">

          {/* GLOW */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

          {/* PROFILE IMAGE */}
          <div className="absolute -bottom-14 left-8">

            <div className="relative">

              <div className="w-28 h-28 rounded-3xl bg-white shadow-2xl flex items-center justify-center border-4 border-white">

                <User size={45} className="text-green-600" />

              </div>

              <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-green-600 hover:bg-green-700 text-white flex items-center justify-center shadow-lg transition cursor-pointer">
                <Camera size={18} />
              </button>

            </div>

          </div>

        </div>

        <CardContent className="pt-20 p-8">

          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT INFO */}
            <div className="space-y-5">

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.name || "Your Name"}
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  {user.email || "your@email.com"}
                </p>
              </div>

              {/* STATUS CARDS */}
              <div className="space-y-4">

                <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
                  <p className="text-sm text-gray-500">
                    Account Status
                  </p>

                  <h3 className="font-bold text-green-700 mt-1">
                    Active & Protected
                  </h3>
                </div>

                <div className="bg-gray-50 border rounded-2xl p-4">
                  <p className="text-sm text-gray-500">
                    Security Level
                  </p>

                  <h3 className="font-bold text-gray-900 mt-1">
                    Strong
                  </h3>
                </div>

              </div>

            </div>

            {/* RIGHT FORM */}
            <div className="lg:col-span-2">

              <div className="grid md:grid-cols-2 gap-5">

                {/* NAME */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Full Name
                  </label>

                  <div className="relative">

                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <Input
                      placeholder="Enter your name"
                      value={user.name}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          name: e.target.value,
                        })
                      }
                      className="h-12 pl-11 rounded-xl border-gray-200 focus-visible:ring-green-500"
                    />

                  </div>
                </div>

                {/* EMAIL */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Email Address
                  </label>

                  <div className="relative">

                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <Input
                      placeholder="Enter your email"
                      value={user.email}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          email: e.target.value,
                        })
                      }
                      className="h-12 pl-11 rounded-xl border-gray-200 focus-visible:ring-green-500"
                    />

                  </div>
                </div>

              </div>

              {/* PASSWORD */}
              <div className="mt-5 space-y-2">

                <label className="text-sm font-semibold text-gray-700">
                  New Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <Input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pl-11 rounded-xl border-gray-200 focus-visible:ring-green-500"
                  />

                </div>

              </div>

              {/* SAVE BUTTON */}
              <div className="mt-8 flex justify-end">

                <Button
                  onClick={handleSave}
                  disabled={loading}
                  className="h-12 px-7 rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Save size={18} className="mr-2" />

                  {loading ? "Saving..." : "Save Changes"}
                </Button>

              </div>

            </div>

          </div>

        </CardContent>

      </Card>

    </div>
  );
}