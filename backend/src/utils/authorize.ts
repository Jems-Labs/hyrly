import { Context } from "hono";
import { prismaClient } from "./prisma";

export const isUserClient = async (c: Context, next: () => Promise<void>) => {
  const { id } = c.get("user");
  const prisma = prismaClient(c);

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user || user.role !== "client") {
    return c.json({ msg: "You are not a client" }, 400);
  }

  await next();
};
