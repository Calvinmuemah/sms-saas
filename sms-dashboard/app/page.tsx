"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-400 to-teal-600 overflow-hidden min-h-[90vh] flex items-center justify-center pt-20">
        {/* Hero background illustration */}
        <img
          src="/hero-bg.png"
          alt="Hero Illustration"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />

        {/* Moving SVG shapes */}
        <motion.svg
          style={{ y: y1 }}
          className="absolute top-0 left-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff20"
            d="M0,128L80,122.7C160,117,320,107,480,133.3C640,160,800,224,960,245.3C1120,267,1280,245,1360,234.7L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </motion.svg>

        <motion.svg
          style={{ y: y2 }}
          className="absolute bottom-0 right-0 w-full h-full rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff10"
            d="M0,160L80,138.7C160,117,320,75,480,69.3C640,64,800,96,960,128C1120,160,1280,192,1360,208L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </motion.svg>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            SMS Dashboard
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-6 drop-shadow-sm max-w-3xl mx-auto">
            Send, manage, and track SMS messages in real-time. Keep your subscribers engaged with advanced analytics.
          </p>

          <Link href="/auth/register">
            <Button className="px-8 py-3 text-lg bg-white text-green-600 font-bold hover:bg-gray-100 transition">
              Get Started
            </Button>
          </Link>

          <motion.div
            className="mt-8 animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <svg className="w-8 h-8 mx-auto text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 14a1 1 0 01-.707-.293l-5-5a1 1 0 011.414-1.414L10 11.586l4.293-4.293a1 1 0 111.414 1.414l-5 5A1 1 0 0110 14z" clipRule="evenodd"/>
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <motion.div
          className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
          }}
        >
          <Card className="shadow-xl rounded-xl hover:scale-105 transition-transform">
            <CardContent>
              <h3 className="text-xl font-bold mb-2">Send SMS</h3>
              <p>Compose and send messages to all opted-in users with one click.</p>
            </CardContent>
          </Card>

          <Card className="shadow-xl rounded-xl hover:scale-105 transition-transform">
            <CardContent>
              <h3 className="text-xl font-bold mb-2">User Management</h3>
              <p>Track who opted in or out and manage your subscribers easily.</p>
            </CardContent>
          </Card>

          <Card className="shadow-xl rounded-xl hover:scale-105 transition-transform">
            <CardContent>
              <h3 className="text-xl font-bold mb-2">Analytics</h3>
              <p>Visualize delivery rates and opt-in statistics with charts and dashboards.</p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* CTA + Dashboard Preview */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4">See Your Dashboard in Action</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Monitor SMS delivery, user opt-ins, and campaign performance with our intuitive dashboard.
            </p>
            <Link href="/dashboard">
              <Button className="px-8 py-3 text-lg bg-green-600 text-white font-bold hover:bg-green-700 transition">
                Go to Dashboard
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="border rounded-2xl shadow-2xl overflow-hidden">
              <img
                src="/dashboard-preview.png"
                alt="Dashboard Preview"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Client Logos / Testimonials */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-8">Trusted by Clients</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <img src="/client1.png" alt="Client 1" className="h-12 grayscale hover:grayscale-0 transition"/>
            <img src="/client2.png" alt="Client 2" className="h-12 grayscale hover:grayscale-0 transition"/>
            <img src="/client3.png" alt="Client 3" className="h-12 grayscale hover:grayscale-0 transition"/>
            <img src="/client4.png" alt="Client 4" className="h-12 grayscale hover:grayscale-0 transition"/>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>&copy; {new Date().getFullYear()} SMS Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}