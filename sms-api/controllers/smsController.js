import { createUser, getUserByPhone } from "../models/User.js";
import { createMessage } from "../models/Message.js";
import isValidNumber from "../utils/validateNumber.js";
import { sendBulkSMS } from "../services/smsService.js";

// 📥 CALLBACK (AUTO OPT-IN / OPT-OUT)
export const smsCallback = async (req, res) => {
  const { from, text } = req.body;
  const message = text.trim().toUpperCase();

  if (!isValidNumber(from)) return res.send("Invalid");

  let user = await getUserByPhone(from);

  if (!user) {
    user = await createUser({ phone: from });
  }

  try {
    if (message === "STOP") {
      user.optedIn = false;
      await user.save();

      console.log(`${from} opted OUT`);

      await sendBulkSMS([from], "You have been unsubscribed. Reply START to opt in again.");
    }

    if (message === "START" || message === "YES") {
      user.optedIn = true;
      await user.save();

      console.log(`${from} opted IN`);

      await sendBulkSMS([from], "You have successfully opted in! You will now receive messages.");
    }

    res.send("OK");

  } catch (err) {
    console.error(err);
    res.send("Error");
  }
};


// 🌐 MANUAL OPT-IN
export const optIn = async (req, res) => {
  const { number } = req.body;

  if (!isValidNumber(number)) {
    return res.status(400).json({ error: "Invalid number" });
  }

  let user = await getUserByPhone(number);

  if (!user) {
    user = await createUser({ phone: number });
  }

  user.optedIn = true;
  await user.save();

  res.json({ message: "User opted in" });
};


// 📤 SEND BULK SMS
export const sendSMS = async (req, res) => {
  const { message } = req.body;

  const users = await User.findAll({ where: { optedIn: true } });
  const numbers = users.map(u => u.phone);

  if (numbers.length === 0) {
    return res.json({ message: "No opted-in users" });
  }

  try {
    const results = await sendBulkSMS(numbers, message);

    for (let r of results) {
      await createMessage({
        phone: r.number,
        message,
        status: r.status,
        messageId: r.messageId,
      });
    }

    res.json({ message: "SMS sent", results });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "SMS failed" });
  }
};


// 📡 DELIVERY REPORT
export const deliveryReport = async (req, res) => {
  const { id, status, phoneNumber } = req.body;

  try {
    await Message.update(
      { status },
      { where: { messageId: id } }
    );

    console.log(`DLR: ${phoneNumber} -> ${status}`);

    res.send("OK");
  } catch (err) {
    console.error(err);
    res.send("Error");
  }
};