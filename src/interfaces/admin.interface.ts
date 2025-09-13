// admin.interface.ts
export interface ICreateAdminRequest {
  username: string;
  password: string;
  email: string;
  name: string;
}

export interface IUpdateAdminRequest {
  username?: string;
  password?: string;
  email?: string;
  name?: string;
}

export interface IAdminResponse {
  id: number;
  username: string;
  email: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}