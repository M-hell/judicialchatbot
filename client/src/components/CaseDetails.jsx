import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaClipboardList, FaInfoCircle } from 'react-icons/fa';

const CaseDetails = () => {
    const { id } = useParams();
    const [caseDetails, setCaseDetails] = useState(null);
    const [showResponse, setShowResponse] = useState(false);
    const [showSummary, setShowSummary] = useState(false);
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
    
    if (!caseDetails) {
        return <div className="min-h-screen flex items-center justify-center text-white text-xl">Loading...</div>;
    }

    const statusColor = caseDetails.status === "Pending" ? "bg-yellow-500" : "bg-red-500";

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-10">
            <div className="w-full max-w-4xl p-8 bg-gray-800 rounded-2xl shadow-lg relative">
                <h2 className="text-4xl font-bold text-center mb-6 text-blue-400 flex items-center gap-3">
                    <FaClipboardList /> Case Details
                </h2>
                
                <div className={`absolute top-5 right-5 px-4 py-2 rounded-full text-white text-lg ${statusColor}`}>
                    {caseDetails.status}
                </div>

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
                        <p className="text-gray-300">{new Date(caseDetails.startdate).toLocaleDateString()}</p>
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
                    onClick={() => navigate('/')}
                    className="mt-8 w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-all flex items-center justify-center gap-3"
                >
                    <FaArrowLeft /> Back to Home
                </button>
            </div>
        </div>
    );
};

export default CaseDetails;