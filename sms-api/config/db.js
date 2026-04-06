import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,

  ssl: {
    rejectUnauthorized: false, // required for Neon / cloud DBs
  },

  max: 5, // max connections
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 30000,
});

// Test connection once
export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("PostgreSQL connected successfully");
    client.release();
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error.message);
    process.exit(1);
  }
};

// Optional: log events
pool.on("connect", () => {
  console.log("New DB connection established");
});

pool.on("error", (err) => {
  console.error("Unexpected DB error:", err.message);
});

export default pool;