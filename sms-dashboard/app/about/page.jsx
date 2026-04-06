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

  const nextTestimonial = () =>
    setCurrent((prev) => (prev + 1) % testimonials.length);

  const prevTestimonial = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-r from-green-400 to-teal-600 pt-24 pb-16 text-center">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
          About Us
        </h1>

        <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
          We are committed to providing a powerful SMS management platform that keeps your audience engaged and informed.
        </p>
      </section>

      {/* Our Mission & Values */}
      <section className="py-16 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
        <Card className="shadow-xl rounded-xl hover:scale-105 transition-transform">
          <CardContent>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p>Empower businesses to communicate seamlessly with their audience via SMS.</p>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-xl hover:scale-105 transition-transform">
          <CardContent>
            <h3 className="text-2xl font-bold mb-4">Our Values</h3>
            <p>Reliability, transparency, and user-centric design drive everything we build.</p>
          </CardContent>
        </Card>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-8">Meet the Team</h3>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg rounded-xl hover:scale-105 transition-transform">
              <CardContent className="text-center">
                <img src="/team1.jpg" alt="Team Member" className="w-24 h-24 mx-auto rounded-full mb-4" />
                <h4 className="font-bold text-lg">Alice Johnson</h4>
                <p className="text-gray-600 dark:text-gray-300">CEO & Founder</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-xl hover:scale-105 transition-transform">
              <CardContent className="text-center">
                <img src="/team2.jpg" alt="Team Member" className="w-24 h-24 mx-auto rounded-full mb-4" />
                <h4 className="font-bold text-lg">Bob Smith</h4>
                <p className="text-gray-600 dark:text-gray-300">CTO</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-xl hover:scale-105 transition-transform">
              <CardContent className="text-center">
                <img src="/team3.jpg" alt="Team Member" className="w-24 h-24 mx-auto rounded-full mb-4" />
                <h4 className="font-bold text-lg">Clara Lee</h4>
                <p className="text-gray-600 dark:text-gray-300">Head of Product</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 max-w-4xl mx-auto px-6 text-center">
        <h3 className="text-3xl font-bold mb-8">What Our Clients Say</h3>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 mx-auto transition-opacity duration-300">
          <p className="text-gray-700 dark:text-gray-300 italic mb-4">
            "{testimonials[current].feedback}"
          </p>
          <h4 className="font-bold text-green-600 dark:text-green-400">
            {testimonials[current].name}
          </h4>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={prevTestimonial}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Prev
          </button>

          <button
            onClick={nextTestimonial}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Next
          </button>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-6 text-center mt-auto">
        <p>&copy; {new Date().getFullYear()} SMS Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}