import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const AddHearing = () => {
  const [searchParams] = useSearchParams();
  const caseId = searchParams.get("caseid");
  const [caseDetails, setCaseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!caseId) return;

    const fetchCaseDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/get-case-details`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ caseid: caseId }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch case details");
        }

        const data = await response.json();
        setCaseDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseDetails();
  }, [caseId]);

  if (loading)
    return (
      <p className="text-white text-center mt-10 animate-pulse">
        ⏳ Loading case details...
      </p>
    );
  if (error)
    return <p className="text-red-500 text-center mt-10">❌ Error: {error}</p>;
  if (!caseDetails)
    return (
      <p className="text-white text-center mt-10">⚠️ No case details found.</p>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        {/* Case Title */}
        <h1 className="text-4xl font-bold text-blue-400 text-center mb-6">
          ⚖️ {caseDetails.data.name}
        </h1>

        {/* Case Details Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <p className="text-lg">
            <span className="font-semibold">📌 Case ID:</span>{" "}
            {caseDetails.data._id}
          </p>
          <p className="text-lg">
            <span className="font-semibold">📝 Description:</span>{" "}
            {caseDetails.data.description}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-red-400">⚠️ Status:</span>{" "}
            {caseDetails.data.status}
          </p>
        </div>

        {/* Hearings Section */}
        <h2 className="text-2xl font-bold mt-8 mb-4">📅 Hearings</h2>
        {caseDetails.data.hearings.length > 0 ? (
          <div className="space-y-4">
            {caseDetails.data.hearings.map((hearing, index) => (
              <div
                key={hearing._id}
                className="bg-gray-800 p-5 rounded-lg shadow-md border-l-4 border-blue-500 hover:scale-105 transition-transform"
              >
                <h3 className="text-xl font-semibold text-blue-300">
                  📅 Hearing {index + 1} - {hearing.date}
                </h3>
                <p>
                  <span className="font-semibold text-green-400">
                    👤 User Statement:
                  </span>{" "}
                  {hearing.userStatementSummary}
                </p>
                <p>
                  <span className="font-semibold text-red-400">
                    ⚖️ Opposing Party Statement:
                  </span>{" "}
                  {hearing.opposingPartyStatementSummary}
                </p>
                <p>
                  <span className="font-semibold text-blue-400">
                    🔍 Judge's Statement:
                  </span>{" "}
                  {hearing.judgeStatementSummary}
                </p>
                <p>
                  <span className="font-semibold text-yellow-400">
                    📝 Response:
                  </span>{" "}
                  {hearing.response}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">⚠️ No hearings available.</p>
        )}
      </div>
    </div>
  );
};

export default AddHearing;
