import React, { useState, useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUserStore from '../zustand/useProvider';

const AddCase = () => {
    const { name, email, nationality, sex } = useUserStore();
    const [caseName, setCaseName] = useState('');
    const [description, setDescription] = useState('');
    const [responseMessage, setResponseMessage] = useState(null);
    const [initialResponse, setInitialResponse] = useState('');
    const [displayedText, setDisplayedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [caseId, setCaseId] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setResponseMessage("Generating response...");
        setDisplayedText('');
        setInitialResponse('');

        try {
            const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/add-case`;
            const response = await axios.post(
                URL,
                { name: caseName, description },
                { withCredentials: true }
            );

            setResponseMessage(response.data.message);
            setInitialResponse(response.data.case?.initialResponse || "");
            setCaseId(response.data.case?._id || null);
        } catch (error) {
            console.error("Error adding case:", error);
            setResponseMessage("Failed to add case. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (initialResponse) {
            let index = 0;
            setDisplayedText('');
            const interval = setInterval(() => {
                if (index < initialResponse.length) {
                    setDisplayedText((prev) => prev + initialResponse[index]);
                    index++;
                } else {
                    clearInterval(interval);
                }
            }, 20); // Faster typing speed
            return () => clearInterval(interval);
        }
    }, [initialResponse]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-10">
            <div className="w-full max-w-2xl p-12 bg-gray-800 rounded-2xl shadow-2xl">
                <h2 className="text-4xl font-bold text-center mb-8 text-blue-400">Add a New Case</h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label className="block text-xl mb-3">Case Name:</label>
                        <input
                            type="text"
                            value={caseName}
                            onChange={(e) => setCaseName(e.target.value)}
                            placeholder="Enter case name"
                            className="w-full px-5 py-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 text-lg"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xl mb-3">Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter case description"
                            rows="6"
                            className="w-full px-5 py-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 text-lg"
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-400 font-semibold rounded-lg shadow-md transition-all flex justify-center items-center text-lg"
                        disabled={isLoading}
                    >
                        {isLoading ? "Generating Response..." : "Submit Case"}
                    </button>
                </form>

                {responseMessage && (
                    <div className="mt-6 p-4 bg-gray-700 text-center rounded-lg text-xl">
                        {responseMessage}
                    </div>
                )}

                {displayedText && (
                    <div className="mt-6">
                        <label className="block text-xl mb-3">Initial Response:</label>
                        <textarea
                            value={displayedText}
                            readOnly
                            rows="8"
                            className="w-full px-5 py-3 rounded-lg bg-gray-800 text-green-400 font-mono tracking-wide text-lg"
                        ></textarea>
                    </div>
                )}

                {caseId && (
                    <button
                        onClick={() => navigate(`/case/${caseId}`)}
                        className="mt-6 w-full px-6 py-3 bg-green-500 hover:bg-green-400 font-semibold rounded-lg shadow-md transition-all text-lg"
                    >
                        Continue Case
                    </button>
                )}
            </div>

            <button
                onClick={() => navigate('/')}
                className="mt-8 px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-all text-lg"
            >
                Back to Home
            </button>
        </div>
    );
};

export default AddCase;
