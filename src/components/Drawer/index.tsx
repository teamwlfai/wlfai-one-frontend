import React from "react";
import type { DrawerProps } from "./type";

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  onReset,
  title,
  children,
  onSubmit,
  submitLabel = "Submit",
  resetLabel = "Reset",
  cancelLabel = "Cancel",
  loading = false,
  width = "400px",
  hideActions = false,
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (onSubmit && !loading) onSubmit(e);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

      {/* Drawer */}
      <div
        className="
          fixed inset-y-0 right-0 z-50
          bg-white dark:bg-[#1d1d1d]
          shadow-2xl
        "
        style={{ width: `min(${width}, 100vw)` }}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div
            className="
              px-6 py-4 flex items-center justify-between
              border-b border-gray-200 dark:border-[#333333]
              bg-white dark:bg-[#1d1d1d]
            "
          >
            <h2 className="text-xl font-bold text-black dark:text-white">
              {title}
            </h2>

            <button
              onClick={onClose}
              disabled={loading}
              className="
                p-2 rounded transition-colors
                hover:bg-gray-100 dark:hover:bg-[#2c2c2c]
                text-gray-700 dark:text-gray-300
                disabled:opacity-50
              "
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content + Form */}
          <div className="overflow-y-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {children}

              {/* Actions */}
              {!hideActions && (
                <div
                  className="
                    pt-6 flex flex-col sm:flex-row gap-3
                    border-t border-gray-200 dark:border-[#333333]
                  "
                >
                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      flex-1 px-4 py-2 font-semibold rounded-lg
                      bg-black dark:bg-white
                      text-white dark:text-black
                      hover:bg-gray-900 dark:hover:bg-gray-100
                      transition-colors
                      disabled:opacity-50
                      flex items-center justify-center
                    "
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4"
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
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Loading...
                      </>
                    ) : (
                      submitLabel
                    )}
                  </button>

                  {/* Reset */}
                  {/* <button
                    type="button"
                    onClick={onReset}
                    disabled={loading}
                    className="
                      flex-1 px-4 py-2 font-semibold rounded-lg
                      border border-gray-300 dark:border-[#333333]
                      text-gray-700 dark:text-gray-300
                      hover:bg-gray-50 dark:hover:bg-[#2c2c2c]
                      transition-colors
                      disabled:opacity-50
                    "
                  >
                    {resetLabel}
                  </button> */}

                  {/* Cancel (optional) */}

                  <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="
                      flex-1 px-4 py-2 font-semibold rounded-lg
                      border border-gray-300 dark:border-[#333333]
                      text-gray-700 dark:text-gray-300
                      hover:bg-gray-50 dark:hover:bg-[#2c2c2c]
                      transition-colors
                      disabled:opacity-50
                    "
                  >
                    {cancelLabel}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Drawer;
