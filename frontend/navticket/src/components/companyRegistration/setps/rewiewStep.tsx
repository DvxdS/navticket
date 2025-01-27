import React from "react";
import { useFormContext } from "../../../context/FormContext";

const ReviewStep: React.FC = () => {
  const { getFormData } = useFormContext();
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
    <div>
      <h2>Review Your Details</h2>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ReviewStep;
