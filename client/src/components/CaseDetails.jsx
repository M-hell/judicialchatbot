import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import uploadFile from "../helpers/uploadFile";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaClipboardList,
  FaInfoCircle,
  FaUpload,
  FaRobot,
  FaFolderOpen,
  FaCheckCircle,
  FaSave,
  FaSpinner
} from "react-icons/fa";
import { FiImage, FiFileText, FiCalendar, FiChevronDown, FiChevronUp } from "react-icons/fi";
import toast from "react-hot-toast";

const CaseDetails = () => {
  const { id } = useParams();
  const [caseDetails, setCaseDetails] = useState(null);
  const [showResponse, setShowResponse] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [uploadPhoto, setUploadPhoto] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  const [addImageStatus, setAddImageStatus] = useState("Add Image");
  const [showCaseFiles, setShowCaseFiles] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/get-case-details`;
        const response = await axios.post(
          URL,
          { caseid: id },
          { withCredentials: true }
        );
        setCaseDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching case details:", error);
      }
    };
    fetchCaseDetails();
  }, [id]);

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadedFile = await uploadFile(file);
        setUploadPhoto(uploadedFile.url);
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    }
  };

  const addImage = async () => {
    setAddImageStatus("Adding...");
    try {
      const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/add-image`;
      const response = await axios.post(
        URL,
        { caseid: id, imageUrl: uploadPhoto },
        { withCredentials: true }
      );
      setAddImageStatus("Added successfully");
      toast.success("Image added to case files!");
    } catch (error) {
      console.error("Error adding image:", error);
      setAddImageStatus("Add Image");
      toast.error("Failed to add image");
    }
  };

  const aiOcr = async () => {
    if (!uploadPhoto) return;
    setLoading(true);
    setAiResponse("");
    setTypingIndex(0);
    try {
      const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/ocr`;
      const response = await axios.post(
        URL,
        { caseid: id, imageUrl: uploadPhoto },
        { withCredentials: true }
      );
      const fullText = response.data.imageresponse;
      setAiResponse(fullText);
    } catch (error) {
      console.error("Error processing OCR:", error);
      toast.error("OCR processing failed");
    }
    setLoading(false);
  };

  const updateCaseStatus = async () => {
    try {
      const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/status-update`;
      const response = await axios.post(
        URL,
        { caseid: id },
        { withCredentials: true }
      );
      if (response.data.success) {
        setCaseDetails((prevDetails) => ({
          ...prevDetails,
          status: response.data.caseDetails.status,
          enddate: response.data.caseDetails.enddate,
        }));
        toast.success("Case status updated successfully!");
      }
    } catch (error) {
      console.error("Error updating case status:", error);
      toast.error("Failed to update case status.");
    }
  };

  useEffect(() => {
    if (aiResponse && typingIndex < aiResponse.length) {
      const timeout = setTimeout(() => {
        setTypingIndex((prevIndex) => prevIndex + 1);
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [aiResponse, typingIndex]);

  if (!caseDetails) {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col lg:flex-row items-start justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-8 lg:p-10 gap-6 lg:gap-10"
    >
      {/* Upload Image Section */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full lg:w-1/3 bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-700"
      >
        <h2 className="text-2xl font-bold text-blue-400 flex items-center gap-3 mb-6">
          <FiImage className="text-blue-400" /> Upload Image
        </h2>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative overflow-hidden rounded-xl border-2 border-dashed border-gray-600 hover:border-blue-500 transition-all"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleUploadPhoto}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="p-8 text-center">
            <FaUpload className="mx-auto text-3xl text-gray-400 mb-3" />
            <p className="text-gray-300">Click to upload an image</p>
            <p className="text-sm text-gray-500 mt-1">Supports JPG, PNG, etc.</p>
          </div>
        </motion.div>

        <AnimatePresence>
          {uploadPhoto && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 space-y-4"
            >
              <div className="relative overflow-hidden rounded-xl border border-gray-700">
                <img
                  src={uploadPhoto}
                  alt="Uploaded"
                  className="w-full h-64 object-contain bg-black"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={aiOcr}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl text-white flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                      <FaSpinner />
                    </motion.div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaRobot /> Process with AI OCR
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addImage}
                className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl text-white flex items-center justify-center gap-2"
              >
                <FaSave /> {addImageStatus}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {aiResponse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-gray-900/50 border border-gray-700 text-green-400 font-mono rounded-xl"
            >
              <strong>AI Response:</strong>
              <div className="mt-2 whitespace-pre-wrap">
                {aiResponse.slice(0, typingIndex)}
                {typingIndex < aiResponse.length && (
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="ml-1"
                  >
                    |
                  </motion.span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Case Details Section */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full lg:w-2/3 bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-gray-700 relative"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h2 className="text-3xl font-bold text-center md:text-left bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center justify-center md:justify-start gap-3">
            <FaClipboardList /> Case Details
          </h2>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-3 mt-4 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/Add_hearing?caseid=${id}`)}
              className="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 flex items-center gap-2"
            >
              <FaFolderOpen /> Hearing
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCaseFiles(!showCaseFiles)}
              className="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 flex items-center gap-2"
            >
              <FaFolderOpen /> {showCaseFiles ? "Hide Files" : "Show Files"}
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-full text-white text-lg font-medium ${
                caseDetails.status === "Closed" 
                  ? "bg-gradient-to-r from-green-600 to-green-700" 
                  : "bg-gradient-to-r from-yellow-600 to-yellow-700"
              }`}
            >
              {caseDetails.status}
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {showCaseFiles && caseDetails.imagedocuments && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-4">
                Case Files
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {caseDetails.imagedocuments.map((imageUrl, index) => (
                  <motion.div 
                    key={index} 
                    className="relative group overflow-hidden rounded-xl border border-gray-700 hover:border-blue-500 transition-all"
                    whileHover={{ y: -5 }}
                  >
                    <img
                      src={imageUrl}
                      alt={`Case File ${index + 1}`}
                      className="w-full h-40 object-cover"
                    />
                    <a
                      href={imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all px-3 py-1 bg-white text-black rounded-lg font-medium">
                        View Full Size
                      </span>
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-6 text-lg">
          <div className="flex items-start gap-4">
            <FiFileText className="text-blue-400 mt-1 text-xl" />
            <div>
              <h3 className="font-semibold text-gray-300">Case Name:</h3>
              <p className="text-xl text-white">{caseDetails.name}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FiFileText className="text-blue-400 mt-1 text-xl" />
            <div>
              <h3 className="font-semibold text-gray-300">Description:</h3>
              <p className="text-white">{caseDetails.description}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FiCalendar className="text-blue-400 mt-1 text-xl" />
            <div>
              <h3 className="font-semibold text-gray-300">Start Date:</h3>
              <p className="text-white">
                {new Date(caseDetails.startdate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {caseDetails.enddate && (
            <div className="flex items-start gap-4">
              <FiCalendar className="text-blue-400 mt-1 text-xl" />
              <div>
                <h3 className="font-semibold text-gray-300">End Date:</h3>
                <p className="text-white">
                  {new Date(caseDetails.enddate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 space-y-4">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setShowResponse(!showResponse)}
            className="w-full px-6 py-3 bg-gray-700/50 hover:bg-gray-700 rounded-xl text-white flex justify-between items-center border border-gray-600"
          >
            <div className="flex items-center gap-3">
              <FaInfoCircle className="text-blue-400" />
              <span>Initial Response</span>
            </div>
            {showResponse ? <FiChevronUp /> : <FiChevronDown />}
          </motion.button>
          
          <AnimatePresence>
            {showResponse && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-gray-900/50 border border-gray-700 rounded-xl overflow-hidden"
              >
                <pre className="whitespace-pre-wrap font-mono text-green-400">{caseDetails.initialResponse}</pre>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setShowSummary(!showSummary)}
            className="w-full px-6 py-3 bg-gray-700/50 hover:bg-gray-700 rounded-xl text-white flex justify-between items-center border border-gray-600"
          >
            <div className="flex items-center gap-3">
              <FaInfoCircle className="text-blue-400" />
              <span>Summary</span>
            </div>
            {showSummary ? <FiChevronUp /> : <FiChevronDown />}
          </motion.button>
          
          <AnimatePresence>
            {showSummary && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-gray-900/50 border border-gray-700 rounded-xl overflow-hidden"
              >
                <pre className="whitespace-pre-wrap font-mono text-green-400">{caseDetails.summary}</pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={updateCaseStatus}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl text-white flex items-center justify-center gap-3"
          >
            <FaCheckCircle /> Update Status to {caseDetails.status === "Pending" ? "Closed" : "Pending"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/")}
            className="w-full px-6 py-3 bg-gray-700/50 hover:bg-gray-700 rounded-xl text-white flex items-center justify-center gap-3 border border-gray-600"
          >
            <FaArrowLeft /> Back to Home
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CaseDetails;