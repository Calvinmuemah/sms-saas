"use client";

import Navbar from "@/components/ui/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export default function About() {
  const [current, setCurrent] = useState(0);

  const testimonials = [
    {
      name: "Acme Corp",
      feedback:
        "The SMS system improved our customer engagement by over 60%. Reliable, fast, and scalable.",
    },
    {
      name: "Beta Inc",
      feedback:
        "We replaced multiple tools with this platform. Everything is centralized and easy to manage.",
    },
    {
      name: "Gamma LLC",
      feedback:
        "The analytics and campaign system gives us full control over our messaging strategy.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">

      <Navbar />

      {/* HERO */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 pt-24 pb-16 text-center px-2 md:px-4">

        <h1 className="text-5xl font-black text-white">
          SMS SaaS Platform
        </h1>

        <p className="mt-4 text-white/90 text-sm md:text-base max-w-4xl mx-auto">
          A modern communication infrastructure for businesses to send,
          manage, and analyze SMS campaigns at scale with real-time delivery tracking.
        </p>

      </section>

      {/* SYSTEM OVERVIEW */}
      <section className="px-2 md:px-4 py-10">

        <h2 className="text-3xl font-black mb-4">
          System Overview
        </h2>

        <Card className="rounded-3xl shadow-xl border-0">
          <CardContent className="p-6 space-y-3 text-sm md:text-base text-gray-600 dark:text-gray-300">

            <p>
              The SMS SaaS platform is a full-stack communication system built to
              automate SMS delivery, manage recipients, and track campaign performance.
            </p>

            <p>
              It is composed of three core modules: recipient management,
              campaign engine, and message delivery service — all connected through
              a scalable API architecture.
            </p>

            <p>
              The system ensures high reliability through asynchronous processing
              and real-time status tracking for every message sent.
            </p>

          </CardContent>
        </Card>

      </section>

      {/* FEATURES */}
      <section className="px-2 md:px-4 py-8">

        <h2 className="text-3xl font-black mb-4">
          Core Features
        </h2>

        <div className="grid md:grid-cols-3 gap-3">

          {[
            {
              title: "Recipient Management",
              desc: "Organize contacts into reusable groups for targeted messaging.",
            },
            {
              title: "Campaign Engine",
              desc: "Create, schedule, and send SMS campaigns instantly.",
            },
            {
              title: "Delivery Tracking",
              desc: "Monitor message status in real-time with analytics.",
            },
            {
              title: "Scalable Backend",
              desc: "Built for high-volume messaging workloads.",
            },
            {
              title: "Secure API Layer",
              desc: "Protected endpoints with structured request handling.",
            },
            {
              title: "Modern Dashboard",
              desc: "Clean and intuitive UI for managing all operations.",
            },
          ].map((f, i) => (
            <Card key={i} className="rounded-3xl shadow-lg border-0">
              <CardContent className="p-5">
                <h3 className="font-bold mb-1">{f.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {f.desc}
                </p>
              </CardContent>
            </Card>
          ))}

        </div>

      </section>

      {/* ARCHITECTURE */}
      <section className="px-2 md:px-4 py-10">

        <h2 className="text-3xl font-black mb-4">
          Architecture
        </h2>

        <Card className="rounded-3xl shadow-xl border-0">
          <CardContent className="p-6 space-y-2 text-sm md:text-base text-gray-600 dark:text-gray-300">

            <p><b>Frontend:</b> Next.js + Tailwind dashboard UI</p>
            <p><b>Backend:</b> Node.js REST API services</p>
            <p><b>Database:</b> MongoDB for campaigns and contacts</p>
            <p><b>Messaging:</b> Queue-based SMS delivery system</p>
            <p><b>Deployment:</b> Cloud-hosted scalable infrastructure</p>

          </CardContent>
        </Card>

      </section>

      {/* STATS */}
      <section className="px-2 md:px-4 py-10 grid md:grid-cols-3 gap-3 text-center">

        <Card className="rounded-3xl shadow-xl border-0">
          <CardContent className="p-6">
            <h2 className="text-3xl font-black text-green-600">99.9%</h2>
            <p className="text-sm text-gray-500">Delivery Rate</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-xl border-0">
          <CardContent className="p-6">
            <h2 className="text-3xl font-black text-green-600">10K+</h2>
            <p className="text-sm text-gray-500">Messages Sent</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-xl border-0">
          <CardContent className="p-6">
            <h2 className="text-3xl font-black text-green-600">24/7</h2>
            <p className="text-sm text-gray-500">System Uptime</p>
          </CardContent>
        </Card>

      </section>

      {/* TESTIMONIALS */}
      <section className="px-2 md:px-4 py-10 text-center">

        <h2 className="text-3xl font-black mb-4">
          What Clients Say
        </h2>

        <Card className="rounded-3xl shadow-2xl border-0 max-w-3xl mx-auto">
          <CardContent className="p-8">

            <p className="italic text-gray-600 dark:text-gray-300">
              “{testimonials[current].feedback}”
            </p>

            <h4 className="mt-4 font-bold text-green-600">
              {testimonials[current].name}
            </h4>

          </CardContent>
        </Card>

        <div className="flex justify-center gap-3 mt-5">

          <button
            onClick={() =>
              setCurrent((p) =>
                p === 0 ? testimonials.length - 1 : p - 1
              )
            }
            className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
          >
            Prev
          </button>

          <button
            onClick={() =>
              setCurrent((p) => (p + 1) % testimonials.length)
            }
            className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
          >
            Next
          </button>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SMS SaaS Platform
      </footer>

    </div>
  );
}