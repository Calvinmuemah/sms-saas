import { getUserCounts } from "../models/User.js";

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