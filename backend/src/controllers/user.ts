import { Context } from "hono";
import { prismaClient } from "../utils/prisma";
import {
  addExperienceSchema,
  loginSchema,
  profileUpdateSchema,
  signupSchema,
} from "../utils/zodSchemas";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie, removeToken } from "../utils/generateToken";
export async function handleUserSignup(c: Context) {
  const prisma = prismaClient(c);
  try {
    const data = await c.req.json();
    const validatedData = signupSchema.safeParse(data);
    if (!validatedData.success) {
      return c.json(
        {
          msg: "Invalid inputs",
        },
        400
      );
    }
    const { firstName, lastName, email, password, role } = validatedData.data;

    const isUserExists = await prisma.user.findUnique({
      where: { email },
    });
    if (isUserExists) return c.json({ msg: "User already exists" }, 400);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        role,
        password: hashedPassword,
      },
    });
    if (!newUser) return c.json({ msg: "Failed to create account" }, 400);
    return c.json({ msg: "Account Created" }, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}
export const handleUserLogin = async (c: Context) => {
  const prisma = prismaClient(c);
  try {
    const data = await c.req.json();
    const validatedData = loginSchema.safeParse(data);
    if (!validatedData.success) {
      return c.json(
        {
          msg: "Invalid inputs",
        },
        400
      );
    }
    const { email, password } = validatedData.data;
    const user = await prisma.user.findFirst({
      where: { email: email },
    });
    const isMatch = await bcrypt.compare(password, user.password);

    if (!user) return c.json({ msg: "User doesn't exists" }, 400);
    if (!isMatch) return c.json({ msg: "Password is incorrect" }, 400);

    generateTokenAndSetCookie(user.id, c);

    return c.json(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      { status: 200 }
    );
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};

export const handleFetchUser = async (c: Context) => {
  const prisma = prismaClient(c);
  try {
    const { id } = c.get("user");
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        skills: true,
        workExperience: true,
      },
    });
    if (!user) return c.json({ msg: "User doesn't exists" }, 400);
    return c.json(user, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};

export const handleUserLogout = async (c: Context) => {
  try {
    await removeToken(c);
    return c.json({ msg: "Logged Out" }, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};

export const handleAddExperience = async (c: Context) => {
  const prisma = prismaClient(c);
  const { id } = c.get("user");
  try {
    const data = await c.req.json();
    const validatedData = addExperienceSchema.safeParse(data);
    if (!validatedData.success) {
      return c.json(
        {
          msg: "Invalid inputs",
        },
        400
      );
    }
    const {
      company,
      title,
      fromMonth,
      fromYear,
      isCurrentlyWorking,
      toMonth,
      toYear,
      description,
    } = validatedData.data;

    const newExperience = await prisma.workExperience.create({
      data: {
        company,
        title,
        fromMonth,
        fromYear,
        isCurrentlyWorking,
        toMonth,
        toYear,
        description,
        userId: id,
      },
    });
    if (!newExperience) {
      return c.json({ msg: "Failed to add experience" }, 400);
    }

    return c.json({ msg: "Added new experience" }, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
};

export const handleUpdateProfile = async (c: Context) => {
  const prisma = prismaClient(c);
  const { id } = c.get("user");
  try {
    const data = await c.req.json();
    const validatedData = profileUpdateSchema.safeParse(data);
    if (!validatedData.success) {
      return c.json(
        {
          msg: "Invalid inputs",
        },
        400
      );
    }
    const {
      firstName,
      lastName,
      email,
      skills
    } = validatedData.data;

    await prisma.user.update({
      where: {id},
      data: {
        firstName,
        lastName,
        email,
        skills
      }
    })
    

    return c.json({ msg: "Profile Updated" }, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}