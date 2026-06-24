import pool from "../config/db.js";
import { generateApiKey } from "../utils/generateApiKey.js";

export const getKey = async (userId) => {
  const { rows } = await pool.query("SELECT * FROM api_keys WHERE user_id = $1", [userId]);
  return rows[0];
};

export const createKey = async (userId) => {
  const key = generateApiKey();

  await pool.query(
    "INSERT INTO api_keys(user_id, key) VALUES($1, $2) ON CONFLICT (user_id) DO UPDATE SET key = EXCLUDED.key",
    [userId, key]
  );

  return { key };
};

export const deleteKey = async (userId) => {
  await pool.query("DELETE FROM api_keys WHERE user_id = $1", [userId]);
};