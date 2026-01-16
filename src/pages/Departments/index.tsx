import React, { useState, useRef } from "react";
import { Plus } from "lucide-react";

import {
  useDepartments,
  useDeleteDepartment,
  useUpdateDepartment,
} from "./useDepartments";
import type { Department } from "./department.types";
import DepartmentForm from "./DepartmentForm";

import DataTable from "../../components/DataTable";
import Filter from "../../components/DataTable/Filter";
import Pagination from "../../components/DataTable/Pagination";
import Drawer from "../../components/Drawer";

import type {
  Column,
  FilterConfig,
  FilterValues,
  TableActions,
} from "../../components/DataTable/type";

const DepartmentList: React.FC = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter state
  const [filters, setFilters] = useState<FilterValues>({
    search: "",
    status: "",
    code: "",
    created_from: "",
    created_to: "",
  });

  // Applied filters (sent to API after search button click)
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({});

  // Drawer state
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Ref to access form submit function
  const formSubmitRef = useRef<(() => Promise<void>) | null>(null);
  const formResetRef = useRef<(() => void) | null>(null);

  // Build API query params
  const apiParams = {
    page: currentPage,
    limit: itemsPerPage,
    ...appliedFilters,
  };

  // React Query hooks
  const { data, isLoading, isError, error } = useDepartments(apiParams);
  const deleteDepartment = useDeleteDepartment();
  const updateDepartment = useUpdateDepartment();

  const departments = data?.departments ?? [];
  const total = data?.total ?? 0;

  // Format date helper
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Column configuration
  const columns: Column<Department>[] = [
    {
      key: "name",
      header: "NAME",
      width: 180,
      render: (row) => <span>{row.name}</span>,
    },
    {
      key: "code",
      header: "CODE",
      width: 120,
      render: (row) => <span>{row.code}</span>,
    },
    {
      key: "description",
      header: "DESCRIPTION",
      width: 350,
      render: (row) => <span>{row.description}</span>,
    },
    {
      key: "is_active",
      header: "STATUS",
      width: 100,
      render: (row, actions) => (
        <button
          onClick={() => actions?.onToggle?.(row)}
          disabled={updateDepartment.isPending}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
            row.is_active
              ? "bg-black dark:bg-green-900"
              : "bg-gray-300 dark:bg-green-200"
          }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
              row.is_active ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      ),
    },
    {
      key: "created_at",
      header: "CREATED",
      width: 160,
      render: (row) => (
        <span>{row.created_at ? formatDate(row.created_at) : "—"}</span>
      ),
    },
    {
      key: "updated_at",
      header: "UPDATED",
      width: 160,
      render: (row) => (
        <span>{row.updated_at ? formatDate(row.updated_at) : "—"}</span>
      ),
    },
    {
      key: "actions",
      header: "ACTIONS",
      width: 120,
      resizable: false,
      render: (row, actions) => (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => actions?.onEdit?.(row)}
            disabled={updateDepartment.isPending}
            className="p-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Edit"
          >
            <svg
              className="w-4 h-4 text-gray-700 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => actions?.onDelete?.(row)}
            disabled={deleteDepartment.isPending}
            className="p-2 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete"
          >
            <svg
              className="w-4 h-4 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  // Filter configuration
  const filterConfig: FilterConfig[] = [
    {
      key: "search",
      label: "Search",
      type: "text",
      placeholder: "Search by name or description...",
    },
    {
      key: "code",
      label: "Code",
      type: "text",
      placeholder: "Search by code...",
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      defaultValue: "",
      options: [
        { label: "All", value: "" },
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
    {
      key: "created",
      label: "Created Date",
      type: "dateRange",
    },
  ];

  // Table actions
  const tableActions: TableActions<Department> = {
    onEdit: (row) => {
      setEditingDepartment(row);
      setIsDrawerOpen(true);
    },
    onDelete: async (row) => {
      if (window.confirm(`Are you sure you want to delete "${row.name}"?`)) {
        try {
          await deleteDepartment.mutateAsync(row.id);
        } catch (error) {
          console.error("Delete error:", error);
          alert("Failed to delete department");
        }
      }
    },
    onToggle: async (row) => {
      try {
        await updateDepartment.mutateAsync({
          id: row.id,
          data: {
            is_active: !row.is_active,
          },
        });
      } catch (error) {
        console.error("Toggle error:", error);
        alert("Failed to update department status");
      }
    },
  };

  // Handle search button click
  const handleSearch = (): void => {
    setAppliedFilters({ ...filters });
    setCurrentPage(1);
  };

  // Handle clear filters
  const handleClear = (): void => {
    const clearedFilters = {
      search: "",
      status: "",
      code: "",
      created_from: "",
      created_to: "",
    };
    setFilters(clearedFilters);
    setAppliedFilters({});
    setCurrentPage(1);
  };

  // Handle drawer close
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setEditingDepartment(null);
  };
  const handleResetDrawer = () => {
    if (formResetRef.current) {
      formResetRef.current();
    }
  };
  // Handle form success
  const handleFormSuccess = () => {
    handleCloseDrawer();
  };

  // Handle drawer submit (called by Drawer's submit button)
  const handleDrawerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🔵 Drawer submit triggered");

    // Call the form's submit function
    if (formSubmitRef.current) {
      console.log("🔵 Calling form submit function");
      await formSubmitRef.current();
    } else {
      console.error("❌ Form submit ref not set");
    }
  };

  // Error state
  if (isError) {
    return (
      <div className="p-6 border-2 border-red-500 bg-red-50 rounded-lg">
        <p className="text-red-700 font-semibold">
          Error loading departments: {error?.message || "Unknown error"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-end">
        <button
          onClick={() => {
            setEditingDepartment(null);
            setIsDrawerOpen(true);
          }}
          className="flex items-center gap-2 p-2.5 bg-black dark:bg-white hover:bg-gray-900 
          dark:hover:bg-gray-300
             text-white dark:text-black font-semibold rounded-lg transition-all duration-200 
             shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5 text-white dark:text-black" />
          {/* Department */}
        </button>
      </div>

      {/* Filters */}
      <Filter
        filterConfig={filterConfig}
        filters={filters}
        onFilterChange={setFilters}
        onSearch={handleSearch}
        onClear={handleClear}
        loading={isLoading}
      />

      {/* Results Info */}
      <div className="text-sm text-gray-600">
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            Showing{" "}
            {departments.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
            {Math.min(currentPage * itemsPerPage, total)} of {total} departments
          </>
        )}
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={departments}
        loading={isLoading}
        emptyMessage="No departments found. Try adjusting your filters or add a new department."
        actions={tableActions}
      />

      {/* Pagination */}
      {!isLoading && total > 0 && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={total}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(size) => {
            setItemsPerPage(size);
            setCurrentPage(1);
          }}
          pageSizeOptions={[5, 10, 20, 50, 100]}
        />
      )}

      {/* Drawer - NOW WITH onSubmit and hideActions removed */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        onReset={handleResetDrawer}
        title={editingDepartment ? "Edit Department" : "Add Department"}
        // width="400px"
        onSubmit={handleDrawerSubmit}
        submitLabel={editingDepartment ? "Update" : "Save"}
        // hideActions removed - now using Drawer's buttons!
      >
        <DepartmentForm
          department={editingDepartment}
          onSuccess={handleFormSuccess}
          // onCancel={handleCloseDrawer}
          formSubmitRef={formSubmitRef}
          formResetRef={formResetRef}
        />
      </Drawer>
    </div>
  );
};

export default DepartmentList;
