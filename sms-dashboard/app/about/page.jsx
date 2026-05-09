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
      <section className="bg-gradient-to-r from-green-600 to-teal-600 pt-24 pb-16 px-4 text-center">

        <h1 className="text-5xl font-black text-white">
          SMS SaaS Platform
        </h1>

        <p className="mt-4 text-white/90 max-w-3xl mx-auto text-sm md:text-base">
          A modern communication infrastructure for businesses to send,
          manage, and analyze SMS campaigns at scale with real-time delivery
          tracking and smart recipient management.
        </p>

      </section>

      {/* SYSTEM OVERVIEW */}
      <section className="max-w-6xl mx-auto px-4 py-12">

        <h2 className="text-3xl font-black mb-6">
          System Overview
        </h2>

        <Card className="rounded-3xl shadow-xl border-0">
          <CardContent className="p-6 text-gray-600 dark:text-gray-300 space-y-3 text-sm md:text-base">

            <p>
              The SMS SaaS platform is built as a full-stack communication system
              designed to help businesses automate bulk messaging, manage contacts,
              and track campaign performance in real time.
            </p>

            <p>
              It consists of three core modules: <b>Recipients Management</b>,
              <b> Campaign Engine</b>, and <b>Message Delivery System</b>.
              Each module is connected through a secure API layer that ensures
              scalability and reliability.
            </p>

            <p>
              The backend handles authentication, message queuing, and delivery
              tracking, while the frontend provides a clean dashboard for managing
              campaigns and audience segmentation.
            </p>

          </CardContent>
        </Card>

      </section>

      {/* CORE FEATURES */}
      <section className="max-w-6xl mx-auto px-4 py-6">

        <h2 className="text-3xl font-black mb-6">
          Core Features
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          {[
            {
              title: "Smart Recipient Groups",
              desc: "Organize contacts into reusable groups for targeted campaigns.",
            },
            {
              title: "Campaign Automation",
              desc: "Create and send SMS campaigns with real-time delivery tracking.",
            },
            {
              title: "Delivery Analytics",
              desc: "Monitor message status, performance, and engagement insights.",
            },
            {
              title: "Scalable Architecture",
              desc: "Built with a modular backend to handle high-volume messaging.",
            },
            {
              title: "Secure API Layer",
              desc: "All communication is protected using secure RESTful APIs.",
            },
            {
              title: "Modern Dashboard",
              desc: "Clean UI for managing all SMS operations in one place.",
            },
          ].map((f, i) => (
            <Card key={i} className="rounded-3xl shadow-lg border-0">
              <CardContent className="p-5">
                <h3 className="font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {f.desc}
                </p>
              </CardContent>
            </Card>
          ))}

        </div>

      </section>

      {/* ARCHITECTURE */}
      <section className="max-w-6xl mx-auto px-4 py-10">

        <h2 className="text-3xl font-black mb-6">
          System Architecture
        </h2>

        <Card className="rounded-3xl shadow-xl border-0">
          <CardContent className="p-6 text-sm md:text-base text-gray-600 dark:text-gray-300 space-y-2">

            <p><b>Frontend:</b> Next.js dashboard with Tailwind UI components</p>
            <p><b>Backend:</b> Node.js REST API with modular services</p>
            <p><b>Database:</b> MongoDB for storing users, campaigns, and recipients</p>
            <p><b>Messaging Engine:</b> Asynchronous SMS queue processing system</p>
            <p><b>Deployment:</b> Cloud-based scalable infrastructure (Vercel + backend host)</p>

          </CardContent>
        </Card>

      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-4 text-center">

        <Card className="rounded-3xl shadow-xl border-0">
          <CardContent className="p-6">
            <h2 className="text-3xl font-black text-green-600">99.9%</h2>
            <p className="text-sm text-gray-500">Delivery Reliability</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-xl border-0">
          <CardContent className="p-6">
            <h2 className="text-3xl font-black text-green-600">10K+</h2>
            <p className="text-sm text-gray-500">Messages Processed</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-xl border-0">
          <CardContent className="p-6">
            <h2 className="text-3xl font-black text-green-600">24/7</h2>
            <p className="text-sm text-gray-500">System Availability</p>
          </CardContent>
        </Card>

      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-4xl mx-auto px-4 py-10 text-center">

        <h2 className="text-3xl font-black mb-6">
          What Clients Say
        </h2>

        <Card className="rounded-3xl shadow-2xl border-0">
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