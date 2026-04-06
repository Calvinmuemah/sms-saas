import pool from "../config/db.js";

// Create message
export const createMessage = async ({
  phone,
  message,
  status = "Pending",
  cost = null,
  messageId = null,
}) => {
  const query = `
    INSERT INTO messages (phone, message, status, cost, message_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [phone, message, status, cost, messageId];

  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get all messages
export const getAllMessages = async () => {
  const result = await pool.query(`
    SELECT * FROM messages ORDER BY created_at DESC;
  `);

  return result.rows;
};

// Get message by ID
export const getMessageById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM messages WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

// Update message status
export const updateMessageStatus = async (id, status) => {
  const result = await pool.query(
    `
    UPDATE messages
    SET status = $1
    WHERE id = $2
    RETURNING *;
    `,
    [status, id]
  );

  return result.rows[0];
};