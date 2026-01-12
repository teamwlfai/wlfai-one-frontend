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
}: DataTableProps<T>) {
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
      onColumnResize?.(newWidths);
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
    if (column.render) return column.render(row, actions);

    const value = (row as any)[column.key];

    if (value === null || value === undefined) {
      return <span className="text-gray-400">—</span>;
    }

    return (
      <span className="text-gray-800 dark:text-gray-100 text-sm">
        {String(value)}
      </span>
    );
  };

  if (loading) {
    return (
      <div
        className={`rounded-lg border border-gray-200 dark:border-[#333333] 
        bg-white dark:bg-[#1d1d1d] ${className}`}
      >
        <div className="flex items-center justify-center py-12">
          <span className="text-gray-500 dark:text-gray-200">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`rounded-lg border border-gray-200 dark:border-[#333333] 
        bg-white dark:bg-[#1d1d1d] overflow-hidden ${className}`}
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-300">
            {/* HEADER */}
            <thead>
              <tr className="bg-gray-50 dark:bg-[#2c2c2c] border-b border-gray-200 dark:border-[#333333]">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    style={{ width: `${columnWidths[column.key]}px` }}
                    className="px-6 py-4 text-left text-xs font-bold uppercase 
                    tracking-wider text-gray-700 dark:text-gray-300 relative"
                  >
                    {column.header}
                    {resizable && column.resizable !== false && (
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 
                        cursor-col-resize 
                        hover:bg-gray-300 dark:hover:bg-[#444444]"
                        onMouseDown={(e) =>
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

            {/* BODY */}
            <tbody className="divide-y divide-gray-100 dark:divide-[#333333]">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr
                    key={row.id || index}
                    onClick={() => onRowClick?.(row)}
                    className={`transition-colors text-gray-800 text-sm dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2c2c2c] ${
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

      {/* Disable text selection while resizing */}
      <style>{`
        * {
          user-select: ${resizingColumn ? "none" : "auto"};
        }
      `}</style>
    </>
  );
}

export default DataTable;
