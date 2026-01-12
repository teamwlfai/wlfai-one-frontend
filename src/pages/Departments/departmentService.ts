import api from "../../api/index";
import type {
  Department,
  CreateDepartmentDto,
  DepartmentsListResponse,
} from "./types";

interface GetDepartmentsParams {
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

export const departmentService = {
  getDepartments: async (
    params?: GetDepartmentsParams
  ): Promise<DepartmentsListResponse> => {
    const response = await api.get<DepartmentsListResponse>("/departments/", {
      params,
    });
    return response.data;
  },

  getDepartmentById: async (id: string): Promise<Department> => {
    const response = await api.get<Department>(`/departments/${id}`);
    return response.data;
  },

  createDepartment: async (data: CreateDepartmentDto): Promise<Department> => {
    const response = await api.post<Department>("/departments/", data);
    return response.data;
  },

  updateDepartment: async (
    id: string,
    data: Partial<CreateDepartmentDto>
  ): Promise<Department> => {
    const response = await api.put<Department>(`/departments/${id}`, data);
    return response.data;
  },

  deleteDepartment: async (id: string): Promise<void> => {
    await api.delete(`/departments/${id}`);
  },
};
