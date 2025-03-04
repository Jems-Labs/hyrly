import { Hono } from "hono";
import {
  handleAddExperience,
  handleDeleteExperience,
  handleFetchUser,
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

export default userRoutes;
