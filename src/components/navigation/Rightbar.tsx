export default function Rightbar() {
  return (
    <aside className="w-80 bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 min-h-[calc(100vh-57px)] p-4">
      <div className="space-y-6">
        {/* Notifications Widget */}
        <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Notifications
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  New user registered
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  2 minutes ago
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Order completed
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  5 minutes ago
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Widget */}
        <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Quick Stats
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Total Users
              </span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                1,234
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Active Orders
              </span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                56
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Revenue
              </span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                $12.5K
              </span>
            </div>
          </div>
        </div>

        {/* Activity Widget */}
        <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Recent Activity
          </h3>
          <div className="space-y-2">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">John Doe</span> updated profile
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Jane Smith</span> placed an order
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Admin</span> created new product
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
