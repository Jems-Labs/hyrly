import { Hono } from "hono";
import { protectRoute } from "../utils/protectRoute";
import {
  handleAcceptSubmission,
  handleCreateSubmission,
  handleGetAllSubmissions,
  handleRejectSubmission,
} from "../controllers/submission";
import { isUserClient } from "../utils/authorize";


const submissionRoutes = new Hono();

submissionRoutes.post(
  "/create-submission/:taskId",
  protectRoute,
  handleCreateSubmission
);
submissionRoutes.get(
  "/all-submissions/:taskId",
  protectRoute,
  isUserClient,
  handleGetAllSubmissions
);
submissionRoutes.put(
  "/accept-submission/:submissionId",
  protectRoute,
  isUserClient,
  handleAcceptSubmission
);
submissionRoutes.put(
  "/reject-submission/:submissionId",
  protectRoute,
  isUserClient,
  handleRejectSubmission
);

export default submissionRoutes;
