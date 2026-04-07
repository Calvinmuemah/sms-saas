"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return toast.warning("Email and password required");
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      localStorage.setItem("token", data.token);

      toast.success("Welcome back 🚀");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      
      {/* LEFT SIDE (Branding) */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-green-500 to-teal-600 text-white p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">SMS SaaS</h1>
          <p className="text-lg opacity-90">
            Manage campaigns, track analytics, and scale your messaging.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (Form) */}
      <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl space-y-6">

          <div className="text-center">
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Login to your account</p>
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <Input
              type="email"
              placeholder="Email"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <Input
              type="password"
              placeholder="Password"
              className="pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <span
              onClick={() => router.push("/auth/forgot-password")}
              className="text-green-600 cursor-pointer hover:underline"
            >
              Forgot password?
            </span>
          </div>

          {/* Button */}
          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          {/* Register Link */}
          <p className="text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <span
              onClick={() => router.push("/auth/register")}
              className="text-green-600 cursor-pointer hover:underline"
            >
              Create account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}