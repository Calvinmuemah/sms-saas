import {
  createUser,
  getUserByPhone,
  updateOptStatus,
  getOptedInUsers,
} from "../models/User.js";

import { createMessage } from "../models/Message.js";
import isValidNumber, { normalizeNumber } from "../utils/validateNumber.js";
import { sendBulkSMS } from "../services/smsService.js";
import pool from "../config/db.js";

// 📥 CALLBACK (OPT IN / OUT)
export const smsCallback = async (req, res) => {
  const { from, text } = req.body;

  const phone = normalizeNumber(from);
  const message = text.trim().toUpperCase();

  if (!phone || !isValidNumber(phone)) return res.send("Invalid");

  let user = await getUserByPhone(phone);

  if (!user) {
    await createUser(phone);
  }

  try {
    if (message === "STOP") {
      await updateOptStatus(phone, false);

      await sendBulkSMS(
        [phone],
        "You have been unsubscribed. Reply START to opt in again."
      );
    }

    if (message === "START" || message === "YES") {
      await updateOptStatus(phone, true);

      await sendBulkSMS(
        [phone],
        "You are now subscribed ✅"
      );
    }

    res.send("OK");
  } catch (err) {
    console.error(err);
    res.send("Error");
  }
};

// 🌐 MANUAL OPT-IN
export const optIn = async (req, res) => {
  let { number } = req.body;

  const phone = normalizeNumber(number);

  if (!phone || !isValidNumber(phone)) {
    return res.status(400).json({ error: "Invalid number" });
  }

  await createUser(phone);
  await updateOptStatus(phone, true);

  res.json({ success: true, message: "User opted in", phone });
};

// 📤 SEND SMS (PRO VERSION)
export const sendSMS = async (req, res) => {
  const { message, numbers } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message required" });
  }

  let recipients = [];

  // Use numbers from frontend
  if (numbers && numbers.length > 0) {
    recipients = numbers
      .map(normalizeNumber)
      .filter((n) => n && isValidNumber(n));
  } else {
    // fallback → opted-in users
    const users = await getOptedInUsers();
    recipients = users.map((u) => u.phone);
  }

  if (recipients.length === 0) {
    return res.json({ success: false, message: "No valid recipients" });
  }

  try {
    const results = await sendBulkSMS(recipients, message);

    // ✅ Count success
    const successful = results.filter(
      (r) => r.status === "Success"
    );

    const failed = results.filter(
      (r) => r.status !== "Success"
    );

    // ✅ Save all messages
    for (let r of results) {
      await createMessage({
        phone: r.number,
        message,
        status: r.status,
        cost: r.cost || null,
        messageId: r.messageId,
      });
    }

    res.json({
      success: true,
      message: "SMS processed",
      total: recipients.length,
      successful: successful.length,

      // 🔥 VERY IMPORTANT (for UI + re-send)
      failed: failed.map((f) => ({
        phone: f.number,
        status: f.status,
      })),
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "SMS failed" });
  }
};

// 📡 DELIVERY REPORT
export const deliveryReport = async (req, res) => {
  const { id, status } = req.body;

  try {
    await pool.query(
      "UPDATE messages SET status=$1 WHERE message_id=$2",
      [status, id]
    );

    console.log(`DLR Update → ${id}: ${status}`);

    res.send("OK");
  } catch (err) {
    console.error(err);
    res.send("Error");
  }
};

// 📜 GET ALL MESSAGES
export const getAllMessages = async (req, res) => {
  try {
    const { rows: messages } = await pool.query("SELECT * FROM messages ORDER BY created_at DESC");
    res.json({ success: true, messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};