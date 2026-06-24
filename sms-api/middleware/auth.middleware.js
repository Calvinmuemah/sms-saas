import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, email }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
};

export const requireApiKeyOrUserAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Missing or invalid credentials" });
  }

  const token = authHeader.split(" ")[1];

  // Check if it looks like an API key
  if (token.startsWith("sk_")) {
    try {
      const hashedInput = crypto.createHash("sha256").update(token).digest("hex");
      const { rows } = await pool.query("SELECT * FROM api_keys WHERE key = $1", [hashedInput]);
      if (rows.length === 0) {
        return res.status(401).json({ error: "Unauthorized: Invalid API key" });
      }
      // Populate req.user with the API key owner's user_id and set a flag
      req.user = { id: rows[0].user_id, isApiKey: true };
      return next();
    } catch (err) {
      console.error("API Key authentication error:", err);
      return res.status(500).json({ error: "Internal server error during authentication" });
    }
  }

  // Otherwise, fallback to checking JWT token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, email }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};
