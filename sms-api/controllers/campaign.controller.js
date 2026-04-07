import * as service from "../services/campaign.service.js";

export const getAll = async (req, res) => {
  res.json(await service.getCampaigns());
};

export const create = async (req, res) => {
  res.json(await service.createCampaign(req.body));
};

export const send = async (req, res) => {
  res.json(await service.sendCampaign(req.params.id));
};