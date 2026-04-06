import sms from "../config/africastalking.js";

export const sendBulkSMS = async (numbers, message) => {
  const response = await sms.send({
    to: numbers,
    message,
  });

  return response.SMSMessageData.Recipients;
};