import express from "express";
import {
  getAllTasks,
  createTask,
  toggleTask,
  removeTask
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getAllTasks);
router.post("/", createTask);
router.put("/:id", toggleTask);
router.delete("/:id", removeTask);

export default router;