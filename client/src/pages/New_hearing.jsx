import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiCalendar, FiUser, FiFileText, FiGavel, FiSave } from "react-icons/fi";
import { FaBalanceScale, FaUserTie, FaHandshake } from "react-icons/fa";
import { IoMdAlert } from "react-icons/io";
import toast from "react-hot-toast";

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
        formData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success("Hearing added successfully!");
        navigate(`/Add_hearing?caseid=${formData.caseid}`);
      }
    } catch (error) {
      console.error("Error adding hearing:", error);
      setError("Failed to add hearing. Please try again.");
      toast.error("Failed to add hearing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-8"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header with Back Button */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between items-center mb-8"
        >
          <motion.button
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg border border-gray-600"
          >
            <FiArrowLeft /> Back
          </motion.button>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <FaBalanceScale className="text-4xl text-blue-400" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Add Hearing #{formData.no}
            </h1>
          </div>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <IoMdAlert className="text-xl text-red-400" />
                <p className="text-red-300">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <motion.form
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-gray-700"
        >
          {/* Case ID */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className=" text-lg font-semibold mb-3 flex items-center gap-2">
              <FiFileText className="text-blue-400" /> Case ID
            </label>
            <input
              type="text"
              name="caseid"
              value={formData.caseid}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
              required
              readOnly
            />
          </motion.div>

          {/* Hearing Number */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            <label className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FiFileText className="text-blue-400" /> Hearing Number
            </label>
            <input
              type="text"
              name="no"
              value={formData.no}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
              required
              readOnly
            />
          </motion.div>

          {/* Date */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <label className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FiCalendar className="text-blue-400" /> Hearing Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
              required
            />
          </motion.div>

          {/* User Statement Summary */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.65 }}
          >
            <label className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FiUser className="text-green-400" /> User Statement Summary
            </label>
            <textarea
              name="userStatementSummary"
              value={formData.userStatementSummary}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all min-h-32"
              required
            />
          </motion.div>

          {/* Opposing Party Statement Summary */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <label className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FaHandshake className="text-red-400" /> Opposing Party Statement
            </label>
            <textarea
              name="opposingPartyStatementSummary"
              value={formData.opposingPartyStatementSummary}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all min-h-32"
              required
            />
          </motion.div>

          {/* Judge Statement Summary */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.75 }}
          >
            <label className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FiGavel className="text-yellow-400" /> Judge Statement Summary
            </label>
            <textarea
              name="judgeStatementSummary"
              value={formData.judgeStatementSummary}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all min-h-32"
              required
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl text-white font-medium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <FiSave />
              )}
              {loading ? "Adding Hearing..." : "Add Hearing"}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default New_hearing;