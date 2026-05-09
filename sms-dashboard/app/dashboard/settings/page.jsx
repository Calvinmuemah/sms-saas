"use client";

import {
  User,
  Mail,
  MessageSquare,
  Shield,
  Bell,
  KeyRound,
  Save,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Settings
          </h1>

          <p className="text-gray-500 text-sm">
            Manage account preferences and SMS configuration
          </p>
        </div>

        <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-2xl w-fit">
          <Shield size={18} />
          <span className="text-sm font-semibold">
            Secure Configuration
          </span>
        </div>

      </div>

      {/* GRID */}
      <div className="grid lg:grid-cols-3 gap-4">

        {/* LEFT */}
        <div className="space-y-4">

          {/* ACCOUNT CARD */}
          <Card className="rounded-2xl border-0 shadow-lg overflow-hidden">

            <div className="h-20 bg-gradient-to-r from-green-600 to-emerald-500" />

            <CardContent className="p-5 -mt-10">

              <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center border-4 border-white">
                <User size={28} className="text-green-600" />
              </div>

              <h2 className="mt-3 font-bold text-lg">
                Admin Account
              </h2>

              <p className="text-sm text-gray-500">
                Active & secured account
              </p>

              <div className="mt-4 space-y-2">

                <div className="flex justify-between bg-green-50 p-3 rounded-xl text-sm">
                  <span>Security</span>
                  <span className="text-green-600 font-semibold">
                    Strong
                  </span>
                </div>

                <div className="flex justify-between bg-gray-50 p-3 rounded-xl text-sm">
                  <span>Notifications</span>
                  <span className="font-semibold">Enabled</span>
                </div>

              </div>

            </CardContent>
          </Card>

          {/* QUICK SETTINGS */}
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardContent className="p-5 space-y-4">

              <h2 className="font-bold">Quick Settings</h2>

              <div className="flex justify-between items-center p-3 rounded-xl border">

                <div className="flex items-center gap-2">
                  <Bell size={16} className="text-green-600" />
                  <span className="text-sm">SMS Alerts</span>
                </div>

                <div className="w-10 h-5 bg-green-600 rounded-full" />
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl border">

                <div className="flex items-center gap-2">
                  <KeyRound size={16} className="text-green-600" />
                  <span className="text-sm">2FA</span>
                </div>

                <div className="w-10 h-5 bg-gray-300 rounded-full" />
              </div>

            </CardContent>
          </Card>

        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 space-y-4">

          {/* PROFILE */}
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardContent className="p-5 space-y-4">

              <h2 className="font-bold text-lg">
                Profile Settings
              </h2>

              <div className="grid md:grid-cols-2 gap-4">

                <Input placeholder="Full Name" />
                <Input placeholder="Email Address" />

              </div>

              <div className="flex justify-end">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Save size={16} className="mr-2" />
                  Save
                </Button>
              </div>

            </CardContent>
          </Card>

          {/* SMS CONFIG */}
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardContent className="p-5 space-y-4">

              <h2 className="font-bold text-lg">
                SMS Configuration
              </h2>

              <div className="grid md:grid-cols-2 gap-4">

                <Input placeholder="Sender ID" />
                <Input placeholder="Message Prefix" />

              </div>

              <Input type="password" placeholder="API Key" />

              <div className="flex justify-end">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Save size={16} className="mr-2" />
                  Save Settings
                </Button>
              </div>

            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
}