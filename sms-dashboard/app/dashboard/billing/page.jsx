"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BillingPage() {
  const currentPlan = "Free";
  const usage = 45;
  const limit = 100;

  const plans = [
    {
      name: "Free",
      price: "$0",
      features: ["100 SMS/month"],
    },
    {
      name: "Pro",
      price: "$10",
      features: ["1000 SMS/month"],
    },
    {
      name: "Business",
      price: "$25",
      features: ["Unlimited SMS"],
    },
  ];

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-gray-500">Manage your subscription</p>
      </div>

      {/* Current Plan */}
      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Current Plan</h2>

          <p className="text-lg font-bold">{currentPlan}</p>

          <div>
            <p className="text-sm text-gray-500">Usage</p>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{ width: `${(usage / limit) * 100}%` }}
              />
            </div>
            <p className="text-sm mt-1">
              {usage} / {limit} SMS used
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <Card key={i} className="shadow-xl rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">{plan.name}</h2>
              <p className="text-3xl font-bold">{plan.price}/mo</p>

              <ul className="text-sm text-gray-500 space-y-1">
                {plan.features.map((f, idx) => (
                  <li key={idx}>✔ {f}</li>
                ))}
              </ul>

              <Button className="w-full bg-green-600 hover:bg-green-700">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}