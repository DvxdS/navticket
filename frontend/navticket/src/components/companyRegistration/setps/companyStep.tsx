import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useFormContext } from "../../../context/FormContext";

interface CompanyStepProps {
  goNext: () => void;
  goBack: () => void;
}

const CompanyStep: React.FC<CompanyStepProps> = ({ goNext, goBack }) => {
  console.log("coppany rendered ")
  const { updateFormData } = useFormContext();

  const formik = useFormik({
    initialValues: {
      name: "",
      officialDocs: null,
      numberOfBusesVip: "",
      numberOfBusesStandard: "",
      email: "",
      contactInfo: "",
      officeLocation: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nom de l'entreprise est requis."),
      officialDocs: Yup.mixed()
        .required("Document officiel est requis.")
        .test("fileType", "Format non supporté (PDF ou Word uniquement)", (value) => {
          if (!value) return false;
          const file = value as File;
          return [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(file.type);
        }),
      numberOfBusesVip: Yup.number()
        .typeError("Nombre de bus VIP doit être un nombre.")
        .min(0, "Nombre de bus VIP ne peut pas être négatif.")
        .required("Nombre de bus VIP est requis."),
      numberOfBusesStandard: Yup.number()
        .typeError("Nombre de bus standards doit être un nombre.")
        .min(0, "Nombre de bus standards ne peut pas être négatif.")
        .required("Nombre de bus standards est requis."),
      email: Yup.string().email("Email invalide.").required("Email est requis."),
      contactInfo: Yup.string()
        .matches(/^\+?[0-9]{10,15}$/, "Numéro de téléphone invalide.")
        .required("Numéro de téléphone est requis."),
      officeLocation: Yup.string().required("Localisation de l'office est requise."),
    }),
    onSubmit: (values) => {
      updateFormData("companyDetails", values);
      goNext();
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
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nom de l'entreprise
            </label>
            <input
              id="name"
              type="text"
              {...formik.getFieldProps("name")}
              className={`mt-1 block w-full py-2 px-3  rounded-md border bg-gray-50 ${
                formik.touched.name && formik.errors.name ? "border-red-500" : "border-gray-300"
              } focus:ring-blue-500 focus:border-blue-500`}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
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
              className="mt-1 block w-full "
            />
            {formik.touched.officialDocs && formik.errors.officialDocs && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.officialDocs}</p>
            )}
          </div>

          {/* VIP Bus Count */}
          <div>
            <label htmlFor="numberOfBusesVip" className="block text-sm font-medium text-gray-700">
              Nombre de bus VIP
            </label>
            <input
              id="numberOfBusesVip"
              type="number"
              {...formik.getFieldProps("numberOfBusesVip")}
              className={`mt-1 block w-full rounded-md border bg-gray-50 ${
                formik.touched.numberOfBusesVip && formik.errors.numberOfBusesVip
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:ring-blue-500 focus:border-blue-500`}
            />
            {formik.touched.numberOfBusesVip && formik.errors.numberOfBusesVip && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.numberOfBusesVip}</p>
            )}
          </div>

          {/* Standard Bus Count */}
          <div>
            <label htmlFor="numberOfBusesStandard" className="block text-sm font-medium text-gray-700">
              Nombre de bus standards
            </label>
            <input
              id="numberOfBusesStandard"
              type="number"
              {...formik.getFieldProps("numberOfBusesStandard")}
              className={`mt-1 block w-full rounded-md border bg-gray-50 ${
                formik.touched.numberOfBusesStandard && formik.errors.numberOfBusesStandard
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:ring-blue-500 focus:border-blue-500`}
            />
            {formik.touched.numberOfBusesStandard && formik.errors.numberOfBusesStandard && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.numberOfBusesStandard}</p>
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
              className={`mt-1 block w-full rounded-md border bg-gray-50 ${
                formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
              } focus:ring-blue-500 focus:border-blue-500`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">
              Téléphone
            </label>
            <input
              id="contactInfo"
              type="text"
              {...formik.getFieldProps("contactInfo")}
              className={`mt-1 block w-full rounded-md border bg-gray-50 ${
                formik.touched.contactInfo && formik.errors.contactInfo
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:ring-blue-500 focus:border-blue-500`}
            />
            {formik.touched.contactInfo && formik.errors.contactInfo && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.contactInfo}</p>
            )}
          </div>

          {/* Office Location */}
          <div className="sm:col-span-2">
            <label htmlFor="officeLocation" className="block text-sm font-medium text-gray-700">
              Localisation de l'office
            </label>
            <input
              id="officeLocation"
              type="text"
              {...formik.getFieldProps("officeLocation")}
              className={`mt-1 block w-full rounded-md border bg-gray-50 py-3 px-2 ${
                formik.touched.officeLocation && formik.errors.officeLocation
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:ring-blue-500 focus:border-blue-500`}
            />
            {formik.touched.officeLocation && formik.errors.officeLocation && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.officeLocation}</p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="sm:col-span-2 flex justify-between mt-6">
            <button
              type="button"
              onClick={goBack}
              className="py-3 px-6 rounded-md text-white bg-gray-600 hover:bg-gray-700 transition duration-300"
            >
              Retour
            </button>
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
