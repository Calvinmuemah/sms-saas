import pool from "../config/db.js";
import { generateApiKey } from "../utils/generateApiKey.js";

export const getKey = async () => {
  const { rows } = await pool.query("SELECT * FROM api_keys LIMIT 1");
  return rows[0];
};

export const createKey = async () => {
  const key = generateApiKey();

  await pool.query(
    "INSERT INTO api_keys(user_id, key) VALUES(1,$1) ON CONFLICT DO NOTHING",
    [key]
  );

  return { key };
};

export const deleteKey = async () => {
  await pool.query("DELETE FROM api_keys WHERE user_id=1");
};