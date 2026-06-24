import pool from "../config/db.js";
import { generateApiKey } from "../utils/generateApiKey.js";
import crypto from "crypto";

const hashKey = (plainKey) => {
  return crypto.createHash("sha256").update(plainKey).digest("hex");
};

const maskKey = (plainKey) => {
  // plainKey starts with 'sk_'
  const suffix = plainKey.slice(-4);
  return `sk_••••••••••••••••${suffix}`;
};

export const getKeys = async (userId) => {
  // Return the masked key representation to the client for dashboard listings
  const { rows } = await pool.query(
    "SELECT id, name, masked as key, created_at FROM api_keys WHERE user_id = $1 ORDER BY created_at DESC", 
    [userId]
  );
  return rows;
};

export const createKey = async (userId, name) => {
  const plainKey = generateApiKey();
  const hashed = hashKey(plainKey);
  const masked = maskKey(plainKey);
  const projectName = name || "Default Project";

  await pool.query(
    "INSERT INTO api_keys(user_id, name, key, masked) VALUES($1, $2, $3, $4)",
    [userId, projectName, hashed, masked]
  );

  // Return the plain text key ONCE so the developer can copy it upon creation
  return {
    name: projectName,
    key: plainKey,
    masked: masked
  };
};

export const deleteKey = async (userId, keyId) => {
  await pool.query("DELETE FROM api_keys WHERE user_id = $1 AND id = $2", [userId, keyId]);
};