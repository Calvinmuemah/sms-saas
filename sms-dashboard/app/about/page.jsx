"use client";

import Navbar from "@/components/ui/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export default function About() {
  const testimonials = [
    { name: "Acme Corp", feedback: "SMS Dashboard transformed our communication with clients!" },
    { name: "Beta Inc", feedback: "The platform is intuitive and delivers real results." },
    { name: "Gamma LLC", feedback: "Opt-in management and analytics are top-notch." },
  ];

  const [current, setCurrent] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">

      <Navbar />

      {/* HERO */}
      <section className="bg-gradient-to-r from-green-500 to-teal-600 pt-24 pb-14 text-center px-3 md:px-4">

        <h1 className="text-5xl font-black text-white">
          About Us
        </h1>

        <p className="mt-3 text-white/90 max-w-2xl mx-auto text-sm md:text-base">
          We build a powerful SMS platform that helps businesses connect with customers instantly, reliably, and at scale.
        </p>

      </section>

      {/* MISSION / VALUES */}
      <section className="px-3 md:px-4 py-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-4">

        <Card className="rounded-3xl shadow-xl border-0">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Empower businesses to communicate seamlessly with their audience through fast and reliable SMS delivery.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-xl border-0">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">Our Values</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Simplicity, reliability, and user-focused design guide every feature we build.
            </p>
          </CardContent>
        </Card>

      </section>

      {/* TEAM */}
      <section className="px-3 md:px-4 py-10 max-w-6xl mx-auto text-center">

        <h2 className="text-3xl font-black mb-6">Meet the Team</h2>

        <div className="grid md:grid-cols-3 gap-4">

          {[
            { name: "Alice Johnson", role: "CEO & Founder", img: "/team1.jpg" },
            { name: "Bob Smith", role: "CTO", img: "/team2.jpg" },
            { name: "Clara Lee", role: "Head of Product", img: "/team3.jpg" },
          ].map((t, i) => (
            <Card key={i} className="rounded-3xl shadow-xl border-0 hover:scale-[1.02] transition">
              <CardContent className="p-6 text-center">

                <img
                  src={t.img}
                  alt={t.name}
                  className="w-20 h-20 mx-auto rounded-2xl object-cover mb-4"
                />

                <h4 className="font-bold">{t.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {t.role}
                </p>

              </CardContent>
            </Card>
          ))}

        </div>

      </section>

      {/* TESTIMONIALS */}
      <section className="px-3 md:px-4 py-10 max-w-4xl mx-auto text-center">

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
      <footer className="mt-auto py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SMS Dashboard
      </footer>

    </div>
  );
}