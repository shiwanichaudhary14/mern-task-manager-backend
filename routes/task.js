const express = require("express");
const Task = require("../models/Task");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

//  Get all tasks for logged-in user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});

//  Create a new task
router.post("/", authenticateToken, async (req, res) => {
  const { title } = req.body;

  try {
    const newTask = new Task({ title, userId: req.userId });
    await newTask.save();

    res.json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
});

module.exports = router;


