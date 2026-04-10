import { getUserCounts } from "../models/User.js";
import { getAllUsers } from "../models/User.js";

// Controller to fetch user counts
export const fetchUserCounts = async (req, res) => {
  try {
    const counts = await getUserCounts();
    res.status(200).json({
      success: true,
      data: counts,
    });
  } catch (error) {
    console.error("Error fetching user counts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user counts",
    });
  }
};

// Controller to fetch all users
export const fetchAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};