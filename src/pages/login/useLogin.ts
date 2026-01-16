// useAuth.ts - React Query hooks for authentication (FIXED)

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { AxiosError } from "axios";
import { loginService } from "./loginService";
import type { LoginRequest, LoginResponse } from "./login.types";
import { setOrgId, getDashboardPath } from "../../utils/orgId";

/**
 * Custom hook for login mutation
 * Handles login, stores token, and redirects to dashboard
 */
export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationFn: async (credentials: LoginRequest) => {
      console.log("🔵 Login mutation called with:", credentials.email);
      const response = await loginService.login(credentials);
      console.log("🔵 Login response received:", response);
      return response;
    },
    onSuccess: (data) => {
      console.log("✅ Login successful, processing data:", data);

      // Check if data exists
      if (!data) {
        console.error("❌ No data received from login");
        return;
      }

      // 1. Save access token
      if (data.access_token) {
        localStorage.setItem("authToken", data.access_token);
        console.log("✅ Token saved to localStorage");
      } else {
        console.error("❌ No access_token in response");
      }

      // 2. Save user data
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("✅ User saved:", data.user.full_name);
      } else {
        console.error("❌ No user data in response");
      }

      // 3. Save org_id for routing
      if (data.user?.org_id) {
        setOrgId(data.user.org_id);
        console.log("✅ Org ID saved:", data.user.org_id);
      } else {
        console.error("❌ No org_id in user data");
      }

      // 4. Invalidate any cached queries (optional)
      queryClient.invalidateQueries();

      // 5. Redirect to dashboard with org_id
      try {
        const dashboardPath = getDashboardPath(); // Returns /{org_id}
        console.log("✅ Redirecting to:", dashboardPath);
        navigate(dashboardPath);
      } catch (error) {
        console.error("❌ Error getting dashboard path:", error);
      }

      console.log("✅ Login flow completed successfully");
    },

    onError: (error) => {
      console.error("❌ Login failed:", error);

      const axiosError = error as AxiosError<{
        detail?: string;
        message?: string;
      }>;

      const errorMessage =
        axiosError.response?.data?.detail ||
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Login failed. Please check your credentials.";

      console.error("❌ Error message:", errorMessage);
    },
  });
};

/**
 * Custom hook for logout
 * Clears token, user data, and redirects to login
 */
export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginService.logout,
    onSuccess: () => {
      // Clear all cached queries
      queryClient.clear();

      // Redirect to login
      navigate("/login");

      console.log("✅ Logout successful");
    },
  });
};

/**
 * Helper function to get current user from localStorage
 * Use this to access user data in components
 */
export const getCurrentUser = (): LoginResponse["user"] | null => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

/**
 * Helper function to check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("authToken");
  return !!token;
};

/**
 * Helper function to get auth token
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

/**
 * Hook to get current user data reactively
 * Use this in components that need user data
 */
export const useCurrentUser = () => {
  const user = getCurrentUser();
  return { user, isAuthenticated: !!user };
};
