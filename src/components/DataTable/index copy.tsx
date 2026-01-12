// components/DataTable/DataTable.tsx
import React, { useState } from "react";
import type { DataTableProps, ColumnWidths } from "./type";

function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  loading = false,
  emptyMessage = "No data available",
  onRowClick,
  actions,
  columnWidths: externalColumnWidths,
  onColumnResize,
  resizable = true,
  className = "",
}: DataTableProps<T>): JSX.Element {
  const [columnWidths, setColumnWidths] = useState<ColumnWidths>(() => {
    if (externalColumnWidths) return externalColumnWidths;

    const widths: ColumnWidths = {};
    columns.forEach((col) => {
      widths[col.key] = col.width || 150;
    });
    return widths;
  });

  const [resizingColumn, setResizingColumn] = useState<string | null>(null);

  const handleResize = (
    columnKey: string,
    startX: number,
    startWidth: number
  ): void => {
    const handleMouseMove = (e: MouseEvent): void => {
      const diff = e.clientX - startX;
      const newWidth = Math.max(80, startWidth + diff);
      const newWidths = { ...columnWidths, [columnKey]: newWidth };
      setColumnWidths(newWidths);

      if (onColumnResize) {
        onColumnResize(newWidths);
      }
    };

    const handleMouseUp = (): void => {
      setResizingColumn(null);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    setResizingColumn(columnKey);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const renderCell = (column: any, row: T): React.ReactNode => {
    if (column.render) {
      return column.render(row, actions);
    }

    const value = (row as any)[column.key];

    if (value === null || value === undefined) {
      return <span className="text-gray-400">—</span>;
    }

    return (
      <span className={column.className || "text-gray-700 text-sm"}>
        {String(value)}
      </span>
    );
  };

  if (loading) {
    return (
      <div
        className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}
      >
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <svg
              className="animate-spin h-8 w-8 text-gray-400"
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
            <span className="text-sm text-gray-500">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}
      >
        <div className="overflow-x-auto">
          <table
            className="w-full border-collapse"
            style={{ minWidth: "1200px" }}
          >
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    style={{ width: `${columnWidths[column.key]}px` }}
                    className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-700 uppercase relative"
                  >
                    {column.header}
                    {resizable && column.resizable !== false && (
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-gray-300 active:bg-gray-400"
                        onMouseDown={(e: React.MouseEvent) =>
                          handleResize(
                            column.key,
                            e.clientX,
                            columnWidths[column.key]
                          )
                        }
                      />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr
                    key={row.id || index}
                    onClick={() => onRowClick?.(row)}
                    className={`hover:bg-gray-50 transition-colors ${
                      onRowClick ? "cursor-pointer" : ""
                    }`}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        style={{ width: `${columnWidths[column.key]}px` }}
                        className="px-6 py-4"
                      >
                        {renderCell(column, row)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        * {
          user-select: ${resizingColumn ? "none" : "auto"};
        }
      `}</style>
    </>
  );
}

export default DataTable;
