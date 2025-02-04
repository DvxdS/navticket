import axios, { AxiosError, AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleApiCall = async <T>(apiRequest: Promise<AxiosResponse<T>>): Promise<T | null> => {
  try {
    const response = await apiRequest;
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error("API Error:", err.response?.data || err.message);
    return null;
  }
};

// Save company details
export const saveCompanyDetails = async (data: any) => handleApiCall<{ id: string }>(api.post("/companies", data));

// Save bus type
export const saveBusType = async (data: any) => handleApiCall<{ id: number }>(api.post("/bus-types", data));

// Save route
export const saveRoute = async (data: any) => handleApiCall<{ id: number }>(api.post("/routes", data));

// Save schedule
export const saveSchedule = async (data: any) => handleApiCall<{ id: number }>(api.post("/schedules", data));

// Finalize submission
export const finalizeSubmission = async (data: any) => handleApiCall(api.post("/finalize", data));

export default api;
