import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useFormContext } from "../../../context/FormContext";

interface BusType {
  id: string; // Add ID to bus type
  type: string;
  capacity: string;
  description: string;
}

interface BusTypeStepProps {
  goNext: () => void;
  goBack: () => void;
}

const BusTypeStep: React.FC<BusTypeStepProps> = ({ goNext, goBack }) => {
  const { addNestedField } = useFormContext();
  const [busTypes, setBusTypes] = useState<BusType[]>([]);

  // Formik setup for form validation and handling
  const formik = useFormik({
    initialValues: {
      type: "",
      capacity: "",
      description: "",
    },
    validationSchema: Yup.object({
      type: Yup.string()
        .required("Le type de bus est requis.")
        .oneOf(["Standard", "VIP", "VVIP"], "Type invalide."),
      capacity: Yup.number()
        .typeError("La capacité doit être un nombre.")
        .min(1, "La capacité doit être au moins de 1.")
        .required("La capacité est requise."),
      description: Yup.string().max(
        255,
        "La description ne peut pas dépasser 255 caractères."
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      // Generate a unique ID for the bus type
      const busTypeWithId = { ...values, id: generateId() };

      // Save the bus type in local state and context
      setBusTypes((prev) => [...prev, busTypeWithId]);
      addNestedField("busType", busTypeWithId); // Save the bus type in context
      resetForm();
    },
  });

  // Simple ID generator
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Handle final submission
  const handleSubmitAll = () => {
    goNext();
  };

  // Handle removal of a bus type
  const handleRemoveBusType = (index: number) => {
    setBusTypes((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold">Types de Bus</h2>
        <p className="text-gray-600">
          Ajoutez les types de bus disponibles pour votre entreprise.
        </p>
      </div>

      <div className="p-6 max-w-lg mx-auto border rounded-lg shadow-md bg-white space-y-6">
        {/* Type Field */}
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Type de Bus
          </label>
          <select
            id="type"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block w-full rounded-lg border border-gray-300 bg-white text-base p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
          >
            <option value="">Sélectionnez</option>
            <option value="Standard">Standard</option>
            <option value="VIP">VIP</option>
            <option value="VVIP">VVIP</option>
          </select>
          {formik.touched.type && formik.errors.type && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.type}</p>
          )}
        </div>

        {/* Capacity Field */}
        <div>
          <label
            htmlFor="capacity"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Capacité
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formik.values.capacity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block w-full rounded-lg border border-gray-300 bg-white text-base p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
          />
          {formik.touched.capacity && formik.errors.capacity && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.capacity}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Facultatif"
            className="block w-full rounded-lg border border-gray-300 bg-white text-base p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
          )}
        </div>

        {/* Add Button */}
        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-medium text-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Ajouter
        </button>
      </div>

      {/* Display Added Bus Types */}
      {busTypes.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
          {busTypes.map((busType, index) => (
            <div
              key={busType.id} // Use ID as key
              className="p-4 border border-gray-300 rounded-lg shadow-md bg-white"
            >
              <p className="text-base font-medium text-gray-700">
                <strong className="text-gray-900">Type:</strong> {busType.type}
              </p>
              <p className="text-base font-medium text-gray-700">
                <strong className="text-gray-900">Capacité:</strong>{" "}
                {busType.capacity}
              </p>
              <p className="text-base font-medium text-gray-700">
                <strong className="text-gray-900">Description:</strong>{" "}
                {busType.description || "Aucune"}
              </p>
              <button
                type="button"
                onClick={() => handleRemoveBusType(index)}
                className="inline-block mt-4 text-sm text-red-600 hover:text-red-800"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={goBack}
          className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Retour
        </button>
        <button
          type="button"
          onClick={handleSubmitAll}
          disabled={busTypes.length === 0} // Disable if no bus types are saved
          className={`py-2 px-4 ${
            busTypes.length > 0
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          } text-white rounded-md`}
        >
          Continuer
        </button>
      </div>
    </form>
  );
};

export default BusTypeStep;