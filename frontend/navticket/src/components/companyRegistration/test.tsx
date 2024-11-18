import  { useState } from 'react';
import Stepper from './stepper';

const StepperExample = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ['Plan Selection', 'Company Details', 'Routes', 'Schedules'];

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0: return <div>Plan Selection Content</div>;
      case 1: return <div>Company Details Content</div>;
      case 2: return <div>Routes Content</div>;
      case 3: return <div>Schedules Content</div>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Registration Stepper</h1>
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onNext={handleNextStep}
        onPrevious={handlePreviousStep}
      />
      <div className="mt-6">{renderStepContent(currentStep)}</div>
    </div>
  );
};

export default StepperExample;
