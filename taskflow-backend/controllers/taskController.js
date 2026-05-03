import {
  getTasks,
  addTask,
  updateTask,
  deleteTask
} from "../models/taskModel.js";

// GET all tasks
export const getAllTasks = (req, res) => {
  res.json(getTasks());
};

// CREATE task
export const createTask = (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Task cannot be empty" });
  }

  const newTask = {
    id: Date.now(),
    text,
    completed: false
  };

  addTask(newTask);
  res.status(201).json(newTask);
};

// UPDATE task
export const toggleTask = (req, res) => {
  const id = Number(req.params.id);

  updateTask(id, { completed: req.body.completed });
  res.json({ message: "Task updated" });
};

// DELETE task
export const removeTask = (req, res) => {
  const id = Number(req.params.id);

  deleteTask(id);
  res.json({ message: "Task deleted" });
};