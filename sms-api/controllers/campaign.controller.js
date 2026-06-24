import * as service from "../services/campaign.service.js";

export const getAll = async (req, res) => {
  try {
    const userId = req.user.id;
    const campaigns = await service.getCampaigns(userId);
    res.json({ success: true, data: campaigns });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const userId = req.user.id;
    const campaign = await service.createCampaign(req.body, userId);
    res.json({ success: true, data: campaign });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const send = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await service.sendCampaign(req.params.id, userId);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};