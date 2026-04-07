import pool from "../config/db.js";

export const getAnalytics = async () => {
  const total = await pool.query(
    "SELECT SUM(recipients) FROM campaigns"
  );

  return {
    totalSMS: total.rows[0].sum || 0,
    delivered: total.rows[0].sum * 0.9,
    failed: total.rows[0].sum * 0.1,
    dates: ["Mon", "Tue", "Wed"],
    smsTrend: [100, 200, 150],
  };
};