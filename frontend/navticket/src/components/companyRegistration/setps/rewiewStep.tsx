import React from "react";
import { useRegistration } from "../../../context/FormContext";

const ReviewStep: React.FC<{ goBack: () => void }> = ({ goBack }) => {
  const { getFormData } = useRegistration();
  const formData = getFormData();

  const handleSubmit = async () => {
    try {
      // Submit final data to the backend
      const response = await fetch("/api/finalize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      alert("Form submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="w-full h-auto bg-white px-4 sm:px-6 lg:px-8 mt-10">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Review Your Details</h2>

        {/* Company Details Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Company Details</h3>
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <p>
              <strong>Plan:</strong> {formData.plan}
            </p>
            <p>
              <strong>Name:</strong> {formData.name}
            </p>
            <p>
              <strong>Official Docs:</strong> 
              {formData.officialDocs && formData.officialDocs.length > 0 ? (
                <ul>
                  {formData.officialDocs.map((file, index) => (
                    <li key={index}>{file.name}</li>  
                  ))}
                </ul>
              ) : (
                <span>No documents uploaded</span>
              )}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Contact Info:</strong> {formData.contactInfo}
            </p>
            <p>
              <strong>Office Location:</strong> {formData.officeLocation}
            </p>
            <p>
              <strong>Number of VIP Buses:</strong> {formData.numberOfBusesVip}
            </p>
            <p>
              <strong>Number of Standard Buses:</strong> {formData.numberOfBusesStandard}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={goBack}
            className="py-3 px-6 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition duration-300"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
