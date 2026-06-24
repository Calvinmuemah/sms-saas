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
  Eye,
  EyeOff,
  Check,
  Code2,
  Server,
  Layers,
  ArrowRight,
  HelpCircle,
  Hash,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api";
import Navbar from "@/components/ui/navbar";

export default function ApiPage() {
  const [apiKeys, setApiKeys] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [revealedKeys, setRevealedKeys] = useState(new Set());
  const [activeLang, setActiveLang] = useState("js");

  const fetchKeys = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api-key`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (data.success) {
        setApiKeys(data.data || []);
      }
    } catch {
      toast.error("Failed to load API keys");
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const generateKey = async (e) => {
    e.preventDefault();
    if (!projectName.trim()) {
      return toast.warning("Project name is required");
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/api-key`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name: projectName }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("API Key generated successfully 🔑");
        setProjectName("");
        fetchKeys();
      } else {
        throw new Error(data.error || "Failed to generate key");
      }
    } catch (err) {
      toast.error(err.message || "Failed to generate key");
    } finally {
      setLoading(false);
    }
  };

  const revokeKey = async (id) => {
    if (!confirm("Are you sure you want to revoke this API key? External systems using it will stop working immediately.")) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api-key/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();

      if (data.success) {
        toast.success("API Key revoked");
        fetchKeys();
      } else {
        throw new Error("Failed to delete key");
      }
    } catch {
      toast.error("Failed to revoke key");
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleReveal = (id) => {
    const newRevealed = new Set(revealedKeys);
    if (newRevealed.has(id)) {
      newRevealed.delete(id);
    } else {
      newRevealed.add(id);
    }
    setRevealedKeys(newRevealed);
  };

  // Documentation code examples with detailed language descriptions & guide steps
  const langConfig = {
    js: {
      label: "JavaScript",
      icon: "🟨",
      code: `fetch("https://sms-saas-53mg.vercel.app/api/v1/send", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    message: "Hello from SMS SaaS 🚀",
    numbers: ["+254712345678"]
  })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));`,
      guide: [
        "Uses the browser or runtime native `fetch` API.",
        "Send a `POST` request with the JSON payload format.",
        "Set the `Authorization` header using standard Bearer authentication scheme.",
        "Pass numbers formatted with country codes in the `numbers` array."
      ]
    },
    node: {
      label: "Node.js (Axios)",
      icon: "🟢",
      code: `const axios = require('axios');

axios.post('https://sms-saas-53mg.vercel.app/api/v1/send', {
  message: 'Hello from SMS SaaS 🚀',
  numbers: ['+254712345678']
}, {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error('Error:', error.response ? error.response.data : error.message);
});`,
      guide: [
        "First, install Axios via: `npm install axios`.",
        "Import axios in your Node script.",
        "Always secure keys in environmental variables (e.g. `process.env.SMS_API_KEY`).",
        "Add a `.catch` block to securely log or alert on API validation errors."
      ]
    },
    py: {
      label: "Python",
      icon: "🟦",
      code: `import requests

url = "https://sms-saas-53mg.vercel.app/api/v1/send"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "message": "Hello from SMS SaaS 🚀",
    "numbers": ["+254712345678"]
}

try:
    response = requests.post(url, headers=headers, json=payload)
    response.raise_for_status()
    print("Response:", response.json())
except requests.exceptions.RequestException as e:
    print("API Error:", e)`,
      guide: [
        "Install the requests package: `pip install requests`.",
        "Prepare request headers specifying standard JSON Content-Type.",
        "Pass parameters via the `json` argument to let requests handle serialization.",
        "Verify status responses using `raise_for_status()` check."
      ]
    },
    php: {
      label: "PHP",
      icon: "🐘",
      code: `<?php

$ch = curl_init("https://sms-saas-53mg.vercel.app/api/v1/send");

$payload = json_encode([
    "message" => "Hello from SMS SaaS 🚀",
    "numbers" => ["+254712345678"]
]);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer YOUR_API_KEY",
    "Content-Type: application/json"
]);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'Error: ' . curl_error($ch);
} else {
    echo 'Response: ' . $response;
}

curl_close($ch);
?>`,
      guide: [
        "Ensure the PHP cURL extension is active on your server configuration.",
        "Use `json_encode()` to serialize your parameters map.",
        "Set standard headers in array format inside `CURLOPT_HTTPHEADER`.",
        "Properly free system resources by invoking `curl_close()` at connection end."
      ]
    },
    go: {
      label: "Go",
      icon: "🐹",
      code: `package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func main() {
	url := "https://sms-saas-53mg.vercel.app/api/v1/send"
	payload := map[string]interface{}{
		"message": "Hello from SMS SaaS 🚀",
		"numbers": []string{"+254712345678"},
	}
	
	jsonPayload, _ := json.Marshal(payload)
	
	req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonPayload))
	req.Header.Set("Authorization", "Bearer YOUR_API_KEY")
	req.Header.Set("Content-Type", "application/json")
	
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Printf("HTTP Request failed: %s\\n", err)
		return
	}
	defer resp.Body.Close()
	
	body, _ := io.ReadAll(resp.Body)
	fmt.Println("Response:", string(body))
}`,
      guide: [
        "Initialize an HTTP Request using `http.NewRequest` with POST method.",
        "Marshal the request parameters using `json.Marshal()`.",
        "Configure custom token credentials via `req.Header.Set()`.",
        "Make sure to clean up connection handles with a deferred body Close call."
      ]
    },
    ruby: {
      label: "Ruby",
      icon: "💎",
      code: `require 'net/http'
require 'uri'
require 'json'

uri = URI.parse("https://sms-saas-53mg.vercel.app/api/v1/send")
header = {
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer YOUR_API_KEY'
}
payload = {
  message: 'Hello from SMS SaaS 🚀',
  numbers: ['+254712345678']
}

http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true
request = Net::HTTP::Post.new(uri.request_uri, header)
request.body = payload.to_json

response = http.request(request)
puts response.body`,
      guide: [
        "Import the standard standard Ruby `net/http` and `json` gems.",
        "Set `use_ssl = true` to communicate securely via HTTPS.",
        "Encode parameters to stringified JSON utilizing the `.to_json` call.",
        "Inspect the response body content standard payload."
      ]
    },
    curl: {
      label: "cURL",
      icon: "🐚",
      code: `curl -X POST https://sms-saas-53mg.vercel.app/api/v1/send \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "Hello from SMS SaaS 🚀",
    "numbers": ["+254712345678"]
  }'`,
      guide: [
        "Perfect for testing integrations rapidly in Unix terminal shells.",
        "Pass custom request methods with `-X POST` option.",
        "Use multiple `-H` flags to attach authentication header parameters.",
        "Embed raw string payloads inside the `-d` parameter string block."
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50/40 to-white text-gray-900">
      <Navbar />

      <div className="pt-24 pb-10 px-3 md:px-4">
        <div className="max-w-full space-y-8">
          {/* HEADER HERO AREA */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-800 p-8 md:p-12 text-white shadow-2xl transition duration-500">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500/10 rounded-full blur-2xl translate-y-12 -translate-x-12"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles size={14} className="text-yellow-300 animate-pulse" />
              Developer API Panel
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
              Integrate Bulk SMS into Your Applications
            </h1>
            <p className="text-green-50/95 text-base md:text-lg leading-relaxed font-medium">
              Create secure, modular API keys to dispatch automated messages, alerts, and campaigns straight from your backend codebase, CRM, or client services.
            </p>
          </div>
          <div className="hidden lg:flex items-center justify-center w-28 h-28 rounded-3xl bg-white/10 border border-white/20 shadow-inner backdrop-blur-xl shrink-0">
            <KeyRound size={48} className="text-white drop-shadow-md" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* LEFT / CENTER COLUMN: CREATE KEY & LIST OF KEYS (3 columns span) */}
        <div className="lg:col-span-3 space-y-8">
          {/* GENERATE API KEY FORM */}
          <Card className="border-0 shadow-lg rounded-3xl bg-white overflow-hidden border-t-4 border-green-600 transition-all hover:shadow-xl">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center shadow-inner shrink-0">
                  <ShieldCheck className="text-green-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900">Create New API Token</h2>
                  <p className="text-gray-500 text-xs mt-0.5">Define your project parameters to map key logs</p>
                </div>
              </div>

              <form onSubmit={generateKey} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="projectName" className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Project / Application Name
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      id="projectName"
                      type="text"
                      placeholder="e.g. Invoicing Server, Webshop App"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="h-12 rounded-xl border-gray-200 focus-visible:ring-green-500 text-sm font-semibold px-4 flex-1"
                    />
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-green-600 hover:bg-green-700 h-12 rounded-xl px-6 cursor-pointer shrink-0 text-white font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                    >
                      {loading ? "Generating..." : (
                        <>
                          Generate Key
                          <ArrowRight size={16} />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* ACTIVE API KEYS CART / LIST */}
          <Card className="border-0 shadow-lg rounded-3xl bg-white overflow-hidden transition-all hover:shadow-xl">
            <CardContent className="p-0">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-green-50/50 to-emerald-50/20 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Server className="text-green-700" size={20} />
                  <h3 className="font-extrabold text-lg text-gray-900">Active Access Tokens</h3>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-extrabold shadow-sm">
                  {apiKeys.length} keys total
                </span>
              </div>

              {apiKeys.length === 0 ? (
                <div className="py-20 text-center px-4">
                  <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4 border border-dashed border-gray-200">
                    <KeyRound size={28} className="text-gray-300" />
                  </div>
                  <h4 className="font-bold text-gray-700 mb-1">No API keys registered</h4>
                  <p className="text-gray-400 text-xs max-w-sm mx-auto">
                    API integration endpoints require a secret key. Use the form above to deploy your first token.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {apiKeys.map((item, idx) => {
                    const isRevealed = revealedKeys.has(item.id);
                    return (
                      <div
                        key={item.id}
                        className="p-6 hover:bg-gray-50/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                      >
                        <div className="space-y-3 flex-1 min-w-0">
                          {/* KEY INFO HEADER */}
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-green-50 text-green-700 font-extrabold text-xs flex items-center justify-center shadow-inner">
                              {idx + 1}
                            </span>
                            <h4 className="font-extrabold text-gray-900 truncate text-base">{item.name}</h4>
                            <span className="text-[11px] bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                              <Hash size={10} />
                              ID: {item.id}
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium ml-auto md:ml-0">
                              Added {new Date(item.created_at).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>

                          {/* KEY TOKEN CONTAINER */}
                          <div className="flex items-center gap-2 bg-gray-950 border border-gray-800 p-3 rounded-2xl font-mono text-xs md:text-sm text-gray-200 overflow-hidden w-full max-w-full shadow-inner relative group">
                            <span className="truncate flex-1 select-all font-semibold tracking-wider text-green-400 pl-2">
                              {isRevealed ? item.key : "••••••••••••••••••••••••••••••••••••••••"}
                            </span>
                            
                            <div className="flex items-center gap-1 shrink-0 z-10 bg-gray-950 pl-2">
                              <button
                                onClick={() => toggleReveal(item.id)}
                                className="p-2 hover:bg-gray-800 rounded-xl text-gray-400 hover:text-white transition duration-200 cursor-pointer"
                                title={isRevealed ? "Hide secret token" : "Reveal secret token"}
                              >
                                {isRevealed ? <EyeOff size={16} /> : <Eye size={16} />}
                              </button>
                              <button
                                onClick={() => copyToClipboard(item.key, item.id)}
                                className="p-2 hover:bg-gray-800 rounded-xl text-gray-400 hover:text-white transition duration-200 cursor-pointer"
                                title="Copy to clipboard"
                              >
                                {copiedId === item.id ? (
                                  <Check size={16} className="text-green-400 font-bold" />
                                ) : (
                                  <Copy size={16} />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* REVOKE KEY ACTION */}
                        <div className="shrink-0 flex items-center">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => revokeKey(item.id)}
                            className="h-10 px-4 rounded-xl text-xs cursor-pointer font-bold shadow-sm flex items-center gap-2 active:scale-95 transition-all hover:bg-red-700"
                          >
                            <Trash2 size={14} />
                            Revoke Key
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: DOCUMENTATION & CODES (2 columns span) */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg rounded-3xl bg-white overflow-hidden h-full flex flex-col border-t-4 border-emerald-600 transition-all hover:shadow-xl">
            <CardContent className="p-6 md:p-8 space-y-6 flex-1 flex flex-col">
              <div className="flex items-center gap-3.5 border-b border-gray-100 pb-5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shadow-inner shrink-0">
                  <BookOpen className="text-emerald-700" size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-gray-900">Developer Documentation</h2>
                  <p className="text-gray-500 text-xs mt-0.5">API payload requirements & code recipes</p>
                </div>
              </div>

              {/* ENDPOINT INFO */}
              <div className="space-y-2.5">
                <span className="text-xs text-gray-700 font-bold uppercase tracking-wider block">API SEND ENDPOINT</span>
                <div className="flex items-center gap-2 bg-gray-900 text-green-400 p-3 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner border border-gray-800">
                  <span className="bg-emerald-800/80 text-green-200 px-3 py-1 rounded-xl text-[10px] font-black tracking-wider">POST</span>
                  <span className="font-semibold">https://sms-saas-53mg.vercel.app/api/v1/send</span>
                </div>
              </div>

              {/* PROGRAMMING LANGUAGE SWITCHER */}
              <div className="space-y-4 flex-1 flex flex-col min-h-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs text-gray-700 font-bold uppercase tracking-wider block">Language Recipes</span>
                  
                  {/* TABS GRID */}
                  <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-xl text-xs font-bold">
                    {Object.keys(langConfig).map((key) => (
                      <button
                        key={key}
                        onClick={() => setActiveLang(key)}
                        className={`px-3 py-1.5 rounded-lg transition duration-200 cursor-pointer flex items-center gap-1.5 ${
                          activeLang === key
                            ? "bg-white shadow-sm text-green-700 font-extrabold"
                            : "text-gray-500 hover:text-gray-800 hover:bg-gray-200/50"
                        }`}
                      >
                        <span>{langConfig[key].icon}</span>
                        <span>{langConfig[key].label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* DYNAMIC CODE WRAPPER */}
                <div className="relative bg-gray-950 text-green-400 p-5 rounded-2xl border border-gray-800 font-mono text-[11px] leading-relaxed shadow-inner flex-1 max-h-[380px] overflow-y-auto overflow-x-auto">
                  <pre className="whitespace-pre">{langConfig[activeLang].code}</pre>
                  <button
                    onClick={() => copyToClipboard(langConfig[activeLang].code, "code")}
                    className="absolute top-3.5 right-3.5 p-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-400 hover:text-white rounded-xl transition duration-200 cursor-pointer shadow-md"
                    title="Copy code snippet"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>

              {/* INTEGRATION GUIDE FOR ACTIVE LANGUAGE */}
              <div className="bg-green-50/50 rounded-2xl p-5 border border-green-100/60 space-y-3">
                <div className="flex items-center gap-2 text-green-800">
                  <HelpCircle size={16} />
                  <span className="font-extrabold text-xs uppercase tracking-wider">How to Use ({langConfig[activeLang].label})</span>
                </div>
                <ul className="space-y-2">
                  {langConfig[activeLang].guide.map((step, idx) => (
                    <li key={idx} className="text-gray-600 text-xs flex gap-2 items-start leading-relaxed font-medium">
                      <span className="text-green-600 font-bold shrink-0 mt-0.5">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* RESPONSE SPECIFICATION */}
              <div className="space-y-2.5">
                <span className="text-xs text-gray-700 font-bold uppercase tracking-wider block">API HTTP Response</span>
                <pre className="bg-gray-900 text-emerald-400 p-4 rounded-2xl font-mono text-[11px] overflow-x-auto leading-relaxed border border-gray-800 shadow-inner">
{`{
  "success": true,
  "message": "SMS processed",
  "total": 1,
  "successful": 1,
  "failed": []
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}