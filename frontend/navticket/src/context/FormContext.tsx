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
  origin: string;
  destination: string;
  distance: number;
  priceVIP: number;
  priceStandard: number;
}

interface ScheduleDetails {
  routeId: string;
  busTypeId: string;
  departureTime: string;
  arrivalTime: string;
  durationInHour: number;
}

interface BusType {
  type: string;
  capacity: string;
  description: string;
}

interface FormState {
  companyDetails: CompanyDetails;
  routes: RouteDetails[];
  schedules: ScheduleDetails[];
  busType: BusType[];
}

interface FormContextValue {
  formData: FormState;
  updateFormData: (key: keyof FormState, value: any) => void;
  updateNestedField: <T extends keyof FormState>(
    section: T,
    index: number,
    fieldKey: keyof FormState[T][number],
    fieldValue: any
  ) => void;
  resetForm: () => void;
  addNestedField: <T extends keyof FormState>(
    section: T,
    newField: FormState[T] extends Array<infer U> ? U : never
  ) => void;
}

const FormContext = createContext<FormContextValue | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormState>({
    companyDetails: { plan: "basic" },
    busType: [],
    routes: [],
    schedules: [],
  });

  const updateFormData = (key: keyof FormState, value: any) => {
    if (key === "companyDetails") {
      setFormData((prev) => ({
        ...prev,
        companyDetails: { ...prev.companyDetails, ...value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [key]: value }));
    }
  };

  const updateNestedField = <T extends keyof FormState>(
    section: T,
    index: number,
    fieldKey: keyof FormState[T][number],
    fieldValue: any
  ) => {
    setFormData((prev) => {
      const sectionArray = prev[section] as Array<any>;
      if (!sectionArray || !sectionArray[index]) {
        console.error(`Index ${index} does not exist in section ${section}`);
        return prev;
      }

      const updatedSection = [...sectionArray];
      updatedSection[index] = {
        ...updatedSection[index],
        [fieldKey]: fieldValue,
      };

      return { ...prev, [section]: updatedSection };
    });
  };

  const addNestedField = <T extends keyof FormState>(
    section: T,
    newField: FormState[T] extends Array<infer U> ? U : never
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [
        ...(prev[section] as unknown as Array<FormState[T] extends Array<infer U> ? U : never>),
        newField,
      ],
    }));
  };

  const resetForm = () => {
    setFormData({
      companyDetails: { plan: "basic" },
      busType: [],
      routes: [],
      schedules: [],
    });
  };

  const contextValue = useMemo(
    () => ({
      formData,
      updateFormData,
      updateNestedField,
      resetForm,
      addNestedField,
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
