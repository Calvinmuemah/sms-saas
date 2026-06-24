import pool from "../config/db.js";
import { sendBulkSMS } from "./smsService.js";
import { checkAndDeductBilling } from "./billing.service.js";
import { createMessage } from "../models/Message.js";

export const getCampaigns = async (userId) => {
  const { rows } = await pool.query(
    "SELECT * FROM campaigns WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );
  return rows;
};

export const createCampaign = async ({ name, message, recipient }, userId) => {
  const { rows } = await pool.query(
    "INSERT INTO campaigns(name, message, recipient, user_id) VALUES($1, $2, $3, $4) RETURNING *",
    [name, message, recipient, userId]
  );
  return rows[0];
};

export const sendCampaign = async (id, userId) => {
  const campaign = await pool.query(
    "SELECT * FROM campaigns WHERE id=$1 AND user_id=$2",
    [id, userId]
  );

  if (campaign.rows.length === 0) {
    throw new Error("Campaign not found");
  }

  const campaignData = campaign.rows[0];
  let numbers = [];

  // If a recipient group is specified, load numbers from it
  if (campaignData.recipient) {
    const groupQuery = await pool.query(
      "SELECT numbers FROM recipient_groups WHERE id=$1 AND user_id=$2",
      [campaignData.recipient, userId]
    );
    if (groupQuery.rows.length > 0) {
      const numbersStr = groupQuery.rows[0].numbers || "";
      // Strip outer quotes and brackets if present
      const cleanedStr = numbersStr.replace(/^["'\[]+|["'\]]+$/g, '').trim();
      numbers = cleanedStr
        .split(/[\n,"]+/)
        .map((n) => n.trim())
        .filter(Boolean);
    }
  } else {
    // Fallback: send to all opted-in contacts
    const contactsQuery = await pool.query(
      "SELECT phone FROM contacts WHERE opted_in=true"
    );
    numbers = contactsQuery.rows.map((u) => u.phone);
  }

  // Respect opt-outs: Filter out any phone numbers that have explicitly opted out
  if (numbers.length > 0) {
    const optedOutQuery = await pool.query(
      "SELECT phone FROM contacts WHERE opted_in=false"
    );
    const optedOutNumbers = new Set(optedOutQuery.rows.map((c) => c.phone));
    numbers = numbers.filter((phone) => !optedOutNumbers.has(phone));
  }

  if (numbers.length === 0) {
    throw new Error("No valid recipient numbers to send campaign to.");
  }

  // 1. Enforce billing checks and credit deductions
  await checkAndDeductBilling(userId, numbers.length);

  // Automatically append opt-out compliance notice if missing
  const compliantMessage = campaignData.message.toLowerCase().includes("stop")
    ? campaignData.message
    : `${campaignData.message} (Reply STOP to opt out)`;

  // 2. Dispatch bulk SMS messages
  const results = await sendBulkSMS(numbers, compliantMessage);

  // 3. Log sent messages in DB for dashboard metrics
  for (let r of results) {
    await createMessage({
      phone: r.number,
      message: compliantMessage,
      status: r.status,
      cost: r.cost || null,
      messageId: r.messageId,
      userId,
    });
  }

  // 4. Update campaign status
  await pool.query(
    "UPDATE campaigns SET status='sent', recipients=$1 WHERE id=$2",
    [numbers.length, id]
  );

  return { message: "Sent", totalSent: numbers.length };
};