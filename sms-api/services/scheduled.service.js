import pool from "../config/db.js";

export const getAll = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM scheduled ORDER BY scheduled_at ASC"
  );
  return rows;
};

export const create = async ({ message, scheduledAt }) => {
  const { rows } = await pool.query(
    "INSERT INTO scheduled(message, scheduled_at) VALUES($1,$2) RETURNING *",
    [message, scheduledAt]
  );
  return rows[0];
};

export const remove = async (id) => {
  await pool.query("DELETE FROM scheduled WHERE id=$1", [id]);
};