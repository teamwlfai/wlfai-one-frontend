import React from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute - Wrapper component that checks if user is authenticated
 * If not authenticated, redirects to login page
 *
 * Usage:
 * <ProtectedRoute>
 *   <YourProtectedComponent />
 * </ProtectedRoute>
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // TODO: Replace this with your actual authentication check
  // Example: const { isAuthenticated } = useAuth();
  // For now, we'll use a simple check
  const isAuthenticated = checkAuth();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

/**
 * Check if user is authenticated
 * TODO: Replace with your actual authentication logic
 */
function checkAuth(): boolean {
  // Example implementations:

  // Option 1: Check localStorage
  const token = localStorage.getItem("authToken");
  return !!token;

  // Option 2: Check sessionStorage
  // const session = sessionStorage.getItem('user');
  // return !!session;

  // Option 3: Check cookie
  // return document.cookie.includes('auth_token');

  // Option 4: Use Context/Redux
  // This would come from your auth context or Redux store
  // return store.getState().auth.isAuthenticated;
}

export default ProtectedRoute;
