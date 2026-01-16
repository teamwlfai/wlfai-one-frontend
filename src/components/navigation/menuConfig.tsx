export interface MenuItem {
  path: string;
  label: string;
  icon: string;
  submenu?: MenuItem[];
}

// Define all your menu items here with submenu
export const menuItems: MenuItem[] = [
  {
    path: "/admin/dashboards",
    label: "Dashboard",
    icon: "📊",
  },
  {
    path: "/admin/patients",
    label: "Patients",
    icon: "👥",
  },
  {
    path: "/admin/appointments",
    label: "Appointments",
    icon: "📅",
  },
  {
    path: "/admin/departments",
    label: "Departments",
    icon: "🏢",
  },
  {
    path: "/orders",
    label: "Orders",
    icon: "🛒",
  },
  {
    path: "/users",
    label: "Users",
    icon: "�",
  },
  {
    path: "/settings",
    label: "Settings",
    icon: "⚙️",
    submenu: [
      {
        path: "/settings/profile",
        label: "Profile",
        icon: "👤",
      },
      {
        path: "/settings/security",
        label: "Security",
        icon: "🔒",
      },
      {
        path: "/settings/preferences",
        label: "Preferences",
        icon: "🎨",
      },
    ],
  },
  // {
  //   path: "/",
  //   label: "Dashboard",
  //   icon: "📊",
  // },
  // {
  //   path: "/patients",
  //   label: "Patients",
  //   icon: "👥",
  // },
  // {
  //   path: "/appointments",
  //   label: "Appointments",
  //   icon: "📅",
  // },
  // {
  //   path: "/analytics",
  //   label: "Analytics",
  //   icon: "📈",
  // },
  // {
  //   path: "/orders",
  //   label: "Orders",
  //   icon: "🛒",
  // },

  // {
  //   path: "/",
  //   label: "Dashboard",
  //   icon: "📊",
  // },
  // {
  //   path: "/patients",
  //   label: "Patients",
  //   icon: "👥",
  // },
  // {
  //   path: "/appointments",
  //   label: "Appointments",
  //   icon: "📅",
  // },
  // {
  //   path: "/analytics",
  //   label: "Analytics",
  //   icon: "📈",
  // },
  // {
  //   path: "/orders",
  //   label: "Orders",
  //   icon: "🛒",
  // },
];
