"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    toast.success("Reset link sent (implement backend)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-center">Reset Password</h2>
        <Input
          placeholder="Enter your email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <Button onClick={handleReset} className="w-full">
          Send Reset Link
        </Button>
      </div>
    </div>
  );
}