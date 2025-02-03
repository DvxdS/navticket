
import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Save company details and return companyId
export const saveCompanyDetails = async (data: any) => {
  const response = await api.post("/companies", data);
  return response.data.companyId; // Backend should return the companyId
};

// Save bus type and return busTypeId
export const saveBusType = async (data: any) => {
  const response = await api.post("/bus-types", data);
  return response.data.busTypeId; // Backend should return the busTypeId
};

// Save route and return routeId
export const saveRoute = async (data: any) => {
  const response = await api.post("/routes", data);
  return response.data.routeId; // Backend should return the routeId
};

// Save schedule and return scheduleId
export const saveSchedule = async (data: any) => {
  const response = await api.post("/schedules", data);
  return response.data.scheduleId; // Backend should return the scheduleId
};

// Finalize submission
export const finalizeSubmission = async (data: any) => {
  const response = await api.post("/finalize", data);
  return response.data; // Backend should return a success message
};

export default api;