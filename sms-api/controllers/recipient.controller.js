import { createRecipientGroup, getRecipientGroups, updateRecipientGroup, deleteRecipientGroup } from "../models/User.js";

// Controller to create a recipient group
export const createRecipient = async (req, res) => {
  try {
    const { name, numbers } = req.body;
    const group = await createRecipientGroup(name, numbers);
    res.status(201).json({ success: true, data: group });
  } catch (error) {
    console.error("Error creating recipient group:", error);
    res.status(500).json({ success: false, message: "Failed to create recipient group" });
  }
};

// Controller to fetch all recipient groups
export const fetchRecipients = async (req, res) => {
  try {
    const groups = await getRecipientGroups();
    const formattedGroups = groups.map(group => ({
      ...group,
      numbers: typeof group.numbers === 'string' ? group.numbers.split(',') : group.numbers, // Ensure numbers is an array
    }));
    res.status(200).json({ success: true, data: formattedGroups });
  } catch (error) {
    console.error("Error fetching recipient groups:", error);
    res.status(500).json({ success: false, message: "Failed to fetch recipient groups" });
  }
};

// Controller to update a recipient group
export const updateRecipient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, numbers } = req.body;

    // Ensure numbers is stored as a string
    const numbersString = Array.isArray(numbers) ? numbers.join(',') : numbers;

    const updatedGroup = await updateRecipientGroup(id, name, numbersString);
    res.status(200).json({ success: true, data: updatedGroup });
  } catch (error) {
    console.error("Error updating recipient group:", error);
    res.status(500).json({ success: false, message: "Failed to update recipient group" });
  }
};

// Controller to delete a recipient group
export const deleteRecipient = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteRecipientGroup(id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error deleting recipient group:", error);
    res.status(500).json({ success: false, message: "Failed to delete recipient group" });
  }
};