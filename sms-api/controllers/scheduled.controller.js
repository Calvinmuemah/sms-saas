import * as service from "../services/scheduled.service.js";

export const getAll = async (req, res) => {
  res.json(await service.getAll());
};

export const create = async (req, res) => {
  const { message, scheduledAt, recipients } = req.body;
  if (!message || !scheduledAt || !recipients) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  res.json(await service.create({ message, scheduledAt, recipients }));
};

export const remove = async (req, res) => {
  await service.remove(req.params.id);
  res.json({ message: "Deleted" });
};