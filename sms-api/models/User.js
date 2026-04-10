import pool from "../config/db.js";

// Create user
export const createUser = async (phone) => {
  const result = await pool.query(
    `INSERT INTO contacts (phone, opted_in)
     VALUES ($1, true)
     ON CONFLICT (phone) DO NOTHING
     RETURNING *`,
    [phone]
  );

  return result.rows[0];
};

// Get user by phone
export const getUserByPhone = async (phone) => {
  const result = await pool.query(
    "SELECT * FROM contacts WHERE phone=$1",
    [phone]
  );

  return result.rows[0];
};

// Update opt status
export const updateOptStatus = async (phone, status) => {
  await pool.query(
    "UPDATE contacts SET opted_in=$1 WHERE phone=$2",
    [status, phone]
  );
};

// Get opted-in users
export const getOptedInUsers = async () => {
  const result = await pool.query(
    "SELECT phone FROM contacts WHERE opted_in=true"
  );

  return result.rows;
};

// Get user counts
export const getUserCounts = async () => {
  const result = await pool.query(
    `SELECT 
      COUNT(*) AS total_users,
      COUNT(*) FILTER (WHERE opted_in = true) AS opted_in_users,
      COUNT(*) FILTER (WHERE opted_in = false) AS opted_out_users
    FROM contacts`
  );

  return result.rows[0];
};