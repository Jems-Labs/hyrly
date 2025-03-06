import { Context } from "hono";
import { prismaClient } from "../utils/prisma";
import { createTaskSchema } from "../utils/zodSchemas";
import { RewardType } from "@prisma/client";

export async function handlePostTask(c: Context) {
  const prisma = prismaClient(c);
  const { id } = c.get("user");
  try {
    const data = await c.req.json();
    const validatedData = createTaskSchema.safeParse(data);
    if (!validatedData.success) {
      return c.json(
        {
          msg: "Invalid inputs",
        },
        400
      );
    }

    const { title, description, skills, reward } = validatedData.data;
    if (!Object.values(RewardType).includes(reward)) {
      return c.json({ msg: "Invalid reward type" }, 400);
    }
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        skills,
        reward: reward as RewardType,
        clientId: id,
      },
    });
    if (!newTask) {
      return c.json({ msg: "Failed to create task" }, 400);
    }
    return c.json({ msg: "Created a task" }, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}

export async function handleGetMyPostedTasks(c: Context) {
  const prisma = prismaClient(c);
  const { id } = c.get("user");
  try {
    const tasks = await prisma.task.findMany({
      where: {
        clientId: id,
      },
    });

    if (!tasks || tasks.length === 0) {
      return c.json({ msg: "No Tasks Found" }, 404);
    }

    return c.json(tasks, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}

export async function handleUpdateTaskStatus(c: Context) {
  const prisma = prismaClient(c);
  const { status } = await c.req.json();
  const taskId = parseInt(c.req.param("id"));
  const { id } = c.get("user");

  try {
    if (isNaN(taskId) || !status) {
      return c.json({ msg: "Invalid Inputs" }, 400);
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId, clientId: id },
      data: {
        status: status === "closed" ? "closed" : "open",
      },
    });
    if (updatedTask.count === 0) {
      return c.json({ msg: "Task not found or unauthorized" }, 404);
    }
    return c.json({ msg: "Updated Task Status" }, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}

export async function handleDeleteTask(c: Context) {
  const prisma = prismaClient(c);
  const taskId = parseInt(c.req.param("id"));
  const { id } = c.get("user");
  try {

    if (isNaN(taskId)) {
      return c.json({ msg: "Invalid Task ID" }, 400);
    }
    await prisma.task.delete({
      where: {id: taskId, clientId: id}
    });

    return c.json({msg: "Task Deleted"}, 200);

  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}
