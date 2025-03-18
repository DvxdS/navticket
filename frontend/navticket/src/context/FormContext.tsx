import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { string } from "yup";

interface CompanyRegistrationData {
  name: string;
  officialDocs: string[] ;
  numberOfBusesVip: number;
  numberOfBusesStandard: number;
  email: string;
  contactInfo: string;
  officeLocation: string;
  plan: string;
}

interface RegistrationContextValue {
  // State
  formData: CompanyRegistrationData;

  // Actions
  updateFormData: <K extends keyof CompanyRegistrationData>(field: K, value: CompanyRegistrationData[K]) => void;
  updateMultipleFields: (fields: Partial<CompanyRegistrationData>) => void;
  resetForm: () => void;
  getFormData: () => CompanyRegistrationData;
}

// Initial state
const initialState: CompanyRegistrationData = {
  name: "",
  officialDocs: [],
  numberOfBusesVip: 0,
  numberOfBusesStandard: 0,
  email: "",
  contactInfo: "",
  officeLocation: "",
  plan: "basic",
};

const RegistrationContext = createContext<RegistrationContextValue | undefined>(undefined);

export const RegistrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<CompanyRegistrationData>(initialState);

  // Update a single field with type safety
  const updateFormData = <K extends keyof CompanyRegistrationData>(field: K, value: CompanyRegistrationData[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Update multiple fields at once
  const updateMultipleFields = (fields: Partial<CompanyRegistrationData>) => {
    setFormData((prev) => ({
      ...prev,
      ...fields,
    }));
  };

  // Reset the form
  const resetForm = () => {
    setFormData(initialState);
  };

  // Use useMemo to ensure efficient re-renders and proper function reference
  const value = useMemo(
    () => ({
      formData,
      updateFormData,
      updateMultipleFields,
      resetForm,
      getFormData: () => formData, // Now always returns the latest formData
    }),
    [formData]
  );

  return <RegistrationContext.Provider value={value}>{children}</RegistrationContext.Provider>;
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error("useRegistration must be used within a RegistrationProvider");
  }
  return context;
};
