import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface CompanyDetails {
  plan: string; // Make sure it's always required
  name?: string;
  location?: string;
  numberOfBusesVip?: number;
  numberOfBusesStandard?: number;
  OfficialDocs?: string[];
  [key: string]: any;
}

interface RouteDetails {
  id: string; // Add ID to route
  origin: string;
  destination: string;
  routeCode: string,
  distance: number;
  priceVIP: number;
  priceStandard: number;
}

interface ScheduleDetails {
  routeId: string;
  busTypeId: string;
  departureTime: string;
  arrivalTime: string;
  durationInMinutes?: number;
}

interface BusType {
  id: string; // Add ID to bus type
  type: string;
  capacity: string;
  description: string;
}

interface FormState {
  companyDetails: CompanyDetails;
  routes: RouteDetails[];
  schedules: { [routeId: string]: ScheduleDetails[] };
  busType: BusType[];
}

interface FormContextValue {
  formData: FormState;
  updateFormData: (key: keyof FormState, value: any) => void;
  updateNestedField: (routeId: string, newSchedule: ScheduleDetails) => void;
  resetForm: () => void;
  addNestedField: <T extends keyof FormState>(
    section: T,
    newField: FormState[T] extends Array<infer U> ? U : never
  ) => void;
  getFormData: () => FormState;
}

const FormContext = createContext<FormContextValue | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormState>({
    companyDetails: { plan: "basic" },
    busType: [],
    routes: [],
    schedules: {},
  });

  const generateId = () => Math.random().toString(36).substr(2, 9); // Simple ID generator

  // Updates form fields
  const updateFormData = (key: keyof FormState, value: any) => {
    setFormData((prev) => {
      if (key === "routes") {
        return { ...prev, routes: [...prev.routes, value] }; // Append new route
      }
      return { ...prev, [key]: value };
    });
  };

  // Updates schedules per route
  const updateNestedField = (routeId: string, newSchedule: ScheduleDetails) => {
    setFormData((prev) => ({
      ...prev,
      schedules: {
        ...prev.schedules,
        [routeId]: [...(prev.schedules[routeId] || []), newSchedule], // Append to specific route
      },
    }));
  };

  // Adds a new field to an array in the form
  const addNestedField = <T extends keyof FormState>(
    section: T,
    newField: Omit<FormState[T] extends Array<infer U> ? U : never, "id">
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...(prev[section] as any), { ...newField, id: generateId() }], // Temporary ID
    }));
  };

  // Resets the form
  const resetForm = () => {
    setFormData({
      companyDetails: { plan: "basic" },
      busType: [],
      routes: [],
      schedules: {},
    });
  };

  const getFormData = () => formData;

  const contextValue = useMemo(
    () => ({
      formData,
      updateFormData,
      updateNestedField,
      resetForm,
      addNestedField,
      getFormData,
    }),
    [formData]
  );

  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};