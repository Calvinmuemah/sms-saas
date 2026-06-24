import * as service from "../services/apiKey.service.js";

export const getApiKey = async (req, res) => {
  try {
    const userId = req.user.id;
    const key = await service.getKey(userId);
    res.json(key);
  } catch {
    res.status(500).json({ error: "Failed to fetch API key" });
  }
};

export const createApiKey = async (req, res) => {
  try {
    const userId = req.user.id;
    const key = await service.createKey(userId);
    res.json(key);
  } catch {
    res.status(500).json({ error: "Failed to create API key" });
  }
};

export const deleteApiKey = async (req, res) => {
  try {
    const userId = req.user.id;
    await service.deleteKey(userId);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete API key" });
  }
};