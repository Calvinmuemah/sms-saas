import * as service from "../services/apiKey.service.js";

export const getApiKey = async (req, res) => {
  try {
    const userId = req.user.id;
    const keys = await service.getKeys(userId);
    res.json({ success: true, data: keys });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch API keys" });
  }
};

export const createApiKey = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;
    const key = await service.createKey(userId, name);
    res.json({ success: true, data: key });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to create API key" });
  }
};

export const deleteApiKey = async (req, res) => {
  try {
    const userId = req.user.id;
    const keyId = req.params.id;
    await service.deleteKey(userId, keyId);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to delete API key" });
  }
};