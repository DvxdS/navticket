import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useFormContext } from "../../../context/FormContext";

interface Schedule {
  routeId: string;
  busTypeId: string; // Add busTypeId to Schedule
  departureTime: string;
  arrivalTime?: string;
  durationInMinutes?: number;
}

interface ScheduleStepProps {
  goNext: () => void;
  goBack: () => void;
}

const ScheduleStep: React.FC<ScheduleStepProps> = ({ goNext, goBack }) => {
  const { updateNestedField, formData } = useFormContext();
  const [selectedRouteId, setSelectedRouteId] = useState<string>(""); // Track selected route

  const formik = useFormik({
    initialValues: {
      routeId: "",
      busTypeId: "", // Add busTypeId to form values
      departureTime: "",
      arrivalTime: "",
      durationInMinutes: "",
    },
    validationSchema: Yup.object({
      routeId: Yup.string().required("Veuillez sélectionner un trajet."), // Validate routeId
      busTypeId: Yup.string().required("Veuillez sélectionner un type de bus."), // Validate busTypeId
      departureTime: Yup.string()
        .required("L'heure de départ est requise.")
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format invalide (HH:mm)"),
      arrivalTime: Yup.string()
        .nullable()
        .matches(
          /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
          "Format invalide (HH:mm)"
        )
        .notRequired(),
      durationInMinutes: Yup.number()
        .nullable()
        .positive("Durée doit être un nombre positif.")
        .notRequired(),
    }),
    onSubmit: (values, { resetForm }) => {
      const newSchedule = {
        routeId: String(values.routeId),
        busTypeId: String(values.busTypeId), // Include busTypeId
        departureTime: String(values.departureTime),
        arrivalTime: String(values.arrivalTime), // Always a string
        durationInMinutes: Number(values.durationInMinutes),
      };

      // Add schedule to the selected route using updateNestedField
      updateNestedField(values.routeId, newSchedule);
      resetForm();
    },
  });

  const handleRemoveSchedule = (routeId: string, index: number) => {
    const updatedSchedules = formData.schedules[routeId].filter((_, i) => i !== index);

    // Clear the schedules first, then re-add them one by one
    updateNestedField(routeId, updatedSchedules[0] ?? null);

    updatedSchedules.slice(1).forEach((schedule) => {
      updateNestedField(routeId, schedule);
    });
  };

  const handleContinue = () => {
    goNext();
  };

  return (
    <div className="w-full h-auto bg-white px-4 sm:px-6 lg:px-8 mt-10">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Horaires</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Route Selection Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Sélectionner un trajet
            </label>
            <select
              name="routeId"
              value={formik.values.routeId}
              onChange={(e) => {
                formik.handleChange(e);
                setSelectedRouteId(e.target.value); // Update selected route
              }}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-md ${
                formik.touched.routeId && formik.errors.routeId
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              aria-label="Sélectionner un trajet"
            >
              <option value="">Sélectionner un trajet</option>
              {formData.routes.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.origin} → {route.destination}
                </option>
              ))}
            </select>
            {formik.touched.routeId && formik.errors.routeId && (
              <p className="text-red-500 text-sm">{formik.errors.routeId}</p>
            )}
          </div>

          {/* Bus Type Selection Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Sélectionner un type de bus
            </label>
            <select
              name="busTypeId"
              value={formik.values.busTypeId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-md ${
                formik.touched.busTypeId && formik.errors.busTypeId
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              aria-label="Sélectionner un type de bus"
            >
              <option value="">Sélectionner un type de bus</option>
              {formData.busType.map((busType) => (
                <option key={busType.id} value={busType.id}>
                  {busType.type} (Capacité: {busType.capacity})
                </option>
              ))}
            </select>
            {formik.touched.busTypeId && formik.errors.busTypeId && (
              <p className="text-red-500 text-sm">{formik.errors.busTypeId}</p>
            )}
          </div>

          {/* Departure Time */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Heure de Départ (HH:mm)
            </label>
            <input
              type="time"
              name="departureTime"
              value={formik.values.departureTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-md ${
                formik.touched.departureTime && formik.errors.departureTime
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              aria-label="Heure de départ"
            />
            {formik.touched.departureTime && formik.errors.departureTime && (
              <p className="text-red-500 text-sm">{formik.errors.departureTime}</p>
            )}
          </div>

          {/* Arrival Time */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Heure d'Arrivée (optionnel) (HH:mm)
            </label>
            <input
              type="time"
              name="arrivalTime"
              value={formik.values.arrivalTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-md ${
                formik.touched.arrivalTime && formik.errors.arrivalTime
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              aria-label="Heure d'arrivée"
            />
            {formik.touched.arrivalTime && formik.errors.arrivalTime && (
              <p className="text-red-500 text-sm">{formik.errors.arrivalTime}</p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Durée (en minutes, optionnel)
            </label>
            <input
              type="number"
              name="durationInMinutes"
              value={formik.values.durationInMinutes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-md ${
                formik.touched.durationInMinutes &&
                formik.errors.durationInMinutes
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              aria-label="Durée en minutes"
            />
            {formik.touched.durationInMinutes &&
              formik.errors.durationInMinutes && (
                <p className="text-red-500 text-sm">
                  {formik.errors.durationInMinutes}
                </p>
              )}
          </div>

          {/* Add Schedule Button */}
          <button
            type="submit"
            disabled={!formik.isValid || !formik.values.departureTime}
            className={`py-2 px-4 rounded-md text-white transition duration-300 ${
              formik.isValid && formik.values.departureTime
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Ajouter Horaire
          </button>
        </form>

        {/* Display Schedules for Selected Route */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Horaires ajoutés</h3>
          {selectedRouteId &&
            formData.schedules[selectedRouteId]?.map((schedule, index) => {
              const busType = formData.busType.find(
                (bus) => bus.id === schedule.busTypeId
              );
              return (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md mb-2"
                >
                  <div>
                    <p>
                      <strong>Départ:</strong> {schedule.departureTime}
                    </p>
                    {schedule.arrivalTime && (
                      <p>
                        <strong>Arrivée:</strong> {schedule.arrivalTime}
                      </p>
                    )}
                    {schedule.durationInMinutes && (
                      <p>
                        <strong>Durée:</strong> {schedule.durationInMinutes} min
                      </p>
                    )}
                    {busType && (
                      <p>
                        <strong>Type de bus:</strong> {busType.type}
                      </p>
                    )}
                  </div>
                  <button
                    aria-label={`Supprimer l'horaire de départ ${schedule.departureTime}`}
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveSchedule(selectedRouteId, index)}
                  >
                    Supprimer
                  </button>
                </div>
              );
            })}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={goBack}
            className="py-3 px-6 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Retour
          </button>
          <button
            onClick={handleContinue}
            className={`py-3 px-6 rounded-md text-white transition duration-300 ${
              Object.keys(formData.schedules).length > 0
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={Object.keys(formData.schedules).length === 0}
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleStep;