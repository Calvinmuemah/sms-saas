import AfricasTalking from "africastalking";
import dotenv from "dotenv";

dotenv.config();

const africastalking = AfricasTalking({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME,
});

const sms = africastalking.SMS;

export default sms;