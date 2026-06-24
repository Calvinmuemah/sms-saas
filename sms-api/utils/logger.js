import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDirectory = path.join(__dirname, "../logs");

// Create logs directory if it doesn't exist
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const errorLogPath = path.join(logDirectory, "error.log");

export const logError = (context, err) => {
  const timestamp = new Date().toISOString();
  const errorMessage = `[${timestamp}] CONTEXT: ${context} | ERROR: ${err.message || err}\nSTACK: ${err.stack || "N/A"}\n----------------------------------------\n`;
  
  // Output error to console for development visibility
  console.error(`⚠️ [${context}] ERROR:`, err.message || err);

  // Persist to local error log file
  fs.appendFile(errorLogPath, errorMessage, (writeErr) => {
    if (writeErr) {
      console.error("Failed to write to error.log:", writeErr);
    }
  });

  // Production Hook: Live Sentry notification
  const sentryDsn = process.env.SENTRY_DSN;
  if (sentryDsn) {
    // Sentry.captureException(err);
  }
};
