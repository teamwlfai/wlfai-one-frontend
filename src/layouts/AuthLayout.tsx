import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * AuthLayout - Simple layout for authentication pages (login, register, forgot password)
 * No sidebar, no header, just centered content with optional background
 */
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Content */}
      <div className="relative w-full">{children}</div>
    </div>
  );
};

export default AuthLayout;
