import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useFormContext } from "../../../context/FormContext";

interface CompanyStepProps {
  goNext: () => void;
}

const CompanyStep: React.FC<CompanyStepProps> = ({ goNext }) => {
  const { updateFormData } = useFormContext();

  const formik = useFormik({
    initialValues: {
      companyName: "",
      officialDocs: null,
      vipBusCount: "",
      standardBusCount: "",
      email: "",
      phone: "",
      location: "",
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required("Nom de l'entreprise est requis."),
      officialDocs: Yup.mixed()
        .required("Document officiel est requis.")
        .test("fileType", "Format non supporté (PDF ou Word uniquement)", (value) => {
          return value && ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(value.type);
        }),
      vipBusCount: Yup.number()
        .typeError("Nombre de bus VIP doit être un nombre.")
        .min(0, "Nombre de bus VIP ne peut pas être négatif.")
        .required("Nombre de bus VIP est requis."),
      standardBusCount: Yup.number()
        .typeError("Nombre de bus standards doit être un nombre.")
        .min(0, "Nombre de bus standards ne peut pas être négatif.")
        .required("Nombre de bus standards est requis."),
      email: Yup.string().email("Email invalide.").required("Email est requis."),
      phone: Yup.string()
        .matches(/^\+?[0-9]{10,15}$/, "Numéro de téléphone invalide.")
        .required("Numéro de téléphone est requis."),
      location: Yup.string().required("Localisation de l'office est requise."),
    }),
    onSubmit: (values) => {
      updateFormData("companyDetails", values); // Save data to context
      goNext(); // Move to the next step
    },
  });

  return (
    <div className="w-full h-auto bg-white px-4 sm:px-6 lg:px-8 mt-10">
      <div className="w-full max-w-4xl mx-auto">
        <div className="mt-10">
          <h2 className="text-3xl font-bold text-center mb-8">Informations sur l'entreprise</h2>
        </div>

        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Company Name */}
          <div className="sm:col-span-2">
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Nom de l'entreprise
            </label>
            <input
              id="companyName"
              type="text"
              {...formik.getFieldProps("companyName")}
              className={`mt-1 block w-full rounded-md border ${
                formik.touched.companyName && formik.errors.companyName ? "border-red-500" : "border-gray-300"
              } focus:ring-blue-500 focus:border-blue-500`}
            />
            {formik.touched.companyName && formik.errors.companyName && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.companyName}</p>
            )}
          </div>

          {/* Official Documents */}
          <div className="sm:col-span-2">
            <label htmlFor="officialDocs" className="block text-sm font-medium text-gray-700">
              Documents officiels (PDF ou Word)
            </label>
            <input
              id="officialDocs"
              type="file"
              accept=".pdf, .doc, .docx"
              onChange={(event) => {
                if (event.currentTarget.files) {
                  formik.setFieldValue("officialDocs", event.currentTarget.files[0]);
                }
              }}
              className="mt-1 block w-full"
            />
            {formik.touched.officialDocs && formik.errors.officialDocs && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.officialDocs}</p>
            )}
          </div>

          {/* VIP Bus Count */}
          <div>
            <label htmlFor="vipBusCount" className="block text-sm font-medium text-gray-700">
              Nombre de bus VIP
            </label>
            <input
              id="vipBusCount"
              type="number"
              {...formik.getFieldProps("vipBusCount")}
              className={`mt-1 block w-full rounded-md border ${
                formik.touched.vipBusCount && formik.errors.vipBusCount ? "border-red-500" : "border-gray-300"
              } focus:ring-blue-500 focus:border-blue-500`}
            />
            {formik.touched.vipBusCount && formik.errors.vipBusCount && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.vipBusCount}</p>
            )}
          </div>

          {/* Standard Bus Count */}
          <div>
            <label htmlFor="standardBusCount" className="block text-sm font-medium text-gray-700">
              Nombre de bus standards
            </label>
            <input
              id="standardBusCount"
              type="number"
              {...formik.getFieldProps("standardBusCount")}
              className={`mt-1 block w-full rounded-md border ${
                formik.touched.standardBusCount && formik.errors.standardBusCount ? "border-red-500" : "border-gray-300"
              } focus:ring-blue-500 focus:border-blue-500`}
            />
            {formik.touched.standardBusCount && formik.errors.standardBusCount && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.standardBusCount}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps("email")}
              className={`mt-1 block w-full rounded-md border ${
                formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
              } focus:ring-blue-500 focus:border-blue-500`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Téléphone
            </label>
            <input
              id="phone"
              type="text"
              {...formik.getFieldProps("phone")}
              className={`mt-1 block w-full rounded-md border ${
                formik.touched.phone && formik.errors.phone ? "border-red-500" : "border-gray-300"
              } focus:ring-blue-500 focus:border-blue-500`}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
            )}
          </div>

          {/* Office Location */}
          <div className="sm:col-span-2">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Localisation de l'office
            </label>
            <input
              id="location"
              type="text"
              {...formik.getFieldProps("location")}
              className={`mt-1 block w-full rounded-md border ${
                formik.touched.location && formik.errors.location ? "border-red-500" : "border-gray-300"
              } focus:ring-blue-500 focus:border-blue-500`}
            />
            {formik.touched.location && formik.errors.location && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.location}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2 text-center mt-6">
            <button
              type="submit"
              className={`py-3 px-6 rounded-md text-white transition duration-300 ${
                formik.isValid && formik.dirty
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!formik.isValid || !formik.dirty}
            >
              Continuer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyStep;
