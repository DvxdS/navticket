import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useFormContext } from "../../../context/FormContext";

interface RoutesStepProps {
  goNext: () => void;
  goBack: () => void;
}

const RoutesStep: React.FC<RoutesStepProps> = ({ goNext, goBack }) => {
  const { addNestedField, formData } = useFormContext();
  const [savedRoutes, setSavedRoutes] = useState<any[]>([]);

  // Formik setup for form validation and handling
  const formik = useFormik({
    initialValues: {
      origin: "",
      destination: "",
      priceStandard: "",
      priceVIP: "",
      distance: "",
      routeCode: "", // Add routeCode to initial values
    },
    validationSchema: Yup.object({
      origin: Yup.string()
        .required("Origine est requise.")
        .min(2, "Trop court."),
      destination: Yup.string()
        .required("Destination est requise.")
        .min(2, "Trop court."),
      priceStandard: Yup.number()
        .required("Prix est requis.")
        .min(1, "Prix doit être positif."),
      priceVIP: Yup.number().min(1, "Prix doit être positif."),
      distance: Yup.number()
        .required("Distance est requise.")
        .min(1, "Distance doit être positive."),
      routeCode: Yup.string() // Add validation for routeCode
        .required("Le code de la route est requis.")
        .matches(/^[A-Z0-9-]+$/, "Le code doit contenir uniquement des lettres majuscules, des chiffres et des tirets.")
        .test(
          "unique-routeCode",
          "Ce code de route existe déjà.",
          (value) => !formData.routes.some((route) => route.routeCode === value)
        ),
    }),
    onSubmit: (values) => {
      // Convert string values to numbers
      const routeWithId = {
        id: generateId(), // Generate a unique ID
        origin: values.origin,
        destination: values.destination,
        priceStandard: Number(values.priceStandard), // Convert to number
        priceVIP: Number(values.priceVIP), // Convert to number
        distance: Number(values.distance), // Convert to number
        routeCode: values.routeCode, // Include routeCode
      };

      // Save the route details in context and add it to savedRoutes
      setSavedRoutes((prevRoutes) => [...prevRoutes, routeWithId]);
      addNestedField("routes", routeWithId); // Save the route in context
      formik.resetForm(); // Reset the form for adding new routes
    },
  });

  // Simple ID generator
  const generateId = () => Math.random().toString(36).substr(2, 9);

  return (
    <div className="w-full h-auto bg-white px-4 sm:px-6 lg:px-8 mt-10">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Ajoutez vos trajets</h2>

        {/* Route Form */}
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
              className={`mt-1 block w-full py-3 px-2 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
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
              className={`mt-1 block w-full py-3 px-2 border  rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
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

          {/* Price VIP */}
          <div>
            <label
              htmlFor="priceVIP"
              className="block text-sm font-medium text-gray-700"
            >
              Prix VIP (XOF)
            </label>
            <input
              id="priceVIP"
              name="priceVIP"
              type="number"
              className={`mt-1 block w-full py-3 px-2 border  rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                formik.touched.priceVIP && formik.errors.priceVIP
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Prix du billet VIP"
              value={formik.values.priceVIP}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.priceVIP && formik.errors.priceVIP && (
              <p className="text-sm text-red-600">{formik.errors.priceVIP}</p>
            )}
          </div>

          {/* Price Standard */}
          <div>
            <label
              htmlFor="priceStandard"
              className="block text-sm font-medium text-gray-700"
            >
              Prix Standard (XOF)
            </label>
            <input
              id="priceStandard"
              name="priceStandard"
              type="number"
              className={`mt-1 block w-full py-3 px-2 border  rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                formik.touched.priceStandard && formik.errors.priceStandard
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Prix du billet standard"
              value={formik.values.priceStandard}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.priceStandard && formik.errors.priceStandard && (
              <p className="text-sm text-red-600">{formik.errors.priceStandard}</p>
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
              className={`mt-1 block w-full py-3 px-2 border  rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
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

          {/* Route Code */}
          <div>
            <label
              htmlFor="routeCode"
              className="block text-sm font-medium text-gray-700"
            >
              Code de la Route
            </label>
            <input
              id="routeCode"
              name="routeCode"
              type="text"
              className={`mt-1 block w-full py-3 px-2 border  rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                formik.touched.routeCode && formik.errors.routeCode
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Code de la route (ex: ABJ-YMK)"
              value={formik.values.routeCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.routeCode && formik.errors.routeCode && (
              <p className="text-sm text-red-600">{formik.errors.routeCode}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-4 flex-wrap">
            {/* Save and Add Another Route */}
            <button
              type="submit"
              className="py-2 px-4 sm:py-3 sm:px-6 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-300 w-full sm:w-auto"
            >
              Sauvegarder la Route
            </button>
            <button
              type="button"
              onClick={() => formik.resetForm()}
              className="py-2 px-4 sm:py-3 sm:px-6 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition duration-300 w-full sm:w-auto"
            >
              Renitialiser
            </button>
          </div>
        </form>

        {/* Summary of Saved Routes */}
        {savedRoutes.length > 0 && (
          <div className="mt-8 px-4 sm:px-6">
            <h3 className="text-xl font-semibold mb-4">Routes Enregistrées:</h3>
            <div className="space-y-4">
              {savedRoutes.map((route, index) => (
                <div
                  key={index}
                  className="p-4 sm:p-6 bg-white border border-gray-300 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold text-blue-600">
                      {route.origin} → {route.destination}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {route.priceVIP && route.priceStandard} XOF
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>
                      <strong>Distance:</strong> {route.distance} km
                    </p>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>
                      <strong>Prix Standard:</strong> {route.priceStandard} XOF
                    </p>
                    <p>
                      <strong>Prix VIP:</strong> {route.priceVIP} XOF
                    </p>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>
                      <strong>Code de la Route:</strong> {route.routeCode}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={goBack}
            className="py-3 px-6 rounded-md bg-gray-400 text-white hover:bg-gray-500 transition duration-300"
          >
            Retour
          </button>
          <button
            onClick={goNext}
            disabled={savedRoutes.length === 0} // Disable if no routes are saved
            className={`py-3 px-6 rounded-md ${
              savedRoutes.length > 0
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            } text-white transition duration-300`}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoutesStep;