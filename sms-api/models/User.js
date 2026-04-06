import pool from "../config/db.js";

// Create user
export const createUser = async ({ phone, optedIn = true }) => {
  const query = `
    INSERT INTO users (phone, opted_in, opt_in_date)
    VALUES ($1, $2, NOW())
    RETURNING *;
  `;

  const values = [phone, optedIn];

  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get user by phone
export const getUserByPhone = async (phone) => {
  const query = `SELECT * FROM users WHERE phone = $1 LIMIT 1;`;

  const result = await pool.query(query, [phone]);
  return result.rows[0];
};

// Update opt-in status
export const updateOptIn = async (phone, optedIn) => {
  const query = `
    UPDATE users
    SET opted_in = $1
    WHERE phone = $2
    RETURNING *;
  `;

  const result = await pool.query(query, [optedIn, phone]);
  return result.rows[0];
};