import { api } from "@/lib/axios";
import type { AuthResponse, LoginDTO, RegisterDTO, User } from "@/types/auth";

export async function loginUser(data: LoginDTO): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/login", data);
  return response.data;
}

export async function registerUser(data: RegisterDTO): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/register", data);
  return response.data;
}

export async function getMe(): Promise<User> {
  const response = await api.get<User>("/auth/me");
  return response.data;
}
