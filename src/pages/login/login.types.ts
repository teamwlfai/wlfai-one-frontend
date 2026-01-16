// auth.types.ts - TypeScript types for authentication

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  role: string;
  org_id: string;
  org_name: string;
  is_active: boolean;
  is_blocked: boolean;
  email_verified: boolean;
  last_login: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export interface DecodedToken {
  sub: string; // user_id
  org_id: string;
  org_name: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  org_id: string | null;
}
