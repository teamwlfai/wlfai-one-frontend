import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically
apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Return response.data
apiInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

// Typed API wrapper
type ApiInstance = {
  get<T>(url: string, config?: any): Promise<T>;
  post<T>(url: string, data?: any, config?: any): Promise<T>;
  put<T>(url: string, data?: any, config?: any): Promise<T>;
  delete<T>(url: string, config?: any): Promise<T>;
};

const api = apiInstance as unknown as ApiInstance;
export default api;
