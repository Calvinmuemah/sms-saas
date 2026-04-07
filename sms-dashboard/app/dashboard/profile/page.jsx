"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/v1/profile");
      const data = await res.json();
      setUser(data);
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

      await fetch("/api/v1/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...user, password }),
      });

      toast.success("Profile updated");
      setPassword("");
    } catch {
      toast.error("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-gray-500">Manage your account details</p>
      </div>

      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-4">

          <Input
            placeholder="Name"
            value={user.name}
            onChange={(e) =>
              setUser({ ...user, name: e.target.value })
            }
          />

          <Input
            placeholder="Email"
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
          />

          <Input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>

        </CardContent>
      </Card>
    </div>
  );
}