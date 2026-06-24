import * as service from "../services/billing.service.js";

export const getBilling = async (req, res) => {
  try {
    const userId = req.user.id;
    const details = await service.getBillingDetails(userId);
    res.json({ success: true, data: details });
  } catch (err) {
    console.error("Failed to get billing details:", err);
    res.status(500).json({ success: false, error: err.message || "Failed to fetch billing" });
  }
};

export const changePlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { plan } = req.body;
    const details = await service.switchPlan(userId, plan);
    res.json({ success: true, data: details });
  } catch (err) {
    console.error("Failed to change plan:", err);
    res.status(400).json({ success: false, error: err.message || "Failed to switch plan" });
  }
};

export const recharge = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount } = req.body;
    const details = await service.rechargeBalance(userId, amount);
    res.json({ success: true, data: details });
  } catch (err) {
    console.error("Failed to recharge balance:", err);
    res.status(400).json({ success: false, error: err.message || "Failed to recharge" });
  }
};

export const rechargePaystack = async (req, res) => {
  try {
    const userId = req.user.id;
    const { reference } = req.body;
    if (!reference) {
      return res.status(400).json({ success: false, error: "Transaction reference is required" });
    }
    const details = await service.verifyAndRechargePaystack(userId, reference);
    res.json({ success: true, data: details });
  } catch (err) {
    console.error("Failed to verify Paystack payment:", err);
    res.status(400).json({ success: false, error: err.message || "Failed to verify Paystack payment" });
  }
};

