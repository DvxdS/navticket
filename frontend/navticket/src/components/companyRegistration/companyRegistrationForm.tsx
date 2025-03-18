import React from "react";
import Stepper from "./stepper";
import { Outlet, useLocation } from "react-router-dom";

const steps = ["Select Plan", "Company Details",  "Review"];

const CompanyRegistrationForm: React.FC = () => {
  const location = useLocation();

  // Map URL paths to step indices
  const stepPaths = ["plan", "company", "review"];

  const currentStep = stepPaths.indexOf(location.pathname.split("/").pop() || "");
  console.log(currentStep);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-4">
      {/* Stepper at the top */}
      <Stepper steps={steps} currentStep={currentStep} />

      {/* Rendered content below the stepper */}
      <div className="bg-white p-6 ">
        <Outlet />
      </div>
    </div>
  );
};

export default CompanyRegistrationForm;
