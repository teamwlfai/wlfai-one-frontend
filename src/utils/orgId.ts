/**
 * Organization ID Utility (Updated with JWT Support)
 *
 * This utility handles getting the organization ID from:
 * 1. JWT token (PRODUCTION - decodes access_token)
 * 2. localStorage (FALLBACK - from login response)
 * 3. Hardcoded (DEVELOPMENT - for testing)
 */

import type { DecodedToken } from "../pages/login/login.types";

// ============================================
// HARDCODED ORG_ID FOR DEVELOPMENT
// ============================================
const HARDCODED_ORG_ID = "org-123";

// ============================================
// JWT TOKEN UTILITIES
// ============================================

/**
 * Decode JWT token to get org_id and other claims
 */
function decodeToken(token: string): DecodedToken | null {
  try {
    // JWT format: header.payload.signature
    const parts = token.split(".");
    if (parts.length !== 3) {
      console.error("Invalid token format");
      return null;
    }

    // Decode the payload (middle part)
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload) as DecodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

/**
 * Check if token is expired
 */
function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return true;
  }

  // exp is in seconds, Date.now() is in milliseconds
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
}

// ============================================
// GET ORG_ID
// ============================================

/**
 * Get the current organization ID
 * Priority: Token → localStorage → Hardcoded
 */
export function getOrgId(): string {
  // Method 1: Get from JWT token (PRODUCTION)
  const token = localStorage.getItem("authToken");
  if (token && !isTokenExpired(token)) {
    const decoded = decodeToken(token);
    if (decoded?.org_id) {
      return decoded.org_id;
    }
  }

  // Method 2: Get from localStorage (FALLBACK)
  const storedOrgId = localStorage.getItem("org_id");
  if (storedOrgId) {
    return storedOrgId;
  }

  // Method 3: Use hardcoded value (DEVELOPMENT)
  return HARDCODED_ORG_ID;
}

/**
 * Set the organization ID (call this after successful login)
 * This is a fallback - normally org_id comes from token
 */
export function setOrgId(orgId: string): void {
  localStorage.setItem("org_id", orgId);
}

/**
 * Clear the organization ID (call this on logout)
 */
export function clearOrgId(): void {
  localStorage.removeItem("org_id");
}

/**
 * Check if org_id is set
 */
export function hasOrgId(): boolean {
  return !!getOrgId();
}

/**
 * Get decoded token data
 * Useful for accessing user info, role, etc.
 */
export function getTokenData(): DecodedToken | null {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return null;
  }
  return decodeToken(token);
}

/**
 * Get organization name from token
 */
export function getOrgName(): string | null {
  const tokenData = getTokenData();
  return tokenData?.org_name || null;
}

/**
 * Get user email from token
 */
export function getUserEmail(): string | null {
  const tokenData = getTokenData();
  return tokenData?.email || null;
}

/**
 * Get user role from token
 */
export function getUserRole(): string | null {
  const tokenData = getTokenData();
  return tokenData?.role || null;
}

// ============================================
// ROUTE HELPERS
// ============================================

/**
 * Build a route path with org_id
 * Example: buildRoute('/patients') → '/3ae90f96-9204-45ff-9df7-11e3ebc1166e/patients'
 */
export function buildRoute(path: string): string {
  const orgId = getOrgId();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `/${orgId}${cleanPath}`;
}

/**
 * Get the base dashboard path for current org
 * Example: getDashboardPath() → '/3ae90f96-9204-45ff-9df7-11e3ebc1166e'
 */
export function getDashboardPath(): string {
  return `/${getOrgId()}`;
}

// ============================================
// AUTHENTICATION HELPERS
// ============================================

/**
 * Check if user is authenticated
 * Checks for valid, non-expired token
 */
export function isAuthenticated(): boolean {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return false;
  }
  return !isTokenExpired(token);
}

/**
 * Get auth token
 */
export function getAuthToken(): string | null {
  return localStorage.getItem("authToken");
}

/**
 * Clear all auth data (call on logout)
 */
export function clearAuthData(): void {
  localStorage.removeItem("authToken");
  localStorage.removeItem("org_id");
  localStorage.removeItem("user");
}

// ============================================
// USAGE EXAMPLES
// ============================================

/*
// In your components:
import { 
  getOrgId, 
  getOrgName, 
  getUserRole,
  buildRoute, 
  getDashboardPath,
  isAuthenticated,
  clearAuthData
} from './utils/orgId';

// Get current org_id (from token)
const orgId = getOrgId();  // '3ae90f96-9204-45ff-9df7-11e3ebc1166e'

// Get org name
const orgName = getOrgName();  // 'Acme Healthcare'

// Get user role
const role = getUserRole();  // 'staff'

// Check authentication
if (!isAuthenticated()) {
  navigate('/login');
}

// Build routes
<Link to={buildRoute('/patients')}>Patients</Link>

// On logout
const handleLogout = () => {
  clearAuthData();
  navigate('/login');
};
*/
