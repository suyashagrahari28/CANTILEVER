const express = require("express");
const Task = require("../models/Task");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

// Create Task
router.post("/", auth, async (req, res) => {
  const { title, description, priority, dueDate } = req.body;
  try {
    const task = await Task.create({
      user: req.user,
      title,
      description,
      priority,
      dueDate
    });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: "Task creation failed" });
  }
});

// Get All Tasks
router.get("/", auth, async (req, res) => {
  const { sortBy, filter } = req.query;
  const query = { user: req.user };
  if (filter) query.status = filter;
  const tasks = await Task.find(query).sort(sortBy ? { [sortBy]: 1 } : {});
  res.json(tasks);
});

// Update Task
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.user }, req.body, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

// Delete Task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;