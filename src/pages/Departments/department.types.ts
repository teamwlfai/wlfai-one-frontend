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
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
  organization?: string;
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

export interface GetDepartmentsParams {
  page?: number;
  limit?: number;
  search?: string;
  code?: string;
  status?: string;
  created_from?: string;
  created_to?: string;
  org_id?: string;
  is_active?: boolean;
}

export interface DepartmentFormProps {
  department?: Department | null;
  onSuccess?: () => void;
  formSubmitRef?: React.MutableRefObject<(() => Promise<void>) | null>;
  formResetRef?: React.MutableRefObject<(() => void) | null>;
}
