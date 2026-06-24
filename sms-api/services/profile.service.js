import pool from "../config/db.js";

import bcrypt from "bcrypt";

export const getProfile = async (userId) => {
  const { rows } = await pool.query("SELECT id, name, email, is_verified FROM system_users WHERE id = $1", [userId]);
  return rows[0];
};

export const updateProfile = async (userId, { name, email, password }) => {
  if (password && password.trim() !== "") {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      "UPDATE system_users SET name=$1, email=$2, password=$3 WHERE id=$4 RETURNING id, name, email, is_verified",
      [name, email, hashedPassword, userId]
    );
    return rows[0];
  } else {
    const { rows } = await pool.query(
      "UPDATE system_users SET name=$1, email=$2 WHERE id=$3 RETURNING id, name, email, is_verified",
      [name, email, userId]
    );
    return rows[0];
  }
};