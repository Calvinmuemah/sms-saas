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

// Fetch all users
export const getAllUsers = async () => {
  const result = await pool.query("SELECT phone, opted_in FROM contacts");
  return result.rows;
};

// Create recipient group
export const createRecipientGroup = async (name, numbers, userId) => {
  const result = await pool.query(
    `INSERT INTO recipient_groups (name, numbers, user_id) VALUES ($1, $2, $3) RETURNING *`,
    [name, numbers, userId]
  );
  return result.rows[0];
};

// Get all recipient groups
export const getRecipientGroups = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM recipient_groups WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

// Update recipient group
export const updateRecipientGroup = async (id, name, numbers, userId) => {
  const result = await pool.query(
    `UPDATE recipient_groups SET name=$1, numbers=$2 WHERE id=$3 AND user_id=$4 RETURNING *`,
    [name, numbers, id, userId]
  );
  return result.rows[0];
};

// Delete recipient group
export const deleteRecipientGroup = async (id, userId) => {
  await pool.query(`DELETE FROM recipient_groups WHERE id=$1 AND user_id=$2`, [id, userId]);
  return { message: "Recipient group deleted" };
};