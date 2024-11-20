import React, { createContext, useContext, useState, ReactNode } from "react";

interface FormState {
  plan: string;
  companyDetails: Record<string, any>;
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
    companyDetails: {},
    routes: [],
    schedules: [],
  });

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
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
