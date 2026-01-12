import type { RouteObject } from "react-router";

import HomePage from "../pages/Home/HomePage";
import PatientsPage from "../pages/Patients/PatientPage";
import AppointmentsPage from "../pages/Appointments/AppointmentPages";
import DepartmentPage from "../pages/Departments/DepartmentPage";

import UsersPage from "../pages/Users/UsersPage";
import OrdersPage from "../pages/Orders/OrdersPage";
import SettingsPage from "../pages/Settings/SettingsPage";

// Define all your dashboard routes here
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/patients",
    element: <PatientsPage />,
  },
  {
    path: "/appointments",
    element: <AppointmentsPage />,
  },
  {
    path: "/departments",
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
  HOME: "/",
  PATIENTS: "/patients",
  APPOINTMENTS: "/appointments",
  ANALYTICS: "/analytics",
  USERS: "/users",
  PRODUCTS: "/products",
  ORDERS: "/orders",
  SETTINGS: "/settings",
} as const;
