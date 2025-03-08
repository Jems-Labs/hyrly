import { Hono } from "hono";
import { protectRoute } from "../utils/protectRoute";
import { handleCreateSubmission } from "../controllers/submission";
const submissionRoutes = new Hono();

submissionRoutes.post("/create-submission/:taskId", protectRoute, handleCreateSubmission);

export default submissionRoutes;