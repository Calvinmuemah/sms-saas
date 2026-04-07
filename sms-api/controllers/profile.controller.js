import * as service from "../services/profile.service.js";

export const getProfile = async (req, res) => {
  try {
    const userId = 1; // 🔥 replace with auth later
    const user = await service.getProfile(userId);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = 1;
    const user = await service.updateProfile(userId, req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};