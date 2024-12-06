import React, { createContext, useContext, useState, ReactNode } from "react";

interface FormState {
  plan: string;
  companyDetails: { plan: string; [key: string]: any } // Ensure plan is part of companyDetails
  routes: any[];
  schedules: any[];
}

interface FormContextValue {
  formData: FormState;
  updateFormData: (key: string, value: any) => void;
}

const FormContext = createContext<FormContextValue | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormState>({
    plan: "",
    companyDetails: { plan: "" },
    routes: [],
    schedules: [],
  });

  const updateFormData = (key: string, value: any) => {
    if (key === "plan") {
      setFormData((prev) => ({
        ...prev,
        plan: value,
        companyDetails: { ...prev.companyDetails, plan: value } // Sync plan to companyDetails
      }));
    } else {
      setFormData((prev) => ({ ...prev, [key]: value }));
    }
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
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
