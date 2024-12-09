import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useFormContext } from "../../../context/FormContext";

interface BusType {
  type: string;
  capacity: string;
  description: string;
}

interface BusTypeStepProps {
  goNext: () => void;
  goBack: () => void;
}

const BusTypeStep: React.FC<BusTypeStepProps> = ({ goNext, goBack }) => {
  const { updateFormData } = useFormContext();
  const [busTypes, setBusTypes] = useState<BusType[]>([]);

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
      description: Yup.string().max(255, "La description ne peut pas dépasser 255 caractères."),
    }),
    onSubmit: (values, { resetForm }) => {
      setBusTypes((prev) => [...prev, values]);
      resetForm();
    },
  });

  const handleSubmitAll = () => {
    updateFormData("busType", busTypes);
    goNext();
  };

  const handleRemoveBusType = (index: number) => {
    setBusTypes((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold">Types de Bus</h2>
      <p className="text-gray-600">Ajoutez les types de bus disponibles pour votre entreprise.</p>

      <div className="p-4 border rounded-md shadow-sm bg-gray-50 space-y-4">
        {/* Type Field */}
        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type de Bus
          </label>
          <select
            id="type"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">Sélectionnez</option>
            <option value="Standard">Standard</option>
            <option value="VIP">VIP</option>
            <option value="VVIP">VVIP</option>
          </select>
          {formik.touched.type && formik.errors.type && (
            <p className="text-red-600 text-sm">{formik.errors.type}</p>
          )}
        </div>

        {/* Capacity Field */}
        <div className="mb-4">
          <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
            Capacité
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formik.values.capacity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          {formik.touched.capacity && formik.errors.capacity && (
            <p className="text-red-600 text-sm">{formik.errors.capacity}</p>
          )}
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-600 text-sm ">{formik.errors.description}</p>
          )}
        </div>

        {/* Add Button */}
        <button
          type="submit"
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Ajouter un Type de Bus
        </button>
      </div>

      {/* Display Added Bus Types */}
      {busTypes.length > 0 && (
        <div className="space-y-4">
          {busTypes.map((busType, index) => (
            <div key={index} className="p-4 border rounded-md shadow-sm bg-gray-50">
              <p>
                <strong>Type:</strong> {busType.type}
              </p>
              <p>
                <strong>Capacité:</strong> {busType.capacity}
              </p>
              <p>
                <strong>Description:</strong> {busType.description || "Aucune"}
              </p>
              <button
                type="button"
                onClick={() => handleRemoveBusType(index)}
                className="text-red-600 hover:text-red-800 text-sm mt-2"
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
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Continuer
        </button>
      </div>
    </form>
  );
};

export default BusTypeStep;
