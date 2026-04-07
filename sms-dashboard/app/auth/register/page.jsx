"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mail, Lock, User } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [step, setStep] = useState("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      return toast.warning("All fields required");
    }

    try {
      setLoading(true);

      const res = await fetch("https://sms-saas-53mg.vercel.app/api/v1/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      toast.success("OTP sent 📩");
      setStep("verify");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!otp) return toast.warning("Enter OTP");

    try {
      setLoading(true);

      const res = await fetch("https://sms-saas-53mg.vercel.app/api/v1/auth/verify-otp", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      toast.success("Account verified 🎉");
      router.push("/auth/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-green-500 to-teal-600 text-white p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">Join SMS SaaS</h1>
          <p className="text-lg opacity-90">
            Start sending bulk SMS and grow your audience.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl space-y-6">

          <h2 className="text-2xl font-bold text-center">
            {step === "register" ? "Create Account" : "Verify Email"}
          </h2>

          {step === "register" ? (
            <>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={18}/>
                <Input className="pl-10" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18}/>
                <Input className="pl-10" type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={18}/>
                <Input className="pl-10" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
              </div>

              <Button onClick={handleRegister} className="w-full bg-green-600">
                {loading ? "Creating..." : "Register"}
              </Button>

              <p className="text-sm text-center text-gray-500">
                Already have an account?{" "}
                <span
                  onClick={() => router.push("/auth/login")}
                  className="text-green-600 cursor-pointer"
                >
                  Login
                </span>
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-center text-gray-500">
                Enter the OTP sent to <b>{email}</b>
              </p>

              <Input
                className="text-center tracking-widest text-lg"
                placeholder="••••••"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <Button onClick={handleVerify} className="w-full bg-green-600">
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>

              <p
                onClick={() => setStep("register")}
                className="text-center text-sm text-green-600 cursor-pointer"
              >
                Change email
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}