import pool from "../config/db.js";

export const getAll = async (userId) => {
  const { rows } = await pool.query(
    "SELECT * FROM scheduled WHERE user_id = $1 ORDER BY scheduled_at ASC",
    [userId]
  );
  return rows.map((row) => ({
    ...row,
    recipients: typeof row.recipients === "string" ? JSON.parse(row.recipients) : row.recipients,
  }));
};

export const create = async ({ message, scheduledAt, recipients }, userId) => {
  const { rows } = await pool.query(
    "INSERT INTO scheduled(message, scheduled_at, recipients, user_id) VALUES($1, $2, $3, $4) RETURNING *",
    [message, scheduledAt, JSON.stringify(recipients), userId]
  );
  return rows[0];
};

export const remove = async (id, userId) => {
  await pool.query("DELETE FROM scheduled WHERE id=$1 AND user_id=$2", [id, userId]);
};