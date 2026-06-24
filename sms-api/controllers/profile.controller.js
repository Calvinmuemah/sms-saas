import * as service from "../services/profile.service.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await service.getProfile(userId);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await service.updateProfile(userId, req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};