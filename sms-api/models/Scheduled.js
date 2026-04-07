import { pool } from "../config/db.js";

export const createSchedule = async ({ message, scheduledAt }) => {
  const { rows } = await pool.query(
    `INSERT INTO scheduled (message, scheduled_at)
     VALUES ($1, $2)
     RETURNING *`,
    [message, scheduledAt]
  );
  return rows[0];
};

export const getAllSchedules = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM scheduled ORDER BY scheduled_at ASC"
  );
  return rows;
};

export const deleteSchedule = async (id) => {
  await pool.query("DELETE FROM scheduled WHERE id = $1", [id]);
};

export const updateSchedule = async (id, data) => {
  const { message, scheduledAt } = data;

  const { rows } = await pool.query(
    `UPDATE scheduled 
     SET message = $1, scheduled_at = $2
     WHERE id = $3
     RETURNING *`,
    [message, scheduledAt, id]
  );

  return rows[0];
};