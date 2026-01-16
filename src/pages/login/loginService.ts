import api from "../../api";
import type { LoginRequest, LoginResponse } from "./login.types";

/**
 * Authentication Service
 * Handles all API calls related to authentication
 */
export const loginService = {
  /**
   * Login user with email and password
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const data = await api.post<LoginResponse>("/auth/login", credentials);

      console.log("✅ Login API response:", data);
      return data;
    } catch (error: any) {
      console.error("❌ authService.login error:", error);
      console.error("❌ Error response:", error?.response);
      throw error;
    }
  },

  /**
   * Logout user (client-side)
   */
  logout: async (): Promise<void> => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("org_id");

    console.log("✅ Local storage cleared");
  },

  /**
   * Refresh token (optional)
   */
  refreshToken: async (refreshToken: string): Promise<LoginResponse> => {
    // ✅ Direct return (no .data)
    return api.post<LoginResponse>("/auth/refresh", {
      refresh_token: refreshToken,
    });
  },

  /**
   * Get current user profile (optional)
   */
  getCurrentUser: async (): Promise<LoginResponse["user"]> => {
    // Backend returns { user: {...} }
    const data = await api.get<{ user: LoginResponse["user"] }>("/auth/me");
    return data.user;
  },
};
