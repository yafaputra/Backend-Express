// auth.service.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { IGlobalResponse } from "../interfaces/global.interface";
import { ILoginResponse } from "../interfaces/auth.interface";
import { 
  ICreateAdminRequest, 
  IUpdateAdminRequest, 
  IAdminResponse 
} from "../interfaces/admin.interface";
import { UGenerateToken } from "../utils/token.util";

const prisma = new PrismaClient();

export const SLogin = async (
  usernameOrEmail: string,
  password: string
): Promise<IGlobalResponse<ILoginResponse>> => {
  const admin = await prisma.admin.findFirst({
    where: {
      OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      isActive: true,
      deletedAt: null,
    },
  });
  
  if (!admin) {
    throw new Error("Invalid credentials");
  }
  
  const isPasswordValid = await bcrypt.compare(password, admin.password);
  
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }
  
  const token = UGenerateToken({
    id: admin.id,
    username: admin.username,
    email: admin.email,
    name: admin.name,
  });
  
  return {
    status: true,
    message: "Login successful",
    data: {
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        name: admin.name,
      },
    },
  };
};

export const SCreateAdmin = async (
  data: ICreateAdminRequest
): Promise<IGlobalResponse<IAdminResponse>> => {
  const existingAdmin = await prisma.admin.findFirst({
    where: {
      OR: [
        { username: data.username },
        { email: data.email }
      ],
      deletedAt: null,
    },
  });

  if (existingAdmin) {
    throw new Error("Username or email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const admin = await prisma.admin.create({
    data: {
      username: data.username,
      password: hashedPassword,
      email: data.email,
      name: data.name,
      isActive: true,
    },
  });

  return {
    status: true,
    message: "Admin created successfully",
    data: {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      name: admin.name,
      isActive: admin.isActive,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    },
  };
};

export const SUpdateAdmin = async (
  id: number,
  data: IUpdateAdminRequest
): Promise<IGlobalResponse<IAdminResponse>> => {
  const existingAdmin = await prisma.admin.findFirst({
    where: {
      id: id,
      deletedAt: null,
    },
  });

  if (!existingAdmin) {
    throw new Error("Admin not found");
  }

  if (data.username || data.email) {
    const conflictAdmin = await prisma.admin.findFirst({
      where: {
        OR: [
          ...(data.username ? [{ username: data.username }] : []),
          ...(data.email ? [{ email: data.email }] : []),
        ],
        NOT: { id: id },
        deletedAt: null,
      },
    });

    if (conflictAdmin) {
      throw new Error("Username or email already exists");
    }
  }

  // Prepare update data
  const updateData: any = { ...data };
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  const admin = await prisma.admin.update({
    where: { id: id },
    data: updateData,
  });

  return {
    status: true,
    message: "Admin updated successfully",
    data: {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      name: admin.name,
      isActive: admin.isActive,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    },
  };
};

export const SDeleteAdmin = async (
  id: number
): Promise<IGlobalResponse<null>> => {
  // Check if admin exists
  const existingAdmin = await prisma.admin.findFirst({
    where: {
      id: id,
      deletedAt: null,
    },
  });

  if (!existingAdmin) {
    throw new Error("Admin not found");
  }

  // Soft delete
  await prisma.admin.update({
    where: { id: id },
    data: {
      deletedAt: new Date(),
      isActive: false,
    },
  });

  return {
    status: true,
    message: "Admin deleted successfully",
    data: null,
  };
};