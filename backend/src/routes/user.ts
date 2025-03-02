import { Hono } from "hono";
import {
  handleAddExperience,
  handleFetchUser,
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

export default userRoutes;