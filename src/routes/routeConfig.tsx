import type { RouteObject } from "react-router";

import LoginPage from "../pages/login";

import HomePage from "../pages/Home/HomePage";
import PatientsPage from "../pages/Patients/PatientPage";
import AppointmentsPage from "../pages/Appointments/AppointmentPages";
import DepartmentPage from "../pages/Departments";
import UsersPage from "../pages/Users/UsersPage";
import OrdersPage from "../pages/Orders/OrdersPage";
import SettingsPage from "../pages/Settings/SettingsPage";

// Define all your dashboard routes here
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/admin/dashboards",
    element: <HomePage />,
  },
  {
    path: "/admin/patients",
    element: <PatientsPage />,
  },
  {
    path: "/admin/appointments",
    element: <AppointmentsPage />,
  },
  {
    path: "/admin/departments",
    element: <DepartmentPage />,
  },
  {
    path: "/users",
    element: <UsersPage />,
  },
  {
    path: "/orders",
    element: <OrdersPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
];

// Export route paths as constants for easy reference
export const ROUTES = {
  LOGIN: "/",
  DASHBOARD: "/dashboards",
  PATIENTS: "/patients",
  APPOINTMENTS: "/appointments",
  ANALYTICS: "/analytics",
  USERS: "/users",
  PRODUCTS: "/products",
  ORDERS: "/orders",
  SETTINGS: "/settings",
} as const;
