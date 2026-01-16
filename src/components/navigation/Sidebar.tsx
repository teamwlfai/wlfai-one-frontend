import { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";

import { menuItems } from "./menuConfig";
import type { MenuItem } from "./menuConfig";
import { useSidebar } from "../../contexts/SidebarContext";

import { LogOut } from "lucide-react";
import { useLogout, getCurrentUser } from "../../pages/login/useLogin";

export default function Sidebar() {
  const { isExpanded, toggleSidebar } = useSidebar();
  const location = useLocation();

  const logoutMutation = useLogout();
  const user = getCurrentUser();

  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [flyoutPosition, setFlyoutPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);
  const menuItemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const isSubmenuActive = (submenu: MenuItem[]) =>
    submenu.some(
      (item) =>
        location.pathname === item.path ||
        location.pathname.startsWith(item.path + "/")
    );

  const toggleSubmenu = (path: string) => {
    if (!isExpanded) return;
    setExpandedMenus((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  const updateFlyoutPosition = (path: string) => {
    const element = menuItemRefs.current[path];
    if (element) {
      const rect = element.getBoundingClientRect();
      setFlyoutPosition({
        top: rect.top,
        left: rect.right + 8, // 8px gap (ml-2)
      });
    }
  };

  const handleMouseEnter = (path: string) => {
    // Clear any pending hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setHoveredItem(path);

    // Update flyout position for collapsed sidebar
    if (!isExpanded) {
      updateFlyoutPosition(path);
    }
  };

  const handleMouseLeave = () => {
    // Delay hiding to allow mouse to reach flyout
    hideTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
      setFlyoutPosition(null);
    }, 150);
  };

  // Update flyout position on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (hoveredItem && !isExpanded) {
        updateFlyoutPosition(hoveredItem);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [hoveredItem, isExpanded]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const renderMenuItem = (item: MenuItem) => {
    const hasSubmenu = !!item.submenu?.length;
    const isMenuExpanded = expandedMenus.includes(item.path);
    const itemIsActive = isActive(item.path);
    const submenuIsActive = hasSubmenu && isSubmenuActive(item.submenu!);
    const isHovering = hoveredItem === item.path;

    return (
      <div key={item.path} className="relative">
        {/* MAIN ITEM */}
        <div
          ref={(el) => {
            menuItemRefs.current[item.path] = el;
          }}
          onMouseEnter={() => handleMouseEnter(item.path)}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          {hasSubmenu && isExpanded ? (
            <button
              onClick={() => toggleSubmenu(item.path)}
              className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all text-sm text-black ${
                itemIsActive || submenuIsActive
                  ? "bg-blue-50 dark:bg-[#2c2c2c] text-blue-600 dark:text-gray-200"
                  : "text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2c2c2c]"
              }`}
            >
              <span className="text-md">{item.icon}</span>
              <span className="ml-3 flex-1 text-left">{item.label}</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  isMenuExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          ) : (
            <Link
              to={hasSubmenu && !isExpanded ? "#" : item.path}
              onClick={(e) => hasSubmenu && !isExpanded && e.preventDefault()}
              className={`flex items-center px-3 py-2.5 rounded-lg transition-all text-sm text-black ${
                itemIsActive || submenuIsActive
                  ? "bg-gray-200 dark:bg-[#2c2c2c] text-gray-600 dark:text-gray-200"
                  : "text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2c2c2c]"
              } ${!isExpanded && "justify-center"}`}
            >
              <span className="text-sm">{item.icon}</span>
              {isExpanded && <span className="ml-3">{item.label}</span>}
            </Link>
          )}
        </div>

        {/* EXPANDED SUBMENU */}
        {hasSubmenu && isExpanded && isMenuExpanded && (
          <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 dark:border-[#1d1d1d] pl-3">
            {item.submenu!.map((subitem) => (
              <Link
                key={subitem.path}
                to={subitem.path}
                className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive(subitem.path)
                    ? "bg-blue-50 dark:bg-[#2c2c2c] text-blue-600 dark:text-gray-200"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2c2c2c]"
                }`}
              >
                <span className="text-sm mr-3">{subitem.icon}</span>
                <span className="text-sm text-black">{subitem.label}</span>
              </Link>
            ))}
          </div>
        )}

        {/* COLLAPSED FLYOUT - FIXED POSITIONING */}
        {!isExpanded && isHovering && flyoutPosition && (
          <div
            onMouseEnter={() => handleMouseEnter(item.path)}
            onMouseLeave={handleMouseLeave}
          >
            {!hasSubmenu ? (
              // Simple tooltip
              <div
                className="fixed px-3 py-2 bg-gray-100 dark:bg-[#333333] dark:text-gray-400 text-gray-900 text-sm rounded-lg whitespace-nowrap z-60 shadow-lg"
                style={{
                  top: `${
                    flyoutPosition.top +
                    (menuItemRefs.current[item.path]?.offsetHeight || 0) / 2
                  }px`,
                  left: `${flyoutPosition.left}px`,
                  transform: "translateY(-50%)",
                }}
              >
                {item.label}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-gray-[#2c2c2c]"></div>
              </div>
            ) : (
              // Flyout with submenu
              <div
                className="fixed z-60"
                style={{
                  top: `${flyoutPosition.top}px`,
                  left: `${flyoutPosition.left}px`,
                }}
              >
                {/* Flyout panel */}
                <div className="bg-white dark:bg-[#1d1d1d] border border-gray-200 dark:border-[#2c2c2c] rounded-lg shadow-xl py-2 min-w-55">
                  {/* Header */}
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-[#2c2c2c]">
                    <div className="text-gray-900 dark:text-white flex items-center text-sm">
                      <span className="mr-2 text-base">{item.icon}</span>
                      {item.label}
                    </div>
                  </div>

                  {/* Submenu items */}
                  <div className="py-1">
                    {item.submenu!.map((subitem) => (
                      <Link
                        key={subitem.path}
                        to={subitem.path}
                        className={`flex items-center px-4 py-2.5 transition-colors ${
                          isActive(subitem.path)
                            ? "bg-blue-50 dark:bg-[#2c2c2c] text-blue-600 dark:text-gray-200"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2c2c2c]"
                        }`}
                      >
                        <span className="text-sm mr-3">{subitem.icon}</span>
                        <span className="text-sm font-medium">
                          {subitem.label}
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className="absolute right-full top-4 border-[6px] border-transparent border-r-white dark:border-r-[#2c2c2c]" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={`bg-gray-50 dark:bg-black border-r border-gray-200 dark:border-gray-700 h-screen transition-all duration-300 ease-in-out fixed left-0 top-0 z-40 ${
        isExpanded ? "w-64" : "w-14"
      }`}
    >
      <div className="p-4 h-full flex flex-col">
        {/* Logo & Toggle Section */}
        <div className="mb-6 flex items-center justify-between">
          {isExpanded && (
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                WLFAI
              </span>
            </Link>
          )}

          <button
            onClick={toggleSidebar}
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
            className="cursor-pointer"
          >
            {isExpanded ? (
              <PanelLeftClose className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <PanelLeftOpen className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>

        {/* Menu Items - HIDDEN SCROLLBAR + WORKING HOVER */}
        <nav
          ref={scrollContainerRef}
          className="space-y-1 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {menuItems.map((item) => renderMenuItem(item))}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          {user && (
            <div className="px-2 flex justify-center">
              {/* COLLAPSED SIDEBAR → ICON ONLY */}
              {!isExpanded && (
                <button
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isPending}
                  title="Logout"
                  className="flex items-center justify-center w-10 h-10 rounded-lg
            text-red-600 dark:text-red-400
            hover:bg-red-50 dark:hover:bg-secondary
            transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              )}

              {/* EXPANDED SIDEBAR → ICON + TEXT */}
              {isExpanded && (
                <button
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isPending}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm
            text-red-600 dark:text-red-400
            hover:bg-red-50 dark:hover:bg-secondary
            transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
