import pool from "../config/db.js";

export const getProfile = async () => {
  const { rows } = await pool.query("SELECT * FROM users LIMIT 1");
  return rows[0];
};

export const updateProfile = async ({ name, email }) => {
  const { rows } = await pool.query(
    "UPDATE users SET name=$1, email=$2 WHERE id=1 RETURNING *",
    [name, email]
  );
  return rows[0];
};