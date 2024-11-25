import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useFormContext } from "../../../context/FormContext";

interface RoutesStepProps {
  goNext: () => void;
}

const RoutesStep: React.FC<RoutesStepProps> = ({ goNext }) => {
  const { updateFormData } = useFormContext();

  const formik = useFormik({
    initialValues: {
      origin: "",
      destination: "",
      price: "",
      distance: "",
    },
    validationSchema: Yup.object({
      origin: Yup.string()
        .required("Origine est requise.")
        .min(2, "Trop court."),
      destination: Yup.string()
        .required("Destination est requise.")
        .min(2, "Trop court."),
      price: Yup.number()
        .required("Prix est requis.")
        .min(1, "Prix doit être positif."),
      distance: Yup.number()
        .required("Distance est requise.")
        .min(1, "Distance doit être positive."),
    }),
    onSubmit: (values) => {
      updateFormData("routes", values); // Save the route details in context
      goNext(); // Move to the next step
    },
  });

  return (
    <div className="w-full h-auto bg-white px-4 sm:px-6 lg:px-8 mt-10">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Créer une Route</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Origin */}
          <div>
            <label
              htmlFor="origin"
              className="block text-sm font-medium text-gray-700"
            >
              Origine
            </label>
            <input
              id="origin"
              name="origin"
              type="text"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                formik.touched.origin && formik.errors.origin
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Ville de départ"
              value={formik.values.origin}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.origin && formik.errors.origin && (
              <p className="text-sm text-red-600">{formik.errors.origin}</p>
            )}
          </div>

          {/* Destination */}
          <div>
            <label
              htmlFor="destination"
              className="block text-sm font-medium text-gray-700"
            >
              Destination
            </label>
            <input
              id="destination"
              name="destination"
              type="text"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                formik.touched.destination && formik.errors.destination
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Ville d'arrivée"
              value={formik.values.destination}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.destination && formik.errors.destination && (
              <p className="text-sm text-red-600">
                {formik.errors.destination}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Prix (XOF)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                formik.touched.price && formik.errors.price
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Prix du billet"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-sm text-red-600">{formik.errors.price}</p>
            )}
          </div>

          {/* Distance */}
          <div>
            <label
              htmlFor="distance"
              className="block text-sm font-medium text-gray-700"
            >
              Distance (Km)
            </label>
            <input
              id="distance"
              name="distance"
              type="number"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                formik.touched.distance && formik.errors.distance
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Distance du trajet"
              value={formik.values.distance}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.distance && formik.errors.distance && (
              <p className="text-sm text-red-600">{formik.errors.distance}</p>
            )}
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <button
              type="submit"
              className="py-3 px-6 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
            >
              Continuer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoutesStep;
