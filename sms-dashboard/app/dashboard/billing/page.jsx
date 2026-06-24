"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Zap,
  ShieldCheck,
  CreditCard,
  PlusCircle,
  TrendingUp,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api";

export default function BillingPage() {
  const [billing, setBilling] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchBilling = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/billing`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (data.success) {
        setBilling(data.data);
      } else {
        throw new Error(data.error || "Failed to load billing metrics");
      }
    } catch (err) {
      toast.error(err.message || "Failed to load billing");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBilling();
  }, []);

  const handleRecharge = async (e) => {
    e.preventDefault();
    const amount = parseFloat(rechargeAmount);
    if (isNaN(amount) || amount <= 0) {
      return toast.warning("Please enter a valid amount in KSh");
    }

    try {
      setActionLoading(true);
      const res = await fetch(`${API_BASE_URL}/billing/recharge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Recharged KSh ${amount.toFixed(2)} successfully! Plan updated.`);
        setBilling(data.data);
        setRechargeAmount("");
      } else {
        throw new Error(data.error || "Recharge failed");
      }
    } catch (err) {
      toast.error(err.message || "Failed to process recharge");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSwitchPlan = async (targetPlan) => {
    try {
      setActionLoading(true);
      const res = await fetch(`${API_BASE_URL}/billing/plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ plan: targetPlan }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Switched to ${targetPlan === "free" ? "Free Starter" : "Pay As You Go"} plan!`);
        setBilling(data.data);
      } else {
        throw new Error(data.error || "Failed to switch plan");
      }
    } catch (err) {
      toast.error(err.message || "Failed to switch plan");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading && !billing) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
      </div>
    );
  }

  const { plan = "free", balance = 0, smsSentFree = 0, freeLimit = 20 } = billing || {};

  const isFreePlan = plan === "free";
  const freeRemaining = Math.max(0, freeLimit - smsSentFree);
  const usagePercentage = Math.min(100, (smsSentFree / freeLimit) * 100);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white">
            Billing & Usage
          </h1>
          <p className="text-gray-500 text-sm mt-1.5 dark:text-gray-400">
            Monitor SMS dispatch counters, recharge account balances, and upgrade service plans.
          </p>
        </div>
        <Button
          onClick={fetchBilling}
          variant="outline"
          className="rounded-xl h-10 w-fit shrink-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <RefreshCw size={14} className={loading ? "animate-spin text-green-600" : ""} />
          Refresh Stats
        </Button>
      </div>

      {/* ACTIVE SUBSCRIPTION OVERVIEW */}
      <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-800 text-white relative transition-all duration-300 hover:shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-10 translate-x-10 pointer-events-none"></div>
        <CardContent className="p-8 md:p-10 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            
            {/* LEFT: PLAN DETAIL */}
            <div className="space-y-4 flex-1">
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/10 px-4.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                {isFreePlan ? <ShieldCheck className="w-4 h-4 text-emerald-200" /> : <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />}
                Active Subscription Plan
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-black">
                  {isFreePlan ? "Free Starter" : "Pay As You Go"}
                </h2>
                <p className="text-green-50 text-sm mt-2 font-medium max-w-xl leading-relaxed">
                  {isFreePlan 
                    ? `You are on the free testing plan. You have a lifetime limit of ${freeLimit} SMS messages. Upgrade to expand capacity.`
                    : "You are on the developer Pay As You Go plan. Every SMS dispatched is charged at a flat rate of 1.00 KSh."
                  }
                </p>
              </div>
            </div>

            {/* RIGHT: PLAN METRICS */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-full lg:w-[360px] shrink-0 space-y-4 shadow-inner">
              {isFreePlan ? (
                // Free Plan counter progress
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-green-150 uppercase tracking-wider">Free SMS Capacity</span>
                    <span>{smsSentFree} / {freeLimit} Sent</span>
                  </div>
                  
                  {/* PROGRESS BAR */}
                  <div className="w-full bg-white/25 rounded-full h-3.5 overflow-hidden shadow-inner">
                    <div
                      className="bg-white h-full rounded-full transition-all duration-500"
                      style={{ width: `${usagePercentage}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-[11px] text-green-100 font-bold">
                    <span>{freeRemaining} SMS remaining</span>
                    {freeRemaining === 0 && <span className="text-yellow-300 animate-pulse">Limit Reached!</span>}
                  </div>
                </div>
              ) : (
                // PAYG balance details
                <div className="space-y-2">
                  <span className="text-xs text-green-150 font-bold uppercase tracking-wider block">Available Balance</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black tracking-tight">KSh {balance.toFixed(2)}</span>
                  </div>
                  <div className="text-[11px] text-green-100 font-bold flex justify-between pt-1 border-t border-white/10 mt-2">
                    <span>SMS Dispatch Rate:</span>
                    <span>1.00 KSh / recipient</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* LEFT COLUMN: RECHARGE OR PLAN SWITCHING (3 spans) */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* SIMULATED RECHARGE FORM (SHOW IN BOTH BUT STRONGLY RECOMMENDED IN PAYG) */}
          <Card className="border-0 shadow-lg rounded-3xl bg-white dark:bg-gray-900 border-t-4 border-emerald-600 transition duration-300 hover:shadow-xl">
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shadow-inner shrink-0">
                  <PlusCircle className="text-emerald-600 dark:text-emerald-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Recharge Wallet Balance</h3>
                  <p className="text-gray-500 text-xs dark:text-gray-400">Load KSh credits to fund Pay As You Go dispatches</p>
                </div>
              </div>

              <form onSubmit={handleRecharge} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="amount" className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider block">
                    Amount to Deposit (KSh)
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">KSh</span>
                      <Input
                        id="amount"
                        type="number"
                        min="1"
                        step="any"
                        placeholder="e.g. 500, 1000"
                        value={rechargeAmount}
                        onChange={(e) => setRechargeAmount(e.target.value)}
                        className="h-12 rounded-xl border-gray-200 focus-visible:ring-green-500 text-sm font-semibold pl-12 pr-4 flex-1 w-full dark:border-gray-800"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={actionLoading}
                      className="bg-green-600 hover:bg-green-700 h-12 rounded-xl px-6 cursor-pointer shrink-0 text-white font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                    >
                      {actionLoading ? "Processing..." : (
                        <>
                          <CreditCard size={16} />
                          Recharge Wallet
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                {isFreePlan && (
                  <div className="flex gap-2.5 items-start bg-blue-50 dark:bg-blue-950/20 border border-blue-100/60 dark:border-blue-900/40 rounded-2xl p-4.5 text-xs text-blue-800 dark:text-blue-300 leading-relaxed font-semibold">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <span>
                      Depositing any amount automatically shifts your active tier to <strong>Pay As You Go</strong>, unlocking sending limits beyond the first 20 free SMS.
                    </span>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* PLAN COMPARATIVE TIER CARDS */}
          <div className="grid sm:grid-cols-2 gap-6">
            
            {/* FREE PLAN COMPARATOR */}
            <Card className={`rounded-3xl border-0 shadow-lg relative overflow-hidden transition-all duration-300 bg-white dark:bg-gray-900 ${isFreePlan ? "ring-2 ring-green-600" : ""}`}>
              <CardContent className="p-6 space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center border border-gray-100 dark:border-gray-800 shrink-0">
                    <ShieldCheck className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Free Starter</h4>
                    <p className="text-gray-500 text-xs mt-1 dark:text-gray-400">Lifetime limits for account testing</p>
                  </div>
                  <div className="flex items-baseline gap-1 text-gray-900 dark:text-white">
                    <span className="text-3xl font-black">KSh 0</span>
                    <span className="text-gray-400 text-xs">/ forever</span>
                  </div>
                  <ul className="space-y-2 border-t border-gray-100 dark:border-gray-800 pt-4 text-xs font-semibold text-gray-600 dark:text-gray-400">
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-green-600" />
                      <span>20 SMS lifetime quota limit</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-green-600" />
                      <span>Standard web dashboard access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-green-600" />
                      <span>Developer API credentials</span>
                    </li>
                  </ul>
                </div>

                <Button
                  onClick={() => handleSwitchPlan("free")}
                  disabled={isFreePlan || actionLoading}
                  className={`w-full rounded-xl h-11 font-bold mt-6 shadow-sm transition active:scale-95 ${
                    isFreePlan 
                      ? "bg-gray-150 hover:bg-gray-150 text-gray-500 cursor-not-allowed border dark:border-gray-800 dark:bg-gray-800 dark:text-gray-500"
                      : "bg-gray-900 hover:bg-black text-white"
                  }`}
                >
                  {isFreePlan ? "Current Plan" : "Switch to Free"}
                </Button>
              </CardContent>
            </Card>

            {/* PAYG PLAN COMPARATOR */}
            <Card className={`rounded-3xl border-0 shadow-lg relative overflow-hidden transition-all duration-300 bg-white dark:bg-gray-900 ${!isFreePlan ? "ring-2 ring-green-600 animate-pulse-slow" : ""}`}>
              <CardContent className="p-6 space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-950/20 flex items-center justify-center border border-green-100/50 dark:border-green-900/30 shrink-0">
                    <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Pay As You Go</h4>
                    <p className="text-gray-500 text-xs mt-1 dark:text-gray-400">Scale campaigns without limits</p>
                  </div>
                  <div className="flex items-baseline gap-1 text-gray-900 dark:text-white">
                    <span className="text-3xl font-black">KSh 1</span>
                    <span className="text-gray-400 text-xs">/ SMS sent</span>
                  </div>
                  <ul className="space-y-2 border-t border-gray-100 dark:border-gray-800 pt-4 text-xs font-semibold text-gray-600 dark:text-gray-400">
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-green-600" />
                      <span>Unlimited message dispatches</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-green-600" />
                      <span>Pay strictly for what you send</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-green-600" />
                      <span>Campaign builder & scheduler</span>
                    </li>
                  </ul>
                </div>

                <Button
                  onClick={() => handleSwitchPlan("payg")}
                  disabled={!isFreePlan || actionLoading}
                  className={`w-full rounded-xl h-11 font-bold mt-6 shadow-sm transition active:scale-95 ${
                    !isFreePlan
                      ? "bg-gray-150 hover:bg-gray-150 text-gray-500 cursor-not-allowed border dark:border-gray-800 dark:bg-gray-800 dark:text-gray-500"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {!isFreePlan ? "Current Plan" : "Switch to PAYG"}
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* RIGHT COLUMN: USAGE GUIDELINES & BILLING SPECS (2 spans) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* PRICING DOCUMENTATION & EXAMPLES */}
          <Card className="border-0 shadow-lg rounded-3xl bg-white dark:bg-gray-900 transition duration-300 hover:shadow-xl h-full flex flex-col justify-between">
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3.5 border-b border-gray-150/60 dark:border-gray-850 pb-5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center shadow-inner shrink-0">
                  <TrendingUp className="text-emerald-700 dark:text-emerald-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">PAYG Pricing Calculator</h3>
                  <p className="text-gray-500 text-xs dark:text-gray-400">Clear example billing structures</p>
                </div>
              </div>

              <div className="space-y-4 text-xs font-semibold text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  Our Pay As You Go platform operates on a single variable rate. You are charged <strong>1 KSh</strong> for every message sent to a unique number.
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-950/40 p-4.5 rounded-2xl border border-gray-100 dark:border-gray-850 space-y-3 text-gray-800 dark:text-gray-300 font-bold">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Example Scenario</span>
                  <div className="flex justify-between text-xs">
                    <span>Message content size:</span>
                    <span>1 message block (160 char)</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Recipient List Size:</span>
                    <span>10 unique numbers</span>
                  </div>
                  <div className="border-t border-gray-200/50 dark:border-gray-800/50 pt-2.5 flex justify-between text-sm text-green-700 dark:text-green-400 font-black">
                    <span>Total Cost Charged:</span>
                    <span>KSh 10.00</span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start bg-amber-50 dark:bg-amber-950/20 border border-amber-100/60 dark:border-amber-900/40 rounded-2xl p-4.5 text-amber-800 dark:text-amber-300 leading-normal">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>
                    Scheduled campaigns check your available balance right before triggering. Ensure you keep your balance above the required count, otherwise scheduled sends will fail during background polling.
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}