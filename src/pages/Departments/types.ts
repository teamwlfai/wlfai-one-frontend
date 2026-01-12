// Department interface
export interface Department {
  id: string;
  org_id: string;
  name: string;
  description: string;
  code: string;
  is_active: boolean | "";
  created_at?: string;
  updated_at?: string;
}

// Create department payload (without id, timestamps)
export interface CreateDepartmentDto {
  org_id: string;
  name: string;
  description: string;
  code: string;
  is_active: boolean | "";
}

// Update department payload (partial)
export interface UpdateDepartmentDto extends Partial<CreateDepartmentDto> {
  id: string;
}

// API response types
export interface DepartmentResponse {
  data: Department;
  message: string;
}

export interface DepartmentsListResponse {
  departments: Department[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

// Form state
export interface DepartmentFormData {
  org_id: string;
  name: string;
  description: string;
  code: string;
  is_active: boolean | "";
}

// Form errors
export interface DepartmentFormErrors {
  org_id?: string;
  name?: string;
  description?: string;
  code?: string;
}
