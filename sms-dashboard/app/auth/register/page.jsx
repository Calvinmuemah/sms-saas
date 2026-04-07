"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  const [step, setStep] = useState<"register" | "verify">("register");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // STEP 1: REGISTER
  const handleRegister = async () => {
    if (!name || !email || !password) {
      return toast.warning("All fields are required");
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      toast.success("OTP sent to your email 📩");
      setStep("verify");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: VERIFY OTP
  const handleVerify = async () => {
    if (!otp) return toast.warning("Enter OTP");

    try {
      setLoading(true);

      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      toast.success("Account verified! 🎉");
      router.push("/auth/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4">

        <h1 className="text-2xl font-bold text-center">
          {step === "register" ? "Create Account" : "Verify Email"}
        </h1>

        {step === "register" ? (
          <>
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <Button onClick={handleRegister} disabled={loading} className="w-full">
              {loading ? "Creating..." : "Register"}
            </Button>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-500 text-center">
              Enter the OTP sent to {email}
            </p>

            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <Button onClick={handleVerify} disabled={loading} className="w-full">
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}