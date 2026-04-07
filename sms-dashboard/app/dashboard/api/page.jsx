"use client";

import { useEffect, useState } from "react";
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
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">API Keys</h1>
        <p className="text-gray-500">
          Use API to send SMS programmatically
        </p>
      </div>

      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-4">

          {apiKey ? (
            <>
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex justify-between items-center">
                <span className="truncate">
                  {apiKey}
                </span>

                <Button size="sm" onClick={copyKey}>
                  Copy
                </Button>
              </div>

              <Button
                variant="destructive"
                onClick={revokeKey}
              >
                Revoke Key
              </Button>
            </>
          ) : (
            <Button onClick={generateKey} disabled={loading}>
              {loading ? "Generating..." : "Generate API Key"}
            </Button>
          )}

        </CardContent>
      </Card>

      {/* Docs */}
      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-2">
          <h2 className="text-lg font-semibold">Quick Example</h2>

          <pre className="text-sm bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
{`fetch("/api/v1/send", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    message: "Hello from API"
  })
});`}
          </pre>
        </CardContent>
      </Card>

    </div>
  );
}