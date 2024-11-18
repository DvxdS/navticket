import React from 'react';
import { FaRegCheckCircle, FaRegBuilding, FaRegMap, FaRegCalendarAlt } from 'react-icons/fa';

interface StepperProps {
  steps: string[];
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, onNext, onPrevious }) => {
  const stepIcons = [
    <FaRegCheckCircle />,
    <FaRegBuilding />,
    <FaRegMap />,
    <FaRegCalendarAlt />,
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <ol className="relative border-l border-gray-300">
        {steps.map((step, index) => (
          <li key={index} className="mb-10 ml-6">
            <div
              className={`absolute -left-4 flex items-center justify-center w-8 h-8 rounded-full ring-4 
                ${index < currentStep
                  ? 'bg-green-500 text-white ring-green-300'
                  : index === currentStep
                  ? 'bg-blue-500 text-white ring-blue-300'
                  : 'bg-gray-300 text-gray-500 ring-gray-200'
                }`}
            >
              {stepIcons[index]}
            </div>
            <h3
              className={`font-medium leading-tight ${
                index <= currentStep ? 'text-black' : 'text-gray-400'
              }`}
            >
              {step}
            </h3>
            <p className="text-sm text-gray-500">Step details here</p>
          </li>
        ))}
      </ol>
      <div className="flex items-center justify-between w-full mt-4">
        <button
          onClick={onPrevious}
          disabled={currentStep === 0}
          className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Stepper;
