import { Hono } from "hono";
import { protectRoute } from "../utils/protectRoute";
import { isUserClient } from "../utils/authorize";
import {
  handleDeleteTask,
  handleGetMyPostedTasks,
  handleGetOpenTasks,
  handleGetTask,
  handlePostTask,
  handleUpdateTaskStatus,
} from "../controllers/task";

const taskRoutes = new Hono();

taskRoutes.post("/post", protectRoute, isUserClient, handlePostTask);
taskRoutes.get("/my-posted-tasks", protectRoute, handleGetMyPostedTasks);
taskRoutes.put("/change-task-status/:id", protectRoute, handleUpdateTaskStatus);
taskRoutes.delete("/delete-task/:id", protectRoute, handleDeleteTask);
taskRoutes.get("/open-tasks", protectRoute, handleGetOpenTasks);
taskRoutes.get("/get-task/:id", protectRoute, handleGetTask);
export default taskRoutes;
