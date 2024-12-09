import React, { useState } from "react";
import { useFormContext } from "../../../context/FormContext";

interface PlanStepProps {
  goNext: () => void;
}

const PlanStep: React.FC<PlanStepProps> = ({ goNext }) => {
  const { updateFormData } = useFormContext();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    { id: "basic", name: "Basic", price: "250.000 XOF", features: ["Vente de ticket", "Assistance de base"] },
    {
      id: "pro",
      name: "Pro",
      price: "500.000 XOF",
      features: ["Vente de tickets", "Gestion d'expeditions Colis", "Dashboard management", "Outils Analytics avancées"],
    },
    {
      id: "elite",
      name: "Elite",
      price: "1.000.000 XOF",
      features: ["Ventes de tickets", "Gestion d'expedition de colis & Dashboard", "24/7 Support dédié & Outils avancés", "Solutions personnalisées"],
    },
  ];

  const handlePlanClick = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleContinue = () => {
    if (selectedPlan) {
      updateFormData("companyDetails", { plan: selectedPlan });
      goNext();
    }
  };

  return (
    <div className="w-full h-auto bg-white px-4 sm:px-6 lg:px-8 mt-10">
      <div className="w-full max-w-6xl mx-auto">
        <div className="mt-10">
          <h2 className="text-3xl font-bold text-center mb-8">Choissez votre Package</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`border-2 rounded-lg p-5 flex flex-col transition duration-300 cursor-pointer ${
                selectedPlan === plan.id
                  ? "border-blue-600 bg-blue-50 text-blue-800"
                  : "border-gray-300 hover:border-blue-400"
              }`}
              onClick={() => handlePlanClick(plan.id)}
            >
              <h3
                className={`text-lg font-semibold mb-3 ${
                  selectedPlan === plan.id ? "text-blue-800" : "text-gray-800"
                }`}
              >
                {plan.name}
              </h3>
              <p className="text-gray-600 mb-3">Plan description</p>
              <p className="text-3xl font-bold mb-5">
                {plan.price}
                <span className="text-lg font-normal text-gray-600">/month</span>
              </p>
              <ul className="mb-5 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center mb-2">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            className={`py-3 px-6 rounded-md text-white transition duration-300 ${
              selectedPlan
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!selectedPlan}
            onClick={handleContinue}
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanStep;
