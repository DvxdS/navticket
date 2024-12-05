import React, { useState } from "react";
import Stepper from "./stepper";
import PlanStep from "./setps/planStep";
import CompanyStep from "./setps/companyStep";
import RoutesStep from "./setps/routeStep";
import ScheduleStep from './setps/scheduleStep'
import { useFormContext } from "../../context/FormContext";

const steps = ["Select Plan", "Company Details", "Routes", "Schedules"];

const CompanyRegistrationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { formData } = useFormContext();

  const goNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const goBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = () => {
    console.log("Final Form Data:", formData);
    // Submit formData to the backend here
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PlanStep goNext={goNext} />;
      case 1:
        return <CompanyStep goNext={goNext} goBack={goBack} />;
      case 2:
        return <RoutesStep goNext={goNext} goBack={goBack} />;
      case 3:
        return <ScheduleStep goBack={goBack} goNext={goNext} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Stepper 
      steps={steps} 
      currentStep={currentStep} 
      onNext={goNext} 
      onPrevious={goBack}  />
      <div className="bg-white p-6 shadow rounded">{renderStep()}</div>
    </div>
  );
};

export default CompanyRegistrationForm;
