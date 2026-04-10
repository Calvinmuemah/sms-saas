import pool from "../config/db.js";

export const getAll = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM scheduled ORDER BY scheduled_at ASC"
  );
  return rows;
};

export const create = async ({ message, scheduledAt, recipients }) => {
  const { rows } = await pool.query(
    "INSERT INTO scheduled(message, scheduled_at, recipients) VALUES($1, $2, $3) RETURNING *",
    [message, scheduledAt, JSON.stringify(recipients)]
  );
  return rows[0];
};

export const remove = async (id) => {
  await pool.query("DELETE FROM scheduled WHERE id=$1", [id]);
};