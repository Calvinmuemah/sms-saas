import pool from "../config/db.js";
import { sendSMS } from "../controllers/smsController.js";

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

  const users = await pool.query(
    "SELECT phone FROM users WHERE opted_in=true"
  );

  const numbers = users.rows.map(u => u.phone);

  await sendSMS(numbers, campaign.rows[0].message);

  await pool.query(
    "UPDATE campaigns SET status='sent', recipients=$1 WHERE id=$2",
    [numbers.length, id]
  );

  return { message: "Sent" };
};