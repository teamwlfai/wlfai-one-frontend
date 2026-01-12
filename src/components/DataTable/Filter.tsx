import React from "react";
import type { FilterProps, FilterConfig, FilterValues } from "./type";
import { Search } from "lucide-react";

const Filter: React.FC<FilterProps> = ({
  filterConfig,
  filters,
  onFilterChange,
  onSearch,
  onClear,
  loading = false,
  showSearchButton = true,
  showClearButton = true,
}) => {
  const handleInputChange = (key: string, value: any): void => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleClear = (): void => {
    const clearedFilters: FilterValues = {};
    filterConfig.forEach((config) => {
      clearedFilters[config.key] = config.defaultValue || "";
    });

    if (onClear) onClear();
    else onFilterChange(clearedFilters);
  };

  const hasActiveFilters = (): boolean => {
    return Object.entries(filters).some(([_, value]) => {
      if (typeof value === "boolean") return value;
      if (Array.isArray(value)) return value.length > 0;
      return value && value !== "";
    });
  };

  const baseInputClass = `
    w-full px-3 py-2 rounded-lg text-sm
    border border-gray-300 dark:border-[#333333]
    bg-white dark:bg-[#2c2c2c]
    text-gray-800 dark:text-white
    focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
    disabled:opacity-60 disabled:cursor-not-allowed
  `;

  const labelClass =
    "block text-xs font-semibold text-gray-700 dark:text-gray-400 mb-1.5";

  const renderFilterInput = (config: FilterConfig): JSX.Element | null => {
    const value = filters[config.key] ?? config.defaultValue ?? "";

    switch (config.type) {
      case "text":
        return (
          <div key={config.key} className="flex-1 min-w-[200px]">
            <label className={labelClass}>{config.label}</label>
            <input
              type="text"
              value={value}
              placeholder={config.placeholder}
              onChange={(e) => handleInputChange(config.key, e.target.value)}
              disabled={loading}
              className={baseInputClass}
            />
          </div>
        );

      case "select":
        return (
          <div key={config.key} className="flex-1 min-w-[200px]">
            <label className={labelClass}>{config.label}</label>
            <select
              value={value}
              onChange={(e) => handleInputChange(config.key, e.target.value)}
              disabled={loading}
              className={baseInputClass}
            >
              {config.options?.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="bg-white dark:bg-[#2c2c2c]"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      case "date":
        return (
          <div key={config.key} className="flex-1 min-w-45">
            <label className={labelClass}>{config.label}</label>
            <input
              type="date"
              value={value}
              onChange={(e) => handleInputChange(config.key, e.target.value)}
              disabled={loading}
              className={baseInputClass}
            />
          </div>
        );

      case "dateRange":
        return (
          <div key={config.key} className="flex items-end gap-2">
            <div className="flex-1 min-w-37.5">
              <label className={labelClass}>{config.label} From</label>
              <input
                type="date"
                value={filters[`${config.key}_from`] || ""}
                onChange={(e) =>
                  handleInputChange(`${config.key}_from`, e.target.value)
                }
                disabled={loading}
                className={baseInputClass}
              />
            </div>
            <div className="flex-1 min-w-37.5">
              <label className={labelClass}>To</label>
              <input
                type="date"
                value={filters[`${config.key}_to`] || ""}
                onChange={(e) =>
                  handleInputChange(`${config.key}_to`, e.target.value)
                }
                disabled={loading}
                className={baseInputClass}
              />
            </div>
          </div>
        );

      case "number":
        return (
          <div key={config.key} className="flex-1 min-w-45">
            <label className={labelClass}>{config.label}</label>
            <input
              type="number"
              value={value}
              min={config.min}
              max={config.max}
              step={config.step}
              placeholder={config.placeholder}
              onChange={(e) => handleInputChange(config.key, e.target.value)}
              disabled={loading}
              className={baseInputClass}
            />
          </div>
        );

      case "checkbox":
        return (
          <div key={config.key} className="flex items-center pt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!value}
                onChange={(e) =>
                  handleInputChange(config.key, e.target.checked)
                }
                disabled={loading}
                className="w-4 h-4 accent-black dark:accent-white"
              />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {config.label}
              </span>
            </label>
          </div>
        );

      case "multiselect":
        return (
          <div key={config.key} className="flex-1 min-w-50">
            <label className={labelClass}>{config.label}</label>
            <select
              multiple
              value={Array.isArray(value) ? value : []}
              onChange={(e) => {
                const selected = Array.from(
                  e.target.selectedOptions,
                  (o) => o.value
                );
                handleInputChange(config.key, selected);
              }}
              disabled={loading}
              className={baseInputClass}
              size={4}
            >
              {config.options?.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="bg-white dark:bg-[#2c2c2c]"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  if (!filterConfig || filterConfig.length === 0) return null;

  return (
    <div
      className="
        bg-white dark:bg-[#1d1d1d]
        p-6 rounded-lg
        border border-gray-200 dark:border-[#333333]
        shadow-sm mb-6
      "
    >
      <div className="flex flex-wrap gap-4 mb-4">
        {filterConfig.map((config) => renderFilterInput(config))}
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-[#333333]">
        {showSearchButton && (
          <button
            onClick={onSearch}
            disabled={loading}
            className="
      flex items-center gap-2
      px-6 py-2.5 rounded-lg
      bg-black dark:bg-[#2c2c2c] hover:bg-gray-900 dark:hover:bg-[#333333]
      text-white
      transition-colors
      disabled:opacity-50 disabled:cursor-not-allowed
    "
          >
            {/* <Search className="w-4 h-4 text-white dark:text-black" /> */}
            <span>Search</span>
          </button>
        )}

        {showClearButton && hasActiveFilters() && (
          <button
            onClick={handleClear}
            disabled={loading}
            className="
              px-6 py-2.5 rounded-lg font-semibold
              border border-gray-300 dark:border-[#2c2c2c]
              text-gray-700 dark:bg-[#1d1d1d] dark:text-gray-300
              hover:bg-gray-50 dark:hover:bg-[#2c2c2c]
              transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default Filter;
