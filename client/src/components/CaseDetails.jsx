import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import uploadFile from "../helpers/uploadFile";
import {
  FaArrowLeft,
  FaClipboardList,
  FaInfoCircle,
  FaUpload,
  FaRobot,
  FaFolderOpen,
} from "react-icons/fa";
import { FaSave } from "react-icons/fa";

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
  const [showCaseFiles, setShowCaseFiles] = useState(false); // New state for showing case files
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const URL = `${
          import.meta.env.VITE_REACT_APP_BACKEND_URL
        }/api/get-case-details`;
        const response = await axios.post(
          URL,
          { caseid: id },
          { withCredentials: true }
        );
        setCaseDetails(response.data.data);
        console.log("Case details response:", response.data);
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
    setAddImageStatus("Adding..."); // Set button text to "Adding..."
    try {
      const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/add-image`;
      const response = await axios.post(
        URL,
        { caseid: id, imageUrl: uploadPhoto },
        { withCredentials: true }
      );
      console.log("Image added successfully:", response.data);
      setAddImageStatus("Added successfully"); // Set button text to "Added successfully"
    } catch (error) {
      console.error("Error adding image:", error);
      setAddImageStatus("Add Image"); // Reset button text if there's an error
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
    }
    setLoading(false);
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
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-row items-start justify-center bg-gray-900 text-white p-10 gap-10">
      <div className="w-1/3 bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-blue-400 flex items-center gap-3 mb-4">
          <FaUpload /> Upload Image
        </h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleUploadPhoto}
          className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white cursor-pointer"
        />
        {uploadPhoto && (
          <div className="mt-4">
            <p className="text-green-400">Image uploaded successfully!</p>
            <img
              src={uploadPhoto}
              alt="Uploaded"
              className="w-full h-64 object-cover rounded-lg mt-2"
            />
            <button
              onClick={aiOcr}
              className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white flex items-center justify-center gap-2"
              disabled={loading}
            >
              <FaRobot /> {loading ? "Processing..." : "Process with AI OCR"}
            </button>
            <button
              onClick={addImage}
              className="w-full mt-4 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white flex items-center justify-center gap-2"
            >
              <FaSave /> {addImageStatus} {/* Use the state for button text */}
            </button>
          </div>
        )}
        {aiResponse && (
          <div className="mt-4 p-4 bg-black text-green-400 font-mono rounded-lg">
            <strong>AI Response:</strong>
            <p>{aiResponse.slice(0, typingIndex)}</p>
          </div>
        )}
      </div>
      <div className="w-2/3 bg-gray-800 p-8 rounded-2xl shadow-lg relative">
        <h2 className="text-4xl font-bold text-center mb-6 text-blue-400 flex items-center gap-3">
          <FaClipboardList /> Case Details
        </h2>
        <div className="absolute top-5 right-5 flex items-center gap-3">
          <button
            onClick={() => navigate(`/Add_hearing?caseid=${id}`)}
            className="px-4 py-2 rounded-lg text-white bg-pink-600 hover:bg-blue-500 flex items-center gap-2"
          >
            <FaFolderOpen /> Hearing
          </button>

          <button
            onClick={() => setShowCaseFiles(!showCaseFiles)}
            className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-500 flex items-center gap-2"
          >
            <FaFolderOpen /> Show Case Files
          </button>
          <div className="px-4 py-2 rounded-full text-white text-lg bg-yellow-500">
            {caseDetails.status}
          </div>
        </div>
        {showCaseFiles && caseDetails.imagedocuments && (
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">
              Case Files
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {caseDetails.imagedocuments.map((imageUrl, index) => (
                <div key={index} className="relative">
                  <img
                    src={imageUrl}
                    alt={`Case File ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <a
                    href={imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-2 right-2 px-2 py-1 bg-black bg-opacity-50 text-white text-sm rounded-lg hover:bg-opacity-75"
                  >
                    Open
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="space-y-6 text-xl">
          <div>
            <span className="font-semibold">Case Name:</span>
            <p className="text-gray-300 text-2xl">{caseDetails.name}</p>
          </div>
          <div>
            <span className="font-semibold">Description:</span>
            <p className="text-gray-300 text-lg">{caseDetails.description}</p>
          </div>
          <div>
            <span className="font-semibold">Start Date:</span>
            <p className="text-gray-300">
              {new Date(caseDetails.startdate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <button
            onClick={() => setShowResponse(!showResponse)}
            className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white flex justify-between items-center"
          >
            <span>Initial Response</span>
            <FaInfoCircle />
          </button>
          {showResponse && (
            <div className="w-full p-4 bg-black text-green-400 font-mono rounded-lg overflow-x-auto">
              {caseDetails.initialResponse}
            </div>
          )}
          <button
            onClick={() => setShowSummary(!showSummary)}
            className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white flex justify-between items-center"
          >
            <span>Summary</span>
            <FaInfoCircle />
          </button>
          {showSummary && (
            <div className="w-full p-4 bg-black text-green-400 font-mono rounded-lg overflow-x-auto">
              {caseDetails.summary}
            </div>
          )}
        </div>
        <button
          onClick={() => navigate("/")}
          className="mt-8 w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white flex items-center justify-center gap-3"
        >
          <FaArrowLeft /> Back to Home
        </button>
      </div>
    </div>
  );
};

export default CaseDetails;
