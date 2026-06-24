import pool from "../config/db.js";

export const getBillingDetails = async (userId) => {
  const { rows } = await pool.query(
    "SELECT plan, balance, sms_sent_free FROM system_users WHERE id = $1",
    [userId]
  );
  if (rows.length === 0) {
    throw new Error("User not found");
  }
  return {
    plan: rows[0].plan || "free",
    balance: parseFloat(rows[0].balance || 0),
    smsSentFree: parseInt(rows[0].sms_sent_free || 0),
    freeLimit: 20
  };
};

export const switchPlan = async (userId, plan) => {
  if (plan !== "free" && plan !== "payg") {
    throw new Error("Invalid plan type");
  }
  const { rows } = await pool.query(
    "UPDATE system_users SET plan = $1 WHERE id = $2 RETURNING plan, balance, sms_sent_free",
    [plan, userId]
  );
  return {
    plan: rows[0].plan,
    balance: parseFloat(rows[0].balance || 0),
    smsSentFree: parseInt(rows[0].sms_sent_free || 0),
    freeLimit: 20
  };
};

export const rechargeBalance = async (userId, amount) => {
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    throw new Error("Invalid recharge amount");
  }

  // Recharge amount and automatically upgrade to 'payg' plan if they are on 'free'
  const { rows } = await pool.query(
    `UPDATE system_users 
     SET balance = balance + $1, 
         plan = CASE WHEN plan = 'free' THEN 'payg' ELSE plan END 
     WHERE id = $2 
     RETURNING plan, balance, sms_sent_free`,
    [parsedAmount, userId]
  );

  return {
    plan: rows[0].plan,
    balance: parseFloat(rows[0].balance || 0),
    smsSentFree: parseInt(rows[0].sms_sent_free || 0),
    freeLimit: 20
  };
};

export const checkAndDeductBilling = async (userId, recipientCount) => {
  const { rows } = await pool.query(
    "SELECT plan, balance, sms_sent_free FROM system_users WHERE id = $1",
    [userId]
  );
  if (rows.length === 0) {
    throw new Error("Sender user account not found");
  }

  const { plan, balance, sms_sent_free } = rows[0];
  const userPlan = plan || "free";
  const userBalance = parseFloat(balance || 0);
  const userSmsSentFree = parseInt(sms_sent_free || 0);

  if (userPlan === "free") {
    const freeLimit = 20;
    if (userSmsSentFree >= freeLimit) {
      throw new Error("Free limit of 20 SMS exceeded. Please switch to Pay As You Go and recharge.");
    }
    if (userSmsSentFree + recipientCount > freeLimit) {
      throw new Error(`This batch size (${recipientCount}) will exceed your remaining free limit. Remaining: ${freeLimit - userSmsSentFree} SMS.`);
    }

    // Deduct: increment sms_sent_free
    await pool.query(
      "UPDATE system_users SET sms_sent_free = sms_sent_free + $1 WHERE id = $2",
      [recipientCount, userId]
    );
  } else if (userPlan === "payg") {
    const cost = recipientCount * 1.0; // 1 KSh per SMS
    if (userBalance < cost) {
      throw new Error(`Insufficient balance. Cost to send to ${recipientCount} numbers is ${cost} KSh. Your current balance is ${userBalance} KSh.`);
    }

    // Deduct cost from balance
    await pool.query(
      "UPDATE system_users SET balance = balance - $1 WHERE id = $2",
      [cost, userId]
    );
  } else {
    throw new Error("Unsupported billing plan configuration.");
  }
};

export const verifyAndRechargePaystack = async (userId, reference) => {
  const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
  if (!paystackSecret) {
    throw new Error("Paystack secret key is missing on the server. Please check environment configuration.");
  }

  try {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${paystackSecret}`,
      },
    });

    const data = await res.json();
    if (!res.ok || !data.status || data.data.status !== "success") {
      throw new Error(data.message || "Paystack transaction verification failed.");
    }

    // Paystack amounts are processed in cents/kobos (subunit). We divide by 100.
    const amountPaid = parseFloat(data.data.amount) / 100.0;

    // Credit balance and automatically upgrade user to 'payg' plan if they are on 'free'
    const { rows } = await pool.query(
      `UPDATE system_users 
       SET balance = balance + $1, 
           plan = CASE WHEN plan = 'free' THEN 'payg' ELSE plan END 
       WHERE id = $2 
       RETURNING plan, balance, sms_sent_free`,
      [amountPaid, userId]
    );

    return {
      plan: rows[0].plan,
      balance: parseFloat(rows[0].balance || 0),
      smsSentFree: parseInt(rows[0].sms_sent_free || 0),
      freeLimit: 20
    };
  } catch (err) {
    console.error("Paystack verification error:", err);
    throw new Error(err.message || "Payment verification failed.");
  }
};


