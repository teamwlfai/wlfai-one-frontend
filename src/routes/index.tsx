import { BrowserRouter, Routes, Route } from "react-router";
import DashboardLayout from "../layouts/DashboardLayout";
import HomePage from "../pages/Home/HomePage";
import PatientsPage from "../pages/Patients/PatientPage";
import AppointmentsPage from "../pages/Appointments/AppointmentPages";
import DepartmentPage from "../pages/Departments/index";
import UsersPage from "../pages/Users/UsersPage";
import OrdersPage from "../pages/Orders/OrdersPage";
import SettingsPage from "../pages/Settings/SettingsPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/departments" element={<DepartmentPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
