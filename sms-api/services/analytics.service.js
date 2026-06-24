import pool from "../config/db.js";

export const getAnalytics = async (userId) => {
  // Scoped message statistics
  const statsQuery = await pool.query(
    `SELECT 
      COUNT(*) AS total_sms,
      COUNT(*) FILTER (WHERE status = 'Success') AS delivered_sms,
      COUNT(*) FILTER (WHERE status != 'Success') AS failed_sms
     FROM messages 
     WHERE user_id = $1`,
    [userId]
  );

  // Scoped daily trend for last 7 days
  const trendQuery = await pool.query(
    `SELECT 
      TO_CHAR(created_at, 'Dy') AS day_name, 
      COUNT(*) AS count
     FROM messages
     WHERE user_id = $1 AND created_at >= NOW() - INTERVAL '7 days'
     GROUP BY TO_CHAR(created_at, 'Dy'), DATE_TRUNC('day', created_at)
     ORDER BY DATE_TRUNC('day', created_at) ASC`,
    [userId]
  );

  // Global subscriber stats (contacts table)
  const userCounts = await pool.query(
    `SELECT 
      COUNT(*) AS total_users,
      COUNT(*) FILTER (WHERE opted_in = true) AS opted_in_users,
      COUNT(*) FILTER (WHERE opted_in = false) AS opted_out_users
    FROM contacts`
  );

  const stats = statsQuery.rows[0];
  const trendRows = trendQuery.rows;

  const dates = trendRows.length > 0 ? trendRows.map(r => r.day_name) : ["Mon", "Tue", "Wed"];
  const smsTrend = trendRows.length > 0 ? trendRows.map(r => parseInt(r.count, 10)) : [0, 0, 0];

  return {
    totalSMS: parseInt(stats.total_sms, 10) || 0,
    delivered: parseInt(stats.delivered_sms, 10) || 0,
    failed: parseInt(stats.failed_sms, 10) || 0,
    dates,
    smsTrend,
    userStats: {
      totalUsers: parseInt(userCounts.rows[0].total_users, 10) || 0,
      optedInUsers: parseInt(userCounts.rows[0].opted_in_users, 10) || 0,
      optedOutUsers: parseInt(userCounts.rows[0].opted_out_users, 10) || 0,
    },
  };
};