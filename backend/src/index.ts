import { Context, Hono } from "hono";
import userRoutes from "./routes/user";
import { cors } from "hono/cors";
import taskRoutes from "./routes/task";
import submissionRoutes from "./routes/submission";

const app = new Hono();
app.use("*", async (c: Context, next) => {
  c.header("Access-Control-Allow-Origin", "https://hyrly.netlify.app");
  c.header("Access-Control-Allow-Credentials", "true");
  return next();
});

app.use(
  "*",
  cors({
    origin: "https://hyrly.netlify.app",
    credentials: true,
  })
);

app.route("/api/user", userRoutes);
app.route("/api/task", taskRoutes);
app.route("/api/submission", submissionRoutes);

export default app;
