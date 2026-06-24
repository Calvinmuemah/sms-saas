import * as service from "../services/scheduled.service.js";

export const getAll = async (req, res) => {
  try {
    const userId = req.user.id;
    res.json(await service.getAll(userId));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const create = async (req, res) => {
  const { message, scheduledAt, recipients } = req.body;
  if (!message || !scheduledAt || !recipients) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const userId = req.user.id;
    res.json(await service.create({ message, scheduledAt, recipients }, userId));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const userId = req.user.id;
    await service.remove(req.params.id, userId);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};