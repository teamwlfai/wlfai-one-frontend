// types/table.types.ts

/**
 * Generic column configuration for DataTable
 */
export interface Column<T> {
  key: string;
  header: string;
  width?: number;
  resizable?: boolean;
  sortable?: boolean;
  render?: (row: T, actions?: TableActions<T>) => React.ReactNode;
  className?: string;
}

/**
 * Table actions that can be passed to custom renderers
 */
export interface TableActions<T> {
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onView?: (row: T) => void;
  onToggle?: (row: T) => void;
  [key: string]: ((row: T) => void) | undefined;
}

/**
 * Column widths state
 */
export interface ColumnWidths {
  [key: string]: number;
}

/**
 * Generic filter configuration
 */
export interface FilterConfig {
  key: string;
  label: string;
  type:
    | "text"
    | "select"
    | "date"
    | "number"
    | "checkbox"
    | "dateRange"
    | "multiselect";
  placeholder?: string;
  options?: SelectOption[];
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: any;
}

/**
 * Select option interface
 */
export interface SelectOption {
  label: string;
  value: string | number;
}

/**
 * Filter values state (generic)
 */
export interface FilterValues {
  [key: string]: any;
}

/**
 * Pagination configuration
 */
export interface PaginationConfig {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (size: number) => void;
  pageSizeOptions?: number[];
}

/**
 * Sort configuration
 */
export interface SortConfig {
  key: string;
  direction: "asc" | "desc" | null;
}

/**
 * API response for paginated data
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Table props
 */
export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  actions?: TableActions<T>;
  columnWidths?: ColumnWidths;
  onColumnResize?: (widths: ColumnWidths) => void;
  resizable?: boolean;
  className?: string;
}

/**
 * Filter props
 */
export interface FilterProps {
  filterConfig: FilterConfig[];
  filters: FilterValues;
  onFilterChange: (filters: FilterValues) => void;
  onSearch: () => void;
  onClear?: () => void;
  loading?: boolean;
  showSearchButton?: boolean;
  showClearButton?: boolean;
}
