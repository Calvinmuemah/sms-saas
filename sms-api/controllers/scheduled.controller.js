import * as service from "../services/scheduled.service.js";

export const getAll = async (req, res) => {
  res.json(await service.getAll());
};

export const create = async (req, res) => {
  res.json(await service.create(req.body));
};

export const remove = async (req, res) => {
  await service.remove(req.params.id);
  res.json({ message: "Deleted" });
};