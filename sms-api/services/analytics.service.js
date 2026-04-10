import pool from "../config/db.js";

export const getAnalytics = async () => {
  const total = await pool.query(
    "SELECT SUM(recipients) FROM campaigns"
  );

  const userCounts = await pool.query(
    `SELECT 
      COUNT(*) AS total_users,
      COUNT(*) FILTER (WHERE opted_in = true) AS opted_in_users,
      COUNT(*) FILTER (WHERE opted_in = false) AS opted_out_users
    FROM contacts`
  );

  return {
    totalSMS: total.rows[0].sum || 0,
    delivered: total.rows[0].sum * 0.9,
    failed: total.rows[0].sum * 0.1,
    dates: ["Mon", "Tue", "Wed"],
    smsTrend: [100, 200, 150],
    userStats: {
      totalUsers: userCounts.rows[0].total_users || 0,
      optedInUsers: userCounts.rows[0].opted_in_users || 0,
      optedOutUsers: userCounts.rows[0].opted_out_users || 0,
    },
  };
};