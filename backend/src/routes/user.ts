import { Hono } from "hono";
import {
  handleAddExperience,
  handleDeleteExperience,
  handleDeleteNotification,
  handleFetchUser,
  handleGetLeaderboard,
  handleGetMyNotifications,
  handleGetPublicUser,
  handleGetUser,
  handleUpdateExperience,
  handleUpdateProfile,
  handleUserLogin,
  handleUserLogout,
  handleUserSignup,
} from "../controllers/user";
import { protectRoute } from "../utils/protectRoute";

const userRoutes = new Hono();

userRoutes.post("/signup", handleUserSignup);
userRoutes.post("/login", handleUserLogin);
userRoutes.post("/logout", protectRoute, handleUserLogout);
userRoutes.get("/fetch-user", protectRoute, handleFetchUser);
userRoutes.post("/add-experience", protectRoute, handleAddExperience);
userRoutes.put("/profile-update", protectRoute, handleUpdateProfile);
userRoutes.put("/experience-update/:id", protectRoute, handleUpdateExperience);
userRoutes.delete(
  "/delete-experience/:id",
  protectRoute,
  handleDeleteExperience
);
userRoutes.get("/notifications", protectRoute, handleGetMyNotifications);
userRoutes.delete("/notification/:id", protectRoute, handleDeleteNotification);
userRoutes.get("/leaderboard", protectRoute, handleGetLeaderboard);
userRoutes.get("/public-user/:id", protectRoute, handleGetPublicUser);
userRoutes.get("/search-user", protectRoute, handleGetUser);

export default userRoutes;
