"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import type { LoginFormValues } from "@/schemas/login-schema";
import {
  LoginResponse,
  loginApi,
  getCurrentUserApi,
  logoutApi,
} from "@/api/auth/auth.api";

/* ============ LOGIN HOOK ============ */
export const useLoginMutation = (onReset?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, any, LoginFormValues>({
    mutationFn: loginApi,
    onSuccess: (data) => {
      const user = data?.data?.user;
      const token = data?.data?.token;
      if (!user || !token) {
        toast.error("Invalid login response from server.");
        return;
      }
      if (user.role !== "admin") {
        toast.error("Access denied! Only admins can log in.");
        return;
      }
      Cookies.set("auth_token", token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });

      toast.success(data?.message || "Login successful");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      if (onReset) onReset();
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Login failed. Please check your credentials.";
      toast.error(message);
    },
  });
};

/* ============ GET CURRENT USER HOOK ============ */
export const useGetCurrentUserQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUserApi,
    retry: 0,
    ...options,
  });
};

/* ============ LOGOUT HOOK ============ */
export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      Cookies.remove("auth_token");
      queryClient.clear();
      toast.success("Logged out successfully");
      window.location.href = "/auth/login";
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Logout failed. Please try again.";
      toast.error(message);
    },
  });
};
