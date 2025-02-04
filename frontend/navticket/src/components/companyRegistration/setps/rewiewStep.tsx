import React from "react";
import { useFormContext } from "../../../context/FormContext";

const ReviewStep: React.FC<{ goBack: () => void }> = ({ goBack }) => {
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
    <div className="w-full h-auto bg-white px-4 sm:px-6 lg:px-8 mt-10">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Review Your Details</h2>

        {/* Company Details Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Company Details</h3>
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <p>
              <strong>Plan:</strong> {formData.companyDetails.plan}
            </p>
            <p>
              <strong>Name:</strong> {formData.companyDetails.name}
            </p>
            <p>
              <strong>Email:</strong> {formData.companyDetails.email}
            </p>
            <p>
              <strong>Contact Info:</strong> {formData.companyDetails.contactInfo}
            </p>
            <p>
              <strong>Office Location:</strong> {formData.companyDetails.officeLocation}
            </p>
            <p>
              <strong>Number of VIP Buses:</strong> {formData.companyDetails.numberOfBusesVip}
            </p>
            <p>
              <strong>Number of Standard Buses:</strong> {formData.companyDetails.numberOfBusesStandard}
            </p>
          </div>
        </div>

        {/* Bus Types Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Bus Types</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {formData.busType.map((busType, index) => (
              <div
                key={index}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <p>
                  <strong>Type:</strong> {busType.type}
                </p>
                <p>
                  <strong>Capacity:</strong> {busType.capacity}
                </p>
                <p>
                  <strong>Description:</strong> {busType.description || "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Routes Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Routes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {formData.routes.map((route, index) => (
              <div
                key={index}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <p>
                  <strong>Origin:</strong> {route.origin}
                </p>
                <p>
                  <strong>Destination:</strong> {route.destination}
                </p>
                <p>
                  <strong>Distance:</strong> {route.distance} km
                </p>
                <p>
                  <strong>Standard Price:</strong> {route.priceStandard} XOF
                </p>
                <p>
                  <strong>VIP Price:</strong> {route.priceVIP} XOF
                </p>
                <p>
                  <strong>Route Code:</strong> {route.routeCode}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Schedules Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Schedules</h3>
          {Object.entries(formData.schedules).map(([routeId, schedules]) => {
            const route = formData.routes.find((route) => route.id === routeId);
            return (
              <div key={routeId} className="mb-6">
                <h4 className="text-lg font-semibold mb-2">
                  {route?.origin} → {route?.destination}
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border-b">Departure Time</th>
                        <th className="px-4 py-2 border-b">Arrival Time</th>
                        <th className="px-4 py-2 border-b">Duration (min)</th>
                        <th className="px-4 py-2 border-b">Bus Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedules.map((schedule, index) => {
                        const busType = formData.busType.find(
                          (bus) => bus.id === schedule.busTypeId
                        );
                        return (
                          <tr key={index}>
                            <td className="px-4 py-2 border-b">{schedule.departureTime}</td>
                            <td className="px-4 py-2 border-b">{schedule.arrivalTime}</td>
                            <td className="px-4 py-2 border-b">{schedule.durationInMinutes}</td>
                            <td className="px-4 py-2 border-b">{busType?.type}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
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