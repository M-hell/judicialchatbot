import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const New_hearing = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    caseid: searchParams.get("caseid") || "",
    no: searchParams.get("no") || "",
    date: "",
    userStatementSummary: "",
    opposingPartyStatementSummary: "",
    judgeStatementSummary: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/Add-hearing`,
        formData
      );

      if (response.status === 201) {
        alert("Hearing added successfully!");
        navigate(`/Add_hearing?caseid=${formData.caseid}`); // Redirect back to the case details page
      }
    } catch (error) {
      console.error("Error adding hearing:", error);
      setError("Failed to add hearing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 text-center mb-8">
          ⚖️ Add Hearing
        </h1>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">❌ {error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Case ID */}
          <div>
            <label className="block text-lg font-semibold mb-2">
              📌 Case ID
            </label>
            <input
              type="text"
              name="caseid"
              value={formData.caseid}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
              required
              readOnly // Prevents editing
            />
          </div>

          {/* Hearing Number */}
          <div>
            <label className="block text-lg font-semibold mb-2">
              🔢 Hearing Number
            </label>
            <input
              type="text"
              name="no"
              value={formData.no}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
              required
              readOnly // Prevents editing
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-lg font-semibold mb-2">📅 Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* User Statement Summary */}
          <div>
            <label className="block text-lg font-semibold mb-2">
              👤 User Statement Summary
            </label>
            <textarea
              name="userStatementSummary"
              value={formData.userStatementSummary}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
              rows="4"
              required
            />
          </div>

          {/* Opposing Party Statement Summary */}
          <div>
            <label className="block text-lg font-semibold mb-2">
              ⚖️ Opposing Party Statement Summary
            </label>
            <textarea
              name="opposingPartyStatementSummary"
              value={formData.opposingPartyStatementSummary}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
              rows="4"
              required
            />
          </div>

          {/* Judge Statement Summary */}
          <div>
            <label className="block text-lg font-semibold mb-2">
              🔍 Judge Statement Summary
            </label>
            <textarea
              name="judgeStatementSummary"
              value={formData.judgeStatementSummary}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
              rows="4"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-400"
            >
              {loading ? "⏳ Adding Hearing..." : "➕ Add Hearing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default New_hearing;
