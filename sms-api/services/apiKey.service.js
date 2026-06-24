import pool from "../config/db.js";
import { generateApiKey } from "../utils/generateApiKey.js";

export const getKeys = async (userId) => {
  const { rows } = await pool.query(
    "SELECT id, name, key, created_at FROM api_keys WHERE user_id = $1 ORDER BY created_at DESC", 
    [userId]
  );
  return rows;
};

export const createKey = async (userId, name) => {
  const key = generateApiKey();
  const projectName = name || "Default Project";

  const { rows } = await pool.query(
    "INSERT INTO api_keys(user_id, name, key) VALUES($1, $2, $3) RETURNING *",
    [userId, projectName, key]
  );

  return rows[0];
};

export const deleteKey = async (userId, keyId) => {
  await pool.query("DELETE FROM api_keys WHERE user_id = $1 AND id = $2", [userId, keyId]);
};