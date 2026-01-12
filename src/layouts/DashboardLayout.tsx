import type { ReactNode } from "react";
import Navbar from "../components/navigation/Navbar";
import Sidebar from "../components/navigation/Sidebar";
// import Rightbar from "../components/navigation/Rightbar";
import { useSidebar } from "../contexts/SidebarContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isExpanded } = useSidebar();

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Full-height Sidebar */}
      <Sidebar />

      {/* Main content area with margin for sidebar */}
      <div
        className={`transition-all duration-300 ${
          isExpanded ? "ml-64" : "ml-14"
        }`}
      >
        {/* Navbar - only spans content area */}
        <Navbar />

        {/* Dashboard content with rightbar */}
        <div className="flex">
          {/* Main Content Area */}
          <main className="flex-1 p-6 overflow-y-auto min-h-[calc(100vh-57px)] dark:bg-black thin-scrollbar">
            {children}
          </main>

          {/* Right Sidebar */}
          {/* <Rightbar /> */}
        </div>
      </div>
    </div>
  );
}
