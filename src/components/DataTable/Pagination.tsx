import React from "react";
import type { PaginationConfig } from "./type";

const Pagination: React.FC<PaginationConfig> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
  pageSizeOptions = [5, 10, 20, 50, 100],
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  const goToPage = (page: number): void => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    if (validPage !== currentPage) {
      onPageChange(validPage);
    }
  };

  const getPageNumbers = (): number[] => {
    const pages: number[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      for (let i = 1; i <= maxPagesToShow; i++) pages.push(i);
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++)
        pages.push(i);
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
    }

    return pages;
  };

  if (totalItems === 0) return null;

  return (
    <div
      className="
        px-6 py-4 border-t border-gray-200 dark:border-[#333333]
        flex flex-col md:flex-row items-center justify-between gap-4
        bg-gray-50 dark:bg-[#1d1d1d]
      "
    >
      {/* Rows per page */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Rows per page:
        </span>

        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="
            px-3 py-1 text-sm rounded border
            border-gray-300 dark:border-[#333333]
            bg-white dark:bg-[#2c2c2c]
            text-gray-800 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
          "
        >
          {pageSizeOptions.map((option) => (
            <option
              key={option}
              value={option}
              className="bg-white dark:bg-[#2c2c2c]"
            >
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Page info + navigation */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {startIndex}-{endIndex} of {totalItems}
        </span>

        <div className="flex gap-1 ml-4">
          {/* First */}
          <button
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className="
              p-2 rounded
              hover:bg-gray-200 dark:hover:bg-[#2c2c2c]
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-colors
              text-gray-700 dark:text-gray-200
            "
            title="First page"
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
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Prev */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="
              p-2 rounded
              hover:bg-gray-200 dark:hover:bg-[#2c2c2c]
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-colors
              text-gray-700 dark:text-gray-200
            "
            title="Previous page"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`
                  px-3 py-1 rounded text-sm font-medium transition-colors
                  ${
                    currentPage === pageNum
                      ? "bg-black dark:bg-white text-white dark:text-black"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2c2c2c]"
                  }
                `}
              >
                {pageNum}
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="
              p-2 rounded
              hover:bg-gray-200 dark:hover:bg-[#2c2c2c]
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-colors
              text-gray-700 dark:text-gray-200
            "
            title="Next page"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Last */}
          <button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            className="
              p-2 rounded
              hover:bg-gray-200 dark:hover:bg-[#2c2c2c]
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-colors
              text-gray-700 dark:text-gray-200
            "
            title="Last page"
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
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
