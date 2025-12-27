const Task = require("../models/Task");

// ================= CREATE TASK =================
const createTask = async (req, res) => {
  try {
    const { uid, title, date } = req.body;

    if (!uid || !title || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTask = new Task({
      uid,
      title,
      date,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET TASKS =================
// Supports:
// - All tasks
// - Completed tasks
// - Favorite tasks
// - Date-based filtering
const getTasks = async (req, res) => {
  try {
    const { uid, date, status, favorite } = req.query;

    if (!uid) {
      return res.status(400).json({ message: "UID is required" });
    }

    // Base filter (always)
    let query = { uid };

    // Calendar date filter
    if (date) {
      query.date = date;
    }

    // Completed tasks filter
    if (status) {
      query.status = status; // "done"
    }

    // Favorite tasks filter
    if (favorite === "true") {
      query.isFavorite = true;
    }

    const tasks = await Task.find(query).sort({ date: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE TASK =================
// Used for:
// - status update (done / todo)
// - favorite toggle (isFavorite)
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE TASK =================
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
