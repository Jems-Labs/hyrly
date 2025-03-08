import { Context } from "hono";
import { prismaClient } from "../utils/prisma";
import { createSubmissionSchema } from "../utils/zodSchemas";

export async function handleCreateSubmission(c: Context) {
  const taskId = parseInt(c.req.param("taskId"));
  const { id: userId } = c.get("user");
  const prisma = prismaClient(c);
  const data = await c.req.json();
  try {
    if (isNaN(taskId)) {
      return c.json({ success: false, msg: "Invalid task" }, 400);
    }
    const validatedData = createSubmissionSchema.safeParse(data);
    if (!validatedData.success) {
      return c.json(
        {
          success: false,
          msg: "Invalid inputs",
        },
        400
      );
    }
    const { demoLinks, description } = validatedData.data;

    const taskExists = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
      select: {
        status: true,
        clientId: true,
      },
    });

    if (!taskExists)
      return c.json({ success: false, msg: "Task not found" }, 404);

    if (taskExists.clientId === userId) {
      return c.json(
        { success: false, msg: "You can't submit to your own task" },
        400
      );
    }
    if (taskExists.status !== "open") {
      return c.json(
        { success: false, msg: "Task is not open for submissions" },
        400
      );
    }

    const existingSubmission = await prisma.submission.findFirst({
      where: {
        userId,
        taskId,
      },
    });

    if (existingSubmission) {
      return c.json(
        { success: false, msg: "You have already submitted for this task" },
        400
      );
    }

    const newSubmission = await prisma.submission.create({
      data: {
        userId,
        taskId,
        demoLinks,
        description,
      },
    });

    if (!newSubmission)
      return c.json({ success: false, msg: "Failed to submit" }, 400);

    return c.json(
      { success: true, msg: "Submission created successfully" },
      200
    );
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}
