import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { departmentService } from "./departmentService";
import type {
  Department,
  CreateDepartmentDto,
  DepartmentsListResponse,
} from "./department.types";

// Query Keys
export const departmentKeys = {
  all: ["departments"] as const,
  lists: () => [...departmentKeys.all, "list"] as const,
  list: (filters?: any) => [...departmentKeys.lists(), { filters }] as const,
  details: () => [...departmentKeys.all, "detail"] as const,
  detail: (id: string) => [...departmentKeys.details(), id] as const,
};

// Get all departments with filters
export const useDepartments = (params?: any) => {
  return useQuery<DepartmentsListResponse, AxiosError>({
    queryKey: departmentKeys.list(params),
    queryFn: () => departmentService.getDepartments(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get single department by ID
export const useDepartment = (id: string) => {
  return useQuery<Department, AxiosError>({
    queryKey: departmentKeys.detail(id),
    queryFn: () => departmentService.getDepartmentById(id),
    enabled: !!id,
  });
};

// Create department
export const useCreateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation<Department, AxiosError, CreateDepartmentDto>({
    mutationFn: (data: CreateDepartmentDto) => {
      return departmentService.createDepartment(data);
    },
    onSuccess: (newDepartment) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() });

      // Optionally set the new department in cache
      queryClient.setQueryData<Department>(
        departmentKeys.detail(newDepartment.id),
        newDepartment
      );
    },
  });
};

// Update department
interface UpdateDepartmentVariables {
  id: string;
  data: Partial<CreateDepartmentDto>;
}

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation<Department, AxiosError, UpdateDepartmentVariables>({
    mutationFn: ({ id, data }: UpdateDepartmentVariables) => {
      return departmentService.updateDepartment(id, data);
    },
    onSuccess: (_, variables) => {
      // Invalidate specific department and lists
      queryClient.invalidateQueries({
        queryKey: departmentKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() });
    },
  });
};

// Delete department
export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, string>({
    mutationFn: (id: string) => {
      return departmentService.deleteDepartment(id);
    },
    onSuccess: (_, deletedId) => {
      // Remove from cache and invalidate lists
      queryClient.removeQueries({ queryKey: departmentKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() });
    },
  });
};
