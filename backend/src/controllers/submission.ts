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
        title: true,
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
    const transactionResults = await prisma.$transaction([
      prisma.submission.create({
        data: { userId, taskId, demoLinks, description },
      }),
      prisma.notification.create({
        data: {
          toId: taskExists.clientId,
          fromId: userId,
          message: `New submission received for task: "${taskExists.title}". Review it now!`,
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { points: { increment: 100 } },
      }),
      prisma.notification.create({
        data: {
          toId: userId,
          fromId: taskExists.clientId,
          message: `You earned 100 points for submitting to "${taskExists.title}".`,
        },
      }),
    ]);

    if (!transactionResults) {
      return c.json(
        { success: false, msg: "Failed to create submission" },
        500
      );
    }
    return c.json(
      { success: true, msg: "Submission created successfully" },
      200
    );
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}

export async function handleGetAllSubmissions(c: Context) {
  const taskId = parseInt(c.req.param("taskId"));
  const prisma = prismaClient(c);
  try {
    if (isNaN(taskId)) {
      return c.json({ success: false, msg: "Invalid task" }, 400);
    }

    const submissions = await prisma.submission.findMany({
      where: {
        taskId,
      },
      include: {
        user: true,
        task: true,
      },
    });
    if (submissions.length === 0) {
      return c.json({ success: false, msg: "No Submission found" }, 404);
    }

    return c.json({ success: true, submissions }, 200);
  } catch (error) {
    return c.json({ success: false, msg: "Internal Server Error" }, 500);
  }
}

export async function handleAcceptSubmission(c: Context) {
  const prisma = prismaClient(c);
  const submissionId = parseInt(c.req.param("submissionId"));
  const { id } = c.get("user");
  if (isNaN(submissionId)) {
    return c.json({ success: false, msg: "Invalid submission ID" }, 400);
  }
  try {
    const submission = await prisma.submission.findUnique({
      where: {
        id: submissionId,
      },
      include: {
        task: true,
      },
    });
    if (!submission) {
      return c.json({ success: false, msg: "Submission not found" }, 404);
    }

    if (!submission.task) {
      return c.json({ success: false, msg: "Associated task not found" }, 404);
    }

    if (submission.task.clientId !== id) {
      return c.json({ success: false, msg: "Unauthorized to do this" }, 400);
    }
    if (submission.status === "accepted") {
      return c.json(
        { success: false, msg: "Submission is already accepted" },
        400
      );
    }
    const transactionResults = await prisma.$transaction([
      prisma.submission.update({
        where: { id: submissionId },
        data: { status: "accepted" },
      }),
      prisma.notification.create({
        data: {
          toId: submission.userId,
          fromId: id,
          message: `Your submission for "${submission.task.title}" has been accepted! 🎉`,
        },
      }),
    ]);

    if (!transactionResults) {
      return c.json({ success: false, msg: "Transaction failed" }, 500);
    }

    return c.json({ success: true, msg: "Accepted the submission" }, 200);
  } catch (error) {
    return c.json({ success: false, msg: "Internal Server Error" }, 500);
  }
}
export async function handleRejectSubmission(c: Context) {
  const prisma = prismaClient(c);
  const submissionId = parseInt(c.req.param("submissionId"));
  const { id } = c.get("user");

  if (isNaN(submissionId)) {
    return c.json({ success: false, msg: "Invalid submission ID" }, 400);
  }

  try {
    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
      include: { task: true },
    });

    if (!submission) {
      return c.json({ success: false, msg: "Submission not found" }, 404);
    }

    if (!submission.task) {
      return c.json({ success: false, msg: "Associated task not found" }, 404);
    }

    if (submission.task.clientId !== id) {
      return c.json(
        { success: false, msg: "Unauthorized to reject this submission" },
        403
      );
    }

    if (submission.status === "rejected") {
      return c.json(
        { success: false, msg: "Submission is already rejected" },
        400
      );
    }

    const transactionResults = await prisma.$transaction([
      prisma.submission.update({
        where: { id: submissionId },
        data: { status: "rejected" },
      }),
      prisma.notification.create({
        data: {
          toId: submission.userId,
          fromId: id,
          message: `Your submission for "${submission.task.title}" has been rejected. Keep improving! 🚀`,
        },
      }),
    ]);

    if (!transactionResults) {
      return c.json({ success: false, msg: "Transaction failed" }, 500);
    }

    return c.json({ success: true, msg: "Rejected the submission" }, 200);
  } catch (error) {
    return c.json({ success: false, msg: "Internal Server Error" }, 500);
  }
}
