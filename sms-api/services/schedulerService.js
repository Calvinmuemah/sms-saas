import pool from "../config/db.js";
import { sendBulkSMS } from "./smsService.js";
import { createMessage } from "../models/Message.js";
import { checkAndDeductBilling } from "./billing.service.js";

export const startScheduler = () => {
  console.log("Scheduler service initialized. Polling database every 60 seconds...");

  setInterval(async () => {
    try {
      // Fetch pending scheduled messages where scheduled_at <= NOW()
      const { rows } = await pool.query(
        "SELECT * FROM scheduled WHERE scheduled_at <= NOW()"
      );

      if (rows.length === 0) return;

      console.log(`Found ${rows.length} scheduled message(s) ready to send.`);

      // Get all opted-out numbers to respect compliance
      const optedOutQuery = await pool.query(
        "SELECT phone FROM contacts WHERE opted_in=false"
      );
      const optedOutSet = new Set(optedOutQuery.rows.map((c) => c.phone));

      for (const row of rows) {
        try {
          // Parse recipients
          let recipients = [];
          if (row.recipients) {
            recipients = typeof row.recipients === "string"
              ? JSON.parse(row.recipients)
              : row.recipients;
          }

          // Filter out opted-out contacts
          const activeRecipients = recipients.filter((phone) => !optedOutSet.has(phone));

          if (activeRecipients.length > 0) {
            // Apply billing check and deduction for background scheduled campaigns
            if (row.user_id) {
              await checkAndDeductBilling(row.user_id, activeRecipients.length);
            }

            console.log(`Sending scheduled message ID ${row.id} to ${activeRecipients.length} recipients.`);
            const results = await sendBulkSMS(activeRecipients, row.message);

            // Log each message sent in the messages table
            for (let r of results) {
              await createMessage({
                phone: r.number,
                message: row.message,
                status: r.status,
                cost: r.cost || null,
                messageId: r.messageId,
                userId: row.user_id,
              });
            }
          } else {
            console.log(`No active (opted-in) recipients for scheduled message ID ${row.id}.`);
          }

          // Delete the processed schedule from database
          await pool.query("DELETE FROM scheduled WHERE id=$1", [row.id]);
          console.log(`Scheduled message ID ${row.id} processed and deleted.`);
        } catch (err) {
          console.error(`Failed to process scheduled message ID ${row.id}:`, err.message);
        }
      }
    } catch (error) {
      console.error("Scheduler error polling DB:", error.message);
    }
  }, 60000); // Poll every 60 seconds
};
