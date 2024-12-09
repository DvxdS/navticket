import React, { createContext, useContext, useState, ReactNode } from "react";

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
  priceVIP : number;
  priceStandard: number;
}

interface ScheduleDetails {
  routeId: string;
  busTypeId: string;
  departureTime: string;
  arrivalTime: string;
  durationInHour: number;
  price: number;
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
  updateNestedField: (
    section: keyof FormState,
    index: number,
    fieldKey: string,
    fieldValue: any
  ) => void;
  resetForm: () => void; // For resetting the form if needed
}

const FormContext = createContext<FormContextValue | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormState>({
    companyDetails: { plan: "" },
    busType: [],
    routes: [],
    schedules: [],
  });

  // General update function
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

  // Update nested fields (e.g., individual route/schedule)
  const updateNestedField = (
    section: keyof FormState,
    index: number,
    fieldKey: string,
    fieldValue: any
  ) => {
    setFormData((prev) => {
      const updatedSection = [...(prev[section] as any[])];
      updatedSection[index] = {
        ...updatedSection[index],
        [fieldKey]: fieldValue,
      };

      return { ...prev, [section]: updatedSection };
    });
  };

  // Reset the form (optional helper function)
  const resetForm = () => {
    setFormData({
      companyDetails: { plan: "" },
      busType: [],
      routes: [],
      schedules: [],
    });
  };

  return (
    <FormContext.Provider
      value={{ formData, updateFormData, updateNestedField, resetForm }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }

  return context;
};
