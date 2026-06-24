import AfricasTalking from "africastalking";
import dotenv from "dotenv";

dotenv.config();

let sms;

const api_key = process.env.AT_API_KEY;
const username = process.env.AT_USERNAME;

if (api_key && username) {
  try {
    const africastalking = AfricasTalking({
      apiKey: api_key,
      username: username,
    });
    sms = africastalking.SMS;
  } catch (error) {
    console.error("Failed to initialize Africa's Talking:", error.message);
  }
}

if (!sms) {
  console.warn("⚠️ WARNING: AT_API_KEY or AT_USERNAME is not set in environment. SMS sending will be mocked.");
  sms = {
    send: async ({ to, message }) => {
      const recipients = Array.isArray(to) ? to : [to];
      console.log(`[MOCK SMS] Sending: "${message}" to ${recipients.length} numbers: ${recipients.join(", ")}`);
      
      // Simulate slight network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        SMSMessageData: {
          Recipients: recipients.map(num => ({
            number: num,
            status: "Success",
            cost: "0.0120",
            messageId: `mock-at-msg-${Math.floor(100000 + Math.random() * 900000)}`
          }))
        }
      };
    }
  };
}

export default sms;