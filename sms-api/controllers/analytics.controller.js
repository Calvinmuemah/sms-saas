import * as service from "../services/analytics.service.js";

export const get = async (req, res) => {
  try {
    const userId = req.user.id;
    res.json(await service.getAnalytics(userId));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};