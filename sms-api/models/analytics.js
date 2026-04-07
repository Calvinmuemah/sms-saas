import { pool } from "../config/db.js";

export const getTotalSMS = async () => {
  const { rows } = await pool.query(
    "SELECT SUM(recipients) FROM campaigns"
  );
  return rows[0].sum || 0;
};