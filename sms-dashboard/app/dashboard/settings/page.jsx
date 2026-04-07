"use client";

import Navbar from "@/components/ui/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />

      <div className="pt-24 max-w-3xl mx-auto px-6 space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>

        <Card className="shadow-xl rounded-2xl">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Profile</h2>

            <Input placeholder="Your Name" />
            <Input placeholder="Email Address" />

            <Button className="bg-green-600 hover:bg-green-700">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">SMS Settings</h2>

            <Input placeholder="Sender ID" />
            <Input placeholder="Default Message Prefix" />

            <Button className="bg-green-600 hover:bg-green-700">
              Save Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}