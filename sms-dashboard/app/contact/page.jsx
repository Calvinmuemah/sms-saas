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
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">

      <Navbar />

      {/* HERO */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 pt-24 pb-14 text-center px-2 md:px-4">

        <h1 className="text-5xl font-black text-white">
          Contact Us
        </h1>

        <p className="mt-3 text-white/90 max-w-3xl mx-auto text-sm md:text-base">
          Have questions, feedback, or need support? Our team is ready to help you
          with anything related to the SMS platform.
        </p>

      </section>

      {/* MAIN SECTION */}
      <section className="px-2 md:px-4 py-10 grid lg:grid-cols-2 gap-4">

        {/* FORM */}
        <div>

          {submitted && (
            <div className="mb-4 p-3 rounded-xl bg-green-100 text-green-700 font-semibold text-sm">
              Message sent successfully ✔ We’ll get back to you soon.
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-6">

            <h2 className="text-2xl font-black mb-5">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <textarea
                name="message"
                placeholder="Your Message..."
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-green-500 outline-none resize-none"
              />

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl h-12"
              >
                Send Message
              </Button>

            </form>

          </div>

        </div>

        {/* CONTACT INFO */}
        <div className="space-y-4">

          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-6">

            <h3 className="text-xl font-bold mb-3">
              Contact Information
            </h3>

            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">

              <p><b>Office:</b> Nairobi Tech Hub, Kenya</p>
              <p><b>Email:</b> support@smsdashboard.com</p>
              <p><b>Phone:</b> +254 700 000 000</p>

            </div>

          </div>

          {/* MAP */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl overflow-hidden h-64">

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18..."
              className="w-full h-full border-0"
              loading="lazy"
            ></iframe>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SMS SaaS Platform
      </footer>

    </div>
  );
}