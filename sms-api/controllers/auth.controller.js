import * as service from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const user = await service.registerUser(req.body);
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { user, token } = await service.loginUser(req.body);
    res.json({ success: true, user, token });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};