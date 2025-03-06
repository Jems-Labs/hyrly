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

      return c.json({msg: "Invalid reward type"}, 400)
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
