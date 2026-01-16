// import { BrowserRouter, Routes, Route } from "react-router";
// import DashboardLayout from "../layouts/DashboardLayout";
// import HomePage from "../pages/Home/HomePage";
// import PatientsPage from "../pages/Patients/PatientPage";
// import AppointmentsPage from "../pages/Appointments/AppointmentPages";
// import DepartmentPage from "../pages/Departments/index";
// import UsersPage from "../pages/Users/UsersPage";
// import OrdersPage from "../pages/Orders/OrdersPage";
// import SettingsPage from "../pages/Settings/SettingsPage";
// import LoginPage from "../pages/login";

// export function AppRouter() {
//   return (
//     <BrowserRouter>
//       <DashboardLayout>
//         <Routes>
//           <Route path="/" element={<LoginPage />} />
//           <Route path="/dashboards" element={<HomePage />} />
//           <Route path="/patients" element={<PatientsPage />} />
//           <Route path="/appointments" element={<AppointmentsPage />} />
//           <Route path="/departments" element={<DepartmentPage />} />
//           <Route path="/users" element={<UsersPage />} />
//           <Route path="/orders" element={<OrdersPage />} />
//           <Route path="/settings" element={<SettingsPage />} />
//         </Routes>
//       </DashboardLayout>
//     </BrowserRouter>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router";
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";
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
        {/* Public Routes - No DashboardLayout */}
        <Route
          path="/"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />

        {/* Protected Routes - With DashboardLayout */}
        <Route
          path="/admin/*"
          element={
            <DashboardLayout>
              <Routes>
                <Route index element={<HomePage />} />
                <Route path="dashboards" element={<HomePage />} />
                <Route path="patients" element={<PatientsPage />} />
                <Route path="appointments" element={<AppointmentsPage />} />
                <Route path="departments" element={<DepartmentPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Routes>
            </DashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
