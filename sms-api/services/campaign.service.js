import pool from "../config/db.js";
import { sendBulkSMS } from "./smsService.js";

export const getCampaigns = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM campaigns ORDER BY created_at DESC"
  );
  return rows;
};

export const createCampaign = async ({ name, message }) => {
  const { rows } = await pool.query(
    "INSERT INTO campaigns(name, message) VALUES($1,$2) RETURNING *",
    [name, message]
  );
  return rows[0];
};

export const sendCampaign = async (id) => {
  const campaign = await pool.query(
    "SELECT * FROM campaigns WHERE id=$1",
    [id]
  );

  if (campaign.rows.length === 0) {
    throw new Error("Campaign not found");
  }

  const campaignData = campaign.rows[0];
  let numbers = [];

  // If a recipient group is specified, load numbers from it
  if (campaignData.recipient) {
    const groupQuery = await pool.query(
      "SELECT numbers FROM recipient_groups WHERE id=$1",
      [campaignData.recipient]
    );
    if (groupQuery.rows.length > 0) {
      const numbersStr = groupQuery.rows[0].numbers || "";
      numbers = numbersStr.split(",").map((n) => n.trim()).filter(Boolean);
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

  if (numbers.length > 0) {
    await sendBulkSMS(numbers, campaignData.message);
  }

  await pool.query(
    "UPDATE campaigns SET status='sent', recipients=$1 WHERE id=$2",
    [numbers.length, id]
  );

  return { message: "Sent", totalSent: numbers.length };
};