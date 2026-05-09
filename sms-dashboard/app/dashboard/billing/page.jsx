"use client";

import {
  Check,
  Crown,
  Zap,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

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
      icon: ShieldCheck,
      description: "Perfect for getting started",
      features: [
        "100 SMS/month",
        "Basic analytics",
        "Community support",
      ],
      current: true,
    },
    {
      name: "Pro",
      price: "$10",
      icon: Zap,
      description: "Best for growing businesses",
      features: [
        "1000 SMS/month",
        "Advanced analytics",
        "Priority support",
        "Custom sender ID",
      ],
      popular: true,
    },
    {
      name: "Business",
      price: "$25",
      icon: Crown,
      description: "For large-scale messaging",
      features: [
        "Unlimited SMS",
        "Team access",
        "Premium support",
        "Dedicated API",
      ],
    },
  ];

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Billing & Plans
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your subscription, SMS usage, and billing.
          </p>
        </div>

        <Button className="bg-green-600 hover:bg-green-700 rounded-xl shadow-md">
          <CreditCard className="w-4 h-4 mr-2" />
          Manage Payment
        </Button>

      </div>

      {/* CURRENT PLAN */}
      <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white">

        <CardContent className="p-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            {/* LEFT */}
            <div className="space-y-4">

              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1 rounded-full text-sm backdrop-blur">
                <ShieldCheck className="w-4 h-4" />
                Active Subscription
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  {currentPlan} Plan
                </h2>

                <p className="text-green-100 mt-2">
                  You are currently using the free starter package.
                </p>
              </div>

            </div>

            {/* RIGHT */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-full lg:w-[340px]">

              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-green-100">
                  SMS Usage
                </p>

                <p className="text-sm font-semibold">
                  {usage}/{limit}
                </p>
              </div>

              {/* PROGRESS */}
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-white h-3 rounded-full transition-all duration-700"
                  style={{ width: `${(usage / limit) * 100}%` }}
                />
              </div>

              <p className="text-xs text-green-100 mt-3">
                {limit - usage} SMS remaining this month
              </p>

            </div>

          </div>

        </CardContent>

      </Card>

      {/* PLANS */}
      <div className="grid lg:grid-cols-3 gap-6">

        {plans.map((plan, i) => {
          const Icon = plan.icon;

          return (
            <Card
              key={i}
              className={`relative rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
                plan.popular
                  ? "ring-2 ring-green-500"
                  : ""
              }`}
            >

              {/* POPULAR BADGE */}
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  Most Popular
                </div>
              )}

              <CardContent className="p-8 space-y-6">

                {/* TOP */}
                <div className="space-y-4">

                  <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-green-600" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {plan.name}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {plan.description}
                    </p>
                  </div>

                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black text-gray-900">
                      {plan.price}
                    </span>

                    <span className="text-gray-500 mb-1">
                      /month
                    </span>
                  </div>

                </div>

                {/* FEATURES */}
                <div className="space-y-3">

                  {plan.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3"
                    >

                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>

                      <p className="text-sm text-gray-600">
                        {feature}
                      </p>

                    </div>
                  ))}

                </div>

                {/* BUTTON */}
                <Button
                  className={`w-full rounded-xl h-11 font-semibold transition ${
                    plan.current
                      ? "bg-gray-200 hover:bg-gray-200 text-gray-700 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                  disabled={plan.current}
                >
                  {plan.current ? "Current Plan" : "Upgrade Plan"}
                </Button>

              </CardContent>

            </Card>
          );
        })}

      </div>

      {/* BILLING INFO */}
      <Card className="rounded-3xl border-0 shadow-lg">

        <CardContent className="p-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Billing Information
              </h3>

              <p className="text-gray-500 mt-2 text-sm">
                Your invoices and payment history will appear here.
              </p>
            </div>

            <Button
              variant="outline"
              className="rounded-xl"
            >
              Download Invoice
            </Button>

          </div>

        </CardContent>

      </Card>

    </div>
  );
}