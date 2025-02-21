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
            }, 40); // Typing speed
            return () => clearInterval(interval);
        }
    }, [initialResponse]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
            <div className="w-full max-w-lg p-8 bg-gray-800 rounded-xl shadow-xl">
                <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">Add a New Case</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-lg mb-2">Case Name:</label>
                        <input
                            type="text"
                            value={caseName}
                            onChange={(e) => setCaseName(e.target.value)}
                            placeholder="Enter case name"
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-lg mb-2">Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter case description"
                            rows="4"
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-400 font-semibold rounded-lg shadow-md transition-all flex justify-center items-center"
                        disabled={isLoading}
                    >
                        {isLoading ? "Generating Response..." : "Submit Case"}
                    </button>
                </form>

                {responseMessage && (
                    <div className="mt-4 p-3 bg-gray-700 text-center rounded-lg text-lg">
                        {responseMessage}
                    </div>
                )}

                {displayedText && (
                    <div className="mt-4">
                        <label className="block text-lg mb-2">Initial Response:</label>
                        <textarea
                            value={displayedText}
                            readOnly
                            rows="6"
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-green-400 font-mono tracking-wide"
                        ></textarea>
                    </div>
                )}
            </div>

            <button
                onClick={() => navigate('/')}
                className="mt-6 px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-all"
            >
                Back to Home
            </button>
        </div>
    );
};

export default AddCase;