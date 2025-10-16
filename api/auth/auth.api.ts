// src/api/auth.api.ts
import http from "@/utils/http";
import { API_RESOURCES } from "@/utils/api-endpoints";
import type { LoginFormValues } from "@/schemas/login-schema";

export interface LoginResponse {
  token: string;
  user?: any;
  data?: any;
  message?: string;
}

/* ============ AUTH APIs ============ */

// Login API
export async function loginApi(input: LoginFormValues): Promise<LoginResponse> {
  const { data } = await http.post<LoginResponse>(API_RESOURCES.LOGIN, input);
  console.log("Login Response Data:", data);
  return data;
}

// Get current user
export async function getCurrentUserApi() {
  const { data } = await http.get(API_RESOURCES.USER);
  console.log("Current User Data:", data);
  return data;
}

// Logout user
export async function logoutApi() {
  const { data } = await http.get(API_RESOURCES.LOGOUT);
  console.log("Logout Response Data:", data);
  return data;
}
