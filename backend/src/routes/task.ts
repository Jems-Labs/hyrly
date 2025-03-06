import { Hono } from "hono";
import { protectRoute } from "../utils/protectRoute";
import { isUserClient } from "../utils/authorize";
import { handlePostTask } from "../controllers/task";

const taskRoutes = new Hono();

taskRoutes.post("/post", protectRoute, isUserClient, handlePostTask);


export default taskRoutes;  