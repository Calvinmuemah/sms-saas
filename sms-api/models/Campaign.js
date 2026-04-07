import { pool } from "../config/db.js";

export const createCampaign = async ({ name, message }) => {
  const { rows } = await pool.query(
    `INSERT INTO campaigns (name, message)
     VALUES ($1, $2)
     RETURNING *`,
    [name, message]
  );
  return rows[0];
};

export const getAllCampaigns = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM campaigns ORDER BY created_at DESC"
  );
  return rows;
};

export const getCampaignById = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM campaigns WHERE id = $1",
    [id]
  );
  return rows[0];
};

export const deleteCampaign = async (id) => {
  await pool.query("DELETE FROM campaigns WHERE id = $1", [id]);
};

export const updateCampaignStatus = async (id, status, recipients) => {
  const { rows } = await pool.query(
    `UPDATE campaigns 
     SET status = $1, recipients = $2 
     WHERE id = $3 
     RETURNING *`,
    [status, recipients, id]
  );
  return rows[0];
};