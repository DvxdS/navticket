import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useFormContext } from "../../../context/FormContext";

interface Schedule {
  departureTime: string;
  arrivalTime?: string;
  durationInMinutes?: number;
}

interface ScheduleStepProps {
  goNext: () => void;
  goBack: () => void;
}

const ScheduleStep: React.FC<ScheduleStepProps> = ({ goNext, goBack }) => {
  const { updateFormData } = useFormContext();
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const formik = useFormik({
    initialValues: {
      departureTime: "",
      arrivalTime: "",
      durationInMinutes: "",
    },
    validationSchema: Yup.object({
      departureTime: Yup.string()
        .required("L'heure de départ est requise.")
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format invalide (HH:mm)"),
      arrivalTime: Yup.string()
        .nullable()
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format invalide (HH:mm)"),
      durationInMinutes: Yup.number()
        .nullable()
        .positive("Durée doit être un nombre positif."),
    }),
    onSubmit: (values, { resetForm }) => {
      const newSchedule: Schedule = {
        departureTime: values.departureTime,
        arrivalTime: values.arrivalTime || undefined,
        durationInMinutes: values.durationInMinutes
          ? Number(values.durationInMinutes)
          : undefined,
      };
      setSchedules([...schedules, newSchedule]);
      resetForm();
    },
  });

  const handleRemoveSchedule = (index: number) => {
    const updatedSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(updatedSchedules);
  };

  const handleContinue = () => {
    updateFormData("schedules", schedules);
    goNext();
  };

  return (
    <div className="w-full h-auto bg-white px-4 sm:px-6 lg:px-8 mt-10">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Horaires</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
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
            />
            {formik.touched.departureTime && formik.errors.departureTime && (
              <p className="text-red-500 text-sm">{formik.errors.departureTime}</p>
            )}
          </div>

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
            />
            {formik.touched.arrivalTime && formik.errors.arrivalTime && (
              <p className="text-red-500 text-sm">{formik.errors.arrivalTime}</p>
            )}
          </div>

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
            />
            {formik.touched.durationInMinutes &&
              formik.errors.durationInMinutes && (
                <p className="text-red-500 text-sm">
                  {formik.errors.durationInMinutes}
                </p>
              )}
          </div>

          <button
            type="submit"
            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Ajouter Horaire
          </button>
        </form>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Horaires ajoutés</h3>
          {schedules.map((schedule, index) => (
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
              </div>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveSchedule(index)}
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>

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
              schedules.length > 0
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={schedules.length === 0}
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleStep;
