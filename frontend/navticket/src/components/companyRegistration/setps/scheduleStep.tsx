import React, { useState, useEffect } from "react";
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
  const { updateFormData, formData } = useFormContext();
  const [schedules, setSchedules] = useState<{ [routeId: string]: Schedule[] }>(formData.schedules || {});

  useEffect(() => {
    updateFormData("schedules", schedules);
  }, [schedules, updateFormData]);

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
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format invalide (HH:mm)")
        .notRequired(),
      durationInMinutes: Yup.number()
        .nullable()
        .positive("Durée doit être un nombre positif.")
        .notRequired(),
    }),
    onSubmit: (values, { resetForm }) => {
      const newSchedule: Schedule = {
        departureTime: values.departureTime,
        arrivalTime: values.arrivalTime || undefined,
        durationInMinutes: values.durationInMinutes ? Number(values.durationInMinutes) : undefined,
      };
      
      const routeId = "defaultRoute"; 
      const updatedSchedules = {
        ...schedules,
        [routeId]: [...(schedules[routeId] || []), newSchedule].sort((a, b) => a.departureTime.localeCompare(b.departureTime)),
      };
      
      setSchedules(updatedSchedules);
      resetForm();
      goNext()
    },
  });

  const handleRemoveSchedule = (routeId: string, index: number) => {
    if (!schedules[routeId]) return;
    const updatedSchedules = {
      ...schedules,
      [routeId]: schedules[routeId].filter((_, i) => i !== index),
    };
    setSchedules(updatedSchedules);
  };

  return (
    <div className="w-full h-auto bg-white px-4 sm:px-6 lg:px-8 mt-10">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Horaires</h2>
        
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Heure de Départ (HH:mm)</label>
            <input
              type="time"
              name="departureTime"
              value={formik.values.departureTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-md ${formik.touched.departureTime && formik.errors.departureTime ? "border-red-500" : "border-gray-300"}`}
            />
            {formik.touched.departureTime && formik.errors.departureTime && (
              <p className="text-red-500 text-sm">{formik.errors.departureTime}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!formik.isValid || !formik.values.departureTime}
            className={`py-2 px-4 rounded-md text-white transition duration-300 ${formik.isValid && formik.values.departureTime ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
          >
            Ajouter Horaire
          </button>
        </form>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Horaires ajoutés</h3>
          {Object.entries(schedules).map(([routeId, scheduleList]) => (
            <div key={routeId}>
              <h3 className="text-lg font-semibold">Route {routeId}</h3>
              {scheduleList.map((schedule, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md mb-2">
                  <p><strong>Départ:</strong> {schedule.departureTime}</p>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleRemoveSchedule(routeId, index)}>Supprimer</button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleStep;