import api from "../../api";
import type { ApiResponse } from "../../api";
import type {
  Department,
  CreateDepartmentDto,
  DepartmentsListResponse,
  GetDepartmentsParams,
} from "./department.types";

export const departmentService = {
  getDepartments: async (
    params?: GetDepartmentsParams
  ): Promise<DepartmentsListResponse> => {
    const response = await api.get<ApiResponse<DepartmentsListResponse>>(
      "/departments/",
      { params }
    );

    return response.data;
  },

  getDepartmentById: async (id: string): Promise<Department> => {
    const response = await api.get<ApiResponse<Department>>(
      `/departments/${id}`
    );
    return response.data;
  },

  createDepartment: async (data: CreateDepartmentDto): Promise<Department> => {
    const response = await api.post<ApiResponse<Department>>(
      "/departments/",
      data
    );
    return response.data;
  },

  updateDepartment: async (
    id: string,
    data: Partial<CreateDepartmentDto>
  ): Promise<Department> => {
    const response = await api.put<ApiResponse<Department>>(
      `/departments/${id}`,
      data
    );
    return response.data;
  },

  deleteDepartment: async (id: string): Promise<void> => {
    await api.delete(`/departments/${id}`);
  },
};
