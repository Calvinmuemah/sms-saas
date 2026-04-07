import * as service from "../services/analytics.service.js";

export const get = async (req, res) => {
  res.json(await service.getAnalytics());
};