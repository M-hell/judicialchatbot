import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiCalendar, FiFileText, FiInfo, FiPlus, FiHome } from "react-icons/fi";
import { FaBalanceScale, FaUser, FaGavel, FaComments } from "react-icons/fa";
import { IoMdAlert } from "react-icons/io";
import { RiSwordFill } from "react-icons/ri";

const AddHearing = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const caseId = searchParams.get("caseid");
  const [caseDetails, setCaseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openHearingId, setOpenHearingId] = useState(null);

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

  const toggleHearing = (hearingId) => {
    setOpenHearingId((prevId) => (prevId === hearingId ? null : hearingId));
  };

  const nextHearingNumber = caseDetails
    ? caseDetails.data.hearings.length + 1
    : 1;

  const handleAddHearing = () => {
    navigate(`/new-hearing?caseid=${caseId}&no=${nextHearingNumber}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-red-900/50 border border-red-700 p-6 rounded-xl max-w-md text-center"
        >
          <IoMdAlert className="text-4xl text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-300 mb-2">Error</h2>
          <p className="text-gray-300">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2 mx-auto"
          >
            <FiHome /> Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  if (!caseDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-yellow-900/50 border border-yellow-700 p-6 rounded-xl max-w-md text-center"
        >
          <IoMdAlert className="text-4xl text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-yellow-300 mb-2">No Case Found</h2>
          <p className="text-gray-300">No case details available for this ID</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2 mx-auto"
          >
            <FiHome /> Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex justify-between items-center mb-8">
          <motion.button
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg border border-gray-600"
          >
            <FiArrowLeft /> Back
          </motion.button>
          <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg border border-gray-600"
          >
            <FiHome /> Home
          </motion.button>
        </div>

        {/* Case Title */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <FaBalanceScale className="text-4xl text-blue-400" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {caseDetails.data.name}
            </h1>
          </div>
        </motion.div>

        {/* Case Details Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 mb-8"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <FiFileText className="text-blue-400 mt-1 text-xl" />
              <div>
                <h3 className="font-semibold text-gray-300">Case ID:</h3>
                <p className="text-white font-mono">{caseDetails.data._id}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FiFileText className="text-blue-400 mt-1 text-xl" />
              <div>
                <h3 className="font-semibold text-gray-300">Description:</h3>
                <p className="text-white">{caseDetails.data.description}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FiInfo className="text-blue-400 mt-1 text-xl" />
              <div>
                <h3 className="font-semibold text-gray-300">Status:</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  caseDetails.data.status === "Closed" 
                    ? "bg-green-600/30 text-green-400 border border-green-500/30" 
                    : "bg-yellow-600/30 text-yellow-400 border border-yellow-500/30"
                }`}>
                  {caseDetails.data.status}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hearings Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <FiCalendar className="text-blue-400" /> Hearings
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddHearing}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl flex items-center gap-2"
            >
              <FiPlus /> Add Hearing
            </motion.button>
          </div>

          {caseDetails.data.hearings.length > 0 ? (
            <div className="space-y-4">
              {caseDetails.data.hearings.map((hearing, index) => (
                <motion.div
                  key={hearing._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 backdrop-blur-sm p-5 rounded-xl shadow-md border-l-4 border-blue-500 cursor-pointer transition-all"
                  onClick={() => toggleHearing(hearing._id)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-blue-300 flex items-center gap-3">
                      <FiCalendar className="text-blue-400" />
                      Hearing {index + 1} - {new Date(hearing.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </h3>
                    {openHearingId === hearing._id ? (
                      <FaGavel className="text-gray-400" />
                    ) : (
                      <FaGavel className="text-gray-400" />
                    )}
                  </div>

                  <AnimatePresence>
                    {openHearingId === hearing._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 space-y-4 pl-3"
                      >
                        <div className="flex items-start gap-4">
                          <FaUser className="text-green-400 mt-1" />
                          <div>
                            <h4 className="font-semibold text-green-400">User Statement:</h4>
                            <p className="text-gray-300">{hearing.userStatementSummary}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <RiSwordFill className="text-red-400 mt-1" />
                          <div>
                            <h4 className="font-semibold text-red-400">Opposing Party:</h4>
                            <p className="text-gray-300">{hearing.opposingPartyStatementSummary}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <FaGavel className="text-blue-400 mt-1" />
                          <div>
                            <h4 className="font-semibold text-blue-400">Judge's Statement:</h4>
                            <p className="text-gray-300">{hearing.judgeStatementSummary}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <FaComments className="text-yellow-400 mt-1" />
                          <div>
                            <h4 className="font-semibold text-yellow-400">Response:</h4>
                            <p className="text-gray-300">{hearing.response}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 text-center"
            >
              <FiCalendar className="text-4xl text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl text-gray-400">No hearings available</h3>
              <p className="text-gray-500 mt-2">Add a hearing to get started</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AddHearing;