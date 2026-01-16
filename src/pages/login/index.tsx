import React, { useState } from "react";
import { useLogin } from "./useLogin";
import healthcareAI from "../../assets/healthcare-ai.png";

const LoginPage: React.FC = () => {
  const login = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({ email: "", password: "", general: "" });

    // Basic validation
    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return;
    }
    if (!formData.password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return;
    }

    // Call login mutation
    try {
      const result = await login.mutateAsync({
        email: formData.email,
        password: formData.password,
      });
      // alert(result);
      if (result.success) {
        window.location.href = "/admin/dashboards";
      }
      console.log(result, "resultresultresult");
      // Success handling is done in useLogin onSuccess
    } catch (error: any) {
      // Error handling
      const errorMessage =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        "Invalid email or password";

      setErrors((prev) => ({ ...prev, general: errorMessage }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when user starts typing
    if (name === "email" || name === "password") {
      setErrors((prev) => ({ ...prev, [name]: "", general: "" }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* MAIN CONTAINER - 80% WIDTH */}
      <div className="w-[80%] h-[90vh] flex bg-white shadow-xl overflow-hidden">
        {/* LEFT SIDE - IMAGE */}
        <div className="hidden lg:flex w-1/2 relative">
          <img
            src={healthcareAI}
            alt="Healthcare AI"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8">
          <div className="w-full max-w-md">
            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back!</h2>
            <p className="text-sm text-gray-500 mt-1">
              Sign in to your AI Healthcare Platform
            </p>

            {/* General Error Message */}
            {errors.general && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.general}
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="doctor@hospital.com"
                  disabled={login.isPending}
                  className={`mt-1 w-full rounded-lg border px-4 py-2.5
                    focus:border-gray-600 focus:ring-1 focus:ring-gray-600/20 outline-none
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${errors.email ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  disabled={login.isPending}
                  className={`mt-1 w-full rounded-lg border px-4 py-2.5
                    focus:border-gray-600 focus:ring-1 focus:ring-gray-600/20 outline-none
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${errors.password ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    disabled={login.isPending}
                    className="h-3.5 w-3.5 rounded border border-gray-300 accent-black focus:ring-0"
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  className="text-gray-600 hover:text-gray-900 disabled:opacity-50"
                  disabled={login.isPending}
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={login.isPending}
                className="w-full bg-teal-600 text-white rounded-lg py-3
                  font-medium hover:bg-teal-800 transition
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center"
              >
                {login.isPending ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Footer */}
              <p className="text-sm text-center text-gray-500 mt-10">
                Don't have an account?
                <span className="ml-1 text-blue-400 font-medium cursor-pointer hover:underline">
                  Request Access
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
