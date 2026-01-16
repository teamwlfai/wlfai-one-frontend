import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/Home/HomePage";
import PatientsPage from "../pages/Patients/PatientPage";
import AppointmentsPage from "../pages/Appointments/AppointmentPages";
import DepartmentPage from "../pages/Departments/index";
import UsersPage from "../pages/Users/UsersPage";
import OrdersPage from "../pages/Orders/OrdersPage";
import SettingsPage from "../pages/Settings/SettingsPage";
import LoginPage from "../pages/login";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========================================
            PUBLIC ROUTES (No Authentication Required)
            ======================================== */}

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login Page */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />

        {/* Add more auth routes here if needed */}
        {/* 
        <Route
          path="/register"
          element={
            <AuthLayout>
              <RegisterPage />
            </AuthLayout>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <AuthLayout>
              <ForgotPasswordPage />
            </AuthLayout>
          }
        />
        */}

        {/* ========================================
            PROTECTED ROUTES (Authentication Required)
            ======================================== */}

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  {/* Dashboard Home */}
                  <Route index element={<HomePage />} />

                  {/* Main Pages */}
                  <Route path="patients" element={<PatientsPage />} />
                  <Route path="appointments" element={<AppointmentsPage />} />
                  <Route path="departments" element={<DepartmentPage />} />
                  <Route path="users" element={<UsersPage />} />
                  <Route path="orders" element={<OrdersPage />} />
                  <Route path="settings" element={<SettingsPage />} />

                  {/* 404 for dashboard routes */}
                  <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                  />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* ========================================
            FALLBACK - 404
            ======================================== */}

        {/* Redirect any unknown route to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
