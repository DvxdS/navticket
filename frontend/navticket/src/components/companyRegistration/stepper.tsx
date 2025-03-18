import React from "react";
import {
  FaCheckCircle,
  FaRegBuilding,
  FaBus,
  FaRegMap,
  FaRegCalendarAlt,
  FaRegClipboard,
} from "react-icons/fa";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  const stepIcons = [
    <FaCheckCircle />,
    <FaRegBuilding />,
    //<FaBus />, // New Bus Type Icon
    //<FaRegMap />,
    //<FaRegCalendarAlt />,
    <FaRegClipboard />,
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-row justify-between items-center space-x-4 sm:space-x-6">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center sm:items-start">
            {/* Icon Container */}
            <div
              className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full ring-4 mb-2
                ${index < currentStep
                  ? "bg-green-500 text-white ring-green-300" // Completed step
                  : index === currentStep
                  ? "bg-blue-500 text-white ring-blue-300" // Current step
                  : "bg-gray-300 text-gray-500 ring-gray-200" // Upcoming step
                }`}
            >
              {index < currentStep ? <FaCheckCircle /> : stepIcons[index]}
            </div>

            {/* Step Title */}
            <h3
              className={`text-xs sm:text-sm font-medium text-center sm:text-left ${
                index < currentStep
                  ? "text-green-600" // Completed step text
                  : index === currentStep
                  ? "text-blue-600" // Current step text
                  : "text-gray-500" // Upcoming step text
              }`}
            >
              {step}
            </h3>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`h-1 sm:h-1.5 w-10 sm:w-16 bg-gray-300 mt-2 sm:mt-4 ${
                  index < currentStep ? "bg-green-500" : ""
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
