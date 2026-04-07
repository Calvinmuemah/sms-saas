import crypto from "crypto";

export const generateApiKey = () =>
  "sk_" + crypto.randomBytes(24).toString("hex");