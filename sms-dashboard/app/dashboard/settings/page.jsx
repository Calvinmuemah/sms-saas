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
import DashboardLayout from "../../dashboard/layout";

export default function SettingsPage() {
  return (
    <DashboardLayout>

      <div className="min-h-screen bg-gradient-to-br from-white via-green-50/40 to-white text-gray-900">

        <div className="pt-24 pb-10 px-3 md:px-4">

          <div className="max-w-full space-y-8">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>
                <h1 className="text-4xl font-black tracking-tight">
                  Settings
                </h1>

                <p className="text-gray-500 mt-2">
                  Manage your account preferences and SMS configuration
                </p>
              </div>

              <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-2xl w-fit shadow-sm">
                <Shield size={18} />
                <span className="text-sm font-semibold">
                  Secure Configuration
                </span>
              </div>

            </div>

            {/* GRID */}
            <div className="grid lg:grid-cols-3 gap-6">

              {/* LEFT SIDE */}
              <div className="space-y-6">

                <Card className="rounded-3xl border-0 shadow-xl bg-white overflow-hidden">

                  <div className="h-24 bg-gradient-to-r from-green-600 to-emerald-500 relative">
                    <div className="absolute inset-0 bg-black/10" />
                  </div>

                  <CardContent className="p-6 -mt-10 relative">

                    <div className="w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center border-4 border-white">
                      <User size={34} className="text-green-600" />
                    </div>

                    <div className="mt-4">
                      <h2 className="text-xl font-bold">
                        Admin Account
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        Your account is active and protected
                      </p>
                    </div>

                    <div className="mt-5 space-y-3">

                      <div className="flex items-center justify-between bg-green-50 border border-green-100 rounded-2xl px-4 py-3">
                        <span className="text-sm text-gray-600">
                          Security
                        </span>

                        <span className="text-sm font-semibold text-green-700">
                          Strong
                        </span>
                      </div>

                      <div className="flex items-center justify-between bg-gray-50 border rounded-2xl px-4 py-3">
                        <span className="text-sm text-gray-600">
                          Notifications
                        </span>

                        <span className="text-sm font-semibold text-gray-900">
                          Enabled
                        </span>
                      </div>

                    </div>

                  </CardContent>

                </Card>

                <Card className="rounded-3xl border-0 shadow-xl bg-white">
                  <CardContent className="p-6">

                    <h2 className="text-lg font-bold mb-5">
                      Quick Preferences
                    </h2>

                    <div className="space-y-4">

                      <div className="flex items-center justify-between p-4 rounded-2xl border hover:border-green-200 transition">

                        <div className="flex items-center gap-3">
                          <Bell size={18} className="text-green-600" />

                          <div>
                            <p className="font-medium text-sm">
                              SMS Alerts
                            </p>

                            <p className="text-xs text-gray-500">
                              Receive delivery updates
                            </p>
                          </div>
                        </div>

                        <div className="w-11 h-6 bg-green-600 rounded-full relative cursor-pointer">
                          <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full" />
                        </div>

                      </div>

                      <div className="flex items-center justify-between p-4 rounded-2xl border hover:border-green-200 transition">

                        <div className="flex items-center gap-3">
                          <KeyRound size={18} className="text-green-600" />

                          <div>
                            <p className="font-medium text-sm">
                              Two-Factor Auth
                            </p>

                            <p className="text-xs text-gray-500">
                              Extra account protection
                            </p>
                          </div>
                        </div>

                        <div className="w-11 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                          <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full" />
                        </div>

                      </div>

                    </div>

                  </CardContent>
                </Card>

              </div>

              {/* RIGHT SIDE */}
              <div className="lg:col-span-2 space-y-6">

                <Card className="rounded-3xl border-0 shadow-xl bg-white">
                  <CardContent className="p-7 space-y-6">

                    <div>
                      <h2 className="text-2xl font-bold">
                        Profile Settings
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        Update your personal information
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">
                          Full Name
                        </label>

                        <div className="relative">
                          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <Input className="h-12 pl-11 rounded-xl border-gray-200 focus-visible:ring-green-500" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">
                          Email Address
                        </label>

                        <div className="relative">
                          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <Input className="h-12 pl-11 rounded-xl border-gray-200 focus-visible:ring-green-500" />
                        </div>
                      </div>

                    </div>

                    <div className="flex justify-end">
                      <Button className="bg-green-600 hover:bg-green-700 rounded-xl h-11 px-6 shadow-lg cursor-pointer">
                        <Save size={17} className="mr-2" />
                        Save Changes
                      </Button>
                    </div>

                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-0 shadow-xl bg-white">
                  <CardContent className="p-7 space-y-6">

                    <div>
                      <h2 className="text-2xl font-bold">
                        SMS Configuration
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        Customize your messaging preferences
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">
                          Sender ID
                        </label>

                        <div className="relative">
                          <MessageSquare size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <Input className="h-12 pl-11 rounded-xl border-gray-200 focus-visible:ring-green-500" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">
                          Message Prefix
                        </label>

                        <Input className="h-12 rounded-xl border-gray-200 focus-visible:ring-green-500" />
                      </div>

                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">
                        API Key
                      </label>

                      <div className="relative">
                        <KeyRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input type="password" className="h-12 pl-11 rounded-xl border-gray-200 focus-visible:ring-green-500" />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="bg-green-600 hover:bg-green-700 rounded-xl h-11 px-6 shadow-lg cursor-pointer">
                        <Save size={17} className="mr-2" />
                        Save Settings
                      </Button>
                    </div>

                  </CardContent>
                </Card>

              </div>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}