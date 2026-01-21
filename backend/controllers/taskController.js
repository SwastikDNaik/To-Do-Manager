const Task = require("../models/Task");
const User = require("../models/User");

// ================= CREATE TASK =================
const createTask = async (req, res) => {
  try {
    const { uid, title, date } = req.body;

    if (!uid || !title || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized UID" });
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
const getTasks = async (req, res) => {
  try {
    const { uid, date, status, favorite } = req.query;

    if (!uid) {
      return res.status(400).json({ message: "UID is required" });
    }

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized UID" });
    }

    let query = { uid };

    if (date) query.date = date;
    if (status) query.status = status;
    if (favorite === "true") query.isFavorite = true;

    const tasks = await Task.find(query).sort({ date: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE TASK =================
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });

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
