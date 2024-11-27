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
      
    </div>
  );
};

export default Stepper;
