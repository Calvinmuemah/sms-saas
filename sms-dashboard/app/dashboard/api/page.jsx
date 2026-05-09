"use client";

import { useEffect, useState } from "react";
import {
  Copy,
  KeyRound,
  Trash2,
  BookOpen,
  Terminal,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ApiPage() {
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchKey = async () => {
    try {
      const res = await fetch("/api/v1/api-key");
      const data = await res.json();
      setApiKey(data.key);
    } catch {
      toast.error("Failed to load API key");
    }
  };

  useEffect(() => {
    fetchKey();
  }, []);

  const generateKey = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/v1/api-key", {
        method: "POST",
      });

      const data = await res.json();

      setApiKey(data.key);

      toast.success("API Key generated 🔑");
    } catch {
      toast.error("Failed to generate key");
    } finally {
      setLoading(false);
    }
  };

  const revokeKey = async () => {
    try {
      await fetch("/api/v1/api-key", {
        method: "DELETE",
      });

      setApiKey(null);

      toast.success("API Key revoked");
    } catch {
      toast.error("Failed to revoke key");
    }
  };

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 p-8 text-white shadow-2xl">

        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 px-4 py-1 rounded-full text-sm backdrop-blur-md">
              <Sparkles size={15} />
              Developer Access
            </div>

            <h1 className="text-4xl font-black mt-4">
              API Keys & Docs
            </h1>

            <p className="text-green-100 mt-3 max-w-2xl">
              Generate secure API keys and integrate SMS sending
              directly into your apps, websites, or backend systems.
            </p>
          </div>

          <div className="hidden md:flex items-center justify-center w-24 h-24 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl">
            <KeyRound size={42} />
          </div>

        </div>
      </div>

      {/* API KEY CARD */}
      <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
        <CardContent className="p-8 space-y-6">

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <ShieldCheck className="text-green-600" size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Your API Key
              </h2>

              <p className="text-gray-500 text-sm">
                Keep this key private and secure
              </p>
            </div>
          </div>

          {apiKey ? (
            <div className="space-y-5">

              {/* KEY DISPLAY */}
              <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-5 border border-gray-800 overflow-hidden">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                  <div className="flex items-center gap-3 overflow-hidden">
                    <Terminal className="text-green-400 shrink-0" size={20} />

                    <code className="text-green-400 text-sm md:text-base truncate font-mono">
                      {apiKey}
                    </code>
                  </div>

                  <Button
                    onClick={copyKey}
                    className="bg-green-600 hover:bg-green-700 rounded-xl cursor-pointer"
                  >
                    <Copy size={16} className="mr-2" />
                    Copy
                  </Button>

                </div>

              </div>

              {/* ACTIONS */}
              <div className="flex flex-col sm:flex-row gap-4">

                <Button
                  variant="destructive"
                  onClick={revokeKey}
                  className="rounded-xl cursor-pointer"
                >
                  <Trash2 size={16} className="mr-2" />
                  Revoke Key
                </Button>

              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">

              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
                <KeyRound size={34} className="text-green-600" />
              </div>

              <h3 className="text-xl font-bold">
                No API Key Generated
              </h3>

              <p className="text-gray-500 mt-2 max-w-md">
                Generate a secure API key to start sending SMS
                programmatically using our platform.
              </p>

              <Button
                onClick={generateKey}
                disabled={loading}
                className="mt-6 bg-green-600 hover:bg-green-700 rounded-xl px-6 cursor-pointer"
              >
                {loading ? "Generating..." : "Generate API Key"}
              </Button>

            </div>
          )}

        </CardContent>
      </Card>

      {/* DOCUMENTATION */}
      <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
        <CardContent className="p-8 space-y-8">

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <BookOpen className="text-green-600" size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                API Documentation
              </h2>

              <p className="text-gray-500 text-sm">
                Quick integration example
              </p>
            </div>
          </div>

          {/* STEP 1 */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">
              1. Endpoint
            </h3>

            <div className="bg-gray-900 text-green-400 rounded-2xl p-4 font-mono text-sm overflow-x-auto">
              POST /api/v1/send
            </div>
          </div>

          {/* STEP 2 */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">
              2. Required Headers
            </h3>

            <div className="bg-gray-900 text-green-400 rounded-2xl p-4 font-mono text-sm overflow-x-auto">
{`Authorization: Bearer YOUR_API_KEY
Content-Type: application/json`}
            </div>
          </div>

          {/* STEP 3 */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">
              3. Example Request
            </h3>

            <div className="bg-black rounded-2xl overflow-hidden border border-gray-800">

              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800 bg-gray-950">
                <p className="text-sm text-gray-400">
                  JavaScript Example
                </p>

                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>

              <pre className="text-green-400 text-sm p-5 overflow-x-auto leading-7">
{`fetch("/api/v1/send", {
  method: "POST",
  headers: {
    Authorization: "Bearer YOUR_API_KEY",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    phone: "+254712345678",
    message: "Hello from SMS SaaS 🚀"
  }),
})
.then((res) => res.json())
.then((data) => console.log(data));`}
              </pre>

            </div>
          </div>

          {/* RESPONSE */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">
              4. Example Response
            </h3>

            <div className="bg-gray-900 text-green-400 rounded-2xl p-5 font-mono text-sm overflow-x-auto">
{`{
  "success": true,
  "message_id": "MSG_938383",
  "status": "queued"
}`}
            </div>
          </div>

        </CardContent>
      </Card>

    </div>
  );
}