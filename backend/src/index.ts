import { Context, Hono } from "hono";
import userRoutes from "./routes/user";
import { cors } from "hono/cors";
import taskRoutes from "./routes/task";
import submissionRoutes from "./routes/submission";

const app = new Hono<{ Bindings: { CLIENT_URL: string } }>();
app.use("*", async (c: Context, next) => {
  const clientUrl = c.env.CLIENT_URL || "http://localhost:5173";
  c.header("Access-Control-Allow-Origin", clientUrl);
  c.header("Access-Control-Allow-Credentials", "true");
  return next();
});

app.use(
  "*",
  cors({
    origin: (origin, c) => {
      const clientUrl = c.env.CLIENT_URL || "http://localhost:5173";
      return origin === clientUrl ? origin : clientUrl;
    },
    credentials: true,
  })
);

app.route("/api/user", userRoutes);
app.route("/api/task", taskRoutes);
app.route("/api/submission", submissionRoutes);

export default app;
