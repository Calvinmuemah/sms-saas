"use client";

import Navbar from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-r from-green-400 to-teal-600 pt-24 pb-16 text-center">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
          Contact Us
        </h1>

        <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
          Have questions or feedback? Reach out to our team and we'll get back to you promptly.
        </p>
      </section>

      {/* Contact Section */}
      <section className="py-16 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        
        {/* Form */}
        <div>
          {submitted && (
            <div className="mb-6 text-green-600 font-semibold text-center">
              Thank you! Your message has been sent.
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 flex flex-col gap-6"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />

            <Button
              type="submit"
              className="bg-green-600 text-white hover:bg-green-700 transition"
            >
              Send Message
            </Button>
          </form>
        </div>

        {/* Contact Info + Map */}
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
            <h4 className="text-xl font-bold mb-2">Our Office</h4>
            <p>123 SMS Street, Tech City, Bahrain</p>
            <p>Email: support@smsdashboard.com</p>
            <p>Phone: +973 1234 5678</p>
          </div>

          <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.123456789!2d50.585!3d26.210!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49b123456789%3A0xabcdef123456!2sBahrain!5e0!3m2!1sen!2s!4v1610000000000!5m2!1sen!2s"
              className="w-full h-full border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-6 text-center mt-auto">
        <p>&copy; {new Date().getFullYear()} SMS Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}